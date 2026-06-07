-- Database Functions and Triggers

-- Function: Update vote counters when votes are added/removed
CREATE OR REPLACE FUNCTION update_vote_counters()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    IF OLD.target_type = 'QUESTION' THEN
      UPDATE questions SET
        upvotes   = CASE WHEN OLD.value = 1 THEN upvotes - 1 ELSE upvotes END,
        downvotes = CASE WHEN OLD.value = -1 THEN downvotes - 1 ELSE downvotes END
      WHERE id = OLD.target_id;
    ELSIF OLD.target_type = 'ANSWER' THEN
      UPDATE answers SET
        upvotes   = CASE WHEN OLD.value = 1 THEN upvotes - 1 ELSE upvotes END,
        downvotes = CASE WHEN OLD.value = -1 THEN downvotes - 1 ELSE downvotes END
      WHERE id = OLD.target_id;
    END IF;
  ELSE
    IF NEW.target_type = 'QUESTION' THEN
      UPDATE questions SET
        upvotes   = CASE WHEN NEW.value = 1 THEN upvotes + 1 ELSE upvotes END,
        downvotes = CASE WHEN NEW.value = -1 THEN downvotes + 1 ELSE downvotes END
      WHERE id = NEW.target_id;
    ELSIF NEW.target_type = 'ANSWER' THEN
      UPDATE answers SET
        upvotes   = CASE WHEN NEW.value = 1 THEN upvotes + 1 ELSE upvotes END,
        downvotes = CASE WHEN NEW.value = -1 THEN downvotes + 1 ELSE downvotes END
      WHERE id = NEW.target_id;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_vote_counters
  AFTER INSERT OR UPDATE OR DELETE ON votes
  FOR EACH ROW EXECUTE FUNCTION update_vote_counters();

-- Function: Update user level based on reputation
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
BEGIN
  NEW.level := CASE
    WHEN NEW.reputation BETWEEN 0 AND 50      THEN 1
    WHEN NEW.reputation BETWEEN 51 AND 200    THEN 2
    WHEN NEW.reputation BETWEEN 201 AND 500   THEN 3
    WHEN NEW.reputation BETWEEN 501 AND 1000  THEN 4
    WHEN NEW.reputation BETWEEN 1001 AND 2500 THEN 5
    WHEN NEW.reputation BETWEEN 2501 AND 5000 THEN 6
    WHEN NEW.reputation BETWEEN 5001 AND 10000 THEN 7
    ELSE 8
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_user_level
  BEFORE UPDATE OF reputation ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_user_level();

-- Function: Update search vector for questions
CREATE OR REPLACE FUNCTION update_question_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.content_text, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_question_search
  BEFORE INSERT OR UPDATE OF title, content_text ON questions
  FOR EACH ROW EXECUTE FUNCTION update_question_search_vector();

-- Function: Auto-create profile when user registers
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function: Update total answers count in questions
CREATE OR REPLACE FUNCTION update_answer_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE questions SET total_answers = total_answers + 1 WHERE id = NEW.question_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE questions SET total_answers = total_answers - 1 WHERE id = OLD.question_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_answer_count
  AFTER INSERT OR DELETE ON answers
  FOR EACH ROW EXECUTE FUNCTION update_answer_count();

-- Function: Update question count in tags
CREATE OR REPLACE FUNCTION update_tag_question_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE tags SET question_count = question_count + 1 WHERE id = NEW.tag_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE tags SET question_count = question_count - 1 WHERE id = OLD.tag_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_tag_question_count
  AFTER INSERT OR DELETE ON question_tags
  FOR EACH ROW EXECUTE FUNCTION update_tag_question_count();

-- Function: Apply reputation changes when votes are made
CREATE OR REPLACE FUNCTION apply_reputation_on_vote()
RETURNS TRIGGER AS $$
DECLARE
  v_target_user_id UUID;
  v_target_type TEXT;
  v_reputation_change INT;
BEGIN
  -- Determine target user ID and reputation change
  IF NEW.target_type = 'QUESTION' THEN
    SELECT user_id INTO v_target_user_id FROM questions WHERE id = NEW.target_id;
    v_reputation_change := CASE WHEN NEW.value = 1 THEN 5 ELSE -2 END;
  ELSIF NEW.target_type = 'ANSWER' THEN
    SELECT user_id INTO v_target_user_id FROM answers WHERE id = NEW.target_id;
    v_reputation_change := CASE WHEN NEW.value = 1 THEN 10 ELSE -5 END;
  END IF;

  -- Update reputation
  UPDATE profiles SET reputation = reputation + v_reputation_change WHERE id = v_target_user_id;

  -- Log reputation change
  INSERT INTO reputation_logs (user_id, points, reason, reference_id)
  VALUES (v_target_user_id, v_reputation_change, 'VOTE_' || NEW.value::TEXT, NEW.target_id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_reputation_on_vote
  AFTER INSERT ON votes
  FOR EACH ROW EXECUTE FUNCTION apply_reputation_on_vote();

-- Function: Apply reputation when answer is accepted
CREATE OR REPLACE FUNCTION apply_reputation_on_accept_answer()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_accepted AND NOT OLD.is_accepted THEN
    -- Award 25 points to answer author
    UPDATE profiles SET reputation = reputation + 25 WHERE id = NEW.user_id;

    INSERT INTO reputation_logs (user_id, points, reason, reference_id)
    VALUES (NEW.user_id, 25, 'ANSWER_ACCEPTED', NEW.id);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_reputation_on_accept_answer
  AFTER UPDATE OF is_accepted ON answers
  FOR EACH ROW EXECUTE FUNCTION apply_reputation_on_accept_answer();

-- Function: Create notification when answer is added
CREATE OR REPLACE FUNCTION create_notification_on_new_answer()
RETURNS TRIGGER AS $$
DECLARE
  v_question_title VARCHAR;
  v_question_id UUID;
BEGIN
  SELECT id, title INTO v_question_id, v_question_title
  FROM questions WHERE id = NEW.question_id;

  -- Notify question author
  INSERT INTO notifications (user_id, type, title, message, link)
  VALUES (
    (SELECT user_id FROM questions WHERE id = NEW.question_id),
    'NEW_ANSWER'::notification_type,
    'Jawaban Baru',
    'Ada jawaban baru untuk: ' || v_question_title,
    '/questions/' || v_question_id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_notification_on_new_answer
  AFTER INSERT ON answers
  FOR EACH ROW EXECUTE FUNCTION create_notification_on_new_answer();

-- Function: Update timestamp on update
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_timestamp BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER trg_questions_timestamp BEFORE UPDATE ON questions FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER trg_answers_timestamp BEFORE UPDATE ON answers FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER trg_references_timestamp BEFORE UPDATE ON "references" FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER trg_comments_timestamp BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_timestamp();

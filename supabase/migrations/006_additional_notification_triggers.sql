-- Additional Notification Triggers

-- 1. Trigger on New Comment
CREATE OR REPLACE FUNCTION create_notification_on_new_comment()
RETURNS TRIGGER AS $$
DECLARE
  v_post_author_id UUID;
  v_question_id UUID;
  v_commenter_username VARCHAR;
BEGIN
  -- Get commenter's username
  SELECT username INTO v_commenter_username FROM public.profiles WHERE id = NEW.user_id;

  IF NEW.target_type = 'QUESTION' THEN
    SELECT user_id, id INTO v_post_author_id, v_question_id FROM public.questions WHERE id = NEW.target_id;
  ELSIF NEW.target_type = 'ANSWER' THEN
    SELECT user_id, question_id INTO v_post_author_id, v_question_id FROM public.answers WHERE id = NEW.target_id;
  END IF;

  -- Notify post author (if not commenter themselves)
  IF v_post_author_id IS NOT NULL AND v_post_author_id != NEW.user_id THEN
    INSERT INTO public.notifications (user_id, type, title, message, link)
    VALUES (
      v_post_author_id,
      'NEW_COMMENT'::notification_type,
      'Komentar Baru',
      v_commenter_username || ' mengomentari postingan Anda.',
      '/questions/' || v_question_id
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_notification_on_new_comment ON comments;
CREATE TRIGGER trg_notification_on_new_comment
  AFTER INSERT ON comments
  FOR EACH ROW EXECUTE FUNCTION create_notification_on_new_comment();


-- 2. Trigger on Accepted Answer
CREATE OR REPLACE FUNCTION create_notification_on_accept_answer()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_accepted AND NOT OLD.is_accepted THEN
    -- Notify the answer author
    INSERT INTO public.notifications (user_id, type, title, message, link)
    VALUES (
      NEW.user_id,
      'ANSWER_ACCEPTED'::notification_type,
      'Jawaban Diterima',
      'Jawaban Anda telah diterima sebagai solusi terbaik!',
      '/questions/' || NEW.question_id
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_notification_on_accept_answer_alert ON answers;
CREATE TRIGGER trg_notification_on_accept_answer_alert
  AFTER UPDATE OF is_accepted ON answers
  FOR EACH ROW EXECUTE FUNCTION create_notification_on_accept_answer();


-- 3. Trigger on Badge Earned
CREATE OR REPLACE FUNCTION create_notification_on_badge_earned()
RETURNS TRIGGER AS $$
DECLARE
  v_badge_name VARCHAR;
BEGIN
  SELECT name INTO v_badge_name FROM public.badges WHERE id = NEW.badge_id;

  INSERT INTO public.notifications (user_id, type, title, message, link)
  VALUES (
    NEW.user_id,
    'BADGE_EARNED'::notification_type,
    'Lencana Baru',
    'Selamat! Anda mendapatkan lencana: ' || v_badge_name,
    '/users/' || (SELECT username FROM public.profiles WHERE id = NEW.user_id)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_notification_on_badge_earned ON user_badges;
CREATE TRIGGER trg_notification_on_badge_earned
  AFTER INSERT ON user_badges
  FOR EACH ROW EXECUTE FUNCTION create_notification_on_badge_earned();


-- 4. Trigger on Upvote
CREATE OR REPLACE FUNCTION create_notification_on_upvote()
RETURNS TRIGGER AS $$
DECLARE
  v_post_author_id UUID;
  v_question_id UUID;
  v_voter_username VARCHAR;
BEGIN
  -- We only notify for UPVOTES (value = 1)
  IF NEW.value = 1 THEN
    -- Get voter's username
    SELECT username INTO v_voter_username FROM public.profiles WHERE id = NEW.user_id;

    IF NEW.target_type = 'QUESTION' THEN
      SELECT user_id, id INTO v_post_author_id, v_question_id FROM public.questions WHERE id = NEW.target_id;
    ELSIF NEW.target_type = 'ANSWER' THEN
      SELECT user_id, question_id INTO v_post_author_id, v_question_id FROM public.answers WHERE id = NEW.target_id;
    END IF;

    -- Notify post author (if not voter themselves)
    IF v_post_author_id IS NOT NULL AND v_post_author_id != NEW.user_id THEN
      INSERT INTO public.notifications (user_id, type, title, message, link)
      VALUES (
        v_post_author_id,
        'UPVOTE'::notification_type,
        'Suka (Upvote)',
        v_voter_username || ' menyukai postingan Anda.',
        '/questions/' || v_question_id
      );
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_notification_on_upvote ON votes;
CREATE TRIGGER trg_notification_on_upvote
  AFTER INSERT ON votes
  FOR EACH ROW EXECUTE FUNCTION create_notification_on_upvote();

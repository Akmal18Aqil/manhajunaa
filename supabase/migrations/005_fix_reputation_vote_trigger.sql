-- Update reputation calculation when votes are inserted, updated, or deleted
CREATE OR REPLACE FUNCTION apply_reputation_on_vote()
RETURNS TRIGGER AS $$
DECLARE
  v_target_user_id UUID;
  v_old_reputation_change INT := 0;
  v_new_reputation_change INT := 0;
  v_final_change INT := 0;
  v_reason TEXT;
  v_ref_id UUID;
BEGIN
  -- We need to check operation type
  IF TG_OP = 'DELETE' THEN
    IF OLD.target_type = 'QUESTION' THEN
      SELECT user_id INTO v_target_user_id FROM questions WHERE id = OLD.target_id;
      v_final_change := CASE WHEN OLD.value = 1 THEN -5 ELSE 2 END;
    ELSIF OLD.target_type = 'ANSWER' THEN
      SELECT user_id INTO v_target_user_id FROM answers WHERE id = OLD.target_id;
      v_final_change := CASE WHEN OLD.value = 1 THEN -10 ELSE 5 END;
    END IF;
    v_reason := 'VOTE_REMOVE_' || OLD.value::TEXT;
    v_ref_id := OLD.target_id;
    
  ELSIF TG_OP = 'INSERT' THEN
    IF NEW.target_type = 'QUESTION' THEN
      SELECT user_id INTO v_target_user_id FROM questions WHERE id = NEW.target_id;
      v_final_change := CASE WHEN NEW.value = 1 THEN 5 ELSE -2 END;
    ELSIF NEW.target_type = 'ANSWER' THEN
      SELECT user_id INTO v_target_user_id FROM answers WHERE id = NEW.target_id;
      v_final_change := CASE WHEN NEW.value = 1 THEN 10 ELSE -5 END;
    END IF;
    v_reason := 'VOTE_' || NEW.value::TEXT;
    v_ref_id := NEW.target_id;
    
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.value = NEW.value THEN
      RETURN NEW;
    END IF;
    
    IF NEW.target_type = 'QUESTION' THEN
      SELECT user_id INTO v_target_user_id FROM questions WHERE id = NEW.target_id;
      v_old_reputation_change := CASE WHEN OLD.value = 1 THEN 5 ELSE -2 END;
      v_new_reputation_change := CASE WHEN NEW.value = 1 THEN 5 ELSE -2 END;
    ELSIF NEW.target_type = 'ANSWER' THEN
      SELECT user_id INTO v_target_user_id FROM answers WHERE id = NEW.target_id;
      v_old_reputation_change := CASE WHEN OLD.value = 1 THEN 10 ELSE -5 END;
      v_new_reputation_change := CASE WHEN NEW.value = 1 THEN 10 ELSE -5 END;
    END IF;
    v_final_change := v_new_reputation_change - v_old_reputation_change;
    v_reason := 'VOTE_CHANGE_' || OLD.value::TEXT || '_TO_' || NEW.value::TEXT;
    v_ref_id := NEW.target_id;
  END IF;

  -- Apply change to profiles
  IF v_target_user_id IS NOT NULL AND v_final_change <> 0 THEN
    UPDATE profiles SET reputation = reputation + v_final_change WHERE id = v_target_user_id;
    
    -- Log the change
    INSERT INTO reputation_logs (user_id, points, reason, reference_id)
    VALUES (v_target_user_id, v_final_change, v_reason, v_ref_id);
  END IF;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger to monitor all vote updates (INSERT, UPDATE, DELETE)
DROP TRIGGER IF EXISTS trg_reputation_on_vote ON votes;
CREATE TRIGGER trg_reputation_on_vote
  AFTER INSERT OR UPDATE OR DELETE ON votes
  FOR EACH ROW EXECUTE FUNCTION apply_reputation_on_vote();

-- Create an RPC to increment question views securely bypassing RLS
CREATE OR REPLACE FUNCTION increment_question_views(question_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE questions
  SET views = COALESCE(views, 0) + 1
  WHERE id = question_id;
END;
$$;

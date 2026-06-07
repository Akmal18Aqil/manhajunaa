-- Helper Functions for RLS

CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
  SELECT COALESCE(role, 'ZAIR'::user_role) FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION is_banned_user()
RETURNS BOOLEAN AS $$
  SELECT COALESCE(is_banned, false) FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- RLS Policies

-- Profiles: Everyone can read public profiles, users can edit own
CREATE POLICY "profiles_public_read" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_own_update" ON profiles FOR UPDATE USING (id = auth.uid());

-- Questions: Everyone can read, authenticated users can create
CREATE POLICY "questions_public_read" ON questions FOR SELECT USING (true);
CREATE POLICY "questions_auth_insert" ON questions FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND NOT is_banned_user());
CREATE POLICY "questions_owner_or_mod_update" ON questions FOR UPDATE
  USING (user_id = auth.uid() OR get_user_role() IN ('MURAQI', 'MUDIR'));
CREATE POLICY "questions_mod_delete" ON questions FOR DELETE
  USING (user_id = auth.uid() OR get_user_role() IN ('MURAQI', 'MUDIR'));

-- Answers: Everyone can read, authenticated users can create
CREATE POLICY "answers_public_read" ON answers FOR SELECT USING (true);
CREATE POLICY "answers_auth_insert" ON answers FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND NOT is_banned_user());
CREATE POLICY "answers_owner_or_mod_update" ON answers FOR UPDATE
  USING (user_id = auth.uid() OR get_user_role() IN ('MURAQI', 'MUDIR'));
CREATE POLICY "answers_mod_delete" ON answers FOR DELETE
  USING (user_id = auth.uid() OR get_user_role() IN ('MURAQI', 'MUDIR'));

-- Votes: Users can only manage their own votes
CREATE POLICY "votes_own_all" ON votes FOR ALL USING (user_id = auth.uid());

-- References: Everyone can read, owners can insert, Muraqi can validate
CREATE POLICY "refs_public_read" ON "references" FOR SELECT USING (true);
CREATE POLICY "refs_owner_insert" ON "references" FOR INSERT
  WITH CHECK (auth.uid() = (SELECT user_id FROM answers WHERE id = answer_id));
CREATE POLICY "refs_owner_or_muraqi_update" ON "references" FOR UPDATE
  USING (
    auth.uid() = (SELECT user_id FROM answers WHERE id = answer_id)
    OR get_user_role() IN ('MURAQI', 'MUDIR')
  );

-- Comments: Everyone can read, authenticated can create, owner/mod can delete
CREATE POLICY "comments_public_read" ON comments FOR SELECT USING (true);
CREATE POLICY "comments_auth_insert" ON comments FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND NOT is_banned_user());
CREATE POLICY "comments_owner_or_mod_delete" ON comments FOR DELETE
  USING (user_id = auth.uid() OR get_user_role() IN ('MURAQI', 'MUDIR'));

-- Notifications: Users can only see their own
CREATE POLICY "notif_own_read" ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "notif_own_update" ON notifications FOR UPDATE USING (user_id = auth.uid());

-- Bookmarks: Users can only manage their own
CREATE POLICY "bookmarks_own_all" ON bookmarks FOR ALL USING (user_id = auth.uid());

-- User Badges: Everyone can read
CREATE POLICY "user_badges_public_read" ON user_badges FOR SELECT USING (true);

-- Kitab Master: Everyone can read, Muraqi/Mudir can manage
CREATE POLICY "kitab_public_read" ON kitab_master FOR SELECT USING (true);
CREATE POLICY "kitab_muraqi_write" ON kitab_master FOR INSERT
  WITH CHECK (get_user_role() IN ('MURAQI', 'MUDIR'));
CREATE POLICY "kitab_muraqi_update" ON kitab_master FOR UPDATE
  USING (get_user_role() IN ('MURAQI', 'MUDIR'));
CREATE POLICY "kitab_muraqi_delete" ON kitab_master FOR DELETE
  USING (get_user_role() IN ('MURAQI', 'MUDIR'));

-- Tags: Everyone can read, Muraqi/Mudir can manage
CREATE POLICY "tags_public_read" ON tags FOR SELECT USING (true);
CREATE POLICY "tags_muraqi_write" ON tags FOR INSERT
  WITH CHECK (get_user_role() IN ('MURAQI', 'MUDIR'));
CREATE POLICY "tags_muraqi_update" ON tags FOR UPDATE
  USING (get_user_role() IN ('MURAQI', 'MUDIR'));

-- Badges: Everyone can read
CREATE POLICY "badges_public_read" ON badges FOR SELECT USING (true);

-- Reputation Logs: Everyone can read
CREATE POLICY "rep_logs_public_read" ON reputation_logs FOR SELECT USING (true);

-- Question Tags: Everyone can read
CREATE POLICY "question_tags_public_read" ON question_tags FOR SELECT USING (true);

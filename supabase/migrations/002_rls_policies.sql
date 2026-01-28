-- =====================================================
-- TelAfrik RLS (Row Level Security) Policies
-- Run this AFTER 001_initial_schema.sql
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE founders ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_founders ENABLE ROW LEVEL SECURITY;
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_round_investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE valuation_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_shortlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE correction_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE intro_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_messages ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PUBLIC READ POLICIES (Directory Data)
-- Anyone can read these without authentication
-- =====================================================

-- Countries (public read)
CREATE POLICY "Anyone can read countries"
  ON countries FOR SELECT
  USING (true);

-- Sectors (public read)
CREATE POLICY "Anyone can read sectors"
  ON sectors FOR SELECT
  USING (true);

-- Companies (public read)
CREATE POLICY "Anyone can read companies"
  ON companies FOR SELECT
  USING (true);

-- Founders (public read)
CREATE POLICY "Anyone can read founders"
  ON founders FOR SELECT
  USING (true);

-- Company Founders (public read)
CREATE POLICY "Anyone can read company_founders"
  ON company_founders FOR SELECT
  USING (true);

-- Investors (public read)
CREATE POLICY "Anyone can read investors"
  ON investors FOR SELECT
  USING (true);

-- Investor Sectors (public read)
CREATE POLICY "Anyone can read investor_sectors"
  ON investor_sectors FOR SELECT
  USING (true);

-- Investor Regions (public read)
CREATE POLICY "Anyone can read investor_regions"
  ON investor_regions FOR SELECT
  USING (true);

-- Company Countries (public read)
CREATE POLICY "Anyone can read company_countries"
  ON company_countries FOR SELECT
  USING (true);

-- Funding Rounds (public read)
CREATE POLICY "Anyone can read funding_rounds"
  ON funding_rounds FOR SELECT
  USING (true);

-- Funding Round Investors (public read)
CREATE POLICY "Anyone can read funding_round_investors"
  ON funding_round_investors FOR SELECT
  USING (true);

-- Revenue Metrics (public read)
CREATE POLICY "Anyone can read revenue_metrics"
  ON revenue_metrics FOR SELECT
  USING (true);

-- Valuation Metrics (public read)
CREATE POLICY "Anyone can read valuation_metrics"
  ON valuation_metrics FOR SELECT
  USING (true);

-- =====================================================
-- ADMIN WRITE POLICIES (Directory Data)
-- Only admins can insert/update/delete directory data
-- =====================================================

CREATE POLICY "Admins can manage countries"
  ON countries FOR ALL
  USING (has_role('admin', auth.uid()))
  WITH CHECK (has_role('admin', auth.uid()));

CREATE POLICY "Admins can manage sectors"
  ON sectors FOR ALL
  USING (has_role('admin', auth.uid()))
  WITH CHECK (has_role('admin', auth.uid()));

CREATE POLICY "Admins can manage companies"
  ON companies FOR ALL
  USING (has_role('admin', auth.uid()))
  WITH CHECK (has_role('admin', auth.uid()));

CREATE POLICY "Admins can manage founders"
  ON founders FOR ALL
  USING (has_role('admin', auth.uid()))
  WITH CHECK (has_role('admin', auth.uid()));

CREATE POLICY "Admins can manage company_founders"
  ON company_founders FOR ALL
  USING (has_role('admin', auth.uid()))
  WITH CHECK (has_role('admin', auth.uid()));

CREATE POLICY "Admins can manage investors"
  ON investors FOR ALL
  USING (has_role('admin', auth.uid()))
  WITH CHECK (has_role('admin', auth.uid()));

CREATE POLICY "Admins can manage investor_sectors"
  ON investor_sectors FOR ALL
  USING (has_role('admin', auth.uid()))
  WITH CHECK (has_role('admin', auth.uid()));

CREATE POLICY "Admins can manage investor_regions"
  ON investor_regions FOR ALL
  USING (has_role('admin', auth.uid()))
  WITH CHECK (has_role('admin', auth.uid()));

CREATE POLICY "Admins can manage company_countries"
  ON company_countries FOR ALL
  USING (has_role('admin', auth.uid()))
  WITH CHECK (has_role('admin', auth.uid()));

CREATE POLICY "Admins can manage funding_rounds"
  ON funding_rounds FOR ALL
  USING (has_role('admin', auth.uid()))
  WITH CHECK (has_role('admin', auth.uid()));

CREATE POLICY "Admins can manage funding_round_investors"
  ON funding_round_investors FOR ALL
  USING (has_role('admin', auth.uid()))
  WITH CHECK (has_role('admin', auth.uid()));

CREATE POLICY "Admins can manage revenue_metrics"
  ON revenue_metrics FOR ALL
  USING (has_role('admin', auth.uid()))
  WITH CHECK (has_role('admin', auth.uid()));

CREATE POLICY "Admins can manage valuation_metrics"
  ON valuation_metrics FOR ALL
  USING (has_role('admin', auth.uid()))
  WITH CHECK (has_role('admin', auth.uid()));

-- =====================================================
-- USER-OWNED DATA POLICIES
-- Users can only access their own data
-- =====================================================

-- Profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- User Roles (read only for users, admins can manage)
CREATE POLICY "Users can view own roles"
  ON user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON user_roles FOR ALL
  USING (has_role('admin', auth.uid()))
  WITH CHECK (has_role('admin', auth.uid()));

-- Watchlists
CREATE POLICY "Users can manage own watchlists"
  ON watchlists FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Watchlist Companies
CREATE POLICY "Users can manage own watchlist companies"
  ON watchlist_companies FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM watchlists 
      WHERE watchlists.id = watchlist_companies.watchlist_id 
      AND watchlists.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM watchlists 
      WHERE watchlists.id = watchlist_companies.watchlist_id 
      AND watchlists.user_id = auth.uid()
    )
  );

-- Saved Collections
CREATE POLICY "Users can manage own collections"
  ON saved_collections FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Saved Collection Items
CREATE POLICY "Users can manage own collection items"
  ON saved_collection_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM saved_collections 
      WHERE saved_collections.id = saved_collection_items.collection_id 
      AND saved_collections.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM saved_collections 
      WHERE saved_collections.id = saved_collection_items.collection_id 
      AND saved_collections.user_id = auth.uid()
    )
  );

-- Saved Shortlists
CREATE POLICY "Users can manage own shortlists"
  ON saved_shortlists FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Saved Shortlist Items
CREATE POLICY "Users can manage own shortlist items"
  ON saved_shortlist_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM saved_shortlists 
      WHERE saved_shortlists.id = saved_shortlist_items.shortlist_id 
      AND saved_shortlists.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM saved_shortlists 
      WHERE saved_shortlists.id = saved_shortlist_items.shortlist_id 
      AND saved_shortlists.user_id = auth.uid()
    )
  );

-- =====================================================
-- CLAIMS & CORRECTIONS
-- =====================================================

-- Claims - users can create and view their own
CREATE POLICY "Users can view own claims"
  ON claims FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create claims"
  ON claims FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all claims"
  ON claims FOR ALL
  USING (has_role('admin', auth.uid()))
  WITH CHECK (has_role('admin', auth.uid()));

-- Correction Requests - anyone can create, users see their own
CREATE POLICY "Users can view own correction requests"
  ON correction_requests FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create correction requests"
  ON correction_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can manage all correction requests"
  ON correction_requests FOR ALL
  USING (has_role('admin', auth.uid()))
  WITH CHECK (has_role('admin', auth.uid()));

-- =====================================================
-- KONEKTAFRIK (Matching & Intros)
-- =====================================================

-- Match Profiles
CREATE POLICY "Users can manage own match profiles"
  ON match_profiles FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Match Results (read own results)
CREATE POLICY "Users can view own match results"
  ON match_results FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM match_profiles 
      WHERE match_profiles.id = match_results.match_profile_id 
      AND match_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert match results"
  ON match_results FOR INSERT
  WITH CHECK (true); -- Edge function inserts these

-- Intro Requests
CREATE POLICY "Users can manage own intro requests"
  ON intro_requests FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all intro requests"
  ON intro_requests FOR ALL
  USING (has_role('admin', auth.uid()))
  WITH CHECK (has_role('admin', auth.uid()));

-- =====================================================
-- AI CHAT
-- =====================================================

-- AI Chat Sessions
CREATE POLICY "Users can manage own chat sessions"
  ON ai_chat_sessions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- AI Chat Messages
CREATE POLICY "Users can manage own chat messages"
  ON ai_chat_messages FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM ai_chat_sessions 
      WHERE ai_chat_sessions.id = ai_chat_messages.session_id 
      AND ai_chat_sessions.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM ai_chat_sessions 
      WHERE ai_chat_sessions.id = ai_chat_messages.session_id 
      AND ai_chat_sessions.user_id = auth.uid()
    )
  );

-- =====================================================
-- PROFILE AUTO-CREATE TRIGGER
-- =====================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name')
  );
  
  -- Also give them default user role
  INSERT INTO user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

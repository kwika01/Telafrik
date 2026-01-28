-- =====================================================
-- TelAfrik Database Schema
-- Run this in your Supabase SQL Editor
-- =====================================================

-- =====================================================
-- 1. ENUMS
-- =====================================================

CREATE TYPE african_region AS ENUM (
  'West Africa',
  'East Africa', 
  'North Africa',
  'Central Africa',
  'Southern Africa'
);

CREATE TYPE business_model AS ENUM (
  'B2B', 'B2C', 'B2B2C', 'Marketplace', 'SaaS', 'Other'
);

CREATE TYPE funding_stage AS ENUM (
  'Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+', 'Grant', 'Debt', 'Unknown'
);

CREATE TYPE data_source_type AS ENUM (
  'Verified', 'Reported', 'Estimated'
);

CREATE TYPE claim_status AS ENUM (
  'pending', 'approved', 'rejected'
);

CREATE TYPE app_role AS ENUM (
  'admin', 'moderator', 'user'
);

-- =====================================================
-- 2. CORE TABLES (TelAfrik Data)
-- =====================================================

-- Countries
CREATE TABLE countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  region african_region NOT NULL,
  flag_emoji TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sectors  
CREATE TABLE sectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  market_overview TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Companies (Startups)
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT,
  description TEXT,
  logo_url TEXT,
  year_founded INTEGER,
  hq_country_id UUID REFERENCES countries(id),
  sector_id UUID REFERENCES sectors(id),
  sub_sector TEXT,
  business_model business_model,
  primary_domain TEXT,
  website_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  github_url TEXT,
  ios_app_url TEXT,
  android_app_url TEXT,
  employee_count_min INTEGER,
  employee_count_max INTEGER,
  is_hiring BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  trending_score INTEGER DEFAULT 0,
  total_funding_usd BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Founders
CREATE TABLE founders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  title TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Company-Founders Junction
CREATE TABLE company_founders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  founder_id UUID NOT NULL REFERENCES founders(id) ON DELETE CASCADE,
  role TEXT,
  is_current BOOLEAN DEFAULT TRUE,
  UNIQUE(company_id, founder_id)
);

-- Investors
CREATE TABLE investors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL, -- 'VC', 'PE', 'Angel', 'Accelerator', 'Corporate', 'Family Office'
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  linkedin_url TEXT,
  hq_country_id UUID REFERENCES countries(id),
  total_investments INTEGER DEFAULT 0,
  portfolio_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Investor Sectors (many-to-many)
CREATE TABLE investor_sectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id UUID NOT NULL REFERENCES investors(id) ON DELETE CASCADE,
  sector_id UUID NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
  UNIQUE(investor_id, sector_id)
);

-- Investor Regions (many-to-many)
CREATE TABLE investor_regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id UUID NOT NULL REFERENCES investors(id) ON DELETE CASCADE,
  region african_region NOT NULL,
  UNIQUE(investor_id, region)
);

-- Company Countries (operating countries)
CREATE TABLE company_countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  is_hq BOOLEAN DEFAULT FALSE,
  UNIQUE(company_id, country_id)
);

-- =====================================================
-- 3. FUNDING TABLES (TelAfrik Signals)
-- =====================================================

-- Funding Rounds
CREATE TABLE funding_rounds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  stage funding_stage NOT NULL,
  amount_usd BIGINT,
  amount_disclosed BOOLEAN DEFAULT TRUE,
  date DATE,
  valuation_usd BIGINT,
  source_type data_source_type,
  source_url TEXT,
  confidence_score INTEGER DEFAULT 50,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Funding Round Investors (many-to-many)
CREATE TABLE funding_round_investors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funding_round_id UUID NOT NULL REFERENCES funding_rounds(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES investors(id) ON DELETE CASCADE,
  is_lead BOOLEAN DEFAULT FALSE,
  UNIQUE(funding_round_id, investor_id)
);

-- Revenue Metrics
CREATE TABLE revenue_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL, -- 'ARR', 'MRR', 'GMV', 'Net Revenue'
  min_value_usd BIGINT,
  max_value_usd BIGINT,
  as_of_date DATE,
  source_type data_source_type,
  source_url TEXT,
  confidence_score INTEGER DEFAULT 50,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Valuation Metrics
CREATE TABLE valuation_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  min_value_usd BIGINT,
  max_value_usd BIGINT,
  is_post_money BOOLEAN DEFAULT TRUE,
  as_of_date DATE,
  source_type data_source_type,
  source_url TEXT,
  confidence_score INTEGER DEFAULT 50,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 4. USER TABLES
-- =====================================================

-- User Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  company_affiliation UUID REFERENCES companies(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Roles
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE(user_id, role)
);

-- Watchlists
CREATE TABLE watchlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'My Watchlist',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Watchlist Companies
CREATE TABLE watchlist_companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  watchlist_id UUID NOT NULL REFERENCES watchlists(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(watchlist_id, company_id)
);

-- Saved Collections
CREATE TABLE saved_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved Collection Items
CREATE TABLE saved_collection_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID NOT NULL REFERENCES saved_collections(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL, -- 'company', 'investor', 'founder'
  entity_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(collection_id, entity_type, entity_id)
);

-- Saved Shortlists (for investors)
CREATE TABLE saved_shortlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'My Investor Shortlist',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved Shortlist Items
CREATE TABLE saved_shortlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shortlist_id UUID NOT NULL REFERENCES saved_shortlists(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES investors(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(shortlist_id, investor_id)
);

-- =====================================================
-- 5. CLAIMS & CORRECTIONS
-- =====================================================

-- Claims (founder claiming their company)
CREATE TABLE claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  role_at_company TEXT NOT NULL,
  email_domain TEXT,
  proof_url TEXT,
  notes TEXT,
  status claim_status DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Correction Requests
CREATE TABLE correction_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  email TEXT,
  field_name TEXT NOT NULL,
  current_value TEXT,
  suggested_value TEXT,
  source_url TEXT,
  notes TEXT,
  status claim_status DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 6. KONEKTAFRIK (Matching & Intros)
-- =====================================================

-- Match Profiles (founder fills this for AI matching)
CREATE TABLE match_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  startup_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  raise_stage TEXT NOT NULL,
  raise_amount_min BIGINT,
  raise_amount_max BIGINT,
  target_geos TEXT[],
  sector TEXT,
  sub_sector TEXT,
  traction_notes TEXT,
  investor_preferences TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Match Results (AI-generated matches)
CREATE TABLE match_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_profile_id UUID NOT NULL REFERENCES match_profiles(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES investors(id) ON DELETE CASCADE,
  fit_score INTEGER NOT NULL DEFAULT 0,
  fit_tags TEXT[],
  why_bullets JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(match_profile_id, investor_id)
);

-- Intro Requests
CREATE TABLE intro_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  startup_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES investors(id) ON DELETE CASCADE,
  match_result_id UUID REFERENCES match_results(id),
  founder_message TEXT,
  contact_email TEXT,
  status TEXT NOT NULL DEFAULT 'queued', -- 'queued', 'sent', 'replied', 'closed'
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 7. ASK TELAFRIK (AI Chat)
-- =====================================================

-- AI Chat Sessions
CREATE TABLE ai_chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'New Chat',
  scope TEXT DEFAULT 'startups', -- 'startups', 'investors', 'founders', 'funding'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Chat Messages
CREATE TABLE ai_chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES ai_chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- 'user', 'assistant'
  content TEXT NOT NULL,
  structured_response JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 8. INDEXES (for performance)
-- =====================================================

-- Companies
CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_companies_sector ON companies(sector_id);
CREATE INDEX idx_companies_country ON companies(hq_country_id);
CREATE INDEX idx_companies_trending ON companies(trending_score DESC);
CREATE INDEX idx_companies_funding ON companies(total_funding_usd DESC);
CREATE INDEX idx_companies_name ON companies(name);

-- Investors
CREATE INDEX idx_investors_slug ON investors(slug);
CREATE INDEX idx_investors_type ON investors(type);
CREATE INDEX idx_investors_country ON investors(hq_country_id);

-- Founders
CREATE INDEX idx_founders_slug ON founders(slug);

-- Funding Rounds
CREATE INDEX idx_funding_rounds_company ON funding_rounds(company_id);
CREATE INDEX idx_funding_rounds_date ON funding_rounds(date DESC);

-- User-related
CREATE INDEX idx_watchlist_companies_company ON watchlist_companies(company_id);
CREATE INDEX idx_claims_user ON claims(user_id);
CREATE INDEX idx_claims_company ON claims(company_id);
CREATE INDEX idx_match_profiles_user ON match_profiles(user_id);
CREATE INDEX idx_intro_requests_user ON intro_requests(user_id);
CREATE INDEX idx_ai_chat_sessions_user ON ai_chat_sessions(user_id);

-- =====================================================
-- 9. TRIGGERS (auto-update timestamps)
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_companies_timestamp BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_founders_timestamp BEFORE UPDATE ON founders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_investors_timestamp BEFORE UPDATE ON investors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_profiles_timestamp BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_watchlists_timestamp BEFORE UPDATE ON watchlists
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_funding_rounds_timestamp BEFORE UPDATE ON funding_rounds
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_claims_timestamp BEFORE UPDATE ON claims
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_match_profiles_timestamp BEFORE UPDATE ON match_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_intro_requests_timestamp BEFORE UPDATE ON intro_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_ai_chat_sessions_timestamp BEFORE UPDATE ON ai_chat_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================================================
-- 10. HELPER FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION has_role(_role app_role, _user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = _user_id AND role = _role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================
-- AFRICABASE DATABASE SCHEMA
-- Complete startup intelligence platform
-- ==========================================

-- ENUMS
CREATE TYPE public.business_model AS ENUM ('B2B', 'B2C', 'B2B2C', 'Marketplace', 'SaaS', 'Other');
CREATE TYPE public.funding_stage AS ENUM ('Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+', 'Grant', 'Debt', 'Unknown');
CREATE TYPE public.data_source_type AS ENUM ('Verified', 'Reported', 'Estimated');
CREATE TYPE public.claim_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.african_region AS ENUM ('West Africa', 'East Africa', 'North Africa', 'Central Africa', 'Southern Africa');

-- SECTORS TABLE
CREATE TABLE public.sectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  market_overview TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- COUNTRIES TABLE
CREATE TABLE public.countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  region public.african_region NOT NULL,
  flag_emoji TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- COMPANIES TABLE
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT,
  description TEXT,
  logo_url TEXT,
  year_founded INTEGER,
  hq_country_id UUID REFERENCES public.countries(id),
  sector_id UUID REFERENCES public.sectors(id),
  sub_sector TEXT,
  business_model public.business_model,
  primary_domain TEXT,
  website_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  github_url TEXT,
  ios_app_url TEXT,
  android_app_url TEXT,
  employee_count_min INTEGER,
  employee_count_max INTEGER,
  is_hiring BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  trending_score INTEGER DEFAULT 0,
  total_funding_usd BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- COMPANY COUNTRIES (many-to-many for countries of operation)
CREATE TABLE public.company_countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  country_id UUID NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  is_hq BOOLEAN DEFAULT false,
  UNIQUE(company_id, country_id)
);

-- FOUNDERS TABLE
CREATE TABLE public.founders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  title TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- COMPANY FOUNDERS (many-to-many)
CREATE TABLE public.company_founders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  founder_id UUID NOT NULL REFERENCES public.founders(id) ON DELETE CASCADE,
  role TEXT,
  is_current BOOLEAN DEFAULT true,
  UNIQUE(company_id, founder_id)
);

-- INVESTORS TABLE
CREATE TABLE public.investors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL, -- VC, Angel, Accelerator, Corporate, etc.
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  linkedin_url TEXT,
  hq_country_id UUID REFERENCES public.countries(id),
  total_investments INTEGER DEFAULT 0,
  portfolio_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- INVESTOR FOCUS SECTORS
CREATE TABLE public.investor_sectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id UUID NOT NULL REFERENCES public.investors(id) ON DELETE CASCADE,
  sector_id UUID NOT NULL REFERENCES public.sectors(id) ON DELETE CASCADE,
  UNIQUE(investor_id, sector_id)
);

-- INVESTOR FOCUS REGIONS
CREATE TABLE public.investor_regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id UUID NOT NULL REFERENCES public.investors(id) ON DELETE CASCADE,
  region public.african_region NOT NULL,
  UNIQUE(investor_id, region)
);

-- FUNDING ROUNDS TABLE
CREATE TABLE public.funding_rounds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  stage public.funding_stage NOT NULL,
  amount_usd BIGINT,
  amount_disclosed BOOLEAN DEFAULT true,
  date DATE,
  valuation_usd BIGINT,
  source_type public.data_source_type DEFAULT 'Estimated',
  source_url TEXT,
  confidence_score INTEGER DEFAULT 50 CHECK (confidence_score >= 0 AND confidence_score <= 100),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- FUNDING ROUND INVESTORS (many-to-many)
CREATE TABLE public.funding_round_investors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funding_round_id UUID NOT NULL REFERENCES public.funding_rounds(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES public.investors(id) ON DELETE CASCADE,
  is_lead BOOLEAN DEFAULT false,
  UNIQUE(funding_round_id, investor_id)
);

-- REVENUE METRICS TABLE
CREATE TABLE public.revenue_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL, -- ARR, MRR, GMV, Net Revenue
  min_value_usd BIGINT,
  max_value_usd BIGINT,
  as_of_date DATE,
  source_type public.data_source_type DEFAULT 'Estimated',
  source_url TEXT,
  confidence_score INTEGER DEFAULT 50 CHECK (confidence_score >= 0 AND confidence_score <= 100),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- VALUATION METRICS TABLE
CREATE TABLE public.valuation_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  min_value_usd BIGINT,
  max_value_usd BIGINT,
  is_post_money BOOLEAN DEFAULT true,
  as_of_date DATE,
  source_type public.data_source_type DEFAULT 'Estimated',
  source_url TEXT,
  confidence_score INTEGER DEFAULT 50 CHECK (confidence_score >= 0 AND confidence_score <= 100),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- PROFILES TABLE (for authenticated users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  company_affiliation UUID REFERENCES public.companies(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- USER ROLES TABLE (security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- CLAIMS TABLE (founder verification system)
CREATE TABLE public.claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  role_at_company TEXT NOT NULL,
  email_domain TEXT,
  proof_url TEXT,
  notes TEXT,
  status public.claim_status DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- CORRECTION REQUESTS TABLE
CREATE TABLE public.correction_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  email TEXT,
  field_name TEXT NOT NULL,
  current_value TEXT,
  suggested_value TEXT,
  source_url TEXT,
  notes TEXT,
  status public.claim_status DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- WATCHLISTS TABLE
CREATE TABLE public.watchlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'My Watchlist',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- WATCHLIST COMPANIES
CREATE TABLE public.watchlist_companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  watchlist_id UUID NOT NULL REFERENCES public.watchlists(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(watchlist_id, company_id)
);

-- SOURCES / EVIDENCE TABLE
CREATE TABLE public.sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  source_type TEXT, -- Press, Report, Official, etc.
  published_at DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==========================================
-- INDEXES FOR PERFORMANCE
-- ==========================================
CREATE INDEX idx_companies_sector ON public.companies(sector_id);
CREATE INDEX idx_companies_country ON public.companies(hq_country_id);
CREATE INDEX idx_companies_trending ON public.companies(trending_score DESC);
CREATE INDEX idx_companies_funding ON public.companies(total_funding_usd DESC);
CREATE INDEX idx_companies_slug ON public.companies(slug);
CREATE INDEX idx_funding_rounds_company ON public.funding_rounds(company_id);
CREATE INDEX idx_revenue_metrics_company ON public.revenue_metrics(company_id);
CREATE INDEX idx_valuation_metrics_company ON public.valuation_metrics(company_id);
CREATE INDEX idx_claims_status ON public.claims(status);
CREATE INDEX idx_claims_user ON public.claims(user_id);
CREATE INDEX idx_watchlist_user ON public.watchlists(user_id);

-- ==========================================
-- ENABLE RLS ON ALL TABLES
-- ==========================================
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_founders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funding_rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funding_round_investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valuation_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.correction_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlist_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- RLS POLICIES - PUBLIC READ ACCESS
-- ==========================================
-- Sectors, Countries, Companies, Founders, Investors are PUBLIC
CREATE POLICY "Public read access for sectors" ON public.sectors FOR SELECT USING (true);
CREATE POLICY "Public read access for countries" ON public.countries FOR SELECT USING (true);
CREATE POLICY "Public read access for companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Public read access for company_countries" ON public.company_countries FOR SELECT USING (true);
CREATE POLICY "Public read access for founders" ON public.founders FOR SELECT USING (true);
CREATE POLICY "Public read access for company_founders" ON public.company_founders FOR SELECT USING (true);
CREATE POLICY "Public read access for investors" ON public.investors FOR SELECT USING (true);
CREATE POLICY "Public read access for investor_sectors" ON public.investor_sectors FOR SELECT USING (true);
CREATE POLICY "Public read access for investor_regions" ON public.investor_regions FOR SELECT USING (true);
CREATE POLICY "Public read access for funding_rounds" ON public.funding_rounds FOR SELECT USING (true);
CREATE POLICY "Public read access for funding_round_investors" ON public.funding_round_investors FOR SELECT USING (true);
CREATE POLICY "Public read access for revenue_metrics" ON public.revenue_metrics FOR SELECT USING (true);
CREATE POLICY "Public read access for valuation_metrics" ON public.valuation_metrics FOR SELECT USING (true);
CREATE POLICY "Public read access for sources" ON public.sources FOR SELECT USING (true);

-- ==========================================
-- RLS POLICIES - USER-SPECIFIC DATA
-- ==========================================
-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- User Roles (read-only for users, managed by admin functions)
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Watchlists
CREATE POLICY "Users can view own watchlists" ON public.watchlists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own watchlists" ON public.watchlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own watchlists" ON public.watchlists FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own watchlists" ON public.watchlists FOR DELETE USING (auth.uid() = user_id);

-- Watchlist Companies
CREATE POLICY "Users can view own watchlist companies" ON public.watchlist_companies 
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.watchlists WHERE id = watchlist_id AND user_id = auth.uid())
  );
CREATE POLICY "Users can add to own watchlists" ON public.watchlist_companies 
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.watchlists WHERE id = watchlist_id AND user_id = auth.uid())
  );
CREATE POLICY "Users can remove from own watchlists" ON public.watchlist_companies 
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.watchlists WHERE id = watchlist_id AND user_id = auth.uid())
  );

-- Claims
CREATE POLICY "Users can view own claims" ON public.claims FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can submit claims" ON public.claims FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Correction Requests
CREATE POLICY "Anyone can submit corrections" ON public.correction_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own corrections" ON public.correction_requests FOR SELECT USING (auth.uid() = user_id);

-- ==========================================
-- SECURITY DEFINER FUNCTION FOR ROLE CHECK
-- ==========================================
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- ==========================================
-- TRIGGER FOR PROFILE CREATION
-- ==========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  -- Create default watchlist
  INSERT INTO public.watchlists (user_id, name, is_default)
  VALUES (NEW.id, 'My Watchlist', true);
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- TRIGGER FOR UPDATED_AT
-- ==========================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_founders_updated_at BEFORE UPDATE ON public.founders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_investors_updated_at BEFORE UPDATE ON public.investors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sectors_updated_at BEFORE UPDATE ON public.sectors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_funding_rounds_updated_at BEFORE UPDATE ON public.funding_rounds FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_revenue_metrics_updated_at BEFORE UPDATE ON public.revenue_metrics FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_valuation_metrics_updated_at BEFORE UPDATE ON public.valuation_metrics FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_claims_updated_at BEFORE UPDATE ON public.claims FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_watchlists_updated_at BEFORE UPDATE ON public.watchlists FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
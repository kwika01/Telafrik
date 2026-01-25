-- Match profiles table for founder matching preferences
CREATE TABLE public.match_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  startup_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  raise_stage TEXT NOT NULL,
  raise_amount_min BIGINT,
  raise_amount_max BIGINT,
  target_geos TEXT[] DEFAULT '{}',
  sector TEXT,
  sub_sector TEXT,
  traction_notes TEXT,
  investor_preferences TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Match results from AI scoring
CREATE TABLE public.match_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  match_profile_id UUID NOT NULL REFERENCES public.match_profiles(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES public.investors(id) ON DELETE CASCADE,
  fit_score INTEGER NOT NULL DEFAULT 0,
  why_bullets JSONB DEFAULT '[]',
  fit_tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Intro requests from founders to investors
CREATE TABLE public.intro_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  startup_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES public.investors(id) ON DELETE CASCADE,
  match_result_id UUID REFERENCES public.match_results(id) ON DELETE SET NULL,
  founder_message TEXT,
  contact_email TEXT,
  status TEXT NOT NULL DEFAULT 'queued',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Saved shortlists for investors
CREATE TABLE public.saved_shortlists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL DEFAULT 'My Shortlist',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Shortlist items
CREATE TABLE public.saved_shortlist_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shortlist_id UUID NOT NULL REFERENCES public.saved_shortlists(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES public.investors(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(shortlist_id, investor_id)
);

-- Enable RLS on all tables
ALTER TABLE public.match_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intro_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_shortlist_items ENABLE ROW LEVEL SECURITY;

-- Match profiles policies
CREATE POLICY "Users can view own match profiles" ON public.match_profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own match profiles" ON public.match_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own match profiles" ON public.match_profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own match profiles" ON public.match_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Match results policies
CREATE POLICY "Users can view match results for own profiles" ON public.match_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.match_profiles
      WHERE match_profiles.id = match_results.match_profile_id
      AND match_profiles.user_id = auth.uid()
    )
  );
CREATE POLICY "System can insert match results" ON public.match_results
  FOR INSERT WITH CHECK (true);

-- Intro requests policies
CREATE POLICY "Users can view own intro requests" ON public.intro_requests
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own intro requests" ON public.intro_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own intro requests" ON public.intro_requests
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all intro requests" ON public.intro_requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'
    )
  );
CREATE POLICY "Admins can update all intro requests" ON public.intro_requests
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'
    )
  );

-- Saved shortlists policies
CREATE POLICY "Users can view own shortlists" ON public.saved_shortlists
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own shortlists" ON public.saved_shortlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own shortlists" ON public.saved_shortlists
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own shortlists" ON public.saved_shortlists
  FOR DELETE USING (auth.uid() = user_id);

-- Shortlist items policies
CREATE POLICY "Users can view items from own shortlists" ON public.saved_shortlist_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.saved_shortlists
      WHERE saved_shortlists.id = saved_shortlist_items.shortlist_id
      AND saved_shortlists.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can add items to own shortlists" ON public.saved_shortlist_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.saved_shortlists
      WHERE saved_shortlists.id = saved_shortlist_items.shortlist_id
      AND saved_shortlists.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can remove items from own shortlists" ON public.saved_shortlist_items
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.saved_shortlists
      WHERE saved_shortlists.id = saved_shortlist_items.shortlist_id
      AND saved_shortlists.user_id = auth.uid()
    )
  );

-- Update triggers
CREATE TRIGGER update_match_profiles_updated_at
  BEFORE UPDATE ON public.match_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_intro_requests_updated_at
  BEFORE UPDATE ON public.intro_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_saved_shortlists_updated_at
  BEFORE UPDATE ON public.saved_shortlists
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
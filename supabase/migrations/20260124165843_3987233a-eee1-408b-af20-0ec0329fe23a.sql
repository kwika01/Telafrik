-- Table for AI chat sessions
CREATE TABLE public.ai_chat_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL DEFAULT 'New Chat',
  scope TEXT NOT NULL DEFAULT 'startups',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ai_chat_sessions ENABLE ROW LEVEL SECURITY;

-- RLS policies for ai_chat_sessions
CREATE POLICY "Users can view own chat sessions"
ON public.ai_chat_sessions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own chat sessions"
ON public.ai_chat_sessions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chat sessions"
ON public.ai_chat_sessions FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own chat sessions"
ON public.ai_chat_sessions FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_ai_chat_sessions_updated_at
BEFORE UPDATE ON public.ai_chat_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Table for AI chat messages
CREATE TABLE public.ai_chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.ai_chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  structured_response JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ai_chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for ai_chat_messages
CREATE POLICY "Users can view messages from own sessions"
ON public.ai_chat_messages FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.ai_chat_sessions
  WHERE ai_chat_sessions.id = ai_chat_messages.session_id
  AND ai_chat_sessions.user_id = auth.uid()
));

CREATE POLICY "Users can insert messages to own sessions"
ON public.ai_chat_messages FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.ai_chat_sessions
  WHERE ai_chat_sessions.id = ai_chat_messages.session_id
  AND ai_chat_sessions.user_id = auth.uid()
));

CREATE POLICY "Users can delete messages from own sessions"
ON public.ai_chat_messages FOR DELETE
USING (EXISTS (
  SELECT 1 FROM public.ai_chat_sessions
  WHERE ai_chat_sessions.id = ai_chat_messages.session_id
  AND ai_chat_sessions.user_id = auth.uid()
));

-- Table for saved collections
CREATE TABLE public.saved_collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('startup', 'investor', 'founder', 'funding')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.saved_collections ENABLE ROW LEVEL SECURITY;

-- RLS policies for saved_collections
CREATE POLICY "Users can view own collections"
ON public.saved_collections FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own collections"
ON public.saved_collections FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own collections"
ON public.saved_collections FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own collections"
ON public.saved_collections FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_saved_collections_updated_at
BEFORE UPDATE ON public.saved_collections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Table for saved collection items
CREATE TABLE public.saved_collection_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID NOT NULL REFERENCES public.saved_collections(id) ON DELETE CASCADE,
  entity_id UUID NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('startup', 'investor', 'founder', 'funding')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(collection_id, entity_id, entity_type)
);

-- Enable RLS
ALTER TABLE public.saved_collection_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for saved_collection_items
CREATE POLICY "Users can view items from own collections"
ON public.saved_collection_items FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.saved_collections
  WHERE saved_collections.id = saved_collection_items.collection_id
  AND saved_collections.user_id = auth.uid()
));

CREATE POLICY "Users can add items to own collections"
ON public.saved_collection_items FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.saved_collections
  WHERE saved_collections.id = saved_collection_items.collection_id
  AND saved_collections.user_id = auth.uid()
));

CREATE POLICY "Users can remove items from own collections"
ON public.saved_collection_items FOR DELETE
USING (EXISTS (
  SELECT 1 FROM public.saved_collections
  WHERE saved_collections.id = saved_collection_items.collection_id
  AND saved_collections.user_id = auth.uid()
));
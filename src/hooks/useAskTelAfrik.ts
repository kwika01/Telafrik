import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type SearchScope = 'startups' | 'investors' | 'founders' | 'funding';

export interface EntityResult {
  entity_type: 'startup' | 'investor' | 'founder' | 'funding';
  id: string;
  name: string;
  headline: string;
  country: string;
  sector: string;
  stage: string;
  logo_url?: string;
  score: number;
}

export interface StructuredResponse {
  answer_summary: string;
  filters_applied: Record<string, string | string[]>;
  results: EntityResult[];
  confidence: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  structured_response?: StructuredResponse;
  created_at: string;
}

export interface ChatSession {
  id: string;
  title: string;
  scope: SearchScope;
  created_at: string;
  updated_at: string;
}

export function useAskTelAfrik() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { toast } = useToast();

  const fetchSessions = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('ai_chat_sessions')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch sessions:', error);
      return;
    }

    setSessions(data as ChatSession[]);
  }, []);

  const fetchMessages = useCallback(async (sessionId: string) => {
    const { data, error } = await supabase
      .from('ai_chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Failed to fetch messages:', error);
      return;
    }

    const mappedMessages: ChatMessage[] = (data || []).map(msg => ({
      id: msg.id,
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
      structured_response: msg.structured_response as unknown as StructuredResponse | undefined,
      created_at: msg.created_at,
    }));
    setMessages(mappedMessages);
  }, []);

  const createSession = useCallback(async (scope: SearchScope = 'startups'): Promise<ChatSession | null> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to use Ask TelAfrik',
        variant: 'destructive',
      });
      return null;
    }

    const { data, error } = await supabase
      .from('ai_chat_sessions')
      .insert({ user_id: user.id, scope })
      .select()
      .single();

    if (error) {
      console.error('Failed to create session:', error);
      toast({
        title: 'Error',
        description: 'Failed to create chat session',
        variant: 'destructive',
      });
      return null;
    }

    const session = data as ChatSession;
    setSessions(prev => [session, ...prev]);
    setCurrentSession(session);
    setMessages([]);
    return session;
  }, [toast]);

  const updateSessionTitle = useCallback(async (sessionId: string, title: string) => {
    const { error } = await supabase
      .from('ai_chat_sessions')
      .update({ title })
      .eq('id', sessionId);

    if (error) {
      console.error('Failed to update session title:', error);
      return;
    }

    setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, title } : s));
    if (currentSession?.id === sessionId) {
      setCurrentSession(prev => prev ? { ...prev, title } : null);
    }
  }, [currentSession]);

  const deleteSession = useCallback(async (sessionId: string) => {
    const { error } = await supabase
      .from('ai_chat_sessions')
      .delete()
      .eq('id', sessionId);

    if (error) {
      console.error('Failed to delete session:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete chat',
        variant: 'destructive',
      });
      return;
    }

    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSession?.id === sessionId) {
      setCurrentSession(null);
      setMessages([]);
    }
  }, [currentSession, toast]);

  const selectSession = useCallback(async (session: ChatSession) => {
    setCurrentSession(session);
    await fetchMessages(session.id);
  }, [fetchMessages]);

  const askQuestion = useCallback(async (
    question: string,
    scope: SearchScope,
    sessionId?: string
  ): Promise<StructuredResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Authentication required');
      }

      // Add user message to UI immediately
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: question,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMessage]);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ask-telafrik`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ question, scope, session_id: sessionId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const structuredResponse: StructuredResponse = await response.json();

      // Add assistant message to UI
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: structuredResponse.answer_summary,
        structured_response: structuredResponse,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Refresh sessions to get updated title
      await fetchSessions();

      return structuredResponse;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [fetchSessions, toast]);

  return {
    isLoading,
    error,
    sessions,
    currentSession,
    messages,
    fetchSessions,
    createSession,
    updateSessionTitle,
    deleteSession,
    selectSession,
    askQuestion,
  };
}

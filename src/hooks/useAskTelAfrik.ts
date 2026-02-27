import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

async function fetchCompanyContext(scope: SearchScope, question: string): Promise<string> {
  const lowerQ = question.toLowerCase();

  if (scope === 'startups' || scope === 'funding') {
    let query = supabase
      .from('companies')
      .select('company, sector, country, stage, founding_year, valuation_range, description, about')
      .limit(80);

    const sectorKeywords = ['fintech', 'healthtech', 'cleantech', 'agritech', 'edtech', 'e-commerce', 'logistics', 'hr tech', 'proptech'];
    for (const kw of sectorKeywords) {
      if (lowerQ.includes(kw)) {
        query = query.ilike('sector', `%${kw}%`);
        break;
      }
    }

    const countryKeywords = ['nigeria', 'kenya', 'ghana', 'south africa', 'egypt', 'rwanda', 'ethiopia', 'tanzania', 'uganda', 'senegal'];
    for (const kw of countryKeywords) {
      if (lowerQ.includes(kw)) {
        query = query.ilike('country', `%${kw}%`);
        break;
      }
    }

    const { data } = await query;
    if (!data?.length) return 'No matching startups found in the database.';

    return data.map((c: Record<string, unknown>) =>
      `- ${c.company} | ${c.sector || '—'} | ${c.country || '—'} | ${c.stage || '—'} | Founded: ${c.founding_year || '—'} | Valuation: ${c.valuation_range || '—'} | ${(c.about || c.description || '').toString().slice(0, 120)}`
    ).join('\n');
  }

  if (scope === 'investors') {
    const { data } = await supabase
      .from('investors')
      .select('investor_name, type, hq, stage_focus, sector_focus, ticket_size_usd, portfolio_size')
      .limit(60);

    if (!data?.length) return 'No investor data found.';

    return data.map((i: Record<string, unknown>) =>
      `- ${i.investor_name} | ${i.type || '—'} | HQ: ${i.hq || '—'} | Stage: ${i.stage_focus || '—'} | Sector: ${i.sector_focus || '—'} | Ticket: ${i.ticket_size_usd || '—'}`
    ).join('\n');
  }

  return 'No relevant data found for this scope.';
}

function buildSystemPrompt(scope: SearchScope, context: string): string {
  return `You are Ask TelAfrik, an AI assistant specialized in the African startup ecosystem. You help users discover startups, investors, founders, and funding rounds across Africa.

Current search scope: ${scope}

You have access to the following live data from the TelAfrik database:

${context}

Guidelines:
- Answer questions conversationally and helpfully using ONLY the data provided above.
- When listing companies or investors, present them in a clear, organized format.
- If the data doesn't contain what the user asks for, say so honestly.
- Include relevant details like country, sector, stage, and valuation when available.
- Be concise but thorough. Use bullet points for lists.
- Do NOT make up data that isn't in the context above.`;
}

async function callDeepSeek(
  messages: { role: string; content: string }[],
  systemPrompt: string
): Promise<string> {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DeepSeek API key not configured. Add VITE_DEEPSEEK_API_KEY to your .env file.');
  }

  const response = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content })),
      ],
      temperature: 0.7,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error((err as Record<string, unknown>)?.error?.toString() || `DeepSeek API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'No response generated.';
}

export function useAskTelAfrik() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const conversationRef = useRef<{ role: string; content: string }[]>([]);

  const fetchSessions = useCallback(async () => {
    // Sessions stored in local state only (no Supabase auth required)
  }, []);

  const createSession = useCallback(async (scope: SearchScope = 'startups'): Promise<ChatSession | null> => {
    const session: ChatSession = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      scope,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setSessions(prev => [session, ...prev]);
    setCurrentSession(session);
    setMessages([]);
    conversationRef.current = [];
    return session;
  }, []);

  const updateSessionTitle = useCallback(async (sessionId: string, title: string) => {
    setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, title } : s));
    setCurrentSession(prev => prev?.id === sessionId ? { ...prev, title } : prev);
  }, []);

  const deleteSession = useCallback(async (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSession?.id === sessionId) {
      setCurrentSession(null);
      setMessages([]);
      conversationRef.current = [];
    }
  }, [currentSession]);

  const selectSession = useCallback(async (session: ChatSession) => {
    setCurrentSession(session);
  }, []);

  const askQuestion = useCallback(async (
    question: string,
    scope: SearchScope,
    _sessionId?: string
  ): Promise<StructuredResponse | null> => {
    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: question,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);
    conversationRef.current.push({ role: 'user', content: question });

    try {
      const context = await fetchCompanyContext(scope, question);
      const systemPrompt = buildSystemPrompt(scope, context);
      const reply = await callOpenAI(conversationRef.current, systemPrompt);

      conversationRef.current.push({ role: 'assistant', content: reply });

      const structured: StructuredResponse = {
        answer_summary: reply,
        filters_applied: {},
        results: [],
        confidence: 0.85,
      };

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: reply,
        structured_response: structured,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Auto-title the session from first question
      if (currentSession && currentSession.title === 'New Chat') {
        const title = question.length > 40 ? question.slice(0, 37) + '...' : question;
        setSessions(prev => prev.map(s => s.id === currentSession.id ? { ...s, title } : s));
        setCurrentSession(prev => prev ? { ...prev, title } : null);
      }

      return structured;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);

      const errorAssistant: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorMessage}`,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorAssistant]);

      return null;
    } finally {
      setIsLoading(false);
    }
  }, [currentSession]);

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

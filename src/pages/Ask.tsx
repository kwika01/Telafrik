import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import { ChatPanel } from '@/components/ask/ChatPanel';
import { ResultsPanel } from '@/components/ask/ResultsPanel';
import { useAskTelAfrik, type SearchScope, type StructuredResponse } from '@/hooks/useAskTelAfrik';

const Ask = () => {
  const [scope, setScope] = useState<SearchScope>('startups');
  const [currentResponse, setCurrentResponse] = useState<StructuredResponse | null>(null);

  const {
    isLoading,
    sessions,
    currentSession,
    messages,
    createSession,
    updateSessionTitle,
    deleteSession,
    selectSession,
    askQuestion,
  } = useAskTelAfrik();

  useEffect(() => {
    if (sessions.length === 0 && !currentSession) {
      createSession(scope);
    }
  }, [sessions.length, currentSession, createSession, scope]);

  const handleNewChat = useCallback(async () => {
    const session = await createSession(scope);
    if (session) {
      setCurrentResponse(null);
    }
  }, [createSession, scope]);

  const handleScopeChange = useCallback((newScope: SearchScope) => {
    setScope(newScope);
  }, []);

  const handleSendMessage = useCallback(async (message: string) => {
    let sessionId = currentSession?.id;

    if (!sessionId) {
      const session = await createSession(scope);
      if (!session) return;
      sessionId = session.id;
    }

    const response = await askQuestion(message, scope, sessionId);
    if (response) {
      setCurrentResponse(response);
    }
  }, [currentSession, scope, createSession, askQuestion]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastAssistant = [...messages].reverse().find(m => m.role === 'assistant');
      if (lastAssistant?.structured_response) {
        setCurrentResponse(lastAssistant.structured_response);
      }
    } else {
      setCurrentResponse(null);
    }
  }, [messages]);

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-[calc(100vh-4rem)] flex"
      >
        <div className="w-full lg:w-1/2 xl:w-2/5 border-r border-border relative">
          <ChatPanel
            sessions={sessions}
            currentSession={currentSession}
            messages={messages}
            isLoading={isLoading}
            scope={scope}
            onScopeChange={handleScopeChange}
            onNewChat={handleNewChat}
            onSelectSession={selectSession}
            onDeleteSession={deleteSession}
            onRenameSession={updateSessionTitle}
            onSendMessage={handleSendMessage}
          />
        </div>

        <div className="hidden lg:block lg:w-1/2 xl:w-3/5 bg-muted/20">
          <ResultsPanel
            response={currentResponse}
            isLoading={isLoading}
          />
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Ask;

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Plus, Trash2, Edit2, Check, X, 
  MessageSquare, Sparkles, Bot, User,
  Building2, Users, TrendingUp, Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ChatMessage, ChatSession, SearchScope } from '@/hooks/useAskTelAfrik';

interface ChatPanelProps {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  messages: ChatMessage[];
  isLoading: boolean;
  scope: SearchScope;
  onScopeChange: (scope: SearchScope) => void;
  onNewChat: () => void;
  onSelectSession: (session: ChatSession) => void;
  onDeleteSession: (sessionId: string) => void;
  onRenameSession: (sessionId: string, title: string) => void;
  onSendMessage: (message: string) => void;
  onSelectResult?: (response: unknown) => void;
}

const QUICK_PROMPTS = [
  { text: "Top fintech startups in Ghana", icon: Building2 },
  { text: "Investors active in climate in East Africa", icon: Users },
  { text: "Seed-stage investors in Nigeria", icon: Wallet },
  { text: "Recent Series A funding rounds", icon: TrendingUp },
];

const SCOPE_OPTIONS: { value: SearchScope; label: string; icon: typeof Building2 }[] = [
  { value: 'startups', label: 'Startups', icon: Building2 },
  { value: 'investors', label: 'Investors', icon: Users },
  { value: 'founders', label: 'People', icon: Users },
  { value: 'funding', label: 'Funding', icon: TrendingUp },
];

export const ChatPanel = ({
  sessions,
  currentSession,
  messages,
  isLoading,
  scope,
  onScopeChange,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  onRenameSession,
  onSendMessage,
  onSelectResult,
}: ChatPanelProps) => {
  const [input, setInput] = useState('');
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change — use the container div directly
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const handleQuickPrompt = (prompt: string) => {
    onSendMessage(prompt);
  };

  const startRenaming = (session: ChatSession) => {
    setEditingSessionId(session.id);
    setEditTitle(session.title);
  };

  const saveRename = () => {
    if (editingSessionId && editTitle.trim()) {
      onRenameSession(editingSessionId, editTitle.trim());
    }
    setEditingSessionId(null);
    setEditTitle('');
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header with scope selector */}
      <div className="p-4 border-b border-border/50 bg-card/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Ask TelAfrik</h2>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowHistory(!showHistory)}
              className="text-muted-foreground"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={onNewChat}>
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
        </div>

        {/* Scope Toggle */}
        <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
          {SCOPE_OPTIONS.map(option => (
            <button
              key={option.value}
              onClick={() => onScopeChange(option.value)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-sm font-medium transition-all",
                scope === option.value
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <option.icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat History Sidebar (overlay on mobile) */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute inset-y-0 left-0 w-64 bg-card border-r border-border z-10 flex flex-col"
          >
            <div className="p-3 border-b border-border flex items-center justify-between">
              <span className="font-medium text-sm">Chat History</span>
              <Button size="icon" variant="ghost" onClick={() => setShowHistory(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-2 space-y-1">
                {sessions.map(session => (
                  <div
                    key={session.id}
                    className={cn(
                      "group flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors",
                      currentSession?.id === session.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                    onClick={() => {
                      onSelectSession(session);
                      setShowHistory(false);
                    }}
                  >
                    {editingSessionId === session.id ? (
                      <div className="flex-1 flex items-center gap-1">
                        <Input
                          value={editTitle}
                          onChange={e => setEditTitle(e.target.value)}
                          className="h-7 text-sm"
                          onKeyDown={e => e.key === 'Enter' && saveRename()}
                          autoFocus
                        />
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={saveRename}>
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditingSessionId(null)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <MessageSquare className="h-4 w-4 flex-shrink-0" />
                        <span className="flex-1 truncate text-sm">{session.title}</span>
                        <div className="hidden group-hover:flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6"
                            onClick={e => {
                              e.stopPropagation();
                              startRenaming(session);
                            }}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 text-destructive"
                            onClick={e => {
                              e.stopPropagation();
                              onDeleteSession(session.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {sessions.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No chat history yet
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages — plain scrollable div so scrollTop works reliably */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {messages.length === 0 && !isLoading && (
            <div className="py-8">
              <div className="text-center mb-6">
                <Bot className="h-12 w-12 text-primary/40 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Welcome to Ask TelAfrik</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                  Your AI-powered copilot for exploring the African startup ecosystem. 
                  Ask anything about startups, investors, or funding rounds.
                </p>
              </div>

              {/* Quick Prompts */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground text-center mb-3">Try asking:</p>
                <div className="grid grid-cols-1 gap-2">
                  {QUICK_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickPrompt(prompt.text)}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all text-left group"
                    >
                      <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <prompt.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">{prompt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Message list */}
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "flex gap-3",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {message.role === 'assistant' && (
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5",
                  message.role === 'user'
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                
                {message.structured_response && message.structured_response.results.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-border/30">
                    <Badge variant="secondary" className="text-xs">
                      {message.structured_response.results.length} results found
                    </Badge>
                  </div>
                )}
              </div>

              {message.role === 'user' && (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </motion.div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary animate-pulse" />
              </div>
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50 bg-card/50">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Ask about ${scope}...`}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Send,
  Mic,
  Bot,
  User,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { useLumi } from '../../context/LumiContext';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const CitizenAIPage: React.FC = () => {
  const { streetlights, complaints } = useLumi();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'assistant',
      text: 'Hello! I am Lumi AI, your civic infrastructure copilot. Ask me about dark spots in Ward 12, streetlight health, or check the status of your reported complaints.',
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Is there a faulty streetlight near me?',
    'Show my active complaints.',
    'Report a streetlight issue.',
    'Which streetlights need maintenance near me?',
    'What is my complaint status for CMP-20481?',
    'Show recently repaired streetlights.',
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateReply = (q: string): string => {
    const text = q.toLowerCase();
    const faulty = streetlights.filter(s => s.status === 'FAULTY');
    const repaired = streetlights.filter(s => s.status === 'RECENTLY_REPAIRED');

    if (text.includes('faulty') || text.includes('near me')) {
      return `There are currently ${faulty.length} faulty streetlights across the network. Specifically in Ward 12, Streetlight SL-204 at North Cyber Avenue is faulty with a high driver temperature alert. EB-1042 has accepted the work order.`;
    }
    if (text.includes('cmp-20481') || text.includes('status')) {
      return `Complaint CMP-20481 (Streetlight not working on SL-204) is currently in progress. AI computer vision classified it as a driver breakdown with 94% confidence. Assigned linesman: EB-1042.`;
    }
    if (text.includes('repaired')) {
      return `Recently restored smart poles include SL-103 at Central Plaza (SSR replaced, 100% luminosity) and SL-704 in Ward 21. Total repaired poles: ${repaired.length}.`;
    }
    return `Lumi AI: Analyzed your query regarding "${q}". I am continuously monitoring 32 smart poles with 94.2% city-wide operational availability. All field linesmen are connected to the central dispatch queue.`;
  };

  const handleSend = (text?: string) => {
    const query = text || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateReply(query);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: 'Just now',
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleVoice = () => {
    setIsVoiceRecording(true);
    setTimeout(() => {
      setIsVoiceRecording(false);
      handleSend("Is there a faulty streetlight near me?");
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-130px)] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-aqua p-0.5 shadow-glow-cyan-sm">
          <div className="h-full w-full rounded-2xl bg-brand-navy-deep flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-brand-cyan animate-pulse" />
          </div>
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Lumi AI Civic Assistant
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Natural language inquiries for smart streetlights, maintenance schedules, and public safety.
          </p>
        </div>
      </div>

      {/* Main Chat Frame */}
      <div className="flex-1 flex flex-col rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-xl overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'assistant' && (
                <div className="h-8 w-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-brand-blue to-cyan-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`block mt-1 text-[10px] font-mono text-right ${
                    m.sender === 'user' ? 'text-cyan-200/70' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </span>
              </div>

              {m.sender === 'user' && (
                <div className="h-8 w-8 rounded-xl bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center text-brand-blue-light shrink-0 mt-0.5">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-slate-400 text-xs">
              <div className="h-8 w-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-brand-cyan">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="h-2 w-2 rounded-full bg-brand-cyan animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-brand-cyan animate-bounce [animation-delay:0.2s]" />
                <span className="h-2 w-2 rounded-full bg-brand-cyan animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Suggested Pills */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs text-slate-400 shrink-0 flex items-center gap-1">
            <Lightbulb className="h-3.5 w-3.5 text-brand-cyan" />
            Try asking:
          </span>
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="whitespace-nowrap px-3 py-1 text-xs rounded-full bg-slate-200/80 dark:bg-slate-800 hover:bg-brand-cyan/20 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-brand-cyan transition-all"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <button
            onClick={handleVoice}
            className={`p-2.5 rounded-xl border transition-all ${
              isVoiceRecording
                ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:text-brand-cyan'
            }`}
            title="Voice Query"
          >
            <Mic className="h-4 w-4" />
          </button>

          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={isVoiceRecording ? "Listening to voice input..." : "Ask Lumi AI anything about neighborhood streetlights..."}
            className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-cyan"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-brand-cyan text-slate-950 hover:bg-brand-cyan-light disabled:opacity-40 transition-all"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CitizenAIPage;

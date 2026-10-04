import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Mic,
  Bot,
  User,
  Wrench,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';
import { useLumi } from '../../context/LumiContext';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const EmployeeAIPage: React.FC = () => {
  const { streetlights, complaints, currentUser } = useLumi();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-emp',
      sender: 'assistant',
      text: `Greetings Officer ${currentUser.name} (${currentUser.id}). Lumi AI Operations Copilot is online. I have loaded electrical schematics, ballast driver fault logs, and live work orders for Ward 12.`,
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const suggestedCommands = [
    'Summarize my pending tasks.',
    'Which streetlight should I repair first?',
    'Show critical issues nearby.',
    'Show streetlights with repeated faults.',
    'Summarize complaint CMP-20481.',
    'Show maintenance history for Ward 12.',
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateReply = (q: string): string => {
    const text = q.toLowerCase();
    const myTickets = complaints.filter(c => c.status !== 'RESOLVED');

    if (text.includes('pending task') || text.includes('summarize my')) {
      return `Work Order Summary: You currently have ${myTickets.length} active tickets. Top priority is CMP-20481 at SL-204 (North Cyber Ave) with high pedestrian traffic, followed by CMP-1002 (PWM dimmer flickering) at SL-315.`;
    }
    if (text.includes('repair first') || text.includes('priority')) {
      return `Dispatch Recommendation: Dispatch to SL-204 (Crossroad 4) immediately. Telemetry indicates capacitor temperature spiked to 46°C prior to shutdown. Parts needed: 450V 220uF Capacitor or SSR 30A replacement unit.`;
    }
    if (text.includes('repeated') || text.includes('faults')) {
      return `Poles with Repeated Faults: SL-204 has 3 fault alerts logged in the last 60 days. Inspection indicates cable terminal oxidation inside the lower base door. Re-sealing with moisture-resistant silicone is advised.`;
    }
    if (text.includes('cmp-20481')) {
      return `Ticket CMP-20481 Breakdown:\n• Citizen: Aditya Sharma (Reported: 3 nights blackout)\n• Pole: SL-204 (Smart Solar-LED Mast V2)\n• AI Analysis: 94% confidence ballast driver burn-out\n• Hazard Risk: Low (voltage cut by internal thermal fuse).`;
    }
    return `Lumi AI Field Copilot: Processed inquiry regarding "${q}". Telemetry across 32 smart poles is normal. Replacement parts are available in the Central Substation Depot.`;
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
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSend("Which streetlight should I repair first?");
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-130px)] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Wrench className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Lumi AI — Field Operations Assistant
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Intelligent diagnostic triage, circuit schematics, and component inventory assistance.
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
                <div className="h-8 w-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`block mt-1 text-[10px] font-mono text-right ${
                    m.sender === 'user' ? 'text-amber-200/70' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </span>
              </div>

              {m.sender === 'user' && (
                <div className="h-8 w-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-slate-400 text-xs">
              <div className="h-8 w-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Suggested Pills */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs text-slate-400 shrink-0 flex items-center gap-1">
            <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
            Field Commands:
          </span>
          {suggestedCommands.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="whitespace-nowrap px-3 py-1 text-xs rounded-full bg-slate-200/80 dark:bg-slate-800 hover:bg-amber-500/20 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-amber-400 transition-all font-mono"
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
              isListening
                ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:text-amber-400'
            }`}
            title="Field Officer Voice Command"
          >
            <Mic className="h-4 w-4" />
          </button>

          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={isListening ? "Listening to field command..." : "Ask Lumi AI about work orders, schematics, or repeated faults..."}
            className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 disabled:opacity-40 transition-all font-bold"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAIPage;

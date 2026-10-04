import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  X,
  Send,
  Mic,
  Bot,
  User,
  CornerDownLeft,
  Lightbulb,
  Zap,
  Wrench,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import { useLumi } from '../../context/LumiContext';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose }) => {
  const { role, streetlights, complaints, employees, wardAreas } = useLumi();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text:
        role === 'FIELD_EMPLOYEE'
          ? "Hello Officer. Lumi AI Operations Assistant online. Ready to prioritize work orders, analyze electrical telemetry, and pull circuit schematics."
          : role === 'GOVERNMENT'
          ? "Welcome Commissioner. Lumi AI City Analytics active. Ready to provide infrastructure fault heatmaps, energy anomaly reports, and contractor SLAs."
          : "Hello! I am Lumi AI, your smart infrastructure assistant. How can I help you with streetlights, complaints, or neighborhood safety today?",
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Suggested prompts per role
  const citizenPrompts = [
    'Is there a faulty streetlight near me?',
    'Show my active complaints.',
    'Which streetlights need maintenance in Ward 12?',
    'What is the status of complaint CMP-20481?',
    'Show recently repaired streetlights.',
  ];

  const employeePrompts = [
    'Summarize my pending tasks.',
    'Which streetlight should I repair first?',
    'Show critical issues nearby.',
    'Show streetlights with repeated faults in Ward 12.',
    'Summarize complaint CMP-20481.',
  ];

  const governmentPrompts = [
    'Which ward has the highest fault rate today?',
    'Explain energy consumption excess in Zone 3.',
    'Show contractor resolution SLA performance.',
    'Predict streetlight failure cluster for next week.',
  ];

  const currentPrompts =
    role === 'FIELD_EMPLOYEE'
      ? employeePrompts
      : role === 'GOVERNMENT'
      ? governmentPrompts
      : citizenPrompts;

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateAIResponse = (query: string): string => {
    const q = query.toLowerCase();

    // Context calculations
    const faultyLights = streetlights.filter(sl => sl.status === 'FAULTY');
    const repairedLights = streetlights.filter(sl => sl.status === 'RECENTLY_REPAIRED');
    const openComplaints = complaints.filter(c => c.status !== 'RESOLVED');

    if (q.includes('faulty') || q.includes('near me') || q.includes('blackout')) {
      return `Currently, there are ${faultyLights.length} faulty streetlights across the network. In Ward 12, Streetlight SL-204 at North Cyber Avenue is reported faulty due to high driver temperature (Health: 42%). EB-1042 has been dispatched.`;
    }

    if (q.includes('complaint') || q.includes('cmp-20481') || q.includes('status')) {
      const cmp = complaints.find(c => c.id === 'CMP-20481') || complaints[0];
      return `Complaint ${cmp.id} (${cmp.category}) for ${cmp.streetlightId} is currently status: "${cmp.status}". Assigned to linesman ${cmp.assignedEmployee}. AI confidence is 94% with priority ${cmp.priority}.`;
    }

    if (q.includes('repair first') || q.includes('priority') || q.includes('pending task')) {
      return `Priority Recommendation: Work on CMP-1003 (Pier 4, exposed wiring - CRITICAL risk) and CMP-20481 (SL-204, high pedestrian density zone). Both have safety flags with high public impact.`;
    }

    if (q.includes('recently repaired') || q.includes('repaired')) {
      return `Recently restored units include SL-103 at Central Plaza (SSR replaced, 100% luminosity) and SL-704 in Ward 21. Total repaired count: ${repairedLights.length}. All telemetry health scores are at 98%+.`;
    }

    if (q.includes('energy') || q.includes('zone 3') || q.includes('ward 3')) {
      return `Energy analysis indicates Zone 3 drew +84.2 kWh above baseline during 02:00-05:00 AM. Activating LumiNexus Adaptive Dimming protocol can save 18.4% without compromising pedestrian safety.`;
    }

    if (q.includes('ward') || q.includes('highest') || q.includes('rate')) {
      return `Ward 21 has the highest fault count (5 faulty poles), followed by Ward 12 (4 poles). Recommendation: Deploy preventive thermal scans on transformer branch lines before 18:00 hrs.`;
    }

    return `Lumi AI Insight: Analyzed query regarding "${query}". The system monitors 32 smart poles with 94.2% operational availability. All live IoT telemetry is synced with EB Field Operations and Municipal Command.`;
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const replyText = generateAIResponse(query);
      const aiMsg: Message = {
        id: `msg-ai-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: 'Just now',
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 650);
  };

  const toggleMic = () => {
    setIsListening(prev => !prev);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        handleSend("Is there a faulty streetlight near me?");
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative flex flex-col w-full max-w-2xl h-[650px] max-h-[90vh] rounded-3xl border border-cyan-500/40 bg-slate-950/95 text-slate-100 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-aqua p-0.5 shadow-glow-cyan-sm">
                <div className="h-full w-full rounded-2xl bg-brand-navy-deep flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-brand-cyan animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-white tracking-wide">
                    Lumi AI Assistant
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-brand-cyan border border-cyan-500/30">
                    {role} CONTEXT
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Real-time Neural Infrastructure Copilot
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map(m => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="h-8 w-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-brand-blue to-cyan-600 text-white rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`block mt-1 text-[10px] font-mono text-right ${
                      m.sender === 'user' ? 'text-cyan-200/70' : 'text-slate-500'
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
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex gap-3 items-center text-slate-400 text-xs">
                <div className="h-8 w-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-brand-cyan">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="h-2 w-2 rounded-full bg-brand-cyan animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-brand-cyan animate-bounce [animation-delay:0.2s]" />
                  <span className="h-2 w-2 rounded-full bg-brand-cyan animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Suggested Prompts Pill Tray */}
          <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] text-slate-500 shrink-0 flex items-center gap-1">
              <Lightbulb className="h-3 w-3 text-brand-cyan" />
              Suggested:
            </span>
            {currentPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="whitespace-nowrap px-2.5 py-1 text-xs rounded-full bg-slate-800 hover:bg-brand-cyan/20 border border-slate-700 hover:border-brand-cyan/40 text-slate-300 hover:text-brand-cyan transition-all"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={toggleMic}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-brand-cyan'
              }`}
              title="Voice Input (Simulated)"
            >
              <Mic className="h-4 w-4" />
            </button>

            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? "Listening to voice input..." : "Ask Lumi AI about infrastructure, faults, or telemetry..."}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-colors"
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-brand-cyan text-slate-950 hover:bg-brand-cyan-light disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-glow-cyan-sm"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AIChatModal;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import AIChatModal from './AIChatModal';

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-aqua text-brand-navy-deep font-bold text-sm shadow-glow-cyan transition-all hover:shadow-cyan-400/50"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <Sparkles className="h-4 w-4" />
        <span className="tracking-wide">Lumi AI</span>
      </motion.button>

      <AIChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default AIChatWidget;

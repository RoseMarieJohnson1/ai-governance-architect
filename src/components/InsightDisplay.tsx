import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Quote } from 'lucide-react';

interface InsightDisplayProps {
  insight: string;
  onContinue: () => void;
}

export const InsightDisplay: React.FC<InsightDisplayProps> = ({ insight, onContinue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden"
      id="insight-display"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Quote size={120} />
      </div>

      <div className="relative space-y-6">
        <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase tracking-widest font-bold">
          <Sparkles size={14} className="text-zinc-500" />
          <span>Architect's Insight:</span>
        </div>

        <p className="text-xl text-zinc-100 leading-relaxed font-sans font-normal">
          "{insight}"
        </p>

        <button
          onClick={onContinue}
          className="text-zinc-400 hover:text-zinc-100 text-sm font-mono flex items-center gap-2 transition-colors group"
          id="continue-intake-btn"
        >
          <span>Continue to next module</span>
          <div className="h-px w-8 bg-zinc-800 group-hover:w-16 transition-all bg-zinc-700" />
        </button>
      </div>
    </motion.div>
  );
};

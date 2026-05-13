import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Linkedin, ArrowRight, RotateCcw } from 'lucide-react';

interface VisionStatementProps {
  onReset: () => void;
}

export const VisionStatement: React.FC<VisionStatementProps> = ({ onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-12"
      id="vision-statement"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest font-bold">
          <Lightbulb size={14} />
          <span>The Vision Behind the Framework</span>
        </div>
        <h1 className="text-4xl font-medium tracking-tight text-white leading-tight">
          Aligning technical AI mandates with workforce readiness.
        </h1>
      </div>

      <div className="space-y-8 text-zinc-300 text-lg leading-relaxed font-sans font-normal">
        <p>
          I architected the AI Governance Architect Demo to solve a critical gap I witnessed while leading compliance-driven initiatives across the Ecommerce, Banking, Steel, and Utilities sectors. In these diverse environments, I saw firsthand the disconnect between complex Compliance, GRC, and Enterprise-wide Technical Policies and Procedures and frontline human performance.
        </p>
        <p>
          Leveraging several years of experience in Learning and Development (L&D), I am deeply passionate about bridging the gap between technical AI mandates and workforce fluency. I am dedicated to mastering the nuances of the NIST AI RMF, GDPR, and the EU AI Act to ensure that as organizations deploy AI, their people and procedures remain their strongest assets.
        </p>
      </div>

      <div className="pt-8 border-t border-zinc-800 space-y-8">
        <div className="space-y-4">
          <p className="text-zinc-400">
            Let’s ensure your workforce is ready for the future of AI. Connect with me on LinkedIn to discuss leading your AI Governance and Human Performance initiatives.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://www.linkedin.com/in/rose-marie-johnson-335170169"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 bg-zinc-100 text-zinc-950 py-4 rounded-xl font-medium hover:bg-white transition-all group"
          >
            <Linkedin size={20} />
            Connect on LinkedIn
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-all" />
          </a>
          <button
            onClick={onReset}
            className="flex-1 flex items-center justify-center gap-3 bg-transparent border border-zinc-800 text-zinc-400 py-4 rounded-xl font-medium hover:text-zinc-100 hover:border-zinc-700 transition-all"
          >
            <RotateCcw size={18} />
            Restart Assessment
          </button>
        </div>
      </div>

      <footer className="pt-12 text-zinc-600 text-[10px] font-mono text-center tracking-widest uppercase">
        AI Governance Architect &copy; 2024
      </footer>
    </motion.div>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { Question } from '../types';

interface IntakeFormProps {
  question: Question;
  answer: string;
  onAnswerChange: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  stepNumber: number;
  totalSteps: number;
}

export const IntakeForm: React.FC<IntakeFormProps> = ({
  question,
  answer,
  onAnswerChange,
  onSubmit,
  isLoading,
  stepNumber,
  totalSteps,
}) => {
  return (
    <div className="space-y-8" id="intake-form-container">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest">
          <Shield size={14} className="text-zinc-600" />
          <span>Intake Module {stepNumber + 1} / {totalSteps}</span>
        </div>
        <h2 className="text-3xl font-medium tracking-tight text-zinc-100" id={`question-title-${question.id}`}>
          {question.text}
        </h2>
        <p className="text-zinc-400 text-sm max-w-xl">
          {question.description}
        </p>
      </div>

      <div className="relative group">
        <textarea
          autoFocus
          id={`answer-input-${question.id}`}
          placeholder={question.placeholder}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all min-h-[160px] resize-none text-lg"
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          disabled={isLoading}
        />
        <div className="absolute top-0 right-0 p-4">
          <div className="flex gap-1.5">
            {[...Array(totalSteps)].map((_, i) => (
              <div
                key={i}
                className={`h-1 w-4 rounded-full transition-all ${
                  i === stepNumber ? 'bg-zinc-100 w-8' : 
                  i < stepNumber ? 'bg-zinc-600' : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-start">
        <button
          onClick={onSubmit}
          disabled={!answer.trim() || isLoading}
          id="submit-answer-btn"
          className="group flex items-center gap-2 bg-zinc-100 text-zinc-950 px-8 py-3 rounded-full font-medium active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 hover:bg-white"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Confirm & Analyze
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

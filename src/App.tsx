/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Hammer, Info } from 'lucide-react';
import { IntakeStep, UserResponse, GovernanceReport as ReportType } from './types';
import { QUESTIONS } from './constants';
import { GeminiService } from './services/geminiService';
import { IntakeForm } from './components/IntakeForm';
import { InsightDisplay } from './components/InsightDisplay';
import { GovernanceReport } from './components/GovernanceReport';
import { VisionStatement } from './components/VisionStatement';

export default function App() {
  const [currentStep, setCurrentStep] = useState<IntakeStep>(IntakeStep.Q1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<UserResponse[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentInsight, setCurrentInsight] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<ReportType | null>(null);

  const gemini = useMemo(() => new GeminiService(), []);

  const handleNext = async () => {
    if (!currentAnswer.trim()) return;

    setIsLoading(true);
    const question = QUESTIONS[currentStep as number];
    
    try {
      const insight = await gemini.generateInsight(question.text, currentAnswer);
      setCurrentInsight(insight);
      
      const newResponse: UserResponse = {
        step: currentStep,
        question: question.text,
        answer: currentAnswer,
        insight,
      };
      
      setHistory((prev) => [...prev, newResponse]);
      setAnswers((prev) => ({ ...prev, [question.id]: currentAnswer }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = async () => {
    setCurrentInsight(null);
    setCurrentAnswer('');
    
    if (currentStep === IntakeStep.Q10) {
      setIsLoading(true);
      setCurrentStep(IntakeStep.REPORT);
      try {
        const finalResponses = [...history];
        const res = await gemini.generateFinalReport(finalResponses);
        setReport(res);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentStep((prev) => (prev as number) + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(IntakeStep.Q1);
    setAnswers({});
    setHistory([]);
    setCurrentAnswer('');
    setCurrentInsight(null);
    setReport(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="border-b border-zinc-800/50 backdrop-blur-md sticky top-0 z-50 bg-[#050505]/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-100 rounded flex items-center justify-center">
              <Shield size={20} className="text-zinc-950" />
            </div>
            <span className="font-medium tracking-tight text-white uppercase text-sm tracking-widest font-mono">
              Governance Architect
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
            <span className="hidden sm:inline">NIST Framework v2.0 Compliant</span>
            <div className="h-4 w-px bg-zinc-800" />
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Expert System Active
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 overflow-hidden relative">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ 
          backgroundImage: `linear-gradient(rgba(20, 20, 20, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 20, 20, 1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="w-full max-w-4xl relative z-10">
          <AnimatePresence mode="wait">
            {currentStep === IntakeStep.REPORT ? (
              <div key="report">
                {isLoading ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-6 py-20"
                  >
                    <Loader2 className="animate-spin text-zinc-500" size={48} />
                    <div className="text-center space-y-2">
                       <h3 className="text-xl font-medium">Compiling Governance Readiness Report...</h3>
                       <p className="text-zinc-500 text-sm font-mono">Weighting risks against industry standards (NIST, ISO 42001)</p>
                    </div>
                  </motion.div>
                ) : (
                  report && <GovernanceReport report={report} onReset={handleReset} onViewVision={() => setCurrentStep(IntakeStep.VISION)} />
                )}
              </div>
            ) : currentStep === IntakeStep.VISION ? (
              <div key="vision">
                <VisionStatement onReset={handleReset} />
              </div>
            ) : (
              <div key="intake">
                {currentInsight ? (
                  <InsightDisplay insight={currentInsight} onContinue={handleContinue} />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IntakeForm
                      question={QUESTIONS[currentStep as number]}
                      answer={currentAnswer}
                      onAnswerChange={setCurrentAnswer}
                      onSubmit={handleNext}
                      isLoading={isLoading}
                      stepNumber={currentStep as number}
                      totalSteps={QUESTIONS.length}
                    />
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {currentStep !== IntakeStep.REPORT && (
        <aside className="fixed bottom-0 left-0 w-full px-6 py-8 pointer-events-none">
          <div className="max-w-7xl mx-auto flex justify-end">
            <div className="pointer-events-auto bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-4 rounded-xl flex items-center gap-4 text-xs font-mono text-zinc-500">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full border border-zinc-950 bg-zinc-700 flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 12}`} alt="advisor" />
                  </div>
                ))}
              </div>
              <span>Expert Governance Panel Online</span>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

function Loader2({ className, size }: { className?: string; size?: number }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      className={className}
    >
      <Hammer size={size} />
    </motion.div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Download, AlertTriangle, FileText, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { GovernanceReport as ReportType } from '../types';

interface GovernanceReportProps {
  report: ReportType;
  onReset: () => void;
  onViewVision: () => void;
}

export const GovernanceReport: React.FC<GovernanceReportProps> = ({ report, onReset, onViewVision }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-400 border-red-900/30 bg-red-950/20';
      case 'Med': return 'text-amber-400 border-amber-900/30 bg-amber-950/20';
      case 'Low': return 'text-emerald-400 border-emerald-900/30 bg-emerald-950/20';
      default: return 'text-zinc-400 border-zinc-800 bg-zinc-950';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-12 pb-20"
      id="governance-report-root"
    >
      <div className="flex justify-between items-end border-b border-zinc-800 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest">
            <ShieldCheck size={14} />
            <span>Final Governance Assessment</span>
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-white">Governance Readiness Report</h1>
        </div>
        <div className={`px-4 py-2 rounded-full border text-sm font-mono ${getRiskColor(report.initialRiskLevel)}`}>
           Initial Sensitivity: {report.initialRiskLevel}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-10">
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-zinc-100 font-medium text-lg">
              <AlertTriangle size={18} className="text-zinc-500" />
              Risk Summary
            </h3>
            <p className="text-zinc-400 leading-relaxed text-lg">
              {report.riskSummary}
            </p>
          </section>

          <section className="space-y-6">
            <h3 className="flex items-center gap-2 text-zinc-100 font-medium text-lg">
              <FileText size={18} className="text-zinc-500" />
              Regulatory Strategy Map
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {report.regulatoryMap.map((reg, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  {reg}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8 bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl h-fit">
          <h3 className="flex items-center gap-2 text-zinc-100 font-medium text-lg">
            <CheckCircle2 size={18} className="text-zinc-500" />
            Evidence Pack
          </h3>
          <ul className="space-y-4">
            {report.evidencePackChecklist.map((item, i) => (
              <li key={i} className="flex gap-3 text-zinc-400 text-sm">
                <div className="mt-1 min-w-[6px] h-[6px] rounded-full border border-zinc-700" />
                {item}
              </li>
            ))}
          </ul>
          
          <div className="pt-4 space-y-3">
            <button className="w-full flex items-center justify-center gap-2 bg-white text-zinc-950 py-3 rounded-lg font-medium hover:bg-zinc-200 transition-colors">
              <Download size={18} />
              Export Artifacts
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-zinc-800 text-zinc-100 py-3 rounded-lg font-medium hover:bg-zinc-700 transition-colors border border-zinc-700" onClick={onViewVision}>
              Proceed to Vision Statement
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={onReset}
              className="w-full flex items-center justify-center gap-2 bg-transparent text-zinc-400 py-3 rounded-lg font-medium hover:text-zinc-100 transition-colors border border-zinc-800"
            >
              <RotateCcw size={18} />
              New Assessment
            </button>
          </div>
        </div>
      </div>

      <footer className="pt-20 border-t border-zinc-800 text-zinc-600 text-xs font-mono text-center">
        * Based on Standard Industry Governance Frameworks (NIST, ISO 42001). Risk weighting is proprietary.
      </footer>
    </motion.div>
  );
};

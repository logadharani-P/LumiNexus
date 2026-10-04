import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  Zap,
  Wrench,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Filter,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import { InsightCategory } from '../../types';

export const GovernmentAIPage: React.FC = () => {
  const { aiInsights } = useLumi();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filtered = aiInsights.filter(ins => {
    if (selectedCategory === 'ALL') return true;
    return ins.category === selectedCategory;
  });

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'critical':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'warning':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'info':
        return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-brand-cyan">
              <Sparkles className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              LumiNexus AI Insights & Anomaly Detection
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Predictive machine-learning evaluations generated autonomously from electrical grid telemetry and citizen report density.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border text-xs font-mono">
          <span className="text-slate-400">Active Signals:</span>
          <strong className="text-brand-cyan">{aiInsights.length} Anomaly Flags</strong>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['ALL', 'Infrastructure', 'Energy', 'Maintenance', 'Complaints', 'Operations'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-brand-cyan text-brand-navy-deep font-bold shadow-glow-cyan-sm'
                : 'bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Insights Cards List */}
      <div className="space-y-4">
        {filtered.map(ins => (
          <div
            key={ins.id}
            className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-4 hover:border-cyan-500/40 transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-brand-cyan">{ins.id}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getSeverityBadge(ins.severity)}`}>
                  {ins.severity.toUpperCase()}
                </span>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded">
                  {ins.category}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                {ins.impactWard && <span>Impact: <strong className="text-white">{ins.impactWard}</strong></span>}
                <span>{ins.timestamp}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{ins.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {ins.description}
              </p>
            </div>

            {ins.metrics && (
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
                <span className="text-slate-400 font-sans">Telemetry Correlation:</span>
                <span className="text-amber-400 font-bold">{ins.metrics}</span>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs space-y-1 text-slate-200">
              <div className="flex items-center justify-between text-brand-cyan font-semibold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  Prescribed Autonomous Municipal Action
                </span>
                <span className="font-mono text-[10px] bg-brand-cyan/20 px-2 py-0.5 rounded text-brand-cyan">
                  {ins.confidenceScore}% Confidence
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">{ins.recommendation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovernmentAIPage;

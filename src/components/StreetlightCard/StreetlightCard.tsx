import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Thermometer, Video, Wrench, AlertTriangle, ArrowRight } from 'lucide-react';
import { Streetlight } from '../../types';
import StatusBadge from '../StatusBadge/StatusBadge';

interface StreetlightCardProps {
  streetlight: Streetlight;
  onViewDetails: (sl: Streetlight) => void;
  onOpenCamera?: (sl: Streetlight) => void;
  onReportIssue?: (sl: Streetlight) => void;
  className?: string;
}

export const StreetlightCard: React.FC<StreetlightCardProps> = ({
  streetlight,
  onViewDetails,
  onOpenCamera,
  onReportIssue,
  className = '',
}) => {
  const isHealthy = streetlight.healthScore >= 80;
  const isFair = streetlight.healthScore >= 50 && streetlight.healthScore < 80;

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-brand-navy-border bg-white dark:bg-brand-navy-card/90 p-5 shadow-sm dark:shadow-card-dark transition-all duration-300 hover:border-cyan-500/40 hover:shadow-glow-cyan-sm ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-base font-bold text-slate-900 dark:text-brand-cyan tracking-wide">
              {streetlight.id}
            </span>
            <StatusBadge status={streetlight.status} size="sm" />
          </div>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
            {streetlight.location}
          </p>
        </div>

        {/* Health Score Pill */}
        <div
          className={`flex flex-col items-end rounded-lg px-2.5 py-1 border text-right font-mono ${
            isHealthy
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              : isFair
              ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
              : 'border-rose-500/30 bg-rose-500/10 text-rose-400 animate-pulse'
          }`}
        >
          <span className="text-[10px] uppercase tracking-wider font-sans font-medium text-slate-400">
            Health
          </span>
          <span className="text-sm font-bold">{streetlight.healthScore}%</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mt-4 grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-50 dark:bg-brand-navy-surface/60 border border-slate-100 dark:border-brand-navy-border/60 text-xs">
        <div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
            <Zap className="h-3 w-3 text-brand-cyan" />
            <span>Power</span>
          </div>
          <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
            {streetlight.brightness}%
          </span>
        </div>

        <div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
            <Activity className="h-3 w-3 text-emerald-400" />
            <span>Energy</span>
          </div>
          <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
            {streetlight.energyConsumption} kWh
          </span>
        </div>

        <div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
            <Thermometer className="h-3 w-3 text-amber-400" />
            <span>Temp</span>
          </div>
          <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
            {streetlight.temperature}°C
          </span>
        </div>
      </div>

      {/* Brightness Bar */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
          <span>Luminaire Output</span>
          <span className="font-mono">{streetlight.brightness}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-brand-navy-surface">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              streetlight.status === 'FAULTY'
                ? 'bg-rose-500'
                : streetlight.status === 'MAINTENANCE'
                ? 'bg-amber-400'
                : 'bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-aqua'
            }`}
            style={{ width: `${Math.max(streetlight.brightness, 4)}%` }}
          />
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-brand-navy-border/60 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          Ward: <strong className="text-slate-700 dark:text-slate-300">{streetlight.area}</strong>
        </span>

        <div className="flex items-center gap-1.5">
          {streetlight.cameraId && onOpenCamera && (
            <button
              onClick={() => onOpenCamera(streetlight)}
              title="Open Live Camera Stream"
              className="p-1.5 rounded-lg border border-slate-200 dark:border-brand-navy-border text-slate-600 dark:text-brand-cyan hover:bg-brand-cyan/10 transition-colors"
            >
              <Video className="h-3.5 w-3.5" />
            </button>
          )}

          {onReportIssue && streetlight.status === 'FAULTY' && (
            <button
              onClick={() => onReportIssue(streetlight)}
              title="Report Complaint for this light"
              className="px-2 py-1 text-xs rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 transition-colors flex items-center gap-1"
            >
              <AlertTriangle className="h-3 w-3" />
              <span>Report</span>
            </button>
          )}

          <button
            onClick={() => onViewDetails(streetlight)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-brand-cyan/10 hover:bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan transition-all"
          >
            <span>Details</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default StreetlightCard;

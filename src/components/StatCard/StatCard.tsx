import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  accentColor?: 'cyan' | 'blue' | 'emerald' | 'amber' | 'rose' | 'purple';
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = 'cyan',
  onClick,
  className = '',
}) => {
  const accentStyles = {
    cyan: {
      border: 'hover:border-cyan-500/50',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      glow: 'group-hover:shadow-glow-cyan-sm',
      gradient: 'from-cyan-500/10 via-transparent to-transparent',
    },
    blue: {
      border: 'hover:border-blue-500/50',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      glow: 'group-hover:shadow-glow-blue',
      gradient: 'from-blue-500/10 via-transparent to-transparent',
    },
    emerald: {
      border: 'hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      glow: 'group-hover:shadow-glow-green',
      gradient: 'from-emerald-500/10 via-transparent to-transparent',
    },
    amber: {
      border: 'hover:border-amber-500/50',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      glow: 'group-hover:shadow-amber-500/20',
      gradient: 'from-amber-500/10 via-transparent to-transparent',
    },
    rose: {
      border: 'hover:border-rose-500/50',
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      glow: 'group-hover:shadow-glow-red',
      gradient: 'from-rose-500/10 via-transparent to-transparent',
    },
    purple: {
      border: 'hover:border-purple-500/50',
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      glow: 'group-hover:shadow-purple-500/20',
      gradient: 'from-purple-500/10 via-transparent to-transparent',
    },
  };

  const style = accentStyles[accentColor];

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-brand-navy-border bg-white dark:bg-brand-navy-card/80 p-5 shadow-sm dark:shadow-card-dark transition-all duration-300 ${style.border} ${style.glow} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Background soft ambient gradient */}
      <div
        className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${style.gradient} blur-xl transition-all duration-500 group-hover:scale-125`}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
              {value}
            </span>
            {subtitle && (
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border p-2.5 transition-transform duration-300 group-hover:scale-110 ${style.iconBg}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {trend && (
        <div className="relative z-10 mt-3.5 flex items-center gap-1.5 text-xs">
          <span
            className={`font-semibold ${
              trend.isPositive ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'
            }`}
          >
            {trend.value}
          </span>
          {trend.label && (
            <span className="text-slate-500 dark:text-slate-400">{trend.label}</span>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;

import React from 'react';
import { StreetlightStatus, ComplaintPriority, ComplaintStatus, EmployeeStatus } from '../../types';

type BadgeType = 
  | StreetlightStatus 
  | ComplaintPriority 
  | ComplaintStatus 
  | EmployeeStatus 
  | 'ONLINE' | 'RECORDING' | 'OFFLINE';

interface StatusBadgeProps {
  status: BadgeType | string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showDot = true,
  className = '',
}) => {
  const normalized = status.toUpperCase();

  let colors = 'bg-slate-800 text-slate-300 border-slate-700';
  let dotColor = 'bg-slate-400';
  let pulse = false;
  let label = status;

  // Streetlight Statuses
  if (normalized === 'OPERATIONAL') {
    colors = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    dotColor = 'bg-emerald-400';
    label = 'Operational';
  } else if (normalized === 'FAULTY' || normalized === 'CRITICAL') {
    colors = 'bg-rose-500/15 text-rose-400 border-rose-500/30 shadow-glow-red/20';
    dotColor = 'bg-rose-500';
    pulse = true;
    label = normalized === 'CRITICAL' ? 'Critical Priority' : 'Faulty';
  } else if (normalized === 'MAINTENANCE') {
    colors = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    dotColor = 'bg-amber-400';
    label = 'Under Maintenance';
  } else if (normalized === 'RECENTLY_REPAIRED') {
    colors = 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30 shadow-glow-cyan-sm';
    dotColor = 'bg-cyan-400';
    pulse = true;
    label = 'Recently Repaired';
  }
  // Complaint Priorities
  else if (normalized === 'HIGH') {
    colors = 'bg-orange-500/15 text-orange-400 border-orange-500/30';
    dotColor = 'bg-orange-400';
    label = 'High Priority';
  } else if (normalized === 'MEDIUM') {
    colors = 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    dotColor = 'bg-amber-400';
    label = 'Medium Priority';
  } else if (normalized === 'LOW') {
    colors = 'bg-sky-500/15 text-sky-400 border-sky-500/30';
    dotColor = 'bg-sky-400';
    label = 'Low Priority';
  }
  // Complaint Statuses
  else if (normalized === 'FILED') {
    colors = 'bg-purple-500/15 text-purple-300 border-purple-500/30';
    dotColor = 'bg-purple-400';
    label = 'Filed';
  } else if (normalized === 'ANALYZED') {
    colors = 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    dotColor = 'bg-blue-400';
    label = 'AI Analyzed';
  } else if (normalized === 'ASSIGNED') {
    colors = 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
    dotColor = 'bg-indigo-400';
    label = 'Assigned';
  } else if (normalized === 'ACCEPTED') {
    colors = 'bg-teal-500/15 text-teal-300 border-teal-500/30';
    dotColor = 'bg-teal-400';
    label = 'Accepted';
  } else if (normalized === 'RESOLVED') {
    colors = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-glow-green/30';
    dotColor = 'bg-emerald-400';
    label = 'Resolved';
  }
  // Employee / Camera
  else if (normalized === 'AVAILABLE' || normalized === 'ONLINE') {
    colors = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    dotColor = 'bg-emerald-400';
    label = normalized === 'ONLINE' ? 'Live Stream' : 'Available';
  } else if (normalized === 'WORKING' || normalized === 'RECORDING') {
    colors = 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
    dotColor = 'bg-cyan-400';
    label = normalized === 'RECORDING' ? 'AI Recording' : 'On Site';
    pulse = true;
  } else if (normalized === 'OFFLINE') {
    colors = 'bg-slate-700/40 text-slate-400 border-slate-600/30';
    dotColor = 'bg-slate-500';
    label = 'Offline';
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border tracking-wide transition-all ${colors} ${sizeClasses[size]} ${className}`}
    >
      {showDot && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`}
            />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`} />
        </span>
      )}
      <span>{label}</span>
    </span>
  );
};

export default StatusBadge;

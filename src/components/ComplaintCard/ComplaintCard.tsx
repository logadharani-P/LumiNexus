import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Wrench, Clock, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { Complaint, UserRole } from '../../types';
import StatusBadge from '../StatusBadge/StatusBadge';

interface ComplaintCardProps {
  complaint: Complaint;
  currentRole?: UserRole;
  onViewDetails?: (complaint: Complaint) => void;
  onStartRepair?: (complaintId: string) => void;
  onCompleteRepair?: (complaint: Complaint) => void;
  className?: string;
}

export const ComplaintCard: React.FC<ComplaintCardProps> = ({
  complaint,
  currentRole = 'CITIZEN',
  onViewDetails,
  onStartRepair,
  onCompleteRepair,
  className = '',
}) => {
  const isResolved = complaint.status === 'RESOLVED';
  const isInMaintenance = complaint.status === 'MAINTENANCE';

  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-brand-navy-border bg-white dark:bg-brand-navy-card/90 p-5 shadow-sm dark:shadow-card-dark transition-all duration-300 hover:border-cyan-500/40 hover:shadow-glow-cyan-sm ${className}`}
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-brand-cyan tracking-wider">
            {complaint.id}
          </span>
          <StatusBadge status={complaint.priority} size="sm" />
          <StatusBadge status={complaint.status} size="sm" />
        </div>

        <span className="text-[11px] text-slate-400 dark:text-slate-400 flex items-center gap-1 font-mono">
          <Clock className="h-3 w-3" />
          {complaint.createdAt}
        </span>
      </div>

      {/* Title & Description */}
      <div className="mt-3">
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>{complaint.category}</span>
          <span className="text-xs font-normal text-slate-400 font-mono">
            ({complaint.streetlightId})
          </span>
        </h4>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {complaint.description}
        </p>
      </div>

      {/* AI Intelligence Chip */}
      {complaint.aiAnalysis && (
        <div className="mt-3.5 flex items-start gap-2.5 rounded-xl border border-cyan-500/25 bg-cyan-500/5 p-3 text-xs text-cyan-300 dark:text-cyan-300">
          <Sparkles className="h-4 w-4 shrink-0 text-brand-cyan mt-0.5" />
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 font-medium">
              <span className="text-white font-semibold">AI Detection:</span>
              <span className="font-mono text-[11px] bg-brand-cyan/20 px-1.5 py-0.2 rounded text-brand-cyan">
                {complaint.aiAnalysis.confidence}% Confidence
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              {complaint.aiAnalysis.detectedIssue}
            </p>
          </div>
        </div>
      )}

      {/* Image thumbnail if attached */}
      {complaint.image && (
        <div className="mt-3 relative h-28 w-full rounded-xl overflow-hidden border border-slate-200 dark:border-brand-navy-border/60">
          <img
            src={complaint.image}
            alt="Infrastructure condition"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2">
            <span className="text-[10px] text-white/90 font-mono">Field Inspection Upload</span>
          </div>
        </div>
      )}

      {/* Location and Assigned Employee info */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-brand-navy-border/50">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-brand-cyan shrink-0" />
          <span className="line-clamp-1">{complaint.location}</span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <User className="h-3.5 w-3.5 text-slate-400" />
          <span>Assigned: {complaint.assignedEmployee}</span>
        </div>
      </div>

      {/* Role-based actions */}
      <div className="mt-4 flex items-center justify-between gap-2">
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(complaint)}
            className="text-xs text-slate-600 dark:text-slate-300 hover:text-brand-cyan flex items-center gap-1 font-medium transition-colors"
          >
            <span>View Timeline</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {currentRole === 'FIELD_EMPLOYEE' && !isResolved && (
            <>
              {!isInMaintenance && onStartRepair && (
                <button
                  onClick={() => onStartRepair(complaint.id)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all flex items-center gap-1.5"
                >
                  <Wrench className="h-3.5 w-3.5" />
                  <span>Start Repair</span>
                </button>
              )}

              {onCompleteRepair && (
                <button
                  onClick={() => onCompleteRepair(complaint)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-glow-green/30 hover:opacity-95 transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Complete Repair</span>
                </button>
              )}
            </>
          )}

          {isResolved && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Resolved</span>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ComplaintCard;

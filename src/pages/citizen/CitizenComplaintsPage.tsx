import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardList,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Wrench,
  AlertTriangle,
  Sparkles,
  MapPin,
  User,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { Complaint, ComplaintStatus } from '../../types';

export const CitizenComplaintsPage: React.FC = () => {
  const { complaints } = useLumi();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [expandedComplaintId, setExpandedComplaintId] = useState<string | null>(
    complaints[0]?.id || null
  );

  const timelineSteps: { status: ComplaintStatus; label: string; desc: string }[] = [
    { status: 'FILED', label: 'Filed', desc: 'Complaint registered by citizen with GPS location' },
    { status: 'ANALYZED', label: 'AI Analyzed', desc: 'Computer vision categorized fault & priority' },
    { status: 'ASSIGNED', label: 'Assigned', desc: 'Dispatched to ward linesman (EB Division)' },
    { status: 'ACCEPTED', label: 'Accepted', desc: 'Field employee acknowledged and scheduled on site' },
    { status: 'MAINTENANCE', label: 'Maintenance', desc: 'Linesman working on pole, testing replacement parts' },
    { status: 'RESOLVED', label: 'Resolved', desc: 'Repairs completed, luminosity verified & operational' },
  ];

  const getStepIndex = (status: ComplaintStatus) => {
    return timelineSteps.findIndex(s => s.status === status);
  };

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.streetlightId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedStatus === 'ALL') return true;
    if (selectedStatus === 'ACTIVE') return c.status !== 'RESOLVED';
    if (selectedStatus === 'RESOLVED') return c.status === 'RESOLVED';
    return c.status === selectedStatus;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-brand-cyan">
              <ClipboardList className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              My Complaints & Work Order Tracking
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Transparent real-time lifecycle tracking of all reported infrastructure defects.
          </p>
        </div>

        {/* Status Count Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border text-xs font-mono">
          <span className="text-slate-500">Total Tracked:</span>
          <strong className="text-brand-cyan">{complaints.length}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by Complaint ID, Category, Streetlight..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-2 pl-10 pr-4 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-brand-cyan focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['ALL', 'ACTIVE', 'RESOLVED'].map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedStatus(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedStatus === tab
                  ? 'bg-brand-cyan text-brand-navy-deep font-bold shadow-glow-cyan-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab === 'ALL' ? 'All Tickets' : tab === 'ACTIVE' ? 'Active Issues' : 'Resolved'}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints List with Expanding Animated Timelines */}
      <div className="space-y-4">
        {filteredComplaints.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border text-slate-500">
            No complaints found matching your criteria.
          </div>
        ) : (
          filteredComplaints.map(cmp => {
            const isExpanded = expandedComplaintId === cmp.id;
            const currentStepIdx = getStepIndex(cmp.status);

            return (
              <div
                key={cmp.id}
                className="overflow-hidden rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm transition-all hover:border-cyan-500/40"
              >
                {/* Collapsed / Header Summary View */}
                <div
                  onClick={() => setExpandedComplaintId(isExpanded ? null : cmp.id)}
                  className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-brand-navy-surface/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-brand-cyan">
                      {cmp.id}
                    </span>
                    <StatusBadge status={cmp.priority} size="sm" />
                    <StatusBadge status={cmp.status} size="sm" />
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <span className="hidden sm:inline">Poles: {cmp.streetlightId}</span>
                    <span>{cmp.createdAt}</span>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-90 text-brand-cyan' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded Details and Animated Step Timeline */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-100 dark:border-slate-800 p-6 space-y-6 bg-slate-50/50 dark:bg-brand-navy-surface/20"
                    >
                      {/* Description and Metadata */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {cmp.category}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {cmp.description}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                            <MapPin className="h-3.5 w-3.5 text-brand-cyan" />
                            <span>{cmp.location}</span>
                          </div>
                        </div>

                        {/* AI & Officer Badge */}
                        <div className="space-y-2.5">
                          {cmp.aiAnalysis && (
                            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-slate-300 space-y-1">
                              <div className="flex items-center justify-between text-brand-cyan font-semibold">
                                <span className="flex items-center gap-1">
                                  <Sparkles className="h-3.5 w-3.5" />
                                  AI Computer Vision Triage
                                </span>
                                <span className="font-mono text-[10px]">
                                  {cmp.aiAnalysis.confidence}% Match
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-300">
                                {cmp.aiAnalysis.detectedIssue}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                            <span className="text-slate-400">Assigned Officer:</span>
                            <span className="font-mono text-brand-cyan font-semibold">
                              {cmp.assignedEmployee} (EB Electrical)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Photo if present */}
                      {cmp.image && (
                        <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                          <img
                            src={cmp.image}
                            alt="Defect visual evidence"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Animated 6-Stage Timeline */}
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                        <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
                          Live Resolution Progress
                        </span>

                        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                          {timelineSteps.map((step, idx) => {
                            const isCompleted = idx <= currentStepIdx;
                            const isCurrent = idx === currentStepIdx;

                            return (
                              <div key={step.status} className="relative space-y-2">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`h-7 w-7 rounded-xl flex items-center justify-center text-xs font-bold border transition-all ${
                                      isCurrent
                                        ? 'bg-brand-cyan text-brand-navy-deep border-brand-cyan shadow-glow-cyan-sm animate-pulse'
                                        : isCompleted
                                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700'
                                    }`}
                                  >
                                    {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                                  </div>
                                </div>

                                <div className="space-y-0.5">
                                  <p
                                    className={`text-xs font-bold ${
                                      isCompleted
                                        ? 'text-slate-900 dark:text-white'
                                        : 'text-slate-400'
                                    }`}
                                  >
                                    {step.label}
                                  </p>
                                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                                    {step.desc}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CitizenComplaintsPage;

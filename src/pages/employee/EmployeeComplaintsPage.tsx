import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Search,
  Filter,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import ComplaintCard from '../../components/ComplaintCard/ComplaintCard';
import RepairCompletionModal from '../../components/RepairModal/RepairCompletionModal';
import { Complaint } from '../../types';

export const EmployeeComplaintsPage: React.FC = () => {
  const { complaints, startRepair } = useLumi();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [selectedForRepair, setSelectedForRepair] = useState<Complaint | null>(null);

  const filtered = complaints.filter(c => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.streetlightId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterPriority === 'ALL') return true;
    if (filterPriority === 'ACTIVE') return c.status !== 'RESOLVED';
    if (filterPriority === 'RESOLVED') return c.status === 'RESOLVED';
    if (filterPriority === 'CRITICAL') return c.priority === 'CRITICAL';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <AlertCircle className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Assigned Work Orders & Civic Complaints
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Accept work orders, begin on-site pole maintenance, and verify restoration with photo audits.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border text-xs font-mono">
          <span className="text-slate-500">Active Queue:</span>
          <strong className="text-amber-400">
            {complaints.filter(c => c.status !== 'RESOLVED').length} Tickets
          </strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search tickets by ID, Pole, Issue..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-2 pl-10 pr-4 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-brand-cyan focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'ALL', label: 'All Orders' },
            { id: 'ACTIVE', label: 'Pending Action' },
            { id: 'CRITICAL', label: 'Critical Severity' },
            { id: 'RESOLVED', label: 'Resolved' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterPriority(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterPriority === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-glow-amber'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Work Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(cmp => (
          <ComplaintCard
            key={cmp.id}
            complaint={cmp}
            currentRole="FIELD_EMPLOYEE"
            onStartRepair={id => startRepair(id)}
            onCompleteRepair={item => setSelectedForRepair(item)}
          />
        ))}
      </div>

      {/* Repair Completion Modal */}
      <RepairCompletionModal
        complaint={selectedForRepair}
        onClose={() => setSelectedForRepair(null)}
      />
    </div>
  );
};

export default EmployeeComplaintsPage;

import React, { useState } from 'react';
import { Users, Search, Filter, ShieldCheck, Wrench, CheckCircle2, Phone, Mail } from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import StatusBadge from '../../components/StatusBadge/StatusBadge';

export const GovernmentEmployeesPage: React.FC = () => {
  const { employees } = useLumi();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = employees.filter(emp => {
    const matches =
      emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.area.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matches) return false;
    if (statusFilter !== 'ALL' && emp.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Users className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Field Operations Workforce Directory
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Monitor EB line maintenance officers, assigned ward jurisdictions, workload, and completion metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border text-xs font-mono">
          <span className="text-slate-400">Active Linesmen:</span>
          <strong className="text-emerald-400">
            {employees.filter(e => e.status !== 'Offline').length} / {employees.length}
          </strong>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search linesman by ID, Name, Assigned Ward..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-2 pl-10 pr-4 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-brand-cyan focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-2 px-3 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
        >
          <option value="ALL">All Statuses</option>
          <option value="Available">Available</option>
          <option value="Working">Working (On Site)</option>
          <option value="Offline">Offline</option>
        </select>
      </div>

      {/* Workforce Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(emp => (
          <div
            key={emp.id}
            className="p-5 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-4 hover:border-cyan-500/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-brand-cyan">{emp.id}</span>
              <StatusBadge status={emp.status} size="sm" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">{emp.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{emp.department}</p>
              <p className="text-xs text-brand-cyan font-medium">Jurisdiction: {emp.area}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center font-mono text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-sans block">Assigned</span>
                <strong className="text-slate-200">{emp.assignedStreetlights}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-sans block">Active</span>
                <strong className="text-amber-400">{emp.activeTasks}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-sans block">Done</span>
                <strong className="text-emerald-400">{emp.completedRepairs}</strong>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <Phone className="h-3 w-3 text-slate-500" />
                <span>{emp.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="h-3 w-3 text-slate-500" />
                <span className="truncate">{emp.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovernmentEmployeesPage;

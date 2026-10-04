import React, { useState } from 'react';
import {
  AlertCircle,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpDown,
  BarChart3,
} from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { Complaint } from '../../types';

export const GovernmentComplaintsPage: React.FC = () => {
  const { complaints } = useLumi();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const filtered = complaints.filter(c => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.citizen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.streetlightId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.assignedEmployee.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (priorityFilter !== 'ALL' && c.priority !== priorityFilter) return false;
    return true;
  });

  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === 'RESOLVED').length;
  const resolutionRate = ((resolved / total) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <AlertCircle className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Metropolitan Civic Complaints & Work Orders
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            City-wide ticket ledger, triage prioritization, contractor accountability, and resolution SLAs.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting complaint logs with AI triage reports as CSV...')}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-brand-navy-card border border-slate-300 dark:border-brand-navy-border text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-brand-cyan transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Export Complaint Ledger</span>
        </button>
      </div>

      {/* 4 Mini Analytics Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
          <span className="text-xs text-slate-400 font-medium">Total Complaints</span>
          <p className="mt-1 text-2xl font-bold font-mono text-brand-cyan">{total}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
          <span className="text-xs text-slate-400 font-medium">Resolution Rate</span>
          <p className="mt-1 text-2xl font-bold font-mono text-emerald-400">{resolutionRate}%</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
          <span className="text-xs text-slate-400 font-medium">Average Fix Time</span>
          <p className="mt-1 text-2xl font-bold font-mono text-teal-400">3.2 Hours</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
          <span className="text-xs text-slate-400 font-medium">Active High/Critical</span>
          <p className="mt-1 text-2xl font-bold font-mono text-rose-400">
            {complaints.filter(c => c.status !== 'RESOLVED' && (c.priority === 'CRITICAL' || c.priority === 'HIGH')).length}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search complaint ID, Citizen, Issue, Pole ID..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-2 pl-10 pr-4 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-brand-cyan focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-2 px-3 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Priorities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-2 px-3 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="FILED">Filed</option>
            <option value="ANALYZED">AI Analyzed</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {/* Advanced Data Table */}
      <div className="overflow-hidden rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-brand-navy-surface/40 font-mono text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Citizen</th>
                <th className="py-3 px-4">Defect Category</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Pole ID</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Assigned Line Officer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Reported Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
              {filtered.map(cmp => (
                <tr
                  key={cmp.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                    {cmp.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-900 dark:text-white">{cmp.citizen.name}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{cmp.citizen.phone}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-900 dark:text-slate-100">{cmp.category}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={cmp.priority} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-brand-cyan">
                    {cmp.streetlightId}
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-slate-400">
                    {cmp.location}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    {cmp.assignedEmployee}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={cmp.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                    {cmp.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GovernmentComplaintsPage;

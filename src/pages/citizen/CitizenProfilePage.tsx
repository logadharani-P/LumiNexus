import React from 'react';
import { User, Mail, Phone, MapPin, Shield, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { useLumi } from '../../context/LumiContext';

export const CitizenProfilePage: React.FC = () => {
  const { currentUser, complaints } = useLumi();

  const myComplaints = complaints;
  const resolvedCount = myComplaints.filter(c => c.status === 'RESOLVED').length;
  const activeCount = myComplaints.filter(c => c.status !== 'RESOLVED').length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Citizen Civic Profile
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Your registered residence, identity badge, and civic contribution history.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'}
          alt={currentUser.name}
          className="h-24 w-24 rounded-full object-cover border-2 border-brand-cyan shadow-glow-cyan-sm"
        />

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {currentUser.name}
            </h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
              Verified Citizen
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Civic ID: {currentUser.id}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-brand-cyan shrink-0" />
              <span>{currentUser.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-brand-cyan shrink-0" />
              <span>{currentUser.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-brand-cyan shrink-0" />
              <span>{currentUser.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-3.5 w-3.5 text-brand-cyan shrink-0" />
              <span>Ward Jurisdiction: {currentUser.registeredLocation}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Civic Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Total Complaints
          </span>
          <p className="mt-1 text-2xl font-bold font-mono text-brand-cyan">
            {myComplaints.length}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Resolved Issues
          </span>
          <p className="mt-1 text-2xl font-bold font-mono text-emerald-400">
            {resolvedCount}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Active Tickets
          </span>
          <p className="mt-1 text-2xl font-bold font-mono text-amber-400">
            {activeCount}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Civic Karma Score
          </span>
          <p className="mt-1 text-2xl font-bold font-mono text-teal-400">
            980 pts
          </p>
        </div>
      </div>
    </div>
  );
};

export default CitizenProfilePage;

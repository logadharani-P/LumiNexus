import React from 'react';
import { User, Mail, Phone, MapPin, Shield, Building2, CheckCircle2, BarChart3 } from 'lucide-react';
import { useLumi } from '../../context/LumiContext';

export const GovernmentProfilePage: React.FC = () => {
  const { currentUser, streetlights, complaints, wardAreas } = useLumi();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Municipal Commissioner Executive Profile
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Command authorization, municipal jurisdiction, and city-wide infrastructure governance credentials.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80'}
          alt={currentUser.name}
          className="h-24 w-24 rounded-full object-cover border-2 border-brand-cyan shadow-glow-cyan"
        />

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {currentUser.name}
            </h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-brand-cyan border border-cyan-500/30 font-semibold">
              Commissioner (IAS) • Smart City Mission
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Executive ID: {currentUser.id} • Ministry of Urban Development & Electricity
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
              <span>{currentUser.registeredLocation}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Active Wards Under Command
          </span>
          <p className="mt-1 text-2xl font-bold font-mono text-brand-cyan">
            {wardAreas.length} Wards
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Poles Monitored
          </span>
          <p className="mt-1 text-2xl font-bold font-mono text-emerald-400">
            {streetlights.length} Smart Units
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            SLA Resolution Rate
          </span>
          <p className="mt-1 text-2xl font-bold font-mono text-teal-400">
            94.8%
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Carbon Abated
          </span>
          <p className="mt-1 text-2xl font-bold font-mono text-purple-400">
            18.2 Tons/mo
          </p>
        </div>
      </div>
    </div>
  );
};

export default GovernmentProfilePage;

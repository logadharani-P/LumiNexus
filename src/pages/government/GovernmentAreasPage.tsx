import React from 'react';
import { Building2, Lightbulb, CheckCircle2, AlertTriangle, Wrench, Zap, User } from 'lucide-react';
import { useLumi } from '../../context/LumiContext';

export const GovernmentAreasPage: React.FC = () => {
  const { wardAreas, streetlights, complaints } = useLumi();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-brand-cyan">
              <Building2 className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Metropolitan Wards & Jurisdiction Management
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Zonal division infrastructure health, assigned EB representatives, and energy efficiencies.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border text-xs font-mono">
          <span className="text-slate-400">Total Wards:</span>
          <strong className="text-brand-cyan">{wardAreas.length} Active Zones</strong>
        </div>
      </div>

      {/* Ward Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wardAreas.map(ward => {
          const operationalPct = Math.round(
            (ward.operationalCount / (ward.streetlightsCount || 1)) * 100
          );

          return (
            <div
              key={ward.id}
              className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-4 hover:border-cyan-500/40 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-brand-cyan">{ward.id}</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {ward.name}
                  </h3>
                </div>

                <div className="text-right font-mono">
                  <span className="text-xs text-emerald-400 font-bold">{operationalPct}%</span>
                  <span className="text-[10px] text-slate-400 block font-sans">Uptime</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
                  <div
                    className="bg-emerald-400 h-full"
                    style={{ width: `${(ward.operationalCount / ward.streetlightsCount) * 100}%` }}
                  />
                  <div
                    className="bg-rose-500 h-full"
                    style={{ width: `${(ward.faultyCount / ward.streetlightsCount) * 100}%` }}
                  />
                  <div
                    className="bg-amber-400 h-full"
                    style={{ width: `${(ward.maintenanceCount / ward.streetlightsCount) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span className="text-emerald-400">{ward.operationalCount} Operational</span>
                  <span className="text-rose-400">{ward.faultyCount} Faulty</span>
                  <span className="text-amber-400">{ward.maintenanceCount} Maint</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] block">Daily Energy:</span>
                  <span className="font-mono font-semibold text-slate-200">
                    {ward.energyUsageTodayKWh} kWh
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Open Complaints:</span>
                  <span className="font-mono font-semibold text-amber-400">
                    {ward.complaintsCount} Tickets
                  </span>
                </div>
              </div>

              {/* Representative Banner */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">Assigned Representative:</span>
                  <strong className="text-white font-mono">{ward.representativeName}</strong>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-brand-cyan/15 text-brand-cyan">
                  {ward.representativeId}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GovernmentAreasPage;

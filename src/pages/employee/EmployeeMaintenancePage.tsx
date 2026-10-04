import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, CheckCircle2, Clock, History, AlertTriangle, ShieldCheck, User } from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import RepairCompletionModal from '../../components/RepairModal/RepairCompletionModal';
import { Complaint } from '../../types';

export const EmployeeMaintenancePage: React.FC = () => {
  const { streetlights, complaints } = useLumi();
  const [selectedForRepair, setSelectedForRepair] = useState<Complaint | null>(null);

  // Extract all maintenance records from streetlights
  const allLogs = streetlights.flatMap(sl => sl.maintenanceHistory || []);
  const activeMaintenanceComplaints = complaints.filter(c => c.status === 'MAINTENANCE' || c.status === 'ACCEPTED');

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Wrench className="h-5 w-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Field Maintenance & Repairs Registry
          </h1>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Official ledger of completed electrical repairs, component replacements, and field calibration.
        </p>
      </div>

      {/* Active In-Progress Queue Section */}
      {activeMaintenanceComplaints.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Clock className="h-4 w-4 animate-spin" />
            Active Tasks Awaiting Completion Sign-off ({activeMaintenanceComplaints.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeMaintenanceComplaints.map(cmp => (
              <div
                key={cmp.id}
                className="p-5 rounded-3xl bg-amber-500/5 border border-amber-500/30 text-slate-100 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-300">{cmp.id}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    IN PROGRESS
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{cmp.category} ({cmp.streetlightId})</h4>
                  <p className="text-xs text-slate-300 mt-0.5">{cmp.location}</p>
                </div>
                <button
                  onClick={() => setSelectedForRepair(cmp)}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-glow-green/30 hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Complete Repair & Upload Proofs</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Maintenance Audit Log */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <History className="h-4 w-4 text-brand-cyan" />
          Completed Maintenance Audit Logs ({allLogs.length})
        </h3>

        <div className="space-y-3">
          {allLogs.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border text-slate-500 text-xs">
              No historical maintenance records found. Complete a repair above to see it logged.
            </div>
          ) : (
            allLogs.map(log => (
              <div
                key={log.id}
                className="p-5 rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-brand-cyan">{log.id}</span>
                    <span className="text-xs text-slate-400 font-mono">
                      Target Pole: <strong className="text-white">{log.streetlightId}</strong>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {log.finalCondition}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 font-mono">
                    {log.repairDate} at {log.repairTime}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5 font-medium">Issue Found:</span>
                    <p className="text-slate-200">{log.issueFound}</p>
                    <span className="text-slate-400 block mt-2 mb-0.5 font-medium">Action Performed:</span>
                    <p className="text-emerald-400 font-semibold">{log.repairPerformed}</p>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-0.5 font-medium">Parts Replaced:</span>
                    <p className="text-slate-200 font-mono">{log.partsReplaced}</p>
                    <span className="text-slate-400 block mt-2 mb-0.5 font-medium">Officer:</span>
                    <p className="text-brand-cyan">{log.employeeName} ({log.employeeId})</p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 font-semibold">Notes: </span>
                  {log.maintenanceNotes}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <RepairCompletionModal
        complaint={selectedForRepair}
        onClose={() => setSelectedForRepair(null)}
      />
    </div>
  );
};

export default EmployeeMaintenancePage;

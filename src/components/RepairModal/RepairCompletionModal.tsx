import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Wrench,
  CheckCircle2,
  Camera,
  UploadCloud,
  Sparkles,
  Zap,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { Complaint, Streetlight } from '../../types';
import { useLumi } from '../../context/LumiContext';

interface RepairCompletionModalProps {
  complaint?: Complaint | null;
  streetlight?: Streetlight | null;
  onClose: () => void;
}

export const RepairCompletionModal: React.FC<RepairCompletionModalProps> = ({
  complaint,
  streetlight,
  onClose,
}) => {
  const { completeRepair, currentUser } = useLumi();

  const slId = complaint?.streetlightId || streetlight?.id || 'SL-204';
  const cmpId = complaint?.id || 'CMP-20481';

  const [issueFound, setIssueFound] = useState(
    'Burned capacitor on primary 450V ballast driver & loose neutral clamp.'
  );
  const [repairPerformed, setRepairPerformed] = useState(
    'Replaced ballast driver board, re-crimped neutral lead, and calibrated optical lux threshold.'
  );
  const [partsReplaced, setPartsReplaced] = useState(
    'Solid State Relay 30A, 450V 220uF Capacitor, MOV Surge Arrester'
  );
  const [maintenanceNotes, setMaintenanceNotes] = useState(
    'All terminal connections torqued to 2.5 Nm. Luminaire tested at 100% brightness. Operating temperature stable at 31°C.'
  );
  const [finalCondition, setFinalCondition] = useState<'Optimal' | 'Satisfactory' | 'Follow-up Needed'>(
    'Optimal'
  );

  const [beforeImage, setBeforeImage] = useState(
    'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=600&auto=format&fit=crop&q=80'
  );
  const [afterImage, setAfterImage] = useState(
    'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      completeRepair({
        streetlightId: slId,
        complaintId: cmpId,
        issueFound,
        repairPerformed,
        partsReplaced,
        maintenanceNotes,
        beforeImage,
        afterImage,
        employeeId: currentUser.id || 'EB-1042',
        employeeName: currentUser.name || 'Rajesh Kumar',
        finalCondition,
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1400);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-cyan-500/40 bg-slate-950 text-slate-100 shadow-2xl p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Success Overlay state */}
          {isSuccess ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-12 text-center space-y-4"
            >
              <div className="h-20 w-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-green animate-bounce">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Streetlight Marked as Repaired!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Pole <strong className="text-brand-cyan">{slId}</strong> status updated to{' '}
                <span className="text-emerald-400 font-bold">OPERATIONAL</span>. Ticket{' '}
                <strong className="text-amber-300">{cmpId}</strong> is resolved. Map marker updated to Green.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Header */}
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <Wrench className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      Maintenance & Repair Sign-Off
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Pole ID: <strong className="text-brand-cyan">{slId}</strong> • Work Order:{' '}
                      <strong className="text-amber-300">{cmpId}</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Grid */}
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Defect / Root Cause Found
                  </label>
                  <input
                    type="text"
                    value={issueFound}
                    onChange={e => setIssueFound(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 px-3 text-slate-100 focus:border-brand-cyan focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Repair & Corrective Action Performed
                  </label>
                  <input
                    type="text"
                    value={repairPerformed}
                    onChange={e => setRepairPerformed(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 px-3 text-slate-100 focus:border-brand-cyan focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Parts & Components Replaced
                  </label>
                  <input
                    type="text"
                    value={partsReplaced}
                    onChange={e => setPartsReplaced(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 px-3 text-slate-100 focus:border-brand-cyan focus:outline-none"
                  />
                </div>

                {/* Before and After Image Proofs */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="block text-slate-400 font-semibold uppercase tracking-wider mb-1 text-[11px]">
                      Before Repair Evidence
                    </span>
                    <div className="relative h-28 rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                      <img
                        src={beforeImage}
                        alt="Before repair"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 bg-black/70 text-[10px] px-1.5 py-0.5 rounded text-rose-300 font-mono">
                        Before (Fault)
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="block text-slate-400 font-semibold uppercase tracking-wider mb-1 text-[11px]">
                      After Repair Verification
                    </span>
                    <div className="relative h-28 rounded-xl overflow-hidden border border-emerald-500/40 bg-slate-900">
                      <img
                        src={afterImage}
                        alt="After repair"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 bg-black/70 text-[10px] px-1.5 py-0.5 rounded text-emerald-400 font-mono">
                        After (Restored)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Maintenance Notes */}
                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Linesman Maintenance Notes
                  </label>
                  <textarea
                    rows={2}
                    value={maintenanceNotes}
                    onChange={e => setMaintenanceNotes(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-slate-100 focus:border-brand-cyan focus:outline-none resize-none"
                  />
                </div>

                {/* Final Condition & Signer */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1 text-[11px]">
                      Final Pole Condition
                    </label>
                    <select
                      value={finalCondition}
                      onChange={e => setFinalCondition(e.target.value as any)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2 px-3 text-slate-100 focus:border-brand-cyan focus:outline-none"
                    >
                      <option value="Optimal">Optimal (100% Operational)</option>
                      <option value="Satisfactory">Satisfactory (Acceptable Lux)</option>
                      <option value="Follow-up Needed">Follow-up Needed (Cable Aging)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1 text-[11px]">
                      Field Officer ID
                    </label>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-700 font-mono text-brand-cyan font-bold">
                      {currentUser.id} ({currentUser.name})
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold text-xs shadow-glow-green hover:opacity-95 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Mark as Repaired & Restore Pole</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RepairCompletionModal;

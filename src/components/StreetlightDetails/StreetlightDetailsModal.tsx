import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Zap,
  Activity,
  Thermometer,
  Clock,
  Wrench,
  User,
  MapPin,
  ShieldCheck,
  Video,
  AlertTriangle,
  History,
  TrendingUp,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Streetlight } from '../../types';
import StatusBadge from '../StatusBadge/StatusBadge';

interface StreetlightDetailsModalProps {
  streetlight: Streetlight | null;
  onClose: () => void;
  onOpenCamera?: (sl: Streetlight) => void;
  onReportIssue?: (sl: Streetlight) => void;
}

export const StreetlightDetailsModal: React.FC<StreetlightDetailsModalProps> = ({
  streetlight,
  onClose,
  onOpenCamera,
  onReportIssue,
}) => {
  if (!streetlight) return null;

  // Mock 24h telemetry curve for energy and brightness
  const telemetryData = [
    { time: '18:00', brightness: 30, energy: 0.28 },
    { time: '20:00', brightness: 80, energy: 0.75 },
    { time: '22:00', brightness: 100, energy: 0.95 },
    { time: '00:00', brightness: 100, energy: 0.98 },
    { time: '02:00', brightness: 60, energy: 0.58 },
    { time: '04:00', brightness: 60, energy: 0.56 },
    { time: '06:00', brightness: 20, energy: 0.18 },
  ];

  const isHealthy = streetlight.healthScore >= 80;
  const isFair = streetlight.healthScore >= 50 && streetlight.healthScore < 80;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700/80 bg-slate-900/95 text-slate-100 shadow-2xl p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold font-mono text-brand-cyan tracking-wide">
                  {streetlight.id}
                </h3>
                <StatusBadge status={streetlight.status} size="md" />
              </div>
              <p className="mt-1 text-sm text-slate-400 flex items-center gap-1.5 font-sans">
                <MapPin className="h-4 w-4 text-brand-cyan" />
                <span>{streetlight.location} ({streetlight.area})</span>
              </p>
            </div>

            {/* Health Score Banner */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-800/80 border border-slate-700">
              <ShieldCheck
                className={`h-7 w-7 ${
                  isHealthy
                    ? 'text-emerald-400'
                    : isFair
                    ? 'text-amber-400'
                    : 'text-rose-400 animate-pulse'
                }`}
              />
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                  Health Score
                </span>
                <span className="text-xl font-bold font-mono">
                  {streetlight.healthScore}%{' '}
                  <span
                    className={`text-xs font-sans ${
                      isHealthy
                        ? 'text-emerald-400'
                        : isFair
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    ({isHealthy ? 'Healthy' : isFair ? 'Attention Needed' : 'Critical Fault'})
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Telemetry Grid */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-brand-cyan" />
                Power / Brightness
              </span>
              <p className="mt-1 text-lg font-bold font-mono text-slate-100">
                {streetlight.brightness}%
              </p>
              <span className="text-[10px] text-slate-400 font-mono">
                Status: {streetlight.powerStatus}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Activity className="h-3.5 w-3.5 text-emerald-400" />
                Energy Usage
              </span>
              <p className="mt-1 text-lg font-bold font-mono text-slate-100">
                {streetlight.energyConsumption} <span className="text-xs font-normal">kWh</span>
              </p>
              <span className="text-[10px] text-emerald-400/90 font-mono">
                Optimal draw
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Thermometer className="h-3.5 w-3.5 text-amber-400" />
                Sensor Temp
              </span>
              <p className="mt-1 text-lg font-bold font-mono text-slate-100">
                {streetlight.temperature}°C
              </p>
              <span className="text-[10px] text-slate-400 font-mono">
                Rated: &lt;65°C
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-blue-400" />
                Operating Hours
              </span>
              <p className="mt-1 text-lg font-bold font-mono text-slate-100">
                {streetlight.operatingHours}h
              </p>
              <span className="text-[10px] text-slate-400 font-mono">
                LED lifetime 50kh
              </span>
            </div>
          </div>

          {/* Operational Details & Coordinates */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">GPS Coordinates:</span>
              <span className="font-mono text-slate-200">
                {streetlight.latitude.toFixed(4)}° N, {streetlight.longitude.toFixed(4)}° E
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Assigned Field Representative:</span>
              <span className="font-mono text-brand-cyan">
                {streetlight.assignedEmployee} (EB Electrical Division)
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Last Preventive Maintenance:</span>
              <span className="font-mono text-slate-200">{streetlight.lastMaintenance}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Pole Specification:</span>
              <span className="font-sans text-slate-200">{streetlight.poleType || 'Smart LED Mast'}</span>
            </div>
          </div>

          {/* 24-Hour Telemetry Recharts Chart */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-brand-cyan" />
                24-Hour Dynamic Telemetry (Brightness & Energy Draw)
              </span>
              <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded">
                Live IoT Feed
              </span>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={telemetryData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBrightness" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E294B" />
                  <XAxis dataKey="time" stroke="#64748B" fontSize={10} />
                  <YAxis stroke="#64748B" fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0B132B',
                      borderColor: '#1E294B',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="brightness"
                    name="Brightness (%)"
                    stroke="#00F0FF"
                    fillOpacity={1}
                    fill="url(#colorBrightness)"
                  />
                  <Area
                    type="monotone"
                    dataKey="energy"
                    name="Energy (kWh)"
                    stroke="#10B981"
                    fillOpacity={1}
                    fill="url(#colorEnergy)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Maintenance History */}
          {streetlight.maintenanceHistory && streetlight.maintenanceHistory.length > 0 && (
            <div className="mt-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
                <History className="h-3.5 w-3.5 text-brand-cyan" />
                Recent Maintenance Logs ({streetlight.maintenanceHistory.length})
              </span>
              <div className="space-y-2">
                {streetlight.maintenanceHistory.map(hist => (
                  <div
                    key={hist.id}
                    className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-semibold text-brand-cyan">{hist.repairPerformed}</span>
                      <span className="font-mono text-[11px] text-slate-400">{hist.repairDate} at {hist.repairTime}</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{hist.maintenanceNotes}</p>
                    <div className="flex items-center gap-3 pt-1 text-[10px] text-slate-400">
                      <span>Parts replaced: <strong className="text-slate-200">{hist.partsReplaced}</strong></span>
                      <span>By: <strong className="text-slate-200">{hist.employeeName}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-800">
            {streetlight.cameraId && onOpenCamera && (
              <button
                onClick={() => {
                  onClose();
                  onOpenCamera(streetlight);
                }}
                className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-all text-xs font-semibold flex items-center gap-2"
              >
                <Video className="h-4 w-4" />
                <span>Open Infrastructure Camera</span>
              </button>
            )}

            {streetlight.status === 'FAULTY' && onReportIssue && (
              <button
                onClick={() => {
                  onClose();
                  onReportIssue(streetlight);
                }}
                className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-all text-xs font-semibold flex items-center gap-2"
              >
                <AlertTriangle className="h-4 w-4" />
                <span>File Civic Complaint</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default StreetlightDetailsModal;

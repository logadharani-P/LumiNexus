import React, { useState } from 'react';
import {
  Lightbulb,
  Search,
  Filter,
  Sliders,
  ShieldCheck,
  Video,
  ArrowUpDown,
  Download,
} from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import StreetlightDetailsModal from '../../components/StreetlightDetails/StreetlightDetailsModal';
import CameraModal from '../../components/CameraView/CameraModal';
import { Streetlight, Camera } from '../../types';

export const GovernmentStreetlightsPage: React.FC = () => {
  const { streetlights, cameras, updateStreetlightBrightness } = useLumi();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWard, setSelectedWard] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const [selectedStreetlight, setSelectedStreetlight] = useState<Streetlight | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  const filtered = streetlights.filter(sl => {
    const matchesSearch =
      sl.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sl.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sl.assignedEmployee.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedWard !== 'ALL' && sl.area !== selectedWard) return false;
    if (selectedStatus !== 'ALL' && sl.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-brand-cyan">
              <Lightbulb className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Metropolitan Streetlight Asset Registry
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Telemetry registry for all connected smart poles, sensor diagnostics, and ballast health scores.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting complete infrastructure asset inventory as CSV/GeoJSON...')}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-brand-navy-card border border-slate-300 dark:border-brand-navy-border text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-brand-cyan transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Export Asset Registry</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by Streetlight ID, Road, Linesman ID..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-2 pl-10 pr-4 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-brand-cyan focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Ward filter */}
          <select
            value={selectedWard}
            onChange={e => setSelectedWard(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-2 px-3 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Wards</option>
            <option value="Ward 12">Ward 12 (Tech Corridor)</option>
            <option value="Ward 15">Ward 15 (Coastal Marina)</option>
            <option value="Ward 21">Ward 21 (Industrial)</option>
            <option value="Ward 5">Ward 5 (Heritage)</option>
            <option value="Ward 8">Ward 8 (University)</option>
            <option value="Ward 3">Ward 3 (Expressway)</option>
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-2 px-3 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="OPERATIONAL">Operational</option>
            <option value="FAULTY">Faulty</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="RECENTLY_REPAIRED">Recently Repaired</option>
          </select>
        </div>
      </div>

      {/* Streetlight Data Table */}
      <div className="overflow-hidden rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-brand-navy-surface/40 font-mono text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Pole ID</th>
                <th className="py-3 px-4">Location / Ward</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Health Score</th>
                <th className="py-3 px-4">Output / Brightness</th>
                <th className="py-3 px-4">Energy (kWh)</th>
                <th className="py-3 px-4">Temp</th>
                <th className="py-3 px-4">Assigned Line Officer</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
              {filtered.map(sl => (
                <tr
                  key={sl.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-brand-cyan">
                    {sl.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-900 dark:text-white line-clamp-1">{sl.location}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{sl.area}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={sl.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold">
                    <span
                      className={
                        sl.healthScore >= 80
                          ? 'text-emerald-400'
                          : sl.healthScore >= 50
                          ? 'text-amber-400'
                          : 'text-rose-400 animate-pulse font-bold'
                      }
                    >
                      {sl.healthScore}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono w-8">{sl.brightness}%</span>
                      <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-cyan rounded-full"
                          style={{ width: `${sl.brightness}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    {sl.energyConsumption} kWh
                  </td>
                  <td className="py-3.5 px-4 font-mono text-amber-400">
                    {sl.temperature}°C
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs">
                    {sl.assignedEmployee}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {sl.cameraId && (
                        <button
                          onClick={() => {
                            const matchedCam = cameras.find(c => c.streetlightId === sl.id) || null;
                            setSelectedCamera(matchedCam);
                          }}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-purple-400 hover:bg-purple-500/10 transition-colors"
                          title="Stream Surveillance Cam"
                        >
                          <Video className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedStreetlight(sl)}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-brand-cyan/15 hover:bg-brand-cyan/25 text-brand-cyan transition-colors"
                      >
                        Telemetry
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <StreetlightDetailsModal
        streetlight={selectedStreetlight}
        onClose={() => setSelectedStreetlight(null)}
        onOpenCamera={sl => {
          setSelectedStreetlight(null);
          const matchedCam = cameras.find(c => c.streetlightId === sl.id) || null;
          setSelectedCamera(matchedCam);
        }}
      />

      <CameraModal
        camera={selectedCamera}
        streetlight={selectedStreetlight}
        onClose={() => setSelectedCamera(null)}
      />
    </div>
  );
};

export default GovernmentStreetlightsPage;

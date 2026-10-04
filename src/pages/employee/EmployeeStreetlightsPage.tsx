import React, { useState } from 'react';
import { Lightbulb, Search, Filter, Wrench } from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import StreetlightCard from '../../components/StreetlightCard/StreetlightCard';
import StreetlightDetailsModal from '../../components/StreetlightDetails/StreetlightDetailsModal';
import CameraModal from '../../components/CameraView/CameraModal';
import RepairCompletionModal from '../../components/RepairModal/RepairCompletionModal';
import { Streetlight, Camera, Complaint } from '../../types';

export const EmployeeStreetlightsPage: React.FC = () => {
  const { streetlights, cameras, complaints } = useLumi();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [selectedStreetlight, setSelectedStreetlight] = useState<Streetlight | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [repairModalTarget, setRepairModalTarget] = useState<Complaint | null>(null);

  const filtered = streetlights.filter(sl => {
    const matches =
      sl.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sl.location.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matches) return false;
    if (statusFilter === 'ALL') return true;
    return sl.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Lightbulb className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Assigned Streetlight Grid
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time operating status, sensor temperatures, and ballast health of Ward 12 infrastructure.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border text-xs font-mono">
          <span className="text-slate-400">Total Poles:</span>
          <strong className="text-brand-cyan">{streetlights.length}</strong>
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
            placeholder="Search pole by ID, road..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-2 pl-10 pr-4 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-brand-cyan focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'ALL', label: 'All Poles' },
            { id: 'FAULTY', label: 'Faulty (Red)' },
            { id: 'MAINTENANCE', label: 'Maintenance (Yellow)' },
            { id: 'OPERATIONAL', label: 'Operational (Green)' },
            { id: 'RECENTLY_REPAIRED', label: 'Repaired (Blue)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-glow-amber'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(sl => (
          <StreetlightCard
            key={sl.id}
            streetlight={sl}
            onViewDetails={item => setSelectedStreetlight(item)}
            onOpenCamera={item => {
              const matchedCam = cameras.find(c => c.streetlightId === item.id) || null;
              setSelectedCamera(matchedCam);
            }}
          />
        ))}
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

      <RepairCompletionModal
        complaint={repairModalTarget}
        onClose={() => setRepairModalTarget(null)}
      />
    </div>
  );
};

export default EmployeeStreetlightsPage;

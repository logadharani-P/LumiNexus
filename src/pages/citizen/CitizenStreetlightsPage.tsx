import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Search, Filter, Plus } from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import StreetlightCard from '../../components/StreetlightCard/StreetlightCard';
import StreetlightDetailsModal from '../../components/StreetlightDetails/StreetlightDetailsModal';
import CameraModal from '../../components/CameraView/CameraModal';
import { Streetlight, Camera } from '../../types';

export const CitizenStreetlightsPage: React.FC = () => {
  const navigate = useNavigate();
  const { streetlights, cameras } = useLumi();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedWard, setSelectedWard] = useState<string>('ALL');

  const [selectedStreetlight, setSelectedStreetlight] = useState<Streetlight | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  const filtered = streetlights.filter(sl => {
    const matchesSearch =
      sl.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sl.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedWard !== 'ALL' && sl.area !== selectedWard) return false;
    if (selectedStatus === 'ALL') return true;
    return sl.status === selectedStatus;
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
              Streetlights Directory & Telemetry
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time power status, energy metrics, and health scores across connected smart poles.
          </p>
        </div>

        <button
          onClick={() => navigate('/citizen/complaints/new')}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-cyan text-brand-navy-deep font-bold text-xs shadow-glow-cyan-sm hover:shadow-glow-cyan transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Report Fault</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by Streetlight ID (e.g. SL-204) or road..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-2 pl-10 pr-4 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-brand-cyan focus:outline-none"
          />
        </div>

        {/* Status Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'ALL', label: 'All Poles' },
            { id: 'OPERATIONAL', label: 'Operational' },
            { id: 'FAULTY', label: 'Faulty' },
            { id: 'MAINTENANCE', label: 'Maintenance' },
            { id: 'RECENTLY_REPAIRED', label: 'Repaired' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedStatus === tab.id
                  ? 'bg-brand-cyan text-brand-navy-deep font-bold shadow-glow-cyan-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Streetlights Grid */}
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
            onReportIssue={item => navigate(`/citizen/complaints/new?streetlight=${item.id}`)}
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
        onReportIssue={sl => {
          setSelectedStreetlight(null);
          navigate(`/citizen/complaints/new?streetlight=${sl.id}`);
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

export default CitizenStreetlightsPage;

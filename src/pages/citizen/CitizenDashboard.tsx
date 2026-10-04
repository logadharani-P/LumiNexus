import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Clock,
  ShieldCheck,
  Plus,
  ArrowRight,
  MapPin,
  Sparkles,
  Video,
} from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import StatCard from '../../components/StatCard/StatCard';
import StreetlightCard from '../../components/StreetlightCard/StreetlightCard';
import ComplaintCard from '../../components/ComplaintCard/ComplaintCard';
import MapView from '../../components/MapView/MapView';
import StreetlightDetailsModal from '../../components/StreetlightDetails/StreetlightDetailsModal';
import CameraModal from '../../components/CameraView/CameraModal';
import { Streetlight, Camera } from '../../types';

export const CitizenDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, streetlights, complaints, cameras } = useLumi();

  const [selectedStreetlight, setSelectedStreetlight] = useState<Streetlight | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  // Filter local ward streetlights (Ward 12)
  const localStreetlights = streetlights.filter(sl => sl.area === 'Ward 12');
  const operationalCount = localStreetlights.filter(sl => sl.status === 'OPERATIONAL').length;
  const faultyCount = localStreetlights.filter(sl => sl.status === 'FAULTY').length;
  const maintenanceCount = localStreetlights.filter(sl => sl.status === 'MAINTENANCE').length;
  const myComplaints = complaints.slice(0, 3);
  const resolvedCount = complaints.filter(c => c.status === 'RESOLVED').length;
  const activeComplaintsCount = complaints.filter(c => c.status !== 'RESOLVED').length;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Good afternoon, {currentUser.name}
            </h1>
            <span className="text-xl">👋</span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-brand-cyan" />
            <span>Here's the current infrastructure status around your location ({currentUser.registeredLocation}).</span>
          </p>
        </div>

        <button
          onClick={() => navigate('/citizen/complaints/new')}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-aqua text-brand-navy-deep font-bold text-xs shadow-glow-cyan hover:shadow-cyan-400/50 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>File a Complaint</span>
        </button>
      </div>

      {/* 6 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Local Lights"
          value={localStreetlights.length}
          subtitle="Ward 12"
          icon={Lightbulb}
          accentColor="cyan"
          onClick={() => navigate('/citizen/streetlights')}
        />
        <StatCard
          title="Operational"
          value={operationalCount}
          subtitle="Optimal"
          icon={CheckCircle2}
          accentColor="emerald"
          trend={{ value: '100% lit', isPositive: true }}
        />
        <StatCard
          title="Faulty"
          value={faultyCount}
          subtitle="Attention"
          icon={AlertTriangle}
          accentColor="rose"
          trend={faultyCount > 0 ? { value: `${faultyCount} alerts`, isPositive: false } : undefined}
        />
        <StatCard
          title="Maintenance"
          value={maintenanceCount}
          subtitle="In Progress"
          icon={Wrench}
          accentColor="amber"
        />
        <StatCard
          title="Active Reports"
          value={activeComplaintsCount}
          subtitle="Open"
          icon={Clock}
          accentColor="blue"
        />
        <StatCard
          title="Resolved"
          value={resolvedCount}
          subtitle="Restored"
          icon={ShieldCheck}
          accentColor="emerald"
        />
      </div>

      {/* Interactive Map Preview Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Interactive Ward 12 Infrastructure Map</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                LIVE GEO-TELEMETRY
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Click any marker to inspect streetlight health or stream live camera feeds.
            </p>
          </div>

          <button
            onClick={() => navigate('/citizen/map')}
            className="text-xs text-brand-cyan hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Full Screen Map</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="h-[380px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-brand-navy-border shadow-lg">
          <MapView
            streetlights={localStreetlights}
            cameras={cameras}
            center={[12.9785, 77.5992]}
            zoom={15}
            onSelectStreetlight={sl => setSelectedStreetlight(sl)}
            onSelectCamera={cam => setSelectedCamera(cam)}
            onReportIssue={sl => navigate(`/citizen/complaints/new?streetlight=${sl.id}`)}
            onOpenCamera={sl => {
              const matchedCam = cameras.find(c => c.streetlightId === sl.id) || null;
              setSelectedCamera(matchedCam);
            }}
          />
        </div>
      </div>

      {/* Nearby Streetlights Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Nearby Streetlights
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live power status and illumination telemetry for poles around your registered residence.
            </p>
          </div>

          <button
            onClick={() => navigate('/citizen/streetlights')}
            className="text-xs text-brand-cyan hover:underline font-semibold"
          >
            View all {localStreetlights.length} streetlights
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {localStreetlights.slice(0, 6).map(sl => (
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
      </div>

      {/* Recent Civic Complaints Tracking */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-brand-navy-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Complaints In Your Area
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track real-time maintenance updates and line officer dispatches.
            </p>
          </div>

          <button
            onClick={() => navigate('/citizen/complaints')}
            className="text-xs text-brand-cyan hover:underline font-semibold"
          >
            View My Complaints
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myComplaints.map(cmp => (
            <ComplaintCard
              key={cmp.id}
              complaint={cmp}
              currentRole="CITIZEN"
              onViewDetails={() => navigate('/citizen/complaints')}
            />
          ))}
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

export default CitizenDashboard;

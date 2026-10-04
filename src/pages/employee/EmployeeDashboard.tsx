import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wrench,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Lightbulb,
  ShieldAlert,
  MapPin,
  Video,
  ArrowRight,
  User,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import StatCard from '../../components/StatCard/StatCard';
import ComplaintCard from '../../components/ComplaintCard/ComplaintCard';
import MapView from '../../components/MapView/MapView';
import StreetlightDetailsModal from '../../components/StreetlightDetails/StreetlightDetailsModal';
import CameraModal from '../../components/CameraView/CameraModal';
import RepairCompletionModal from '../../components/RepairModal/RepairCompletionModal';
import { Complaint, Streetlight, Camera } from '../../types';

export const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, streetlights, complaints, cameras, startRepair } = useLumi();

  const [selectedComplaintForRepair, setSelectedComplaintForRepair] = useState<Complaint | null>(null);
  const [selectedStreetlight, setSelectedStreetlight] = useState<Streetlight | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  // Field Employee Stats (Assigned to EB-1042 / Ward 12)
  const assignedComplaints = complaints.filter(
    c => c.assignedEmployee === 'EB-1042' || c.location.includes('Ward 12')
  );
  const pendingRepairs = assignedComplaints.filter(c => c.status !== 'RESOLVED');
  const inProgressRepairs = assignedComplaints.filter(c => c.status === 'MAINTENANCE');
  const resolvedRepairs = assignedComplaints.filter(c => c.status === 'RESOLVED');
  const criticalComplaints = assignedComplaints.filter(c => c.priority === 'CRITICAL' || c.priority === 'HIGH');
  const assignedPoles = streetlights.filter(sl => sl.area === 'Ward 12');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Wrench className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Field Operations
              </h1>
              <span className="text-xs text-amber-400 font-mono font-semibold">
                EB Electrical Linesman Station • Officer {currentUser.id} ({currentUser.name})
              </span>
            </div>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Monitor, inspect and maintain assigned infrastructure across Ward 12 & Tech Corridor.
          </p>
        </div>

        {/* Quick Action Button */}
        <button
          onClick={() => navigate('/employee/maintenance')}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-bold text-xs shadow-glow-amber hover:opacity-95 transition-all"
        >
          <Wrench className="h-4 w-4" />
          <span>Active Maintenance Queue ({inProgressRepairs.length})</span>
        </button>
      </div>

      {/* 6 Key Operations Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Assigned Tasks"
          value={assignedComplaints.length}
          subtitle="Total"
          icon={Clock}
          accentColor="cyan"
        />
        <StatCard
          title="Pending Repairs"
          value={pendingRepairs.length}
          subtitle="Action Req"
          icon={AlertTriangle}
          accentColor="amber"
          trend={{ value: `${pendingRepairs.length} active`, isPositive: false }}
        />
        <StatCard
          title="In Progress"
          value={inProgressRepairs.length}
          subtitle="On-Site"
          icon={Wrench}
          accentColor="blue"
        />
        <StatCard
          title="Completed Today"
          value={currentUser.stats?.resolved || 31}
          subtitle="Verified"
          icon={CheckCircle2}
          accentColor="emerald"
          trend={{ value: '+4 this week', isPositive: true }}
        />
        <StatCard
          title="Assigned Poles"
          value={assignedPoles.length}
          subtitle="Ward 12"
          icon={Lightbulb}
          accentColor="purple"
        />
        <StatCard
          title="Critical Issues"
          value={criticalComplaints.length}
          subtitle="SLA &lt; 2h"
          icon={ShieldAlert}
          accentColor="rose"
        />
      </div>

      {/* Area Representative Badge Card (Section 28) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-brand-navy-card via-brand-navy-surface to-brand-navy-card border border-brand-cyan/30 shadow-lg text-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan font-bold font-mono text-xl shadow-glow-cyan-sm">
            W12
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Ward 12 Tech Corridor</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Active Patrol
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Designated Area Representative: <strong className="text-brand-cyan font-mono">EB-1042 (Rajesh Kumar)</strong>
            </p>
          </div>
        </div>

        {/* 3 Quick Ward Stats */}
        <div className="grid grid-cols-3 gap-6 font-mono text-center w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-700/60 pt-4 md:pt-0 md:pl-6">
          <div>
            <span className="text-xs text-slate-400 font-sans block">Assigned Poles</span>
            <strong className="text-lg text-white font-bold">{assignedPoles.length}</strong>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-sans block">Open Issues</span>
            <strong className="text-lg text-amber-400 font-bold">{pendingRepairs.length}</strong>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-sans block">Repairs Done</span>
            <strong className="text-lg text-emerald-400 font-bold">31</strong>
          </div>
        </div>
      </div>

      {/* Operations Map */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Field Dispatch Map — Ward 12</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                GPS SYNCED
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Red markers represent work orders needing physical inspection. Click a marker to view telemetry or launch live camera.
            </p>
          </div>

          <button
            onClick={() => navigate('/employee/map')}
            className="text-xs text-brand-cyan hover:underline font-semibold"
          >
            Full Map View
          </button>
        </div>

        <div className="h-[360px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-brand-navy-border shadow-lg">
          <MapView
            streetlights={assignedPoles}
            cameras={cameras}
            center={[12.9785, 77.5992]}
            zoom={15}
            onSelectStreetlight={sl => setSelectedStreetlight(sl)}
            onSelectCamera={cam => setSelectedCamera(cam)}
            onOpenCamera={sl => {
              const matchedCam = cameras.find(c => c.streetlightId === sl.id) || null;
              setSelectedCamera(matchedCam);
            }}
          />
        </div>
      </div>

      {/* Assigned Complaints / Work Orders */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-brand-navy-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Assigned Work Orders & Repairs
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Prioritized complaints pending line officer inspection.
            </p>
          </div>

          <button
            onClick={() => navigate('/employee/complaints')}
            className="text-xs text-brand-cyan hover:underline font-semibold"
          >
            View all work orders
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignedComplaints.map(cmp => (
            <ComplaintCard
              key={cmp.id}
              complaint={cmp}
              currentRole="FIELD_EMPLOYEE"
              onStartRepair={id => startRepair(id)}
              onCompleteRepair={item => setSelectedComplaintForRepair(item)}
              onViewDetails={() => navigate('/employee/complaints')}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      <RepairCompletionModal
        complaint={selectedComplaintForRepair}
        onClose={() => setSelectedComplaintForRepair(null)}
      />

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

export default EmployeeDashboard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Clock,
  ShieldCheck,
  Users,
  Activity,
  Zap,
  BarChart3,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useLumi } from '../../context/LumiContext';
import StatCard from '../../components/StatCard/StatCard';
import MapView from '../../components/MapView/MapView';
import StreetlightDetailsModal from '../../components/StreetlightDetails/StreetlightDetailsModal';
import CameraModal from '../../components/CameraView/CameraModal';
import { Streetlight, Camera } from '../../types';

export const GovernmentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { streetlights, complaints, employees, wardAreas, cameras, aiInsights } = useLumi();

  const [selectedStreetlight, setSelectedStreetlight] = useState<Streetlight | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  // Live aggregates
  const totalStreetlights = streetlights.length;
  const operationalCount = streetlights.filter(sl => sl.status === 'OPERATIONAL' || sl.status === 'RECENTLY_REPAIRED').length;
  const faultyCount = streetlights.filter(sl => sl.status === 'FAULTY').length;
  const maintenanceCount = streetlights.filter(sl => sl.status === 'MAINTENANCE').length;
  const openComplaintsCount = complaints.filter(c => c.status !== 'RESOLVED').length;
  const resolvedComplaintsCount = complaints.filter(c => c.status === 'RESOLVED').length;
  const activeEmployeesCount = employees.filter(e => e.status !== 'Offline').length;

  const totalEnergyConsumption = streetlights
    .reduce((acc, curr) => acc + (curr.energyConsumption || 0.8), 0)
    .toFixed(1);

  // Recharts Chart Data: Ward Performance
  const wardChartData = wardAreas.map(w => ({
    name: w.name.split(' ')[0] + ' ' + w.name.split(' ')[1],
    operational: w.operationalCount,
    faulty: w.faultyCount,
    energy: w.energyUsageTodayKWh,
  }));

  // Recharts Chart Data: Hourly City Energy Load
  const energyTrendData = [
    { hour: '18:00', kwh: 120, baseline: 110 },
    { hour: '20:00', kwh: 450, baseline: 430 },
    { hour: '22:00', kwh: 680, baseline: 650 },
    { hour: '00:00', kwh: 710, baseline: 690 },
    { hour: '02:00', kwh: 520, baseline: 480 },
    { hour: '04:00', kwh: 390, baseline: 360 },
    { hour: '06:00', kwh: 140, baseline: 130 },
  ];

  const statusPieData = [
    { name: 'Operational', value: operationalCount, color: '#10B981' },
    { name: 'Faulty', value: faultyCount, color: '#EF4444' },
    { name: 'Maintenance', value: maintenanceCount, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-brand-cyan">
              <Building2 className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                City Infrastructure Overview
              </h1>
              <span className="text-xs text-brand-cyan font-mono font-semibold">
                Municipal Corporation Smart City Command & Operations Center
              </span>
            </div>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Monitor the health and performance of connected city infrastructure in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/government/analytics')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-brand-navy-card border border-slate-300 dark:border-brand-navy-border text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-brand-cyan/50 transition-colors"
          >
            <BarChart3 className="h-3.5 w-3.5 text-brand-cyan" />
            <span>Full Analytics</span>
          </button>
          <button
            onClick={() => navigate('/government/reports')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-navy-deep font-bold text-xs shadow-glow-cyan-sm hover:shadow-glow-cyan transition-all"
          >
            <span>Export City Audit</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 8 Primary Government Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5">
        <StatCard
          title="Total Poles"
          value={totalStreetlights}
          subtitle="Monitored"
          icon={Lightbulb}
          accentColor="cyan"
          onClick={() => navigate('/government/streetlights')}
        />
        <StatCard
          title="Operational"
          value={operationalCount}
          subtitle="94% Online"
          icon={CheckCircle2}
          accentColor="emerald"
          trend={{ value: '+2 repaired', isPositive: true }}
        />
        <StatCard
          title="Faulty"
          value={faultyCount}
          subtitle="Attention"
          icon={AlertTriangle}
          accentColor="rose"
          trend={faultyCount > 0 ? { value: `${faultyCount} critical`, isPositive: false } : undefined}
        />
        <StatCard
          title="Maintenance"
          value={maintenanceCount}
          subtitle="In Progress"
          icon={Wrench}
          accentColor="amber"
        />
        <StatCard
          title="Open Complaints"
          value={openComplaintsCount}
          subtitle="Pending"
          icon={Clock}
          accentColor="purple"
          onClick={() => navigate('/government/complaints')}
        />
        <StatCard
          title="Resolved"
          value={resolvedComplaintsCount}
          subtitle="Completed"
          icon={ShieldCheck}
          accentColor="emerald"
        />
        <StatCard
          title="Field Officers"
          value={activeEmployeesCount}
          subtitle="On Duty"
          icon={Users}
          accentColor="blue"
          onClick={() => navigate('/government/employees')}
        />
        <StatCard
          title="Daily Energy"
          value={`${totalEnergyConsumption}`}
          subtitle="kWh Draw"
          icon={Zap}
          accentColor="cyan"
        />
      </div>

      {/* City-Wide Interactive Geospatial Map (Section 36) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Metropolitan Infrastructure Map & Ward Boundaries</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-brand-cyan border border-cyan-500/30">
                MULTI-WARD
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live visualization of 32+ smart poles, active field officers, surveillance cameras, and high-priority alarms.
            </p>
          </div>

          <button
            onClick={() => navigate('/government/map')}
            className="text-xs text-brand-cyan hover:underline font-semibold"
          >
            Launch Full Screen Map
          </button>
        </div>

        <div className="h-[420px] w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-brand-navy-border shadow-2xl relative">
          <MapView
            streetlights={streetlights}
            cameras={cameras}
            center={[12.9785, 77.5992]}
            zoom={13}
            onSelectStreetlight={sl => setSelectedStreetlight(sl)}
            onSelectCamera={cam => setSelectedCamera(cam)}
            onOpenCamera={sl => {
              const matchedCam = cameras.find(c => c.streetlightId === sl.id) || null;
              setSelectedCamera(matchedCam);
            }}
          />
        </div>
      </div>

      {/* Analytical Charts Grid: Energy Consumption & Ward Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 24h Energy & Adaptive Dimming Efficiency (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="h-4 w-4 text-brand-cyan" />
                <span>City-Wide Power Draw vs. Adaptive Dimming Baseline</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Peak load occurs at 00:00 (710 kWh). Dynamic dimming curve saved 18.4% energy.
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              -142 kWh Saved
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyTrendData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="govEnergy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E294B" />
                <XAxis dataKey="hour" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B132B',
                    borderColor: '#1E294B',
                    borderRadius: '12px',
                    fontSize: '11px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="kwh"
                  name="Actual Draw (kWh)"
                  stroke="#00F0FF"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#govEnergy)"
                />
                <Area
                  type="monotone"
                  dataKey="baseline"
                  name="Unoptimized Baseline"
                  stroke="#64748B"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Ward-Level Operational Status Breakdown (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-emerald-400" />
                <span>Ward Streetlight Status Distribution</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Operational vs. Faulty poles per metropolitan ward.
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wardChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E294B" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={10} />
                <YAxis stroke="#64748B" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B132B',
                    borderColor: '#1E294B',
                    borderRadius: '12px',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="operational" name="Operational Poles" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="faulty" name="Faulty Poles" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Lumi AI Predictive Insights (Section 43) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-cyan" />
              <span>LumiNexus AI Insights & Predictive Warnings</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Machine learning anomaly detection across electrical grid telemetry and citizen report density.
            </p>
          </div>

          <button
            onClick={() => navigate('/government/ai')}
            className="text-xs text-brand-cyan hover:underline font-semibold"
          >
            View all insights ({aiInsights.length})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiInsights.slice(0, 3).map(ins => (
            <div
              key={ins.id}
              className="p-5 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-2.5 hover:border-cyan-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-brand-cyan border border-cyan-500/20">
                  {ins.category}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{ins.timestamp}</span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{ins.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {ins.description}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-brand-cyan">
                <strong>Recommendation:</strong> {ins.recommendation}
              </div>
            </div>
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
      />

      <CameraModal
        camera={selectedCamera}
        streetlight={selectedStreetlight}
        onClose={() => setSelectedCamera(null)}
      />
    </div>
  );
};

export default GovernmentDashboard;

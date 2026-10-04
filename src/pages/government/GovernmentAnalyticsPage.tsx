import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Activity,
  Zap,
  CheckCircle2,
  Clock,
  Calendar,
  Download,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useLumi } from '../../context/LumiContext';

export const GovernmentAnalyticsPage: React.FC = () => {
  const { streetlights, complaints, wardAreas } = useLumi();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Chart 1: Energy & Carbon Offset Trend (Monthly)
  const energyData = [
    { day: 'Mon', standardKWh: 820, optimizedKWh: 670, savedKWh: 150 },
    { day: 'Tue', standardKWh: 810, optimizedKWh: 650, savedKWh: 160 },
    { day: 'Wed', standardKWh: 840, optimizedKWh: 680, savedKWh: 160 },
    { day: 'Thu', standardKWh: 830, optimizedKWh: 660, savedKWh: 170 },
    { day: 'Fri', standardKWh: 860, optimizedKWh: 710, savedKWh: 150 },
    { day: 'Sat', standardKWh: 890, optimizedKWh: 740, savedKWh: 150 },
    { day: 'Sun', standardKWh: 850, optimizedKWh: 690, savedKWh: 160 },
  ];

  // Chart 2: Complaints vs Completed Repairs Over Time
  const ticketTrendData = [
    { week: 'Wk 36', filed: 18, resolved: 16 },
    { week: 'Wk 37', filed: 24, resolved: 22 },
    { week: 'Wk 38', filed: 19, resolved: 21 },
    { week: 'Wk 39', filed: 32, resolved: 29 },
    { week: 'Wk 40', filed: 15, resolved: 18 },
  ];

  // Chart 3: Health Score Distribution
  const healthDistribution = [
    { range: '90-100% (Optimal)', count: streetlights.filter(s => s.healthScore >= 90).length, fill: '#10B981' },
    { range: '75-89% (Good)', count: streetlights.filter(s => s.healthScore >= 75 && s.healthScore < 90).length, fill: '#00F0FF' },
    { range: '50-74% (Fair)', count: streetlights.filter(s => s.healthScore >= 50 && s.healthScore < 75).length, fill: '#F59E0B' },
    { range: '<50% (Critical)', count: streetlights.filter(s => s.healthScore < 50).length, fill: '#EF4444' },
  ];

  // Chart 4: Defect Frequency by Category
  const categoryFrequency = [
    { category: 'Blackout', count: 12 },
    { category: 'Flickering', count: 8 },
    { category: 'Dim Luminaire', count: 6 },
    { category: 'Wiring Exposure', count: 4 },
    { category: 'Pole Deflection', count: 3 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-brand-cyan">
              <BarChart3 className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              City Infrastructure & Energy Analytics
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Multi-dimensional telemetry analytics, SLA resolution efficiency, and municipal power optimization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['7d', '30d', '90d'].map(t => (
            <button
              key={t}
              onClick={() => setTimeRange(t as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all ${
                timeRange === t
                  ? 'bg-brand-cyan text-brand-navy-deep font-bold shadow-glow-cyan-sm'
                  : 'bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border text-slate-400 hover:text-white'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Interactive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Energy Optimization (Adaptive Dimming Impact) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="h-4 w-4 text-brand-cyan" />
                <span>Municipal Grid Power Consumption vs. Adaptive Dimming</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                1,100 kWh saved this week across smart poles.
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="anEnergy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E294B" />
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} />
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
                  dataKey="standardKWh"
                  name="Unoptimized Baseline (kWh)"
                  stroke="#64748B"
                  strokeDasharray="4 4"
                  fill="transparent"
                />
                <Area
                  type="monotone"
                  dataKey="optimizedKWh"
                  name="Optimized Draw (kWh)"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#anEnergy)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Complaints Filed vs. Completed Repairs */}
        <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Weekly Work Order Resolution Velocity</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tracking ticket turnaround SLA across EB maintenance teams.
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ticketTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E294B" />
                <XAxis dataKey="week" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B132B',
                    borderColor: '#1E294B',
                    borderRadius: '12px',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="filed" name="New Complaints" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" name="Repaired & Verified" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Streetlight Health Distribution */}
        <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-brand-cyan" />
              <span>Network Streetlight Health Score Distribution</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aggregated across all 32 connected smart pole sensors.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={healthDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E294B" />
                <XAxis dataKey="range" stroke="#64748B" fontSize={10} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B132B',
                    borderColor: '#1E294B',
                    borderRadius: '12px',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="count" name="Poles" radius={[6, 6, 0, 0]}>
                  {healthDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Defect Frequency by Category */}
        <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-amber-400" />
              <span>Fault Root Cause Categorization</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Breakdown of physical and electrical failure modes.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={categoryFrequency}
                margin={{ top: 10, right: 20, left: 40, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1E294B" />
                <XAxis type="number" stroke="#64748B" fontSize={11} />
                <YAxis type="category" dataKey="category" stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B132B',
                    borderColor: '#1E294B',
                    borderRadius: '12px',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="count" name="Incident Count" fill="#00F0FF" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentAnalyticsPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Lightbulb,
  Zap,
  ShieldCheck,
  Video,
  MapPin,
  Sparkles,
  ArrowRight,
  Activity,
  Users,
  Building2,
  CheckCircle2,
  Cpu,
  BarChart3,
  ChevronRight,
  Layers,
  Radio,
  Clock,
  Compass,
} from 'lucide-react';
import Logo from '../../components/Logo/Logo';
import { useLumi } from '../../context/LumiContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAs } = useLumi();
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  const workflowSteps = [
    {
      role: 'Citizen',
      title: 'Infrastructure Interaction & Reporting',
      desc: 'Citizen encounters faulty streetlight SL-204, captures image via LumiNexus mobile scanner or voice assistant.',
      icon: Users,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
    {
      role: 'Lumi AI',
      title: 'Real-Time Telemetry & Computer Vision',
      desc: 'AI detects driver board burnout at 94% confidence, assesses hazard risk, and automatically classifies priority as High.',
      icon: Sparkles,
      color: 'text-brand-cyan border-brand-cyan/30 bg-brand-cyan/10',
    },
    {
      role: 'Autonomous System',
      title: 'Geofenced Dispatch & Priority Queuing',
      desc: 'Work order CMP-20481 created instantly, matched against Ward 12 inventory, and routed to the nearest line officer.',
      icon: Cpu,
      color: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    },
    {
      role: 'Field Employee (EB)',
      title: 'Mobile Work Order & Repair Execution',
      desc: 'EB-1042 accepts ticket, views live pole telemetry, logs parts replaced (SSR 30A), and submits before/after photos.',
      icon: Activity,
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    },
    {
      role: 'Restored Grid',
      title: 'Instant Operational Feedback',
      desc: 'Streetlight health updates from 42% to 98%, status flips Red to Green on map, and citizen receives instant notification.',
      icon: CheckCircle2,
      color: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
    },
    {
      role: 'Government Command',
      title: 'City-Wide Surveillance & SLA Oversight',
      desc: 'Municipal officers monitor ward-level energy optimization, contractor turnaround time, and camera feeds.',
      icon: Building2,
      color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-brand-navy-deep text-slate-100 selection:bg-brand-cyan/30 selection:text-brand-cyan font-sans overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />
      <div className="fixed top-1/3 right-10 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[160px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-brand-navy-border/80 bg-brand-navy-deep/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
          <Logo size="md" showSubtitle={true} clickable={true} />

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-brand-cyan transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-brand-cyan transition-colors">
              How It Works
            </a>
            <a href="#infrastructure" className="hover:text-brand-cyan transition-colors">
              Smart Infrastructure
            </a>
            <a href="#ecosystem" className="hover:text-brand-cyan transition-colors">
              Civic Ecosystem
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-navy-deep font-bold text-xs shadow-glow-cyan-sm hover:shadow-glow-cyan transition-all"
            >
              <span>Explore Platform</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-brand-cyan text-xs font-mono"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span>Next-Gen Smart City Infrastructure OS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
            >
              Intelligent Infrastructure for{' '}
              <span className="bg-gradient-to-r from-brand-cyan via-brand-blue-light to-brand-aqua bg-clip-text text-transparent">
                Smarter Cities
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl"
            >
              "Connecting People. Powering Cities. Improving Lives."
              <br />
              <span className="text-sm text-slate-400 mt-2 block">
                Connecting citizens, field EB electrical employees, and municipal government through
                intelligent streetlight management, camera surveillance, and AI-driven predictive insights.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => {
                  loginAs('CITIZEN');
                  navigate('/citizen/dashboard');
                }}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-aqua text-brand-navy-deep font-bold text-sm shadow-glow-cyan hover:shadow-cyan-300/60 transition-all flex items-center gap-2 group"
              >
                <span>Launch Citizen Portal</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => {
                  loginAs('GOVERNMENT');
                  navigate('/government/dashboard');
                }}
                className="px-6 py-3.5 rounded-2xl bg-slate-900 border border-brand-cyan/30 text-white font-semibold text-sm hover:bg-slate-800/80 transition-all flex items-center gap-2"
              >
                <Building2 className="h-4 w-4 text-brand-cyan" />
                <span>Command Center Demo</span>
              </button>
            </motion.div>

            {/* Quick Metrics Ticker */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800 font-mono text-left">
              <div>
                <span className="text-2xl font-bold text-brand-cyan">3,480+</span>
                <p className="text-xs text-slate-400 font-sans">Smart Poles Active</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-emerald-400">99.4%</span>
                <p className="text-xs text-slate-400 font-sans">Grid Uptime SLA</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-brand-blue-light">&lt; 3.2h</span>
                <p className="text-xs text-slate-400 font-sans">Avg Fix Turnaround</p>
              </div>
            </div>
          </div>

          {/* Right Hero Smart City Animated Visualization */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto aspect-square max-w-[520px] rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-brand-navy-card/90 to-brand-navy-surface/90 p-4 shadow-2xl backdrop-blur-2xl overflow-hidden">
              {/* Animated Cyber Grid Canvas SVG */}
              <svg className="w-full h-full" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* City Perspective Grid Lines */}
                <path d="M50 450 L250 180 L450 450" stroke="#1E294B" strokeWidth="2" />
                <path d="M120 450 L250 180 L380 450" stroke="#0891B2" strokeWidth="1.5" strokeOpacity="0.4" />
                <path d="M190 450 L250 180 L310 450" stroke="#00F0FF" strokeWidth="1.5" strokeOpacity="0.6" />
                <path d="M0 380 L500 380" stroke="#1E294B" strokeWidth="1" />
                <path d="M0 320 L500 320" stroke="#1E294B" strokeWidth="1" />
                <path d="M0 260 L500 260" stroke="#1E294B" strokeWidth="1" />

                {/* Digital City Skylines Silhouette in background */}
                <rect x="60" y="140" width="35" height="120" rx="3" fill="#0B132B" stroke="#1E294B" strokeWidth="1.5" />
                <rect x="105" y="100" width="45" height="160" rx="3" fill="#0E1A38" stroke="#1E294B" strokeWidth="1.5" />
                <rect x="160" y="160" width="30" height="100" rx="3" fill="#0B132B" stroke="#1E294B" strokeWidth="1.5" />
                <rect x="290" y="120" width="40" height="140" rx="3" fill="#0E1A38" stroke="#1E294B" strokeWidth="1.5" />
                <rect x="340" y="90" width="50" height="170" rx="3" fill="#0B132B" stroke="#1E294B" strokeWidth="1.5" />
                <rect x="400" y="150" width="40" height="110" rx="3" fill="#0E1A38" stroke="#1E294B" strokeWidth="1.5" />

                {/* Connected Streetlight Nodes & Cones of Light */}
                {/* Node 1 - Green (Operational) */}
                <line x1="140" y1="330" x2="140" y2="280" stroke="#00F0FF" strokeWidth="3" />
                <circle cx="140" cy="280" r="7" fill="#00F0FF" />
                <polygon points="120,380 160,380 140,280" fill="url(#cyanBeam)" opacity="0.35" />

                {/* Node 2 - Red (Faulty) */}
                <line x1="220" y1="360" x2="220" y2="300" stroke="#EF4444" strokeWidth="3" />
                <circle cx="220" cy="300" r="7" fill="#EF4444" />
                <circle cx="220" cy="300" r="14" stroke="#EF4444" strokeWidth="1.5" opacity="0.6" className="animate-ping" />

                {/* Node 3 - Cyan (Repaired) */}
                <line x1="320" y1="350" x2="320" y2="290" stroke="#10B981" strokeWidth="3" />
                <circle cx="320" cy="290" r="7" fill="#10B981" />
                <polygon points="300,410 340,410 320,290" fill="url(#greenBeam)" opacity="0.35" />

                {/* Node 4 - Amber (Maintenance) */}
                <line x1="390" y1="320" x2="390" y2="270" stroke="#F59E0B" strokeWidth="3" />
                <circle cx="390" cy="270" r="6" fill="#F59E0B" />

                {/* Inter-Node Mesh Data Circuit Connections */}
                <path d="M140 280 Q 180 260, 220 300 T 320 290 T 390 270" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />

                {/* Central AI City Core Satellite Radar */}
                <circle cx="250" cy="80" r="30" stroke="#00F0FF" strokeWidth="1.5" strokeOpacity="0.4" />
                <circle cx="250" cy="80" r="15" fill="#00F0FF" fillOpacity="0.2" stroke="#00F0FF" />
                <line x1="250" y1="80" x2="140" y2="280" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.3" />
                <line x1="250" y1="80" x2="220" y2="300" stroke="#EF4444" strokeWidth="1" strokeOpacity="0.4" />
                <line x1="250" y1="80" x2="320" y2="290" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" />

                <defs>
                  <linearGradient id="cyanBeam" x1="140" y1="280" x2="140" y2="380" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00F0FF" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#00F0FF" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="greenBeam" x1="320" y1="290" x2="320" y2="410" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#10B981" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#10B981" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating Overlay Cards on top of Smart City Canvas */}
              <div className="absolute top-6 left-6 p-3 rounded-2xl bg-brand-navy-deep/90 border border-brand-cyan/40 backdrop-blur-md text-xs shadow-xl space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-brand-cyan" />
                  <span className="font-mono font-bold text-white">Lumi AI Telemetry</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  SL-204: Blackout Detected (94% Conf)
                </p>
              </div>

              <div className="absolute bottom-6 right-6 p-3 rounded-2xl bg-brand-navy-deep/90 border border-emerald-500/40 backdrop-blur-md text-xs shadow-xl space-y-1 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="font-mono font-bold text-emerald-400">EB-1042 Dispatched</span>
                  <Activity className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <p className="text-[11px] text-slate-300">
                  Ward 12 • Arrival in 8 mins
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Pillars Section */}
      <section id="features" className="py-20 bg-brand-navy/60 border-t border-brand-navy-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-brand-cyan text-xs font-mono font-semibold">
            <span>Ecosystem Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Built as One Connected Smart-City Ecosystem
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            LumiNexus is not just a complaint board. It unifies municipal electricity, automated telemetry, computer vision surveillance, and civic engagement into a cohesive platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 text-left">
            {/* Pillar 1 */}
            <div className="p-6 rounded-3xl bg-brand-navy-card border border-brand-navy-border hover:border-cyan-500/50 hover:shadow-glow-cyan-sm transition-all duration-300 space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-brand-cyan">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Smart Streetlight Management</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Monitor streetlight operational health, power state, dynamic lux dimming, operating temperature, and individual ballast longevity in real time.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-3xl bg-brand-navy-card border border-brand-navy-border hover:border-blue-500/50 hover:shadow-glow-blue transition-all duration-300 space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Civic Complaint Management</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empower citizens with mobile camera capture, voice reporting, transparent status timelines, and instant notification upon repair completion.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-3xl bg-brand-navy-card border border-brand-navy-border hover:border-emerald-500/50 hover:shadow-glow-green transition-all duration-300 space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">AI-Powered Intelligence</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Lumi AI processes visual defects, suggests triage priority, identifies repeat fault clusters across wards, and forecasts electrical breakdown risks.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-3xl bg-brand-navy-card border border-brand-navy-border hover:border-purple-500/50 hover:shadow-purple-500/20 transition-all duration-300 space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Video className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Camera & Sensor Monitoring</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Inspect pole surroundings through simulated live camera streams with AI computer vision bounding boxes, pedestrian activity indices, and structural tilt flags.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="p-6 rounded-3xl bg-brand-navy-card border border-brand-navy-border hover:border-teal-500/50 hover:shadow-teal-500/20 transition-all duration-300 space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Geospatial City Maps</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Visualize multi-layered ward boundaries, operational green pins, faulty red alerts, active maintenance orders, and real-time field linesman locations.
              </p>
            </div>

            {/* Pillar 6 */}
            <div className="p-6 rounded-3xl bg-brand-navy-card border border-brand-navy-border hover:border-amber-500/50 hover:shadow-amber-500/20 transition-all duration-300 space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Energy & Sustainability Analytics</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Optimize municipal power grids with traffic-adaptive dimming algorithms, track kWh savings, and curb carbon emissions with audit-ready ESG reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Workflow Section */}
      <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-brand-cyan text-xs font-mono font-semibold">
            <span>Seamless Lifecycle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            How The LumiNexus Lifecycle Operates
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            From fault detection to linesman repair and government sign-off, every action flows seamlessly across stakeholders.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveWorkflowStep(idx)}
                className={`p-6 rounded-3xl border transition-all duration-300 relative ${
                  activeWorkflowStep === idx
                    ? 'bg-slate-900 border-cyan-500/60 shadow-glow-cyan-sm scale-[1.02]'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-slate-500">STEP 0{idx + 1}</span>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${step.color}`}>
                    {step.role}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-brand-cyan">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{step.title}</h4>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Role Demonstration Portal Switcher */}
      <section id="infrastructure" className="py-20 bg-brand-navy-surface/50 border-t border-brand-navy-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-3xl font-extrabold text-white">
            Access The Three Connected Command Portals
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Experience the platform from each persona's viewpoint. Any updates made in one portal automatically synchronize across the entire ecosystem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left">
            {/* Citizen Card */}
            <div className="p-6 rounded-3xl bg-brand-navy-card border border-brand-navy-border hover:border-emerald-500/50 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <Users className="h-7 w-7 text-emerald-400" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  CITIZEN
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">Citizen Portal</h3>
              <p className="text-xs text-slate-400">
                Check local streetlight status, report dark spots, use AI camera diagnosis, and track maintenance progress.
              </p>
              <button
                onClick={() => {
                  loginAs('CITIZEN');
                  navigate('/citizen/dashboard');
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Enter as Citizen</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Field Employee Card */}
            <div className="p-6 rounded-3xl bg-brand-navy-card border border-brand-navy-border hover:border-amber-500/50 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <Activity className="h-7 w-7 text-amber-400" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  FIELD OPERATIONS
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">EB Field Operations</h3>
              <p className="text-xs text-slate-400">
                Receive geofenced work orders, review electrical specs, inspect live cameras, and log repair completions with photo proofs.
              </p>
              <button
                onClick={() => {
                  loginAs('FIELD_EMPLOYEE');
                  navigate('/employee/dashboard');
                }}
                className="w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Enter as EB Linesman</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Government Card */}
            <div className="p-6 rounded-3xl bg-brand-navy-card border border-brand-navy-border hover:border-cyan-500/50 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <Building2 className="h-7 w-7 text-brand-cyan" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-brand-cyan">
                  MUNICIPAL COMMAND
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">Government Admin</h3>
              <p className="text-xs text-slate-400">
                City-wide streetlight registry, ward heatmaps, camera monitoring wall, energy consumption curves, and AI predictive audits.
              </p>
              <button
                onClick={() => {
                  loginAs('GOVERNMENT');
                  navigate('/government/dashboard');
                }}
                className="w-full py-2.5 rounded-xl bg-brand-cyan/20 hover:bg-brand-cyan/30 border border-brand-cyan/40 text-brand-cyan font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Enter as Commissioner</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-navy-border/80 bg-brand-navy-deep py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Logo size="sm" clickable={false} />
            <div className="text-left text-xs text-slate-400">
              <p className="font-semibold text-white">LumiNexus Civic Technologies</p>
              <p className="text-[11px] text-slate-500">
                AI-Powered Smart Street Light & Civic Infrastructure Management System
              </p>
            </div>
          </div>

          <div className="text-center md:text-right text-xs text-slate-500 font-mono">
            <span>"Connecting People. Powering Cities. Improving Lives."</span>
            <div className="mt-1 text-slate-400">Designed for Future Smart Cities • v2.4</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

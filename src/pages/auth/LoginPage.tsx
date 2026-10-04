import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Wrench,
  Building2,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import Logo from '../../components/Logo/Logo';
import { useLumi } from '../../context/LumiContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAs } = useLumi();

  const [selectedRole, setSelectedRole] = useState<UserRole>('CITIZEN');
  const [identifier, setIdentifier] = useState('aditya.sharma@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      id: 'CITIZEN' as UserRole,
      title: 'Citizen',
      desc: 'Monitor and report infrastructure around you.',
      icon: Users,
      defaultEmail: 'aditya.sharma@example.com',
      badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    },
    {
      id: 'FIELD_EMPLOYEE' as UserRole,
      title: 'Field Employee',
      desc: 'Manage assigned infrastructure and maintenance.',
      icon: Wrench,
      defaultEmail: 'EB-1042 (Rajesh Kumar)',
      badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    },
    {
      id: 'GOVERNMENT' as UserRole,
      title: 'Government',
      desc: 'Monitor city-wide infrastructure.',
      icon: Building2,
      defaultEmail: 'commissioner@smartcity.gov.in',
      badgeColor: 'border-cyan-500/40 text-brand-cyan bg-cyan-500/10',
    },
  ];

  const handleSelectRole = (r: UserRole) => {
    setSelectedRole(r);
    const target = roles.find(item => item.id === r);
    if (target) setIdentifier(target.defaultEmail);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      loginAs(selectedRole);
      setIsLoading(false);
      if (selectedRole === 'CITIZEN') navigate('/citizen/dashboard');
      else if (selectedRole === 'FIELD_EMPLOYEE') navigate('/employee/dashboard');
      else if (selectedRole === 'GOVERNMENT') navigate('/government/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen flex bg-brand-navy-deep text-slate-100 font-sans">
      {/* LEFT: Official Logo & Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 lg:p-16 border-r border-brand-navy-border/80 bg-brand-navy-card/90 backdrop-blur-xl z-10">
        <div>
          <Logo size="md" showSubtitle={true} clickable={true} />

          <div className="mt-10 sm:mt-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Sign In to LumiNexus
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select your role persona and log in to the connected smart infrastructure grid.
            </p>
          </div>

          {/* Role Persona Selector Chips */}
          <div className="mt-6 grid grid-cols-3 gap-2.5">
            {roles.map(r => {
              const Icon = r.icon;
              const isSelected = selectedRole === r.id;
              return (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => handleSelectRole(r.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-brand-cyan bg-cyan-500/10 shadow-glow-cyan-sm'
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Icon className={`h-4 w-4 ${isSelected ? 'text-brand-cyan' : 'text-slate-400'}`} />
                    {isSelected && (
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-glow-cyan-sm" />
                    )}
                  </div>
                  <div
                    className={`text-xs font-bold leading-tight ${
                      isSelected ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {r.title}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{r.desc}</div>
                </button>
              );
            })}
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                {selectedRole === 'FIELD_EMPLOYEE' ? 'Employee ID / Email' : 'Email Address / Civic ID'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/90 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/90 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-brand-cyan focus:ring-0"
                />
                <span>Remember this terminal</span>
              </label>
              <a href="#forgot" className="text-brand-cyan hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-aqua text-brand-navy-deep font-bold text-sm shadow-glow-cyan hover:shadow-cyan-400/60 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-brand-navy-deep border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In as {selectedRole.replace('_', ' ')}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          Official Infrastructure Access Portal • Municipal Corporation Grid v2.4
        </div>
      </div>

      {/* RIGHT: Animated Smart-City Visualization Panel */}
      <div className="hidden lg:flex w-1/2 relative bg-brand-navy-deep flex-col justify-center items-center p-12 overflow-hidden">
        {/* Glow particles and circuit graphics */}
        <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 h-80 w-80 rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-lg space-y-6 text-center">
          <div className="mx-auto h-16 w-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-brand-cyan shadow-glow-cyan-sm animate-pulse-slow">
            <Zap className="h-8 w-8" />
          </div>

          <h3 className="text-3xl font-extrabold text-white">
            "Connecting People. Powering Cities. Improving Lives."
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            Real-time synchronization across 32+ smart poles, high-priority emergency alerts, AI visual diagnostics, and municipal line operations.
          </p>

          {/* Dynamic Telemetry Box */}
          <div className="p-4 rounded-2xl bg-brand-navy-surface/80 border border-cyan-500/30 backdrop-blur-md text-left font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5">
              <span className="flex items-center gap-1.5 text-brand-cyan">
                <Sparkles className="h-3.5 w-3.5" />
                Live Infrastructure Status
              </span>
              <span className="text-emerald-400">● 99.4% Grid Online</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
              <div>Streetlights Monitored: <strong className="text-white">32 Units</strong></div>
              <div>Active Work Orders: <strong className="text-amber-400">3 Priority</strong></div>
              <div>Adaptive Dimming: <strong className="text-emerald-400">Active (Phase 2)</strong></div>
              <div>AI Diagnostic Confidence: <strong className="text-brand-cyan">94.2%</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

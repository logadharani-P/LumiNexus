import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Sparkles,
  MapPin,
  Shield,
  UserCheck,
  ChevronDown,
  Layers,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import { UserRole } from '../../types';
import NotificationPanel from '../NotificationPanel/NotificationPanel';
import AIChatModal from '../AIChat/AIChatModal';

interface TopbarProps {
  onToggleSidebar?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  const {
    role,
    currentUser,
    loginAs,
    theme,
    toggleTheme,
    notifications,
    streetlights,
    complaints,
    employees,
    wardAreas,
  } = useLumi();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle clicking outside search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global search filtering
  const matchingStreetlights = searchQuery.trim()
    ? streetlights.filter(
        sl =>
          sl.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sl.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sl.area.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const matchingComplaints = searchQuery.trim()
    ? complaints.filter(
        c =>
          c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.streetlightId.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const matchingEmployees = searchQuery.trim()
    ? employees.filter(
        emp =>
          emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.area.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 2)
    : [];

  const handleRoleChange = (newRole: UserRole) => {
    loginAs(newRole);
    setIsRoleDropdownOpen(false);
    if (newRole === 'CITIZEN') navigate('/citizen/dashboard');
    else if (newRole === 'FIELD_EMPLOYEE') navigate('/employee/dashboard');
    else if (newRole === 'GOVERNMENT') navigate('/government/dashboard');
  };

  const getRoleBadge = () => {
    if (role === 'CITIZEN') {
      return {
        label: 'Citizen Portal',
        color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      };
    }
    if (role === 'FIELD_EMPLOYEE') {
      return {
        label: 'EB Field Operations',
        color: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      };
    }
    return {
      label: 'Gov Command Admin',
      color: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30 shadow-glow-cyan-sm',
    };
  };

  const roleBadge = getRoleBadge();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 dark:border-brand-navy-border bg-white/90 dark:bg-brand-navy/90 px-4 sm:px-6 backdrop-blur-xl">
      {/* Search Bar with Global Lookup */}
      <div ref={searchRef} className="relative w-72 sm:w-96">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            placeholder="Search Streetlight ID, Complaint, Employee, Ward..."
            className="w-full rounded-xl border border-slate-200 dark:border-brand-navy-border bg-slate-50 dark:bg-brand-navy-card/90 py-1.5 pl-10 pr-4 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all"
          />
        </div>

        {/* Global Search Results Dropdown */}
        {showSearchResults && searchQuery.trim() && (
          <div className="absolute left-0 mt-2 w-full max-h-96 overflow-y-auto rounded-2xl border border-slate-700 bg-slate-950 p-2 shadow-2xl z-50 text-xs text-slate-200">
            {matchingStreetlights.length === 0 &&
            matchingComplaints.length === 0 &&
            matchingEmployees.length === 0 ? (
              <div className="p-3 text-center text-slate-500">
                No matching infrastructure found for "{searchQuery}"
              </div>
            ) : (
              <div className="space-y-2">
                {matchingStreetlights.length > 0 && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider px-2">
                      Streetlights
                    </span>
                    {matchingStreetlights.map(sl => (
                      <div
                        key={sl.id}
                        onClick={() => {
                          setShowSearchResults(false);
                          setSearchQuery('');
                          navigate(`/${role.toLowerCase()}/streetlights`);
                        }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-900 cursor-pointer"
                      >
                        <div>
                          <strong className="font-mono text-brand-cyan">{sl.id}</strong>{' '}
                          <span className="text-slate-400">({sl.area})</span>
                          <p className="text-[11px] text-slate-400">{sl.location}</p>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400">
                          {sl.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {matchingComplaints.length > 0 && (
                  <div className="border-t border-slate-800 pt-1.5">
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider px-2">
                      Complaints
                    </span>
                    {matchingComplaints.map(c => (
                      <div
                        key={c.id}
                        onClick={() => {
                          setShowSearchResults(false);
                          setSearchQuery('');
                          navigate(`/${role.toLowerCase()}/complaints`);
                        }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-900 cursor-pointer"
                      >
                        <div>
                          <strong className="font-mono text-amber-300">{c.id}</strong> —{' '}
                          {c.category}
                          <p className="text-[11px] text-slate-400">{c.location}</p>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {c.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {matchingEmployees.length > 0 && (
                  <div className="border-t border-slate-800 pt-1.5">
                    <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider px-2">
                      Field Officers
                    </span>
                    {matchingEmployees.map(emp => (
                      <div
                        key={emp.id}
                        onClick={() => {
                          setShowSearchResults(false);
                          setSearchQuery('');
                          navigate('/government/employees');
                        }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-900 cursor-pointer"
                      >
                        <div>
                          <strong className="text-white">{emp.name}</strong> ({emp.id})
                          <p className="text-[11px] text-slate-400">{emp.area}</p>
                        </div>
                        <span className="text-[10px] text-emerald-400">{emp.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Demo Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${roleBadge.color}`}
          >
            <span>{roleBadge.label}</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-70" />
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-700 bg-slate-950 p-2 shadow-2xl z-50 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-2 block mb-1">
                Switch Role Persona
              </span>
              {[
                {
                  id: 'CITIZEN',
                  name: 'Citizen Portal',
                  desc: 'File complaints & view local streetlights',
                },
                {
                  id: 'FIELD_EMPLOYEE',
                  name: 'Field Operations (EB)',
                  desc: 'Work orders, repairs & pole maintenance',
                },
                {
                  id: 'GOVERNMENT',
                  name: 'Government Admin',
                  desc: 'City-wide analytics, cameras & dispatch',
                },
              ].map(r => (
                <button
                  key={r.id}
                  onClick={() => handleRoleChange(r.id as UserRole)}
                  className={`w-full text-left p-2 rounded-xl transition-all ${
                    role === r.id
                      ? 'bg-brand-cyan/20 text-brand-cyan font-bold'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-[10px] text-slate-400">{r.desc}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Location pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border text-xs text-slate-700 dark:text-slate-300 font-mono">
          <MapPin className="h-3.5 w-3.5 text-brand-cyan" />
          <span>Ward 12 (Tech Corridor)</span>
        </div>

        {/* Lumi AI quick launch */}
        <button
          onClick={() => setIsAIOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-brand-cyan/10 hover:bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan text-xs font-semibold transition-all shadow-glow-cyan-sm"
          title="Open Lumi AI Assistant"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Lumi AI</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setIsNotifOpen(true)}
          className="relative p-2 rounded-xl border border-slate-200 dark:border-brand-navy-border text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-glow-red">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-slate-200 dark:border-brand-navy-border text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Light/Dark Theme"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
        </button>

        {/* User Profile Avatar Link */}
        <button
          onClick={() => navigate(`/${role.toLowerCase()}/profile`)}
          className="flex items-center gap-2 pl-1 group"
        >
          <img
            src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
            alt={currentUser.name}
            className="h-8 w-8 rounded-full object-cover border border-brand-cyan/40 group-hover:ring-2 group-hover:ring-brand-cyan transition-all"
          />
        </button>
      </div>

      {/* Panels */}
      <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      <AIChatModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </header>
  );
};

export default Topbar;

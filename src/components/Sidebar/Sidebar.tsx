import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Lightbulb,
  AlertCircle,
  FilePlus,
  ClipboardList,
  Map,
  Video,
  Wrench,
  Users,
  Building2,
  BarChart3,
  Sparkles,
  FileText,
  Bell,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HelpCircle,
} from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import Logo from '../Logo/Logo';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const { role, logout } = useLumi();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Navigation Links Definition by Role
  const citizenLinks = [
    { to: '/citizen/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/citizen/streetlights', label: 'Streetlights', icon: Lightbulb },
    { to: '/citizen/complaints/new', label: 'File Complaint', icon: FilePlus },
    { to: '/citizen/complaints', label: 'My Complaints', icon: ClipboardList },
    { to: '/citizen/map', label: 'Civic Map', icon: Map },
    { to: '/citizen/ai', label: 'Lumi AI', icon: Sparkles },
    { to: '/citizen/profile', label: 'My Profile', icon: User },
    { to: '/citizen/settings', label: 'Settings', icon: Settings },
  ];

  const employeeLinks = [
    { to: '/employee/dashboard', label: 'Field Dashboard', icon: LayoutDashboard },
    { to: '/employee/complaints', label: 'Assigned Work Orders', icon: AlertCircle },
    { to: '/employee/streetlights', label: 'Streetlights Grid', icon: Lightbulb },
    { to: '/employee/maintenance', label: 'Maintenance Log', icon: Wrench },
    { to: '/employee/map', label: 'Operations Map', icon: Map },
    { to: '/employee/cameras', label: 'Infrastructure Cameras', icon: Video },
    { to: '/employee/ai', label: 'Lumi AI Operations', icon: Sparkles },
    { to: '/employee/profile', label: 'Line Officer Profile', icon: User },
    { to: '/employee/settings', label: 'Settings', icon: Settings },
  ];

  const governmentLinks = [
    { to: '/government/dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
    { to: '/government/streetlights', label: 'Streetlight Registry', icon: Lightbulb },
    { to: '/government/complaints', label: 'Civic Complaints', icon: AlertCircle },
    { to: '/government/employees', label: 'Field Workforce', icon: Users },
    { to: '/government/areas', label: 'Wards & Areas', icon: Building2 },
    { to: '/government/map', label: 'City-Wide Map', icon: Map },
    { to: '/government/cameras', label: 'Surveillance Cams', icon: Video },
    { to: '/government/analytics', label: 'Energy & Grid Analytics', icon: BarChart3 },
    { to: '/government/ai', label: 'AI Predictive Insights', icon: Sparkles },
    { to: '/government/reports', label: 'Audits & Reports', icon: FileText },
    { to: '/government/settings', label: 'System Settings', icon: Settings },
    { to: '/government/profile', label: 'Command Profile', icon: User },
  ];

  const links =
    role === 'FIELD_EMPLOYEE'
      ? employeeLinks
      : role === 'GOVERNMENT'
      ? governmentLinks
      : citizenLinks;

  return (
    <aside
      className={`relative flex flex-col border-r border-slate-200/80 dark:border-brand-navy-border bg-white dark:bg-brand-navy-card/95 transition-all duration-300 z-40 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header with Official Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200/80 dark:border-brand-navy-border">
        {collapsed ? (
          <div className="mx-auto">
            <Logo size="xs" clickable={false} />
          </div>
        ) : (
          <Logo size="sm" showSubtitle={false} clickable={true} />
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Role Indicator Banner */}
      {!collapsed && (
        <div className="px-4 py-2 bg-slate-50 dark:bg-brand-navy-surface/40 border-b border-slate-100 dark:border-brand-navy-border/40">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400">
            Active Workspace
          </span>
          <p className="text-xs font-bold text-brand-cyan tracking-wide">
            {role === 'CITIZEN'
              ? 'Citizen Civic Hub'
              : role === 'FIELD_EMPLOYEE'
              ? 'EB Field Operations'
              : 'Municipal Government Command'}
          </p>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {links.map(link => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 shadow-glow-cyan-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                } ${collapsed ? 'justify-center' : ''}`
              }
              title={collapsed ? link.label : undefined}
            >
              <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
              {!collapsed && <span className="truncate">{link.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Info & Logout */}
      <div className="p-3 border-t border-slate-200/80 dark:border-brand-navy-border space-y-1">
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className={`flex items-center gap-3 w-full px-3 py-2 text-xs font-semibold rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Logout / Switch Role"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Switch / Sign Out</span>}
        </button>

        {!collapsed && (
          <div className="pt-2 px-2 text-[10px] text-slate-500 font-mono flex items-center justify-between">
            <span>LumiNexus OS</span>
            <span className="text-brand-cyan">v2.4 LTS</span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

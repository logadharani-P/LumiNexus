import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';
import AIChatWidget from '../components/AIChat/AIChatWidget';
import { useLumi } from '../context/LumiContext';
import { LayoutDashboard, Lightbulb, AlertCircle, Map, Sparkles } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const { role } = useLumi();
  const location = useLocation();

  const rolePrefix = role.toLowerCase().replace('_', '');
  const isPathActive = (path: string) => location.pathname.includes(path);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-brand-navy-deep font-sans text-slate-900 dark:text-slate-100">
      {/* Desktop / Tablet Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-grid-cyber pb-20 md:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Floating Lumi AI button */}
      <AIChatWidget />

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-brand-navy-card/95 border-t border-slate-200 dark:border-brand-navy-border flex items-center justify-around py-2.5 px-2 backdrop-blur-lg">
        <Link
          to={`/${role === 'FIELD_EMPLOYEE' ? 'employee' : role.toLowerCase()}/dashboard`}
          className={`flex flex-col items-center gap-1 text-[10px] ${
            isPathActive('dashboard') ? 'text-brand-cyan font-bold' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>Overview</span>
        </Link>

        <Link
          to={`/${role === 'FIELD_EMPLOYEE' ? 'employee' : role.toLowerCase()}/streetlights`}
          className={`flex flex-col items-center gap-1 text-[10px] ${
            isPathActive('streetlights') ? 'text-brand-cyan font-bold' : 'text-slate-400'
          }`}
        >
          <Lightbulb className="h-4 w-4" />
          <span>Lights</span>
        </Link>

        <Link
          to={`/${role === 'FIELD_EMPLOYEE' ? 'employee' : role.toLowerCase()}/complaints`}
          className={`flex flex-col items-center gap-1 text-[10px] ${
            isPathActive('complaints') ? 'text-brand-cyan font-bold' : 'text-slate-400'
          }`}
        >
          <AlertCircle className="h-4 w-4" />
          <span>{role === 'FIELD_EMPLOYEE' ? 'Orders' : 'Complaints'}</span>
        </Link>

        <Link
          to={`/${role === 'FIELD_EMPLOYEE' ? 'employee' : role.toLowerCase()}/map`}
          className={`flex flex-col items-center gap-1 text-[10px] ${
            isPathActive('map') ? 'text-brand-cyan font-bold' : 'text-slate-400'
          }`}
        >
          <Map className="h-4 w-4" />
          <span>Map</span>
        </Link>
      </div>
    </div>
  );
};

export default AppLayout;

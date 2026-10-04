import React, { useState } from 'react';
import { Sun, Moon, Bell, Radio, Wrench, RefreshCw, Check } from 'lucide-react';
import { useLumi } from '../../context/LumiContext';

export const EmployeeSettingsPage: React.FC = () => {
  const { theme, toggleTheme, resetDemoData } = useLumi();
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [geofenceAlerts, setGeofenceAlerts] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Field Operations Terminal Settings
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Configure EB telemetry alerts, night operations dark theme, and dispatch frequency.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Display Mode
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {theme === 'dark' ? <Moon className="h-5 w-5 text-indigo-400" /> : <Sun className="h-5 w-5 text-amber-500" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Night Operations Terminal Theme
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Switch between high-contrast dark operations mode and light mode.
                </p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all font-mono"
            >
              Switch to {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Dispatch & Telemetry Alerts
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-rose-400">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  High-Priority Phase Fault Alarm
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Audible beep when exposed wiring or short circuit trips breaker in Ward 12.
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={emergencyAlerts}
              onChange={e => setEmergencyAlerts(e.target.checked)}
              className="h-5 w-5 rounded border-slate-700 text-amber-500 focus:ring-0"
            />
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 dark:border-brand-navy-border/60 pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-cyan-400">
                <Radio className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Geofence Proximity Auto-Routing
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Suggest closest pending pole repair based on current patrol GPS.
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={geofenceAlerts}
              onChange={e => setGeofenceAlerts(e.target.checked)}
              className="h-5 w-5 rounded border-slate-700 text-amber-500 focus:ring-0"
            />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-rose-500/20 shadow-sm flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Reset Demo Mock Dataset</h4>
            <p className="text-xs text-slate-400">
              Restore default competition scenario data.
            </p>
          </div>
          <button
            onClick={() => {
              resetDemoData();
              alert('LumiNexus demo data reset to default competition state.');
            }}
            className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset Demo State</span>
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          {savedToast && (
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
              <Check className="h-4 w-4" /> Settings Saved!
            </span>
          )}
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-glow-amber hover:opacity-95 transition-all"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSettingsPage;

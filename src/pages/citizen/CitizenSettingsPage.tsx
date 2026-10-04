import React, { useState } from 'react';
import { Sun, Moon, Bell, Shield, MapPin, Camera, RefreshCw, Check } from 'lucide-react';
import { useLumi } from '../../context/LumiContext';

export const CitizenSettingsPage: React.FC = () => {
  const { theme, toggleTheme, resetDemoData } = useLumi();
  const [pushNotifs, setPushNotifs] = useState(true);
  const [locationPerm, setLocationPerm] = useState(true);
  const [cameraPerm, setCameraPerm] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Citizen Portal Settings
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Customize your interface theme, device permissions, and emergency broadcast preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance Section */}
        <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Appearance & Theme
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {theme === 'dark' ? <Moon className="h-5 w-5 text-indigo-400" /> : <Sun className="h-5 w-5 text-amber-500" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {theme === 'dark' ? 'Dark Futuristic Operations Theme' : 'Light Clean Smart-City Theme'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Switch between high-contrast dark navy cyan and sunlight-readable mode.
                </p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-brand-cyan text-brand-navy-deep hover:bg-brand-cyan-light transition-all shadow-glow-cyan-sm"
            >
              Toggle to {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>

        {/* Notifications & Hardware Permissions */}
        <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Permissions & Real-time Alerts
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-cyan">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Push Notifications for Repair Status
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Get notified the instant an EB linesman completes repairs for your reported lights.
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={pushNotifs}
              onChange={e => setPushNotifs(e.target.checked)}
              className="h-5 w-5 rounded border-slate-700 text-brand-cyan focus:ring-0"
            />
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 dark:border-brand-navy-border/60 pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Precise GPS Geolocation
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Automatically pin nearest pole ID when reporting a dark corridor.
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={locationPerm}
              onChange={e => setLocationPerm(e.target.checked)}
              className="h-5 w-5 rounded border-slate-700 text-brand-cyan focus:ring-0"
            />
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 dark:border-brand-navy-border/60 pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-purple-400">
                <Camera className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Camera Defect Inspection
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Allow camera capture for AI visual diagnostics of ballast failures.
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={cameraPerm}
              onChange={e => setCameraPerm(e.target.checked)}
              className="h-5 w-5 rounded border-slate-700 text-brand-cyan focus:ring-0"
            />
          </div>
        </div>

        {/* Competition Demo Reset */}
        <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-rose-500/20 shadow-sm flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Reset Demo Mock Dataset</h4>
            <p className="text-xs text-slate-400">
              Clear local modifications and restore the pristine competition demonstration state.
            </p>
          </div>
          <button
            onClick={() => {
              resetDemoData();
              alert('LumiNexus demo data reset to default competition state.');
            }}
            className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset Demo State</span>
          </button>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {savedToast && (
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
              <Check className="h-4 w-4" /> Preferences Saved!
            </span>
          )}
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-brand-cyan text-brand-navy-deep font-bold text-xs shadow-glow-cyan-sm hover:shadow-cyan-400/50 transition-all"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default CitizenSettingsPage;

import React, { useState } from 'react';
import { Sun, Moon, Bell, Shield, Sliders, RefreshCw, Check } from 'lucide-react';
import { useLumi } from '../../context/LumiContext';

export const GovernmentSettingsPage: React.FC = () => {
  const { theme, toggleTheme, resetDemoData } = useLumi();
  const [adaptiveDimming, setAdaptiveDimming] = useState(true);
  const [anomalyDetection, setAnomalyDetection] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Government Command Settings
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          City-wide AI dimming curves, anomaly sensitivity thresholds, and display mode configurations.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Command Center Display Theme
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {theme === 'dark' ? <Moon className="h-5 w-5 text-indigo-400" /> : <Sun className="h-5 w-5 text-amber-500" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {theme === 'dark' ? 'Deep Navy Cyber Command Center Theme' : 'Light Clean Public Administration Theme'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Optimized for video walls and executive dashboards.
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

        <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Autonomous Grid Algorithms
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-400">
                <Sliders className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Adaptive Traffic-Sensitive Dimming (Phase 2)
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Drop luminaire power to 40% between 02:00-05:00 AM on empty roads. Saves up to 22% kWh.
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={adaptiveDimming}
              onChange={e => setAdaptiveDimming(e.target.checked)}
              className="h-5 w-5 rounded border-slate-700 text-brand-cyan focus:ring-0"
            />
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 dark:border-brand-navy-border/60 pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-cyan">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Continuous Neural Anomaly Scan
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Analyze capacitor heat spikes and stroboscopic optical degradation every 15 minutes.
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={anomalyDetection}
              onChange={e => setAnomalyDetection(e.target.checked)}
              className="h-5 w-5 rounded border-slate-700 text-brand-cyan focus:ring-0"
            />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-rose-500/20 shadow-sm flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Reset Demo Mock Dataset</h4>
            <p className="text-xs text-slate-400">
              Clear modifications and restore default competition dataset.
            </p>
          </div>
          <button
            onClick={() => {
              resetDemoData();
              alert('LumiNexus demo dataset reset.');
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
              <Check className="h-4 w-4" /> Command Settings Applied!
            </span>
          )}
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-brand-cyan text-brand-navy-deep font-bold text-xs shadow-glow-cyan-sm hover:shadow-cyan-400/50 transition-all"
          >
            Apply Grid Parameters
          </button>
        </div>
      </div>
    </div>
  );
};

export default GovernmentSettingsPage;

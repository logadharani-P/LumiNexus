import React, { useState } from 'react';
import { Video, Shield, Eye, Sparkles, Circle, Maximize2 } from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import CameraModal from '../../components/CameraView/CameraModal';
import { Camera } from '../../types';

export const EmployeeCamerasPage: React.FC = () => {
  const { cameras, streetlights } = useLumi();
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Video className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Infrastructure CCTV & AI Camera Monitoring
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time optical inspection of smart streetlight poles, traffic corridors, and physical structural integrity.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border text-xs font-mono">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400">Live Feeds:</span>
          <strong className="text-white">{cameras.length} Active Nodes</strong>
        </div>
      </div>

      {/* Grid of Camera Feeds */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map(cam => (
          <div
            key={cam.id}
            className="group relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 shadow-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/10"
          >
            {/* Camera Header Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Circle className="h-2 w-2 fill-rose-500 text-rose-500 animate-pulse" />
                <span className="font-bold text-white">{cam.id}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                  {cam.streetlightId}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">{cam.lastActive}</span>
            </div>

            {/* Video Viewport */}
            <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={cam.streamUrl}
                alt={cam.location}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
              />

              {/* Viewfinder crosshairs */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-brand-cyan/70 pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-brand-cyan/70 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-brand-cyan/70 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-brand-cyan/70 pointer-events-none" />

              {/* Click to expand overlay */}
              <button
                onClick={() => setSelectedCamera(cam)}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-semibold text-xs backdrop-blur-[2px]"
              >
                <Maximize2 className="h-4 w-4 text-brand-cyan" />
                <span>Open Fullscreen Stream</span>
              </button>
            </div>

            {/* AI Overlay Metadata Bar */}
            <div className="p-4 space-y-2 text-xs">
              <p className="text-slate-300 font-medium line-clamp-1">{cam.location}</p>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Pole Condition:</span>
                  <strong className={cam.aiStatus.poleCondition === 'Normal' ? 'text-emerald-400' : 'text-amber-400'}>
                    {cam.aiStatus.poleCondition}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Activity Level:</span>
                  <span className="text-cyan-300">{cam.aiStatus.activityLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Visibility:</span>
                  <span className="text-slate-300">{cam.aiStatus.visibility}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCamera(cam)}
                className="w-full py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Inspect Live Stream</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <CameraModal
        camera={selectedCamera}
        onClose={() => setSelectedCamera(null)}
      />
    </div>
  );
};

export default EmployeeCamerasPage;

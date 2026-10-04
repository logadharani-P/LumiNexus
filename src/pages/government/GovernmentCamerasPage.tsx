import React, { useState } from 'react';
import { Video, Grid, Circle, Eye, Sparkles, Shield, Maximize2 } from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import CameraModal from '../../components/CameraView/CameraModal';
import { Camera } from '../../types';

export const GovernmentCamerasPage: React.FC = () => {
  const { cameras } = useLumi();
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'wall'>('grid');

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
              Metropolitan CCTV & Surveillance Monitoring
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Smart-pole mounted optical feeds with computer vision bounding boxes and pedestrian flow metrics.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm text-xs">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
              viewMode === 'grid'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Multi-Node Grid
          </button>
          <button
            onClick={() => setViewMode('wall')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
              viewMode === 'wall'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Video Wall (2x3)
          </button>
        </div>
      </div>

      {/* Grid View */}
      <div
        className={`grid gap-6 ${
          viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {cameras.map(cam => (
          <div
            key={cam.id}
            className="group relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 shadow-xl transition-all duration-300 hover:border-purple-500/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Circle className="h-2 w-2 fill-rose-500 text-rose-500 animate-pulse" />
                <span className="font-bold text-white">{cam.id}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                  {cam.streetlightId}
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">1080p @ 30FPS</span>
            </div>

            {/* Video Viewport with AI Scanline */}
            <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={cam.streamUrl}
                alt={cam.location}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-105"
              />

              {/* Viewfinder crosshairs */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-brand-cyan/70 pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-brand-cyan/70 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-brand-cyan/70 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-brand-cyan/70 pointer-events-none" />

              {/* Expand Action */}
              <button
                onClick={() => setSelectedCamera(cam)}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-semibold text-xs backdrop-blur-[2px]"
              >
                <Maximize2 className="h-4 w-4 text-brand-cyan" />
                <span>Launch Interactive HUD</span>
              </button>
            </div>

            {/* Metadata Footer */}
            <div className="p-4 space-y-2 text-xs">
              <p className="text-slate-300 font-medium truncate">{cam.location}</p>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[10px]">Condition</span>
                  <strong className="text-emerald-400">{cam.aiStatus.poleCondition}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Activity</span>
                  <strong className="text-cyan-300">{cam.aiStatus.activityLevel}</strong>
                </div>
              </div>

              <button
                onClick={() => setSelectedCamera(cam)}
                className="w-full py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Open Surveillance Console</span>
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

export default GovernmentCamerasPage;

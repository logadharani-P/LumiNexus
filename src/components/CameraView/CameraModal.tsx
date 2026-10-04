import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Maximize2,
  Minimize2,
  Video,
  RefreshCw,
  Sparkles,
  Shield,
  Activity,
  Eye,
  Camera as CameraIcon,
  Circle,
} from 'lucide-react';
import { Camera, Streetlight } from '../../types';

interface CameraModalProps {
  camera?: Camera | null;
  streetlight?: Streetlight | null;
  onClose: () => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  camera,
  streetlight,
  onClose,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fps, setFps] = useState(30);

  // Live timestamp timer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!camera && !streetlight) return null;

  const camId = camera?.id || (streetlight ? `CAM-${streetlight.id.replace('SL-', '12')}` : 'CAM-1204');
  const slId = streetlight?.id || camera?.streetlightId || 'SL-204';
  const location = streetlight?.location || camera?.location || 'North Cyber Avenue, Ward 12';
  const streamUrl =
    camera?.streamUrl ||
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&auto=format&fit=crop&q=80';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`relative w-full overflow-hidden rounded-3xl border border-cyan-500/30 bg-slate-950 text-slate-100 shadow-2xl transition-all ${
            isFullscreen ? 'max-w-none h-full m-0 rounded-none' : 'max-w-4xl max-h-[92vh]'
          }`}
        >
          {/* Top Camera HUD Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-brand-cyan tracking-wider">
                    {camId}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                    LIVE FEED
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">
                  Mounted on: <strong className="text-slate-200">{slId}</strong> • {location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block font-mono text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                {currentTime}
              </span>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Main Video Stream Frame with AI Telemetry Overlays */}
          <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
            <img
              src={streamUrl}
              alt="Live Camera Infrastructure Stream"
              className="w-full h-full object-cover filter brightness-90 contrast-105"
            />

            {/* Subtle CRT / Security Scanline Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent pointer-events-none" />

            {/* Camera Corner Viewfinder Crosshairs */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-brand-cyan/70 pointer-events-none" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-brand-cyan/70 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-brand-cyan/70 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-brand-cyan/70 pointer-events-none" />

            {/* AI Object Bounding Box Simulator */}
            <div className="absolute top-1/4 left-1/3 w-36 sm:w-48 h-44 sm:h-56 border border-brand-cyan/80 rounded-lg pointer-events-none shadow-glow-cyan-sm">
              <div className="absolute -top-6 left-0 bg-brand-navy-deep/90 border border-brand-cyan text-brand-cyan text-[10px] font-mono px-2 py-0.5 rounded shadow">
                [AI-OBJ] Streetlight Pole: 98.4%
              </div>
            </div>

            {/* Top Left OSD Data */}
            <div className="absolute top-6 left-6 font-mono text-xs text-white/90 drop-shadow-md space-y-1 pointer-events-none bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-white/10">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Circle className="h-2 w-2 fill-emerald-400 animate-pulse" />
                <span>RTSP 1080p @ 30 FPS</span>
              </div>
              <div className="text-[10px] text-slate-300">BITRATE: 4120 Kbps (H.265)</div>
              <div className="text-[10px] text-brand-cyan">BANDWIDTH: Ultra-Low Latency (48ms)</div>
            </div>

            {/* Bottom Right AI Telemetry HUD Box */}
            <div className="absolute bottom-6 right-6 max-w-xs rounded-2xl bg-brand-navy-deep/90 backdrop-blur-md border border-brand-cyan/40 p-3.5 shadow-2xl text-xs space-y-2 pointer-events-none">
              <div className="flex items-center justify-between border-b border-brand-cyan/20 pb-1.5">
                <span className="font-bold uppercase tracking-wider text-brand-cyan flex items-center gap-1.5 text-[11px]">
                  <Sparkles className="h-3.5 w-3.5 text-brand-cyan" />
                  AI Monitoring Engine
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded">
                  Active
                </span>
              </div>

              <div className="space-y-1 font-mono text-[11px] text-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-400">Streetlight Target:</span>
                  <strong className="text-emerald-400">Detected (Optimal)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pole Condition:</span>
                  <strong className="text-white">Normal (Vertical 0.2°)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pedestrian Activity:</span>
                  <strong className="text-cyan-300">Moderate</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Atmospheric Visibility:</span>
                  <strong className="text-emerald-400">Good (98%)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stream Controls & Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-900 border-t border-slate-800">
            <div className="text-xs text-slate-400 font-mono">
              Ready for RTSP / WebRTC Stream Endpoint: <span className="text-brand-cyan">rtsp://grid.luminexus.city:554/live/{camId}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFps(prev => (prev === 30 ? 60 : 30))}
                className="px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              >
                {fps} FPS
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-brand-cyan text-slate-950 hover:bg-brand-cyan-light transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CameraModal;

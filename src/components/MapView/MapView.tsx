import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Streetlight, Camera, StreetlightStatus } from '../../types';
import StatusBadge from '../StatusBadge/StatusBadge';
import { Video, AlertTriangle, ArrowRight, Eye, Layers, Filter } from 'lucide-react';

interface MapViewProps {
  streetlights: Streetlight[];
  cameras?: Camera[];
  center?: [number, number];
  zoom?: number;
  onSelectStreetlight?: (streetlight: Streetlight) => void;
  onSelectCamera?: (camera: Camera) => void;
  onReportIssue?: (streetlight: Streetlight) => void;
  onOpenCamera?: (streetlight: Streetlight) => void;
  filterStatus?: string;
  showFiltersBar?: boolean;
  className?: string;
}

// Controller component to smoothly fly/pan map when selected streetlight or center changes
const MapRecenter: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

// Create custom glowing HTML DivIcons
const createMarkerIcon = (status: StreetlightStatus | 'CAMERA') => {
  let color = '#10B981'; // green
  let glowColor = 'rgba(16, 185, 129, 0.6)';
  let pulse = false;
  let iconContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m16 6-4-4-4 4"/><path d="M16 18a4 4 0 0 0-8 0"/>
    </svg>
  `;

  if (status === 'FAULTY') {
    color = '#EF4444'; // red
    glowColor = 'rgba(239, 68, 68, 0.7)';
    pulse = true;
  } else if (status === 'MAINTENANCE') {
    color = '#F59E0B'; // yellow/amber
    glowColor = 'rgba(245, 158, 11, 0.7)';
    pulse = true;
  } else if (status === 'RECENTLY_REPAIRED') {
    color = '#00F0FF'; // cyan/blue
    glowColor = 'rgba(0, 240, 255, 0.7)';
  } else if (status === 'CAMERA') {
    color = '#A855F7'; // purple
    glowColor = 'rgba(168, 85, 247, 0.7)';
    iconContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
      </svg>
    `;
  }

  const html = `
    <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
      ${
        pulse
          ? `<div style="position: absolute; inset: -4px; border-radius: 9999px; background: ${glowColor}; opacity: 0.7; animation: radar-pulse 2s infinite;"></div>`
          : ''
      }
      <div style="
        width: 32px; 
        height: 32px; 
        border-radius: 50%; 
        background: #0B132B; 
        border: 2px solid ${color}; 
        color: ${color}; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        box-shadow: 0 0 16px ${glowColor};
        cursor: pointer;
        transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      ">
        ${iconContent}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-map-pin',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
  });
};

export const MapView: React.FC<MapViewProps> = ({
  streetlights,
  cameras = [],
  center = [12.9785, 77.5992],
  zoom = 14,
  onSelectStreetlight,
  onSelectCamera,
  onReportIssue,
  onOpenCamera,
  filterStatus = 'ALL',
  showFiltersBar = true,
  className = '',
}) => {
  const [activeFilter, setActiveFilter] = useState<string>(filterStatus);
  const [showCameras, setShowCameras] = useState<boolean>(true);

  // Filter streetlights based on selection
  const filteredStreetlights = streetlights.filter(sl => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'FAULTY') return sl.status === 'FAULTY';
    if (activeFilter === 'OPERATIONAL') return sl.status === 'OPERATIONAL';
    if (activeFilter === 'MAINTENANCE') return sl.status === 'MAINTENANCE';
    if (activeFilter === 'RECENTLY_REPAIRED') return sl.status === 'RECENTLY_REPAIRED';
    return true;
  });

  return (
    <div className={`relative flex flex-col w-full h-full min-h-[450px] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-brand-navy-border shadow-lg ${className}`}>
      {/* Interactive Controls Overlay */}
      {showFiltersBar && (
        <div className="absolute top-4 left-4 right-4 z-[400] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          {/* Status Filter Chips */}
          <div className="pointer-events-auto flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 shadow-xl text-xs">
            <span className="px-2 text-slate-400 font-semibold flex items-center gap-1">
              <Filter className="h-3 w-3 text-brand-cyan" />
              <span>Filter:</span>
            </span>
            {[
              { id: 'ALL', label: 'All Streetlights' },
              { id: 'FAULTY', label: 'Faulty (Red)' },
              { id: 'OPERATIONAL', label: 'Operational (Green)' },
              { id: 'MAINTENANCE', label: 'Maintenance (Yellow)' },
              { id: 'RECENTLY_REPAIRED', label: 'Repaired (Blue)' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  activeFilter === f.id
                    ? 'bg-brand-cyan text-brand-navy-deep font-bold shadow-glow-cyan-sm'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Toggle Cameras Button */}
          <div className="pointer-events-auto flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 shadow-xl text-xs">
            <button
              onClick={() => setShowCameras(!showCameras)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                showCameras
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="h-3.5 w-3.5" />
              <span>Cameras ({cameras.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-[400] hidden sm:flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-slate-300 shadow-xl">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span>Operational</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
          <span>Faulty</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span>Maintenance</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
          <span>Repaired</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-purple-400" />
          <span>Camera</span>
        </div>
      </div>

      {/* Map container */}
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <MapRecenter center={center} zoom={zoom} />

        {/* High contrast dark/futuristic carto tiles */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Streetlight Markers */}
        {filteredStreetlights.map(sl => (
          <Marker
            key={sl.id}
            position={[sl.latitude, sl.longitude]}
            icon={createMarkerIcon(sl.status)}
            eventHandlers={{
              click: () => {
                if (onSelectStreetlight) onSelectStreetlight(sl);
              },
            }}
          >
            <Popup className="custom-leaflet-popup">
              <div className="p-1 space-y-2 min-w-[210px] text-slate-100">
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-1.5">
                  <span className="font-mono font-bold text-brand-cyan text-sm">
                    {sl.id}
                  </span>
                  <StatusBadge status={sl.status} size="sm" />
                </div>

                <p className="text-xs text-slate-300 font-sans">{sl.location}</p>

                <div className="grid grid-cols-2 gap-1 text-[11px] font-mono bg-slate-900/60 p-1.5 rounded border border-slate-800">
                  <div>
                    <span className="text-slate-400">Health:</span>{' '}
                    <strong className="text-emerald-400">{sl.healthScore}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Power:</span>{' '}
                    <strong className="text-cyan-300">{sl.brightness}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Energy:</span>{' '}
                    <span>{sl.energyConsumption} kWh</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Ward:</span>{' '}
                    <span>{sl.area}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pt-1">
                  {onSelectStreetlight && (
                    <button
                      onClick={() => onSelectStreetlight(sl)}
                      className="flex-1 py-1 px-2 text-xs font-semibold rounded bg-brand-cyan text-slate-950 hover:bg-brand-cyan-light transition-colors text-center"
                    >
                      View Details
                    </button>
                  )}

                  {sl.cameraId && onOpenCamera && (
                    <button
                      onClick={() => onOpenCamera(sl)}
                      className="py-1 px-2 text-xs rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                      title="Open Camera"
                    >
                      Camera
                    </button>
                  )}

                  {sl.status === 'FAULTY' && onReportIssue && (
                    <button
                      onClick={() => onReportIssue(sl)}
                      className="py-1 px-2 text-xs rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors"
                      title="Report Issue"
                    >
                      Report
                    </button>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Camera Markers */}
        {showCameras &&
          cameras.map(cam => (
            <Marker
              key={cam.id}
              position={[cam.latitude, cam.longitude]}
              icon={createMarkerIcon('CAMERA')}
              eventHandlers={{
                click: () => {
                  if (onSelectCamera) onSelectCamera(cam);
                },
              }}
            >
              <Popup>
                <div className="p-1 space-y-2 min-w-[210px] text-slate-100">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-1.5">
                    <span className="font-mono font-bold text-purple-400 text-sm">
                      {cam.id}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      LIVE
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-sans">{cam.location}</p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Mounted on: <strong>{cam.streetlightId}</strong>
                  </p>

                  {onSelectCamera && (
                    <button
                      onClick={() => onSelectCamera(cam)}
                      className="w-full mt-1 py-1 px-2 text-xs font-semibold rounded bg-purple-600 text-white hover:bg-purple-500 transition-colors text-center"
                    >
                      View Live Stream
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default MapView;

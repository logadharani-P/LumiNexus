import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map as MapIcon, Layers, Video } from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import MapView from '../../components/MapView/MapView';
import StreetlightDetailsModal from '../../components/StreetlightDetails/StreetlightDetailsModal';
import CameraModal from '../../components/CameraView/CameraModal';
import { Streetlight, Camera } from '../../types';

export const CitizenMapPage: React.FC = () => {
  const navigate = useNavigate();
  const { streetlights, cameras } = useLumi();

  const [selectedStreetlight, setSelectedStreetlight] = useState<Streetlight | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  return (
    <div className="h-[calc(100vh-130px)] flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-brand-cyan">
            <MapIcon className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Civic Infrastructure Geospatial Map
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive map pins: Green (Optimal), Red (Fault), Yellow (Under Repair), Blue (Restored), Purple (Cameras).
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-brand-navy-border shadow-2xl relative">
        <MapView
          streetlights={streetlights}
          cameras={cameras}
          center={[12.9785, 77.5992]}
          zoom={14}
          onSelectStreetlight={sl => setSelectedStreetlight(sl)}
          onSelectCamera={cam => setSelectedCamera(cam)}
          onReportIssue={sl => navigate(`/citizen/complaints/new?streetlight=${sl.id}`)}
          onOpenCamera={sl => {
            const matchedCam = cameras.find(c => c.streetlightId === sl.id) || null;
            setSelectedCamera(matchedCam);
          }}
        />
      </div>

      <StreetlightDetailsModal
        streetlight={selectedStreetlight}
        onClose={() => setSelectedStreetlight(null)}
        onOpenCamera={sl => {
          setSelectedStreetlight(null);
          const matchedCam = cameras.find(c => c.streetlightId === sl.id) || null;
          setSelectedCamera(matchedCam);
        }}
        onReportIssue={sl => {
          setSelectedStreetlight(null);
          navigate(`/citizen/complaints/new?streetlight=${sl.id}`);
        }}
      />

      <CameraModal
        camera={selectedCamera}
        streetlight={selectedStreetlight}
        onClose={() => setSelectedCamera(null)}
      />
    </div>
  );
};

export default CitizenMapPage;

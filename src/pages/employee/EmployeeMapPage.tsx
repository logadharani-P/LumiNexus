import React, { useState } from 'react';
import { MapPin, Wrench } from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import MapView from '../../components/MapView/MapView';
import StreetlightDetailsModal from '../../components/StreetlightDetails/StreetlightDetailsModal';
import CameraModal from '../../components/CameraView/CameraModal';
import RepairCompletionModal from '../../components/RepairModal/RepairCompletionModal';
import { Streetlight, Camera, Complaint } from '../../types';

export const EmployeeMapPage: React.FC = () => {
  const { streetlights, cameras, complaints } = useLumi();

  const [selectedStreetlight, setSelectedStreetlight] = useState<Streetlight | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  return (
    <div className="h-[calc(100vh-130px)] flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Wrench className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Field Operations Dispatch Map
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Assigned pole routes, live fault alarms, and surveillance node markers.
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
      />

      <CameraModal
        camera={selectedCamera}
        streetlight={selectedStreetlight}
        onClose={() => setSelectedCamera(null)}
      />

      <RepairCompletionModal
        complaint={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
      />
    </div>
  );
};

export default EmployeeMapPage;

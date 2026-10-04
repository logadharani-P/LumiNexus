import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FilePlus,
  Camera as CameraIcon,
  Mic,
  UploadCloud,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  RefreshCw,
  X,
  Zap,
} from 'lucide-react';
import { useLumi } from '../../context/LumiContext';
import { ComplaintCategory, ComplaintPriority } from '../../types';

export const CitizenFileComplaintPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedLight = searchParams.get('streetlight') || '';

  const { streetlights, currentUser, addComplaint } = useLumi();

  const [selectedLightId, setSelectedLightId] = useState(preselectedLight || 'SL-204');
  const [category, setCategory] = useState<ComplaintCategory>('Streetlight not working');
  const [description, setDescription] = useState(
    'Streetlight has been off completely for several nights. Dark street creates pedestrian safety hazard.'
  );
  const [locationStr, setLocationStr] = useState('North Cyber Avenue, Crossroad 4, Ward 12');
  const [capturedImage, setCapturedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=800&auto=format&fit=crop&q=80'
  );
  const [isCapturing, setIsCapturing] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill location when streetlight is selected
  useEffect(() => {
    const sl = streetlights.find(item => item.id === selectedLightId);
    if (sl) {
      setLocationStr(`${sl.location}, ${sl.area}`);
    }
  }, [selectedLightId, streetlights]);

  // AI Diagnostic Analysis state (simulated)
  const [aiAnalysis, setAiAnalysis] = useState({
    detectedIssue: 'Streetlight blackout & high-voltage ballast driver circuitry failure',
    confidence: 94,
    suggestedPriority: 'HIGH' as ComplaintPriority,
    electricalHazardRisk: 'Low' as const,
    recommendedAction: 'Inspect 450V capacitor ballast and reset branch breaker.',
  });

  const handleSimulateCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setCapturedImage(
        'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80'
      );
      setIsCapturing(false);
      setAiAnalysis({
        detectedIssue: 'High-frequency stroboscopic flicker & diode array degradation',
        confidence: 96,
        suggestedPriority: 'HIGH',
        electricalHazardRisk: 'Low',
        recommendedAction: 'Replace PWM pulse controller & verify ground earthing resistance.',
      });
    }, 800);
  };

  const handleVoiceInput = () => {
    setIsVoiceRecording(true);
    setTimeout(() => {
      setIsVoiceRecording(false);
      setDescription(
        'Streetlight has severe flickering and electrical buzzing noise. Pedestrians cannot navigate the crossing safely.'
      );
      setCategory('Flickering');
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      addComplaint({
        citizen: {
          name: currentUser.name,
          phone: currentUser.phone,
          email: currentUser.email,
        },
        streetlightId: selectedLightId,
        location: locationStr,
        latitude: 12.9785,
        longitude: 77.5992,
        category,
        description,
        image: capturedImage || undefined,
        priority: aiAnalysis.suggestedPriority,
        status: 'FILED',
        assignedEmployee: 'EB-1042',
        aiAnalysis: {
          ...aiAnalysis,
          timestamp: 'Just now',
        },
      });

      setIsSubmitting(false);
      navigate('/citizen/complaints');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-brand-cyan">
            <FilePlus className="h-5 w-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            File a Civic Infrastructure Complaint
          </h1>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Report faulty streetlights, exposed wiring, or physical damage. Lumi AI automatically classifies severity for prompt dispatch.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Form Details */}
          <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-5">
            {/* Streetlight Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Select Streetlight Pole
              </label>
              <select
                value={selectedLightId}
                onChange={e => setSelectedLightId(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-2.5 px-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-mono focus:border-brand-cyan focus:outline-none"
              >
                {streetlights.map(sl => (
                  <option key={sl.id} value={sl.id}>
                    {sl.id} — {sl.location} ({sl.status})
                  </option>
                ))}
              </select>
            </div>

            {/* Location (Auto Filled) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Location & Ward
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-brand-cyan" />
                <input
                  type="text"
                  value={locationStr}
                  onChange={e => setLocationStr(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-2.5 pl-10 pr-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:border-brand-cyan focus:outline-none"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Defect Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ComplaintCategory)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-2.5 px-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:border-brand-cyan focus:outline-none"
              >
                <option value="Streetlight not working">Streetlight not working (Blackout)</option>
                <option value="Flickering">Flickering / Strobe Effect</option>
                <option value="Dim light">Dim light / Poor Illumination</option>
                <option value="Damaged pole">Damaged pole / Structural Tilt</option>
                <option value="Wiring issue">Wiring issue / Exposed Cables</option>
                <option value="Other civic issue">Other civic infrastructure issue</option>
              </select>
            </div>

            {/* Description & Voice Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Description
                </label>
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`text-xs flex items-center gap-1 font-semibold px-2 py-0.5 rounded-lg border transition-colors ${
                    isVoiceRecording
                      ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                      : 'text-brand-cyan border-brand-cyan/30 hover:bg-brand-cyan/10'
                  }`}
                >
                  <Mic className="h-3 w-3" />
                  <span>{isVoiceRecording ? 'Listening...' : 'Voice Dictate'}</span>
                </button>
              </div>
              <textarea
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                placeholder="Describe the issue, hazards, or pedestrian impact..."
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:border-brand-cyan focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Right Column: Camera Capture & AI Analysis */}
          <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-5">
            <div>
              <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Infrastructure Photo & Computer Vision
              </span>

              {/* Photo Preview / Capture Frame */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center">
                {capturedImage ? (
                  <>
                    <img
                      src={capturedImage}
                      alt="Captured evidence"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setCapturedImage(null)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-slate-950/80 border border-brand-cyan/40 px-2 py-0.5 rounded text-[10px] font-mono text-brand-cyan">
                      Ready for AI Diagnosis
                    </div>
                  </>
                ) : (
                  <div className="p-6 text-center space-y-3">
                    <CameraIcon className="h-10 w-10 text-slate-400 mx-auto" />
                    <p className="text-xs text-slate-400">
                      Capture with device camera or upload image for instant AI diagnosis.
                    </p>
                  </div>
                )}
              </div>

              {/* Camera Actions */}
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSimulateCapture}
                  disabled={isCapturing}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-700 transition-colors"
                >
                  <CameraIcon className="h-3.5 w-3.5" />
                  <span>{isCapturing ? 'Capturing...' : 'Capture / Retake Photo'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSimulateCapture}
                  className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-700 transition-colors"
                >
                  <UploadCloud className="h-3.5 w-3.5" />
                  <span>Upload</span>
                </button>
              </div>
            </div>

            {/* AI Diagnostics Box */}
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs space-y-2.5">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                <span className="font-bold text-white flex items-center gap-1.5 text-xs">
                  <Sparkles className="h-4 w-4 text-brand-cyan" />
                  Lumi AI Automated Analysis
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan font-bold">
                  {aiAnalysis.confidence}% Match
                </span>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-300">
                <div>
                  <span className="text-slate-400">Detected Issue: </span>
                  <strong className="text-white">{aiAnalysis.detectedIssue}</strong>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-slate-400">Suggested Priority: </span>
                    <strong className="text-rose-400 font-bold">{aiAnalysis.suggestedPriority}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Hazard Risk: </span>
                    <strong className="text-amber-400">{aiAnalysis.electricalHazardRisk}</strong>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400">Recommended Dispatch: </span>
                  <span className="text-cyan-300">{aiAnalysis.recommendedAction}</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 italic">
                * Simulated frontend AI classification.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-brand-navy-border">
          <button
            type="button"
            onClick={() => navigate('/citizen/dashboard')}
            className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-aqua text-brand-navy-deep font-bold text-xs shadow-glow-cyan hover:shadow-cyan-400/50 transition-all flex items-center gap-2"
          >
            {isSubmitting ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Submit Complaint to EB Dispatch</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CitizenFileComplaintPage;

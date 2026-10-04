import React, { useState } from 'react';
import { FileText, Download, Printer, CheckCircle2, RefreshCw, Eye } from 'lucide-react';
import { useLumi } from '../../context/LumiContext';

export const GovernmentReportsPage: React.FC = () => {
  const { streetlights, complaints, wardAreas, employees } = useLumi();
  const [generatingReportId, setGeneratingReportId] = useState<string | null>(null);

  const reports = [
    {
      id: 'REP-01',
      title: 'City-Wide Streetlight Operational Census',
      desc: 'Complete asset audit of all 32 smart poles, condition statuses, ballast longevity, and manufacturer warranties.',
      generatedDate: '2026-10-04 06:00',
      fileSize: '2.4 MB (PDF/CSV)',
      type: 'Asset Health',
    },
    {
      id: 'REP-02',
      title: 'Civic Complaint & SLA Compliance Audit',
      desc: 'Turnaround duration analysis, public defect density per ward, and linesman dispatch response metrics.',
      generatedDate: '2026-10-03 23:59',
      fileSize: '1.8 MB (PDF)',
      type: 'Civic Service',
    },
    {
      id: 'REP-03',
      title: 'Field Electrical Maintenance & Parts Ledger',
      desc: 'Itemized consumption of solid-state relays, capacitors, MOV surge arresters, and linesman labor hours.',
      generatedDate: '2026-10-02 18:00',
      fileSize: '3.1 MB (PDF/XLSX)',
      type: 'Maintenance',
    },
    {
      id: 'REP-04',
      title: 'Municipal Energy & Carbon Abatement Audit',
      desc: 'ESG compliance documentation calculating kWh saved via adaptive dimming curves and avoided carbon emissions.',
      generatedDate: '2026-10-01 00:00',
      fileSize: '4.2 MB (PDF)',
      type: 'Sustainability',
    },
    {
      id: 'REP-05',
      title: 'EB Line Officer Performance & First-Time-Fix Report',
      desc: 'Workload distribution across wards, resolution speeds, and linesman badge certification records.',
      generatedDate: '2026-09-30 20:00',
      fileSize: '1.4 MB (PDF)',
      type: 'Human Resources',
    },
    {
      id: 'REP-06',
      title: 'Ward-Level Infrastructure Equity & Dark Spot Assessment',
      desc: 'Geospatial illumination coverage report highlighting under-lit corridors and recommended new mast installations.',
      generatedDate: '2026-09-28 12:00',
      fileSize: '5.6 MB (GeoJSON/PDF)',
      type: 'Urban Planning',
    },
  ];

  const handleGenerate = (id: string) => {
    setGeneratingReportId(id);
    setTimeout(() => {
      setGeneratingReportId(null);
      alert('Report generated successfully with latest real-time telemetry!');
    }, 1000);
  };

  const handleExport = (title: string) => {
    alert(`Downloading "${title}" audit bundle...`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-brand-cyan">
              <FileText className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Municipal Infrastructure Audits & Reports
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Generate, view, and export certified smart city infrastructure and energy compliance documents.
          </p>
        </div>

        <button
          onClick={() => alert('Batch generating all 6 monthly executive audit dossiers...')}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-cyan text-brand-navy-deep font-bold text-xs shadow-glow-cyan-sm hover:shadow-glow-cyan transition-all"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Batch Generate Audits</span>
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reports.map(rep => (
          <div
            key={rep.id}
            className="p-6 rounded-3xl bg-white dark:bg-brand-navy-card border border-slate-200 dark:border-brand-navy-border shadow-sm space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-brand-cyan">{rep.id}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400">
                  {rep.type}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">{rep.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {rep.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Last compiled: {rep.generatedDate}</span>
                <span>{rep.fileSize}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Opening preview of ${rep.title}...`)}
                  className="flex-1 py-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>View</span>
                </button>

                <button
                  onClick={() => handleGenerate(rep.id)}
                  disabled={generatingReportId === rep.id}
                  className="flex-1 py-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  {generatingReportId === rep.id ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <>
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Re-Generate</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleExport(rep.title)}
                  className="py-1.5 px-3 rounded-xl bg-brand-cyan/20 hover:bg-brand-cyan/30 text-brand-cyan text-xs font-semibold flex items-center gap-1.5 transition-colors border border-brand-cyan/30"
                  title="Export"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovernmentReportsPage;

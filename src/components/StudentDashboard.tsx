import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Calendar, 
  Upload, 
  Download, 
  ChevronRight, 
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Building,
  GraduationCap
} from 'lucide-react';
import { Application, DocumentItem, Appointment, ApplicationStage } from '../types';

interface StudentDashboardProps {
  applications: Application[];
  documents: DocumentItem[];
  appointments: Appointment[];
  onOpenBooking: () => void;
  onOpenEligibility: () => void;
  onUploadDocument: (type: string, file: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  applications,
  documents,
  appointments,
  onOpenBooking,
  onOpenEligibility,
  onUploadDocument
}) => {
  const [selectedApp, setSelectedApp] = useState<Application>(applications[0] || null);
  const [uploadingType, setUploadingType] = useState<string | null>(null);

  const STAGES: { key: ApplicationStage; label: string }[] = [
    { key: 'profile', label: 'Profile' },
    { key: 'counselling', label: 'Counselling' },
    { key: 'selected', label: 'University Selected' },
    { key: 'documents', label: 'Documents' },
    { key: 'submitted', label: 'Applied' },
    { key: 'offer', label: 'Offer Issued' },
    { key: 'deposit', label: 'Deposit Paid' },
    { key: 'visa', label: 'Visa Filed' },
    { key: 'approved', label: 'Visa Approved' },
    { key: 'predeparture', label: 'Pre-Departure' },
    { key: 'arrived', label: 'Enrolled & Arrived' }
  ];

  const getStageIndex = (stage: ApplicationStage) => {
    return STAGES.findIndex((s) => s.key === stage);
  };

  const handleSimulatedUpload = (type: string) => {
    const fakeFileName = `Hamza_Khan_${type.replace(/[^a-zA-Z0-9]/g, '_')}_Verified.pdf`;
    onUploadDocument(type, fakeFileName);
    setUploadingType(null);
  };

  const verifiedDocsCount = documents.filter((d) => d.status === 'Verified').length;
  const missingDocs = documents.filter((d) => d.status === 'Missing');

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Student Profile Card Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 p-1 border border-white/20 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80"
                alt="Hamza Khan"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold font-display">Hamza Khan</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
                  Verified Student (Karachi)
                </span>
              </div>
              <p className="text-xs text-slate-300">
                BS Computer Science (FAST-NUCES Karachi, CGPA 3.71) • Target: UK / Germany (Fall 2026)
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                <span>IELTS: <strong>7.5 Overall</strong></span>
                <span>•</span>
                <span>HEC Attested: <strong>Verified</strong></span>
                <span>•</span>
                <span>Counsellor: <strong>Sir Tariq Mehmood</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenEligibility}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Update AI Profile</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors shadow-sm"
            >
              Book Clifton Session
            </button>
          </div>
        </div>

        {/* Top Progress & Verification Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-semibold">Application Profile Progress</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">86%</div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full w-[86%]"></div>
            </div>
            <div className="text-[11px] text-slate-400 mt-1.5">1 missing document needed</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-semibold">Active Applications</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">{applications.length} Universities</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              1 Conditional Offer Issued
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-semibold">Verified Documents</div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">
              {verifiedDocsCount} / {documents.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-2">
              Passport, HEC Transcript, IELTS valid
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-semibold">Next Scheduled Session</div>
            <div className="text-sm font-bold text-slate-900 mt-1 truncate">
              {appointments[0]?.counsellorName || 'Sir Tariq Mehmood'}
            </div>
            <div className="text-[11px] text-amber-600 font-semibold mt-2 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {appointments[0]?.date} at {appointments[0]?.time}
            </div>
          </div>
        </div>

        {/* Active Application Journey & Visual Tracker */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                11-Stage Application & Visa Lifecycle Tracker
              </h2>
              <p className="text-xs text-slate-500">
                End-to-end milestone audit monitored by EduVanta Karachi admissions desk.
              </p>
            </div>

            {/* University Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Tracking:</span>
              <select
                value={selectedApp?.id}
                onChange={(e) => {
                  const app = applications.find((a) => a.id === e.target.value);
                  if (app) setSelectedApp(app);
                }}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {applications.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.universityName} ({app.status})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedApp && (
            <div className="space-y-6">
              {/* Active Application Details Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    {selectedApp.intake} Intake
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {selectedApp.universityName} — {selectedApp.courseTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Assigned Specialist: <strong>{selectedApp.counsellorName}</strong> | Applied: {selectedApp.appliedDate}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                    Stage: {selectedApp.status}
                  </span>
                  {selectedApp.casOrI20Number && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold">
                      {selectedApp.casOrI20Number}
                    </span>
                  )}
                </div>
              </div>

              {/* 11-Stage Horizontal Stepper */}
              <div className="overflow-x-auto py-2">
                <div className="flex items-center min-w-[850px] justify-between relative">
                  {/* Connecting Line */}
                  <div className="absolute left-4 right-4 top-4 h-0.5 bg-slate-200 -z-0"></div>
                  <div
                    className="absolute left-4 top-4 h-0.5 bg-emerald-500 transition-all duration-500 -z-0"
                    style={{
                      width: `${(getStageIndex(selectedApp.stage) / (STAGES.length - 1)) * 95}%`
                    }}
                  ></div>

                  {STAGES.map((s, idx) => {
                    const currentIndex = getStageIndex(selectedApp.stage);
                    const isCompleted = idx < currentIndex;
                    const isCurrent = idx === currentIndex;

                    return (
                      <div key={s.key} className="flex flex-col items-center relative z-10 w-20">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : isCurrent
                              ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
                              : 'bg-white border-2 border-slate-300 text-slate-400'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span
                          className={`text-[10px] text-center mt-2 font-medium leading-tight ${
                            isCurrent
                              ? 'text-blue-700 font-bold'
                              : isCompleted
                              ? 'text-slate-700 font-semibold'
                              : 'text-slate-400'
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Application Case Notes */}
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs space-y-2">
                <div className="font-bold text-blue-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Official Case Officer Notes:
                </div>
                <ul className="space-y-1 text-blue-900">
                  {selectedApp.notes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Document Vault Section */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Pakistani Student Document Vault
              </h2>
              <p className="text-xs text-slate-500">
                Securely encrypted storage for HEC attestations, IELTS TRF, passport, and 28-day bank statements.
              </p>
            </div>

            <div className="text-xs font-semibold text-slate-600">
              {verifiedDocsCount} Verified • {missingDocs.length} Missing
            </div>
          </div>

          {/* Missing Document Alert if any */}
          {missingDocs.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Action Required:</strong> You have {missingDocs.length} required document pending: <strong>{missingDocs.map((d) => d.type).join(', ')}</strong>.
                </span>
              </div>
              <button
                onClick={() => setUploadingType(missingDocs[0].type)}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold shrink-0 transition-colors cursor-pointer"
              >
                Upload Now
              </button>
            </div>
          )}

          {/* Documents Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-3 px-3 font-bold">Document Type</th>
                  <th className="py-3 px-3 font-bold">Uploaded File</th>
                  <th className="py-3 px-3 font-bold">Verification Status</th>
                  <th className="py-3 px-3 font-bold">Reviewer Feedback</th>
                  <th className="py-3 px-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      {doc.type}
                      {doc.isRequired && (
                        <span className="text-[10px] text-rose-500 ml-1 font-bold">*Required</span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-slate-600">
                      {doc.fileName ? (
                        <div className="flex items-center gap-1.5 font-medium truncate max-w-[200px]" title={doc.fileName}>
                          <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          <span className="truncate">{doc.fileName}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">No file uploaded yet</span>
                      )}
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          doc.status === 'Verified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : doc.status === 'Under Review'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {doc.status === 'Verified' && <CheckCircle2 className="w-3 h-3" />}
                        {doc.status === 'Under Review' && <Clock className="w-3 h-3" />}
                        {doc.status === 'Missing' && <AlertCircle className="w-3 h-3" />}
                        {doc.status}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-slate-500 text-[11px] max-w-xs">
                      {doc.reviewerNotes || 'Awaiting review from Clifton verification cell.'}
                    </td>

                    <td className="py-3 px-3 text-right">
                      {doc.status === 'Missing' ? (
                        <button
                          onClick={() => handleSimulatedUpload(doc.type)}
                          className="px-2.5 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 text-xs transition-colors"
                        >
                          Upload
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSimulatedUpload(doc.type)}
                          className="text-blue-600 hover:text-blue-800 font-semibold text-xs"
                        >
                          Replace File
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

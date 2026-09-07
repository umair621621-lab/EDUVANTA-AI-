import React from 'react';
import { 
  X, 
  Award, 
  MapPin, 
  DollarSign, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink, 
  Home, 
  Calendar, 
  ShieldCheck, 
  Sparkles,
  Phone,
  FileCheck
} from 'lucide-react';
import { University } from '../types';

interface UniversityModalProps {
  university: University | null;
  onClose: () => void;
  currency: string;
  onBookConsultation: (uniName: string) => void;
  onApply: (uni: University) => void;
}

export const UniversityModal: React.FC<UniversityModalProps> = ({
  university,
  onClose,
  currency,
  onBookConsultation,
  onApply
}) => {
  if (!university) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header Hero Banner */}
        <div className="relative h-60 w-full shrink-0">
          <img
            src={university.coverImage}
            alt={university.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Ranking & Destination Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 text-xs font-extrabold rounded-md shadow-md flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              QS World Rank #{university.ranking.qs}
            </span>
            {university.ranking.the && (
              <span className="px-2.5 py-1 bg-slate-900/90 text-white text-xs font-semibold rounded-md backdrop-blur-xs">
                THE World Rank #{university.ranking.the}
              </span>
            )}
            <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-semibold rounded-md">
              Acceptance: {university.acceptanceRate}
            </span>
          </div>

          {/* University Title & City */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
              <span className="text-xl">{university.flag}</span>
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{university.city}, {university.country}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 font-display">
              {university.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Overview Statement */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Institutional Profile & Academic Standing
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {university.overview}
            </p>
          </div>

          {/* Key Financial & Requirements Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tuition Breakdown */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                Annual Tuition
              </div>
              <div className="text-base font-bold text-slate-900">
                PKR {university.tuitionRange.pkrApproxMin} - {university.tuitionRange.pkrApproxMax}
              </div>
              <div className="text-xs text-slate-500">
                Local: {university.tuitionRange.currency} {university.tuitionRange.min.toLocaleString()} – {university.tuitionRange.max.toLocaleString()} / year
              </div>
              {university.applicationFeeUSD !== undefined && (
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  Application Fee: ${university.applicationFeeUSD} USD {university.applicationFeeUSD === 0 ? '(Fee Waived via EduVanta)' : ''}
                </div>
              )}
            </div>

            {/* Living Cost in PKR */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Home className="w-4 h-4 text-blue-600" />
                Annual Living Cost
              </div>
              <div className="text-base font-bold text-slate-900">
                PKR {university.livingCostAnnualPKR}
              </div>
              <div className="text-xs text-slate-500">
                Approx ${university.livingCostAnnualUSD.toLocaleString()} USD / yr (Food, rent, transport)
              </div>
              <div className="text-[11px] text-emerald-600 pt-1 border-t border-slate-100 font-medium">
                20 hrs/week part-time work permitted
              </div>
            </div>

            {/* Entry Benchmark */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-600" />
                Entry Requirements
              </div>
              <div className="text-sm font-bold text-slate-900">
                Min GPA: {university.entryRequirements.minGpa}
              </div>
              <div className="text-xs text-slate-600">
                Marks Benchmark: {university.entryRequirements.minPercentage}
              </div>
              <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-100 font-semibold text-blue-700">
                IELTS {university.entryRequirements.ielts}+ {university.entryRequirements.pte ? `or PTE ${university.entryRequirements.pte}+` : ''}
              </div>
            </div>
          </div>

          {/* Popular Programs & Fields */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2.5">
              Flagship Programs & High-Demand Fields for Pakistani Students
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {university.popularPrograms.map((prog, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 text-xs font-semibold text-slate-800 flex items-center justify-between"
                >
                  <span>{prog}</span>
                  <span className="text-[10px] text-blue-600 bg-blue-100 px-2 py-0.5 rounded font-medium">
                    High Employability
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scholarship Opportunities */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Pakistani Student Scholarships & Financial Aid
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              {university.scholarshipDetails || 'Merit scholarships and departmental bursaries available upon admission.'}
            </p>
          </div>

          {/* Intake Cycles & Deadlines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-500" />
                Intake Cycles
              </div>
              <div className="text-slate-600">{university.intakes.join(' • ')}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-slate-500" />
                Application Deadline
              </div>
              <div className="text-slate-600">
                Fall: {university.deadlines.fall || 'Rolling'} {university.deadlines.spring ? `| Spring: ${university.deadlines.spring}` : ''}
              </div>
            </div>
          </div>

          {/* Verification Audit Stamp */}
          <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Data Authenticity Audit:</strong> Verified on {university.lastVerifiedDate} by {university.verifiedBy}
              </span>
            </div>
            <a
              href={university.website}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 text-xs shrink-0"
            >
              Official Website
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => onBookConsultation(university.name)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-blue-600" />
            <span>Book Karachi Counsellor for {university.shortName}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors"
            >
              Close
            </button>

            <button
              onClick={() => {
                onApply(university);
                onClose();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Initiate Free Application</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Filter, 
  CheckCircle2, 
  ExternalLink, 
  Calendar, 
  Globe2, 
  Sparkles,
  BookOpen,
  DollarSign
} from 'lucide-react';
import { Scholarship } from '../types';

interface ScholarshipFinderProps {
  scholarships: Scholarship[];
  onBookConsultation: () => void;
}

export const ScholarshipFinder: React.FC<ScholarshipFinderProps> = ({
  scholarships,
  onBookConsultation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCoverage, setSelectedCoverage] = useState('All');

  const filteredScholarships = scholarships.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.amountDescription.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry = selectedCountry === 'All' || s.country === selectedCountry;
    const matchesCoverage = selectedCoverage === 'All' || s.coverageType === selectedCoverage;

    return matchesSearch && matchesCountry && matchesCoverage;
  });

  const countries = ['All', 'United Kingdom', 'United States', 'Canada', 'Australia', 'Germany', 'Ireland'];
  const coverageTypes = ['All', 'Full Ride', 'Full Tuition', 'Stipend + Flights'];

  return (
    <div className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Pakistani Student Funding Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
            Prestigious Government & University Scholarships
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Verified funding schemes officially open to Pakistani passport holders, offering 100% full tuition, monthly stipends, and round-trip airfare.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Chevening, Fulbright, DAAD, Pearson..."
              className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Country filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500">Country:</span>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Coverage filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500">Coverage:</span>
              <select
                value={selectedCoverage}
                onChange={(e) => setSelectedCoverage(e.target.value)}
                className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {coverageTypes.map((cov) => (
                  <option key={cov} value={cov}>{cov}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Scholarship Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((sch) => (
            <div
              key={sch.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-lg hover:border-amber-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    {sch.coverageType}
                  </span>
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Globe2 className="w-3.5 h-3.5" />
                    {sch.country}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {sch.name}
                </h3>

                {/* Financial Value */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="font-bold text-emerald-700">{sch.amountPKR}</div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{sch.amountDescription}</p>
                </div>

                {/* Eligibility Criteria */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Key Eligibility for Pakistan
                  </div>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {sch.eligibilityCriteria.slice(0, 3).map((crit, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{crit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Strategic Tip */}
                {sch.tips && (
                  <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 text-[11px] text-blue-900 leading-relaxed">
                    <strong className="text-blue-950 font-semibold">EduVanta Karachi Coaching Tip:</strong> {sch.tips}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Deadline:
                  </span>
                  <span className="font-semibold text-slate-800">{sch.deadline}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onBookConsultation}
                    className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition-colors text-center"
                  >
                    Get Essay Review
                  </button>

                  <a
                    href={sch.applicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    title="Official Portal"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

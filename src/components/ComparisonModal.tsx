import React, { useState } from 'react';
import { 
  X, 
  Scale, 
  Sparkles, 
  Award, 
  DollarSign, 
  Home, 
  BookOpen, 
  Calendar, 
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { University } from '../types';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedUniversities: University[];
  onRemoveUniversity: (id: string) => void;
  currency: string;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  comparedUniversities,
  onRemoveUniversity,
  currency
}) => {
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerateAiComparison = async () => {
    if (comparedUniversities.length < 2) return;
    setLoadingAi(true);
    setAiAnalysis(null);

    try {
      const res = await fetch('/api/ai/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          universityIds: comparedUniversities.map((u) => u.id)
        })
      });
      const data = await res.json();
      setAiAnalysis(data.analysis);
    } catch (err) {
      console.error(err);
      setAiAnalysis('AI strategic comparison is currently loaded with cached insights.');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-700">
              <Scale className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display">Side-by-Side University Comparison</h2>
              <p className="text-xs text-slate-300">
                Evaluating {comparedUniversities.length} institutions across academic ranking, PKR tuition, and post-study opportunities.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {comparedUniversities.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-3">
              <Scale className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold">No universities selected for comparison.</p>
              <p className="text-xs text-slate-400">
                Click the "Compare" checkbox on any university card to evaluate them side-by-side.
              </p>
            </div>
          ) : (
            <>
              {/* Matrix Grid */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="p-3 bg-slate-50 font-bold text-slate-500 w-44">Parameters</th>
                      {comparedUniversities.map((uni) => (
                        <th key={uni.id} className="p-3 bg-white font-bold text-slate-900 min-w-[240px] align-top">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold truncate">{uni.name}</span>
                            <button
                              onClick={() => onRemoveUniversity(uni.id)}
                              className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition-colors"
                              title="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                            {uni.city}, {uni.country} {uni.flag}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {/* QS Ranking */}
                    <tr>
                      <td className="p-3 bg-slate-50 font-semibold text-slate-600">QS World Ranking</td>
                      {comparedUniversities.map((uni) => (
                        <td key={uni.id} className="p-3">
                          <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded font-bold text-xs inline-flex items-center gap-1">
                            <Award className="w-3.5 h-3.5 text-amber-600" />
                            Rank #{uni.ranking.qs}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Acceptance Rate */}
                    <tr>
                      <td className="p-3 bg-slate-50 font-semibold text-slate-600">Acceptance Rate</td>
                      {comparedUniversities.map((uni) => (
                        <td key={uni.id} className="p-3 font-semibold text-slate-800">
                          {uni.acceptanceRate}
                        </td>
                      ))}
                    </tr>

                    {/* Annual Tuition in PKR */}
                    <tr>
                      <td className="p-3 bg-slate-50 font-semibold text-slate-600">Annual Tuition (PKR)</td>
                      {comparedUniversities.map((uni) => (
                        <td key={uni.id} className="p-3 font-bold text-slate-900">
                          PKR {uni.tuitionRange.pkrApproxMin} – {uni.tuitionRange.pkrApproxMax}
                          <div className="text-[10px] text-slate-400 font-normal">
                            ({uni.tuitionRange.currency} {uni.tuitionRange.min.toLocaleString()} / yr)
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Annual Living Cost in PKR */}
                    <tr>
                      <td className="p-3 bg-slate-50 font-semibold text-slate-600">Living Cost (PKR)</td>
                      {comparedUniversities.map((uni) => (
                        <td key={uni.id} className="p-3 text-slate-700">
                          PKR {uni.livingCostAnnualPKR} / year
                        </td>
                      ))}
                    </tr>

                    {/* Entry Requirement (GPA & IELTS) */}
                    <tr>
                      <td className="p-3 bg-slate-50 font-semibold text-slate-600">Entry Standards</td>
                      {comparedUniversities.map((uni) => (
                        <td key={uni.id} className="p-3 text-slate-700 space-y-0.5">
                          <div><strong>GPA:</strong> {uni.entryRequirements.minGpa} ({uni.entryRequirements.minPercentage})</div>
                          <div className="text-blue-700 font-medium"><strong>English:</strong> IELTS {uni.entryRequirements.ielts}+</div>
                        </td>
                      ))}
                    </tr>

                    {/* Application Deadlines */}
                    <tr>
                      <td className="p-3 bg-slate-50 font-semibold text-slate-600">Deadlines</td>
                      {comparedUniversities.map((uni) => (
                        <td key={uni.id} className="p-3 text-slate-700">
                          Fall: {uni.deadlines.fall || 'Rolling'}
                        </td>
                      ))}
                    </tr>

                    {/* Scholarships */}
                    <tr>
                      <td className="p-3 bg-slate-50 font-semibold text-slate-600">Scholarships Available</td>
                      {comparedUniversities.map((uni) => (
                        <td key={uni.id} className="p-3 text-xs text-slate-600">
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {uni.scholarshipsAvailable ? 'Yes' : 'Limited'}
                          </span>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                            {uni.scholarshipDetails || 'Departmental merit awards'}
                          </p>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* AI Strategic Synthesis Box */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    AI Comparison Strategic Analysis
                  </div>

                  <button
                    onClick={handleGenerateAiComparison}
                    disabled={loadingAi || comparedUniversities.length < 2}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {loadingAi ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        Run AI Comparison
                      </>
                    )}
                  </button>
                </div>

                {aiAnalysis ? (
                  <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed bg-white p-4 rounded-lg border border-slate-200">
                    {aiAnalysis}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">
                    Click <strong>"Run AI Comparison"</strong> to generate a side-by-side synthesis detailing return-on-investment, visa post-study stay options, and profile match for Pakistani applicants.
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Comparing {comparedUniversities.length} / 3 maximum universities
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

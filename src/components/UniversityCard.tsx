import React from 'react';
import { 
  Award, 
  MapPin, 
  DollarSign, 
  BookOpen, 
  CheckCircle2, 
  Scale, 
  Heart, 
  Calendar, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { University } from '../types';

interface UniversityCardProps {
  university: University;
  currency: string;
  isCompared: boolean;
  onToggleCompare: (uni: University) => void;
  isSaved: boolean;
  onToggleSave: (uni: University) => void;
  onViewDetails: (uni: University) => void;
  onApplyNow: (uni: University) => void;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({
  university,
  currency,
  isCompared,
  onToggleCompare,
  isSaved,
  onToggleSave,
  onViewDetails,
  onApplyNow
}) => {
  // Format tuition display according to user currency preference
  const formatTuition = () => {
    if (currency === 'PKR') {
      return `PKR ${university.tuitionRange.pkrApproxMin} - ${university.tuitionRange.pkrApproxMax}`;
    }
    const symbol = university.tuitionRange.currency === 'GBP' ? '£' :
                   university.tuitionRange.currency === 'EUR' ? '€' :
                   university.tuitionRange.currency === 'AUD' ? 'A$' :
                   university.tuitionRange.currency === 'CAD' ? 'C$' : '$';
    return `${symbol}${university.tuitionRange.min.toLocaleString()} - ${symbol}${university.tuitionRange.max.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Top Media / Hero */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={university.coverImage}
          alt={university.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          {/* QS Ranking */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md">
            <Award className="w-3.5 h-3.5" />
            QS #{university.ranking.qs}
          </span>
          {university.ranking.the && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900/80 text-white font-semibold text-[11px] backdrop-blur-xs">
              THE #{university.ranking.the}
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => onToggleSave(university)}
          aria-label={isSaved ? 'Remove from saved' : 'Save university'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
            isSaved
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 text-slate-700 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* University Location & Flag */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div className="flex items-center gap-1.5 text-xs font-medium drop-shadow">
            <span className="text-base">{university.flag}</span>
            <MapPin className="w-3.5 h-3.5 text-blue-300 shrink-0" />
            <span className="truncate">{university.city}, {university.country}</span>
          </div>
          <span className="text-[11px] font-semibold bg-white/20 backdrop-blur px-2 py-0.5 rounded text-white">
            {university.acceptanceRate} Accept
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* University Name */}
          <h3
            onClick={() => onViewDetails(university)}
            className="text-base font-bold text-slate-900 line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer"
            title={university.name}
          >
            {university.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {university.overview}
          </p>
        </div>

        {/* Requirements & Costs Matrix */}
        <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400">Annual Tuition</div>
            <div className="font-bold text-slate-900 truncate mt-0.5" title={formatTuition()}>
              {formatTuition()}
            </div>
            <div className="text-[10px] text-slate-500">
              ({university.tuitionRange.currency} {university.tuitionRange.min.toLocaleString()} / yr)
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400">Entry Standard</div>
            <div className="font-bold text-slate-900 mt-0.5">
              GPA {university.entryRequirements.minGpa}
            </div>
            <div className="text-[10px] text-slate-500">
              IELTS {university.entryRequirements.ielts}+ required
            </div>
          </div>
        </div>

        {/* Popular programs pill tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {university.popularPrograms.slice(0, 3).map((prog, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100/60"
            >
              {prog}
            </span>
          ))}
          {university.popularPrograms.length > 3 && (
            <span className="text-[10px] text-slate-400">
              +{university.popularPrograms.length - 3} more
            </span>
          )}
        </div>

        {/* Verified Timestamp Bar */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1 text-emerald-600 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified {university.lastVerifiedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>{university.deadlines.fall || 'Rolling'}</span>
          </div>
        </div>

        {/* Bottom Action Row */}
        <div className="pt-2 flex items-center gap-2">
          {/* Compare Checkbox */}
          <button
            type="button"
            onClick={() => onToggleCompare(university)}
            className={`px-2.5 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isCompared
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Compare up to 3 universities"
          >
            <Scale className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isCompared ? 'Compared' : 'Compare'}</span>
          </button>

          {/* View Details */}
          <button
            type="button"
            onClick={() => onViewDetails(university)}
            className="flex-1 py-2 px-3 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition-colors text-center"
          >
            View Details
          </button>

          {/* Quick Apply / Match */}
          <button
            type="button"
            onClick={() => onApplyNow(university)}
            className="py-2 px-3.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 shadow-xs"
          >
            <span>Apply</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

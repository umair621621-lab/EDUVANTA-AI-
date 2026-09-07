import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Plane, 
  Home, 
  Shield, 
  Briefcase, 
  ArrowRight, 
  Sparkles,
  TrendingDown,
  Info
} from 'lucide-react';

export const CostCalculator: React.FC<{ onBookConsultation: () => void }> = ({ onBookConsultation }) => {
  const [destination, setDestination] = useState<string>('UK');
  const [degreeLevel, setDegreeLevel] = useState<string>('Masters');
  const [livingTier, setLivingTier] = useState<string>('Standard');
  const [workHoursPerWeek, setWorkHoursPerWeek] = useState<number>(20);
  const [hasScholarship, setHasScholarship] = useState<boolean>(false);
  const [scholarshipPercent, setScholarshipPercent] = useState<number>(20);

  // Exchange Rates to PKR (Approximated 2025/2026 baseline)
  const RATES: Record<string, number> = {
    GBP: 360,
    USD: 280,
    CAD: 200,
    AUD: 185,
    EUR: 300,
    AED: 76
  };

  // Base Data per Destination
  interface DestData {
    currency: string;
    currencySymbol: string;
    baseTuition: number;
    annualLiving: number;
    healthSurcharge: number;
    flightPKR: number;
    hourlyMinWage: number; // in local currency
    postStudyYears: number;
  }

  const DEST_CONFIG: Record<string, DestData> = {
    UK: {
      currency: 'GBP',
      currencySymbol: '£',
      baseTuition: degreeLevel === 'Masters' ? 24000 : 21000,
      annualLiving: livingTier === 'London' ? 14500 : 10500,
      healthSurcharge: 776, // IHS per year
      flightPKR: 220000,
      hourlyMinWage: 11.44,
      postStudyYears: 2
    },
    USA: {
      currency: 'USD',
      currencySymbol: '$',
      baseTuition: degreeLevel === 'Masters' ? 32000 : 38000,
      annualLiving: livingTier === 'Premium' ? 21000 : 15000,
      healthSurcharge: 1800,
      flightPKR: 350000,
      hourlyMinWage: 14.00,
      postStudyYears: 3
    },
    Canada: {
      currency: 'CAD',
      currencySymbol: 'C$',
      baseTuition: degreeLevel === 'Masters' ? 27000 : 34000,
      annualLiving: 20635, // IRCC mandatory
      healthSurcharge: 900,
      flightPKR: 360000,
      hourlyMinWage: 17.20,
      postStudyYears: 3
    },
    Australia: {
      currency: 'AUD',
      currencySymbol: 'A$',
      baseTuition: degreeLevel === 'Masters' ? 38000 : 35000,
      annualLiving: 29710, // Official DHA minimum
      healthSurcharge: 650, // OSHC
      flightPKR: 320000,
      hourlyMinWage: 23.23,
      postStudyYears: 2
    },
    Germany: {
      currency: 'EUR',
      currencySymbol: '€',
      baseTuition: 400, // Public universities €0 tuition! (Admin fee)
      annualLiving: 11904, // Official Blocked Account
      healthSurcharge: 1400, // TK public insurance
      flightPKR: 240000,
      hourlyMinWage: 12.41,
      postStudyYears: 1.5
    },
    Ireland: {
      currency: 'EUR',
      currencySymbol: '€',
      baseTuition: degreeLevel === 'Masters' ? 18500 : 16000,
      annualLiving: 12000,
      healthSurcharge: 500,
      flightPKR: 260000,
      hourlyMinWage: 12.70,
      postStudyYears: 2
    }
  };

  const current = DEST_CONFIG[destination] || DEST_CONFIG.UK;
  const rate = RATES[current.currency] || 280;

  // Calculations
  const grossTuition = current.baseTuition;
  const discountAmount = hasScholarship ? (grossTuition * (scholarshipPercent / 100)) : 0;
  const netTuition = grossTuition - discountAmount;
  const totalLocalExpenses = netTuition + current.annualLiving + current.healthSurcharge;
  const totalPKRExpenses = (totalLocalExpenses * rate) + current.flightPKR;

  // Potential Part-Time Earnings (assuming 44 weeks/year at student hourly wage)
  const annualWorkHours = workHoursPerWeek * 44;
  const annualEarningsLocal = annualWorkHours * current.hourlyMinWage;
  const annualEarningsPKR = annualEarningsLocal * rate;

  // Net Out-of-Pocket Expense
  const netOutOfPocketPKR = Math.max(0, totalPKRExpenses - annualEarningsPKR);

  return (
    <div className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Financial Planning</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
            Study Abroad Cost & Part-Time Earnings Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Realistically compute 1st-year tuition, mandatory visa maintenance funds, flights from Karachi, and legal student part-time wages in Pakistani Rupee (PKR).
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              1. Choose Destination & Program Parameters
            </h3>

            {/* Destination Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Study Destination
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[
                  { id: 'UK', label: 'UK 🇬🇧' },
                  { id: 'USA', label: 'USA 🇺🇸' },
                  { id: 'Canada', label: 'Canada 🇨🇦' },
                  { id: 'Australia', label: 'Australia 🇦🇺' },
                  { id: 'Germany', label: 'Germany 🇩🇪' },
                  { id: 'Ireland', label: 'Ireland 🇮🇪' }
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDestination(d.id)}
                    className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all text-center ${
                      destination === d.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Degree Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Degree Level
                </label>
                <select
                  value={degreeLevel}
                  onChange={(e) => setDegreeLevel(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Masters">Masters (1-2 Years)</option>
                  <option value="Bachelors">Bachelors (3-4 Years)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Living / Accommodation Style
                </label>
                <select
                  value={livingTier}
                  onChange={(e) => setLivingTier(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Standard">Standard Student Hall / Shared Flat</option>
                  <option value="London">Capital / Metropolitan (Higher Rent)</option>
                  <option value="Budget">Affordable Provincial Town</option>
                </select>
              </div>
            </div>

            {/* Part-Time Work Hours Slider */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  Legal Part-Time Work (Term Time)
                </label>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {workHoursPerWeek} Hours / Week
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="24"
                step="2"
                value={workHoursPerWeek}
                onChange={(e) => setWorkHoursPerWeek(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0 hrs (No work)</span>
                <span>10 hrs (Casual)</span>
                <span>20 hrs (Legal max for UK/EU/AU)</span>
                <span>24 hrs (Canada)</span>
              </div>
            </div>

            {/* Scholarship Waiver Toggle */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="scholarship-toggle"
                    checked={hasScholarship}
                    onChange={(e) => setHasScholarship(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                  />
                  <label htmlFor="scholarship-toggle" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Apply Estimated Merit Scholarship / Tuition Waiver
                  </label>
                </div>
                {hasScholarship && (
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {scholarshipPercent}% Fee Waiver
                  </span>
                )}
              </div>

              {hasScholarship && (
                <div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={scholarshipPercent}
                    onChange={(e) => setScholarshipPercent(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>10% Discount</span>
                    <span>25% Standard Merit</span>
                    <span>50% Dean's Award</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Summary Card (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-6">
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Annual Financial Estimate
              </div>
              <h3 className="text-2xl font-bold font-display">
                PKR {Math.round(totalPKRExpenses).toLocaleString()}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Approx {current.currencySymbol}{Math.round(totalLocalExpenses).toLocaleString()} {current.currency} total 1st-year outlay
              </p>
            </div>

            {/* Line items breakdown */}
            <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4">
              <div className="flex justify-between">
                <span>Tuition Fee (Annual):</span>
                <span className="font-semibold text-white">
                  PKR {Math.round(netTuition * rate).toLocaleString()}
                  <span className="text-[10px] text-slate-400 ml-1">({current.currencySymbol}{Math.round(netTuition).toLocaleString()})</span>
                </span>
              </div>

              <div className="flex justify-between">
                <span>Living Expenses (Rent + Food):</span>
                <span className="font-semibold text-white">
                  PKR {Math.round(current.annualLiving * rate).toLocaleString()}
                  <span className="text-[10px] text-slate-400 ml-1">({current.currencySymbol}{Math.round(current.annualLiving).toLocaleString()})</span>
                </span>
              </div>

              <div className="flex justify-between">
                <span>Visa Health Surcharge / Insurance:</span>
                <span className="font-semibold text-white">
                  PKR {Math.round(current.healthSurcharge * rate).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Airfare (Karachi return ticket):</span>
                <span className="font-semibold text-white">
                  PKR {current.flightPKR.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Part-time offset */}
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-300 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  Estimated Part-Time Earnings:
                </span>
                <span className="font-bold text-emerald-400">
                  - PKR {Math.round(annualEarningsPKR).toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/70">
                At {current.currencySymbol}{current.hourlyMinWage}/hr minimum wage working {workHoursPerWeek} hrs/week during term.
              </p>
            </div>

            {/* Net Out of Pocket */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Net Estimated Out-of-Pocket
                </div>
                <div className="text-xl font-extrabold text-amber-300">
                  PKR {Math.round(netOutOfPocketPKR).toLocaleString()}
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-400">
                Post-Study Visa: <strong className="text-white">{current.postStudyYears} Years</strong>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onBookConsultation}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            >
              <span>Get Bank Statement Audit in Clifton Karachi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

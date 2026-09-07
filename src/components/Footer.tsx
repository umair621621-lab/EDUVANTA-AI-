import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Shield, 
  Award, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand & Karachi Headquarters */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-2xl font-bold text-white font-display tracking-tight">EduVanta</span>
              <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 bg-blue-900/60 text-blue-300 rounded font-semibold border border-blue-700/50">
                Karachi, Pakistan
              </span>
            </div>

            <p className="text-sm leading-relaxed text-slate-300 max-w-sm">
              Pakistan’s premier AI-powered study abroad advisory platform. Connecting Pakistani students to 40+ Top 50 global universities with instantaneous AI eligibility matching, real-time PKR tuition tracking, and British Council certified visa counsellors.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Suite 402, Al-Khaleej Towers, Main Clifton, Karachi, 75600, Sindh, Pakistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>UAN: +92 21 111-EDUVANTA | WhatsApp: +92 300 2489911</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>admissions@eduvanta.pk | clifton@eduvanta.pk</span>
              </div>
            </div>
          </div>

          {/* Col 3: Popular Study Destinations */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">Top Destinations</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('universities')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Study in United Kingdom</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('universities')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Study in United States</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('universities')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Study in Canada</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('universities')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Study in Australia</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('universities')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Germany (€0 Tuition Public)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('universities')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Study in Ireland (Silicon Docks)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Tools */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">Smart AI Tools</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-white transition-colors">
                  AI Eligibility Assessment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calculator')} className="hover:text-white transition-colors">
                  Study Cost Calculator (PKR)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('scholarships')} className="hover:text-white transition-colors">
                  Scholarship Finder (Chevening/Fulbright)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('universities')} className="hover:text-white transition-colors">
                  Side-by-Side University Compare
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('student-portal')} className="hover:text-white transition-colors">
                  Student Document Vault
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('counsellors')} className="hover:text-white transition-colors">
                  Karachi In-Person Counselling
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Accreditations & Trust */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">Trust & Standards</h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">British Council Certified</div>
                  <p className="text-[11px] text-slate-400">Trained UK Education Agents</p>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-start gap-2">
                <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">SECP Registered</div>
                  <p className="text-[11px] text-slate-400">Corporate Reg # 0192841-PK</p>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-start gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">40+ Verified Universities</div>
                  <p className="text-[11px] text-slate-400">Quarterly Audited Data</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 text-xs text-slate-500 space-y-3">
          <p className="leading-relaxed bg-slate-800/40 p-3 rounded-lg border border-slate-800">
            <strong className="text-slate-400">Official Disclaimer:</strong> EduVanta is an educational advisory and university matching platform. All institutional rankings reflect official QS & THE 2025 published standards. Tuition and currency conversions to Pakistani Rupee (PKR) are approximate estimates subject to foreign exchange rate movements. AI eligibility ratings reflect academic profile assessment and do not constitute an official offer of admission or a guarantee of visa issuance from foreign immigration bodies (UK Home Office, US Dept of State, IRCC Canada, or Australian Home Affairs).
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p>© {new Date().getFullYear()} EduVanta Technologies (Pvt) Ltd. All rights reserved. Clifton, Karachi, Pakistan.</p>
            <div className="flex items-center gap-4 text-xs">
              <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-slate-400 cursor-pointer">Visa Compliance Guide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

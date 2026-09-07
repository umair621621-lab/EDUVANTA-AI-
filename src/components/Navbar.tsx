import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Sparkles, 
  Calculator, 
  Award, 
  Globe2, 
  Users, 
  FileText, 
  ShieldCheck, 
  MessageSquare, 
  Phone, 
  Menu, 
  X,
  Compass
} from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  onOpenEligibility: () => void;
  onOpenBooking: () => void;
  savedCount: number;
  compareCount: number;
  onOpenCompare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currency,
  setCurrency,
  currentUserRole,
  setCurrentUserRole,
  onOpenEligibility,
  onOpenBooking,
  savedCount,
  compareCount,
  onOpenCompare
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'explore', label: 'Home', icon: Compass },
    { id: 'universities', label: 'Universities', icon: GraduationCap },
    { id: 'courses', label: 'Courses', icon: Search },
    { id: 'scholarships', label: 'Scholarships', icon: Award },
    { id: 'destinations', label: 'Destinations', icon: Globe2 },
    { id: 'calculator', label: 'Cost Calculator', icon: Calculator },
    { id: 'counsellors', label: 'Karachi Counsellors', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      {/* Top Notification / Trust Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Karachi Office Open:
            </span>
            <span>Suite 402, Al-Khaleej Towers, Main Clifton</span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline">Walk-ins & Online Consultations</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/923001234567?text=Hi%20EduVanta%20Karachi,%20I%20would%20like%20to%20consult%20about%20studying%20abroad"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: +92 300 EDUVANTA</span>
            </a>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Currency:</span>
              <select
                id="currency-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-slate-800 text-white rounded px-1.5 py-0.5 border border-slate-700 text-xs font-medium cursor-pointer"
              >
                <option value="PKR">PKR (₨)</option>
                <option value="GBP">GBP (£)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="CAD">CAD ($)</option>
                <option value="AUD">AUD ($)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('explore')}
              className="flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <GraduationCap className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-slate-900 font-display">EduVanta</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded font-sans">
                    AI Platform
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Your Smarter Path to Study Abroad</p>
              </div>
            </button>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Compare Badge */}
            {compareCount > 0 && (
              <button
                id="navbar-compare-btn"
                onClick={onOpenCompare}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors"
              >
                <span>Compare</span>
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">
                  {compareCount}
                </span>
              </button>
            )}

            {/* AI Eligibility CTA */}
            <button
              id="nav-eligibility-btn"
              onClick={onOpenEligibility}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold hover:from-amber-600 hover:to-amber-700 shadow-sm shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Check AI Eligibility
            </button>

            {/* Book Consultation */}
            <button
              id="nav-booking-btn"
              onClick={onOpenBooking}
              className="px-3.5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Book Consultation
            </button>

            {/* Role / Portal Switcher */}
            <div className="flex items-center gap-1 pl-2 border-l border-slate-200">
              <button
                id="portal-student-btn"
                onClick={() => setCurrentTab('student-portal')}
                className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                  currentTab === 'student-portal'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                title="Student Dashboard"
              >
                <FileText className="w-4 h-4" />
              </button>
              <button
                id="portal-admin-btn"
                onClick={() => setCurrentTab('admin-crm')}
                className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                  currentTab === 'admin-crm'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                title="Admin & CRM Portal"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenEligibility}
              className="px-2.5 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Check
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-left ${
                currentTab === item.id ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setCurrentTab('student-portal');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold text-center"
            >
              Student Portal
            </button>
            <button
              onClick={() => {
                setCurrentTab('admin-crm');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold text-center"
            >
              Admin CRM
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold text-center"
            >
              Book Consultation (Clifton Office)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

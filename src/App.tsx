import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  Filter, 
  GraduationCap, 
  MapPin, 
  Award, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Globe2, 
  Users, 
  Phone, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { UniversityCard } from './components/UniversityCard';
import { UniversityModal } from './components/UniversityModal';
import { EligibilityModal } from './components/EligibilityModal';
import { ComparisonModal } from './components/ComparisonModal';
import { CostCalculator } from './components/CostCalculator';
import { ScholarshipFinder } from './components/ScholarshipFinder';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminCRM } from './components/AdminCRM';
import { CounsellingBookingModal } from './components/CounsellingBookingModal';
import { AIChatDrawer } from './components/AIChatDrawer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ALL_UNIVERSITIES, COURSES, SCHOLARSHIPS, COUNSELLORS, COUNTRY_GUIDES, INITIAL_APPLICATIONS, INITIAL_DOCUMENTS, INITIAL_LEADS, INITIAL_APPOINTMENTS } from './data/index';
import { University, Course, Application, DocumentItem, LeadRecord, Appointment, UserRole, ApplicationStage } from './types';

export function App() {
  // Navigation & Role State
  const [currentTab, setCurrentTab] = useState<string>('explore');
  const [currency, setCurrency] = useState<string>('PKR');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('student');

  // Core Data States
  const [universities, setUniversities] = useState<University[]>(ALL_UNIVERSITIES);
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [leads, setLeads] = useState<LeadRecord[]>(INITIAL_LEADS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

  // University Marketplace Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [sortBy, setSortBy] = useState<'ranking' | 'tuitionAsc' | 'tuitionDesc' | 'name'>('ranking');

  // Comparison & Wishlist State
  const [comparedUniversities, setComparedUniversities] = useState<University[]>([]);
  const [savedUniversityIds, setSavedUniversityIds] = useState<string[]>(['oxford', 'imperial']);

  // Modals
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [selectedUniForDetails, setSelectedUniForDetails] = useState<University | null>(null);
  const [bookingPreselectedUni, setBookingPreselectedUni] = useState<string | undefined>(undefined);

  // Toast Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch initial data from server if online
  useEffect(() => {
    fetch('/api/universities')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setUniversities(data);
        }
      })
      .catch(() => console.log('Using local university seed'));
  }, []);

  // Filtered Universities Logic
  const filteredUniversities = universities
    .filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.popularPrograms.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCountry = selectedCountry === 'All' || u.country === selectedCountry;
      return matchesSearch && matchesCountry;
    })
    .sort((a, b) => {
      if (sortBy === 'ranking') return a.ranking.qs - b.ranking.qs;
      if (sortBy === 'tuitionAsc') return a.tuitionRange.min - b.tuitionRange.min;
      if (sortBy === 'tuitionDesc') return b.tuitionRange.min - a.tuitionRange.min;
      return a.name.localeCompare(b.name);
    });

  // Handlers
  const handleToggleCompare = (uni: University) => {
    if (comparedUniversities.some((u) => u.id === uni.id)) {
      setComparedUniversities(comparedUniversities.filter((u) => u.id !== uni.id));
      showToast(`Removed ${uni.shortName} from comparison.`);
    } else {
      if (comparedUniversities.length >= 3) {
        showToast('You can compare a maximum of 3 universities at once.');
        return;
      }
      setComparedUniversities([...comparedUniversities, uni]);
      showToast(`Added ${uni.shortName} to comparison.`);
    }
  };

  const handleToggleSave = (uni: University) => {
    if (savedUniversityIds.includes(uni.id)) {
      setSavedUniversityIds(savedUniversityIds.filter((id) => id !== uni.id));
      showToast(`Removed ${uni.shortName} from wishlist.`);
    } else {
      setSavedUniversityIds([...savedUniversityIds, uni.id]);
      showToast(`Saved ${uni.shortName} to your shortlist!`);
    }
  };

  const handleApplyNow = (uni: University) => {
    const existing = applications.find((a) => a.universityId === uni.id);
    if (existing) {
      showToast(`You already have an active application for ${uni.name}!`);
      setCurrentTab('student-portal');
      return;
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      studentId: 'usr-student-1',
      studentName: 'Hamza Khan',
      studentEmail: 'hamza.khan@example.com',
      studentPhone: '+92 300 1234567',
      universityId: uni.id,
      universityName: uni.name,
      courseTitle: uni.popularPrograms[0] || 'Postgraduate Studies',
      degreeLevel: 'Masters',
      intake: 'September 2026',
      stage: 'documents',
      status: 'In Review',
      appliedDate: new Date().toISOString().split('T')[0],
      deadline: uni.deadlines.fall || 'Rolling',
      counsellorId: 'c-tariq',
      counsellorName: 'Sir Tariq Mehmood',
      notes: [
        `Application initialized for ${uni.name}.`,
        'Documents assigned to Clifton admissions desk for priority verification.'
      ],
      documentsCount: 4,
      totalDocumentsRequired: 7
    };

    // Save to state and server
    setApplications([newApp, ...applications]);
    fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newApp)
    }).catch(console.error);

    showToast(`Application initiated for ${uni.shortName}! Tracking in Student Portal.`);
    setCurrentTab('student-portal');
  };

  const handleUploadDocument = (type: string, fileName: string) => {
    const updated = documents.map((d) => {
      if (d.type === type) {
        return {
          ...d,
          fileName,
          uploadedAt: new Date().toISOString().split('T')[0],
          status: 'Under Review' as const,
          reviewerNotes: 'Uploaded by student. Pending review by Clifton admissions officer.'
        };
      }
      return d;
    });
    setDocuments(updated);
    showToast(`Uploaded ${fileName} successfully! Document sent for verification.`);
  };

  const handleOpenBookingForUni = (uniName: string) => {
    setBookingPreselectedUni(uniName);
    setIsBookingOpen(true);
  };

  const countriesList = [
    'All',
    'United Kingdom',
    'United States',
    'Canada',
    'Australia',
    'Germany',
    'Ireland',
    'Singapore',
    'Malaysia',
    'United Arab Emirates',
    'New Zealand'
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currency={currency}
        setCurrency={setCurrency}
        currentUserRole={currentUserRole}
        setCurrentUserRole={setCurrentUserRole}
        onOpenEligibility={() => setIsEligibilityOpen(true)}
        onOpenBooking={() => {
          setBookingPreselectedUni(undefined);
          setIsBookingOpen(true);
        }}
        savedCount={savedUniversityIds.length}
        compareCount={comparedUniversities.length}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Main Views Router */}
      <main className="flex-1">
        {/* TAB 1: EXPLORE / HOME */}
        {currentTab === 'explore' && (
          <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
              <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>

              <div className="max-w-7xl mx-auto relative z-10 space-y-8 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pakistan’s Premier AI Study Abroad Platform • Karachi HQ</span>
                </div>

                <div className="max-w-3xl space-y-4">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-[1.1]">
                    Study Abroad. <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">
                      Smarter with AI.
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                    Discover 40+ Top 50 global universities with instant AI admission odds matching, real-time PKR tuition tracking, and certified visa counselling at our Clifton Karachi headquarters.
                  </p>
                </div>

                {/* Interactive Search & Filter Card */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-200 text-slate-900 max-w-4xl">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Destination input */}
                    <div className="text-left">
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Where to Study?
                      </label>
                      <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        {countriesList.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Degree & Keyword Search */}
                    <div className="text-left">
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Degree, Field, or City
                      </label>
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="e.g. AI, Oxford, Toronto, MBA"
                          className="w-full bg-slate-50 rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="flex items-end">
                      <button
                        onClick={() => setCurrentTab('universities')}
                        className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Search className="w-4 h-4" />
                        <span>Search Universities</span>
                      </button>
                    </div>
                  </div>

                  {/* Trust Highlights Strip */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>40+ Verified Universities</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-amber-600" />
                      <span>All Fees Converted to PKR</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span>100% Free Initial Assessment</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-rose-600" />
                      <span>Suite 402, Clifton Karachi</span>
                    </div>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
                  <button
                    onClick={() => setIsEligibilityOpen(true)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Check Instant AI Eligibility</span>
                  </button>

                  <button
                    onClick={() => setCurrentTab('calculator')}
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2"
                  >
                    <span>Calculate Costs in PKR</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* Featured Universities Preview */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Global Top 50 Institutions
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-1">
                    Verified Universities for Pakistani Students
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Real admission requirements, accurate PKR tuition costs, and verified post-study work routes.
                  </p>
                </div>

                <button
                  onClick={() => setCurrentTab('universities')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0"
                >
                  <span>Explore all 40+ universities</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Grid of 6 Top Universities */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {universities.slice(0, 6).map((uni) => (
                  <UniversityCard
                    key={uni.id}
                    university={uni}
                    currency={currency}
                    isCompared={comparedUniversities.some((u) => u.id === uni.id)}
                    onToggleCompare={handleToggleCompare}
                    isSaved={savedUniversityIds.includes(uni.id)}
                    onToggleSave={handleToggleSave}
                    onViewDetails={(u) => setSelectedUniForDetails(u)}
                    onApplyNow={handleApplyNow}
                  />
                ))}
              </div>
            </section>

            {/* Why EduVanta / Clifton Karachi Office Banner */}
            <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Clifton Karachi Physical Admissions Cell</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-bold font-display leading-tight">
                    World-Class AI Intelligence Paired with Real In-Person Counselling.
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Unlike faceless overseas portals, EduVanta provides a dedicated walk-in advisory office at Al-Khaleej Towers in Main Clifton, Karachi. Our senior counsellors conduct face-to-face transcript verifications, bank statement audits, and SOP reviews.
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                      <div className="font-bold text-amber-400">98.4% Visa Success</div>
                      <p className="text-[11px] text-slate-400">Rigorous financial verification according to UK & Canada regulations.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                      <div className="font-bold text-emerald-400">PKR 3.4M Avg Scholarship</div>
                      <p className="text-[11px] text-slate-400">Merit bursaries secured across Russell Group and U15 institutions.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    Schedule Clifton Office Appointment
                  </button>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                    alt="EduVanta Clifton Team"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="font-bold text-sm">Suite 402, Al-Khaleej Towers, Main Clifton</div>
                    <div className="text-xs text-slate-300 mt-0.5">Walk-ins welcome Monday to Saturday: 10:00 AM – 06:30 PM</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: UNIVERSITIES MARKETPLACE (40+ UNIVERSITIES) */}
        {currentTab === 'universities' && (
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Verified Global Directory
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-1">
                  Global Universities Marketplace ({filteredUniversities.length} Institutions)
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Prioritizing world Top 50 ranked institutions with verified admissions metrics for Pakistani students.
                </p>
              </div>

              {/* Compare Trigger Badge */}
              {comparedUniversities.length > 0 && (
                <button
                  onClick={() => setIsCompareOpen(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <span>Compare {comparedUniversities.length} Universities</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Controls Bar */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative w-full lg:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search university, program, or city..."
                  className="w-full bg-white rounded-xl border border-slate-300 pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                {/* Destination Filter */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-500">Destination:</span>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="bg-white rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                  >
                    {countriesList.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-500">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-white rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ranking">QS World Ranking (Best First)</option>
                    <option value="tuitionAsc">Tuition in PKR: Low to High</option>
                    <option value="tuitionDesc">Tuition in PKR: High to Low</option>
                    <option value="name">Alphabetical (A - Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* University Cards Grid */}
            {filteredUniversities.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No universities match your criteria</h3>
                <p className="text-xs text-slate-500">
                  Try adjusting your country filter or search term to discover other institutions.
                </p>
                <button
                  onClick={() => {
                    setSelectedCountry('All');
                    setSearchQuery('');
                  }}
                  className="text-xs text-blue-600 font-semibold underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUniversities.map((uni) => (
                  <UniversityCard
                    key={uni.id}
                    university={uni}
                    currency={currency}
                    isCompared={comparedUniversities.some((u) => u.id === uni.id)}
                    onToggleCompare={handleToggleCompare}
                    isSaved={savedUniversityIds.includes(uni.id)}
                    onToggleSave={handleToggleSave}
                    onViewDetails={(u) => setSelectedUniForDetails(u)}
                    onApplyNow={handleApplyNow}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: COURSES DIRECTORY */}
        {currentTab === 'courses' && (
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="border-b border-slate-200 pb-6">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Flagship Academic Programs
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-1">
                High-Employability Degree Programs
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Curated postgraduate and undergraduate programs with verified Pakistani entry standards and career outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-bold">
                        {course.degreeLevel}
                      </span>
                      <span className="text-xs text-slate-500">{course.duration}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {course.title}
                    </h3>

                    <div className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{course.universityName} • {course.city}, {course.country}</span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {course.description}
                    </p>

                    {/* Financials in PKR */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>Tuition in PKR:</span>
                        <span>PKR {course.tuitionAnnualPKR}</span>
                      </div>
                      <div className="flex justify-between text-slate-500 text-[11px]">
                        <span>Local Fee:</span>
                        <span>{course.tuitionAnnualLocal} / yr</span>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="text-xs text-slate-600 space-y-1">
                      <div><strong>English Test:</strong> IELTS {course.ieltsMin}+ {course.pteMin ? `or PTE ${course.pteMin}+` : ''}</div>
                      <div><strong>Intake:</strong> {course.intakes.join(', ')}</div>
                    </div>

                    {/* Career Outcomes */}
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Graduate Careers</div>
                      <div className="flex flex-wrap gap-1">
                        {course.careerOutcomes.map((career, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium">
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenBookingForUni(course.universityName)}
                      className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors text-center"
                    >
                      Consult on Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SCHOLARSHIPS FINDER */}
        {currentTab === 'scholarships' && (
          <ScholarshipFinder
            scholarships={SCHOLARSHIPS}
            onBookConsultation={() => setIsBookingOpen(true)}
          />
        )}

        {/* TAB 5: COUNTRY DESTINATIONS */}
        {currentTab === 'destinations' && (
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="border-b border-slate-200 pb-6">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Comprehensive Destination Guides
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-1">
                Study Abroad Destination Guides for Pakistani Students
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Verified visa holding periods, post-study work rules, and Pakistani diaspora insights.
              </p>
            </div>

            <div className="space-y-12">
              {COUNTRY_GUIDES.map((country) => (
                <div
                  key={country.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12"
                >
                  {/* Visual Left (5 cols) */}
                  <div className="lg:col-span-5 relative h-64 lg:h-auto bg-slate-900">
                    <img
                      src={country.heroImage}
                      alt={country.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="text-3xl">{country.flag}</span>
                      <h2 className="text-2xl font-bold text-white font-display">{country.name}</h2>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                      <div className="text-xs font-semibold text-amber-400">{country.tagline}</div>
                      <div className="text-[11px] text-slate-300">
                        Post-Study Work Visa: <strong className="text-white">{country.postStudyWorkVisa}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Details Right (7 cols) */}
                  <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Why Study in {country.name}?
                      </h3>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {country.whyStudyHere.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Financial Matrix in PKR */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div>
                        <div className="text-slate-400 font-semibold text-[10px] uppercase">Tuition Range (PKR)</div>
                        <div className="font-bold text-slate-900 mt-0.5">{country.avgTuitionPerYearPKR}</div>
                        <div className="text-[10px] text-slate-500">Local: {country.avgTuitionPerYearUSD}</div>
                      </div>

                      <div>
                        <div className="text-slate-400 font-semibold text-[10px] uppercase">Mandatory Living Cost</div>
                        <div className="font-bold text-slate-900 mt-0.5">{country.avgLivingCostPerYearPKR}</div>
                        <div className="text-[10px] text-slate-500">{country.avgLivingCostPerYearUSD}</div>
                      </div>
                    </div>

                    {/* Pakistani Visa Compliance */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        Visa & Financial Proof Required for Pakistani Applicants:
                      </h4>
                      <p className="text-xs text-blue-900 bg-blue-50/70 p-3 rounded-xl border border-blue-200 font-medium">
                        {country.financialProofRequiredPKR}
                      </p>
                    </div>

                    {/* Pakistani Community Note */}
                    <div className="text-xs text-slate-600 italic">
                      <strong>Pakistani Community Insight:</strong> {country.pakistaniCommunityInsight}
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedCountry(country.name);
                          setCurrentTab('universities');
                        }}
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                      >
                        Explore {country.name} Universities
                      </button>

                      <button
                        onClick={() => handleOpenBookingForUni(country.name)}
                        className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition-colors"
                      >
                        Book Destination Specialist
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: COST CALCULATOR */}
        {currentTab === 'calculator' && (
          <CostCalculator onBookConsultation={() => setIsBookingOpen(true)} />
        )}

        {/* TAB 7: KARACHI COUNSELLORS */}
        {currentTab === 'counsellors' && (
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="border-b border-slate-200 pb-6 text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                <Users className="w-3.5 h-3.5" />
                <span>Clifton Karachi Senior Advisory Board</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                Meet Our Certified Study Abroad Counsellors
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                British Council certified, former foreign university alumni guiding Pakistani students from our Clifton, Karachi headquarters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {COUNSELLORS.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <h2 className="text-lg font-bold text-slate-900">{c.name}</h2>
                        <div className="text-xs text-blue-600 font-semibold">{c.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {c.experienceYears} Years Experience • {c.destinations.join(' & ')}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {c.bio}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                      <div className="font-semibold text-slate-800">Core Expertise:</div>
                      <div className="text-slate-600 text-[11px]">{c.specialization}</div>
                    </div>

                    <div className="text-xs text-slate-500 space-y-1">
                      <div><strong>Languages Spoken:</strong> {c.languages.join(', ')}</div>
                      <div><strong>Office:</strong> {c.officeLocation}</div>
                    </div>

                    {/* Available Slots */}
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Upcoming Consultation Slots:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {c.availableSlots.map((slot, i) => (
                          <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                    <button
                      onClick={() => {
                        setBookingPreselectedUni(undefined);
                        setIsBookingOpen(true);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors text-center"
                    >
                      Book 1-on-1 Session
                    </button>
                    <a
                      href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(c.name)},%20I%20saw%20your%20profile%20on%20EduVanta`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: STUDENT PORTAL */}
        {currentTab === 'student-portal' && (
          <StudentDashboard
            applications={applications}
            documents={documents}
            appointments={appointments}
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenEligibility={() => setIsEligibilityOpen(true)}
            onUploadDocument={handleUploadDocument}
          />
        )}

        {/* TAB 9: ADMIN & CRM OPERATIONS */}
        {currentTab === 'admin-crm' && (
          <AdminCRM
            universities={universities}
            leads={leads}
            applications={applications}
            onAddUniversity={(newU) => {
              const fullUni = newU as University;
              setUniversities([fullUni, ...universities]);
              fetch('/api/universities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fullUni)
              }).catch(console.error);
              showToast(`Added ${fullUni.name} to global marketplace!`);
            }}
            onUpdateUniversity={(id, updatedFields) => {
              setUniversities(
                universities.map((u) => (u.id === id ? { ...u, ...updatedFields } : u))
              );
              fetch(`/api/universities/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFields)
              }).catch(console.error);
              showToast('University record updated successfully!');
            }}
            onDeleteUniversity={(id) => {
              setUniversities(universities.filter((u) => u.id !== id));
              fetch(`/api/universities/${id}`, { method: 'DELETE' }).catch(console.error);
              showToast('University deleted from catalog.');
            }}
            onUpdateLeadStatus={(id, newStatus) => {
              setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus as any } : l)));
              fetch(`/api/leads/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
              }).catch(console.error);
              showToast(`Updated lead status to ${newStatus}`);
            }}
            onAddLead={(newLead) => {
              const fullLead = newLead as LeadRecord;
              setLeads([fullLead, ...leads]);
              fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fullLead)
              }).catch(console.error);
              showToast(`Created new student lead: ${fullLead.name}`);
            }}
            onUpdateApplicationStage={(id, newStage, statusName) => {
              setApplications(
                applications.map((a) =>
                  a.id === id ? { ...a, stage: newStage, status: statusName } : a
                )
              );
              fetch(`/api/applications/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stage: newStage, status: statusName })
              }).catch(console.error);
              showToast(`Application milestone advanced to: ${statusName}`);
            }}
          />
        )}
      </main>

      {/* Floating Interactive AI Study Advisor */}
      <AIChatDrawer onBookConsultation={() => setIsBookingOpen(true)} />

      {/* Floating WhatsApp Quick Link */}
      <WhatsAppButton />

      {/* Modals */}
      <EligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onSelectUniversity={(uniName) => {
          setSelectedCountry('All');
          setSearchQuery(uniName);
          setCurrentTab('universities');
          setIsEligibilityOpen(false);
        }}
      />

      <UniversityModal
        university={selectedUniForDetails}
        onClose={() => setSelectedUniForDetails(null)}
        currency={currency}
        onBookConsultation={(uniName) => {
          setSelectedUniForDetails(null);
          handleOpenBookingForUni(uniName);
        }}
        onApply={(uni) => handleApplyNow(uni)}
      />

      <ComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedUniversities={comparedUniversities}
        onRemoveUniversity={(id) =>
          setComparedUniversities(comparedUniversities.filter((u) => u.id !== id))
        }
        currency={currency}
      />

      <CounsellingBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedUniversity={bookingPreselectedUni}
        onBookingSuccess={(apt) => {
          setAppointments([apt, ...appointments]);
          showToast(`Consultation confirmed for ${apt.date}!`);
        }}
      />

      {/* Footer */}
      <Footer onNavigate={(tab) => setCurrentTab(tab)} />
    </div>
  );
}
export default App;

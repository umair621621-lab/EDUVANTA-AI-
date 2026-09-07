import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  Users, 
  GraduationCap, 
  TrendingUp, 
  CheckCircle2, 
  Calendar, 
  DollarSign, 
  Phone, 
  Mail, 
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { University, LeadRecord, Application, ApplicationStage } from '../types';

interface AdminCRMProps {
  universities: University[];
  leads: LeadRecord[];
  applications: Application[];
  onAddUniversity: (uni: Partial<University>) => void;
  onUpdateUniversity: (id: string, uni: Partial<University>) => void;
  onDeleteUniversity: (id: string) => void;
  onUpdateLeadStatus: (id: string, newStatus: string) => void;
  onAddLead: (lead: Partial<LeadRecord>) => void;
  onUpdateApplicationStage: (id: string, newStage: ApplicationStage, statusName: string) => void;
}

export const AdminCRM: React.FC<AdminCRMProps> = ({
  universities,
  leads,
  applications,
  onAddUniversity,
  onUpdateUniversity,
  onDeleteUniversity,
  onUpdateLeadStatus,
  onAddLead,
  onUpdateApplicationStage
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'universities' | 'applications' | 'analytics'>('leads');
  const [leadSearch, setLeadSearch] = useState('');
  const [leadFilterStatus, setLeadFilterStatus] = useState('All');

  // New University Form State
  const [showAddUniModal, setShowAddUniModal] = useState(false);
  const [editingUniId, setEditingUniId] = useState<string | null>(null);
  const [uniFormData, setUniFormData] = useState<Partial<University>>({
    name: '',
    shortName: '',
    slug: '',
    country: 'United Kingdom',
    city: 'London',
    flag: '🇬🇧',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80',
    ranking: { qs: 50, the: 50, year: 2025, source: 'QS World University Rankings' },
    overview: '',
    acceptanceRate: '25%',
    tuitionRange: { min: 25000, max: 35000, currency: 'GBP', pkrApproxMin: '9,000,000', pkrApproxMax: '12,600,000' },
    livingCostAnnualUSD: 16000,
    livingCostAnnualPKR: '4,500,000',
    entryRequirements: { minGpa: '3.0 / 4.0', minPercentage: '70%+', ielts: 6.5 },
    popularPrograms: ['Computer Science', 'Business Administration', 'Data Analytics'],
    intakes: ['September (Fall)', 'January (Spring)'],
    deadlines: { fall: 'June 30' },
    scholarshipsAvailable: true,
    scholarshipDetails: 'International Merit Scholarship',
    campusType: 'Urban city campus',
    accommodation: 'On-campus student residence halls',
    website: 'https://',
    applicationFeeUSD: 50,
    verifiedBy: 'EduVanta Clifton Operations',
    tags: ['Verified 2025/2026', 'High Visa Ratio']
  });

  // New Lead Form State
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('+92 3');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadCity, setNewLeadCity] = useState('Karachi');
  const [newLeadCountry, setNewLeadCountry] = useState('United Kingdom');
  const [newLeadDegree, setNewLeadDegree] = useState('MSc Data Science');

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.phone.includes(leadSearch);
    const matchesStatus = leadFilterStatus === 'All' || l.status === leadFilterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSaveUniversity = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUniId) {
      onUpdateUniversity(editingUniId, uniFormData);
    } else {
      onAddUniversity({
        ...uniFormData,
        id: uniFormData.name?.toLowerCase().replace(/[^a-z0-9]/g, '-') || `uni-${Date.now()}`
      });
    }
    setShowAddUniModal(false);
    setEditingUniId(null);
  };

  const handleOpenEditUni = (uni: University) => {
    setEditingUniId(uni.id);
    setUniFormData(uni);
    setShowAddUniModal(true);
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLead({
      name: newLeadName,
      phone: newLeadPhone,
      email: newLeadEmail,
      city: newLeadCity,
      targetCountry: newLeadCountry,
      targetDegree: newLeadDegree,
      counsellorAssigned: 'Sir Tariq Mehmood',
      status: 'New',
      conversionProbability: 60,
      notes: 'Initial inquiry logged at Clifton desk.'
    });
    setShowAddLeadModal(false);
    setNewLeadName('');
    setNewLeadPhone('+92 3');
    setNewLeadEmail('');
  };

  const PIPELINE_STATUSES = ['New', 'Contacted', 'Qualified', 'Consultation', 'Application', 'Offer', 'Visa', 'Converted'];

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-display">EduVanta Operations & CRM Portal</h1>
                <span className="text-[11px] bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 px-2 py-0.5 rounded font-semibold">
                  Clifton Karachi HQ
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Oversee verified university marketplace, lead conversions, and application milestone tracking.
              </p>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-800 p-1.5 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'leads' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Leads Pipeline ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('universities')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'universities' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Universities ({universities.length})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'applications' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Applications ({applications.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'analytics' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Tab 1: Leads Pipeline */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Karachi Student Lead Pipeline</h2>
                <p className="text-xs text-slate-500">Track and advance prospective students across consultation stages.</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    placeholder="Search name, phone, email..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => setShowAddLeadModal(true)}
                  className="px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Lead</span>
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Student Name</th>
                    <th className="py-3 px-3">Contact</th>
                    <th className="py-3 px-3">Target Country & Course</th>
                    <th className="py-3 px-3">Counsellor</th>
                    <th className="py-3 px-3">Pipeline Stage</th>
                    <th className="py-3 px-3">Probability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        {lead.name}
                        <div className="text-[11px] text-slate-400 font-normal">{lead.city}</div>
                      </td>

                      <td className="py-3 px-3 text-slate-600 space-y-0.5">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{lead.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{lead.email}</span>
                        </div>
                      </td>

                      <td className="py-3 px-3 text-slate-700">
                        <div className="font-semibold text-blue-700">{lead.targetCountry}</div>
                        <div className="text-[11px] text-slate-500">{lead.targetDegree}</div>
                      </td>

                      <td className="py-3 px-3 text-slate-600 font-medium">
                        {lead.counsellorAssigned}
                      </td>

                      <td className="py-3 px-3">
                        <select
                          value={lead.status}
                          onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value)}
                          className={`rounded-lg px-2.5 py-1 text-xs font-bold border ${
                            lead.status === 'Offer' || lead.status === 'Converted'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : lead.status === 'Application'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          {PIPELINE_STATUSES.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-800">{lead.conversionProbability}%</span>
                          <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-500 h-full rounded-full"
                              style={{ width: `${lead.conversionProbability}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Universities Database Management */}
        {activeTab === 'universities' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Global Universities Catalog ({universities.length} Active Records)
                </h2>
                <p className="text-xs text-slate-500">
                  Add, update, or audit university tuition in PKR, IELTS thresholds, and intake deadlines.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingUniId(null);
                  setUniFormData({
                    name: '',
                    shortName: '',
                    country: 'United Kingdom',
                    city: 'Manchester',
                    flag: '🇬🇧',
                    ranking: { qs: 40, year: 2025, source: 'QS World' },
                    acceptanceRate: '30%',
                    tuitionRange: { min: 26000, max: 34000, currency: 'GBP', pkrApproxMin: '9,300,000', pkrApproxMax: '12,200,000' },
                    livingCostAnnualPKR: '4,500,000',
                    entryRequirements: { minGpa: '3.0 / 4.0', minPercentage: '70%+', ielts: 6.5 },
                    popularPrograms: ['Computer Science', 'Business Analytics'],
                    intakes: ['September (Fall)'],
                    deadlines: { fall: 'July 15' },
                    scholarshipsAvailable: true,
                    overview: 'Prestigious global institution.'
                  });
                  setShowAddUniModal(true);
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New University</span>
              </button>
            </div>

            {/* University Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">University</th>
                    <th className="py-3 px-3">QS Rank</th>
                    <th className="py-3 px-3">Country & City</th>
                    <th className="py-3 px-3">Tuition in PKR</th>
                    <th className="py-3 px-3">Requirements</th>
                    <th className="py-3 px-3">Last Verified</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {universities.map((uni) => (
                    <tr key={uni.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-2">
                        <span className="text-base">{uni.flag}</span>
                        <div>
                          <div className="font-bold">{uni.name}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{uni.shortName}</div>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[11px]">
                          QS #{uni.ranking.qs}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-slate-600">
                        {uni.city}, {uni.country}
                      </td>

                      <td className="py-3 px-3 text-slate-900 font-medium">
                        PKR {uni.tuitionRange.pkrApproxMin} - {uni.tuitionRange.pkrApproxMax}
                      </td>

                      <td className="py-3 px-3 text-slate-600">
                        <div>GPA {uni.entryRequirements.minGpa}</div>
                        <div className="text-blue-600 font-semibold text-[10px]">IELTS {uni.entryRequirements.ielts}+</div>
                      </td>

                      <td className="py-3 px-3 text-slate-500 text-[11px]">
                        <span className="text-emerald-700 font-medium">{uni.lastVerifiedDate}</span>
                      </td>

                      <td className="py-3 px-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditUni(uni)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteUniversity(uni.id)}
                          className="text-rose-500 hover:text-rose-700 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Applications Operations */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-900">
              Student Application Pipeline Management
            </h2>
            <p className="text-xs text-slate-500">
              Advance applicant stages from Offer Issued to CAS/I-20 Issuance, Deposit, and Visa Approved.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Student Name</th>
                    <th className="py-3 px-3">University & Course</th>
                    <th className="py-3 px-3">Assigned Counsellor</th>
                    <th className="py-3 px-3">Current Status</th>
                    <th className="py-3 px-3">Advance Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        {app.studentName}
                        <div className="text-[10px] text-slate-400">{app.studentPhone}</div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-800">{app.universityName}</div>
                        <div className="text-blue-600 text-[11px]">{app.courseTitle}</div>
                      </td>

                      <td className="py-3 px-3 text-slate-600">
                        {app.counsellorName}
                      </td>

                      <td className="py-3 px-3">
                        <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-[11px]">
                          {app.status}
                        </span>
                      </td>

                      <td className="py-3 px-3 space-x-1">
                        <button
                          onClick={() => onUpdateApplicationStage(app.id, 'offer', 'Offer Issued')}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-semibold text-slate-700"
                        >
                          Mark Offer
                        </button>
                        <button
                          onClick={() => onUpdateApplicationStage(app.id, 'deposit', 'Deposit Paid')}
                          className="px-2 py-1 bg-amber-50 hover:bg-amber-100 rounded text-[10px] font-semibold text-amber-800"
                        >
                          Deposit
                        </button>
                        <button
                          onClick={() => onUpdateApplicationStage(app.id, 'approved', 'Visa Approved')}
                          className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 rounded text-[10px] font-semibold text-emerald-800"
                        >
                          Visa Approved
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Analytics */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Overall Visa Approval Rate
              </div>
              <div className="text-3xl font-extrabold text-emerald-600">98.4%</div>
              <p className="text-xs text-slate-500">
                Karachi office track record across UK CAS, US F-1, and Canada Study Permits.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Average Scholarship Awarded
              </div>
              <div className="text-3xl font-extrabold text-blue-600">PKR 3.4M</div>
              <p className="text-xs text-slate-500">
                Tuition fee waivers negotiated per successful postgraduate applicant.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Top Chosen Destination
              </div>
              <div className="text-3xl font-extrabold text-amber-600">United Kingdom 🇬🇧</div>
              <p className="text-xs text-slate-500">
                Driven by 1-year master’s duration and 2-year Graduate Route post-study rights.
              </p>
            </div>
          </div>
        )}

        {/* Add/Edit University Modal */}
        {showAddUniModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-bold text-slate-900 font-display">
                {editingUniId ? 'Edit University Details' : 'Add New University to EduVanta'}
              </h3>

              <form onSubmit={handleSaveUniversity} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">University Name</label>
                    <input
                      type="text"
                      required
                      value={uniFormData.name}
                      onChange={(e) => setUniFormData({ ...uniFormData, name: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Short Name / Abbr</label>
                    <input
                      type="text"
                      required
                      value={uniFormData.shortName}
                      onChange={(e) => setUniFormData({ ...uniFormData, shortName: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Country</label>
                    <input
                      type="text"
                      required
                      value={uniFormData.country}
                      onChange={(e) => setUniFormData({ ...uniFormData, country: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={uniFormData.city}
                      onChange={(e) => setUniFormData({ ...uniFormData, city: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">QS World Ranking</label>
                    <input
                      type="number"
                      required
                      value={uniFormData.ranking?.qs}
                      onChange={(e) =>
                        setUniFormData({
                          ...uniFormData,
                          ranking: { ...uniFormData.ranking!, qs: Number(e.target.value) }
                        })
                      }
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Min Tuition (Local Currency)</label>
                    <input
                      type="number"
                      value={uniFormData.tuitionRange?.min}
                      onChange={(e) =>
                        setUniFormData({
                          ...uniFormData,
                          tuitionRange: { ...uniFormData.tuitionRange!, min: Number(e.target.value) }
                        })
                      }
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">PKR Approx Max</label>
                    <input
                      type="text"
                      value={uniFormData.tuitionRange?.pkrApproxMax}
                      onChange={(e) =>
                        setUniFormData({
                          ...uniFormData,
                          tuitionRange: { ...uniFormData.tuitionRange!, pkrApproxMax: e.target.value }
                        })
                      }
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Overview</label>
                  <textarea
                    rows={3}
                    value={uniFormData.overview}
                    onChange={(e) => setUniFormData({ ...uniFormData, overview: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddUniModal(false)}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                  >
                    Save to Directory
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Lead Modal */}
        {showAddLeadModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Add New Student Lead (Karachi Desk)</h3>

              <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    placeholder="e.g. Daniyal Siddiqui"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">WhatsApp / Phone</label>
                  <input
                    type="tel"
                    required
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newLeadEmail}
                    onChange={(e) => setNewLeadEmail(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Target Country</label>
                    <select
                      value={newLeadCountry}
                      onChange={(e) => setNewLeadCountry(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-2.5 py-2 text-xs"
                    >
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="Ireland">Ireland</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      value={newLeadCity}
                      onChange={(e) => setNewLeadCity(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-2.5 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddLeadModal(false)}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                  >
                    Create Lead
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

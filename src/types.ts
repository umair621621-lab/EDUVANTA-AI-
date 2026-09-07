export type UserRole = 'student' | 'counsellor' | 'admin' | 'superadmin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  country: string;
  city?: string;
  targetDestination?: string;
  targetDegree?: string;
  avatar?: string;
  createdAt: string;
  emailVerified: boolean;
}

export interface UniversityRanking {
  qs: number;
  the?: number;
  year: number;
  source: string;
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  country: string;
  city: string;
  flag: string;
  logo: string;
  coverImage: string;
  ranking: UniversityRanking;
  overview: string;
  acceptanceRate: string;
  tuitionRange: {
    min: number;
    max: number;
    currency: string;
    pkrApproxMin: string;
    pkrApproxMax: string;
  };
  livingCostAnnualUSD: number;
  livingCostAnnualPKR: string;
  entryRequirements: {
    minGpa: string;
    minPercentage: string;
    ielts: number;
    pte?: number;
    toefl?: number;
    notes?: string;
  };
  popularPrograms: string[];
  intakes: string[];
  deadlines: {
    fall: string;
    spring?: string;
    notes?: string;
  };
  scholarshipsAvailable: boolean;
  scholarshipDetails: string;
  campusType: string;
  accommodation: string;
  website: string;
  applicationFeeUSD: number;
  lastVerifiedDate: string;
  verifiedBy: string;
  tags: string[];
}

export interface Course {
  id: string;
  universityId: string;
  universityName: string;
  country: string;
  city: string;
  title: string;
  degreeLevel: 'Bachelors' | 'Masters' | 'PhD' | 'Diploma' | 'Foundation';
  discipline: string;
  duration: string;
  tuitionAnnualUSD: number;
  tuitionAnnualLocal: string;
  tuitionAnnualPKR: string;
  ieltsMin: number;
  pteMin?: number;
  intakes: string[];
  applicationDeadline: string;
  scholarshipAvailable: boolean;
  careerOutcomes: string[];
  description: string;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: 'Government' | 'University' | 'External' | 'Trust';
  country: string;
  universityName?: string;
  coverageType: 'Full Ride' | 'Full Tuition' | 'Partial Tuition' | 'Stipend + Flights' | 'Fixed Grant';
  amountDescription: string;
  amountPKR: string;
  eligibilityCriteria: string[];
  pakistaniEligible: boolean;
  deadline: string;
  studyLevel: string[];
  applicationUrl: string;
  meritBased: boolean;
  needBased: boolean;
  tips: string;
}

export interface StudentProfileAssessment {
  qualification: string;
  institution: string;
  gpaOrPercentage: string;
  graduationYear: string;
  englishTest: string;
  englishScore: string;
  budgetPKR: string;
  budgetUSD: string;
  targetCountry: string;
  targetCity?: string;
  studyLevel: string;
  targetField: string;
  workExpYears: string;
  careerGoals?: string;
  intake: string;
}

export interface AIEligibilityResult {
  score: number; // 0 to 100
  summary: string;
  categorizedUniversities: {
    safe: { name: string; country: string; matchReason: string }[];
    target: { name: string; country: string; matchReason: string }[];
    ambitious: { name: string; country: string; matchReason: string }[];
  };
  recommendedCourses: string[];
  missingRequirements: string[];
  englishAnalysis: string;
  financialFeasibility: string;
  personalizedRoadmap: {
    step: number;
    title: string;
    timeframe: string;
    description: string;
  }[];
  disclaimer: string;
}

export type ApplicationStage =
  | 'profile'
  | 'counselling'
  | 'selected'
  | 'documents'
  | 'submitted'
  | 'offer'
  | 'deposit'
  | 'visa'
  | 'approved'
  | 'predeparture'
  | 'arrived';

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  universityId: string;
  universityName: string;
  courseTitle: string;
  degreeLevel: string;
  intake: string;
  stage: ApplicationStage;
  status: 'In Review' | 'Action Required' | 'Offer Issued' | 'Conditional Offer' | 'Deposit Paid' | 'Visa Processing' | 'Visa Approved' | 'Completed';
  appliedDate: string;
  deadline: string;
  counsellorId: string;
  counsellorName: string;
  notes: string[];
  documentsCount: number;
  totalDocumentsRequired: number;
  offerLetterUrl?: string;
  casOrI20Number?: string;
}

export type DocumentStatus =
  | 'Missing'
  | 'Uploaded'
  | 'Under Review'
  | 'Verified'
  | 'Rejected'
  | 'Replacement Required';

export interface DocumentItem {
  id: string;
  studentId: string;
  type: string;
  fileName?: string;
  fileSize?: string;
  uploadedAt?: string;
  status: DocumentStatus;
  reviewerNotes?: string;
  fileUrl?: string;
  isRequired: boolean;
}

export interface Counsellor {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  destinations: string[];
  specialization: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  availableSlots: string[];
  languages: string[];
  phone: string;
  email: string;
  image: string;
  officeLocation: string;
}

export interface Appointment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  counsellorId: string;
  counsellorName: string;
  date: string;
  time: string;
  consultationType: 'Free WhatsApp Consultation' | 'In-Person (Clifton Karachi Office)' | 'Video Zoom Call';
  destinationOfInterest: string;
  status: 'Confirmed' | 'Completed' | 'Rescheduled' | 'Cancelled';
  notes?: string;
  createdAt: string;
}

export interface CountryGuide {
  id: string;
  name: string;
  code: string;
  flag: string;
  heroImage: string;
  tagline: string;
  whyStudyHere: string[];
  avgTuitionPerYearUSD: string;
  avgTuitionPerYearPKR: string;
  avgLivingCostPerYearUSD: string;
  avgLivingCostPerYearPKR: string;
  postStudyWorkVisa: string;
  workRightsDuringStudy: string;
  topUniversities: string[];
  keyIntakes: string[];
  visaRequirements: string[];
  pakistaniCommunityInsight: string;
  financialProofRequiredPKR: string;
}

export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  targetCountry: string;
  targetDegree: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Consultation' | 'Application' | 'Offer' | 'Visa' | 'Converted';
  counsellorAssigned: string;
  createdAt: string;
  lastContact: string;
  conversionProbability: number;
  notes: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'counsellor';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string }[];
}

export interface CostCalculationParams {
  destination: string;
  studyLevel: string;
  programType: string;
  durationYears: number;
  tuitionAnnualLocal: number;
  livingStyle: 'budget' | 'standard' | 'comfortable';
  cityTier: 'major' | 'standard'; // e.g. London/NYC vs Leeds/Manchester
  includeHealthInsurance: boolean;
  includeFlightFromPakistan: boolean;
  scholarshipDeductionUSD: number;
}

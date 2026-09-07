import { UNIVERSITIES } from './universities';
import { ADDITIONAL_UNIVERSITIES } from './moreUniversities';
import { COURSES } from './courses';
import { SCHOLARSHIPS } from './scholarships';
import { COUNSELLORS, COUNTRY_GUIDES } from './counsellors';
import { Application, DocumentItem, LeadRecord, Appointment, User } from '../types';

export const ALL_UNIVERSITIES = [...UNIVERSITIES, ...ADDITIONAL_UNIVERSITIES];
export { COURSES, SCHOLARSHIPS, COUNSELLORS, COUNTRY_GUIDES };

export const INITIAL_USER: User = {
  id: 'usr-student-1',
  name: 'Hamza Khan',
  email: 'hamza.khan@example.com',
  role: 'student',
  phone: '+92 300 1234567',
  country: 'Pakistan',
  city: 'Karachi',
  targetDestination: 'United Kingdom',
  targetDegree: 'Masters in Computer Science / AI',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
  createdAt: '2026-08-01',
  emailVerified: true
};

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-101',
    studentId: 'usr-student-1',
    studentName: 'Hamza Khan',
    studentEmail: 'hamza.khan@example.com',
    studentPhone: '+92 300 1234567',
    universityId: 'imperial',
    universityName: 'Imperial College London',
    courseTitle: 'MSc Artificial Intelligence',
    degreeLevel: 'Masters',
    intake: 'October 2026',
    stage: 'offer',
    status: 'Offer Issued',
    appliedDate: '2026-06-15',
    deadline: '2026-09-01',
    counsellorId: 'c-tariq',
    counsellorName: 'Sir Tariq Mehmood',
    notes: [
      'Application submitted with 1st Class Honours from FAST-NUCES Karachi.',
      'Conditional Offer letter received (£2,000 deposit required to confirm CAS).'
    ],
    documentsCount: 6,
    totalDocumentsRequired: 7,
    offerLetterUrl: '#',
    casOrI20Number: 'CAS-UK-9942817'
  },
  {
    id: 'app-102',
    studentId: 'usr-student-1',
    studentName: 'Hamza Khan',
    studentEmail: 'hamza.khan@example.com',
    studentPhone: '+92 300 1234567',
    universityId: 'manchester',
    universityName: 'University of Manchester',
    courseTitle: 'MSc Advanced Computer Science',
    degreeLevel: 'Masters',
    intake: 'September 2026',
    stage: 'deposit',
    status: 'Deposit Paid',
    appliedDate: '2026-05-20',
    deadline: '2026-08-15',
    counsellorId: 'c-tariq',
    counsellorName: 'Sir Tariq Mehmood',
    notes: [
      'Unconditional Offer received.',
      '£1,000 deposit paid via Flywire.',
      'Awaiting CAS issuance from admissions office.'
    ],
    documentsCount: 7,
    totalDocumentsRequired: 7,
    casOrI20Number: 'CAS-MAN-883910'
  },
  {
    id: 'app-103',
    studentId: 'usr-student-1',
    studentName: 'Hamza Khan',
    studentEmail: 'hamza.khan@example.com',
    studentPhone: '+92 300 1234567',
    universityId: 'tum',
    universityName: 'Technical University of Munich (TUM)',
    courseTitle: 'MSc Informatics',
    degreeLevel: 'Masters',
    intake: 'October 2026',
    stage: 'documents',
    status: 'In Review',
    appliedDate: '2026-07-02',
    deadline: '2026-08-31',
    counsellorId: 'c-hamza',
    counsellorName: 'Engr. Hamza Farooq',
    notes: [
      'APS certificate verified by German Embassy Islamabad.',
      'TUMonline portal documents uploaded, under faculty review.'
    ],
    documentsCount: 5,
    totalDocumentsRequired: 6
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    studentId: 'usr-student-1',
    type: 'Passport',
    fileName: 'Hamza_Khan_Passport_Valid2030.pdf',
    fileSize: '1.8 MB',
    uploadedAt: '2026-08-05',
    status: 'Verified',
    reviewerNotes: 'Valid biometric passport with >3 years remaining validity.',
    isRequired: true
  },
  {
    id: 'doc-2',
    studentId: 'usr-student-1',
    type: 'Academic Transcripts',
    fileName: 'FAST_NU_Official_Transcript_CGPA_3_71.pdf',
    fileSize: '3.4 MB',
    uploadedAt: '2026-08-06',
    status: 'Verified',
    reviewerNotes: 'HEC attested official transcript verified.',
    isRequired: true
  },
  {
    id: 'doc-3',
    studentId: 'usr-student-1',
    type: 'Degree Certificate',
    fileName: 'BS_Computer_Science_Degree_Certificate.pdf',
    fileSize: '2.1 MB',
    uploadedAt: '2026-08-06',
    status: 'Verified',
    reviewerNotes: 'Degree confirmed with HEC seal.',
    isRequired: true
  },
  {
    id: 'doc-4',
    studentId: 'usr-student-1',
    type: 'IELTS / English Score',
    fileName: 'IELTS_Academic_TRF_Overall_7_5.pdf',
    fileSize: '1.2 MB',
    uploadedAt: '2026-08-10',
    status: 'Verified',
    reviewerNotes: 'TRF 24PK009181K: Overall 7.5 (L:8.5, R:8.0, W:7.0, S:7.0). Meets direct entry requirements.',
    isRequired: true
  },
  {
    id: 'doc-5',
    studentId: 'usr-student-1',
    type: 'Statement of Purpose (SOP)',
    fileName: 'SOP_AI_Specialization_Imperial_Manchester.docx',
    fileSize: '450 KB',
    uploadedAt: '2026-08-12',
    status: 'Verified',
    reviewerNotes: 'Polished by EduVanta editorial team with strong technical narrative.',
    isRequired: true
  },
  {
    id: 'doc-6',
    studentId: 'usr-student-1',
    type: 'Bank Statement / Proof of Funds',
    fileName: 'Meezan_Bank_6Month_Statement.pdf',
    fileSize: '4.2 MB',
    uploadedAt: '2026-08-20',
    status: 'Under Review',
    reviewerNotes: 'Under 28-day holding period verification by Ms. Fatima Zahra.',
    isRequired: true
  },
  {
    id: 'doc-7',
    studentId: 'usr-student-1',
    type: 'Letters of Recommendation',
    fileName: '',
    fileSize: '',
    uploadedAt: '',
    status: 'Missing',
    reviewerNotes: 'Pending 2nd academic reference letter from Dr. Zafar (FAST-NUCES).',
    isRequired: true
  }
];

export const INITIAL_LEADS: LeadRecord[] = [
  {
    id: 'lead-1',
    name: 'Zainab Qureshi',
    email: 'zainab.q@gmail.com',
    phone: '+92 312 4591029',
    city: 'Karachi (DHA)',
    targetCountry: 'United Kingdom',
    targetDegree: 'BSc Biomedical Science',
    status: 'Consultation',
    counsellorAssigned: 'Sir Tariq Mehmood',
    createdAt: '2026-08-28',
    lastContact: '2026-09-02',
    conversionProbability: 85,
    notes: 'A-Levels: 3 As. Interested in KCL & Edinburgh. Father willing to self-fund.'
  },
  {
    id: 'lead-2',
    name: 'Muhammad Bilal',
    email: 'bilal.m@yahoo.com',
    phone: '+92 333 9918234',
    city: 'Karachi (Gulshan-e-Iqbal)',
    targetCountry: 'Germany',
    targetDegree: 'MSc Mechanical Engineering',
    status: 'Qualified',
    counsellorAssigned: 'Engr. Hamza Farooq',
    createdAt: '2026-08-30',
    lastContact: '2026-09-04',
    conversionProbability: 75,
    notes: 'NED University graduate, 3.4 CGPA. Seeking TU9 free tuition programs with English medium.'
  },
  {
    id: 'lead-3',
    name: 'Anum Fatima',
    email: 'anum.fatima99@gmail.com',
    phone: '+92 301 5566778',
    city: 'Hyderabad',
    targetCountry: 'Canada',
    targetDegree: 'Master of Data Science',
    status: 'Application',
    counsellorAssigned: 'Dr. Ayesha Siddiqui',
    createdAt: '2026-08-15',
    lastContact: '2026-09-05',
    conversionProbability: 90,
    notes: 'Applying to Toronto and UBC. IELTS 7.5. GIC account initiated.'
  },
  {
    id: 'lead-4',
    name: 'Saad Ur Rehman',
    email: 'saad.rehman@gmail.com',
    phone: '+92 321 7788990',
    city: 'Karachi (PECHS)',
    targetCountry: 'Australia',
    targetDegree: 'Master of Information Technology',
    status: 'Offer',
    counsellorAssigned: 'Ms. Fatima Zahra',
    createdAt: '2026-07-20',
    lastContact: '2026-09-03',
    conversionProbability: 95,
    notes: 'Offer letter from UNSW received. Funds documentation in progress.'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    studentId: 'usr-student-1',
    studentName: 'Hamza Khan',
    studentEmail: 'hamza.khan@example.com',
    studentPhone: '+92 300 1234567',
    counsellorId: 'c-tariq',
    counsellorName: 'Sir Tariq Mehmood',
    date: '2026-09-09',
    time: '03:00 PM',
    consultationType: 'In-Person (Clifton Karachi Office)',
    destinationOfInterest: 'United Kingdom (Imperial / Manchester)',
    status: 'Confirmed',
    notes: 'CAS statement check and TB appointment preparation.',
    createdAt: '2026-09-05'
  }
];

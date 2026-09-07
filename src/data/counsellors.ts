import { Counsellor, CountryGuide } from '../types';

export const COUNSELLORS: Counsellor[] = [
  {
    id: 'c-tariq',
    name: 'Sir Tariq Mehmood',
    title: 'Senior Director & UK/Ireland Advisory Head',
    experienceYears: 14,
    destinations: ['United Kingdom', 'Ireland'],
    specialization: 'Russell Group Admissions, CAS & UK Student Visa Compliance, Chevening Coaching',
    bio: 'Former British Council certified education trainer with 14+ years guiding over 2,400 students from Karachi, Lahore, and Islamabad into Oxford, Imperial, Manchester, and Trinity College Dublin.',
    rating: 4.9,
    reviewsCount: 342,
    availableSlots: ['Today 03:00 PM', 'Today 05:30 PM', 'Tomorrow 11:00 AM', 'Tomorrow 04:00 PM'],
    languages: ['Urdu', 'English', 'Punjabi'],
    phone: '+92 300 2489911',
    email: 'tariq.mehmood@eduvanta.pk',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    officeLocation: 'Suite 402, Al-Khaleej Towers, Main Clifton, Karachi'
  },
  {
    id: 'c-ayesha',
    name: 'Dr. Ayesha Siddiqui',
    title: 'Head of North America Admissions & STEM Advisor',
    experienceYears: 11,
    destinations: ['United States', 'Canada'],
    specialization: 'Ivy League & U15 Canada, Co-op Optimization, F-1 / Study Permit Visa Filing',
    bio: 'McGill alumna with specialized expertise in Canadian PGWP strategies, US Assistantships (TA/RA), and scholarship essays for high-achieving Pakistani students.',
    rating: 5.0,
    reviewsCount: 289,
    availableSlots: ['Today 04:30 PM', 'Tomorrow 02:00 PM', 'Thursday 11:30 AM'],
    languages: ['Urdu', 'English', 'Sindhi'],
    phone: '+92 301 8892211',
    email: 'ayesha.siddiqui@eduvanta.pk',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    officeLocation: 'Suite 402, Al-Khaleej Towers, Main Clifton, Karachi'
  },
  {
    id: 'c-hamza',
    name: 'Engr. Hamza Farooq',
    title: 'Europe & Low-Tuition Destination Specialist',
    experienceYears: 8,
    destinations: ['Germany', 'Malaysia', 'United Arab Emirates'],
    specialization: 'German Free Tuition (TU9), APS Verification, Blocked Account, DAAD, Malaysia Fast-Track',
    bio: 'Graduated from RWTH Aachen and specialist in German APS procedure for Pakistanis, blocked account documentation (Expatrio/Coracle), and budget-optimized pathways.',
    rating: 4.8,
    reviewsCount: 215,
    availableSlots: ['Today 02:00 PM', 'Tomorrow 03:00 PM', 'Friday 04:00 PM'],
    languages: ['Urdu', 'English', 'German (B2)'],
    phone: '+92 333 4567890',
    email: 'hamza.farooq@eduvanta.pk',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    officeLocation: 'Suite 402, Al-Khaleej Towers, Main Clifton, Karachi'
  },
  {
    id: 'c-fatima',
    name: 'Ms. Fatima Zahra',
    title: 'Chief Visa & Financial Compliance Officer',
    experienceYears: 12,
    destinations: ['Australia', 'New Zealand', 'United Kingdom'],
    specialization: 'Genuine Student (GS) Australia Assessment, Bank Statement Audits, Visa Refusal Appeal',
    bio: 'Specialized in strict Australian Genuine Student (GS) compliance, funds verification with Pakistani FBR tax returns, and foolproof visa documentation.',
    rating: 4.9,
    reviewsCount: 310,
    availableSlots: ['Today 05:00 PM', 'Tomorrow 10:30 AM', 'Tomorrow 01:30 PM'],
    languages: ['Urdu', 'English'],
    phone: '+92 321 9988776',
    email: 'fatima.zahra@eduvanta.pk',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    officeLocation: 'Suite 402, Al-Khaleej Towers, Main Clifton, Karachi'
  }
];

export const COUNTRY_GUIDES: CountryGuide[] = [
  {
    id: 'uk',
    name: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80',
    tagline: '1-Year Master’s & 2-Year Graduate Route Post-Study Work Rights',
    whyStudyHere: [
      'Fast-track 1-Year Master’s degree saves 50% on living and tuition expenses compared to 2-year programs.',
      '2-Year Graduate Route post-study work visa without job sponsorship requirements.',
      'Globally respected degrees with Oxford, Cambridge, and Imperial leading world university tables.',
      'Huge established Pakistani community with halal food, mosques, and direct flights from Karachi/Lahore/Islamabad.'
    ],
    avgTuitionPerYearUSD: '$28,000 - $38,000',
    avgTuitionPerYearPKR: 'PKR 7,800,000 - 10,600,000',
    avgLivingCostPerYearUSD: '$14,000 - $18,000 (Outer London)',
    avgLivingCostPerYearPKR: 'PKR 3,900,000 - 5,000,000',
    postStudyWorkVisa: '2 Years (Graduate Route) / 3 Years for PhD',
    workRightsDuringStudy: '20 hours/week during term, full-time during vacations',
    topUniversities: ['Oxford', 'Cambridge', 'Imperial', 'UCL', 'Edinburgh', 'Manchester', 'King’s College', 'Leeds'],
    keyIntakes: ['September/October (Major)', 'January/February (Secondary)'],
    visaRequirements: [
      'Confirmation of Acceptance for Studies (CAS) from a licensed UK sponsor.',
      '28-day maintenance funds in bank account (Tuition balance + £1,023/month for 9 months outside London, or £1,334/month inside London).',
      'IHS (Immigration Health Surcharge) payment (~£776/year).',
      'Tuberculosis (TB) test certificate from IOM Pakistan (Karachi, Lahore, or Islamabad).'
    ],
    pakistaniCommunityInsight: 'Over 1.6 million British-Pakistanis reside in the UK with massive support systems in London, Birmingham, Manchester, Bradford, and Glasgow.',
    financialProofRequiredPKR: 'Approx PKR 7,500,000 to 11,000,000 held for 28 consecutive days'
  },
  {
    id: 'usa',
    name: 'United States',
    code: 'US',
    flag: '🇺🇸',
    heroImage: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&auto=format&fit=crop&q=80',
    tagline: 'World Capital of Innovation with 3-Year STEM OPT Work Extensions',
    whyStudyHere: [
      'Home to the Ivy League and world #1 tech innovators (MIT, Stanford, Harvard, UC Berkeley).',
      '3-Year STEM OPT (Optional Practical Training) work authorization allows Pakistani STEM grads to work in the US.',
      'Extensive Graduate Assistantships (RA/TA) providing full tuition waivers + $2,000/mo stipends.',
      'Unmatched venture capital funding and tech industry networking opportunities.'
    ],
    avgTuitionPerYearUSD: '$32,000 - $60,000',
    avgTuitionPerYearPKR: 'PKR 8,900,000 - 16,800,000',
    avgLivingCostPerYearUSD: '$14,000 - $22,000',
    avgLivingCostPerYearPKR: 'PKR 3,900,000 - 6,100,000',
    postStudyWorkVisa: '1 Year OPT + 2 Years STEM Extension (Total 3 Years)',
    workRightsDuringStudy: '20 hours/week on-campus only',
    topUniversities: ['MIT', 'Harvard', 'Stanford', 'UC Berkeley', 'Columbia', 'Georgia Tech', 'Purdue', 'NYU'],
    keyIntakes: ['Fall (August/September - Major)', 'Spring (January)'],
    visaRequirements: [
      'Form I-20 issued by SEVP-certified institution.',
      'SEVIS I-901 fee payment ($350).',
      'DS-160 visa form and in-person US Embassy visa interview (Islamabad or Karachi Consulate).',
      'Proof of strong ties to Pakistan and verifiable source of funds.'
    ],
    pakistaniCommunityInsight: 'Active Pakistani student associations (PSAs) across all major campuses, with large Pakistani diasporas in Houston, New York, Chicago, and Dallas.',
    financialProofRequiredPKR: 'Approx PKR 15,000,000 to 22,000,000 for 1st year expenses'
  },
  {
    id: 'canada',
    name: 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    heroImage: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop&q=80',
    tagline: 'World-Class Education, Paid Co-op, and 3-Year Post-Graduation Work Permits',
    whyStudyHere: [
      'Up to 3-Year Post-Graduation Work Permit (PGWP) for programs of 2 years or longer.',
      'High-paying co-op programs (Waterloo, Toronto, McMaster) allowing students to offset costs.',
      'Safe, welcoming multicultural society with universal healthcare and friendly immigration options.',
      'Significantly more affordable tuition than private US universities with equal global prestige.'
    ],
    avgTuitionPerYearUSD: '$25,000 - $42,000 CAD',
    avgTuitionPerYearPKR: 'PKR 5,000,000 - 8,400,000',
    avgLivingCostPerYearUSD: '$20,635 CAD (Official IRCC requirement)',
    avgLivingCostPerYearPKR: 'PKR 4,100,000',
    postStudyWorkVisa: 'Up to 3 Years (PGWP)',
    workRightsDuringStudy: '24 hours/week off-campus during academic sessions',
    topUniversities: ['University of Toronto', 'McGill', 'UBC', 'Waterloo', 'McMaster', 'Alberta'],
    keyIntakes: ['Fall (September - Major)', 'Winter (January)', 'Summer (May)'],
    visaRequirements: [
      'Letter of Acceptance (LOA) with Provincial Attestation Letter (PAL).',
      'Guaranteed Investment Certificate (GIC) of $20,635 CAD deposited in Canadian bank.',
      'Payment of 1st year tuition fee.',
      'Upfront medical exam through IOM Pakistan and biometrics at VFS Global Karachi/Lahore.'
    ],
    pakistaniCommunityInsight: 'Vibrant Pakistani community in the Greater Toronto Area (Mississauga, Milton, Brampton) and Metro Vancouver.',
    financialProofRequiredPKR: 'GIC (~PKR 4.2M) + 1st Year Tuition (~PKR 5M - 8M)'
  },
  {
    id: 'australia',
    name: 'Australia',
    code: 'AU',
    flag: '🇦🇺',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
    tagline: 'Group of Eight Excellence, High Minimum Wages, & 485 Graduate Visas',
    whyStudyHere: [
      'High minimum hourly wage ($23.23 AUD/hr) providing solid part-time student income.',
      '7 universities in the global Top 50 (Group of Eight).',
      'Subclass 485 Temporary Graduate Visa provides 2 to 4 years post-study work authorization.',
      'Sunny climate, relaxed lifestyle, and warm multicultural cities.'
    ],
    avgTuitionPerYearUSD: '$36,000 - $52,000 AUD',
    avgTuitionPerYearPKR: 'PKR 6,800,000 - 9,800,000',
    avgLivingCostPerYearUSD: '$29,710 AUD (Official Home Affairs requirement)',
    avgLivingCostPerYearPKR: 'PKR 5,600,000',
    postStudyWorkVisa: '2 to 4 Years (Subclass 485) + Extra 1-2 years for regional areas',
    workRightsDuringStudy: '48 hours per fortnight during study terms',
    topUniversities: ['Melbourne', 'Sydney', 'UNSW', 'ANU', 'Monash', 'UQ', 'UWA', 'Adelaide'],
    keyIntakes: ['Semester 1 (February - Major)', 'Semester 2 (July)'],
    visaRequirements: [
      'Confirmation of Enrolment (CoE) from registered CRICOS provider.',
      'Genuine Student (GS) assessment demonstration.',
      'Proof of financial capacity ($29,710 AUD living + tuition + travel).',
      'Overseas Student Health Cover (OSHC) for full visa duration.'
    ],
    pakistaniCommunityInsight: 'Strong community in Melbourne (Tarneit, Dandenong) and Sydney (Auburn, Parramatta, Lakemba) with Halal dining everywhere.',
    financialProofRequiredPKR: 'Approx PKR 12,000,000 to 16,000,000 verified funds'
  },
  {
    id: 'germany',
    name: 'Germany',
    code: 'DE',
    flag: '🇩🇪',
    heroImage: 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=800&auto=format&fit=crop&q=80',
    tagline: '€0 Tuition Fees in Public Universities & 18-Month Jobseeker Visa',
    whyStudyHere: [
      'Tuition is completely FREE (€0) at public universities across 15 German states.',
      '18-month post-study work search visa with fastest permanent residency pathway in Europe.',
      'Taught in English: hundreds of STEM, data science, and business master’s degrees require NO German.',
      'Powerhouse industrial economy: high demand for Pakistani engineers and IT professionals.'
    ],
    avgTuitionPerYearUSD: '€0 - €3,000 (Semester contribution €250-€350)',
    avgTuitionPerYearPKR: 'PKR 0 - 900,000 (Virtually Free!)',
    avgLivingCostPerYearUSD: '€11,904 (Official Blocked Account requirement)',
    avgLivingCostPerYearPKR: 'PKR 3,600,000',
    postStudyWorkVisa: '18 Months Jobseeker Visa leading directly to EU Blue Card',
    workRightsDuringStudy: '140 full days or 280 half days per year',
    topUniversities: ['TUM', 'LMU Munich', 'Heidelberg', 'RWTH Aachen', 'FU Berlin', 'TU Berlin'],
    keyIntakes: ['Winter Semester (October - Major)', 'Summer Semester (April)'],
    visaRequirements: [
      'APS (Akademische Prüfstelle) Certificate from German Embassy Islamabad (MANDATORY for Pakistanis).',
      'Blocked Account (Sperrkonto) with €11,904 deposited in Expatrio/Coracle/Fintiba.',
      'Proof of admission from a recognized German university.',
      'Public or statutory health insurance (TK / Barmer / AOK).'
    ],
    pakistaniCommunityInsight: 'Thriving Pakistani student and alumni networks in Munich, Berlin, Frankfurt, Aachen, and Stuttgart.',
    financialProofRequiredPKR: 'Blocked Account (€11,904 ≈ PKR 3,600,000) only — no other tuition needed!'
  },
  {
    id: 'ireland',
    name: 'Ireland',
    code: 'IE',
    flag: '🇮🇪',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80',
    tagline: 'Silicon Docks Tech Capital, English-Speaking EU Member, 2-Year Stay Back',
    whyStudyHere: [
      'Only native English-speaking country remaining in the European Union.',
      '2-Year Stay Back visa (Third Level Graduate Scheme) for Master’s graduates.',
      'European headquarters for Google, Apple, Meta, Stripe, Pfizer, TikTok, and Microsoft.',
      'High visa success rates and friendly welcoming culture for international students.'
    ],
    avgTuitionPerYearUSD: '€18,000 - €28,000',
    avgTuitionPerYearPKR: 'PKR 5,400,000 - 8,400,000',
    avgLivingCostPerYearUSD: '€10,000 - €14,000',
    avgLivingCostPerYearPKR: 'PKR 3,000,000 - 4,200,000',
    postStudyWorkVisa: '2 Years (Third Level Graduate Scheme) for Masters',
    workRightsDuringStudy: '20 hours/week during term, 40 hours/week in holidays',
    topUniversities: ['Trinity College Dublin', 'University College Dublin (UCD)', 'University of Galway', 'UCC Cork'],
    keyIntakes: ['September (Major)', 'January (Selected)'],
    visaRequirements: [
      'Unconditional offer letter from eligible Irish higher education institution.',
      'Proof of full fees paid to university.',
      'Financial proof showing €10,000 readily accessible for living expenses.',
      'Private medical insurance covering minimum €25,000.'
    ],
    pakistaniCommunityInsight: 'Close-knit Pakistani community in Dublin, Cork, and Galway with active medical and IT associations.',
    financialProofRequiredPKR: 'Approx PKR 7,500,000 to 10,000,000'
  }
];

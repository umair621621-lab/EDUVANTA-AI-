import { Scholarship } from '../types';

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'sch-chevening',
    name: 'Chevening Scholarships (UK Foreign, Commonwealth & Development Office)',
    provider: 'Government',
    country: 'United Kingdom',
    coverageType: 'Full Ride',
    amountDescription: '100% tuition fees, monthly living allowance (~£1,400/mo), return economy flights from Pakistan, and visa application fee.',
    amountPKR: 'PKR 16,500,000+ total value',
    eligibilityCriteria: [
      'Pakistani citizen with minimum 2 years (2,800 hours) of work experience.',
      'Completed undergraduate degree equivalent to an upper second-class 2:1 honours.',
      'Commitment to return to Pakistan for a minimum of two years post-study.',
      'Apply to 3 eligible UK master’s courses.'
    ],
    pakistaniEligible: true,
    deadline: 'Early November annually (Opens early August)',
    studyLevel: ['Masters (1-Year)'],
    applicationUrl: 'https://www.chevening.org/scholarship/pakistan/',
    meritBased: true,
    needBased: false,
    tips: 'Focus intensely on the 4 essay pillars: Leadership & Influence, Relationship Building/Networking, Studying in the UK, and Career Plan for Pakistan.'
  },
  {
    id: 'sch-fulbright',
    name: 'Fulbright Foreign Student Program (USEFP Pakistan)',
    provider: 'Government',
    country: 'United States',
    coverageType: 'Full Ride',
    amountDescription: 'Full tuition, required textbooks, living stipend, health insurance, and round-trip airfare from Pakistan.',
    amountPKR: 'PKR 25,000,000+ total value',
    eligibilityCriteria: [
      'Pakistani citizen residing in Pakistan at the time of application.',
      '4-year Bachelor’s (16 years education) for Masters, or Master’s/MPhil (18 years) for PhD.',
      'Minimum GRE General score submitted to USEFP.',
      'Commitment to return and serve Pakistan upon completion.'
    ],
    pakistaniEligible: true,
    deadline: 'Mid-April annually (Opens February)',
    studyLevel: ['Masters', 'PhD'],
    applicationUrl: 'https://www.usefp.org/scholarships/fulbright-degree.cfm',
    meritBased: true,
    needBased: false,
    tips: 'Pakistan has the world’s largest Fulbright program. Strong Statement of Purpose and demonstration of cultural ambassadorial quality are critical.'
  },
  {
    id: 'sch-commonwealth',
    name: 'Commonwealth Master’s and PhD Scholarships',
    provider: 'Government',
    country: 'United Kingdom',
    coverageType: 'Full Ride',
    amountDescription: 'Approved airfare, approved tuition and examination fees, stipend of £1,347/month (or £1,652/month in London), and warm clothing allowance.',
    amountPKR: 'PKR 17,000,000+ total value',
    eligibilityCriteria: [
      'Permanent resident or citizen of Pakistan.',
      'At least upper second class (2:1) honours degree by September.',
      'Unable to afford to study in the UK without this scholarship.',
      'Nominated through HEC Pakistan nominating agency.'
    ],
    pakistaniEligible: true,
    deadline: 'October - December annually',
    studyLevel: ['Masters', 'PhD'],
    applicationUrl: 'https://cscuk.fcdo.gov.uk/apply/masters-scholarships/',
    meritBased: true,
    needBased: true,
    tips: 'Make sure your development impact plan ties directly into UN Sustainable Development Goals and key Pakistani socioeconomic priorities.'
  },
  {
    id: 'sch-daad-epos',
    name: 'DAAD EPOS (Development-Related Postgraduate Courses)',
    provider: 'Government',
    country: 'Germany',
    coverageType: 'Stipend + Flights',
    amountDescription: '€934/month living stipend, travel allowance from Pakistan, health insurance, and German language course (Tuition at German public universities is already €0).',
    amountPKR: 'PKR 6,500,000+ net stipend value',
    eligibilityCriteria: [
      'Bachelor’s degree (4 years) in a related discipline completed within last 6 years.',
      'Minimum 2 years of professional experience in developing country/Pakistan.',
      'English proficiency (IELTS 6.5) or German depending on program.'
    ],
    pakistaniEligible: true,
    deadline: 'August - November depending on university program',
    studyLevel: ['Masters'],
    applicationUrl: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/epos/',
    meritBased: true,
    needBased: false,
    tips: 'DAAD heavily values verified public sector or NGO work experience in Pakistan and clear plans on how your German degree will benefit Pakistani society.'
  },
  {
    id: 'sch-aus-awards',
    name: 'Australia Awards Scholarships (DFAT)',
    provider: 'Government',
    country: 'Australia',
    coverageType: 'Full Ride',
    amountDescription: 'Full tuition fees, return air travel, establishment allowance ($5,000 AUD), Contribution to Living Expenses (CLE) every fortnight, and OSHC health cover.',
    amountPKR: 'PKR 21,000,000+ total value',
    eligibilityCriteria: [
      'Pakistani citizen with minimum 5 years of relevant work experience in target sectors (Water security, Agriculture, Health, Gender Equality).',
      'Minimum IELTS 6.5 overall (no band less than 6.0).',
      'Commitment to return to Pakistan for at least two years.'
    ],
    pakistaniEligible: true,
    deadline: 'April 30 annually (Opens February 1)',
    studyLevel: ['Masters'],
    applicationUrl: 'https://www.dfat.gov.au/people-to-people/australia-awards',
    meritBased: true,
    needBased: false,
    tips: 'Target developmental priority fields designated by the Australian High Commission Islamabad; female and differently-abled applicants are strongly encouraged.'
  },
  {
    id: 'sch-pearson',
    name: 'Lester B. Pearson International Scholarship (University of Toronto)',
    provider: 'University',
    country: 'Canada',
    coverageType: 'Full Ride',
    amountDescription: 'Covers full 4-year tuition, books, incidental fees, and full residence support during the four years.',
    amountPKR: 'PKR 38,000,000+ over 4 years',
    eligibilityCriteria: [
      'International undergraduate student nominated by their high school / college in Pakistan.',
      'Exceptional academic achievement and creative community leadership.',
      'Applying to an undergraduate program at the University of Toronto.'
    ],
    pakistaniEligible: true,
    deadline: 'School Nomination: November 30 | Student Application: January 15',
    studyLevel: ['Bachelors'],
    applicationUrl: 'https://future.utoronto.ca/pearson/about-the-scholarship/',
    meritBased: true,
    needBased: false,
    tips: 'Requires your school principal or college counsellor in Karachi/Pakistan to submit an official nomination form before you submit your student application.'
  },
  {
    id: 'sch-goi-ies',
    name: 'Government of Ireland International Education Scholarship (GOI-IES)',
    provider: 'Government',
    country: 'Ireland',
    coverageType: 'Full Tuition',
    amountDescription: 'Full tuition fee waiver for one year of study + €10,000 living stipend paid in two installments.',
    amountPKR: 'PKR 9,500,000+ total value',
    eligibilityCriteria: [
      'Non-EU student with conditional or unconditional offer from an eligible Irish higher education institution.',
      'Excellent academic track record and clear rationale for choosing Ireland.'
    ],
    pakistaniEligible: true,
    deadline: 'Mid-March annually',
    studyLevel: ['Masters (1-Year)', 'Final Year Undergraduate'],
    applicationUrl: 'https://hea.ie/policy/internationalisation/goi-ies/',
    meritBased: true,
    needBased: false,
    tips: 'Must secure university admission first from Trinity, UCD, Galway, or UCC. The scholarship is awarded directly by the Higher Education Authority (HEA) Ireland.'
  },
  {
    id: 'sch-hec-overseas',
    name: 'HEC Overseas Scholarship Scheme (Phase III)',
    provider: 'Government',
    country: 'United Kingdom, USA, Germany, Australia, Canada',
    coverageType: 'Full Ride',
    amountDescription: 'Full tuition fees, monthly living stipend, return airfare, and health insurance under Government of Pakistan bilateral agreements.',
    amountPKR: 'PKR 18,000,000+ total value',
    eligibilityCriteria: [
      'Pakistani/AJK national with minimum 16 years of education (BS 4-Year or Master).',
      'Maximum 2 second divisions and no third division in academic career.',
      'Valid HAT (Higher Education Aptitude Test) score conducted by ETC.'
    ],
    pakistaniEligible: true,
    deadline: 'Periodically advertised by HEC Pakistan (Check HEC portal)',
    studyLevel: ['PhD', 'MS leading to PhD'],
    applicationUrl: 'https://www.hec.gov.pk/english/scholarshipsgrants/OS-PhaseIII',
    meritBased: true,
    needBased: false,
    tips: 'Prepare rigorously for the HEC HAT examination. Top percentile in HAT is essential for shortlist and university allocation.'
  },
  {
    id: 'sch-gates-cambridge',
    name: 'Gates Cambridge Scholarships',
    provider: 'Trust',
    country: 'United Kingdom',
    coverageType: 'Full Ride',
    amountDescription: 'University composition fee, living allowance (£20,000/year), airfare, visa costs, and discretionary funding (academic development/family allowance).',
    amountPKR: 'PKR 22,000,000+ per year',
    eligibilityCriteria: [
      'Citizen of any country outside the UK applying for a full-time postgraduate degree at University of Cambridge.',
      'Outstanding intellectual capacity, reasons for choice of course, and commitment to improving lives of others.'
    ],
    pakistaniEligible: true,
    deadline: 'Early December annually',
    studyLevel: ['Masters (MPhil)', 'PhD'],
    applicationUrl: 'https://www.gatescambridge.org/',
    meritBased: true,
    needBased: false,
    tips: 'Submit the Gates Cambridge essay simultaneously with your Cambridge graduate application; explain how your work addresses systemic challenges.'
  }
];

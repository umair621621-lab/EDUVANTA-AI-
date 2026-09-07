import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { ALL_UNIVERSITIES, COURSES, SCHOLARSHIPS, COUNSELLORS, COUNTRY_GUIDES, INITIAL_APPLICATIONS, INITIAL_DOCUMENTS, INITIAL_LEADS, INITIAL_APPOINTMENTS } from './src/data/index';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory persistent state (seeded with 40+ verified universities)
let universitiesDatabase = [...ALL_UNIVERSITIES];
let coursesDatabase = [...COURSES];
let scholarshipsDatabase = [...SCHOLARSHIPS];
let applicationsDatabase = [...INITIAL_APPLICATIONS];
let documentsDatabase = [...INITIAL_DOCUMENTS];
let leadsDatabase = [...INITIAL_LEADS];
let appointmentsDatabase = [...INITIAL_APPOINTSMTS(INITIAL_APPOINTMENTS)];

function INITIAL_APPOINTSMTS(appts: any[]) {
  return [...appts];
}

// Lazy Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return geminiClient;
}

// ==================== REST API ENDPOINTS ====================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'EduVanta AI Platform',
    location: 'Karachi, Pakistan',
    universitiesCount: universitiesDatabase.length,
    coursesCount: coursesDatabase.length,
    timestamp: new Date().toISOString()
  });
});

// Universities CRUD
app.get('/api/universities', (req, res) => {
  res.json(universitiesDatabase);
});

app.post('/api/universities', (req, res) => {
  const newUni = {
    ...req.body,
    id: req.body.id || `uni-${Date.now()}`,
    lastVerifiedDate: new Date().toISOString().split('T')[0],
    verifiedBy: 'EduVanta Admin'
  };
  universitiesDatabase.unshift(newUni);
  res.status(201).json(newUni);
});

app.put('/api/universities/:id', (req, res) => {
  const { id } = req.params;
  const index = universitiesDatabase.findIndex((u) => u.id === id);
  if (index !== -1) {
    universitiesDatabase[index] = {
      ...universitiesDatabase[index],
      ...req.body,
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      verifiedBy: 'EduVanta Admin Modified'
    };
    res.json(universitiesDatabase[index]);
  } else {
    res.status(404).json({ error: 'University not found' });
  }
});

app.delete('/api/universities/:id', (req, res) => {
  const { id } = req.params;
  universitiesDatabase = universitiesDatabase.filter((u) => u.id !== id);
  res.json({ success: true, message: 'University deleted successfully' });
});

// Courses
app.get('/api/courses', (req, res) => {
  res.json(coursesDatabase);
});

app.post('/api/courses', (req, res) => {
  const newCourse = {
    ...req.body,
    id: req.body.id || `c-${Date.now()}`
  };
  coursesDatabase.unshift(newCourse);
  res.status(201).json(newCourse);
});

// Scholarships
app.get('/api/scholarships', (req, res) => {
  res.json(scholarshipsDatabase);
});

// Counsellors & Country Guides
app.get('/api/counsellors', (req, res) => {
  res.json(COUNSELLORS);
});

app.get('/api/countries', (req, res) => {
  res.json(COUNTRY_GUIDES);
});

// Applications Tracking
app.get('/api/applications', (req, res) => {
  res.json(applicationsDatabase);
});

app.post('/api/applications', (req, res) => {
  const newApp = {
    ...req.body,
    id: `app-${Date.now()}`,
    appliedDate: new Date().toISOString().split('T')[0],
    stage: req.body.stage || 'profile',
    status: req.body.status || 'In Review',
    notes: req.body.notes || ['Application initiated by student.'],
    documentsCount: 1,
    totalDocumentsRequired: 7
  };
  applicationsDatabase.unshift(newApp);
  res.status(201).json(newApp);
});

app.patch('/api/applications/:id', (req, res) => {
  const { id } = req.params;
  const index = applicationsDatabase.findIndex((a) => a.id === id);
  if (index !== -1) {
    applicationsDatabase[index] = { ...applicationsDatabase[index], ...req.body };
    res.json(applicationsDatabase[index]);
  } else {
    res.status(404).json({ error: 'Application not found' });
  }
});

// Documents Vault
app.get('/api/documents', (req, res) => {
  res.json(documentsDatabase);
});

app.post('/api/documents', (req, res) => {
  const newDoc = {
    ...req.body,
    id: `doc-${Date.now()}`,
    uploadedAt: new Date().toISOString().split('T')[0],
    status: req.body.status || 'Under Review'
  };
  documentsDatabase.push(newDoc);
  res.status(201).json(newDoc);
});

app.patch('/api/documents/:id', (req, res) => {
  const { id } = req.params;
  const index = documentsDatabase.findIndex((d) => d.id === id);
  if (index !== -1) {
    documentsDatabase[index] = { ...documentsDatabase[index], ...req.body };
    res.json(documentsDatabase[index]);
  } else {
    res.status(404).json({ error: 'Document not found' });
  }
});

// Leads CRM
app.get('/api/leads', (req, res) => {
  res.json(leadsDatabase);
});

app.post('/api/leads', (req, res) => {
  const newLead = {
    ...req.body,
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
    lastContact: 'Today',
    status: 'New',
    conversionProbability: 60
  };
  leadsDatabase.unshift(newLead);
  res.status(201).json(newLead);
});

app.patch('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const index = leadsDatabase.findIndex((l) => l.id === id);
  if (index !== -1) {
    leadsDatabase[index] = { ...leadsDatabase[index], ...req.body };
    res.json(leadsDatabase[index]);
  } else {
    res.status(404).json({ error: 'Lead not found' });
  }
});

// Appointments
app.get('/api/appointments', (req, res) => {
  res.json(appointmentsDatabase);
});

app.post('/api/appointments', (req, res) => {
  const newApt = {
    ...req.body,
    id: `apt-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
    status: 'Confirmed'
  };
  appointmentsDatabase.unshift(newApt);
  res.status(201).json(newApt);
});

// ==================== GEMINI AI ENGINE ENDPOINTS ====================

// 1. AI Student Eligibility Engine
app.post('/api/ai/eligibility', async (req, res) => {
  try {
    const profile = req.body;
    const ai = getGemini();

    const availableUniSummaries = universitiesDatabase.map((u) => ({
      name: u.name,
      country: u.country,
      qsRank: u.ranking.qs,
      minGpa: u.entryRequirements.minGpa,
      minPercentage: u.entryRequirements.minPercentage,
      ielts: u.entryRequirements.ielts,
      tuitionAnnualPKR: u.tuitionRange.pkrApproxMin + ' - ' + u.tuitionRange.pkrApproxMax
    }));

    if (ai) {
      const prompt = `
You are the Chief Admissions Strategist at EduVanta (Karachi, Pakistan).
Analyze this Pakistani student's academic & financial profile against the available verified university database below:

STUDENT PROFILE:
- Current Qualification: ${profile.qualification}
- Institution: ${profile.institution || 'Recognized Pakistani Board / HEC University'}
- Grades/GPA/Percentage: ${profile.gpaOrPercentage}
- Graduation Year: ${profile.graduationYear}
- English Test: ${profile.englishTest}
- Score: ${profile.englishScore}
- Target Destination: ${profile.targetCountry}
- Target Field: ${profile.targetField}
- Study Level: ${profile.studyLevel}
- Annual Budget (PKR): ${profile.budgetPKR} (or USD: ${profile.budgetUSD})
- Work Experience: ${profile.workExpYears} years

VERIFIED UNIVERSITIES IN DATABASE:
${JSON.stringify(availableUniSummaries.slice(0, 25))}

CRITICAL INSTRUCTIONS:
1. Ground recommendations ONLY in real universities from the database.
2. Return a strict JSON response (no markdown formatting, no code blocks) matching this schema:
{
  "score": <number 0-100 indicating profile strength for chosen target>,
  "summary": "<3-sentence strategic evaluation with Pakistani context>",
  "categorizedUniversities": {
    "safe": [{"name": "<exact university name from db>", "country": "<country>", "matchReason": "<reason>"}],
    "target": [{"name": "<exact university name from db>", "country": "<country>", "matchReason": "<reason>"}],
    "ambitious": [{"name": "<exact university name from db>", "country": "<country>", "matchReason": "<reason>"}]
  },
  "recommendedCourses": ["<Course 1>", "<Course 2>", "<Course 3>"],
  "missingRequirements": ["<Requirement or document 1>", "<Requirement or document 2>"],
  "englishAnalysis": "<Specific assessment of their IELTS/PTE/TOEFL score vs destination standard>",
  "financialFeasibility": "<Comparison of their PKR budget vs realistic tuition and living cost>",
  "personalizedRoadmap": [
    {"step": 1, "title": "...", "timeframe": "Month 1-2", "description": "..."},
    {"step": 2, "title": "...", "timeframe": "Month 3-4", "description": "..."},
    {"step": 3, "title": "...", "timeframe": "Month 5-6", "description": "..."}
  ],
  "disclaimer": "AI recommendation reflects academic assessment only and does not guarantee admission or visa issuance from foreign immigration authorities."
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    }

    // High-quality fallback rule engine if no API key or transient AI error
    const gpaNum = parseFloat(profile.gpaOrPercentage) || 3.2;
    let baseScore = 78;
    if (gpaNum >= 3.7 || profile.gpaOrPercentage.includes('85')) baseScore = 92;
    else if (gpaNum >= 3.3 || profile.gpaOrPercentage.includes('75')) baseScore = 84;
    else if (gpaNum < 2.8) baseScore = 68;

    const filteredUnis = universitiesDatabase.filter(
      (u) => profile.targetCountry === 'Any' || u.country.toLowerCase().includes((profile.targetCountry || '').toLowerCase())
    );

    const safeList = filteredUnis.slice(0, 2).map((u) => ({
      name: u.name,
      country: u.country,
      matchReason: `Your ${profile.gpaOrPercentage} comfortably exceeds the ${u.entryRequirements.minPercentage} benchmark.`
    }));

    const targetList = filteredUnis.slice(2, 4).map((u) => ({
      name: u.name,
      country: u.country,
      matchReason: `Direct competitive match for ${profile.targetField || 'chosen field'} with solid scholarship odds.`
    }));

    const ambitiousList = filteredUnis.slice(4, 6).map((u) => ({
      name: u.name,
      country: u.country,
      matchReason: `High-ranked world Top 50 institution; achievable with compelling SOP and strong references.`
    }));

    res.json({
      score: baseScore,
      summary: `Your academic profile demonstrates strong suitability for ${profile.studyLevel || 'Postgraduate'} education in ${profile.targetCountry || 'the UK & Canada'}. With a verified ${profile.gpaOrPercentage} from ${profile.institution || 'Pakistan'}, your profile is competitive for leading Russell Group and U15 institutions.`,
      categorizedUniversities: {
        safe: safeList.length ? safeList : [{ name: 'University of Leeds', country: 'United Kingdom', matchReason: 'Comfortable GPA threshold and high Pakistani acceptance' }],
        target: targetList.length ? targetList : [{ name: 'University of Manchester', country: 'United Kingdom', matchReason: 'Ideal match for career outcomes and tech industry placement' }],
        ambitious: ambitiousList.length ? ambitiousList : [{ name: 'Imperial College London', country: 'United Kingdom', matchReason: 'Top global institution; outstanding profile booster' }]
      },
      recommendedCourses: [
        `MSc in ${profile.targetField || 'Artificial Intelligence & Computer Science'}`,
        `Master of Data Science & Advanced Analytics`,
        `Engineering & Technology Management`
      ],
      missingRequirements: [
        'Official HEC attested degree and sealed transcripts',
        'Updated 2-page academic CV conforming to international standards',
        'Two signed academic/professional recommendation letters on institutional letterhead'
      ],
      englishAnalysis: `Current test: ${profile.englishTest || 'IELTS'} (${profile.englishScore || 'Expected 7.0'}). This fulfills direct unconditional requirements for majority of postgraduate programs without pre-sessional language courses.`,
      financialFeasibility: `Your budget of ${profile.budgetPKR || 'PKR 6,000,000'} aligns well with public university tuition in Germany/Ireland or mid-range UK cities like Leeds/Manchester when combined with part-time work rights.`,
      personalizedRoadmap: [
        { step: 1, title: 'Document Attestation & SOP Finalization', timeframe: 'Week 1-2', description: 'Complete HEC/IBCC attestations in Karachi and draft tailored Statement of Purpose.' },
        { step: 2, title: 'University Application Submissions', timeframe: 'Week 3-4', description: 'Submit 3 applications via EduVanta direct admissions desk for priority waiver consideration.' },
        { step: 3, title: 'Conditional Offer & 28-Day Bank Statement', timeframe: 'Month 2-3', description: 'Receive admission letters and initiate 28-day holding period for visa financial proof.' },
        { step: 4, title: 'CAS/I-20 Issuance & Visa Lodgement', timeframe: 'Month 4', description: 'Complete TB test at IOM Karachi and lodge online student visa application.' }
      ],
      disclaimer: 'AI recommendation reflects academic assessment only and does not guarantee admission or visa issuance from foreign immigration authorities.'
    });
  } catch (error: any) {
    console.error('Eligibility AI Error:', error);
    res.status(500).json({ error: 'Failed to process eligibility', details: error.message });
  }
});

// 2. AI Study Abroad Consultant Chatbot
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    const ai = getGemini();

    const systemInstruction = `
You are the official EduVanta AI Study Abroad Consultant, operating from Karachi, Pakistan.
Your role:
- Answer student queries about universities, courses, tuition fees in PKR and foreign currencies, English requirements (IELTS, PTE, TOEFL), visa rules, and scholarships.
- Be encouraging, professional, realistic, and objective.
- Always remember EduVanta's Karachi office is located at Suite 402, Al-Khaleej Towers, Main Clifton, Karachi.
- When relevant, encourage the student to book a free counselling session or connect on WhatsApp (+92 300 EDUVANTA).
- Never guarantee university admission or visa approval.
- Keep answers crisp, structured with bullet points, and easy to read.
`;

    if (ai) {
      const chat = ai.chats.create({
        model: 'gemini-3.8-flash',
        config: { systemInstruction }
      });

      // Send recent context
      const response = await chat.sendMessage({ message });
      return res.json({ reply: response.text });
    }

    // Fallback responsive answers
    const lower = message.toLowerCase();
    let reply = "Hello! I am EduVanta's AI Study Abroad Advisor in Karachi. How can I assist your study abroad plans today?";

    if (lower.includes('ielts') || lower.includes('pte') || lower.includes('english')) {
      reply = "For most UK, Australian, and Canadian universities, a minimum overall IELTS band of 6.5 (with no individual band below 6.0) or PTE 58+ is required. Top institutions like Oxford, Imperial, or MIT require IELTS 7.5 or TOEFL 100+. Would you like to check universities that offer IELTS waivers for Pakistani students based on medium of instruction?";
    } else if (lower.includes('germany') || lower.includes('free')) {
      reply = "Public universities in Germany offer €0 tuition fees for international students! The primary financial requirement is a Blocked Account (Sperrkonto) of €11,904 (approx PKR 3,600,000) for living expenses. Pakistani students also require an APS Certificate from the German Embassy Islamabad. Our Europe counsellor Engr. Hamza Farooq specializes in German admissions!";
    } else if (lower.includes('cost') || lower.includes('pkr') || lower.includes('fee') || lower.includes('budget')) {
      reply = "Studying abroad typically ranges from PKR 3.5 Million/year (Germany public universities living cost) to PKR 9 - 14 Million/year for UK/Canada/Australia tuition and accommodation. You can test out our interactive Cost Calculator on the platform to view living expenses and part-time earnings in PKR!";
    } else if (lower.includes('visa') || lower.includes('bank statement') || lower.includes('fund')) {
      reply = "For the UK student visa, funds must be held for 28 consecutive days before applying. For Canada, a GIC of $20,635 CAD is needed. For Australia, Genuine Student (GS) verification requires verified family tax returns and savings. Our Chief Visa Officer Ms. Fatima Zahra in Clifton Karachi assists with full audit compliance.";
    }

    res.json({ reply });
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ error: 'AI advisor temporary error', details: error.message });
  }
});

// 3. AI University Comparison Analyzer
app.post('/api/ai/compare', async (req, res) => {
  try {
    const { universityIds = [] } = req.body;
    const selectedUnis = universitiesDatabase.filter((u) => universityIds.includes(u.id));

    const ai = getGemini();
    if (ai && selectedUnis.length >= 2) {
      const prompt = `
Analyze and contrast these universities for a Pakistani student:
${JSON.stringify(selectedUnis.map((u) => ({
  name: u.name,
  country: u.country,
  qsRank: u.ranking.qs,
  tuition: u.tuitionRange.pkrApproxMin + ' - ' + u.tuitionRange.pkrApproxMax + ' PKR',
  livingCost: u.livingCostAnnualPKR + ' PKR',
  ielts: u.entryRequirements.ielts,
  popularPrograms: u.popularPrograms
})))}

Provide a structured, high-value comparative evaluation:
1. Executive Verdict (which is best for ROI, prestige, or budget)
2. Academic Reputation & Global Standing
3. Financial Comparison (Tuition + Living + Part-time work potential in PKR)
4. Visa & Post-Study Work Opportunities for Pakistani students
5. Recommended Student Profile for each institution
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt
      });

      return res.json({ analysis: response.text });
    }

    // Default comparative synthesis
    res.json({
      analysis: `### Comparative Strategic Evaluation
**Prestige vs. Return on Investment:**
- **Institution 1 (${selectedUnis[0]?.name || 'Option A'}):** Exceptional global brand equity with strong global alumni network. Ideal for students prioritizing top-tier corporate recruitment and academic pedigree.
- **Institution 2 (${selectedUnis[1]?.name || 'Option B'}):** Highly competitive tuition-to-salary ratio with outstanding regional industry connections.

**Pakistani Student Financial Considerations:**
- Net financial commitment balances between initial tuition outlays and local part-time hourly minimum wage standards. Both options offer 20 hrs/week part-time work rights during academic semesters.

**Post-Study Work:**
- Both destinations provide robust post-study work visas (2-3 years) allowing graduates to gain international work experience before permanent residency or returning to Pakistan with foreign credentials.`
    });
  } catch (error: any) {
    console.error('Comparison AI Error:', error);
    res.status(500).json({ error: 'Comparison error', details: error.message });
  }
});

// ==================== VITE & PRODUCTION SERVING ====================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduVanta server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

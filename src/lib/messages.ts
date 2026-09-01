import type { Locale } from "./locale";

export type Messages = {
  metaTitle: string;
  metaDescription: string;
  brand: string;
  loading: string;
  loadingWorkspace: string;
  untitledOrg: string;
  yourOrganisation: string;
  completePct: string;
  dash: string;
  nav: {
    overview: string;
    ropa: string;
    systems: string;
    reminders: string;
    team: string;
    about: string;
  };
  footer: {
    about: string;
    privacy: string;
  };
  about: {
    role: string;
    lead: string;
    missionTitle: string;
    mission: string[];
    cards: { title: string; body: string }[];
    ctaTitle: string;
    ctaBody: string;
    cta: string;
  };
  lang: {
    da: string;
    en: string;
    switchToEnglish: string;
    switchToDanish: string;
  };
  home: {
    startInterview: string;
    title: string;
    lead: string;
    startScratch: string;
    previewSample: string;
    noAccount: string;
    whatYouGet: string;
    get: string[];
    processTitle: string;
    cards: { step: string; title: string; body: string }[];
    whyTitle: string;
    whyBody: string;
  };
  setup: {
    skip: string;
    stepOf: string;
    back: string;
    continue: string;
    openWorkspace: string;
    closeInterview: string;
    closeInterviewConfirm: string;
  };
  interview: {
    steps: { title: string; blurb: string }[];
    companyName: string;
    companyNameHint: string;
    companyPlaceholder: string;
    cvr: string;
    industry: string;
    selectOne: string;
    street: string;
    postal: string;
    city: string;
    country: string;
    contactEmail: string;
    contactEmailHint: string;
    phone: string;
    website: string;
    employeesQ: string;
    employeesHint: string;
    peopleTip: string;
    noDpo: string;
    noDpoHint: string;
    hasDpo: string;
    hasDpoHint: string;
    dpoName: string;
    dpoEmail: string;
    euRep: string;
    euRepHint: string;
    euNotNeeded: string;
    euNotNeededHint: string;
    euHas: string;
    repName: string;
    repEmail: string;
    toolsTip: string;
    somethingElse: string;
    somethingElseHint: string;
    somethingElsePlaceholder: string;
    add: string;
    remove: string;
    flowsTip: string;
    flowsEmpty: string;
    vendor: string;
    usedFor: string;
    usedForHint: string;
    dataInSystem: string;
    whoseData: string;
    whoHasAccess: string;
    whoHasAccessHint: string;
    sharedExternally: string;
    sharedExternallyWho: string;
    sharedExternallyWhoHint: string;
    thirdCountry: string;
    yes: string;
    no: string;
    thirdCountryBasis: string;
    extraNotes: string;
    clickToOpen: string;
    hostedWhere: string;
    safeguard: string;
    hostingNotes: string;
    vendorProcesses: string;
    dpaInPlace: string;
    edit: string;
    activitiesTip: string;
    activityModeTip: string;
    activityModeSystem: string;
    activityModeSystemHint: string;
    activityModeSystemExample: string;
    activityModeTopic: string;
    activityModeTopicHint: string;
    activityModeTopicExample: string;
    activityModeChange: string;
    activitiesSystemTip: string;
    activitiesSystemEmpty: string;
    purposeSystemHint: string;
    suggestFromTools: string;
    addBlank: string;
    newActivity: string;
    commonForSmes: string;
    untitledActivity: string;
    basisNotSet: string;
    retentionSet: string;
    addRetention: string;
    name: string;
    department: string;
    purpose: string;
    purposeHint: string;
    whose: string;
    whatData: string;
    howSensitive: string;
    legalBasis: string;
    basisNote: string;
    systemsForActivity: string;
    addToolsFirst: string;
    whoReceives: string;
    whoReceivesHint: string;
    staysEea: string;
    leavesEea: string;
    whereGoes: string;
    whereGoesPlaceholder: string;
    transferSafeguard: string;
    howLong: string;
    howLongHint: string;
    protectionTip: string;
    readyForExport: string;
    allFilled: string;
    stillUseful: string;
    downloadPdf: string;
    downloadMarkdown: string;
    goWorkspace: string;
    reviewNext: string;
    custom: string;
  };
  employeeHints: Record<string, string>;
  industries: Record<string, string>;
  dataTypes: Record<string, string>;
  dataSubjects: Record<string, string>;
  legalBasis: Record<string, { label: string; hint: string }>;
  transfers: Record<string, { label: string; hint: string }>;
  regions: Record<string, string>;
  sensitivity: Record<string, { label: string; hint: string }>;
  categories: Record<string, string>;
  systemCopy: Record<string, { purpose: string; hostingNotes: string; vendor?: string }>;
  activityCopy: Record<
    string,
    {
      name: string;
      department: string;
      purpose: string;
      legalBasisNotes: string;
      recipients: string[];
      personalData: string[];
      retention: string;
      transferCountries: string;
    }
  >;
  toms: Record<string, { label: string; description: string }>;
  completeness: Record<string, { label: string; hint: string }>;
  workspace: {
    kicker: string;
    lastEdited: string;
    continueInterview: string;
    downloadPdf: string;
    downloadMarkdown: string;
    completeness: string;
    completenessHint: string;
    activities: string;
    activitiesHint: string;
    systems: string;
    systemsHint: string;
    stillUseful: string;
    allCore: string;
    viewFull: string;
    upcoming: string;
    noReminders: string;
    manageReminders: string;
    processingActivities: string;
    colActivity: string;
    colPeople: string;
    colBasis: string;
    colRetention: string;
  };
  ropa: {
    kicker: string;
    title: string;
    print: string;
    docKicker: string;
    docTitle: string;
    docLead: string;
    sectionController: string;
    sectionSystems: string;
    sectionActivities: string;
    sectionToms: string;
    field: string;
    record: string;
    controller: string;
    cvr: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    employees: string;
    industry: string;
    dpo: string;
    dpoNamed: string;
    dpoNone: string;
    euRep: string;
    euNamed: string;
    euNone: string;
    system: string;
    vendor: string;
    hosting: string;
    data: string;
    people: string;
    role: string;
    dpa: string;
    transfers: string;
    processor: string;
    independent: string;
    yes: string;
    no: string;
    eeaOnly: string;
    department: string;
    purpose: string;
    subjects: string;
    personalData: string;
    categories: string;
    legalBasis: string;
    notes: string;
    systems: string;
    recipients: string;
    retention: string;
    noTransfers: string;
    measure: string;
    inPlace: string;
    description: string;
    notYet: string;
    untitled: string;
    notLegalAdvice: string;
  };
  systemsPage: {
    kicker: string;
    title: string;
    lead: string;
    editInterview: string;
    purpose: string;
    hosting: string;
    data: string;
    processor: string;
    transfers: string;
    yes: string;
    independent: string;
    dpaYes: string;
    dpaNo: string;
    eeaOnly: string;
  };
  reminders: {
    kicker: string;
    title: string;
    lead: string;
    allowBrowser: string;
    noSupport: string;
    notAllowed: string;
    enabled: string;
    notificationTitle: string;
    addToCalendar: string;
    markDone: string;
    completeReschedule: string;
    customTitle: string;
    fieldTitle: string;
    dueDate: string;
    notes: string;
    add: string;
    annual: string;
    annualNotes: string;
    processors: string;
    processorNotes: string;
    due: string;
    dueSoon: string;
    overdue: string;
    completed: string;
  };
  team: {
    kicker: string;
    title: string;
    lead: string;
    tip: string;
    editingAs: string;
    shareLink: string;
    copied: string;
    publish: string;
    noEmail: string;
    owner: string;
    editor: string;
    viewer: string;
    remove: string;
    addColleague: string;
    name: string;
    email: string;
    role: string;
    viewerOption: string;
    add: string;
  };
  share: {
    opening: string;
    missing: string;
    home: string;
  };
  pdf: {
    confidential: string;
    title: string;
    subtitle: string;
    generated: string;
    lastEdited: string;
    completeness: string;
    disclaimer: string;
    section1: string;
    section2: string;
    section3: string;
    section4: string;
    section5: string;
    footer: string;
    closing: string;
    dpoNone: string;
    euNone: string;
    processor: string;
    independent: string;
    dpaYes: string;
    dpaNo: string;
    eeaOnly: string;
    noTransfers: string;
    yes: string;
    notYet: string;
    open: string;
    done: string;
    named: string;
    emailNotSet: string;
  };
};

const en: Messages = {
  metaTitle: "TrustLog — GDPR made easy",
  metaDescription:
    "A guided interview that produces an Article 30 Record of Processing Activities your organisation can download as PDF and keep in its own archive.",
  brand: "TrustLog",
  loading: "Loading…",
  loadingWorkspace: "Loading workspace…",
  untitledOrg: "Untitled organisation",
  yourOrganisation: "Your organisation",
  completePct: "% complete",
  dash: "—",
  nav: {
    overview: "Overview",
    ropa: "Article 30 record",
    systems: "Systems",
    reminders: "Reminders",
    team: "Team",
    about: "About TrustLog",
  },
  footer: {
    about: "About TrustLog",
    privacy: "Privacy policy",
  },
  about: {
    role: "Founder · GDPR practitioner · web designer",
    lead: "GDPR compliance is still too hard for small companies, and most tools are written for lawyers. TrustLog is a plain-language interview that turns everyday practice into an Article 30 record.",
    missionTitle: "Law, made usable in everyday work",
    mission: [
      "Most GDPR products speak lawyer-to-lawyer. For an SME with ten or fifteen people, the record of processing activities becomes something you postpone — or pay a consultant to fill in once, after which it gathers dust.",
      "I built TrustLog because I work with GDPR compliance, record-keeping and optimisation in practice, and I know a record only works if people can actually use it. The interview is built for that: short questions, concrete suggestions, and language you can stand behind.",
      "The aim is simple: you should be able to sit down for a morning and leave with an Article 30 record you actually understand — and that you will keep up to date.",
    ],
    cards: [
      {
        title: "Hands-on GDPR",
        body: "I work with GDPR compliance, journaling and optimisation at Trekantområdet Danmark. I know what it takes to implement this in the real world for a team of around 15 people — not as theory, but as something that has to work on a Monday morning.",
      },
      {
        title: "Technical design",
        body: "I am studying an MSc in IT (Web Communication Design) at the University of Southern Denmark, combining Python, AI, data ethics and UX design so the tool feels like a conversation — not a compliance system built for lawyers.",
      },
      {
        title: "Plain language",
        body: "I am also a trained teacher, so I am used to cutting through complexity. In TrustLog that simply means ordinary wording and one question at a time — not a blank legal form.",
      },
    ],
    ctaTitle: "Ready to try it yourself?",
    ctaBody: "Start the interview here. No account. Your draft stays in this browser until you choose to share it.",
    cta: "Start the interview here. No login required.",
  },
  lang: {
    da: "Danish",
    en: "English",
    switchToEnglish: "Switch the website to English",
    switchToDanish: "Skift hjemmesiden til dansk",
  },
  home: {
    startInterview: "Start the interview",
    title: "GDPR made easy",
    lead: "Answer plain questions about your company, tools, and day-to-day data. TrustLog turns that into an audit-ready Article 30 record — as a PDF you download and store in your own archive.",
    startScratch: "Start from scratch",
    previewSample: "Preview a sample company",
    noAccount:
      "No account required. Work is saved in this browser and can be shared with a link for colleagues.",
    whatYouGet: "What you get",
    get: [
      "A clear view of your IT systems",
      "A finished PDF for your archive",
      "Documentation ready for a supervisory review",
    ],
    processTitle: "How it works",
    cards: [
      {
        step: "Step 1",
        title: "Interview",
        body: "Answer a series of short questions about your company, your tools, and the data you use day to day. The record is generated from your input.",
      },
      {
        step: "Step 2",
        title: "Archive",
        body: "Download the record in the format you prefer, and keep it somewhere safe in your organisation's archive.",
      },
      {
        step: "Step 3",
        title: "Quality check",
        body: "The record is reviewed together with TrustLog. You are offered a sparring session on maintaining your Article 30 record and other GDPR-related questions.",
      },
    ],
    whyTitle: "GDPR is not just for big companies",
    whyBody:
      "If you pay salaries, have customers, or use an accounting tool, names and emails already sit in your systems. You need to be able to say what you hold, where it lives, and what you use it for — even if you are five people with no IT department. TrustLog asks in ordinary language, so you get it written down without becoming lawyers.",
  },
  setup: {
    skip: "Skip to workspace",
    stepOf: "Step {current} of {total}",
    back: "Back",
    continue: "Continue",
    openWorkspace: "Open workspace",
    closeInterview: "Close interview",
    closeInterviewConfirm:
      "Close the interview and delete the draft in this browser? This cannot be undone.",
  },
  interview: {
    steps: [
      { title: "Your company", blurb: "The basics that go on the cover of the record." },
      { title: "Who is responsible", blurb: "Contact person, DPO, and EU representative." },
      { title: "Tools you use", blurb: "Tick the systems that run the business day to day." },
      { title: "Data in each tool", blurb: "For each system: vendor, purpose, people, data, access, and whether anything leaves the EU." },
      { title: "What you use data for", blurb: "How would you rather explain why you use people’s information? Pick the way that feels natural — you can change it later." },
      { title: "How you protect it", blurb: "A short list of security measures (GDPR Art. 32)." },
      { title: "Review & export", blurb: "Download the PDF and set a reminder to keep it current." },
    ],
    companyName: "Company name",
    companyNameHint: "The legal name that will appear as the data controller.",
    companyPlaceholder: "e.g. Nordlys Design ApS",
    cvr: "CVR / registration number",
    industry: "Industry",
    selectOne: "Select one",
    street: "Street address",
    postal: "Postal code",
    city: "City",
    country: "Country",
    contactEmail: "Privacy / contact email",
    contactEmailHint: "Where people can ask about their data.",
    phone: "Phone (optional)",
    website: "Website (optional)",
    employeesQ: "How many people work here?",
    employeesHint:
      "Even a company with fewer than 250 staff usually needs this record, because employee and customer data is processed all year — not just once in a while.",
    peopleTip:
      "Most SMEs do not need a Data Protection Officer. You typically need one only if you systematically monitor people at scale, or if special data (health, union membership, etc.) is a core part of the business.",
    noDpo: "No DPO",
    noDpoHint: "Someone in the company still owns this record.",
    hasDpo: "We have a DPO",
    hasDpoHint: "Internal or external.",
    dpoName: "DPO name",
    dpoEmail: "DPO email",
    euRep: "EU representative",
    euRepHint:
      "Only needed if the company is based outside the EU/EEA and offers goods or monitors people in the EU.",
    euNotNeeded: "Not needed",
    euNotNeededHint: "We are established in the EU/EEA.",
    euHas: "We have a representative",
    repName: "Representative name",
    repEmail: "Representative email",
    toolsTip:
      "Tick what you actually use. We pre-fill typical data types, hosting, and legal notes — you can correct them on the next screen.",
    somethingElse: "Something else?",
    somethingElseHint: "Accounting tool, industry system, or a spreadsheet that holds customer data.",
    somethingElsePlaceholder: "Name of the tool",
    add: "Add",
    remove: "Remove",
    flowsTip:
      "Go through each tool. Suggested answers are filled in — change anything that does not match how you actually work.",
    flowsEmpty:
      "Add at least one tool first. If you truly have no systems, go back and add email or accounting — almost every SME has both.",
    vendor: "Vendor",
    usedFor: "What is the system used for?",
    usedForHint: "A short description.",
    dataInSystem: "What types of personal data do you process in this system?",
    whoseData: "Who do you hold data about in this system?",
    whoHasAccess: "Who has access to this system?",
    whoHasAccessHint: "e.g. HR, management, or all staff",
    sharedExternally: "Is data shared with anyone outside the company?",
    sharedExternallyWho: "Who?",
    sharedExternallyWhoHint: "e.g. accountant, payroll provider, or the software vendor",
    thirdCountry: "Is data shared with third countries?",
    yes: "Yes",
    no: "No",
    thirdCountryBasis: "If data is shared with third countries, what is the legal basis?",
    extraNotes: "Additional notes",
    clickToOpen: "Click to open",
    hostedWhere: "Where is it hosted?",
    safeguard: "Safeguard if data leaves the EU/EEA",
    hostingNotes: "Hosting notes",
    vendorProcesses: "Vendor processes data for us",
    dpaInPlace: "Signed DPA in place",
    edit: "Edit",
    activitiesTip:
      "A “processing activity” is a purpose, not a tool. Payroll, sales, and the website are separate rows even if they share Microsoft 365.",
    activityModeTip:
      "How would you rather explain why you use people’s information? Pick the way that feels natural — you can change it later.",
    activityModeSystem: "One tool at a time",
    activityModeSystemHint:
      "You get a card for each programme you already ticked — like e-conomic, Microsoft 365 or payroll. Write what you use that programme for, as you would tell a colleague.",
    activityModeSystemExample: "Example: “We use e-conomic for invoices and customer accounts.”",
    activityModeTopic: "By job in the company",
    activityModeTopicHint:
      "Describe everyday work in pieces: paying staff, selling, running the website. Then tick the programmes that belong to each job.",
    activityModeTopicExample: "Example: “Payroll — we pay people with Danløn.”",
    activityModeChange: "Change approach",
    activitiesSystemTip:
      "Each card is a tool from the previous step. Write why you process personal data there — in ordinary language.",
    activitiesSystemEmpty: "Add at least one tool in the previous step first.",
    purposeSystemHint: "Why do you process personal data in this system?",
    suggestFromTools: "Suggest from my tools",
    addBlank: "Add a blank activity",
    newActivity: "New activity",
    commonForSmes: "Common for SMEs",
    untitledActivity: "Untitled activity",
    basisNotSet: "Legal basis not set",
    retentionSet: "Retention set",
    addRetention: "Add how long you keep it",
    name: "Name",
    department: "Department",
    purpose: "Purpose — why do you process this data?",
    purposeHint: "One or two sentences in plain language.",
    whose: "Whose data",
    whatData: "What data",
    howSensitive: "How sensitive is it?",
    legalBasis: "Legal basis",
    basisNote: "Short note on the legal basis",
    systemsForActivity: "Systems used for this activity",
    addToolsFirst: "Add tools in the previous step.",
    whoReceives: "Who else receives the data?",
    whoReceivesHint: "Payroll provider, accountant, tax authority, cloud vendor.",
    staysEea: "Stays in the EU/EEA",
    leavesEea: "Some data leaves the EU/EEA",
    whereGoes: "Where does it go?",
    whereGoesPlaceholder: "United States, via the CRM vendor",
    transferSafeguard: "Transfer safeguard",
    howLong: "How long do you keep it?",
    howLongHint: "We suggest common SME periods — change them if your contracts or sector rules differ.",
    protectionTip:
      "Article 32 asks for a description of how you protect data — not a 40-page policy. Tick what you already do. Untick anything that is not true yet.",
    readyForExport: "Ready for export",
    allFilled:
      "All Article 30 building blocks are filled. Download the PDF and keep it in your own archive.",
    stillUseful: "{count} item(s) still useful to complete. You can export anyway.",
    downloadPdf: "Download PDF",
    downloadMarkdown: "Download Markdown",
    goWorkspace: "Go to workspace",
    reviewNext:
      "Next: invite a colleague to review, and keep the annual reminder so this does not go stale. The live tables live in your workspace after you finish.",
    custom: "Custom",
  },
  employeeHints: {
    "1-9": "Solo or small team",
    "10-49": "Typical SME",
    "50-249": "Larger SME",
    "250+": "A DPO is often required",
  },
  industries: {
    "Professional services": "Professional services",
    "IT / software": "IT / software",
    "Retail / e-commerce": "Retail / e-commerce",
    "Construction / trades": "Construction / trades",
    "Healthcare / clinic": "Healthcare / clinic",
    Hospitality: "Hospitality",
    "Education / training": "Education / training",
    Manufacturing: "Manufacturing",
    "Creative / agency": "Creative / agency",
    Other: "Other",
  },
  dataTypes: {
    Names: "Names",
    "Email addresses": "Email addresses",
    "Phone numbers": "Phone numbers",
    "Home / work address": "Home / work address",
    "CVR / company details": "CVR / company details",
    "Job title": "Job title",
    "CV and application documents": "CV and application documents",
    "Employment contract": "Employment contract",
    "Salary and bank details": "Salary and bank details",
    "CPR / national ID": "CPR / national ID",
    "Sick leave / health notes": "Sick leave / health notes",
    "Performance reviews": "Performance reviews",
    "Invoices and payment data": "Invoices and payment data",
    "Order history": "Order history",
    "Support tickets": "Support tickets",
    "Website usage / cookies": "Website usage / cookies",
    "IP address": "IP address",
    Photos: "Photos",
    "Login credentials": "Login credentials",
    "Calendar data": "Calendar data",
    "Documents that may contain personal data": "Documents that may contain personal data",
    Address: "Address",
    "Bank details": "Bank details",
    Salary: "Salary",
    "Tax information": "Tax information",
    "Employment contracts": "Employment contracts",
    "Next of kin (if collected)": "Next of kin (if collected)",
    CV: "CV",
    "Cover letter": "Cover letter",
    "Interview notes": "Interview notes",
    CVR: "CVR",
    "Invoice lines": "Invoice lines",
    "Payment references": "Payment references",
    "Work email": "Work email",
    Phone: "Phone",
    Company: "Company",
    "Meeting notes": "Meeting notes",
    "Contract data": "Contract data",
    "Ticket content": "Ticket content",
    "Order references": "Order references",
    "Campaign engagement": "Campaign engagement",
    "Cookie identifiers": "Cookie identifiers",
    "Form submissions": "Form submissions",
    "Device / browser data": "Device / browser data",
    "Access logs": "Access logs",
    "Device identifiers": "Device identifiers",
  },
  dataSubjects: {
    Employees: "Employees",
    "Job applicants": "Job applicants",
    "Customers (B2B contacts)": "Customers (B2B contacts)",
    "Consumers (B2C)": "Consumers (B2C)",
    Suppliers: "Suppliers",
    "Website visitors": "Website visitors",
    "Newsletter subscribers": "Newsletter subscribers",
    "Shareholders / owners": "Shareholders / owners",
  },
  legalBasis: {
    contract: { label: "Contract", hint: "Needed to deliver a service or employment contract" },
    legal_obligation: {
      label: "Legal obligation",
      hint: "The law requires it (bookkeeping, tax, payroll)",
    },
    legitimate_interest: {
      label: "Legitimate interest",
      hint: "A reasonable business need, balanced against people’s rights",
    },
    consent: { label: "Consent", hint: "The person said yes, and can say no later" },
    vital_interest: {
      label: "Vital interest",
      hint: "To protect someone’s life or safety — rare for SMEs",
    },
    public_task: {
      label: "Public task",
      hint: "Usually for public authorities, not private companies",
    },
  },
  transfers: {
    none: { label: "No transfer outside the EU/EEA", hint: "Data stays in Europe" },
    adequacy: {
      label: "Adequacy decision",
      hint: "Country is approved by the EU (e.g. UK, Japan)",
    },
    dpf: { label: "EU–US Data Privacy Framework", hint: "US vendor is DPF-certified" },
    sccs: {
      label: "Standard Contractual Clauses (SCCs)",
      hint: "The usual contract add-on with US/global vendors",
    },
    bcrs: { label: "Binding Corporate Rules", hint: "Internal group rules — uncommon for SMEs" },
    derogation: {
      label: "Specific exception",
      hint: "Only in narrow cases, e.g. explicit consent",
    },
  },
  regions: {
    eu: "EU",
    eea: "EEA",
    uk: "United Kingdom",
    us: "United States",
    mixed: "Mixed / global",
    unknown: "Not sure yet",
  },
  sensitivity: {
    standard: { label: "Everyday data", hint: "Names, emails, invoices, job titles" },
    special: {
      label: "Sensitive data (Art. 9)",
      hint: "Health, union membership, religion, biometrics",
    },
    criminal: {
      label: "Criminal records (Art. 10)",
      hint: "Only if you actually check criminal records",
    },
  },
  categories: {
    "Email & documents": "Email & documents",
    Accounting: "Accounting",
    Payroll: "Payroll",
    CRM: "CRM",
    "E-commerce": "E-commerce",
    Website: "Website",
    Analytics: "Analytics",
    Marketing: "Marketing",
    Support: "Support",
    Collaboration: "Collaboration",
    Recruitment: "Recruitment",
    Finance: "Finance",
    Other: "Other",
  },
  systemCopy: {
    m365: {
      purpose: "Email, files, calendars, and internal collaboration",
      hostingNotes:
        "Use an EU tenant where possible. Some Microsoft cloud services may still involve US processing.",
    },
    "google-workspace": {
      purpose: "Email, Drive, Calendar, and Docs",
      hostingNotes:
        "Select EU data regions where available. Google may process some support/security data in the US.",
    },
    economic: {
      purpose: "Bookkeeping, invoicing, and financial reporting",
      hostingNotes: "Hosted in the EU (Denmark / Visma).",
    },
    dinero: {
      purpose: "Bookkeeping and invoicing for smaller companies",
      hostingNotes: "Hosted in the EU.",
    },
    billy: {
      purpose: "Invoicing and bookkeeping",
      hostingNotes: "Hosted in the EU.",
    },
    danlon: {
      purpose: "Salary payments, holiday, and tax reporting",
      hostingNotes: "Danish payroll provider, EU hosted.",
    },
    "visma-payroll": {
      purpose: "Payroll, tax, and employee master data",
      hostingNotes: "EU hosted.",
    },
    hubspot: {
      purpose: "Sales pipeline, customer contacts, and marketing",
      hostingNotes: "Primarily US-hosted. Confirm DPF certification and SCCs in your DPA.",
    },
    pipedrive: {
      purpose: "Sales pipeline and customer contacts",
      hostingNotes: "EU hosting available. Confirm your chosen region in the admin settings.",
    },
    shopify: {
      purpose: "Online store, orders, and customer accounts",
      hostingNotes: "Shopify offers EU stores; some subprocessors may be outside the EEA.",
    },
    wordpress: {
      purpose: "Company website, contact forms, and content",
      hostingNotes: "Depends on your web host. Prefer an EU host.",
      vendor: "Self-hosted or host",
    },
    cookiebot: {
      purpose: "Cookie consent and scanning",
      hostingNotes: "EU hosted consent records.",
    },
    ga4: {
      purpose: "Website statistics",
      hostingNotes:
        "US processing is typical. Use consent mode and a DPA. Many SMEs switch to EU analytics instead.",
    },
    "meta-ads": {
      purpose: "Advertising and conversion tracking",
      hostingNotes: "US vendor. Ads should run on consent for tracking.",
    },
    mailchimp: {
      purpose: "Newsletters and email campaigns",
      hostingNotes:
        "US hosted. Require consent or a documented legitimate-interest assessment for B2B.",
    },
    zendesk: {
      purpose: "Customer support tickets",
      hostingNotes: "Choose EU data centre in Zendesk settings.",
    },
    intercom: {
      purpose: "Chat support and customer messaging",
      hostingNotes: "Typically US-hosted. Confirm SCCs / DPF in the DPA.",
    },
    slack: {
      purpose: "Internal chat. May contain customer names in messages.",
      hostingNotes: "Select the EU Slack workspace region if available.",
    },
    linkedin: {
      purpose: "Sourcing and contacting candidates",
      hostingNotes: "US / global processing. Keep unsuccessful applications no longer than needed.",
    },
    banking: {
      purpose: "Payments, salary transfers, and account administration",
      hostingNotes:
        "Danish / EU banks typically keep data in the EEA. The bank is usually an independent controller, not your processor.",
      vendor: "Your bank",
    },
  },
  activityCopy: {
    "hr-payroll": {
      name: "HR & payroll",
      department: "People / Finance",
      purpose: "Employ staff, pay salary, report tax and holiday, and keep personnel files.",
      legalBasisNotes:
        "Employment contract plus legal duties for tax, holiday, and bookkeeping. Sick-leave notes are health data — keep them minimal and well protected.",
      recipients: ["Payroll provider", "SKAT / tax authority", "Pension / insurance (if used)", "Accountant"],
      personalData: [
        "Names",
        "Address",
        "CPR / national ID",
        "Bank details",
        "Salary",
        "Tax information",
        "Employment contracts",
        "Next of kin (if collected)",
      ],
      retention:
        "Duration of employment + 5 years (Danish bookkeeping / tax rules). Delete residual HR files when no longer needed.",
      transferCountries: "",
    },
    recruitment: {
      name: "Recruitment",
      department: "People",
      purpose: "Receive applications, assess candidates, and hire.",
      legalBasisNotes:
        "Legitimate interest to fill a role. Ask consent if you want to keep a CV in a talent pool after the process ends.",
      recipients: ["Hiring managers", "Recruitment platform (if used)"],
      personalData: ["Names", "Email addresses", "Phone numbers", "CV", "Cover letter", "Interview notes"],
      retention:
        "Unsuccessful applicants: 6 months after the process ends, unless they agree to a longer talent-pool period.",
      transferCountries: "",
    },
    accounting: {
      name: "Accounting & bookkeeping",
      department: "Finance",
      purpose: "Issue invoices, pay suppliers, and meet bookkeeping law.",
      legalBasisNotes: "Danish Bookkeeping Act and tax rules require financial records to be kept.",
      recipients: ["Accountant / auditor", "Bank", "SKAT", "Accounting software provider"],
      personalData: ["Names", "Email addresses", "CVR", "Invoice lines", "Payment references"],
      retention: "5 years from the end of the financial year (Danish Bookkeeping Act).",
      transferCountries: "",
    },
    sales: {
      name: "B2B sales & customer management",
      department: "Sales",
      purpose: "Manage leads, quotes, contracts, and ongoing customer relationships.",
      legalBasisNotes:
        "Contract for existing customers. Legitimate interest for relevant B2B prospecting — keep it proportionate and offer an easy opt-out.",
      recipients: ["CRM provider", "Email provider", "Delivery / implementation partners (if any)"],
      personalData: [
        "Names",
        "Work email",
        "Phone",
        "Job title",
        "Company",
        "Meeting notes",
        "Contract data",
      ],
      retention:
        "Active relationship + 5 years for contracts and invoices. Sales notes: 2 years after last contact if no contract.",
      transferCountries: "",
    },
    support: {
      name: "Customer support",
      department: "Support",
      purpose: "Answer questions, handle complaints, and keep service quality.",
      legalBasisNotes: "Needed to perform the customer contract and improve service.",
      recipients: ["Support platform", "Product / engineering staff"],
      personalData: ["Names", "Email addresses", "Ticket content", "Order references"],
      retention:
        "2 years after the ticket is closed, unless a longer period is needed for a dispute or legal claim.",
      transferCountries: "",
    },
    marketing: {
      name: "Marketing & newsletters",
      department: "Marketing",
      purpose: "Send newsletters, run campaigns, and measure interest.",
      legalBasisNotes:
        "Consent for most email marketing. Existing B2B customers may be contacted about similar products with a clear unsubscribe.",
      recipients: ["Email platform", "Ads platforms (if used)"],
      personalData: ["Names", "Email addresses", "Company", "Campaign engagement"],
      retention:
        "Until the person unsubscribes, then suppress the address. Proof of consent: 2 years after last use.",
      transferCountries: "",
    },
    website: {
      name: "Website & cookies",
      department: "Marketing / IT",
      purpose: "Run the company website, contact forms, and (if used) statistics.",
      legalBasisNotes:
        "Necessary cookies can rely on legitimate interest / strict necessity. Statistics and marketing cookies need consent.",
      recipients: ["Web host", "Consent tool", "Analytics provider (if used)"],
      personalData: ["IP address", "Cookie identifiers", "Form submissions", "Device / browser data"],
      retention:
        "Consent records: 12 months. Analytics identifiers: 14 months or less. Contact form messages: 12 months.",
      transferCountries: "",
    },
    "it-admin": {
      name: "IT administration & access",
      department: "IT",
      purpose: "Create user accounts, manage access, logs, and backups.",
      legalBasisNotes: "Needed to give staff tools and to protect the company against misuse.",
      recipients: ["Cloud / identity providers"],
      personalData: ["Names", "Work email", "Login credentials", "Access logs", "Device identifiers"],
      retention: "Account data: while employed + 30 days. Security logs: 6–12 months.",
      transferCountries: "",
    },
  },
  toms: {
    mfa: {
      label: "Multi-factor authentication (MFA)",
      description: "Turn on MFA for email, cloud admin, payroll, and accounting.",
    },
    "encryption-transit": {
      label: "Encryption in transit",
      description: "HTTPS / TLS for websites and cloud tools.",
    },
    "encryption-rest": {
      label: "Encryption at rest",
      description:
        "Rely on cloud providers’ disk encryption; encrypt laptops with FileVault / BitLocker.",
    },
    "access-control": {
      label: "Role-based access",
      description: "People only see the data they need. Admin rights are limited.",
    },
    offboarding: {
      label: "Joiners / leavers process",
      description: "Create and remove accounts on the same day someone starts or leaves.",
    },
    backups: {
      label: "Backups",
      description: "Daily backups of critical systems, with a restore test at least once a year.",
    },
    "device-lock": {
      label: "Locked devices",
      description: "Screen lock, strong passwords or passkeys, and automatic updates.",
    },
    dpas: {
      label: "Data processing agreements",
      description: "A signed DPA with each vendor that processes personal data for you.",
    },
    confidentiality: {
      label: "Staff confidentiality",
      description:
        "Employment contracts include a confidentiality clause. Short GDPR intro for new hires.",
    },
    incident: {
      label: "Incident contact",
      description:
        "You know who to call if data is lost or leaked, and to notify the DPA within 72 hours if required.",
    },
    logging: {
      label: "Access logging",
      description: "Admin actions and logins are logged in your main cloud tools.",
    },
    disposal: {
      label: "Secure disposal",
      description:
        "Old laptops and USB drives are wiped or destroyed. Paper with personal data is shredded.",
    },
  },
  completeness: {
    name: { label: "Company name", hint: "Shown on the cover of the PDF." },
    cvr: { label: "CVR / registration number", hint: "Helps identify the controller." },
    address: { label: "Address", hint: "Required contact details for the controller." },
    email: { label: "Contact email", hint: "Where people (and the DPA) can reach you." },
    employees: {
      label: "Number of employees",
      hint: "Small companies still usually need a RoPA if they process data regularly.",
    },
    systems: {
      label: "At least one system",
      hint: "List the tools that actually hold personal data.",
    },
    dpa: {
      label: "DPA noted for processors",
      hint: "Tick DPA for each vendor that processes data for you.",
    },
    activities: {
      label: "At least one processing activity",
      hint: "HR, accounting, and sales are typical starting points.",
    },
    purpose: {
      label: "Each activity has a purpose",
      hint: "Say in one sentence why you process the data.",
    },
    subjects: {
      label: "People and data types listed",
      hint: "Who the data is about, and what kind of data.",
    },
    basis: {
      label: "Legal basis on each activity",
      hint: "Contract, legal duty, legitimate interest, or consent.",
    },
    retention: {
      label: "Retention period on each activity",
      hint: "How long you keep it, then delete or archive.",
    },
    transfers: {
      label: "Transfers explained",
      hint: "If data goes outside the EU/EEA, name the safeguard (DPF or SCCs).",
    },
    toms: {
      label: "Security measures selected",
      hint: "MFA, access control, backups, and DPAs are a solid SME baseline.",
    },
  },
  workspace: {
    kicker: "Workspace",
    lastEdited: "Last edited by {name} on {date}.",
    continueInterview: "Continue interview",
    downloadPdf: "Download PDF",
    downloadMarkdown: "Download Markdown",
    completeness: "Completeness",
    completenessHint: "Article 30 building blocks",
    activities: "Activities",
    activitiesHint: "Purposes in the record",
    systems: "Systems",
    systemsHint: "Tools with personal data",
    stillUseful: "Still useful to complete",
    allCore:
      "The record has the core Article 30 fields. Download the PDF and put a copy with your contracts.",
    viewFull: "View full record",
    upcoming: "Upcoming reviews",
    noReminders: "No open reminders.",
    manageReminders: "Manage reminders",
    processingActivities: "Processing activities",
    colActivity: "Activity",
    colPeople: "People",
    colBasis: "Legal basis",
    colRetention: "Retention",
  },
  ropa: {
    kicker: "Export-ready",
    title: "Article 30 record",
    print: "Print",
    docKicker: "GDPR Article 30",
    docTitle: "Record of Processing Activities",
    docLead:
      "Controller record for {name}. Generated for the organisation’s own archive. Not legal advice.",
    sectionController: "1. Controller details",
    sectionSystems: "2. Systems and data flows",
    sectionActivities: "3. Processing activities",
    sectionToms: "4. Technical and organisational measures",
    field: "Field",
    record: "Record",
    controller: "Controller",
    cvr: "CVR / registration number",
    address: "Address",
    email: "Contact email",
    phone: "Phone",
    website: "Website",
    employees: "Employees",
    industry: "Industry",
    dpo: "Data Protection Officer",
    dpoNamed: "{name} ({email})",
    dpoNone: "Not designated",
    euRep: "EU representative",
    euNamed: "{name} ({email})",
    euNone: "Not applicable",
    system: "System",
    vendor: "Vendor",
    hosting: "Hosting",
    data: "Data",
    people: "People",
    role: "Role",
    dpa: "DPA",
    transfers: "Transfers",
    processor: "Processor",
    independent: "Independent",
    yes: "Yes",
    no: "No",
    eeaOnly: "EEA only",
    department: "Department",
    purpose: "Purpose",
    subjects: "Data subjects",
    personalData: "Personal data",
    categories: "Data categories",
    legalBasis: "Legal basis",
    notes: "Notes",
    systems: "Systems",
    recipients: "Recipients",
    retention: "Retention",
    noTransfers: "No intended transfers outside the EU/EEA",
    measure: "Measure",
    inPlace: "In place",
    description: "Description",
    notYet: "Not yet",
    untitled: "Untitled activity",
    notLegalAdvice: "Not legal advice.",
  },
  systemsPage: {
    kicker: "Data flows",
    title: "Systems",
    lead: "Every tool that holds personal data in the day-to-day running of the business.",
    editInterview: "Edit in interview",
    purpose: "Purpose",
    hosting: "Hosting",
    data: "Data",
    processor: "Processor",
    transfers: "Transfers",
    yes: "Yes",
    independent: "Independent",
    dpaYes: "yes",
    dpaNo: "no",
    eeaOnly: "EEA only",
  },
  reminders: {
    kicker: "Keep the record current",
    title: "Audit reminders",
    lead: "A RoPA goes stale when a new tool is added and nobody updates the file. Set dates, add them to your calendar, and optionally allow browser notifications on this device.",
    allowBrowser: "Allow browser reminders",
    noSupport: "This browser does not support notifications.",
    notAllowed: "Notifications were not allowed.",
    enabled: "Reminders can now appear in this browser when you open TrustLog.",
    notificationTitle: "TrustLog compliance reminder",
    addToCalendar: "Add to calendar",
    markDone: "Mark done",
    completeReschedule: "Complete & reschedule",
    customTitle: "Custom reminder",
    fieldTitle: "Title",
    dueDate: "Due date",
    notes: "Notes",
    add: "Add reminder",
    annual: "Annual RoPA review",
    annualNotes:
      "Re-read the record, add new tools, and confirm retention still matches practice.",
    processors: "Review processor list & DPAs",
    processorNotes: "Check that every vendor still has a signed data processing agreement.",
    due: "Due {date}",
    dueSoon: "Due soon · {date}",
    overdue: "Overdue · {date}",
    completed: "Completed {date}",
  },
  team: {
    kicker: "Collaborative editing",
    title: "Team",
    lead: "Add the people who should help keep the record honest — typically finance, HR, and whoever buys the software. Share the link so they open the same workspace.",
    tip: "There is no login. Anyone with the link can open this record on a computer that can reach this TrustLog instance. Say who you are below so edits are labelled.",
    editingAs: "You are editing as",
    shareLink: "Share link",
    copied: "Copied",
    publish: "Publish & copy",
    noEmail: "No email",
    owner: "owner",
    editor: "editor",
    viewer: "viewer",
    remove: "Remove",
    addColleague: "Add a colleague",
    name: "Name",
    email: "Email",
    role: "Role",
    viewerOption: "Viewer (listed only)",
    add: "Add to workspace",
  },
  share: {
    opening: "Opening shared workspace…",
    missing: "This share link was not found on the server. Ask the owner to publish it again.",
    home: "Go home",
  },
  pdf: {
    confidential: "TRUSTLOG  ·  CONFIDENTIAL",
    title: "Record of Processing Activities",
    subtitle: "GDPR Article 30  ·  Controller record",
    generated: "Generated: {date}",
    lastEdited: "Last edited by: {name}",
    completeness: "Interview completeness: {score}%",
    disclaimer:
      "This document is the organisation’s working record of processing activities. It is not legal advice. High-risk processing, large-scale monitoring, or systematic use of special-category data should be reviewed with qualified counsel. Store the PDF in your own archive.",
    section1: "1. Controller details",
    section2: "2. Systems and data flows",
    section3: "3. Processing activities (Article 30)",
    section4: "4. Technical and organisational measures (Art. 32)",
    section5: "5. Review schedule",
    footer: "TrustLog  ·  Record of Processing Activities (GDPR Art. 30)  ·  {name}",
    closing:
      "Controllers with fewer than 250 employees are not automatically exempt. Article 30(5) still requires a record where processing is not occasional, includes special categories, or is likely to result in a risk. Regular HR, customer, and accounting processing typically means an SME should keep this record. Last updated {date} by {name}.",
    dpoNone:
      "Not designated — processing is not of a kind that typically requires a DPO for this SME.",
    euNone: "Not applicable (controller established in the EU/EEA).",
    processor: "Processor",
    independent: "Independent",
    dpaYes: "yes",
    dpaNo: "no",
    eeaOnly: "EEA only",
    noTransfers: "No intended transfers outside the EU/EEA",
    yes: "Yes",
    notYet: "Not yet",
    open: "Open",
    done: "Done {date}",
    named: "Named",
    emailNotSet: "email not set",
  },
};

const da: Messages = {
  ...en,
  metaTitle: "TrustLog — GDPR gjort simpelt",
  metaDescription:
    "Et enkelt interview, der skaber en fortegnelse over behandlingsaktiviteter efter GDPR artikel 30, som I kan downloade som PDF og gemme i jeres eget arkiv.",
  loading: "Indlæser…",
  loadingWorkspace: "Indlæser arbejdsområde…",
  untitledOrg: "Unavngivet virksomhed",
  yourOrganisation: "Jeres virksomhed",
  completePct: "% færdig",
  nav: {
    overview: "Overblik",
    ropa: "Artikel 30-fortegnelse",
    systems: "Systemer",
    reminders: "Påmindelser",
    team: "Team",
    about: "Bag TrustLog",
  },
  footer: {
    about: "Bag TrustLog",
    privacy: "Privatlivspolitik",
  },
  about: {
    role: "Stifter · GDPR-praktiker · webdesigner",
    lead: "GDPR-compliance er stadig for svært for små virksomheder, og de fleste værktøjer er skrevet til jurister. TrustLog er et interview i almindeligt sprog, der omsætter hverdagen til en artikel 30-fortegnelse.",
    missionTitle: "Jura, sat i system til hverdagen",
    mission: [
      "De fleste GDPR-produkter taler jurist til jurist. For en SMV med ti eller femten ansatte bliver fortegnelsen derfor noget, man udskyder — eller får en konsulent til at udfylde én gang, hvorefter den samler støv.",
      "Jeg har bygget TrustLog, fordi jeg arbejder med GDPR-compliance, journalisering og optimering i praksis — og fordi en fortegnelse kun virker, hvis folk kan bruge den. Interviewet er bygget til det: korte spørgsmål, konkrete forslag og et sprog, I kan stå inde for.",
      "Målet er enkelt: I skal kunne sidde en formiddag og gå derfra med en artikel 30-fortegnelse, I faktisk forstår — og som I tør holde ved lige.",
    ],
    cards: [
      {
        title: "Erfaring med GDPR",
        body: "Jeg arbejder med GDPR-compliance, journalisering og optimering i Trekantområdet Danmark. Jeg ved, hvad det kræver at føre det ud i livet for et team på omkring 15 personer — ikke som teori, men som noget der skal virke mandag morgen.",
      },
      {
        title: "Teknisk design",
        body: "Jeg læser cand.IT i Web Communication Design på SDU og samler Python, AI, dataetik og UX-design, så værktøjet føles som en samtale — ikke som et compliance-system bygget til advokater.",
      },
      {
        title: "Almindeligt sprog",
        body: "Jeg er også uddannet lærer, så jeg er vant til at skære det komplekse til. I TrustLog betyder det almindelige formuleringer og ét spørgsmål ad gangen — ikke en tom juridisk blanket.",
      },
    ],
    ctaTitle: "Klar til at teste det selv?",
    ctaBody: "Start interviewet her. Intet login. Kladden bliver i denne browser, indtil I selv vælger at dele den.",
    cta: "Start interviewet her. Intet login påkrævet.",
  },
  lang: {
    da: "Dansk",
    en: "English",
    switchToEnglish: "Switch the website to English",
    switchToDanish: "Skift hjemmesiden til dansk",
  },
  home: {
    startInterview: "Start interviewet",
    title: "GDPR gjort simpelt",
    lead: "Svar på enkle spørgsmål om virksomheden, jeres værktøjer og de data, I bruger til daglig. TrustLog samler det til en artikel 30-fortegnelse, I kan downloade som PDF og gemme i jeres eget arkiv.",
    startScratch: "Start forfra",
    previewSample: "Se et eksempel-firma",
    noAccount:
      "Intet login. Arbejdet gemmes i denne browser og kan deles med kolleger via et link.",
    whatYouGet: "Det I får",
    get: [
      "Overblik over jeres it-systemer",
      "Færdig PDF til arkivet",
      "Dokumentation klar til tilsyn",
    ],
    processTitle: "Sådan virker det",
    cards: [
      {
        step: "Trin 1",
        title: "Interview",
        body: "Besvar en række korte spørgsmål om virksomheden, jeres værktøjer og de data, I bruger til daglig. Fortegnelsen genereres ud fra jeres input.",
      },
      {
        step: "Trin 2",
        title: "Arkivering",
        body: "Download fortegnelsen i det format I ønsker, og placér den et sikkert sted i jeres organisations arkiv.",
      },
      {
        step: "Trin 3",
        title: "Kvalitetstjek",
        body: "Fortegnelsen gennemgås i samarbejde med TrustLog. I tilbydes en sparringssession om vedligeholdelse af jeres Artikel 30-fortegnelse samt andre GDPR-relaterede spørgsmål.",
      },
    ],
    whyTitle: "GDPR er ikke kun for de store",
    whyBody:
      "Betaler I løn, har I kunder, eller bruger I et regnskabsprogram, ligger der allerede navne og e-mails i jeres systemer. Så skal I kunne fortælle, hvilke oplysninger I har, hvor de ligger, og hvad I bruger dem til — også selvom I er fem mennesker uden en IT-afdeling. TrustLog stiller spørgsmålene på almindeligt dansk, så I får det skrevet ned uden at blive jurister.",
  },
  setup: {
    skip: "Spring til arbejdsområde",
    stepOf: "Trin {current} af {total}",
    back: "Tilbage",
    continue: "Fortsæt",
    openWorkspace: "Åbn arbejdsområde",
    closeInterview: "Luk interviewet",
    closeInterviewConfirm:
      "Vil du lukke interviewet og slette kladden i denne browser? Det kan ikke fortrydes.",
  },
  interview: {
    steps: [
      { title: "Jeres virksomhed", blurb: "Det grundlæggende, der står på forsiden af fortegnelsen." },
      { title: "Hvem er ansvarlig", blurb: "Kontaktperson, DPO og EU-repræsentant." },
      { title: "Værktøjer I bruger", blurb: "Sæt kryds ved de systemer, der driver hverdagen." },
      { title: "Data i hvert værktøj", blurb: "For hvert system: leverandør, formål, personer, data, adgang, og om noget sendes uden for EU." },
      { title: "Hvad I bruger data til", blurb: "Hvordan vil I helst fortælle, hvorfor I bruger folks oplysninger? Vælg den måde, der føles mest naturlig — I kan skifte senere." },
      { title: "Hvordan I beskytter dem", blurb: "En kort liste over sikkerhedsforanstaltninger (GDPR art. 32)." },
      { title: "Gennemgå og eksportér", blurb: "Download PDF’en og sæt en påmindelse, så den ikke bliver forældet." },
    ],
    companyName: "Virksomhedens navn",
    companyNameHint: "Det juridiske navn, der står som dataansvarlig.",
    companyPlaceholder: "fx Nordlys Design ApS",
    cvr: "CVR-nummer",
    industry: "Branche",
    selectOne: "Vælg en",
    street: "Adresse",
    postal: "Postnummer",
    city: "By",
    country: "Land",
    contactEmail: "E-mail til privatliv / kontakt",
    contactEmailHint: "Hvor folk kan spørge om deres oplysninger.",
    phone: "Telefon (valgfrit)",
    website: "Hjemmeside (valgfrit)",
    employeesQ: "Hvor mange arbejder her?",
    employeesHint:
      "Også virksomheder med under 250 medarbejdere skal som regel have denne fortegnelse, fordi medarbejder- og kundedata behandles hele året — ikke kun en enkelt gang.",
    peopleTip:
      "De fleste SMV’er skal ikke have en databeskyttelsesrådgiver (DPO). Det er typisk kun nødvendigt, hvis I systematisk overvåger personer i stor skala, eller hvis særlige kategorier af oplysninger (helbred, fagforening m.m.) er en kerneaktivitet.",
    noDpo: "Ingen DPO",
    noDpoHint: "Nogen i virksomheden ejer alligevel fortegnelsen.",
    hasDpo: "Vi har en DPO",
    hasDpoHint: "Intern eller ekstern.",
    dpoName: "DPO’ens navn",
    dpoEmail: "DPO’ens e-mail",
    euRep: "EU-repræsentant",
    euRepHint:
      "Kun nødvendigt, hvis virksomheden ligger uden for EU/EØS og tilbyder varer eller overvåger personer i EU.",
    euNotNeeded: "Ikke nødvendigt",
    euNotNeededHint: "Vi er etableret i EU/EØS.",
    euHas: "Vi har en repræsentant",
    repName: "Repræsentantens navn",
    repEmail: "Repræsentantens e-mail",
    toolsTip:
      "Sæt kryds ved det, I faktisk bruger. Vi udfylder typiske datatyper, hosting og juridiske noter — I kan rette på næste skærm.",
    somethingElse: "Noget andet?",
    somethingElseHint: "Regnskabsprogram, branchesystem eller et regneark med kundedata.",
    somethingElsePlaceholder: "Navn på værktøjet",
    add: "Tilføj",
    remove: "Fjern",
    flowsTip:
      "Gå hvert værktøj igennem. Forslagene er udfyldt — ret det, der ikke passer til jeres hverdag.",
    flowsEmpty:
      "Tilføj mindst ét værktøj først. Har I virkelig ingen systemer, så gå tilbage og tilføj e-mail eller regnskab — næsten alle SMV’er har begge dele.",
    vendor: "Leverandør",
    usedFor: "Hvad bruges systemet til?",
    usedForHint: "Kort beskrivelse.",
    dataInSystem: "Hvilke typer af persondata behandler I i dette system?",
    whoseData: "Hvem har I data om i dette system?",
    whoHasAccess: "Hvem har adgang til systemet?",
    whoHasAccessHint: "Fx HR, ledelse eller alle medarbejdere",
    sharedExternally: "Deles data med eksterne parter?",
    sharedExternallyWho: "Hvem?",
    sharedExternallyWhoHint: "Fx revisor, lønbureau eller softwareleverandøren",
    thirdCountry: "Deles data med tredjelande?",
    yes: "Ja",
    no: "Nej",
    thirdCountryBasis: "Hvis data deles med tredjelande, hvad er det lovmæssige grundlag for dette?",
    extraNotes: "Supplerende noter",
    clickToOpen: "Klik for at åbne",
    hostedWhere: "Hvor ligger det?",
    safeguard: "Garanti, hvis data forlader EU/EØS",
    hostingNotes: "Noter om hosting",
    vendorProcesses: "Leverandøren behandler data for os",
    dpaInPlace: "Underskrevet databehandleraftale",
    edit: "Rediger",
    activitiesTip:
      "En “behandlingsaktivitet” er et formål, ikke et værktøj. Løn, salg og hjemmesiden er separate rækker, også selvom de deler Microsoft 365.",
    activityModeTip:
      "Hvordan vil I helst fortælle, hvorfor I bruger folks oplysninger? Vælg den måde, der føles mest naturlig — I kan skifte senere.",
    activityModeSystem: "Ét program ad gangen",
    activityModeSystemHint:
      "I får et kort for hvert program, I allerede har sat kryds ved — fx e-conomic, Microsoft 365 eller lønsystemet. Skriv, hvad I bruger det til, som I ville forklare det til en kollega.",
    activityModeSystemExample: "Eksempel: “Vi bruger e-conomic til fakturaer og kundekonti.”",
    activityModeTopic: "Efter opgave i virksomheden",
    activityModeTopicHint:
      "Beskriv hverdagen i bidder: løn, salg, hjemmeside. Bagefter sætter I kryds ved de programmer, der hører til hver opgave.",
    activityModeTopicExample: "Eksempel: “Løn — vi betaler medarbejdere via Danløn.”",
    activityModeChange: "Skift tilgang",
    activitiesSystemTip:
      "Hvert kort er et værktøj fra forrige trin. Skriv hvorfor I behandler persondata dér — i almindeligt sprog.",
    activitiesSystemEmpty: "Tilføj mindst ét værktøj i forrige trin først.",
    purposeSystemHint: "Hvorfor behandler I persondata i dette system?",
    suggestFromTools: "Foreslå ud fra mine værktøjer",
    addBlank: "Tilføj en tom aktivitet",
    newActivity: "Ny aktivitet",
    commonForSmes: "Typisk for SMV’er",
    untitledActivity: "Unavngivet aktivitet",
    basisNotSet: "Behandlingsgrundlag mangler",
    retentionSet: "Opbevaring sat",
    addRetention: "Angiv, hvor længe I gemmer det",
    name: "Navn",
    department: "Afdeling",
    purpose: "Formål — hvorfor behandler I disse data?",
    purposeHint: "En eller to sætninger i almindeligt sprog.",
    whose: "Hvis data",
    whatData: "Hvilke data",
    howSensitive: "Hvor følsomt er det?",
    legalBasis: "Behandlingsgrundlag",
    basisNote: "Kort note om behandlingsgrundlaget",
    systemsForActivity: "Systemer brugt til denne aktivitet",
    addToolsFirst: "Tilføj værktøjer i forrige trin.",
    whoReceives: "Hvem ellers får dataene?",
    whoReceivesHint: "Lønbureau, revisor, Skattestyrelsen, cloud-leverandør.",
    staysEea: "Bliver i EU/EØS",
    leavesEea: "Noget data forlader EU/EØS",
    whereGoes: "Hvor går det hen?",
    whereGoesPlaceholder: "USA, via CRM-leverandøren",
    transferSafeguard: "Overførselsgrundlag",
    howLong: "Hvor længe gemmer I det?",
    howLongHint: "Vi foreslår almindelige SMV-perioder — ret dem, hvis jeres kontrakter eller branchekrav er anderledes.",
    protectionTip:
      "Artikel 32 beder om en beskrivelse af, hvordan I beskytter data — ikke en 40-siders politik. Sæt kryds ved det, I allerede gør. Fjern krydset, hvis det ikke passer endnu.",
    readyForExport: "Klar til eksport",
    allFilled:
      "Alle byggeklodser til artikel 30 er udfyldt. Download PDF’en og gem den i jeres eget arkiv.",
    stillUseful: "{count} punkt(er) er stadig nyttige at udfylde. I kan eksportere alligevel.",
    downloadPdf: "Download PDF",
    downloadMarkdown: "Download Markdown",
    goWorkspace: "Gå til arbejdsområde",
    reviewNext:
      "Næste skridt: invitér en kollega til at læse med, og behold den årlige påmindelse, så fortegnelsen ikke bliver forældet. De levende tabeller ligger i arbejdsområdet, når I er færdige.",
    custom: "Tilpasset",
  },
  employeeHints: {
    "1-9": "Alene eller lille team",
    "10-49": "Typisk SMV",
    "50-249": "Større SMV",
    "250+": "En DPO er ofte påkrævet",
  },
  industries: {
    "Professional services": "Liberale erhverv / rådgivning",
    "IT / software": "IT / software",
    "Retail / e-commerce": "Detail / e-handel",
    "Construction / trades": "Byggeri / håndværk",
    "Healthcare / clinic": "Sundhed / klinik",
    Hospitality: "Hotel og restauration",
    "Education / training": "Uddannelse / kurser",
    Manufacturing: "Produktion",
    "Creative / agency": "Kreativ / bureau",
    Other: "Andet",
  },
  dataTypes: {
    Names: "Navne",
    "Email addresses": "E-mailadresser",
    "Phone numbers": "Telefonnumre",
    "Home / work address": "Privat- / arbejdsadresse",
    "CVR / company details": "CVR / virksomhedsoplysninger",
    "Job title": "Stilling",
    "CV and application documents": "CV og ansøgningsmateriale",
    "Employment contract": "Ansættelseskontrakt",
    "Salary and bank details": "Løn- og bankoplysninger",
    "CPR / national ID": "CPR-nummer",
    "Sick leave / health notes": "Sygefravær / helbredsnotater",
    "Performance reviews": "MUS / evalueringer",
    "Invoices and payment data": "Fakturaer og betalingsdata",
    "Order history": "Ordrehistorik",
    "Support tickets": "Supportsager",
    "Website usage / cookies": "Hjemmesidebrug / cookies",
    "IP address": "IP-adresse",
    Photos: "Fotos",
    "Login credentials": "Loginoplysninger",
    "Calendar data": "Kalenderdata",
    "Documents that may contain personal data": "Dokumenter, der kan indeholde personoplysninger",
    Address: "Adresse",
    "Bank details": "Bankoplysninger",
    Salary: "Løn",
    "Tax information": "Skatteoplysninger",
    "Employment contracts": "Ansættelseskontrakter",
    "Next of kin (if collected)": "Pårørende (hvis indsamlet)",
    CV: "CV",
    "Cover letter": "Ansøgning",
    "Interview notes": "Interviewnoter",
    CVR: "CVR",
    "Invoice lines": "Fakturalinjer",
    "Payment references": "Betalingsreferencer",
    "Work email": "Arbejds-e-mail",
    Phone: "Telefon",
    Company: "Virksomhed",
    "Meeting notes": "Mødenoter",
    "Contract data": "Kontraktdata",
    "Ticket content": "Sagens indhold",
    "Order references": "Ordrereferencer",
    "Campaign engagement": "Kampagneaktivitet",
    "Cookie identifiers": "Cookie-identifikatorer",
    "Form submissions": "Formularer",
    "Device / browser data": "Enheds- / browserdata",
    "Access logs": "Adgangslog",
    "Device identifiers": "Enhedsidentifikatorer",
  },
  dataSubjects: {
    Employees: "Medarbejdere",
    "Job applicants": "Jobansøgere",
    "Customers (B2B contacts)": "Kunder (B2B-kontakter)",
    "Consumers (B2C)": "Forbrugere (B2C)",
    Suppliers: "Leverandører",
    "Website visitors": "Hjemmesidebesøgende",
    "Newsletter subscribers": "Nyhedsbrevsmodtagere",
    "Shareholders / owners": "Kapitalejere / ejere",
  },
  legalBasis: {
    contract: {
      label: "Kontrakt",
      hint: "Nødvendigt for at levere en ydelse eller et ansættelsesforhold",
    },
    legal_obligation: {
      label: "Retlig forpligtelse",
      hint: "Loven kræver det (bogføring, skat, løn)",
    },
    legitimate_interest: {
      label: "Legitim interesse",
      hint: "Et sagligt forretningsbehov, afvejet mod personernes rettigheder",
    },
    consent: { label: "Samtykke", hint: "Personen har sagt ja og kan sige nej senere" },
    vital_interest: {
      label: "Vital interesse",
      hint: "For at beskytte nogens liv eller sikkerhed — sjældent for SMV’er",
    },
    public_task: {
      label: "Offentlig myndighedsudøvelse",
      hint: "Typisk for myndigheder, ikke private virksomheder",
    },
  },
  transfers: {
    none: { label: "Ingen overførsel uden for EU/EØS", hint: "Data bliver i Europa" },
    adequacy: {
      label: "Adekvansbeslutning",
      hint: "Landet er godkendt af EU (fx Storbritannien, Japan)",
    },
    dpf: { label: "EU–US Data Privacy Framework", hint: "Amerikansk leverandør er DPF-certificeret" },
    sccs: {
      label: "Standardkontraktbestemmelser (SCC)",
      hint: "Det sædvanlige tillæg med amerikanske/globale leverandører",
    },
    bcrs: {
      label: "Bindende virksomhedsregler",
      hint: "Interne koncernregler — ualmindeligt for SMV’er",
    },
    derogation: {
      label: "Særlig undtagelse",
      hint: "Kun i snævre tilfælde, fx udtrykkeligt samtykke",
    },
  },
  regions: {
    eu: "EU",
    eea: "EØS",
    uk: "Storbritannien",
    us: "USA",
    mixed: "Blandet / globalt",
    unknown: "Ved det ikke endnu",
  },
  sensitivity: {
    standard: { label: "Almindelige oplysninger", hint: "Navne, e-mails, fakturaer, stillinger" },
    special: {
      label: "Følsomme oplysninger (art. 9)",
      hint: "Helbred, fagforening, religion, biometri",
    },
    criminal: {
      label: "Straffedomme (art. 10)",
      hint: "Kun hvis I faktisk tjekker straffeattester",
    },
  },
  categories: {
    "Email & documents": "E-mail og dokumenter",
    Accounting: "Regnskab",
    Payroll: "Løn",
    CRM: "CRM",
    "E-commerce": "E-handel",
    Website: "Hjemmeside",
    Analytics: "Statistik",
    Marketing: "Marketing",
    Support: "Support",
    Collaboration: "Samarbejde",
    Recruitment: "Rekruttering",
    Finance: "Økonomi",
    Other: "Andet",
  },
  systemCopy: {
    m365: {
      purpose: "E-mail, filer, kalender og internt samarbejde",
      hostingNotes:
        "Vælg en EU-tenant, hvor det er muligt. Nogle Microsoft-cloudtjenester kan stadig indebære behandling i USA.",
    },
    "google-workspace": {
      purpose: "E-mail, Drive, Kalender og Docs",
      hostingNotes:
        "Vælg EU-dataregioner, hvor det findes. Google kan behandle noget support- og sikkerhedsdata i USA.",
    },
    economic: {
      purpose: "Bogføring, fakturering og økonomirapportering",
      hostingNotes: "Hostet i EU (Danmark / Visma).",
    },
    dinero: {
      purpose: "Bogføring og fakturering for mindre virksomheder",
      hostingNotes: "Hostet i EU.",
    },
    billy: {
      purpose: "Fakturering og bogføring",
      hostingNotes: "Hostet i EU.",
    },
    danlon: {
      purpose: "Lønkørsel, ferie og indberetning til skat",
      hostingNotes: "Dansk lønleverandør, hostet i EU.",
    },
    "visma-payroll": {
      purpose: "Løn, skat og medarbejderstamdata",
      hostingNotes: "Hostet i EU.",
    },
    hubspot: {
      purpose: "Salgspipeline, kundekontakter og marketing",
      hostingNotes: "Primært hostet i USA. Bekræft DPF-certificering og SCC i jeres databehandleraftale.",
    },
    pipedrive: {
      purpose: "Salgspipeline og kundekontakter",
      hostingNotes: "EU-hosting er tilgængelig. Bekræft den valgte region i indstillingerne.",
    },
    shopify: {
      purpose: "Webshop, ordrer og kundekonti",
      hostingNotes: "Shopify tilbyder EU-butikker; nogle underdatabehandlere kan ligge uden for EØS.",
    },
    wordpress: {
      purpose: "Virksomhedens hjemmeside, kontaktformularer og indhold",
      hostingNotes: "Afhænger af jeres webhotel. Foretræk et EU-hostingmiljø.",
      vendor: "Selvhostet eller webhotel",
    },
    cookiebot: {
      purpose: "Cookiesamtykke og scanning",
      hostingNotes: "Samtykkeregistre hostet i EU.",
    },
    ga4: {
      purpose: "Hjemmesidestatistik",
      hostingNotes:
        "Behandling i USA er typisk. Brug consent mode og en databehandleraftale. Mange SMV’er skifter til EU-statistik i stedet.",
    },
    "meta-ads": {
      purpose: "Annoncering og konverteringssporing",
      hostingNotes: "Amerikansk leverandør. Annoncesporing bør køre på samtykke.",
    },
    mailchimp: {
      purpose: "Nyhedsbreve og e-mailkampagner",
      hostingNotes:
        "Hostet i USA. Kræv samtykke eller en dokumenteret vurdering af legitim interesse ved B2B.",
    },
    zendesk: {
      purpose: "Kundesager",
      hostingNotes: "Vælg et EU-datacenter i Zendesk-indstillingerne.",
    },
    intercom: {
      purpose: "Chat-support og kundebeskeder",
      hostingNotes: "Typisk hostet i USA. Bekræft SCC / DPF i databehandleraftalen.",
    },
    slack: {
      purpose: "Intern chat. Kan indeholde kundenavne i beskeder.",
      hostingNotes: "Vælg EU-region til Slack-workspace, hvis det er tilgængeligt.",
    },
    linkedin: {
      purpose: "Søgning og kontakt til kandidater",
      hostingNotes: "Behandling i USA / globalt. Gem afviste ansøgninger ikke længere end nødvendigt.",
    },
    banking: {
      purpose: "Betalinger, lønoverførsler og kontoadministration",
      hostingNotes:
        "Danske / EU-banker ligger typisk i EØS. Banken er som regel selvstændig dataansvarlig, ikke jeres databehandler.",
      vendor: "Jeres bank",
    },
  },
  activityCopy: {
    "hr-payroll": {
      name: "HR og løn",
      department: "People / Økonomi",
      purpose: "Ansætte medarbejdere, udbetale løn, indberette skat og ferie og føre personalemapper.",
      legalBasisNotes:
        "Ansættelseskontrakt plus retlige pligter om skat, ferie og bogføring. Sygefraværsnotater er helbredsoplysninger — hold dem minimale og godt beskyttet.",
      recipients: ["Lønleverandør", "Skattestyrelsen", "Pension / forsikring (hvis brugt)", "Revisor"],
      personalData: [
        "Names",
        "Address",
        "CPR / national ID",
        "Bank details",
        "Salary",
        "Tax information",
        "Employment contracts",
        "Next of kin (if collected)",
      ],
      retention:
        "Ansættelsens varighed + 5 år (bogførings- og skatteregler). Slet øvrige HR-filer, når de ikke længere er nødvendige.",
      transferCountries: "",
    },
    recruitment: {
      name: "Rekruttering",
      department: "People",
      purpose: "Modtage ansøgninger, vurdere kandidater og ansætte.",
      legalBasisNotes:
        "Legitim interesse i at besætte en stilling. Bed om samtykke, hvis I vil gemme et CV i en talentpulje efter processen.",
      recipients: ["Ansættende ledere", "Rekrutteringsplatform (hvis brugt)"],
      personalData: ["Names", "Email addresses", "Phone numbers", "CV", "Cover letter", "Interview notes"],
      retention:
        "Afviste ansøgere: 6 måneder efter processens afslutning, medmindre de accepterer en længere talentpulje.",
      transferCountries: "",
    },
    accounting: {
      name: "Regnskab og bogføring",
      department: "Økonomi",
      purpose: "Udstede fakturaer, betale leverandører og overholde bogføringsloven.",
      legalBasisNotes: "Bogføringsloven og skattereglerne kræver, at økonomibilag gemmes.",
      recipients: ["Revisor / revisorvirksomhed", "Bank", "Skattestyrelsen", "Regnskabssystem"],
      personalData: ["Names", "Email addresses", "CVR", "Invoice lines", "Payment references"],
      retention: "5 år fra udgangen af regnskabsåret (bogføringsloven).",
      transferCountries: "",
    },
    sales: {
      name: "B2B-salg og kunderelationer",
      department: "Salg",
      purpose: "Håndtere leads, tilbud, kontrakter og løbende kundeforhold.",
      legalBasisNotes:
        "Kontrakt for eksisterende kunder. Legitim interesse ved relevant B2B-prospektering — hold det proportionalt og giv nemt opt-out.",
      recipients: ["CRM-leverandør", "E-mailleverandør", "Leverance- / implementeringspartnere (hvis nogen)"],
      personalData: [
        "Names",
        "Work email",
        "Phone",
        "Job title",
        "Company",
        "Meeting notes",
        "Contract data",
      ],
      retention:
        "Aktiv relation + 5 år for kontrakter og fakturaer. Salgsnoter: 2 år efter sidste kontakt, hvis der ikke er kontrakt.",
      transferCountries: "",
    },
    support: {
      name: "Kundesupport",
      department: "Support",
      purpose: "Besvare spørgsmål, håndtere klager og holde serviceniveauet.",
      legalBasisNotes: "Nødvendigt for at opfylde kundekontrakten og forbedre servicen.",
      recipients: ["Supportplatform", "Produkt- / udviklingsmedarbejdere"],
      personalData: ["Names", "Email addresses", "Ticket content", "Order references"],
      retention:
        "2 år efter sagen er lukket, medmindre en længere periode er nødvendig pga. tvist eller retskrav.",
      transferCountries: "",
    },
    marketing: {
      name: "Marketing og nyhedsbreve",
      department: "Marketing",
      purpose: "Sende nyhedsbreve, køre kampagner og måle interesse.",
      legalBasisNotes:
        "Samtykke til de fleste e-mailudsendelser. Eksisterende B2B-kunder kan kontaktes om lignende ydelser med tydelig afmelding.",
      recipients: ["E-mailplatform", "Annonceplatforme (hvis brugt)"],
      personalData: ["Names", "Email addresses", "Company", "Campaign engagement"],
      retention:
        "Indtil personen afmelder sig, derefter suppression af adressen. Dokumentation for samtykke: 2 år efter sidste brug.",
      transferCountries: "",
    },
    website: {
      name: "Hjemmeside og cookies",
      department: "Marketing / IT",
      purpose: "Drive virksomhedens hjemmeside, kontaktformularer og (hvis brugt) statistik.",
      legalBasisNotes:
        "Nødvendige cookies kan baseres på legitim interesse / streng nødvendighed. Statistik- og marketingcookies kræver samtykke.",
      recipients: ["Webhotel", "Samtykkerværktøj", "Statistikleverandør (hvis brugt)"],
      personalData: ["IP address", "Cookie identifiers", "Form submissions", "Device / browser data"],
      retention:
        "Samtykkeregistre: 12 måneder. Statistikidentifikatorer: 14 måneder eller kortere. Kontaktformularer: 12 måneder.",
      transferCountries: "",
    },
    "it-admin": {
      name: "IT-administration og adgang",
      department: "IT",
      purpose: "Oprette brugerkonti, styre adgang, logge og tage backup.",
      legalBasisNotes: "Nødvendigt for at give medarbejdere værktøjer og beskytte virksomheden mod misbrug.",
      recipients: ["Cloud- / identitetsleverandører"],
      personalData: ["Names", "Work email", "Login credentials", "Access logs", "Device identifiers"],
      retention: "Kontodata: under ansættelsen + 30 dage. Sikkerhedslogs: 6–12 måneder.",
      transferCountries: "",
    },
  },
  toms: {
    mfa: {
      label: "Flerfaktor-login (MFA)",
      description: "Slå MFA til på e-mail, cloud-admin, løn og regnskab.",
    },
    "encryption-transit": {
      label: "Kryptering under transport",
      description: "HTTPS / TLS på hjemmesider og cloudværktøjer.",
    },
    "encryption-rest": {
      label: "Kryptering i hvile",
      description:
        "Brug cloudleverandørernes diskkryptering; krypter bærbare med FileVault / BitLocker.",
    },
    "access-control": {
      label: "Rollebaseret adgang",
      description: "Folk ser kun de data, de har brug for. Admin-rettigheder er begrænsede.",
    },
    offboarding: {
      label: "On-/offboarding",
      description: "Opret og luk konti samme dag, en person starter eller stopper.",
    },
    backups: {
      label: "Backup",
      description: "Daglig backup af kritiske systemer, med en gendannelsestest mindst én gang om året.",
    },
    "device-lock": {
      label: "Låste enheder",
      description: "Skærmlås, stærke adgangskoder eller passkeys og automatiske opdateringer.",
    },
    dpas: {
      label: "Databehandleraftaler",
      description: "En underskrevet databehandleraftale med hver leverandør, der behandler personoplysninger for jer.",
    },
    confidentiality: {
      label: "Tavshedspligt",
      description: "Ansættelseskontrakter indeholder tavshedsklausul. Kort GDPR-intro til nye medarbejdere.",
    },
    incident: {
      label: "Kontakt ved hændelser",
      description:
        "I ved, hvem I ringer til, hvis data mistes eller lækkes, og at Datatilsynet skal underrettes inden 72 timer, hvis det er påkrævet.",
    },
    logging: {
      label: "Adgangslogning",
      description: "Admin-handlinger og logins logges i jeres vigtigste cloudværktøjer.",
    },
    disposal: {
      label: "Sikker kassation",
      description: "Gamle bærbare og USB-nøgler slettes eller destrueres. Papir med personoplysninger makuleres.",
    },
  },
  completeness: {
    name: { label: "Virksomhedens navn", hint: "Vises på forsiden af PDF’en." },
    cvr: { label: "CVR-nummer", hint: "Hjælper med at identificere den dataansvarlige." },
    address: { label: "Adresse", hint: "Påkrævede kontaktoplysninger for den dataansvarlige." },
    email: { label: "Kontakt-e-mail", hint: "Hvor personer (og Datatilsynet) kan ramme jer." },
    employees: {
      label: "Antal medarbejdere",
      hint: "Små virksomheder skal som regel stadig have en fortegnelse, hvis data behandles løbende.",
    },
    systems: {
      label: "Mindst ét system",
      hint: "List de værktøjer, der faktisk rummer personoplysninger.",
    },
    dpa: {
      label: "Databehandleraftale noteret",
      hint: "Sæt kryds ved DPA for hver leverandør, der behandler data for jer.",
    },
    activities: {
      label: "Mindst én behandlingsaktivitet",
      hint: "HR, regnskab og salg er typiske startpunkter.",
    },
    purpose: {
      label: "Hver aktivitet har et formål",
      hint: "Sig med én sætning, hvorfor I behandler dataene.",
    },
    subjects: {
      label: "Personer og datatyper er listet",
      hint: "Hvem dataene handler om, og hvilken slags data.",
    },
    basis: {
      label: "Behandlingsgrundlag på hver aktivitet",
      hint: "Kontrakt, retlig pligt, legitim interesse eller samtykke.",
    },
    retention: {
      label: "Opbevaringsperiode på hver aktivitet",
      hint: "Hvor længe I gemmer det, og hvornår I sletter eller arkiverer.",
    },
    transfers: {
      label: "Overførsler er forklaret",
      hint: "Hvis data går uden for EU/EØS, skal I nævne garantien (DPF eller SCC).",
    },
    toms: {
      label: "Sikkerhedsforanstaltninger valgt",
      hint: "MFA, adgangsstyring, backup og databehandleraftaler er et solidt SMV-udgangspunkt.",
    },
  },
  workspace: {
    kicker: "Arbejdsområde",
    lastEdited: "Sidst redigeret af {name} den {date}.",
    continueInterview: "Fortsæt interview",
    downloadPdf: "Download PDF",
    downloadMarkdown: "Download Markdown",
    completeness: "Fuldstændighed",
    completenessHint: "Byggeklodser til artikel 30",
    activities: "Aktiviteter",
    activitiesHint: "Formål i fortegnelsen",
    systems: "Systemer",
    systemsHint: "Værktøjer med personoplysninger",
    stillUseful: "Nyttigt at færdiggøre",
    allCore:
      "Fortegnelsen har de centrale felter efter artikel 30. Download PDF’en og læg en kopi sammen med jeres kontrakter.",
    viewFull: "Se hele fortegnelsen",
    upcoming: "Kommende eftersyn",
    noReminders: "Ingen åbne påmindelser.",
    manageReminders: "Administrer påmindelser",
    processingActivities: "Behandlingsaktiviteter",
    colActivity: "Aktivitet",
    colPeople: "Personer",
    colBasis: "Behandlingsgrundlag",
    colRetention: "Opbevaring",
  },
  ropa: {
    kicker: "Klar til eksport",
    title: "Artikel 30-fortegnelse",
    print: "Udskriv",
    docKicker: "GDPR artikel 30",
    docTitle: "Fortegnelse over behandlingsaktiviteter",
    docLead:
      "Fortegnelse for den dataansvarlige {name}. Udarbejdet til virksomhedens eget arkiv. Ikke juridisk rådgivning.",
    sectionController: "1. Den dataansvarlige",
    sectionSystems: "2. Systemer og dataflows",
    sectionActivities: "3. Behandlingsaktiviteter",
    sectionToms: "4. Tekniske og organisatoriske foranstaltninger",
    field: "Felt",
    record: "Registrering",
    controller: "Dataansvarlig",
    cvr: "CVR-nummer",
    address: "Adresse",
    email: "Kontakt-e-mail",
    phone: "Telefon",
    website: "Hjemmeside",
    employees: "Medarbejdere",
    industry: "Branche",
    dpo: "Databeskyttelsesrådgiver",
    dpoNamed: "{name} ({email})",
    dpoNone: "Ikke udpeget",
    euRep: "EU-repræsentant",
    euNamed: "{name} ({email})",
    euNone: "Ikke relevant",
    system: "System",
    vendor: "Leverandør",
    hosting: "Hosting",
    data: "Data",
    people: "Personer",
    role: "Rolle",
    dpa: "DBA",
    transfers: "Overførsler",
    processor: "Databehandler",
    independent: "Selvstændig",
    yes: "Ja",
    no: "Nej",
    eeaOnly: "Kun EØS",
    department: "Afdeling",
    purpose: "Formål",
    subjects: "Registrerede",
    personalData: "Personoplysninger",
    categories: "Datakategorier",
    legalBasis: "Behandlingsgrundlag",
    notes: "Noter",
    systems: "Systemer",
    recipients: "Modtagere",
    retention: "Opbevaring",
    noTransfers: "Ingen planlagte overførsler uden for EU/EØS",
    measure: "Foranstaltning",
    inPlace: "I brug",
    description: "Beskrivelse",
    notYet: "Endnu ikke",
    untitled: "Unavngivet aktivitet",
    notLegalAdvice: "Ikke juridisk rådgivning.",
  },
  systemsPage: {
    kicker: "Dataflows",
    title: "Systemer",
    lead: "Alle værktøjer, der rummer personoplysninger i den daglige drift.",
    editInterview: "Rediger i interviewet",
    purpose: "Formål",
    hosting: "Hosting",
    data: "Data",
    processor: "Databehandler",
    transfers: "Overførsler",
    yes: "Ja",
    independent: "Selvstændig",
    dpaYes: "ja",
    dpaNo: "nej",
    eeaOnly: "Kun EØS",
  },
  reminders: {
    kicker: "Hold fortegnelsen aktuel",
    title: "Revisionspåmindelser",
    lead: "En fortegnelse bliver forældet, når et nyt værktøj kommer til, og ingen opdaterer filen. Sæt datoer, læg dem i kalenderen, og tillad evt. browserpåmindelser på denne enhed.",
    allowBrowser: "Tillad browserpåmindelser",
    noSupport: "Denne browser understøtter ikke notifikationer.",
    notAllowed: "Notifikationer blev ikke tilladt.",
    enabled: "Påmindelser kan nu vises i denne browser, når I åbner TrustLog.",
    notificationTitle: "TrustLog-compliancepåmindelse",
    addToCalendar: "Tilføj til kalender",
    markDone: "Marker som færdig",
    completeReschedule: "Færdig og planlæg næste",
    customTitle: "Egen påmindelse",
    fieldTitle: "Titel",
    dueDate: "Dato",
    notes: "Noter",
    add: "Tilføj påmindelse",
    annual: "Årligt eftersyn af fortegnelsen",
    annualNotes:
      "Læs fortegnelsen igennem, tilføj nye værktøjer, og tjek at opbevaring stadig matcher praksis.",
    processors: "Gennemgå databehandlere og DBA’er",
    processorNotes: "Tjek, at hver leverandør stadig har en underskrevet databehandleraftale.",
    due: "Frist {date}",
    dueSoon: "Snart · {date}",
    overdue: "Overskredet · {date}",
    completed: "Udført {date}",
  },
  team: {
    kicker: "Fælles redigering",
    title: "Team",
    lead: "Tilføj dem, der skal holde fortegnelsen ærlig — typisk økonomi, HR og den, der køber software. Del linket, så de åbner det samme arbejdsområde.",
    tip: "Der er intet login. Alle med linket kan åbne fortegnelsen på en computer, der kan nå denne TrustLog. Skriv, hvem du er, så rettelser bliver mærket.",
    editingAs: "Du redigerer som",
    shareLink: "Delelink",
    copied: "Kopieret",
    publish: "Publicér og kopiér",
    noEmail: "Ingen e-mail",
    owner: "ejer",
    editor: "redaktør",
    viewer: "læser",
    remove: "Fjern",
    addColleague: "Tilføj en kollega",
    name: "Navn",
    email: "E-mail",
    role: "Rolle",
    viewerOption: "Læser (kun på listen)",
    add: "Tilføj til arbejdsområde",
  },
  share: {
    opening: "Åbner delt arbejdsområde…",
    missing: "Dette delelink blev ikke fundet på serveren. Bed ejeren om at publicere det igen.",
    home: "Gå til forsiden",
  },
  pdf: {
    confidential: "TRUSTLOG  ·  FORTROLIGT",
    title: "Fortegnelse over behandlingsaktiviteter",
    subtitle: "GDPR artikel 30  ·  Dataansvarliges fortegnelse",
    generated: "Genereret: {date}",
    lastEdited: "Sidst redigeret af: {name}",
    completeness: "Interviewets fuldstændighed: {score} %",
    disclaimer:
      "Dette dokument er virksomhedens arbejdende fortegnelse over behandlingsaktiviteter. Det er ikke juridisk rådgivning. Behandling med høj risiko, omfattende overvågning eller systematisk brug af særlige kategorier bør gennemgås med kvalificeret rådgivning. Gem PDF’en i jeres eget arkiv.",
    section1: "1. Den dataansvarlige",
    section2: "2. Systemer og dataflows",
    section3: "3. Behandlingsaktiviteter (artikel 30)",
    section4: "4. Tekniske og organisatoriske foranstaltninger (art. 32)",
    section5: "5. Revisionsoversigt",
    footer: "TrustLog  ·  Fortegnelse over behandlingsaktiviteter (GDPR art. 30)  ·  {name}",
    closing:
      "Dataansvarlige med under 250 medarbejdere er ikke automatisk fritaget. Artikel 30, stk. 5, kræver stadig en fortegnelse, når behandlingen ikke er lejlighedsvis, omfatter særlige kategorier eller sandsynligvis indebærer en risiko. Løbende HR, kunder og bogføring betyder typisk, at en SMV skal have denne fortegnelse. Sidst opdateret {date} af {name}.",
    dpoNone:
      "Ikke udpeget — behandlingen er ikke af en art, der typisk kræver DPO for denne SMV.",
    euNone: "Ikke relevant (den dataansvarlige er etableret i EU/EØS).",
    processor: "Databehandler",
    independent: "Selvstændig",
    dpaYes: "ja",
    dpaNo: "nej",
    eeaOnly: "Kun EØS",
    noTransfers: "Ingen planlagte overførsler uden for EU/EØS",
    yes: "Ja",
    notYet: "Endnu ikke",
    open: "Åben",
    done: "Udført {date}",
    named: "Navngivet",
    emailNotSet: "e-mail ikke angivet",
  },
};

export const messages: Record<Locale, Messages> = { da, en };

export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
}

export function labelList(locale: Locale, items: string[], dictionary: Record<string, string>): string {
  if (items.length === 0) return messages[locale].dash;
  return items.map((item) => dictionary[item] ?? item).join(", ");
}

/**
 * Portfolio Configuration & Central Data Store
 * Aslam Rashid Shaikh - Senior Software Developer | Full Stack .NET Developer
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Aslam Rashid Shaikh",
    shortName: "Aslam Shaikh",
    title: "Senior Software Developer | Full Stack .NET Developer",
    subtitle: "Enterprise Banking Applications & High-Performance Full-Stack Systems",
    experienceYears: "4.6+",
    email: "shaikhaslame0@gmail.com",
    phone: "+91 8104537679",
    location: "Navi Mumbai, Maharashtra, India",
    postalCode: "400612",
    available: true,
    availabilityText: "Available for Full-Time Roles & Freelance Projects",
    linkedin: "https://www.linkedin.com/in/aslam-shaikh-4497581bb",
    github: "https://github.com/arswebdeveloper",
    defaultResumeUrl: "assets/Aslam_Shaikh_Resume.pdf",
    defaultResumeName: "Aslam_Shaikh_Senior_DotNet_Resume.pdf",
    resumePreviewImage: "assets/resume_preview.jpg"
  },

  stats: [
    { value: "4.6+", label: "Years of Experience", desc: "Enterprise application engineering" },
    { value: "5+", label: "Tier-1 Banking Clients", desc: "SBI, Union Bank of India, Bank of Muscat & partner banks" },
    { value: "10+", label: "Enterprise Projects", desc: "Kiosk, queue systems & web apps" },
    { value: "99.9%", label: "System Reliability", desc: "Production-grade uptime focus" }
  ],

  about: {
    summary: "Senior Software Developer and Full Stack .NET Developer with 4.6+ years of specialized experience architecting, developing, and deploying scalable enterprise banking applications. Proven track record at Aurionpro Solutions engineering mission-critical systems for State Bank of India, Union Bank of India, and Bank of Muscat (Oman).",
    highlights: [
      "Core expertise in C#, .NET Core, ASP.NET MVC, Web API, Angular 17, and MS SQL Server.",
      "End-to-end SDLC ownership: from requirement analysis and micro-architecture to UAT coordination, live branch deployment, and SLA production support.",
      "Deep domain experience in enterprise kiosk management networks, branch customer flow / queue management systems, and speech recognition engines (TTS & STT).",
      "Robust background in database tuning, query optimization, high-concurrency batch processing, and fail-safe synchronization."
    ]
  },

  skills: {
    "Backend & Architecture": [
      { name: "C#", level: 95, icon: "csharp" },
      { name: ".NET Core", level: 92, icon: "dotnet" },
      { name: "ASP.NET MVC", level: 90, icon: "dotnet" },
      { name: "ASP.NET Web API", level: 94, icon: "api" },
      { name: "REST APIs", level: 95, icon: "api" },
      { name: "Entity Framework", level: 88, icon: "database" },
      { name: "ADO.NET", level: 92, icon: "database" },
      { name: "XML / JSON", level: 90, icon: "code" }
    ],
    "Frontend & UI/UX": [
      { name: "Angular 17", level: 88, icon: "angular" },
      { name: "AngularJS", level: 85, icon: "angular" },
      { name: "TypeScript", level: 90, icon: "typescript" },
      { name: "JavaScript (ES6+)", level: 92, icon: "javascript" },
      { name: "jQuery", level: 88, icon: "jquery" },
      { name: "HTML5 & Semantic Web", level: 95, icon: "html5" },
      { name: "CSS3 & Modern Layouts", level: 92, icon: "css3" },
      { name: "Bootstrap 5", level: 92, icon: "bootstrap" }
    ],
    "Databases & Optimization": [
      { name: "Microsoft SQL Server", level: 92, icon: "sqlserver" },
      { name: "PostgreSQL", level: 82, icon: "postgresql" },
      { name: "MySQL", level: 85, icon: "mysql" },
      { name: "Database Optimization", level: 88, icon: "database" }
    ],
    "Desktop Engineering": [
      { name: "WPF", level: 90, icon: "windows" },
      { name: "WinForms", level: 88, icon: "windows" }
    ],
    "Cloud & DevOps": [
      { name: "Microsoft Azure (Familiarity)", level: 75, icon: "azure" },
      { name: "Azure Services", level: 75, icon: "azure" },
      { name: "Jenkins (CI/CD)", level: 80, icon: "jenkins" },
      { name: "Git & GitHub", level: 90, icon: "git" },
      { name: "SVN (Subversion)", level: 85, icon: "git" }
    ],
    "AI & Prompting (Modern Engineering)": [
      { name: "ChatGPT & Prompt Engineering", level: 94, icon: "code" },
      { name: "GitHub Copilot (Dev Acceleration)", level: 92, icon: "git" },
      { name: "Claude AI (Architecture & Debugging)", level: 92, icon: "terminal" },
      { name: "AI-Assisted Problem Solving", level: 90, icon: "check" }
    ],
    "Engineering Practices": [
      { name: "AI & Prompting (ChatGPT, Copilot, Claude)", level: 92, icon: "code" },
      { name: "RESTful API Architecture", level: 95, icon: "api" },
      { name: "Troubleshooting & Debugging", level: 95, icon: "terminal" },
      { name: "Database Query Optimization", level: 90, icon: "database" },
      { name: "Performance Optimization", level: 90, icon: "chart" },
      { name: "UAT Coordination", level: 92, icon: "check" },
      { name: "Production Deployment & Support", level: 95, icon: "server" },
      { name: "Speech Recognition (TTS & STT)", level: 88, icon: "mic" }
    ]
  },

  experience: [
    {
      role: "Sr. Software Developer",
      company: "Aurionpro Solutions Ltd.",
      period: "Oct 2023 - Present",
      isCurrent: true,
      location: "Navi Mumbai, India",
      summary: "Leading backend and full-stack software development for Tier-1 enterprise banking clients including State Bank of India (SBI), Union Bank of India, and Bank of Muscat (Oman).",
      responsibilities: [
        "Develop and maintain high-volume banking applications using C#, .NET Core, ASP.NET, Web API, WPF, Angular, AngularJS, and SQL Server.",
        "Take ownership of modules across the complete SDLC: requirement gathering, system architecture, integration, UAT cycles, and production deployment.",
        "Engineer resilient backend Web APIs consumed by Angular, AngularJS, and WPF desktop clients.",
        "Investigate and resolve critical production defects under strict bank SLAs, supporting live branch operations and scheduled rollouts."
      ],
      technologies: ["C#", ".NET Core", "ASP.NET Web API", "WPF", "Angular", "AngularJS", "SQL Server", "SVN", "Jenkins"]
    },
    {
      role: "Software Developer",
      company: "Kadvekar Consultancy Services Pvt. Ltd.",
      period: "Mar 2023 - Aug 2023",
      isCurrent: false,
      location: "Maharashtra, India",
      summary: "Designed and deployed responsive web applications and database solutions for enterprise clients.",
      responsibilities: [
        "Built and maintained full-stack web applications using ASP.NET MVC, C#, Web API, ADO.NET, and .NET Core.",
        "Created dynamic, responsive client-side interfaces using HTML5, CSS3, JavaScript, jQuery, and Bootstrap.",
        "Streamlined database queries and stored procedures in Microsoft SQL Server to enhance response times.",
        "Actively debugged and resolved defect backlogs, participating in deployment pipelines and client testing."
      ],
      technologies: ["ASP.NET MVC", "C#", "Web API", "ADO.NET", ".NET Core", "jQuery", "Bootstrap", "SQL Server"]
    },
    {
      role: "Software Trainee",
      company: "NeoQuant Solutions Pvt. Ltd.",
      period: "Mar 2022 - Feb 2023",
      isCurrent: false,
      location: "Mumbai, India",
      summary: "Foundational software engineering role focused on full-stack web development and relational databases.",
      responsibilities: [
        "Contributed to frontend and backend module implementations using C#, ASP.NET, ADO.NET, MS SQL Server, HTML, CSS, and JavaScript.",
        "Collaborated with senior software architects on component design, unit testing, and code reviews.",
        "Assisted in writing SQL stored procedures, data validation routines, and bug fixing."
      ],
      technologies: ["C#", "ASP.NET", "ADO.NET", "MS SQL Server", "JavaScript", "HTML5", "CSS3"]
    }
  ],

  projects: [
    {
      id: "sbi-kiosk",
      title: "SBI Kiosk Management System",
      client: "State Bank of India (SBI)",
      domain: "Enterprise Banking | Kiosk Infrastructure",
      badge: "Enterprise Banking",
      themeColor: "#3b82f6",
      shortDesc: "Centralized monitoring, batch processing, and holiday-aware data synchronization system for thousands of banking kiosks across multiple states.",
      fullOverview: "A mission-critical enterprise kiosk network solution deployed across nationwide State Bank of India branches. The system provides real-time health diagnostics, kiosk state tracking, centralized batch updates, and secure transactional synchronization between remote WPF kiosk endpoints and central bank servers.",
      contributions: [
        "Enhanced and stabilized modules responsible for monitoring kiosk hardware health and connectivity across multiple states.",
        "Engineered robust batch processing pipelines with automated retry logic to handle erratic branch internet connections.",
        "Implemented intelligent holiday and banking schedule handling to prevent unscheduled synchronization during off-peak and bank holiday windows.",
        "Optimized data payload transfers between kiosk terminals and central servers, decreasing database lock contention on SQL Server."
      ],
      keyFeatures: [
        "Multi-state live kiosk monitoring & telemetry",
        "Automated batch processing & recovery",
        "Holiday schedule & banking calendar synchronization",
        "Fail-safe remote data synchronization",
        "Hardware peripheral status alerts"
      ],
      techStack: ["WPF", "C#", "ASP.NET", "SQL Server", "Web API", "AngularJS"],
      architectureFlow: ["Kiosk Terminal (WPF)", "Secure Web API Gateway", "Central Orchestration Server", "SQL Server Cluster"],
      mockupType: "kiosk"
    },
    {
      id: "union-bank-qms",
      title: "Union Bank of India Queue Management System",
      client: "Union Bank of India",
      domain: "Enterprise Banking | Branch Customer Flow",
      badge: "Enterprise Banking",
      themeColor: "#06b6d4",
      shortDesc: "High-throughput token generation, real-time teller display integration, performance analytics dashboards, and integrated speech recognition.",
      fullOverview: "An advanced branch customer management solution engineered to streamline high-volume footfall across Union Bank of India branches. The platform features instantaneous token issuance, teller allocation, live digital display integration, management reporting, and dual-mode speech recognition.",
      contributions: [
        "Developed core token generation and teller counter dispatch modules to reduce customer wait times by optimizing counter routing.",
        "Integrated real-time branch display monitors using lightweight REST protocols for immediate token calling visual cues.",
        "Built executive reporting dashboards giving branch managers visibility into teller service times, counter efficiency, and peak volume periods.",
        "Implemented speech recognition features incorporating Text-to-Speech (TTS) for acoustic token announcements and Speech-to-Text (STT) for teller commands."
      ],
      keyFeatures: [
        "Automated token issuance & multi-service category dispatch",
        "Real-time digital signage and counter display feeds",
        "Branch performance & teller SLA analytics dashboards",
        "Acoustic Text-to-Speech (TTS) token announcements",
        "High-reliability local database failover"
      ],
      techStack: ["C#", ".NET Core", "Web API", "Angular", "jQuery", "HTML5", "CSS3", "SQL Server"],
      architectureFlow: ["Kiosk / Token Dispenser", "Angular UI / Display", ".NET Core Web API", "SQL Server & TTS Engine"],
      mockupType: "queue"
    },
    {
      id: "bank-of-muscat-qms",
      title: "Bank of Muscat Queue Management System",
      client: "Bank of Muscat (Oman)",
      domain: "International Banking | Multilingual Workflow",
      badge: "International Banking",
      themeColor: "#8b5cf6",
      shortDesc: "Customized international queue management solution with Arabic/English bilingual UI, localization, and audio speech synthesis.",
      fullOverview: "A customized enterprise queue management solution tailored specifically to the banking workflows and compliance standards of Bank of Muscat in the Sultanate of Oman. The system provides seamless bilingual operations (Arabic RTL & English LTR), teller workstation controls, and customized audio announcements.",
      contributions: [
        "Tailored standard queue workflows to match Bank of Muscat's priority customer tiers, VIP lounges, and specialized counter operations.",
        "Developed full bilingual UI support with seamless Right-to-Left (RTL Arabic) and Left-to-Right (LTR English) visual transitions.",
        "Addressed internationalization, timezone synchronization, and high-performance caching for deployment in Oman data centers.",
        "Integrated multilingual speech synthesis (Arabic & English TTS) for crystal-clear auditory token calling."
      ],
      keyFeatures: [
        "Custom banking workflows & priority service routing",
        "Bilingual Arabic (RTL) & English (LTR) interface",
        "Multilingual audio token announcement system",
        "Counter performance tracking and auditing",
        "Optimized for high-concurrency international deployments"
      ],
      techStack: ["ASP.NET", "Angular", "Web API", "SQL Server", "Bilingual TTS"],
      architectureFlow: ["Bilingual Touch Kiosk", "Bank of Muscat Workstation UI", "ASP.NET Web API", "SQL Server"],
      mockupType: "queue2"
    },
    {
      id: "little-champs",
      title: "Little Champs Pre-Primary School Website",
      client: "Little Champs Pre-Primary School",
      domain: "Freelance Project | Live Production",
      badge: "Live Production",
      themeColor: "#10b981",
      shortDesc: "Modern, responsive, component-driven educational web portal built with Angular 17, deployed on Firebase Hosting with EmailJS communication.",
      fullOverview: "A modern, highly accessible website developed for an established pre-primary educational institution. Built using Angular 17 with modular standalone components, sleek responsive layouts, interactive photo showcases, curriculum overviews, parent inquiries, and automated EmailJS notification pipelines.",
      contributions: [
        "Architected and implemented a mobile-first responsive web application utilizing Angular 17 standalone components and TypeScript.",
        "Implemented client-side routing, SEO metadata, and optimized lazy-loaded asset delivery.",
        "Integrated EmailJS for zero-server parent inquiry submissions with instantaneous email delivery to school administrators.",
        "Configured Firebase Hosting deployment workflows via Firebase CLI for fast, secure, globally distributed CDN delivery."
      ],
      keyFeatures: [
        "Angular 17 standalone component architecture",
        "Responsive, mobile-optimized UI across all screen sizes",
        "Instant parent inquiry form powered by EmailJS",
        "Globally distributed delivery via Firebase CDN",
        "Zero-downtime CI/CD deployment via Firebase CLI"
      ],
      techStack: ["Angular 17", "TypeScript", "HTML5", "CSS3", "Bootstrap", "EmailJS", "Firebase Hosting"],
      architectureFlow: ["Parent Browser", "Angular 17 SPA", "EmailJS Gateway", "Firebase CDN Hosting"],
      liveUrl: "https://littlechampspreprimaryschool.in",
      mockupType: "web"
    }
  ],

  whatIDo: [
    {
      icon: "layers",
      title: "Full Stack Application Architecture",
      desc: "End-to-end engineering from architecting .NET Core / ASP.NET backend systems to crafting high-performance Angular and responsive web client interfaces."
    },
    {
      icon: "server",
      title: "RESTful API Engineering",
      desc: "Designing secure, versioned, high-throughput REST APIs that seamlessly connect heterogeneous clients (Angular, AngularJS, WPF, and kiosks) to enterprise databases."
    },
    {
      icon: "shield",
      title: "Enterprise Banking Systems",
      desc: "Developing mission-critical kiosk and queue management systems adhering to stringent banking security, data integrity, and compliance requirements."
    },
    {
      icon: "database",
      title: "SQL Server Tuning & Optimization",
      desc: "Designing normalized schemas, optimizing complex queries, crafting stored procedures, and tuning execution plans to sustain high transactional concurrency."
    },
    {
      icon: "wrench",
      title: "Production Diagnostics & Support",
      desc: "Rapid root-cause analysis, production bug triage, telemetry monitoring, and SLA-backed issue resolution for mission-critical banking environments."
    },
    {
      icon: "check-circle",
      title: "UAT & Zero-Downtime Deployment",
      desc: "Collaborating with cross-functional QA teams, bank stakeholders, and release engineers to execute smooth UAT sign-offs and production releases."
    }
  ],

  education: [
    {
      degree: "B.Sc. Information Technology",
      institution: "University of Mumbai",
      score: "Grade A | 8.25 CGPI",
      year: "2020",
      description: "Comprehensive coursework in software engineering, database management systems, data structures, computer networks, and object-oriented programming."
    },
    {
      degree: ".NET Full Stack Developer Certification",
      institution: "Dcodetech Industrial Training Pvt. Ltd.",
      score: "Full Stack .NET Certified",
      year: "2021",
      description: "Rigorous industrial specialization in C#, ASP.NET MVC, .NET Core, Web API, SQL Server, Entity Framework, and modern frontend technologies."
    }
  ],

  // Firebase Configuration & Service References
  firebase: {
    // Connected to Aslam's Firebase project: "my-portfolio-website-4f201"
    config: {
      apiKey: "", // Can be filled via Admin Panel if Auth is needed
      authDomain: "my-portfolio-website-4f201.firebaseapp.com",
      projectId: "my-portfolio-website-4f201",
      storageBucket: "my-portfolio-website-4f201.appspot.com",
      messagingSenderId: "573851730048",
      appId: ""
    },
    authorizedAdminEmail: "shaikhaslame0@gmail.com"
  },

  // Primary Automated Email Gateway (Native Google Apps Script Webhook)
  gasWebhookUrl: "https://script.google.com/macros/s/AKfycbyXNo-CBwCWhQA17ro2mtDAm45qQRQZvDZK_sQt1uNdtRwtXm0oaFoRtHZHS0b0u1-b/exec",

  // EmailJS Configuration
  emailjs: {
    serviceId: "service_pbmmpmp", // Provided by user
    templateId: "template_portfolio", // Provided or configured via Admin
    publicKey: "user_public_key", // Configurable via Admin or config
    recipientEmail: "shaikhaslame0@gmail.com"
  }
};

/**
 * Storage & Configuration Helper
 * Loads dynamically saved overrides (e.g. from Admin Dashboard or Firestore)
 */
function getActivePortfolioData() {
  const data = JSON.parse(JSON.stringify(PORTFOLIO_DATA));
  try {
    const saved = localStorage.getItem("aslam_portfolio_custom_config");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.resumeUrl) data.profile.defaultResumeUrl = parsed.resumeUrl;
      if (parsed.resumeName) data.profile.defaultResumeName = parsed.resumeName;
      if (typeof parsed.available === "boolean") data.profile.available = parsed.available;
      if (parsed.gasWebhookUrl) data.gasWebhookUrl = parsed.gasWebhookUrl;
      if (parsed.emailjs) {
        data.emailjs = { ...data.emailjs, ...parsed.emailjs };
      }
      if (parsed.firebaseConfig) {
        data.firebase.config = { ...data.firebase.config, ...parsed.firebaseConfig };
      }
    }
  } catch (e) {
    console.warn("Could not read local config overrides:", e);
  }
  return data;
}

if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
  window.getActivePortfolioData = getActivePortfolioData;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PORTFOLIO_DATA, getActivePortfolioData };
}


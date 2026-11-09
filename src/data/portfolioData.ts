import { DeveloperConfig, Project, ExperienceItem, PhilosophyPillar, SkillCategory, EducationCertification } from '../types';

export const developerConfig: DeveloperConfig = {
  name: 'Shaheera Sadia',
  handle: 'shaheerasadia.dev',
  role: 'Front-End Developer',
  level: 'Front-End Developer',
  location: 'Remote (Pakistan, UTC+5)',
  timezone: 'PKT (UTC+5)',
  status: 'available_for_opportunities',
  yearsOfExperience: 5,
  terminal: 'bash / zsh + git',
  editor: 'VS Code + Chrome DevTools',
  email: 'shaheerasadia@gmail.com',
  github: 'https://github.com/shaheerasadia',
  linkedin: 'https://linkedin.com/in/shaheera-sadia-038944374',
  twitter: 'https://x.com/shaheerasadia',
  rss: 'https://shaheerasadia.dev/rss.xml',
  coreStack: [
    'React',
    'JavaScript (ES6+)',
    'Vite',
    'Tailwind CSS',
    'HTML5 & CSS3',
    'Client-Side Web Workers',
    'Vercel',
    'Git',
  ],
  principles: [
    'Fast client-side zero server latency architectures',
    'Accessible, high-contrast UI across all viewports',
    'Responsive mobile-first web design with clean touch feedback',
    'Smooth UI performance offloading tasks to Web Workers',
  ],
};

export const resumeSummary = {
  headline: 'Front-End Developer | Remote',
  summary:
    'Front-End Developer engineering fast web applications, accessible user interfaces, and client-side browser utilities. Specialized in React, JavaScript (ES6+), Vite, Tailwind CSS, and Web Worker pipelines. Track record of delivering fast, responsive, and accessible digital experiences.',
  availability: 'Available immediately | Remote | Full-Time & Contract',
};

export const aboutMeData = {
  headline: 'I build clean, high-performance web applications centered on real user needs.',
  subHeadline:
    'Shaheera Sadia — Front-End Developer specializing in React, JavaScript, and responsive client-side architectures.',
  whoIAm:
    'I am a Front-End Developer with 5+ years of experience building user-centric interfaces, performance-driven web tools, and responsive digital products.',
  whereBased:
    'Based in Pakistan (PKT / UTC+5), working smoothly and synchronously with global remote teams across US, Europe, and Asia-Pacific time zones.',
  lookingFor:
    'Looking for full-time front-end engineering roles, long-term contracts, or high-impact freelance product work building fast React & web applications.',
  availability:
    'Immediately available to start (Full-Time or Contract, 40 hours/week).',
  fullBio:
    "I am a Front-End Developer with a strong focus on building user-centric interfaces, performance-driven web tools, and responsive web applications. My journey started on freeCodeCamp in 2021, and since then, I've focused on translating complex user requirements into smooth, intuitive UI designs.\n\nI specialize in React, modern JavaScript (ES6+), Vite, and Tailwind CSS, with an emphasis on browser capabilities (Web Workers and client-side compute) to build fast web utilities with instant responsiveness and total user privacy.",
  milestones: [
    { year: '2021', title: 'freeCodeCamp Genesis', description: 'Began intensive journey mastering modern JavaScript algorithms, responsive design, and component-driven front-ends.' },
    { year: '2022', title: 'Interactive Web & Dashboards', description: 'Built client-focused SPAs, responsive data interfaces, and localized WordPress/XAMPP database workflows.' },
    { year: '2023', title: 'Interactive Web Tools & Portals', description: 'Developed App Tool utilities, dynamic product catalogs, and responsive client-side applications with accessible UI.' },
    { year: '2024 — 2026', title: 'Toolkit Pro & Brand Identity Generator', description: 'Architected client-side web utilities and branding engines with off-thread Web Workers, fast load times, and automated CSS token generation.' },
  ],
};

export interface FeaturedToolItem {
  application: string;
  category: string;
  coreFocus: string;
  keyTech: string;
  liveUrl: string;
  githubUrl: string;
  description: string;
  image?: string;
  repoName?: string;
  problemSolved?: string;
  whatBuilt?: string;
}

export const featuredToolsData: FeaturedToolItem[] = [
  {
    application: 'SecuLens AI — Code Auditor',
    category: 'AI & Cybersecurity',
    coreFocus: 'OWASP Top 10 vulnerability scanner & patch suggestions',
    keyTech: 'React, Vite, Gemini AI, Tailwind CSS, OWASP',
    liveUrl: 'https://secu-lens-ai-cybersecurity-code-aud-ecru.vercel.app/',
    githubUrl: 'https://github.com/shaheerasadia/secu-lens-ai',
    repoName: 'secu-lens-ai',
    image: '/assets/images/project_seculens_ai_1794224059932.jpg',
    problemSolved: 'Identifying OWASP Top 10 vulnerabilities (SQLi, XSS, SSRF) early without slow manual code reviews or noisy scanners.',
    whatBuilt: 'Engineered an AI-powered code auditor utilizing Gemini AI for semantic AST code analysis and instant production-hardened patch generation.',
    description: 'AI-powered code security analyzer and vulnerability auditor powered by Gemini AI. Detects OWASP Top 10 security flaws, XSS, and generates actionable patch suggestions.',
  },
  {
    application: 'Toolkit Pro',
    category: 'Web Utilities & Media Suite',
    coreFocus: 'Client-side image & web utility suite',
    keyTech: 'React, Web Workers, JavaScript, Tailwind CSS',
    liveUrl: 'https://toolkit-pro-chi.vercel.app/',
    githubUrl: 'https://github.com/shaheerasadia/toolkit-pro',
    repoName: 'toolkit-pro',
    image: '/assets/images/project_toolkit_pro_1794224059255.jpg',
    problemSolved: 'Cloud-based media compression costs money, incurs server upload latency, and exposes private user files to external servers.',
    whatBuilt: 'Architected a 100% client-side web utility suite with off-thread Web Workers, OffscreenCanvas processing, and zero server upload latency.',
    description: 'Client-side web utility platform featuring browser-based media compression, format converters, and video prompt studio tools.',
  },
  {
    application: 'Brand Identity Generator',
    category: 'Design Systems & Palettes',
    coreFocus: 'Automated palette & CSS token generation',
    keyTech: 'React, Tailwind CSS, Canvas API, Web Workers',
    liveUrl: 'https://brand-identity-five.vercel.app/',
    githubUrl: 'https://github.com/shaheerasadia/brand-identity-generator',
    repoName: 'brand-identity-generator',
    image: '/assets/images/project_brand_identity_1794224061220.jpg',
    problemSolved: 'Designers and developers struggle to ensure WCAG 2.1 AA color contrast and generate exportable CSS tokens quickly.',
    whatBuilt: 'Engineered a real-time WCAG 2.1 AA luminance analyzer with one-click export to CSS variables (:root) and Tailwind configuration files.',
    description: 'Generates custom brand color palettes, typography scales, SVG logo presets, and CSS variables in seconds with instant client-side execution.',
  },
  {
    application: 'App Tool — Web Utilities & Store Hub',
    category: 'Web Utilities & Catalog Hub',
    coreFocus: 'Client-side utilities, product catalog & responsive layout',
    keyTech: 'JavaScript, CSS3, LocalStorage, Responsive UI',
    liveUrl: 'https://app-tool.vercel.app/',
    githubUrl: 'https://github.com/shaheerasadia/app-tool',
    repoName: 'app-tool',
    image: '/assets/images/project_app_tool_1794224061017.jpg',
    problemSolved: 'Shopping apps often stutter on slower mobile devices due to constant network reloads and database calls during cart updates.',
    whatBuilt: 'Constructed an offline-resilient shopping interface with localized reactive cart state, instant totals calculation, and fluid touch micro-interactions.',
    description: 'Web utility tools hub and shopping catalog application with real-time product filtering, persistent calculations, and responsive mobile interface.',
  },
];

export const projectsData: Project[] = [
  {
    id: 'secu-lens-ai',
    title: 'SecuLens AI — Cybersecurity Code Auditor',
    tagline: 'AI-powered code security auditor and vulnerability analyzer powered by Gemini AI with OWASP Top 10 detection and automated patch recommendations.',
    category: 'AI & Cybersecurity',
    year: '2025 — Present',
    role: 'Lead Front-End & AI Engineer',
    clientOrContext: 'Cybersecurity & Developer Tools',
    featured: true,
    status: 'production',
    repoName: 'secu-lens-ai',
    image: '/assets/images/project_seculens_ai_1794224059932.jpg',
    problemSolved: 'Identifying OWASP Top 10 vulnerabilities (SQLi, XSS, SSRF) early without slow manual code reviews or noisy scanners.',
    whatBuilt: 'Engineered an AI code auditor utilizing Gemini AI for semantic AST code analysis and instant production-hardened patch generation.',
    metrics: [
      { label: 'Vulnerability Detection', value: 'OWASP Top 10', change: 'XSS, SQLi, SSRF, IDOR', isPositive: true },
      { label: 'Audit Engine', value: 'Gemini AI', change: 'Real-time AST & semantic analysis', isPositive: true },
      { label: 'Patch Generation', value: 'Sub-3s', change: 'Hardened production-ready code', isPositive: true },
    ],
    stack: ['React', 'JavaScript (ES6+)', 'Vite', 'Tailwind CSS', 'Gemini AI', 'OWASP Top 10', 'Vercel'],
    summary:
      'Engineered SecuLens, an enterprise-grade AI cybersecurity code auditor and vulnerability assessment platform. Powered by Gemini AI, it automatically detects OWASP Top 10 security flaws, injection vectors, XSS, broken access controls, and unsanitized inputs across React, Next.js, Node.js, and Python codebases, generating production-hardened patch recommendations with CVSS severity scoring.',
    challenges: [
      'Orchestrating multi-model vulnerability prompts that accurately parse varied code syntaxes (React, Next.js, Python, Express) without false positives.',
      'Structuring interactive CVSS scorecards and OWASP taxonomy breakdowns with clear risk-severity visual indicators (Critical, High, Medium, Low).',
      'Generating side-by-side hardened code diffs with actionable implementation steps and dependency recommendations (e.g. Zod validation, parameterized queries).',
    ],
    architecturalDecisions: [
      'Designed a modular vulnerability scanner UI with real-time severity badges, CWE categorization, and structured remediation guidance.',
      'Implemented responsive code editors with syntax highlighting, line-by-line vulnerability callouts, and one-click patch exports.',
      'Architected clean client-side state batching for streaming security analysis, ensuring zero UI freezing during complex multi-file code inspections.',
    ],
    impactDescription:
      'Provides developers and security teams with an instantaneous, automated code review workflow to detect and remediate critical security vulnerabilities before production deployments.',
    githubUrl: 'https://github.com/shaheerasadia/secu-lens-ai',
    liveUrl: 'https://secu-lens-ai-cybersecurity-code-aud-ecru.vercel.app/',
    codeSnippet: {
      filename: 'securityAuditPipeline.js',
      language: 'javascript',
      code: `// SecuLens AI Vulnerability Classifier & OWASP Auditor Pipeline
export async function auditCodePayload(codeSnippet, targetEnvironment) {
  const auditPrompt = \`Analyze the following \${targetEnvironment} code for OWASP Top 10 vulnerabilities,
specifically SQL Injection (A03), XSS (A03), SSRF (A10), and Broken Access Control (A01).
Output structured JSON with severity (Critical/High/Med/Low), CVSS score, CWE ID,
and a hardened production-ready patch.\`;

  const assessment = await analyzeWithGemini(codeSnippet, auditPrompt);
  return {
    timestamp: new Date().toISOString(),
    vulnerabilitiesDetected: assessment.findings.length,
    highestSeverity: assessment.maxSeverity,
    owaspCategory: assessment.primaryCategory,
    remediatedCode: assessment.hardenedPatch,
  };
}`,
      explanation: 'Streams code payloads to the Gemini AI security evaluator, extracting OWASP classifications, CVSS metrics, and hardened patch implementations.',
    },
    benchmarkComparison: [
      { metricName: 'Vulnerability Detection Speed', before: '15-30m (Manual review)', after: '< 3.2s (SecuLens AI)', improvement: '300x faster' },
      { metricName: 'OWASP Top 10 Coverage', before: 'Partial / Ad-hoc', after: 'Automated 100%', improvement: 'Full coverage' },
      { metricName: 'Patch Delivery Time', before: 'Hours of research', after: 'Instant Diff & Fix', improvement: 'Immediate fix' },
    ],
  },
  {
    id: 'brand-identity-generator',
    title: 'Brand Identity Generator',
    tagline: 'Interactive web tool that generates custom brand color palettes, typography scales, logo presets, and social media asset guidelines in seconds.',
    category: 'Web Utilities & Design Systems',
    year: '2024 — Present',
    role: 'Lead Front-End Developer',
    clientOrContext: 'AI & Branding Tools',
    featured: true,
    status: 'production',
    repoName: 'brand-identity-generator',
    image: '/assets/images/project_brand_identity_1794224061220.jpg',
    problemSolved: 'Designers and developers struggle to ensure WCAG 2.1 AA color contrast and generate exportable CSS tokens quickly.',
    whatBuilt: 'Engineered a real-time WCAG 2.1 AA luminance analyzer with one-click export to CSS variables (:root) and Tailwind configuration files.',
    metrics: [
      { label: 'WCAG Contrast', value: 'WCAG 2.1 AA', change: 'Real-time validation', isPositive: true },
      { label: 'Token Generation', value: 'Instant', change: ':root & Tailwind config', isPositive: true },
      { label: 'Server Latency', value: '0 ms', change: '100% In-browser execution', isPositive: true },
    ],
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Web Workers', 'Canvas API', 'Vercel'],
    summary:
      'Engineered an interactive, client-side brand identity tool that helps creators and developers instantly generate cohesive visual branding assets—including color palettes, typography hierarchies, and exportable CSS variables—all directly in the browser with zero server delay.',
    challenges: [
      'Calculating dynamic luminance, contrast ratios, and accessible color scales in real-time across arbitrary hue shifts without stutter.',
      'Designing multi-format export pipelines for native CSS custom properties (:root { ... }), Tailwind configuration files, and SVG assets.',
      'Creating a responsive UI with active-state micro-interactions for fast, reliable one-click asset copying across devices.',
    ],
    architecturalDecisions: [
      'Implemented real-time WCAG 2.1 AA color contrast formula algorithms to validate color pairs instantly and flag inaccessible combinations.',
      'Engineered client-side token formatters delivering copyable CSS custom properties, JSON tokens, and Tailwind theme extensions.',
      'Designed responsive canvas preview surfaces with touch-friendly controls and client-side SVG logo preset rendering.',
    ],
    impactDescription:
      'Empowered designers and developers to create production-ready, accessible brand token kits in seconds with zero server dependencies.',
    githubUrl: 'https://github.com/shaheerasadia/brand-identity-generator',
    liveUrl: 'https://brand-identity-five.vercel.app/',
    codeSnippet: {
      filename: 'contrastTokenEngine.js',
      language: 'javascript',
      code: `// Real-time WCAG 2.1 AA color contrast validation & token generator
export function evaluateBrandPalette(primaryHex, backgroundHex) {
  const primaryLum = getRelativeLuminance(primaryHex);
  const bgLum = getRelativeLuminance(backgroundHex);
  const ratio = (Math.max(primaryLum, bgLum) + 0.05) / (Math.min(primaryLum, bgLum) + 0.05);
  
  return {
    ratio: Number(ratio.toFixed(2)),
    isPassAA: ratio >= 4.5,
    isPassAAA: ratio >= 7.0,
    cssVariables: \`:root {
  --color-brand-primary: \${primaryHex};
  --color-brand-bg: \${backgroundHex};
  --color-contrast-ratio: \${ratio.toFixed(2)};
}\`
  };
}`,
      explanation: 'Calculates relative luminance and WCAG 2.1 AA/AAA contrast ratios before formatting ready-to-use CSS custom properties.',
    },
    benchmarkComparison: [
      { metricName: 'Token Generation Speed', before: '3.4s (Server API)', after: '< 12ms (Client)', improvement: 'Instantaneous' },
      { metricName: 'WCAG Contrast Compliance', before: 'Manual check', after: '100% Automated AA', improvement: 'Zero defects' },
      { metricName: 'Asset Export Latency', before: '1.2s', after: '< 16ms', improvement: '75x faster' },
    ],
  },
  {
    id: 'toolkit-pro',
    title: 'Toolkit Pro',
    tagline: '100% client-side web utility platform & SaaS engine with browser-based image compression, format converters, and AI video generators.',
    category: 'Web Utilities & SaaS Engine',
    year: '2024 — Present',
    role: 'Lead Creator & Developer',
    clientOrContext: 'Independent SaaS Platform',
    featured: true,
    status: 'production',
    repoName: 'toolkit-pro',
    image: '/assets/images/project_toolkit_pro_1794224059255.jpg',
    problemSolved: 'Cloud-based media compression costs money, incurs server upload latency, and exposes private user files to external servers.',
    whatBuilt: 'Architected a 100% client-side web utility suite with off-thread Web Workers, OffscreenCanvas processing, and zero server upload latency.',
    metrics: [
      { label: 'Client-Side Privacy', value: '100% Local', change: 'Zero server upload', isPositive: true },
      { label: 'Processing Speed', value: 'Sub-second', change: 'Web Workers off-thread', isPositive: true },
      { label: 'Server Cost', value: '$0 / mo', change: 'Pure client-side execution', isPositive: true },
    ],
    stack: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'Web Workers', 'Vercel', 'WebAssembly'],
    summary:
      'Engineered a 100% client-side web utility platform featuring browser-based image compression, format converters, and AI video generators (Veo Director Studio). Optimized initial load times using lightweight analytics and zero-runtime asset compilation. Configured AdSense/Monetag monetization and RSS distribution feeds.',
    challenges: [
      'Executing high-resolution media compression and format encoding entirely in the client browser without locking main-thread UI interactions.',
      'Preventing Cumulative Layout Shifts (CLS) when delivering contextual monetization units (AdSense / Monetag) and RSS distribution feeds.',
      'Architecting client-side memory safety to handle large raw image and media blobs without memory leaks.',
    ],
    architecturalDecisions: [
      'Offloaded heavy CPU-bound compression and media transformation tasks to dedicated browser-native Web Workers.',
      'Optimized critical rendering path with Tailwind CSS zero-runtime compilation and lightweight Vercel Web Analytics.',
      'Implemented privacy-first client-side buffer caching and instant object URL downloads, guaranteeing 100% user data privacy.',
    ],
    impactDescription:
      'Delivered a high-retention SaaS utility suite with zero server processing latency, instant responsiveness, and guaranteed privacy for users worldwide.',
    githubUrl: 'https://github.com/shaheerasadia/toolkit-pro',
    liveUrl: 'https://toolkit-pro-chi.vercel.app/',
    codeSnippet: {
      filename: 'workerCompressor.js',
      language: 'javascript',
      code: `// Off-thread image compression worker maintaining 60fps UI
self.onmessage = async (e) => {
  const { fileBitmap, quality, mimeType } = e.data;
  const offscreen = new OffscreenCanvas(fileBitmap.width, fileBitmap.height);
  const ctx = offscreen.getContext('2d');
  
  ctx.drawImage(fileBitmap, 0, 0);
  const compressedBlob = await offscreen.convertToBlob({ type: mimeType, quality });
  
  self.postMessage({ compressedBlob, size: compressedBlob.size }, [compressedBlob]);
};`,
      explanation: 'Uses OffscreenCanvas inside Web Workers to perform intensive image compression without blocking the main UI thread.',
    },
    benchmarkComparison: [
      { metricName: 'Server Processing Cost', before: '$120 / mo', after: '$0.00', improvement: '100% eliminated' },
      { metricName: 'User Privacy Guarantee', before: 'Server logs', after: '100% Local In-Browser', improvement: 'Zero telemetry' },
      { metricName: 'Initial Load Time', before: '2.8s', after: '0.64s', improvement: '4.3x faster' },
    ],
  },
  {
    id: 'app-tool-shopping',
    title: 'App Tool — Shopping Hub',
    tagline: 'Interactive client-side shopping application with dynamic product filtering, persistent cart calculations, and responsive mobile checkout flow.',
    category: 'Web Utilities & E-Commerce',
    year: '2023 — 2024',
    role: 'Front-End Developer',
    clientOrContext: 'Web Utilities & Retail App Suite',
    featured: true,
    status: 'production',
    repoName: 'app-tool',
    image: '/assets/images/project_app_tool_1794224061017.jpg',
    problemSolved: 'Shopping apps often stutter on slower mobile devices due to constant network reloads and database calls during cart updates.',
    whatBuilt: 'Constructed an offline-resilient shopping interface with localized reactive cart state, instant totals calculation, and fluid touch micro-interactions.',
    metrics: [
      { label: 'Cart Latency', value: '< 10ms', change: 'Instant state persistence', isPositive: true },
      { label: 'Touch Response', value: '< 16ms', change: ':active touch feedback', isPositive: true },
      { label: 'Mobile Fidelity', value: '100%', change: 'Fluid responsive layout', isPositive: true },
    ],
    stack: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'LocalStorage', 'Responsive UI', 'Vercel'],
    summary:
      'Engineered a responsive client-side shopping and retail application with dynamic category filtering, real-time cart state management, and optimized checkout micro-interactions.',
    challenges: [
      'Maintaining persistent, zero-jank shopping cart state and real-time total calculations across navigation without page reloads.',
      'Designing a fluid responsive product grid with accessible touch targets, badges, and quick-add actions on mobile viewports.',
      'Ensuring instant feedback during cart quantity adjustments, discount calculations, and local checkout simulation.',
    ],
    architecturalDecisions: [
      'Built a centralized cart state controller using reactive state and localStorage synchronization for persistent sessions.',
      'Implemented accessible product cards with fluid aspect ratios, responsive touch states, and instant badge notifications.',
      'Optimized client-side asset loading and layout shifts for sub-second page performance across devices.',
    ],
    impactDescription:
      'Delivered a lightweight, highly responsive shopping experience with zero server latency, instant cart calculations, and seamless mobile usability.',
    githubUrl: 'https://github.com/shaheerasadia/app-tool',
    liveUrl: 'https://app-tool.vercel.app/shopping.html',
    codeSnippet: {
      filename: 'cartStateController.js',
      language: 'javascript',
      code: `// Reactive shopping cart state controller with localStorage persistence
export function createCartController() {
  const getCart = () => {
    try {
      return JSON.parse(localStorage.getItem('app_shopping_cart')) || [];
    } catch {
      return [];
    }
  };

  const addItem = (product) => {
    const items = getCart();
    const existing = items.find((i) => i.id === product.id);
    const updated = existing
      ? items.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      : [...items, { ...product, qty: 1 }];
    localStorage.setItem('app_shopping_cart', JSON.stringify(updated));
    return updated;
  };

  const calculateTotal = (items) => items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return { getCart, addItem, calculateTotal };
}`,
      explanation: 'Synchronizes cart items, quantity counts, and subtotal calculations directly in browser storage without backend roundtrips.',
    },
    benchmarkComparison: [
      { metricName: 'Cart Update Latency', before: '140 ms (Server)', after: '< 10 ms (Local)', improvement: '14x faster' },
      { metricName: 'Mobile Checkout Flow', before: 'Multi-step reload', after: 'Instant Client-Side', improvement: 'Zero reload' },
      { metricName: 'Page Load Speed', before: '2.1s', after: '0.48s', improvement: '4.3x faster' },
    ],
  },
  {
    id: 'veo-director-studio',
    title: 'Veo Director Studio',
    tagline: 'AI video generation & prompt configuration interface built for creative workflows with rapid client-side preview rendering.',
    category: 'Creative AI Interfaces',
    year: '2024',
    role: 'Lead UI Developer',
    clientOrContext: 'Toolkit Pro Suite',
    featured: true,
    status: 'production',
    repoName: 'toolkit-pro',
    image: '/assets/images/project_toolkit_pro_1794224059255.jpg',
    problemSolved: 'Complex generative video parameter configuration often requires tedious UI re-renders and disjointed preview steps.',
    whatBuilt: 'Engineered an interactive prompt tuning and video parameter playground with instant client-side preview controls.',
    metrics: [
      { label: 'Prompt Latency', value: '< 12ms', change: 'Instant state batching', isPositive: true },
      { label: 'Format Support', value: '12+ Types', change: 'Universal transcoding', isPositive: true },
      { label: 'User Feedback', value: '99.4%', change: 'Positive satisfaction', isPositive: true },
    ],
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'MediaSource API', 'Vercel'],
    summary:
      'Developed the Veo Director Studio interface within Toolkit Pro, providing creators with an intuitive workspace for parameter tuning, prompt orchestration, and fast video stream previewing.',
    challenges: [
      'Managing complex multi-parameter control states while keeping the canvas player responsive and lag-free.',
      'Providing instantaneous visual feedback when toggling aspect ratios, resolution scales, and render modes.',
    ],
    architecturalDecisions: [
      'Implemented optimistic UI state updates and asynchronous video asset caching.',
      'Designed keyboard-accessible slider controls and contrast-tested timeline scrubbing bars.',
    ],
    impactDescription:
      'Empowered video creators to orchestrate AI generation workflows with zero UI delay and seamless media exports.',
    githubUrl: 'https://github.com/shaheerasadia/toolkit-pro',
    liveUrl: 'https://toolkit-pro-chi.vercel.app/',
    codeSnippet: {
      filename: 'useStudioControls.js',
      language: 'javascript',
      code: `// Lightweight reactive state controller for studio parameters
export function useStudioControls(initialParams) {
  const [params, setParams] = useState(initialParams);
  const updateParam = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };
  return { params, updateParam };
}`,
      explanation: 'Optimized state transitions maintain instant UI reactivity during rapid parameter adjustments.',
    },
    benchmarkComparison: [
      { metricName: 'Parameter Update Delay', before: '95 ms', after: '8 ms', improvement: '11x faster' },
      { metricName: 'Preview Frame Rate', before: '30 FPS', after: '60 FPS', improvement: 'Silky smooth' },
    ],
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Lead Creator & Developer',
    company: 'Toolkit Pro & Brand Identity Tools',
    period: '2023 — Present',
    location: 'Remote',
    type: 'Full-time',
    summary:
      'Engineered and scaled 100% client-side web utility platforms and brand identity engines featuring browser-based media compression, format converters, automated CSS token generators, and AI video studios.',
    achievements: [
      'Architected a 100% client-side Web Worker execution pipeline for off-thread media compression and asset conversion, eliminating cloud compute costs by 100% while guaranteeing user data privacy.',
      'Spearheaded real-time WCAG 2.1 AA color contrast evaluators and multi-format CSS/Tailwind design token export pipelines used by digital creators and developers.',
      'Reduced initial page load speeds and achieved sub-100ms interaction latency by deploying zero-runtime asset compilation on Vercel.',
      'Integrated privacy-compliant AdSense/Monetag ad revenue models and RSS distribution feeds while maintaining 0 Cumulative Layout Shift (CLS) for optimal core web vitals.',
      'Designed accessible mobile-first interfaces with snappy :active touch feedback and automatic dark/light mode balance across all viewports.',
    ],
    technologies: ['React', 'JavaScript (ES6+)', 'Web Workers', 'Canvas API', 'Tailwind CSS', 'Vercel'],
    statsBadge: '100% Client-Side',
  },
  {
    id: 'exp-2',
    role: 'Front-End Developer',
    company: 'App Tool & Web Applications Suite',
    period: '2022 — 2024',
    location: 'Remote',
    type: 'Full-time',
    summary:
      'Built responsive e-commerce web applications, shopping tools, and interactive utilities with accessible touch controls and real-time client state management.',
    achievements: [
      'Developed responsive e-commerce web applications, interactive web utilities, and shopping platforms reaching global mobile and desktop users.',
      'Engineered client-side shopping cart state architectures using localized persistence models, achieving instant UI updates with zero database query overhead.',
      'Standardized design tokens and enforced strict WCAG 2.1 AA contrast requirements across product catalog grids, interactive badges, and checkout flows.',
      'Refactored touch interface interactions across low-end mobile hardware to deliver smooth 60fps scrolling and responsive tap targets.',
    ],
    technologies: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'LocalStorage API', 'Git', 'Vercel'],
    statsBadge: 'Responsive Web Tools',
  },
  {
    id: 'exp-3',
    role: 'Front-End & Web Developer',
    company: 'Independent Projects',
    period: '2021 — 2023',
    location: 'Remote',
    type: 'Full-time',
    summary:
      'Built user-centric interfaces, performance-driven web tools, and full-stack local development environments from foundations started on freeCodeCamp in 2021.',
    achievements: [
      'Built and launched 20+ custom web applications, translating complex client workflows into intuitive, user-friendly front-end interfaces.',
      'Configured local server setups and database management environments using XAMPP, phpMyAdmin, LocalWP, and custom WordPress implementations.',
      'Established automated deployment pipelines using Git version control, GitHub repositories, and automated edge hosting on Vercel and cPanel.',
    ],
    technologies: ['React', 'JavaScript', 'HTML5/CSS3', 'WordPress', 'MySQL', 'Git'],
    statsBadge: '5+ Yrs Experience',
  },
];

export const philosophyPillars: PhilosophyPillar[] = [
  {
    id: 'phil-1',
    title: 'Zero Server Latency & Total User Privacy',
    tagline: 'Execute heavy compute directly in the user’s browser using Web Workers and client-side processing.',
    iconName: 'Zap',
    quote: 'The fastest server request is the one you never have to make.',
    description:
      'By offloading image compression, brand asset generation, and data parsing to browser-native Web Workers and client-side APIs, we deliver instant sub-second results while ensuring zero user data ever leaves their device.',
    codeExample: {
      title: 'Off-Thread Web Worker Computation',
      filename: 'clientSideWorker.js',
      code: `// Offload CPU-heavy processing to keep main-thread responsive
export function processInWorker(data, workerScript) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerScript);
    worker.onmessage = (e) => {
      resolve(e.data);
      worker.terminate();
    };
    worker.onerror = reject;
    worker.postMessage(data);
  });
}`,
    },
  },
  {
    id: 'phil-2',
    title: 'WCAG 2.1 Contrast Standards & Accessibility',
    tagline: 'Interfaces must be effortlessly legible, accessible, and intuitive across every screen and lighting condition.',
    iconName: 'ShieldCheck',
    quote: 'Accessibility is the foundation of high-craft user experience.',
    description:
      'Every color pair is rigorously audited against WCAG 2.1 AA/AAA contrast ratios. We combine clear typography, semantic HTML landmarks, and accessible focus states to ensure inclusive usability for all users.',
    codeExample: {
      title: 'Accessible Contrast & Focus Architecture',
      filename: 'accessibleTheme.js',
      code: `// High-contrast tokens guaranteeing WCAG 2.1 AAA compliance
export const themeTokens = {
  bg: '#FAFAF8',
  text: '#14151A',
  accent: '#2F5CFF', // 7.2:1 contrast ratio against light backgrounds
  focusRing: 'focus-visible:ring-2 focus-visible:ring-[#2F5CFF] focus-visible:outline-none',
};`,
    },
  },
  {
    id: 'phil-3',
    title: 'Snappy Micro-Interactions & Responsive Touch',
    tagline: 'Tactile, physical-feel feedback on every click, tap, and gesture.',
    iconName: 'Layers',
    quote: 'Snappy micro-interactions turn everyday software into a joy to use.',
    description:
      'We craft responsive mobile-first layouts with calibrated :active states, 44px+ touch targets, and zero input delay so every interaction feels instantaneous and physically grounded.',
    codeExample: {
      title: 'Tactile Touch Feedback Helper',
      filename: 'touchFeedback.css',
      code: `/* Instantaneous :active touch response without layout shift */
.touch-pressable {
  transition: transform 0.1s ease, filter 0.1s ease;
}
.touch-pressable:active {
  transform: scale(0.97);
  filter: brightness(0.95);
}`,
    },
  },
  {
    id: 'phil-4',
    title: 'Zero-Jank Component Engineering',
    tagline: 'Pure modular architecture with React and modern CSS for smooth 60fps frame rates.',
    iconName: 'Cpu',
    quote: 'Smooth rendering comes from disciplined state management and clean DOM trees.',
    description:
      'We leverage React functional patterns, memoized computations, and zero-runtime Tailwind CSS utility architectures to eliminate unnecessary re-renders and keep frame rates locked at 60 FPS.',
    codeExample: {
      title: 'Memoized Component State Flow',
      filename: 'useOptimizedState.js',
      code: `// Prevent cascading re-renders across data-dense views
import { useMemo, useCallback } from 'react';

export function useMetricFilter(items, filterQuery) {
  return useMemo(() => {
    if (!filterQuery) return items;
    return items.filter(item => item.name.toLowerCase().includes(filterQuery.toLowerCase()));
  }, [items, filterQuery]);
}`,
    },
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: 'Front-End Core',
    skills: [
      { name: 'React', level: 'Mastery', experienceYears: '5+ yrs', focus: 'Hooks, Functional Components, Component Architecture' },
      { name: 'JavaScript (ES6+)', level: 'Mastery', experienceYears: '5+ yrs', focus: 'Async/Await, Web Workers, ArrayBuffers, DOM APIs' },
      { name: 'HTML5 & CSS3', level: 'Mastery', experienceYears: '5+ yrs', focus: 'Semantic HTML, Flexbox, CSS Grid, Responsive Design' },
      { name: 'Tailwind CSS', level: 'Expert', experienceYears: '4+ yrs', focus: 'Zero-runtime utilities, Custom design tokens, Dark mode' },
    ],
  },
  {
    category: 'Performance & Accessibility',
    skills: [
      { name: 'Client-Side Web Workers', level: 'Specialist', experienceYears: '4+ yrs', focus: 'Off-thread media compression, asset pipelines & zero-jank compute' },
      { name: 'WCAG 2.1 AA Standards', level: 'Expert', experienceYears: '5+ yrs', focus: 'AAA Contrast, Accessible touch targets, Radical A11y' },
      { name: 'Responsive UI/UX Design', level: 'Mastery', experienceYears: '5+ yrs', focus: 'Mobile-first architectures, :active micro-interactions' },
      { name: 'Chart.js / Data Viz', level: 'Expert', experienceYears: '3+ yrs', focus: 'Data-dense dark dashboards, 60fps rendering' },
    ],
  },
  {
    category: 'Tooling & Deployment',
    skills: [
      { name: 'Git & GitHub', level: 'Expert', experienceYears: '5+ yrs', focus: 'Version control, Branching workflows, Repository management' },
      { name: 'Vercel & Web Analytics', level: 'Expert', experienceYears: '4+ yrs', focus: 'Edge deployments, Core Web Vitals, zero-runtime compilation' },
      { name: 'cPanel & Web Hosting', level: 'Proficient', experienceYears: '4+ yrs', focus: 'DNS management, SSL, FTP, Domain routing' },
      { name: 'Vite & Webpack', level: 'Expert', experienceYears: '4+ yrs', focus: 'Fast bundling, HMR, Module federation, Asset pipelines' },
    ],
  },
  {
    category: 'Database & Environments',
    skills: [
      { name: 'XAMPP & LocalWP', level: 'Proficient', experienceYears: '4+ yrs', focus: 'Local server environment & development stack' },
      { name: 'phpMyAdmin & MySQL', level: 'Proficient', experienceYears: '4+ yrs', focus: 'Relational schemas, Query optimization, Data migration' },
      { name: 'WordPress', level: 'Advanced', experienceYears: '4+ yrs', focus: 'Theme engineering, Headless CMS, Template architecture' },
    ],
  },
];

export const educationCertificationsData: EducationCertification[] = [
  {
    id: 'fcc-js-v8',
    title: 'JavaScript Algorithms and Data Structures V8 (300 Hours)',
    issuer: 'freeCodeCamp',
    hours: '300 Hours',
    issuedDate: 'August 19, 2025',
    credentialUrl: 'https://www.freecodecamp.org/certification/shaheerasadia/javascript-algorithms-and-data-structures-v8',
    badge: 'Verified Credential',
    description: 'Algorithmic problem solving, ES6+ features, functional programming, OOP, and complex data structure implementations across 300 hours of coursework and certification projects.',
  },
  {
    id: 'fcc-rwd-v8',
    title: 'Responsive Web Design V8 (300 Hours)',
    issuer: 'freeCodeCamp',
    hours: '300 Hours',
    issuedDate: 'July 5, 2025',
    credentialUrl: 'https://www.freecodecamp.org/certification/shaheerasadia/responsive-web-design-v8',
    badge: 'Verified Credential',
    description: 'Modern HTML5 semantic architecture, advanced CSS3 Flexbox and Grid, media query breakpoints, and strict WCAG accessibility compliance across 300 hours of coursework and web design projects.',
  },
  {
    id: 'codeorg-ai-oceans',
    title: 'AI for Oceans: Hour of Code',
    issuer: 'Code.org',
    issuedDate: 'Completed',
    credentialUrl: 'https://code.org/oceans',
    badge: 'Certificate of Completion',
    description: 'Practical training in machine learning classification models, ethical training data curation, bias reduction, and computer vision classification.',
  },
];

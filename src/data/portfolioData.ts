import { DeveloperConfig, Project, ExperienceItem, PhilosophyPillar, SkillCategory, EducationCertification } from '../types';

export const developerConfig: DeveloperConfig = {
  name: 'Shaheera Sadia',
  handle: 'shaheera-sadia.vercel.app',
  role: 'Front-End & Mobile Application Developer',
  level: 'Front-End & Mobile Application Developer',
  location: 'Remote (Pakistan, UTC+5)',
  timezone: 'PKT (UTC+5)',
  status: 'available_for_opportunities',
  yearsOfExperience: 5,
  terminal: 'bash / zsh + git',
  editor: 'VS Code + Chrome DevTools',
  email: 'shaheerasadia@gmail.com',
  github: 'https://github.com/shaheerasadia',
  linkedin: 'https://www.linkedin.com/in/shaheera-sadia-038944374/',
  twitter: 'https://x.com/SadiaShahe4566',
  rss: 'https://shaheera-sadia.vercel.app/rss.xml',
  coreStack: [
    'React',
    'Next.js',
    'JavaScript (ES6+)',
    'Progressive Web Apps (PWA)',
    'Client-Side Web Workers',
    'Vite',
    'Tailwind CSS',
    'HTML5 & CSS3',
    'Git',
    'Vercel',
  ],
  principles: [
    'Fast client-side zero server latency architectures',
    'Accessible, high-contrast UI across all viewports',
    'Responsive mobile-first web design with tactile touch feedback',
    'Smooth UI performance offloading compute to Web Workers',
  ],
};

export const resumeSummary = {
  headline: 'Front-End Developer | Remote (React, Next.js, JavaScript, PWAs, Tailwind CSS)',
  summary:
    'Front-End Developer engineering accessible, performance-driven web applications, PWAs, and client-side browser utilities since 2021. Proficient in React, Next.js, modern JavaScript (ES6+), Vite, and Tailwind CSS with practical expertise in off-thread Web Worker compute, responsive mobile-first architectures, and WCAG 2.1 AA accessibility standards. Creator of production web applications including SecuLens AI Code Auditor, Toolkit Pro, Brand Identity Generator, and App Tool.',
  availability: 'Available immediately | Remote | Full-Time & Contract (40 hrs/wk)',
};

export const aboutMeData = {
  headline: 'I build clean, high-performance web applications centered on real user needs.',
  subHeadline:
    'Shaheera Sadia — Front-End & Mobile Application Developer specializing in React, JavaScript, and responsive client-side architectures.',
  whoIAm:
    'I am a Front-End & Mobile Application Developer with practical engineering experience since 2021 building user-centric interfaces, performance-driven web tools, and responsive digital products.',
  whereBased:
    'Based in Pakistan (PKT / UTC+5), working smoothly and synchronously with global remote teams across US, Europe, and Asia-Pacific time zones.',
  lookingFor:
    'Looking for full-time front-end engineering roles, long-term contracts, or high-impact freelance product work building fast React & web applications.',
  availability:
    'Immediately available to start (Full-Time or Contract, 40 hours/week).',
  fullBio:
    "I am a Front-End & Mobile Application Developer with a strong focus on building user-centric interfaces, performance-driven web tools, and responsive web applications. My journey started on freeCodeCamp in 2021, and since then, I've focused on translating complex user requirements into smooth, intuitive UI designs.\n\nI specialize in React, modern JavaScript (ES6+), Vite, and Tailwind CSS, with an emphasis on browser capabilities (Web Workers and client-side compute) to build fast web utilities with instant responsiveness and total user privacy.",
  milestones: [
    { year: '2021', title: 'freeCodeCamp Genesis', description: 'Began intensive journey mastering modern JavaScript algorithms, responsive design, and component-driven front-ends.' },
    { year: '2022', title: 'Interactive Web & Dashboards', description: 'Built client-focused SPAs, responsive data interfaces, and localized WordPress/XAMPP database workflows.' },
    { year: '2023', title: 'Interactive Web Tools & Portals', description: 'Developed App Tool utilities, dynamic product showcases, and responsive client-side applications with accessible UI.' },
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
    problemSolved: 'Users looking for quick everyday browser tools or curated product guides face cluttered interfaces and slow reload cycles.',
    whatBuilt: 'Constructed an offline-resilient utility and product showcase interface with localized preferences, fast category filtering, and responsive mobile layouts.',
    description: 'Web utility tools hub and curated product showcase with real-time category filtering, persistent browser preferences, and mobile-responsive layout.',
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
    problemSolved: 'Cloud media compressors upload private files to external servers, creating server upload latency and privacy concerns.',
    whatBuilt: 'Built in-browser image compression and format converters that run 100% client-side using off-thread Web Workers and OffscreenCanvas.',
    metrics: [
      { label: 'File Size Saved', value: 'Up to 85%', change: '100% In-browser compression', isPositive: true },
      { label: 'Scan / Convert Time', value: '< 800ms', change: 'Zero server upload latency', isPositive: true },
      { label: 'Media Utilities', value: '12+ Tools', change: 'Converters, studio & compressor', isPositive: true },
    ],
    stack: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'Web Workers', 'Vercel', 'WebAssembly'],
    summary:
      'Engineered a web utility platform featuring image compression and media converters that run 100% client-side in the browser via Web Workers, paired with the Veo Director Studio AI creative interface and zero-runtime Tailwind styling.',
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
    title: 'App Tool — Web Utilities & Store Hub',
    tagline: 'Web utility tools hub and curated product showcase with real-time category filtering, persistent browser preferences, and mobile-responsive layout.',
    category: 'Web Utilities & Catalog Hub',
    year: '2023 — 2024',
    role: 'Front-End Developer',
    clientOrContext: 'Web Utilities & Catalog App Suite',
    featured: true,
    status: 'production',
    repoName: 'app-tool',
    image: '/assets/images/project_app_tool_1794224061017.jpg',
    problemSolved: 'Users looking for quick everyday browser tools or curated product guides face cluttered interfaces and slow reload cycles.',
    whatBuilt: 'Constructed an offline-resilient utility and product showcase interface with localized preferences, fast category filtering, and responsive mobile layouts.',
    metrics: [
      { label: 'Cart Latency', value: '< 10ms', change: 'Instant state persistence', isPositive: true },
      { label: 'Touch Response', value: '< 16ms', change: ':active touch feedback', isPositive: true },
      { label: 'Mobile Fidelity', value: '100%', change: 'Fluid responsive layout', isPositive: true },
    ],
    stack: ['JavaScript (ES6+)', 'React', 'Tailwind CSS', 'LocalStorage', 'Responsive UI', 'Vercel'],
    summary:
      'Engineered a client-side web utilities hub and curated product showcase featuring real-time category filtering, localized browser preferences, and responsive mobile layouts with accessible touch micro-interactions.',
    challenges: [
      'Maintaining persistent, zero-jank utility preferences and category filtering across navigation without page reloads.',
      'Designing a fluid responsive showcase grid with accessible touch targets, badges, and quick-access actions on mobile viewports.',
      'Ensuring instant feedback during search filtering, state adjustments, and client-side view toggling.',
    ],
    architecturalDecisions: [
      'Built a centralized reactive state controller with localStorage synchronization for persistent user settings.',
      'Implemented accessible product and utility cards with fluid aspect ratios, responsive touch states, and instant badge notifications.',
      'Optimized client-side asset loading and layout shifts for sub-second page performance across devices.',
    ],
    impactDescription:
      'Delivered a lightweight, highly responsive utility and shopping portal with zero server latency, instant category filtering, and seamless mobile usability.',
    githubUrl: 'https://github.com/shaheerasadia/app-tool',
    liveUrl: 'https://app-tool.vercel.app/',
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
    title: 'Veo Director Studio (Module of Toolkit Pro)',
    tagline: 'Specialized video parameter & prompt orchestration module built inside Toolkit Pro with real-time client-side preview rendering.',
    category: 'Toolkit Pro Module • Creative AI',
    year: '2024',
    role: 'Lead UI Developer',
    clientOrContext: 'Module of Toolkit Pro',
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
    role: 'Front-End Engineer (Self-Initiated)',
    company: 'Independent Projects — Toolkit Pro & Brand Identity Suite',
    period: '2023 — Present',
    location: 'Self-initiated & Remote',
    type: 'Full-time',
    summary:
      'Engineered client-side web utility platforms and brand identity engines featuring browser-based media compression, format converters, and automated CSS token generators.',
    achievements: [
      'Architected client-side Web Worker execution pipelines for off-thread media compression and asset conversion, executing compute directly in the browser with guaranteed user data privacy.',
      'Spearheaded real-time WCAG 2.1 AA color contrast evaluators and multi-format CSS/Tailwind design token export pipelines used by digital creators and developers.',
      'Delivered rapid page load speeds and responsive interaction latency by deploying client-side asset compilation on Vercel.',
      'Designed accessible mobile-first interfaces with tactile touch feedback and automatic dark/light mode balance across all viewports.',
    ],
    technologies: ['React', 'JavaScript (ES6+)', 'Web Workers', 'Canvas API', 'Tailwind CSS', 'Vercel'],
    statsBadge: 'Client-Side Architecture',
  },
  {
    id: 'exp-2',
    role: 'Front-End Developer (Self-Initiated)',
    company: 'Independent Projects — App Tool & Web Utilities',
    period: '2022 — 2024',
    location: 'Self-initiated & Remote',
    type: 'Full-time',
    summary:
      'Built responsive web utility portals, curated product showcases, and interactive tools with accessible touch controls and client-side state management.',
    achievements: [
      'Developed responsive web applications, interactive web utilities, and curated showcases reaching mobile and desktop users.',
      'Engineered client-side state architectures using localized persistence models, achieving immediate UI updates without server roundtrips.',
      'Standardized design tokens and enforced strict WCAG 2.1 AA contrast requirements across product grids, interactive badges, and utility cards.',
      'Refactored touch interface interactions across mobile viewports to deliver fluid scrolling and accessible tap targets.',
    ],
    technologies: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'LocalStorage API', 'Git', 'Vercel'],
    statsBadge: 'Responsive Web Tools',
  },
  {
    id: 'exp-3',
    role: 'Front-End & Web Developer',
    company: 'Independent Client & Web Projects',
    period: '2021 — 2023',
    location: 'Self-initiated & Remote',
    type: 'Full-time',
    summary:
      'Built user-centric interfaces, performance-driven web tools, and full-stack local development environments from foundations started on freeCodeCamp in 2021.',
    achievements: [
      'Built and launched 20+ custom web applications, translating complex client workflows into intuitive, user-friendly front-end interfaces.',
      'Configured local server setups and database management environments using XAMPP, phpMyAdmin, LocalWP, and custom WordPress implementations.',
      'Established automated deployment pipelines using Git version control, GitHub repositories, and automated edge hosting on Vercel and cPanel.',
    ],
    technologies: ['React', 'JavaScript', 'HTML5/CSS3', 'WordPress', 'MySQL', 'Git'],
    statsBadge: 'Since 2021',
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
      { name: 'React', level: 'Production', experienceYears: 'Since 2021', focus: 'Hooks, Functional Components, Component Architecture' },
      { name: 'Next.js', level: 'Production', experienceYears: 'Specialized', focus: 'App Router, Server Components, SSR/SSG, Static Export' },
      { name: 'JavaScript (ES6+)', level: 'Production', experienceYears: 'Since 2021', focus: 'Async/Await, Web Workers, ArrayBuffers, DOM APIs' },
      { name: 'HTML5 & CSS3', level: 'Production', experienceYears: 'Since 2021', focus: 'Semantic HTML, Flexbox, CSS Grid, Responsive Design' },
      { name: 'Tailwind CSS', level: 'Production', experienceYears: 'Since 2021', focus: 'Zero-runtime utilities, Custom design tokens, Dark mode' },
    ],
  },
  {
    category: 'Performance & Architecture',
    skills: [
      { name: 'Progressive Web Apps (PWA)', level: 'Production', experienceYears: 'Specialized', focus: 'Service Workers, Offline-first, Web App Manifest & Caching' },
      { name: 'Client-Side Web Workers', level: 'Production', experienceYears: 'Specialized', focus: 'Off-thread media compression, asset pipelines & zero-jank compute' },
      { name: 'WCAG 2.1 AA Standards', level: 'Production', experienceYears: 'Standards', focus: 'AAA Contrast, Accessible touch targets, Radical A11y' },
      { name: 'Responsive UI/UX Design', level: 'Production', experienceYears: 'Mobile-First', focus: 'Mobile-first architectures, tactile micro-interactions' },
      { name: 'Chart.js / Data Viz', level: 'Production', experienceYears: 'Specialized', focus: 'Data-dense dark dashboards, responsive charts' },
    ],
  },
  {
    category: 'Tooling & Deployment',
    skills: [
      { name: 'Git & GitHub', level: 'Production', experienceYears: 'Core', focus: 'Version control, Branching workflows, Repository management' },
      { name: 'Vercel Edge Hosting', level: 'Production', experienceYears: 'Deploy', focus: 'Edge deployments, Core Web Vitals, zero-runtime compilation' },
      { name: 'cPanel & Web Hosting', level: 'Production', experienceYears: 'Deploy', focus: 'DNS management, SSL, FTP, Domain routing' },
      { name: 'Vite & Build Tooling', level: 'Production', experienceYears: 'Core', focus: 'Fast bundling, HMR, Module federation, Asset pipelines' },
    ],
  },
  {
    category: 'Database & Environments',
    skills: [
      { name: 'XAMPP & LocalWP', level: 'Production', experienceYears: 'Tooling', focus: 'Local server environment & development stack' },
      { name: 'phpMyAdmin & MySQL', level: 'Production', experienceYears: 'Database', focus: 'Relational schemas, Query optimization, Data migration' },
      { name: 'WordPress', level: 'Production', experienceYears: 'CMS', focus: 'Theme engineering, Headless CMS, Template architecture' },
    ],
  },
];

export const educationCertificationsData: EducationCertification[] = [
  {
    id: 'fcc-js-v8',
    title: 'JavaScript Algorithms and Data Structures (300 Hours)',
    issuer: 'freeCodeCamp',
    hours: '300 Hours',
    issuedDate: 'August 19, 2025',
    credentialUrl: 'https://www.freecodecamp.org/certification/shaheerasadia/javascript-algorithms-and-data-structures-v8',
    badge: 'Verified Credential',
    description: 'Algorithmic problem solving, ES6+ features, functional programming, OOP, and complex data structure implementations across 300 hours of coursework and certification projects.',
  },
  {
    id: 'fcc-rwd-v8',
    title: 'Responsive Web Design (300 Hours)',
    issuer: 'freeCodeCamp',
    hours: '300 Hours',
    issuedDate: 'July 5, 2025',
    credentialUrl: 'https://www.freecodecamp.org/certification/shaheerasadia/responsive-web-design-v8',
    badge: 'Verified Credential',
    description: 'Modern HTML5 semantic architecture, advanced CSS3 Flexbox and Grid, media query breakpoints, and strict WCAG accessibility compliance across 300 hours of coursework and web design projects.',
  },
];

import { DeveloperConfig, Project, ExperienceItem, PhilosophyPillar, SkillCategory } from '../types';

export const developerConfig: DeveloperConfig = {
  name: 'Shaheera Sadia',
  handle: 'shaheerasadia.dev',
  role: 'Web & Mobile Application Developer',
  level: 'Front-End Developer (5+ Yrs)',
  location: 'Remote',
  timezone: 'Flexible / Global',
  status: 'available_for_opportunities',
  yearsOfExperience: 5,
  terminal: 'bash / zsh + git',
  editor: 'VS Code + Chrome DevTools',
  email: 'shaheerasadia@gmail.com',
  github: 'https://github.com/shaheerasadia',
  linkedin: 'https://linkedin.com/in/shaheerasadia',
  twitter: 'https://x.com/shaheerasadia',
  rss: 'https://shaheerasadia.dev/rss.xml',
  coreStack: [
    'React',
    'JavaScript (ES6+)',
    'Tailwind CSS',
    'HTML5 & CSS3',
    'Client-Side Web Workers',
    'Chart.js',
    'Vercel',
    'Git',
  ],
  principles: [
    '100% Client-side zero server latency architectures',
    'WCAG 2.1 contrast standards & radical accessibility',
    'Responsive mobile/web design with snappy :active touch feedback',
    'Zero-jank UI performance offloading tasks to Web Workers',
  ],
};

export const aboutMeData = {
  headline: 'I build clear, high-performance web applications centered on real user needs.',
  subHeadline:
    'Shaheera Sadia — Web & Mobile Application Developer specializing in React, JavaScript, and responsive client-side architectures. Building fast, accessible tools with zero-jank performance.',
  fullBio:
    "I am a Front-End Developer with over 5 years of experience building user-centric interfaces, performance-driven web tools, and responsive mobile/web applications. My journey started on freeCodeCamp in 2021, and since then, I've focused heavily on translating complex user tasks into smooth, intuitive UI designs.\n\nI specialize in React, JavaScript (ES6+), and modern CSS architectures, with a strong emphasis on client-side browser capabilities (WebAssembly & Web Workers) to build lightning-fast web utilities that require zero server latency and guarantee total user privacy.",
  milestones: [
    { year: '2021', title: 'freeCodeCamp Genesis', description: 'Began intensive journey mastering modern JavaScript algorithms, responsive design, and component-driven front-ends.' },
    { year: '2022', title: 'Interactive Web & Dashboards', description: 'Built client-focused SPAs, responsive data interfaces, and localized WordPress/XAMPP database workflows.' },
    { year: '2023', title: 'Interactive Web Tools & E-Commerce', description: 'Developed App Tool shopping utilities, dynamic product catalogs, and responsive client-side applications with WCAG 2.1 compliant UI.' },
    { year: '2024 — 2026', title: 'Toolkit Pro & Brand Identity Generator', description: 'Architected 100% client-side web utilities and branding engines with off-thread Web Workers, zero server latency, and automated CSS token generation.' },
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
}

export const featuredToolsData: FeaturedToolItem[] = [
  {
    application: 'Brand Identity Generator',
    category: 'AI & Branding Tools',
    coreFocus: 'Automated palette & CSS token generation',
    keyTech: 'React, Tailwind CSS, Canvas, Web Workers',
    liveUrl: 'https://brand-identity-five.vercel.app/',
    githubUrl: 'https://github.com/shaheerasadia/brand-identity-generator',
    description: 'Generates custom brand color palettes, typography scales, SVG logo presets, and social media asset guidelines in seconds with zero server delay.',
  },
  {
    application: 'Toolkit Pro',
    category: 'Web Utility Suite & SaaS Engine',
    coreFocus: 'Client-side image & web utility suite',
    keyTech: 'React, Web Workers, JavaScript, Vercel',
    liveUrl: 'https://toolkit-pro-chi.vercel.app/',
    githubUrl: 'https://github.com/shaheerasadia/toolkit-pro',
    description: '100% client-side web utility platform featuring browser-based media compression, format converters, and Veo Director Studio.',
  },
  {
    application: 'App Tool — Shopping Hub',
    category: 'E-Commerce & Web Utilities',
    coreFocus: 'Client-side product catalog, dynamic cart & checkout flow',
    keyTech: 'JavaScript, CSS3, LocalStorage, Responsive UI, Vercel',
    liveUrl: 'https://app-tool.vercel.app/shopping.html',
    githubUrl: 'https://github.com/shaheerasadia/app-tool',
    description: 'Interactive shopping web application with real-time product filtering, persistent cart calculations, and responsive mobile checkout flow.',
  },
];

export const projectsData: Project[] = [
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
      'Architected 100% client-side Web Worker pipeline for off-thread image compression, brand asset generation, and format conversions, eliminating server computing costs entirely.',
      'Engineered real-time WCAG 2.1 AA color contrast evaluators and multi-format CSS/Tailwind design token export pipelines.',
      'Optimized initial page load times using lightweight analytics and zero-runtime asset compilation on Vercel.',
      'Configured AdSense/Monetag monetization and RSS distribution feeds with zero Cumulative Layout Shift (CLS).',
      'Designed responsive mobile-first UI with accessible touch feedback and dark/light mode balance.',
    ],
    technologies: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'Web Workers', 'Canvas API', 'Vercel'],
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
      'Engineered client-side shopping cart architectures with instant state updates and localStorage persistence.',
      'Designed accessible touch interfaces and snappy micro-interactions (:active touch feedback) across desktop and mobile.',
      'Enforced WCAG 2.1 contrast standards across all product catalogs, badges, and checkout flows.',
    ],
    technologies: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'Responsive UI', 'Vercel', 'Git'],
    statsBadge: 'Responsive Web Tools',
  },
  {
    id: 'exp-3',
    role: 'Web & Mobile Application Developer',
    company: 'Client-Side Engineering & freeCodeCamp Journey',
    period: '2021 — 2023',
    location: 'Remote',
    type: 'Full-time',
    summary:
      'Built user-centric interfaces, performance-driven web tools, and full-stack local development environments from foundations started on freeCodeCamp in 2021.',
    achievements: [
      'Developed 20+ responsive web applications translating complex user tasks into smooth, intuitive UI designs.',
      'Managed local and database architectures using XAMPP, phpMyAdmin, LocalWP, and WordPress.',
      'Maintained automated deployment workflows using Git, GitHub, cPanel, and Vercel.',
    ],
    technologies: ['React', 'JavaScript', 'HTML5', 'CSS3', 'XAMPP', 'WordPress', 'Git'],
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
      { name: 'Tailwind CSS', level: 'Expert', experienceYears: '4+ yrs', focus: 'Zero-runtime utilities, Custom themes, Dark mode' },
    ],
  },
  {
    category: 'Performance & UI/UX',
    skills: [
      { name: 'Client-Side Web Workers', level: 'Specialist', experienceYears: '4+ yrs', focus: 'Off-thread media compression & compute' },
      { name: 'WCAG 2.1 Contrast Standards', level: 'Expert', experienceYears: '5+ yrs', focus: 'AAA Contrast, Accessible touch targets, A11y' },
      { name: 'Responsive Web Design', level: 'Mastery', experienceYears: '5+ yrs', focus: 'Mobile-first, :active micro-interactions' },
      { name: 'Chart.js & Data Viz', level: 'Expert', experienceYears: '3+ yrs', focus: 'Data-dense dark dashboards, 60fps rendering' },
    ],
  },
  {
    category: 'Database & Local Setup',
    skills: [
      { name: 'XAMPP & LocalWP', level: 'Proficient', experienceYears: '4+ yrs', focus: 'Local server environment & configuration' },
      { name: 'phpMyAdmin & MySQL', level: 'Proficient', experienceYears: '4+ yrs', focus: 'Database schema, queries, local testing' },
      { name: 'WordPress', level: 'Advanced', experienceYears: '4+ yrs', focus: 'Theme customization, CMS management' },
    ],
  },
  {
    category: 'Deployment & Tooling',
    skills: [
      { name: 'Git & GitHub', level: 'Expert', experienceYears: '5+ yrs', focus: 'Version control, Branching, CI/CD integrations' },
      { name: 'Vercel & Analytics', level: 'Expert', experienceYears: '4+ yrs', focus: 'Edge deployments, Vercel Web Analytics' },
      { name: 'cPanel & Web Hosting', level: 'Proficient', experienceYears: '4+ yrs', focus: 'DNS, SSL, FTP, Domain routing' },
    ],
  },
];

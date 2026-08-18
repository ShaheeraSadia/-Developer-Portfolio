import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Github,
  Linkedin,
  Twitter,
  Mail,
  FileDown,
  Code2,
  ExternalLink,
  ChevronRight,
  Briefcase,
  Wrench,
  FlaskConical,
  MessageSquare,
  UserCheck,
  FolderGit2
} from 'lucide-react';
import Typed from 'typed.js';
import { developerConfig } from '../data/portfolioData';
import { useToast } from './Toast';

interface HeroProps {
  onOpenResume?: () => void;
  onNavigate?: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onNavigate }) => {
  const { showToast } = useToast();
  const [emailCopied, setEmailCopied] = useState(false);
  const typedTargetRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!typedTargetRef.current) return;

    const typed = new Typed(typedTargetRef.current, {
      strings: [
        'Web Developer',
        'React Developer',
        'Frontend Specialist',
        'Mobile App Developer',
        'UI/UX Architecture Specialist',
      ],
      typeSpeed: 65,
      backSpeed: 45,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerConfig.email);
    setEmailCopied(true);
    showToast(`Copied ${developerConfig.email} to clipboard!`);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const handleSectionClick = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const sectionCards = [
    {
      id: 'about',
      num: '01',
      title: 'About Me',
      desc: '5+ years experience, background & freeCodeCamp journey.',
      icon: UserCheck,
      badge: 'Profile',
    },
    {
      id: 'services',
      num: '02',
      title: 'Services & Offerings',
      desc: 'Web apps, client-side tools, mobile UI & SaaS front-ends.',
      icon: Layers,
      badge: 'Capabilities',
    },
    {
      id: 'projects',
      num: '03',
      title: 'Featured Projects',
      desc: 'Brand Identity Generator & Toolkit Pro with live demos.',
      icon: FolderGit2,
      badge: 'Live Demos',
    },
    {
      id: 'skills',
      num: '04',
      title: 'Skills Matrix',
      desc: 'Proficiency levels across React 19, TypeScript & Tailwind.',
      icon: Wrench,
      badge: 'Tech Stack',
    },
    {
      id: 'experience',
      num: '05',
      title: 'Career Experience',
      desc: 'Milestones, client deliverables & engineering track record.',
      icon: Briefcase,
      badge: 'Timeline',
    },
    {
      id: 'component_lab',
      num: '06',
      title: 'Interactive Lab',
      desc: 'Real-time INP benchmarks, token engine & state machine.',
      icon: FlaskConical,
      badge: 'Sandbox',
    },
    {
      id: 'architecture',
      num: '07',
      title: 'Architecture & Standards',
      desc: 'Strict SLAs, mathematical accessibility & design patterns.',
      icon: Cpu,
      badge: 'Standards',
    },
    {
      id: 'contact',
      num: '08',
      title: 'Initiate Contact',
      desc: 'Dispatch inquiries for contract & full-time opportunities.',
      icon: MessageSquare,
      badge: 'Transmit',
    },
  ];

  return (
    <section
      id="hero-section"
      className="bg-[#12161f] text-white py-14 sm:py-20 relative overflow-hidden"
    >
      {/* Background Neon Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#00eeff]/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00eeff]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: High-Impact Greetings & Typed Tagline */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Terminal status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b202c] border border-[#00eeff]/30 text-xs font-mono text-[#00eeff] shadow-[0_0_12px_rgba(0,238,255,0.25)]">
              <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-pulse shadow-[0_0_6px_#00eeff]"></span>
              <span className="font-bold">INITIALIZING SYSTEM TELEMETRY</span>
              <span className="text-gray-500">//</span>
              <span className="text-gray-300">PORTFOLIO v2.5</span>
            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-mono text-gray-300">
                Hello, I'm
              </h3>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                Shaheera <span className="text-[#00eeff] text-glow-cyan">Sadia</span>
              </h1>
              
              {/* Dynamic Typed.js Role Headline */}
              <div className="flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-gray-200 pt-1">
                <span>And I'm a</span>
                <span
                  ref={typedTargetRef}
                  className="text-[#00eeff] font-extrabold border-b-2 border-[#00eeff] pb-0.5 text-glow-cyan"
                ></span>
              </div>
            </div>

            {/* Narrative Summary */}
            <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed max-w-xl">
              Front-End &amp; Mobile Developer with over 5 years of experience building fast, accessible web applications and 100% client-side utilities with React, modern JavaScript, and high-contrast responsive interfaces.
            </p>

            {/* Social Link Bar */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-mono text-gray-400 mr-1">// connect:</span>
              
              <a
                href={developerConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-full bg-[#1b202c] border border-[#2a3245] text-white flex items-center justify-center hover:text-[#00eeff] hover:border-[#00eeff] hover:shadow-[0_0_15px_#00eeff] hover:scale-110 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={developerConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-full bg-[#1b202c] border border-[#2a3245] text-white flex items-center justify-center hover:text-[#00eeff] hover:border-[#00eeff] hover:shadow-[0_0_15px_#00eeff] hover:scale-110 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={developerConfig.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X Profile"
                className="w-10 h-10 rounded-full bg-[#1b202c] border border-[#2a3245] text-white flex items-center justify-center hover:text-[#00eeff] hover:border-[#00eeff] hover:shadow-[0_0_15px_#00eeff] hover:scale-110 transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                aria-label="Copy Email"
                className="w-10 h-10 rounded-full bg-[#1b202c] border border-[#2a3245] text-white flex items-center justify-center hover:text-[#00eeff] hover:border-[#00eeff] hover:shadow-[0_0_15px_#00eeff] hover:scale-110 transition-all duration-300 cursor-pointer"
                title="Copy Email to Clipboard"
              >
                {emailCopied ? <Check className="w-4 h-4 text-[#00eeff]" /> : <Mail className="w-4 h-4" />}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenResume}
                id="hero-cv-btn"
                className="px-5 py-2.5 rounded-xl bg-[#00eeff] text-[#12161f] font-bold text-xs sm:text-sm font-mono hover:bg-[#55f3ff] hover:shadow-[0_0_20px_#00eeff] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>Download CV / Resume</span>
              </button>

              <button
                onClick={() => handleSectionClick('projects')}
                id="hero-explore-projects-btn"
                className="px-5 py-2.5 rounded-xl bg-[#1b202c] text-white font-semibold text-xs sm:text-sm font-mono border border-[#2a3245] hover:border-[#00eeff] hover:text-[#00eeff] hover:shadow-[0_0_15px_rgba(0,238,255,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleSectionClick('contact')}
                className="px-4 py-2.5 rounded-xl bg-transparent text-gray-300 hover:text-[#00eeff] text-xs sm:text-sm font-mono transition-colors cursor-pointer"
              >
                <span>Contact Me →</span>
              </button>
            </div>
          </div>

          {/* Right Column: Profile Card / Avatar */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative group">
              {/* Pulsing Outer Neon Cyan Ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#00eeff] via-[#00a8ff] to-[#00eeff] opacity-40 blur-lg group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
              
              {/* Spinning Cyan Dashed Border Ring */}
              <div className="absolute -inset-1.5 rounded-full border-2 border-dashed border-[#00eeff]/60 animate-spin" style={{ animationDuration: '24s' }}></div>

              {/* Main Avatar Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#1b202c] border-4 border-[#00eeff] shadow-[0_0_30px_rgba(0,238,255,0.4)] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#12161f] border-2 border-[#00eeff] flex items-center justify-center mb-3 text-[#00eeff] shadow-[0_0_15px_rgba(0,238,255,0.3)]">
                  <Code2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#00eeff]" />
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Shaheera Sadia
                </h3>

                <p className="text-xs sm:text-sm font-mono text-[#00eeff] font-semibold mt-1">
                  @shaheerasadia.dev
                </p>

                <div className="flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-[#12161f] border border-[#00eeff]/40 text-[11px] font-mono text-gray-200">
                  <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-pulse"></span>
                  <span>5+ Yrs Frontend Dev</span>
                </div>

                {/* Floating Corner Badges */}
                <div className="absolute top-4 right-6 px-2.5 py-1 rounded-md bg-[#12161f] border border-[#00eeff]/50 text-[10px] font-mono text-[#00eeff] shadow-sm">
                  React 19
                </div>
                <div className="absolute bottom-6 left-6 px-2.5 py-1 rounded-md bg-[#12161f] border border-[#00eeff]/50 text-[10px] font-mono text-[#00eeff] shadow-sm">
                  Tailwind CSS
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Anchored Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-[#1b202c] rounded-2xl border border-[#2a3245] mt-12 shadow-[0_0_20px_rgba(0,238,255,0.1)]">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#00eeff] font-mono block text-glow-cyan">5+ Yrs</span>
            <p className="text-xs text-gray-400 font-mono">Frontend Practice</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#00eeff] font-mono block text-glow-cyan">&lt; 50ms</span>
            <p className="text-xs text-gray-400 font-mono">Execution Latency</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono block">100%</span>
            <p className="text-xs text-gray-400 font-mono">Client-Side Privacy</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#00eeff] font-mono block text-glow-cyan">WCAG AAA</span>
            <p className="text-xs text-gray-400 font-mono">Contrast Standard</p>
          </div>
        </div>

        {/* Interactive Section Launchpad Hub */}
        <div className="mt-14 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2a3245] pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00eeff] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-pulse"></span>
                <span className="font-bold">// MODULAR_SECTION_EXPLORER</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Select a Module to <span className="text-[#00eeff] text-glow-cyan">Inspect Details</span>
              </h2>
            </div>
            <p className="text-xs font-mono text-gray-400">
              Click any module button below to open that section directly
            </p>
          </div>

          {/* 8-Card Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sectionCards.map((card) => {
              const IconComp = card.icon;
              return (
                <button
                  key={card.id}
                  id={`launchpad-btn-${card.id}`}
                  onClick={() => handleSectionClick(card.id)}
                  className="group p-5 rounded-2xl bg-[#1b202c] border border-[#2a3245] hover:border-[#00eeff] text-left transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,238,255,0.25)] hover:-translate-y-1 flex flex-col justify-between cursor-pointer space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-[#12161f] border border-[#2a3245] text-[#00eeff] group-hover:bg-[#00eeff] group-hover:text-[#12161f] group-hover:shadow-[0_0_12px_#00eeff] transition-all">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-[#00eeff] bg-[#12161f] border border-[#00eeff]/20">
                        {card.badge}
                      </span>
                    </div>

                    <div>
                      <div className="text-[11px] font-mono text-gray-400">
                        SEC.{card.num}
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#00eeff] transition-colors mt-0.5">
                        {card.title}
                      </h3>
                      <p className="text-xs text-gray-300 mt-1.5 font-sans leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#12161f] flex items-center justify-between text-xs font-mono text-[#00eeff]">
                    <span>Open Section</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

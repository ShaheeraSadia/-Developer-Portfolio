import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Sparkles,
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
  FolderGit2,
  Check,
  Cpu
} from 'lucide-react';
import Typed from 'typed.js';
import { developerConfig } from '../data/portfolioData';
import { useToast } from './Toast';

import { HeroAvatarCircle } from './HeroAvatarCircle';

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
        'UI/UX Developer',
        'React Developer',
        'Front-End Specialist',
        'Mobile App Developer',
        'Web Application Architect',
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1800,
      loop: true,
      showCursor: true,
      cursorChar: '▍',
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
      title: 'About & Journey',
      desc: '5+ years of front-end experience, background & self-taught foundation.',
      icon: UserCheck,
      badge: 'Profile',
    },
    {
      id: 'services',
      num: '02',
      title: 'Services & Capabilities',
      desc: 'Single page applications, client-side tools, mobile UI & responsive web.',
      icon: Layers,
      badge: 'Expertise',
    },
    {
      id: 'projects',
      num: '03',
      title: 'Featured Work',
      desc: 'Brand Identity Generator, Toolkit Pro & App Tool with live production demos.',
      icon: FolderGit2,
      badge: 'Production',
    },
    {
      id: 'skills',
      num: '04',
      title: 'Skills & Stack',
      desc: 'Deep proficiency across React, TypeScript, modern JavaScript & Tailwind CSS.',
      icon: Wrench,
      badge: 'Tech Matrix',
    },
    {
      id: 'experience',
      num: '05',
      title: 'Career Timeline',
      desc: 'Milestones, key deliverables, and track record across web applications.',
      icon: Briefcase,
      badge: 'Experience',
    },
    {
      id: 'component_lab',
      num: '06',
      title: 'Interactive Lab',
      desc: 'Live design token compiler, non-blocking RAF profiler & state machines.',
      icon: FlaskConical,
      badge: 'Interactive',
    },
    {
      id: 'architecture',
      num: '07',
      title: 'Engineering Principles',
      desc: 'Zero server latency, mathematical accessibility, and resilient UX standards.',
      icon: Cpu,
      badge: 'Standards',
    },
    {
      id: 'contact',
      num: '08',
      title: 'Get in Touch',
      desc: 'Send an inquiry for full-time roles, contracts, or engineering collaboration.',
      icon: MessageSquare,
      badge: 'Contact',
    },
  ];

  return (
    <section
      id="hero-section"
      className="bg-[#0a0d12] text-[#f8fafc] py-14 sm:py-20 relative overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Human Narrative & Intro Matching Image */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Telemetry Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0f172a] border border-[#3b82f6]/40 shadow-[0_0_15px_rgba(59,130,246,0.2)] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse"></span>
              <span className="text-[#3b82f6] font-bold tracking-wider uppercase text-[11px] sm:text-xs">
                INITIALIZING SYSTEM TELEMETRY
              </span>
              <span className="text-slate-600 font-mono">//</span>
              <span className="text-[#94a3b8] text-[11px] sm:text-xs font-mono">PORTFOLIO v2.5</span>
            </div>

            {/* Top Greeting */}
            <p className="font-mono text-sm sm:text-base text-slate-300 tracking-wide">
              Hello, I'm
            </p>

            {/* Main Greeting & Name with Vibrant Royal Blue Glow */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f8fafc] leading-[1.1]">
                Shaheera <span className="text-[#3b82f6] drop-shadow-[0_0_25px_rgba(59,130,246,0.85)]">Sadia</span>
              </h1>
              
              {/* Dynamic Typed.js Headline with Royal Blue Underline */}
              <div className="flex items-center gap-2.5 text-xl sm:text-2xl lg:text-3xl font-bold text-[#f8fafc] min-h-[44px]">
                <span className="text-[#f8fafc]">And I'm a</span>
                <span className="text-[#3b82f6] border-b-2 sm:border-b-[3px] border-[#3b82f6] pb-0.5 inline-block">
                  <span ref={typedTargetRef}></span>
                </span>
              </div>
            </div>

            {/* Narrative Summary */}
            <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed max-w-xl font-normal">
              Front-End &amp; Mobile Developer with over 5 years of experience building fast, accessible web applications and 100% client-side utilities with React, modern JavaScript, and high-contrast responsive interfaces.
            </p>

            {/* Connect Bar (Placed above CTA buttons as shown in design) */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs sm:text-sm font-mono text-[#94a3b8]">// connect:</span>
              
              <a
                href={developerConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-full bg-[#0f172a] border border-[#1e293b] text-[#94a3b8] hover:text-[#3b82f6] hover:border-[#3b82f6]/60 hover:bg-[#1e293b] flex items-center justify-center transition-all duration-200 shadow-sm"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={developerConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-full bg-[#0f172a] border border-[#1e293b] text-[#94a3b8] hover:text-[#3b82f6] hover:border-[#3b82f6]/60 hover:bg-[#1e293b] flex items-center justify-center transition-all duration-200 shadow-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={developerConfig.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X Profile"
                className="w-10 h-10 rounded-full bg-[#0f172a] border border-[#1e293b] text-[#94a3b8] hover:text-[#3b82f6] hover:border-[#3b82f6]/60 hover:bg-[#1e293b] flex items-center justify-center transition-all duration-200 shadow-sm"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                aria-label="Copy Email"
                className="w-10 h-10 rounded-full bg-[#0f172a] border border-[#1e293b] text-[#94a3b8] hover:text-[#3b82f6] hover:border-[#3b82f6]/60 hover:bg-[#1e293b] flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
                title={emailCopied ? 'Email Copied!' : developerConfig.email}
              >
                {emailCopied ? <Check className="w-4 h-4 text-[#22c55e]" /> : <Mail className="w-4 h-4" />}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                onClick={onOpenResume}
                id="hero-cv-btn"
                className="px-5 py-3 rounded-xl bg-[#2563eb] hover:bg-[#3b82f6] text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
              >
                <FileDown className="w-4 h-4 stroke-[2.5]" />
                <span>Download CV / Resume</span>
              </button>

              <button
                onClick={() => handleSectionClick('projects')}
                id="hero-explore-projects-btn"
                className="px-5 py-3 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-[#f8fafc] font-medium text-sm sm:text-base border border-[#1e293b] hover:border-[#3b82f6]/50 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleSectionClick('contact')}
                className="px-3 py-3 rounded-xl bg-transparent text-[#94a3b8] hover:text-[#3b82f6] font-mono text-sm sm:text-base transition-colors cursor-pointer"
              >
                <span>Contact Me →</span>
              </button>
            </div>
          </div>

          {/* Right Column: Circular Developer Identity Avatar Card */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <HeroAvatarCircle />
          </div>

        </div>

        {/* Highlight Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-[#0f172a] rounded-2xl border border-[#1e293b] mt-12">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-bold text-[#f8fafc] font-mono block">5+ Yrs</span>
            <p className="text-xs text-[#94a3b8] font-sans">Front-End Development</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-bold text-[#3b82f6] font-mono block">3</span>
            <p className="text-xs text-[#94a3b8] font-sans">Live Production Tools</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-bold text-[#f8fafc] font-mono block">100%</span>
            <p className="text-xs text-[#94a3b8] font-sans">In-Browser Privacy</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-bold text-[#22c55e] font-mono block">WCAG AA</span>
            <p className="text-xs text-[#94a3b8] font-sans">Accessible Contrast</p>
          </div>
        </div>

        {/* Section Navigation Hub */}
        <div className="mt-14 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#1e293b] pb-4">
            <div>
              <span className="text-xs font-mono text-[#3b82f6] uppercase tracking-wider block mb-1">
                Explore Portfolio
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#f8fafc] tracking-tight">
                Jump to a Section
              </h2>
            </div>
            <p className="text-xs text-[#94a3b8] font-sans">
              Select any card to navigate directly to that section
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
                  className="group p-5 rounded-2xl bg-[#0f172a] border border-[#1e293b] hover:border-slate-600 hover:bg-[#1e293b] text-left transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between cursor-pointer space-y-4 shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-[#0a0d12] border border-[#1e293b] text-[#94a3b8] group-hover:text-[#3b82f6] group-hover:border-blue-500/30 transition-colors">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-[#94a3b8] bg-[#0a0d12] border border-[#1e293b]">
                        {card.badge}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono text-slate-500 block">
                        {card.num}
                      </span>
                      <h3 className="text-base font-bold text-[#f8fafc] group-hover:text-[#3b82f6] transition-colors mt-0.5">
                        {card.title}
                      </h3>
                      <p className="text-xs text-[#94a3b8] mt-1.5 leading-relaxed font-sans">
                        {card.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between text-xs font-medium text-[#94a3b8] group-hover:text-[#3b82f6] transition-colors">
                    <span>View details</span>
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

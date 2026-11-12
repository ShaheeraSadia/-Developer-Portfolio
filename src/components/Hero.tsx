import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Sparkles,
  Layers,
  Github,
  Linkedin,
  Mail,
  FileDown,
  ExternalLink,
  ChevronRight,
  Briefcase,
  Wrench,
  UserCheck,
  Check,
  Eye
} from 'lucide-react';
import Typed from 'typed.js';
import { developerConfig } from '../data/portfolioData';
import { useToast } from './Toast';
import { ResumeDownloadButton } from './ResumeDownloadButton';
import { HeroAvatarCircle } from './HeroAvatarCircle';
import { XIcon } from './icons/XIcon';
import { useSEO } from '../hooks/useSEO';
import { sectionSEOConfig } from '../data/seoConfig';

interface HeroProps {
  onOpenResume?: () => void;
  onNavigate?: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onNavigate }) => {
  useSEO(sectionSEOConfig.home);

  const { showToast } = useToast();
  const [emailCopied, setEmailCopied] = useState(false);
  const typedTargetRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!typedTargetRef.current) return;

    const typed = new Typed(typedTargetRef.current, {
      strings: [
        'Front-End Developer',
        'React & Next.js Developer',
        'PWA & Web Worker Specialist',
        'Client-Side Performance Architect',
      ],
      typeSpeed: 55,
      backSpeed: 35,
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

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate(sectionId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-section"
      className="bg-[#0a0d12] text-[#f8fafc] py-20 sm:py-28 lg:py-32 relative overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Human Narrative & Intro */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f172a] border border-emerald-500/30 text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-emerald-400 font-semibold text-xs font-mono">
                Available for Full-Time &amp; Freelance
              </span>
              <span className="text-slate-600 font-mono">•</span>
              <span className="text-slate-400 text-xs font-mono">Remote (PKT, UTC+5)</span>
            </div>

            {/* Top Greeting */}
            <p className="font-mono text-sm sm:text-base text-white tracking-wide">
              Hello, I'm
            </p>

            {/* Main Greeting & Name */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                Shaheera <span className="text-blue-500">Sadia</span>
              </h1>
              
              {/* Dynamic Typed.js Headline with Royal Blue Underline */}
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-2.5 text-xl sm:text-2xl lg:text-3xl font-bold text-white min-h-[44px]">
                <span className="text-white shrink-0 font-bold">And I'm a</span>
                <span className="text-blue-400 border-b-2 sm:border-b-[3px] border-blue-500 pb-0.5 inline-block font-bold">
                  <span ref={typedTargetRef}></span>
                </span>
              </div>
            </div>

            {/* Narrative Summary */}
            <p className="text-sm sm:text-base text-white leading-relaxed max-w-xl font-normal">
              Front-End Developer specializing in React, Next.js, modern JavaScript (ES6+), Vite, and high-performance client-side architectures with Progressive Web Apps (PWAs) and off-thread Web Workers.
            </p>

            {/* Connect Bar */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs sm:text-sm font-mono text-white">// connect:</span>
              
              <a
                href={developerConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-full bg-[#0f172a] border border-[#1e293b] text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-[#1e293b] flex items-center justify-center transition-all duration-200 shadow-sm"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={developerConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-full bg-[#0f172a] border border-[#1e293b] text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-[#1e293b] flex items-center justify-center transition-all duration-200 shadow-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={developerConfig.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X Profile"
                className="w-10 h-10 rounded-full bg-[#0f172a] border border-[#1e293b] text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-[#1e293b] flex items-center justify-center transition-all duration-200 shadow-sm"
                title="X (Twitter)"
              >
                <XIcon className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                aria-label="Copy Email"
                className="w-10 h-10 rounded-full bg-[#0f172a] border border-[#1e293b] text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-[#1e293b] flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
                title={emailCopied ? 'Email Copied!' : developerConfig.email}
              >
                {emailCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4" />}
              </button>
            </div>

            {/* Action Buttons - Clean, responsive on all screens, never-wrapping */}
            <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 w-full">
              {/* Primary Action: Hire Me / Contact */}
              <button
                onClick={() => scrollToSection('contact')}
                id="hero-contact-primary-btn"
                className="h-12 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 active:scale-[0.98] text-white font-semibold text-sm transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 hover:shadow-lg hover:shadow-blue-500/40 cursor-pointer whitespace-nowrap shrink-0 group w-full sm:w-auto"
              >
                <Mail className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                <span className="whitespace-nowrap">Hire Me / Contact</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Secondary Action: Explore Projects */}
              <button
                onClick={() => scrollToSection('projects')}
                id="hero-explore-projects-btn"
                className="h-12 px-5 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] active:scale-[0.98] text-white font-medium text-sm border border-[#1e293b] hover:border-slate-500 transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm whitespace-nowrap shrink-0 group w-full sm:w-auto"
              >
                <span className="whitespace-nowrap">Explore Projects</span>
                <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Action: Download Resume */}
              <div className="w-full sm:w-auto shrink-0">
                <ResumeDownloadButton
                  variant="hero"
                  onOpenModal={onOpenResume}
                  showPreviewOption={true}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>

            {/* GitHub Activity Quick Jump Link */}
            <div className="pt-1">
              <button
                onClick={() => scrollToSection('github-activity-stream')}
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-blue-400 transition-colors cursor-pointer group"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <Github className="w-3.5 h-3.5 text-blue-400" />
                <span>Live GitHub Activity Stream &amp; Heatmap</span>
                <span className="text-blue-400 group-hover:translate-x-0.5 transition-transform">↓</span>
              </button>
            </div>
          </div>

          {/* Right Column: Circular Developer Identity Avatar Card */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <HeroAvatarCircle />
          </div>

        </div>

        {/* Highlight Metrics Strip with Generous Padding & Margin */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-7 bg-[#0f172a] rounded-3xl border border-[#1e293b] mt-16 sm:mt-20 shadow-lg shadow-black/20">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-bold text-white font-mono block">Since 2021</span>
            <p className="text-xs text-slate-300 font-sans font-medium">Web Applications</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-bold text-blue-400 font-mono block">4</span>
            <p className="text-xs text-slate-300 font-sans font-medium">Production Tools</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-bold text-white font-mono block">100%</span>
            <p className="text-xs text-slate-300 font-sans font-medium">Client Privacy</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono block">WCAG AA</span>
            <p className="text-xs text-slate-300 font-sans font-medium">Accessible Contrast</p>
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
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
  ArrowUpRight,
  Code2,
} from 'lucide-react';
import { developerConfig } from '../data/portfolioData';
import { useToast } from './Toast';

export const Hero: React.FC = () => {
  const { showToast } = useToast();
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'principles'>('config');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerConfig.email);
    setEmailCopied(true);
    showToast(`Copied ${developerConfig.email} to clipboard!`);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  return (
    <section
      id="hero-section"
      className="bg-[#FAFAF8] text-[#14151A] pt-20 pb-28 md:pt-28 md:pb-36 border-b border-[#E7E6E2]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Greeting & Statement with Generous Breathing Room */}
        <div className="space-y-6 max-w-4xl">
          {/* Status Badge with Bright Emerald Green Dot */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#F4F3EF] border border-[#E7E6E2] text-xs font-mono text-[#64666E]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1FAA6E] shadow-[0_0_8px_rgba(31,170,110,0.5)] animate-pulse-subtle"></span>
            <span className="text-[#14151A] font-semibold">available_for_opportunities</span>
            <span className="text-[#9E9EA7]">•</span>
            <span className="font-mono">web_and_mobile_developer</span>
          </div>

          {/* Massive, High-Impact Headline with Electric Cobalt Accent */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#14151A] leading-[1.08]">
            I build clear,{' '}
            <span className="text-[#2F5CFF] underline decoration-[#2F5CFF]/20 decoration-wavy underline-offset-8">
              high-performance
            </span>{' '}
            web applications centered on real user needs.
          </h1>

          {/* Clear, Legible Body Copy (Inter font-sans text-base sm:text-lg) */}
          <p className="text-base sm:text-lg text-[#555761] leading-relaxed max-w-3xl font-sans pt-1">
            <strong className="text-[#14151A] font-semibold">Shaheera Sadia</strong> — Web &amp; Mobile
            Application Developer specializing in React, JavaScript (ES6+), and responsive client-side architectures.
            Translating complex user workflows into fast, accessible tools with zero-jank execution.
          </p>
        </div>

        {/* The Metadata-Motif Developer Config Card (Signature Element) */}
        <div
          id="hero-config-card"
          className="mt-12 rounded-xl border border-[#E7E6E2] bg-[#F4F3EF] overflow-hidden shadow-2xs"
        >
          {/* Card Top Title Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#E7E6E2] bg-[#EAE8E2]/80">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D5D4CE] inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D5D4CE] inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D5D4CE] inline-block"></span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#14151A] pl-2.5 border-l border-[#D5D4CE]">
                <Terminal className="w-3.5 h-3.5 text-[#2F5CFF]" />
                <span>developer.config.json</span>
              </div>
            </div>

            {/* Tab switchers */}
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <button
                id="hero-tab-config-btn"
                onClick={() => setActiveTab('config')}
                className={`px-3 py-1 rounded-md transition-colors font-medium ${
                  activeTab === 'config'
                    ? 'bg-[#14151A] text-white shadow-2xs'
                    : 'text-[#64666E] hover:text-[#14151A] hover:bg-[#D5D4CE]/50'
                }`}
              >
                // profile_manifest
              </button>
              <button
                id="hero-tab-principles-btn"
                onClick={() => setActiveTab('principles')}
                className={`px-3 py-1 rounded-md transition-colors font-medium ${
                  activeTab === 'principles'
                    ? 'bg-[#14151A] text-white shadow-2xs'
                    : 'text-[#64666E] hover:text-[#14151A] hover:bg-[#D5D4CE]/50'
                }`}
              >
                // performance_slas
              </button>
            </div>
          </div>

          {/* Card Body with Key-Value Motif (JetBrains Mono text-sm) */}
          <div className="p-5 sm:p-7 font-mono text-xs sm:text-sm">
            {activeTab === 'config' ? (
              <div className="space-y-3 text-[#14151A]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-1.5 py-1.5 border-b border-[#E7E6E2]">
                  <span className="md:col-span-3 text-[#64666E] font-medium">role:</span>
                  <span className="md:col-span-9 font-semibold text-[#14151A]">
                    &quot;{developerConfig.name}&quot; ({developerConfig.level})
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-1.5 py-1.5 border-b border-[#E7E6E2]">
                  <span className="md:col-span-3 text-[#64666E] font-medium">core_stack:</span>
                  <div className="md:col-span-9 flex flex-wrap gap-1.5">
                    {developerConfig.coreStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md bg-white border border-[#D5D4CE] text-[#14151A] text-xs font-semibold shadow-2xs"
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-1.5 py-1.5 border-b border-[#E7E6E2]">
                  <span className="md:col-span-3 text-[#64666E] font-medium">status:</span>
                  <span className="md:col-span-9 flex items-center gap-2 text-[#1FAA6E] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#1FAA6E] shadow-[0_0_6px_rgba(31,170,110,0.6)]"></span>
                    &quot;{developerConfig.status}&quot;
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-1.5 py-1.5">
                  <span className="md:col-span-3 text-[#64666E] font-medium">key_focus:</span>
                  <span className="md:col-span-9 text-[#2F5CFF] font-semibold">
                    [&quot;100% Client-Side Compute&quot;, &quot;Web Workers&quot;, &quot;WCAG 2.1 AAA Contrast&quot;, &quot;Zero-Jank Dashboards&quot;]
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-[#14151A]">
                <p className="text-xs text-[#64666E] font-sans">
                  Core front-end engineering commitments and performance guarantees:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="p-3.5 bg-white rounded-lg border border-[#E7E6E2] space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-[#2F5CFF] font-bold text-xs font-mono">
                      <Zap className="w-4 h-4 text-[#2F5CFF]" />
                      <span>Zero Server Latency</span>
                    </div>
                    <p className="text-xs text-[#555761] font-sans leading-relaxed">
                      100% client-side computing using Web Workers to deliver instant sub-second responses.
                    </p>
                  </div>

                  <div className="p-3.5 bg-white rounded-lg border border-[#E7E6E2] space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-[#1FAA6E] font-bold text-xs font-mono">
                      <ShieldCheck className="w-4 h-4 text-[#1FAA6E]" />
                      <span>WCAG 2.1 AAA Contrast</span>
                    </div>
                    <p className="text-xs text-[#555761] font-sans leading-relaxed">
                      Rigorously tested contrast ratios for effortless legibility across light and dark surfaces.
                    </p>
                  </div>

                  <div className="p-3.5 bg-white rounded-lg border border-[#E7E6E2] space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-[#14151A] font-bold text-xs font-mono">
                      <Layers className="w-4 h-4 text-[#14151A]" />
                      <span>Snappy :active Touch</span>
                    </div>
                    <p className="text-xs text-[#555761] font-sans leading-relaxed">
                      Responsive touch-friendly targets with instant tactile feedback on all mobile viewports.
                    </p>
                  </div>

                  <div className="p-3.5 bg-white rounded-lg border border-[#E7E6E2] space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-[#2F5CFF] font-bold text-xs font-mono">
                      <Cpu className="w-4 h-4 text-[#2F5CFF]" />
                      <span>Zero-Jank 60 FPS</span>
                    </div>
                    <p className="text-xs text-[#555761] font-sans leading-relaxed">
                      Optimized React lifecycle patterns eliminating unnecessary component re-renders.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Action CTAs & Email Copy (Cobalt Blue Primary Button & Clean Icons) */}
        <div className="mt-10 flex flex-wrap items-center gap-3.5">
          <a
            href="#projects"
            id="hero-explore-projects-btn"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#2F5CFF] text-white text-xs sm:text-sm font-mono font-bold hover:bg-[#254BD8] transition-colors shadow-sm group"
          >
            <span>explore_featured_projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            id="hero-copy-email-btn"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-[#D5D4CE] text-[#14151A] text-xs sm:text-sm font-mono font-semibold hover:bg-[#F4F3EF] hover:border-[#14151A] transition-colors shadow-2xs"
          >
            {emailCopied ? (
              <>
                <Check className="w-4 h-4 text-[#1FAA6E]" />
                <span className="text-[#1FAA6E]">email_copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#64666E]" />
                <span>copy_email</span>
              </>
            )}
          </button>

          <a
            href="#about"
            id="hero-about-link-btn"
            className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-lg text-xs sm:text-sm font-mono text-[#64666E] hover:text-[#2F5CFF] transition-colors font-medium"
          >
            <span>read_background (~/about)</span>
          </a>

          <a
            href="#component-lab"
            id="hero-open-lab-btn"
            className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-lg text-xs sm:text-sm font-mono text-[#64666E] hover:text-[#2F5CFF] transition-colors font-medium"
          >
            <Sparkles className="w-4 h-4 text-[#2F5CFF]" />
            <span>launch_component_lab (~/lab)</span>
          </a>
        </div>

        {/* Quantitative Proof Strip */}
        <div className="mt-14 pt-10 border-t border-[#E7E6E2] grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#14151A]">5+ Yrs</div>
            <div className="text-xs text-[#64666E] font-mono">front_end_experience</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#2F5CFF]">100%</div>
            <div className="text-xs text-[#64666E] font-mono">client_side_privacy</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#14151A]">60 FPS</div>
            <div className="text-xs text-[#64666E] font-mono">dashboard_smoothness</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#1FAA6E]">WCAG 2.1</div>
            <div className="text-xs text-[#64666E] font-mono">aaa_contrast_standards</div>
          </div>
        </div>
      </div>
    </section>
  );
};

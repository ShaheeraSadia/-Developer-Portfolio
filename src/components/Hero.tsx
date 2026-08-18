import React, { useState } from 'react';
import { Terminal, Copy, Check, ArrowRight, Sparkles, Cpu, Layers, ShieldCheck, Zap } from 'lucide-react';
import { developerConfig, aboutMeData } from '../data/portfolioData';
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
    <section id="hero-section" className="pt-8 pb-16 border-b border-[#E7E6E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Greeting & Statement */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F4F3EF] border border-[#E7E6E2] text-xs font-mono text-[#64666E]">
            <span className="w-2 h-2 rounded-full bg-[#1FAA6E] animate-pulse-subtle"></span>
            <span className="text-[#14151A] font-medium">available_for_opportunities</span>
            <span className="text-[#9E9EA7]">•</span>
            <span>web_and_mobile_developer</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#14151A] leading-[1.15]">
            I build clear, <span className="text-[#2F5CFF]">high-performance</span> web applications centered on real user needs.
          </h1>

          <p className="text-base sm:text-lg text-[#555761] leading-relaxed max-w-3xl font-sans">
            <strong className="text-[#14151A] font-medium">Shaheera Sadia</strong> — Web &amp; Mobile Application Developer specializing in React, JavaScript, and responsive client-side architectures. Building fast, accessible tools with zero-jank performance.
          </p>
        </div>

        {/* The Metadata-Motif Developer Config Card (Signature Element) */}
        <div
          id="hero-config-card"
          className="mt-8 rounded-xl border border-[#E7E6E2] bg-[#F4F3EF]/60 backdrop-blur-xs overflow-hidden shadow-xs"
        >
          {/* Card Top Title Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#E7E6E2] bg-[#EAE8E2]/70">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D5D4CE] inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D5D4CE] inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D5D4CE] inline-block"></span>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono font-medium text-[#14151A] pl-2 border-l border-[#D5D4CE]">
                <Terminal className="w-3.5 h-3.5 text-[#2F5CFF]" />
                <span>developer.config.json</span>
              </div>
            </div>

            {/* Tab switchers */}
            <div className="flex items-center gap-1 text-xs font-mono">
              <button
                id="hero-tab-config-btn"
                onClick={() => setActiveTab('config')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeTab === 'config'
                    ? 'bg-[#14151A] text-white'
                    : 'text-[#64666E] hover:text-[#14151A] hover:bg-[#E2E0D8]'
                }`}
              >
                // profile_manifest
              </button>
              <button
                id="hero-tab-principles-btn"
                onClick={() => setActiveTab('principles')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeTab === 'principles'
                    ? 'bg-[#14151A] text-white'
                    : 'text-[#64666E] hover:text-[#14151A] hover:bg-[#E2E0D8]'
                }`}
              >
                // performance_slas
              </button>
            </div>
          </div>

          {/* Card Body with Key-Value Motif */}
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm">
            {activeTab === 'config' ? (
              <div className="space-y-2 text-[#14151A]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-1 py-1 border-b border-[#E7E6E2]/60">
                  <span className="md:col-span-3 text-[#64666E]">developer:</span>
                  <span className="md:col-span-9 font-medium text-[#14151A]">
                    &quot;{developerConfig.name}&quot; ({developerConfig.level})
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-1 py-1 border-b border-[#E7E6E2]/60">
                  <span className="md:col-span-3 text-[#64666E]">specialization:</span>
                  <span className="md:col-span-9 font-medium text-[#14151A]">
                    &quot;React, JavaScript (ES6+), Responsive Web &amp; Client-Side Architectures&quot;
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-1 py-1 border-b border-[#E7E6E2]/60">
                  <span className="md:col-span-3 text-[#64666E]">status:</span>
                  <span className="md:col-span-9 flex items-center gap-1.5 text-[#1FAA6E] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1FAA6E]"></span>
                    &quot;{developerConfig.status}&quot;
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-1 py-1 border-b border-[#E7E6E2]/60">
                  <span className="md:col-span-3 text-[#64666E]">core_stack:</span>
                  <div className="md:col-span-9 flex flex-wrap gap-1.5">
                    {developerConfig.coreStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white border border-[#D5D4CE] text-[#14151A] text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-1 py-1">
                  <span className="md:col-span-3 text-[#64666E]">key_focus:</span>
                  <span className="md:col-span-9 text-[#2F5CFF] font-medium">
                    [&quot;100% Client-Side Compute&quot;, &quot;Web Workers&quot;, &quot;WCAG 2.1 AAA Contrast&quot;, &quot;Zero-Jank Dashboards&quot;]
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-[#14151A]">
                <p className="text-xs text-[#64666E] font-sans">
                  Core front-end engineering commitments and performance guarantees:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-white rounded border border-[#E7E6E2] space-y-1">
                    <div className="flex items-center gap-1.5 text-[#2F5CFF] font-semibold text-xs">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Zero Server Latency</span>
                    </div>
                    <p className="text-[11px] text-[#64666E] font-sans">
                      100% client-side computing using Web Workers to deliver instant sub-second responses.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded border border-[#E7E6E2] space-y-1">
                    <div className="flex items-center gap-1.5 text-[#1FAA6E] font-semibold text-xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>WCAG 2.1 AAA Contrast</span>
                    </div>
                    <p className="text-[11px] text-[#64666E] font-sans">
                      Rigorously tested contrast ratios for effortless legibility across light and dark modes.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded border border-[#E7E6E2] space-y-1">
                    <div className="flex items-center gap-1.5 text-[#14151A] font-semibold text-xs">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Snappy :active Touch</span>
                    </div>
                    <p className="text-[11px] text-[#64666E] font-sans">
                      Responsive touch-friendly targets with instant tactile feedback on mobile viewports.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded border border-[#E7E6E2] space-y-1">
                    <div className="flex items-center gap-1.5 text-[#2F5CFF] font-semibold text-xs">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Zero-Jank 60 FPS</span>
                    </div>
                    <p className="text-[11px] text-[#64666E] font-sans">
                      Optimized React lifecycle patterns eliminating unnecessary component re-renders.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Action CTAs & Email Copy */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            id="hero-explore-projects-btn"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#14151A] text-white text-xs sm:text-sm font-mono font-medium hover:bg-[#2F5CFF] transition-colors shadow-xs group"
          >
            <span>explore_featured_projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <button
            id="hero-copy-email-btn"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#D5D4CE] text-[#14151A] text-xs sm:text-sm font-mono font-medium hover:bg-[#F4F3EF] hover:border-[#14151A] transition-colors shadow-xs"
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
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-mono text-[#64666E] hover:text-[#2F5CFF] transition-colors"
          >
            <span>read_background (~/about)</span>
          </a>

          <a
            href="#component-lab"
            id="hero-open-lab-btn"
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-mono text-[#64666E] hover:text-[#2F5CFF] transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#2F5CFF]" />
            <span>launch_component_lab (~/lab)</span>
          </a>
        </div>

        {/* Quantitative Proof Strip */}
        <div className="mt-12 pt-8 border-t border-[#E7E6E2] grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="space-y-0.5">
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#14151A]">5+ Yrs</div>
            <div className="text-xs text-[#64666E] font-mono">front_end_experience</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#2F5CFF]">100%</div>
            <div className="text-xs text-[#64666E] font-mono">client_side_privacy</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#14151A]">60 FPS</div>
            <div className="text-xs text-[#64666E] font-mono">dashboard_smoothness</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#1FAA6E]">WCAG 2.1</div>
            <div className="text-xs text-[#64666E] font-mono">aaa_contrast_standards</div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Terminal, CheckCircle2, ShieldCheck, Zap, Layers, Sparkles, Award, ArrowUpRight } from 'lucide-react';
import { aboutMeData, developerConfig } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#12161f] text-white border-b border-[#2a3245]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#2a3245]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00eeff] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-pulse"></span>
              <span className="font-bold">01. ABOUT ME</span>
              <span className="text-gray-500">//</span>
              <span>ENGINEERING JOURNEY &amp; PHILOSOPHY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Building Web Apps with <span className="text-[#00eeff] text-glow-cyan">Speed, Clarity &amp; Precision</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-gray-400">
            <span>location:</span>
            <span className="text-[#00eeff] font-semibold">{developerConfig.location} ({developerConfig.timezone})</span>
          </div>
        </div>

        {/* Two-Column Grid: Bio & Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Full Biography Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#1b202c] p-7 rounded-2xl border border-[#2a3245] hover:border-[#00eeff]/50 transition-all space-y-4 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              <span className="text-xs font-mono text-[#00eeff] uppercase tracking-wider font-bold block">
                // developer_profile.overview
              </span>

              <h3 className="text-xl font-bold text-white leading-snug">
                {aboutMeData.headline}
              </h3>

              <div className="space-y-3.5 text-sm text-gray-300 font-sans leading-relaxed">
                <p>
                  I am a <strong className="text-white font-semibold">Web &amp; Mobile Application Developer</strong> with over 5 years of hands-on experience building user-centric interfaces, performance-driven web tools, and responsive digital products.
                </p>
                <p>
                  My engineering journey began on freeCodeCamp in 2021, and since then I have specialized in <strong className="text-white font-semibold">React</strong>, <strong className="text-white font-semibold">JavaScript (ES6+)</strong>, and <strong className="text-white font-semibold">Tailwind CSS</strong>. I focus heavily on client-side browser capabilities—such as <strong className="text-[#00eeff]">Web Workers</strong> and in-browser state algorithms—to create lightning-fast utilities with zero server latency and radical user privacy.
                </p>
              </div>

              {/* Core Tenets Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-[#12161f]">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#00eeff] shrink-0" />
                  <span>100% Client-Side Computing</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#00eeff] shrink-0" />
                  <span>WCAG 2.1 AAA Accessibility</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#00eeff] shrink-0" />
                  <span>Zero-Jank 60 FPS Layouts</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#00eeff] shrink-0" />
                  <span>Sub-Second Response SLAs</span>
                </div>
              </div>
            </div>

            {/* Quick Experience Stats Card */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#1b202c] p-4 rounded-xl border border-[#2a3245] text-center space-y-1">
                <span className="text-2xl font-extrabold font-mono text-[#00eeff] block text-glow-cyan">5+</span>
                <span className="text-[11px] text-gray-400 font-mono block">Years Dev</span>
              </div>
              <div className="bg-[#1b202c] p-4 rounded-xl border border-[#2a3245] text-center space-y-1">
                <span className="text-2xl font-extrabold font-mono text-[#00eeff] block text-glow-cyan">3+</span>
                <span className="text-[11px] text-gray-400 font-mono block">Live SaaS Tools</span>
              </div>
              <div className="bg-[#1b202c] p-4 rounded-xl border border-[#2a3245] text-center space-y-1">
                <span className="text-2xl font-extrabold font-mono text-[#00eeff] block text-glow-cyan">100%</span>
                <span className="text-[11px] text-gray-400 font-mono block">Browser Privacy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Career Milestones Timeline */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#1b202c] p-6 sm:p-7 rounded-2xl border border-[#2a3245] space-y-4 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between border-b border-[#12161f] pb-3">
                <span className="text-xs font-mono text-[#00eeff] uppercase tracking-wider font-bold">
                  // career_milestones.log
                </span>
                <span className="text-[11px] font-mono text-gray-400">2021 — 2026</span>
              </div>

              <div className="space-y-4 pt-1">
                {aboutMeData.milestones.map((m, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-[#00eeff]/40 space-y-1 group">
                    <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#12161f] border-2 border-[#00eeff] group-hover:bg-[#00eeff] group-hover:shadow-[0_0_8px_#00eeff] transition-all"></span>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#00eeff] transition-colors">
                        {m.title}
                      </h4>
                      <span className="text-[11px] font-mono text-[#00eeff] font-semibold bg-[#12161f] px-2 py-0.5 rounded border border-[#00eeff]/20">
                        {m.year}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 font-sans leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { User, Sparkles, Shield, Cpu, Zap, Code, Terminal, CheckCircle2, Award, ArrowUpRight } from 'lucide-react';
import { developerConfig, aboutMeData } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 border-b border-[#E7E6E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E7E6E2]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#64666E] uppercase tracking-wider mb-2">
              <span className="text-[#2F5CFF]">01.</span>
              <span>ABOUT_DEVELOPER</span>
              <span className="text-[#9E9EA7]">//</span>
              <span>BACKGROUND_&amp;_SPECIALIZATION</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#14151A]">
              Crafting fast, user-centric web &amp; mobile tools.
            </h2>
          </div>
          <p className="text-sm text-[#64666E] max-w-md font-sans">
            5+ years of translating complex user workflows into intuitive, zero-jank client-side applications.
          </p>
        </div>

        {/* About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Main Narrative (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-xl border border-[#E7E6E2] bg-white space-y-5 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-mono text-[#2F5CFF] font-semibold border-b border-[#E7E6E2] pb-3">
                <Terminal className="w-4 h-4" />
                <span>// developer_statement.md</span>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#34353E] font-sans leading-relaxed">
                <p>
                  I am a <strong className="text-[#14151A] font-semibold">Front-End Developer with over 5 years of experience</strong> building user-centric interfaces, performance-driven web tools, and responsive mobile/web applications. My journey started on <span className="font-medium text-[#14151A] bg-[#F4F3EF] px-2 py-0.5 rounded border border-[#E7E6E2]">freeCodeCamp in 2021</span>, and since then, I&apos;ve focused heavily on translating complex user tasks into smooth, intuitive UI designs.
                </p>

                <p>
                  I specialize in <strong className="text-[#14151A] font-semibold">React, JavaScript (ES6+), and modern CSS architectures</strong>, with a strong emphasis on client-side browser capabilities (<strong className="text-[#2F5CFF] font-semibold">WebAssembly &amp; Web Workers</strong>) to build lightning-fast web utilities that require zero server latency and guarantee total user privacy.
                </p>
              </div>

              {/* Core Pillars Pills */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                <div className="p-3 bg-[#F4F3EF] rounded-lg border border-[#E7E6E2] flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#2F5CFF] shrink-0" />
                  <span className="text-[#14151A] font-medium">100% Client-Side Compute</span>
                </div>
                <div className="p-3 bg-[#F4F3EF] rounded-lg border border-[#E7E6E2] flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#1FAA6E] shrink-0" />
                  <span className="text-[#14151A] font-medium">Guaranteed User Privacy</span>
                </div>
                <div className="p-3 bg-[#F4F3EF] rounded-lg border border-[#E7E6E2] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#2F5CFF] shrink-0" />
                  <span className="text-[#14151A] font-medium">WCAG 2.1 AAA Contrast</span>
                </div>
                <div className="p-3 bg-[#F4F3EF] rounded-lg border border-[#E7E6E2] flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#14151A] shrink-0" />
                  <span className="text-[#14151A] font-medium">Zero-Jank Web Workers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chronological Milestones (Right) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-xl border border-[#E7E6E2] bg-white space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#E7E6E2] pb-3">
                <span className="text-xs font-mono uppercase font-bold text-[#14151A]">
                  // career_timeline_milestones
                </span>
                <span className="text-[11px] font-mono text-[#64666E]">2021 — 2026</span>
              </div>

              <div className="space-y-4">
                {aboutMeData.milestones.map((m, idx) => (
                  <div key={idx} className="relative pl-6 pb-2 last:pb-0 group">
                    {/* Vertical Connecting Line */}
                    {idx !== aboutMeData.milestones.length - 1 && (
                      <span className="absolute left-2.5 top-3 bottom-0 w-px bg-[#E7E6E2]" />
                    )}
                    {/* Bullet Indicator */}
                    <span className="absolute left-1.5 top-1.5 w-2 h-2 rounded-full bg-[#2F5CFF] ring-4 ring-white" />

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#14151A]">
                          {m.title}
                        </span>
                        <span className="text-[11px] font-mono text-[#2F5CFF] px-1.5 py-0.2 rounded bg-[#F4F3EF] border border-[#E7E6E2]">
                          {m.year}
                        </span>
                      </div>
                      <p className="text-xs text-[#555761] font-sans leading-relaxed">
                        {m.description}
                      </p>
                    </div>
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

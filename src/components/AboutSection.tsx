import React from 'react';
import { CheckCircle2, Award, ArrowUpRight, Sparkles, Code2, HeartHandshake, ShieldCheck, Zap, GraduationCap } from 'lucide-react';
import { aboutMeData, developerConfig, educationCertificationsData } from '../data/portfolioData';
import { useSEO } from '../hooks/useSEO';
import { sectionSEOConfig } from '../data/seoConfig';
import { ResumeDownloadButton } from './ResumeDownloadButton';

export const AboutSection: React.FC = () => {
  useSEO(sectionSEOConfig.about);

  return (
    <section id="about" className="py-20 bg-[#0a0d12] text-[#f8fafc] border-b border-[#1e293b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#1e293b]">
          <div className="space-y-1">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
              Background &amp; Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              About Me
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
            <span>Location:</span>
            <span className="text-white font-medium">{developerConfig.location} ({developerConfig.timezone})</span>
          </div>
        </div>

        {/* Two-Column Grid: Bio & Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Full Biography Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0f172a] p-7 rounded-2xl border border-[#1e293b] space-y-4 shadow-sm">
              <h3 className="text-xl font-bold text-white leading-snug">
                {aboutMeData.headline}
              </h3>

              <div className="space-y-3.5 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                <p>
                  I am a <strong className="text-white font-semibold">Web &amp; Mobile Application Developer</strong> with over 5 years of hands-on experience building user-centric interfaces, performance-driven web tools, and responsive digital products.
                </p>
                <p>
                  My engineering journey began on freeCodeCamp in 2021, and since then I have specialized in <strong className="text-white font-semibold">React</strong>, <strong className="text-white font-semibold">JavaScript (ES6+)</strong>, and <strong className="text-white font-semibold">Tailwind CSS</strong>. I focus heavily on client-side browser capabilities—such as <strong className="text-blue-400 font-medium">Web Workers</strong> and in-browser state algorithms—to create fast web utilities that require zero server latency and guarantee total user privacy.
                </p>
              </div>

              {/* Core Tenets Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#1e293b]">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>100% Client-Side Compute</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>WCAG 2.1 AA Accessibility</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Fluid 60 FPS User Interfaces</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Predictable &amp; Type-Safe State</span>
                </div>
              </div>
            </div>

            {/* Quick Experience Stats Card */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#0f172a] p-4 rounded-xl border border-[#1e293b] text-center space-y-1">
                <span className="text-2xl font-bold font-mono text-white block">5+</span>
                <span className="text-xs text-slate-300 block font-medium">Years Experience</span>
              </div>
              <div className="bg-[#0f172a] p-4 rounded-xl border border-[#1e293b] text-center space-y-1">
                <span className="text-2xl font-bold font-mono text-blue-400 block">3</span>
                <span className="text-xs text-slate-300 block font-medium">Live Web Tools</span>
              </div>
              <div className="bg-[#0f172a] p-4 rounded-xl border border-[#1e293b] text-center space-y-1">
                <span className="text-2xl font-bold font-mono text-emerald-400 block">100%</span>
                <span className="text-xs text-slate-300 block font-medium">Client Privacy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Career Milestones Timeline */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0f172a] p-6 sm:p-7 rounded-2xl border border-[#1e293b] space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
                <h4 className="text-sm font-semibold text-white">
                  Milestones &amp; Progression
                </h4>
                <span className="text-xs font-mono text-slate-300">2021 — Present</span>
              </div>

              <div className="space-y-4 pt-1">
                {aboutMeData.milestones.map((m, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-slate-700 space-y-1 group">
                    <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-500 group-hover:bg-blue-400 transition-colors"></span>
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                        {m.title}
                      </h5>
                      <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        {m.year}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Education & Certifications Showcase */}
        <div className="mt-12 pt-10 border-t border-[#1e293b] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider font-bold">
                <GraduationCap className="w-4 h-4" />
                <span>Accredited Credentials</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Education &amp; Certifications
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="hidden md:inline text-xs font-mono text-slate-300">
                600+ Coursework Hours
              </span>
              <ResumeDownloadButton variant="outline" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {educationCertificationsData.map((cert) => (
              <div
                key={cert.id}
                className="bg-[#0f172a] p-5 rounded-2xl border border-[#1e293b] hover:border-slate-600 transition-all space-y-3 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {cert.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Issued: {cert.issuedDate}</span>
                  {cert.hours && (
                    <span className="text-blue-400 font-medium">{cert.hours}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

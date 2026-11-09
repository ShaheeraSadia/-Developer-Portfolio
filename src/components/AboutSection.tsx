import React from 'react';
import { 
  CheckCircle2, 
  Award, 
  ArrowUpRight, 
  Sparkles, 
  Code2, 
  HeartHandshake, 
  ShieldCheck, 
  Zap, 
  GraduationCap, 
  ExternalLink,
  MapPin,
  Clock,
  Compass,
  UserCheck
} from 'lucide-react';
import { aboutMeData, developerConfig, educationCertificationsData } from '../data/portfolioData';
import { useSEO } from '../hooks/useSEO';
import { sectionSEOConfig } from '../data/seoConfig';
import { ResumeDownloadButton } from './ResumeDownloadButton';
import { PerformanceAuditProof } from './PerformanceAuditProof';

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
            <span className="text-white font-medium">{developerConfig.location}</span>
          </div>
        </div>

        {/* Explicit Profile Snapshot Card (Who, Where, Looking For, Availability) - Full-Width Header */}
        <div className="bg-[#0f172a] p-6 sm:p-7 rounded-2xl border border-blue-500/30 space-y-4 shadow-sm relative overflow-hidden mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1e293b] pb-3.5">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/50 p-0.5 bg-[#0a0d12] shadow-sm">
                  <img
                    src="/assets/aistudio/OIP_3c866659.jpg"
                    alt="Shaheera Sadia - Front-End Developer"
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0f172a]" title="Online / Available" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                  Shaheera Sadia
                </h3>
                <span className="text-[11px] font-mono text-blue-400">
                  Front-End Developer
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Opportunities</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 text-xs sm:text-sm font-sans pt-1">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <span className="font-mono text-xs text-blue-400 font-semibold shrink-0 sm:w-28">
                Who I Am:
              </span>
              <p className="text-white leading-relaxed">
                {aboutMeData.whoIAm}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <span className="font-mono text-xs text-blue-400 font-semibold shrink-0 sm:w-28">
                Where Based:
              </span>
              <p className="text-white leading-relaxed">
                {aboutMeData.whereBased}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <span className="font-mono text-xs text-emerald-400 font-semibold shrink-0 sm:w-28">
                Looking For:
              </span>
              <p className="text-white leading-relaxed">
                {aboutMeData.lookingFor}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <span className="font-mono text-xs text-emerald-400 font-semibold shrink-0 sm:w-28">
                Availability:
              </span>
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>{aboutMeData.availability}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Narrative Bio & Career Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Full Biography Narrative & Stats */}
          <div className="lg:col-span-7 space-y-6">
            {/* Narrative Bio */}
            <div className="bg-[#0f172a] p-7 rounded-2xl border border-[#1e293b] space-y-4 shadow-sm">
              <h3 className="text-xl font-bold text-white leading-snug">
                {aboutMeData.headline}
              </h3>

              <div className="space-y-3.5 text-sm sm:text-base text-white font-sans leading-relaxed">
                <p>
                  I am a <strong className="text-white font-semibold">Front-End Developer</strong> with over 5 years of hands-on experience building user-centric interfaces, performance-driven web tools, and responsive digital products.
                </p>
                <p>
                  My engineering journey began on freeCodeCamp in 2021, and since then I have specialized in <strong className="text-white font-semibold">React</strong>, <strong className="text-white font-semibold">JavaScript (ES6+)</strong>, and <strong className="text-white font-semibold">Tailwind CSS</strong>. I focus heavily on client-side browser capabilities—such as <strong className="text-blue-400 font-medium">Web Workers</strong> and in-browser state algorithms—to create fast web utilities that require zero server latency and guarantee total user privacy.
                </p>
              </div>

              {/* Core Tenets Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#1e293b]">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-white">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>100% Client-Side Compute</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-white">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>WCAG 2.1 AA Accessibility</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-white">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Fluid 60 FPS User Interfaces</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-white">
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
                <span className="text-2xl font-bold font-mono text-blue-400 block">4</span>
                <span className="text-xs text-slate-300 block font-medium">Live Production Tools</span>
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

        {/* Verifiable Claims Proof: Lighthouse 100/100/100/100 & Architecture */}
        <PerformanceAuditProof />

        {/* Education & Certifications Showcase with Direct Verification Links */}
        <div id="credentials" className="mt-12 pt-10 border-t border-[#1e293b] space-y-6 scroll-mt-20">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {educationCertificationsData.map((cert) => (
              <div
                key={cert.id}
                className="bg-[#0f172a] p-5 sm:p-6 rounded-2xl border border-[#1e293b] hover:border-blue-500/40 transition-all space-y-4 shadow-sm flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20 font-semibold">
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{cert.badge}</span>
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1e293b] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Issued: {cert.issuedDate}</span>
                    {cert.hours && (
                      <span className="text-blue-400 font-medium">{cert.hours}</span>
                    )}
                  </div>

                  {/* Direct Verification Page Link */}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-[#0a0d12] hover:bg-blue-600/20 text-blue-300 hover:text-blue-200 border border-[#1e293b] hover:border-blue-500/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      title={`Verify ${cert.title} on ${cert.issuer}`}
                    >
                      <span>Verify on {cert.issuer}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
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

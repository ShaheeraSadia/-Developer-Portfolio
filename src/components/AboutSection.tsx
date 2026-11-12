import React from 'react';
import { 
  CheckCircle2, 
  GraduationCap, 
  ExternalLink,
  MapPin,
  Clock,
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
    <section id="about" className="py-24 sm:py-32 bg-[#0a0d12] text-[#f8fafc] border-b border-[#1e293b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* Section Header with Generous Breathing Room */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1e293b]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f172a] border border-[#1e293b] text-xs font-mono text-blue-400">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Background &amp; Story</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              About Me
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
            <span>Location:</span>
            <span className="text-white font-medium">{developerConfig.location}</span>
          </div>
        </div>

        {/* Profile Snapshot Card - Spacious & Clean */}
        <div className="bg-[#0f172a] p-8 sm:p-10 rounded-3xl border border-blue-500/25 space-y-6 shadow-lg shadow-black/20">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e293b] pb-5">
            <div className="flex items-center gap-3.5">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500/50 p-0.5 bg-[#0a0d12] shadow-sm">
                  <img
                    src="/assets/aistudio/OIP_3c866659.jpg"
                    alt="Shaheera Sadia - Front-End Developer"
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0f172a]" title="Online / Available" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-lg font-bold text-white leading-tight">
                  Shaheera Sadia
                </h3>
                <span className="text-xs font-mono text-blue-400">
                  {developerConfig.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Full-Time &amp; Freelance</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 text-sm font-sans pt-1">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
              <span className="font-mono text-xs text-blue-400 font-semibold shrink-0 sm:w-28">
                Who I Am:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {aboutMeData.whoIAm}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
              <span className="font-mono text-xs text-blue-400 font-semibold shrink-0 sm:w-28">
                Where Based:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {aboutMeData.whereBased}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
              <span className="font-mono text-xs text-emerald-400 font-semibold shrink-0 sm:w-28">
                Looking For:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {aboutMeData.lookingFor}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Full Biography Narrative & Stats */}
          <div className="lg:col-span-7 space-y-8">
            {/* Narrative Bio */}
            <div className="bg-[#0f172a] p-8 sm:p-9 rounded-3xl border border-[#1e293b] space-y-5 shadow-md shadow-black/20">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {aboutMeData.headline}
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                <p>
                  I am a <strong className="text-white font-semibold">Front-End Developer</strong> building clean, responsive web applications and client-side browser utilities since 2021.
                </p>
                <p>
                  My engineering journey began on freeCodeCamp in 2021, and since then I have focused on <strong className="text-white font-semibold">React</strong>, <strong className="text-white font-semibold">JavaScript (ES6+)</strong>, and <strong className="text-white font-semibold">Tailwind CSS</strong>. I leverage browser-native capabilities—such as <strong className="text-blue-400 font-medium">Web Workers</strong> and client-side processing—to deliver fast web utilities with instant responsiveness and user data privacy.
                </p>
              </div>

              {/* Core Tenets Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-5 border-t border-[#1e293b]">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Client-Side Compute</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>WCAG 2.1 AA Accessibility</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Responsive Mobile-First UI</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Predictable Clean State</span>
                </div>
              </div>
            </div>

            {/* Quick Experience Stats Card */}
            <div className="grid grid-cols-3 gap-5">
              <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#1e293b] text-center space-y-1 shadow-sm">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-white block">Since 2021</span>
                <span className="text-xs text-slate-400 block font-medium">Front-End Engineer</span>
              </div>
              <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#1e293b] text-center space-y-1 shadow-sm">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-blue-400 block">4 <span className="text-sm font-sans font-normal text-blue-300/80">+1</span></span>
                <span className="text-xs text-slate-400 block font-medium">Core Apps (+1 Module)</span>
              </div>
              <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#1e293b] text-center space-y-1 shadow-sm">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 block">100%</span>
                <span className="text-xs text-slate-400 block font-medium">In-Browser Media Compute</span>
              </div>
            </div>
          </div>

          {/* Right Column: Career Milestones Timeline */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0f172a] p-8 sm:p-9 rounded-3xl border border-[#1e293b] space-y-5 shadow-md shadow-black/20">
              <div className="flex items-center justify-between border-b border-[#1e293b] pb-4">
                <h4 className="text-base font-semibold text-white">
                  Milestones &amp; Progression
                </h4>
                <span className="text-xs font-mono text-slate-400">2021 — Present</span>
              </div>

              <div className="space-y-5 pt-2">
                {aboutMeData.milestones.map((m, idx) => (
                  <div key={idx} className="relative pl-7 border-l-2 border-slate-700 space-y-1 group">
                    <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-500 group-hover:bg-blue-400 transition-colors" />
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                        {m.title}
                      </h5>
                      <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
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

        {/* Verifiable Lighthouse Audit Strip */}
        <PerformanceAuditProof />

        {/* Education & Certifications Showcase */}
        <div id="credentials" className="pt-12 border-t border-[#1e293b] space-y-8 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider font-bold">
                <GraduationCap className="w-4 h-4" />
                <span>Accredited Credentials</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Education &amp; Certifications
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="hidden md:inline text-xs font-mono text-slate-400">
                600+ Verified Coursework Hours
              </span>
              <ResumeDownloadButton variant="outline" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {educationCertificationsData.map((cert) => (
              <div
                key={cert.id}
                className="bg-[#0f172a] p-7 sm:p-8 rounded-3xl border border-[#1e293b] hover:border-blue-500/50 transition-all space-y-5 shadow-md shadow-black/20 flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20 font-semibold">
                      {cert.issuer}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{cert.badge}</span>
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1e293b] space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Issued: {cert.issuedDate}</span>
                    {cert.hours && (
                      <span className="text-blue-400 font-medium">{cert.hours}</span>
                    )}
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0a0d12] hover:bg-blue-600/20 text-blue-300 hover:text-blue-200 border border-[#1e293b] hover:border-blue-500/40 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      title={`Verify ${cert.title} on ${cert.issuer}`}
                    >
                      <span>Verify Credential on {cert.issuer}</span>
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

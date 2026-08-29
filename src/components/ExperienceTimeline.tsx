import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowUpRight, Award, FileText, Download } from 'lucide-react';
import { experienceData } from '../data/portfolioData';
import { useSEO } from '../hooks/useSEO';
import { sectionSEOConfig } from '../data/seoConfig';
import { ResumeDownloadButton } from './ResumeDownloadButton';

interface ExperienceTimelineProps {
  onOpenResume?: () => void;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ onOpenResume }) => {
  useSEO(sectionSEOConfig.experience);

  return (
    <section id="experience" className="py-20 bg-[#0a0d12] text-[#f8fafc] border-b border-[#1e293b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-12 border-b border-[#1e293b]">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#3b82f6] uppercase tracking-wider block">
              Career Path
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f8fafc]">
              Work Experience
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#94a3b8] max-w-md leading-relaxed font-sans">
            Track record across building production-grade web applications, client-side tools, and accessible UI architectures.
          </p>
        </div>

        {/* Timeline Entries */}
        <div className="space-y-8">
          {experienceData.map((item) => (
            <div
              key={item.id}
              className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 sm:p-8 hover:border-slate-600 transition-all duration-200 shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-6 border-b border-[#1e293b]">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl font-bold text-[#f8fafc]">
                      {item.role}
                    </h3>
                    <span className="text-xs font-mono text-[#3b82f6] bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#94a3b8] pt-1">
                    <span className="text-[#f8fafc] font-semibold">{item.company}</span>
                    <span className="text-slate-600">•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#3b82f6]" />
                      <span>{item.period}</span>
                    </div>
                    <span className="text-slate-600">•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary & Highlights */}
              <div className="pt-6 space-y-4">
                <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                  {item.summary}
                </p>

                {/* Highlights / Achievements list */}
                <div className="space-y-2 pt-2">
                  {item.achievements.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed text-slate-100">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="pt-4 flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#0a0d12] text-slate-300 border border-[#1e293b]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Career History Export Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#0f172a] border border-[#1e293b] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <span>Need the complete official CV for your hiring pipeline?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Download the ATS-formatted resume or developer Markdown file directly, or view the complete interactive breakdown.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
            <ResumeDownloadButton
              variant="hero"
              onOpenModal={onOpenResume}
              showPreviewOption={true}
            />
            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="px-4 py-2.5 rounded-xl bg-[#0a0d12] hover:bg-[#1e293b] text-slate-200 hover:text-white font-medium text-xs sm:text-sm border border-[#1e293b] hover:border-slate-600 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>View Full CV</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

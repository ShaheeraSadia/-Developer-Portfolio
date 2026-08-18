import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-16 border-b border-[#E7E6E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E7E6E2]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#64666E] uppercase tracking-wider mb-2">
              <span className="text-[#2F5CFF]">04.</span>
              <span>CAREER_LOG</span>
              <span className="text-[#9E9EA7]">//</span>
              <span>ORGANIZATIONAL_IMPACT</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#14151A]">
              Professional experience &amp; impact.
            </h2>
          </div>
          <p className="text-sm text-[#64666E] max-w-md font-sans">
            5+ years of delivering user-centric front-end interfaces, SaaS utilities, and responsive dashboard applications.
          </p>
        </div>

        {/* Experience Timeline Rows */}
        <div className="mt-8 space-y-8">
          {experienceData.map((exp, idx) => (
            <div
              key={exp.id}
              id={`experience-item-${exp.id}`}
              className="p-6 sm:p-8 rounded-xl border border-[#E7E6E2] bg-white transition-all hover:border-[#D5D4CE] shadow-2xs"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-[#E7E6E2] pb-6">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-lg sm:text-xl font-bold text-[#14151A]">
                      {exp.role}
                    </h3>
                    <span className="text-base font-medium text-[#2F5CFF]">
                      @ {exp.company}
                    </span>
                    {exp.statsBadge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F4F3EF] border border-[#E7E6E2] text-xs font-mono font-bold text-[#14151A]">
                        {exp.statsBadge}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#555761] leading-relaxed max-w-3xl font-sans pt-1">
                    {exp.summary}
                  </p>
                </div>

                <div className="text-xs font-mono text-[#64666E] space-y-1 lg:text-right shrink-0">
                  <div className="flex lg:justify-end items-center gap-1.5 font-medium text-[#14151A]">
                    <Calendar className="w-3.5 h-3.5 text-[#2F5CFF]" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex lg:justify-end items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#9E9EA7]" />
                    <span>{exp.location} • {exp.type}</span>
                  </div>
                </div>
              </div>

              {/* Achievements List */}
              <div className="pt-6 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#64666E] font-semibold block">
                  Key Architectural Wins:
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-[#44464F] font-sans">
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className="flex items-start gap-2.5 bg-[#F4F3EF]/50 p-3 rounded-lg border border-[#E7E6E2]/70">
                      <CheckCircle2 className="w-4 h-4 text-[#1FAA6E] mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{ach}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-xs font-mono text-[#9E9EA7] mr-1">stack:</span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs font-mono bg-[#F4F3EF] border border-[#E7E6E2] rounded text-[#14151A]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

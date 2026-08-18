import React from 'react';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-24 sm:py-28 md:py-32 border-b border-[#E7E6E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Clear Hierarchy and mb-14 spacing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-14 border-b border-[#E7E6E2]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#64666E] uppercase tracking-wider">
              <span className="text-[#2F5CFF] font-bold">04.</span>
              <span>CAREER_LOG</span>
              <span className="text-[#9E9EA7]">//</span>
              <span>ORGANIZATIONAL_IMPACT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#14151A]">
              Professional experience &amp; impact.
            </h2>
          </div>
          <p className="text-base text-[#555761] max-w-md font-sans leading-relaxed">
            5+ years of delivering user-centric front-end interfaces, SaaS utilities, and responsive dashboard applications.
          </p>
        </div>

        {/* Experience Timeline Rows */}
        <div className="space-y-8">
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              id={`experience-item-${exp.id}`}
              className="p-6 sm:p-8 rounded-xl border border-[#E7E6E2] bg-white transition-all hover:border-[#D5D4CE] shadow-2xs"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-[#E7E6E2] pb-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl font-bold text-[#14151A]">
                      {exp.role}
                    </h3>
                    <span className="text-base font-semibold text-[#2F5CFF]">
                      @ {exp.company}
                    </span>
                    {exp.statsBadge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F4F3EF] border border-[#E7E6E2] text-xs font-mono font-bold text-[#14151A]">
                        {exp.statsBadge}
                      </span>
                    )}
                  </div>

                  <p className="text-base text-[#555761] leading-relaxed max-w-3xl font-sans pt-1">
                    {exp.summary}
                  </p>
                </div>

                <div className="text-xs font-mono text-[#64666E] space-y-1.5 lg:text-right shrink-0">
                  <div className="flex lg:justify-end items-center gap-1.5 font-bold text-[#14151A]">
                    <Calendar className="w-3.5 h-3.5 text-[#2F5CFF]" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex lg:justify-end items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#9E9EA7]" />
                    <span>{exp.location} ({exp.type})</span>
                  </div>
                </div>
              </div>

              {/* Key Achievements Bullets */}
              <div className="pt-6 space-y-3">
                <div className="text-xs font-mono text-[#64666E] uppercase tracking-wider font-semibold">
                  // verified_deliverables
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans text-sm text-[#34353E]">
                  {exp.achievements.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#1FAA6E] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Pill Row */}
              <div className="mt-6 pt-4 border-t border-[#E7E6E2] flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-[#64666E] text-xs mr-1 font-medium">stack:</span>
                {exp.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-md bg-[#F4F3EF] border border-[#E7E6E2] text-[#14151A] font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

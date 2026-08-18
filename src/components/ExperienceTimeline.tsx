import React from 'react';
import { Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-[#12161f] text-white border-b border-[#2a3245]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Clear Hierarchy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#2a3245]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00eeff] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-pulse"></span>
              <span className="font-bold">04. CAREER LOG</span>
              <span className="text-gray-500">//</span>
              <span>ORGANIZATIONAL IMPACT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Professional <span className="text-[#00eeff] text-glow-cyan">Experience &amp; Milestones</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-300 max-w-md font-sans leading-relaxed">
            5+ years of delivering user-centric front-end interfaces, SaaS utilities, and responsive dashboard applications.
          </p>
        </div>

        {/* Experience Timeline Rows */}
        <div className="space-y-6">
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              id={`experience-item-${exp.id}`}
              className="p-6 sm:p-8 rounded-2xl border border-[#2a3245] bg-[#1b202c] hover:border-[#00eeff] transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(0,238,255,0.15)]"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-[#12161f] pb-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl font-bold text-white">
                      {exp.role}
                    </h3>
                    <span className="text-base font-semibold text-[#00eeff]">
                      @ {exp.company}
                    </span>
                    {exp.statsBadge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#12161f] border border-[#00eeff]/30 text-xs font-mono font-bold text-[#00eeff]">
                        {exp.statsBadge}
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-3xl font-sans pt-1">
                    {exp.summary}
                  </p>
                </div>

                <div className="text-xs font-mono text-gray-300 space-y-1.5 lg:text-right shrink-0">
                  <div className="flex lg:justify-end items-center gap-1.5 font-bold text-white">
                    <Calendar className="w-3.5 h-3.5 text-[#00eeff]" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex lg:justify-end items-center gap-1.5 text-gray-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Achievements Checklist */}
              <div className="mt-6 space-y-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#00eeff] font-bold block">
                  // verified_deliverables
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {exp.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-[#00eeff] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div className="mt-6 pt-4 border-t border-[#12161f] flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-mono text-gray-400 mr-1">// stack:</span>
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-[#12161f] text-gray-200 border border-[#2a3245]"
                  >
                    {tech}
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

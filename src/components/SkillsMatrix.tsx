import React from 'react';
import { Cpu, Terminal, CheckCircle2, ArrowUpRight, Github, Rocket, Sparkles, ExternalLink } from 'lucide-react';
import { skillCategories, featuredToolsData } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  return (
    <section id="skills-matrix" className="py-16 border-b border-[#E7E6E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E7E6E2]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#64666E] uppercase tracking-wider mb-2">
              <span className="text-[#2F5CFF]">05.</span>
              <span>TECHNICAL_CAPABILITIES</span>
              <span className="text-[#9E9EA7]">//</span>
              <span>DOMAIN_DEPTH_&amp;_FEATURED_TOOLS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#14151A]">
              Specialized skill matrix &amp; live tools.
            </h2>
          </div>
          <p className="text-sm text-[#64666E] max-w-md font-sans">
            Depth ratings, years of continuous production practice, and live production tools.
          </p>
        </div>

        {/* Featured Applications & Tools Table (Direct Request) */}
        <div className="pt-8">
          <div className="rounded-xl border border-[#E7E6E2] bg-white overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E6E2] bg-[#F4F3EF]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2F5CFF]" />
                <h3 className="text-sm font-mono uppercase font-bold text-[#14151A]">
                  // featured_applications_&amp;_production_tools
                </h3>
              </div>
              <span className="text-xs font-mono text-[#64666E]">Live Deployments</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E7E6E2] bg-[#FAFAF8] text-[#64666E] font-mono text-xs uppercase">
                    <th className="py-3 px-4 sm:px-6 font-semibold">Application</th>
                    <th className="py-3 px-4 sm:px-6 font-semibold">Core Focus</th>
                    <th className="py-3 px-4 sm:px-6 font-semibold">Key Tech</th>
                    <th className="py-3 px-4 sm:px-6 font-semibold text-right">Live Link &amp; Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E6E2]">
                  {featuredToolsData.map((tool, idx) => (
                    <tr key={idx} className="hover:bg-[#F4F3EF]/50 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-medium text-[#14151A]">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#14151A] text-sm">{tool.application}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#EAE8E2] text-[#64666E]">
                              {tool.category}
                            </span>
                          </div>
                          <p className="text-xs text-[#64666E] font-normal hidden sm:block max-w-sm">
                            {tool.description}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-[#34353E] font-sans">
                        <span className="text-xs sm:text-sm">{tool.coreFocus}</span>
                      </td>
                      <td className="py-4 px-4 sm:px-6 font-mono text-xs text-[#2F5CFF]">
                        <div className="flex flex-wrap gap-1">
                          {tool.keyTech.split(', ').map((tech, tIdx) => (
                            <span key={tIdx} className="px-1.5 py-0.5 rounded bg-[#F4F3EF] border border-[#E7E6E2] text-[11px] text-[#14151A]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right font-mono text-xs">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={tool.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#2F5CFF] text-white font-medium hover:bg-[#254BD8] transition-colors shadow-2xs"
                          >
                            <span>Live Demo</span>
                            <span aria-hidden="true">🚀</span>
                          </a>
                          <a
                            href={tool.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-white border border-[#D5D4CE] text-[#14151A] hover:bg-[#EAE8E2] transition-colors"
                          >
                            <span>GitHub</span>
                            <span aria-hidden="true">💻</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Technical Capabilities Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8">
          {skillCategories.map((category, catIdx) => (
            <div
              key={catIdx}
              className="rounded-xl border border-[#E7E6E2] bg-white p-6 shadow-2xs space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E7E6E2] pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#2F5CFF]" />
                  <h3 className="text-sm font-mono uppercase font-bold text-[#14151A]">
                    {category.category}
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#64666E]">{category.skills.length} core domains</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 bg-[#F4F3EF]/60 rounded-lg border border-[#E7E6E2] flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#F4F3EF] transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#14151A] text-sm font-sans">{skill.name}</span>
                        <span className="px-2 py-0.2 rounded bg-white text-[#2F5CFF] border border-[#D5D4CE] text-[11px]">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-[#64666E] text-[11px] font-mono">
                        // {skill.focus}
                      </p>
                    </div>

                    <div className="text-[11px] text-[#64666E] font-mono shrink-0 sm:text-right">
                      <span>{skill.experienceYears}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

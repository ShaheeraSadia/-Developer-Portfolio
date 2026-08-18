import React from 'react';
import {
  Terminal,
  ArrowUpRight,
  Github,
  Sparkles,
  Layers,
  Cpu,
  Wrench,
  Code2,
  ExternalLink
} from 'lucide-react';
import { skillCategories, featuredToolsData } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  return (
    <section id="skills-matrix" className="py-20 bg-[#12161f] text-white border-b border-[#2a3245]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Clear Hierarchy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#2a3245]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00eeff] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-pulse"></span>
              <span className="font-bold">05. TECHNICAL CAPABILITIES</span>
              <span className="text-gray-500">//</span>
              <span>DOMAIN DEPTH &amp; TOOLSET</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Specialized <span className="text-[#00eeff] text-glow-cyan">Skill Matrix &amp; Stack</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-300 max-w-md font-sans leading-relaxed">
            Depth ratings, years of continuous production practice, and live production tools.
          </p>
        </div>

        {/* Featured Applications & Tools Table */}
        <div className="mb-12">
          <div className="rounded-2xl border border-[#2a3245] bg-[#1b202c] overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a3245] bg-[#12161f]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00eeff]" />
                <h3 className="text-sm font-mono uppercase font-bold text-white">
                  // featured_applications_&amp;_production_tools
                </h3>
              </div>
              <span className="text-xs font-mono text-[#00eeff] font-semibold bg-[#1b202c] px-2.5 py-1 rounded-full border border-[#00eeff]/20">
                Verified Deployments
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#2a3245] bg-[#12161f]/50 text-gray-400 font-mono text-xs uppercase">
                    <th className="py-3 px-4 sm:px-6 font-semibold">Application</th>
                    <th className="py-3 px-4 sm:px-6 font-semibold">Core Focus</th>
                    <th className="py-3 px-4 sm:px-6 font-semibold">Key Tech</th>
                    <th className="py-3 px-4 sm:px-6 font-semibold text-right">Live Link &amp; Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a3245]">
                  {featuredToolsData.map((tool, idx) => (
                    <tr key={idx} className="hover:bg-[#12161f]/60 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-bold text-white">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#00eeff]"></span>
                          <span>{tool.application}</span>
                        </div>
                        <span className="text-[11px] font-mono text-gray-400 block font-normal mt-0.5">
                          {tool.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-gray-300">
                        {tool.coreFocus}
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        <span className="font-mono text-xs text-[#00eeff]">
                          {tool.keyTech}
                        </span>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right space-x-3 whitespace-nowrap">
                        <a
                          href={tool.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-xs text-[#00eeff] font-bold hover:underline"
                        >
                          <span>Live Demo 🚀</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href={tool.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-xs text-gray-400 hover:text-white transition-colors"
                        >
                          <Github className="w-3 h-3" />
                          <span>Code</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="bg-[#1b202c] p-6 rounded-2xl border border-[#2a3245] hover:border-[#00eeff] transition-all space-y-4 hover:shadow-[0_0_20px_rgba(0,238,255,0.15)] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#12161f]">
                  <span className="text-xs font-mono font-bold text-[#00eeff] uppercase">
                    {category.category}
                  </span>
                  <Code2 className="w-4 h-4 text-gray-400" />
                </div>

                <div className="space-y-2.5">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-gray-400 text-[11px]">{skill.experienceYears}</span>
                      </div>
                      {/* Visual progress track */}
                      <div className="w-full h-1.5 bg-[#12161f] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#00eeff] rounded-full shadow-[0_0_6px_#00eeff]"
                          style={{
                            width:
                              skill.level === 'Advanced' || skill.level === 'Expert'
                                ? '95%'
                                : skill.level === 'Proficient'
                                ? '85%'
                                : '70%',
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#12161f] flex justify-between items-center text-[11px] font-mono text-gray-400">
                <span>Domain Focus</span>
                <span className="text-[#00eeff] font-semibold">Production Ready</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

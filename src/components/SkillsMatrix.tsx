import React, { useState } from 'react';
import {
  Wrench,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  Database,
  Globe,
  Award
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = ['All', ...skillCategories.map((c) => c.category)];

  const filteredCategories =
    activeTab === 'All'
      ? skillCategories
      : skillCategories.filter((c) => c.category === activeTab);

  const getCategoryIcon = (category: string) => {
    if (category.includes('Front-End')) return Layers;
    if (category.includes('Performance') || category.includes('UI/UX')) return Cpu;
    if (category.includes('Database')) return Database;
    return Globe;
  };

  return (
    <section id="skills-matrix" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0d12]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f172a] border border-[#1e293b] text-xs font-mono text-[#3b82f6]">
            <Wrench className="w-3.5 h-3.5" />
            <span>Technical Proficiencies &amp; Stack</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f8fafc]">
            Skills &amp; Technologies
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] max-w-2xl font-sans">
            A comprehensive matrix of tools, libraries, and frameworks I use to build scalable web and mobile software.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeTab === cat
                  ? 'bg-[#2563eb] text-white shadow-sm font-semibold'
                  : 'bg-[#0f172a] text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] border border-[#1e293b]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((catGroup) => {
            const Icon = getCategoryIcon(catGroup.category);
            return (
              <div
                key={catGroup.category}
                className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 space-y-5 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-[#1e293b] pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#0a0d12] text-[#3b82f6] border border-[#1e293b]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#f8fafc]">
                        {catGroup.category}
                      </h3>
                      <span className="text-[11px] text-[#94a3b8] font-mono">
                        {catGroup.skills.length} core technologies
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {catGroup.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-[#0a0d12] border border-[#1e293b] space-y-1.5 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-[#f8fafc]">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0f172a] text-[#3b82f6] border border-[#1e293b]">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#94a3b8] font-sans line-clamp-2">
                        {skill.focus}
                      </p>
                      <div className="text-[10px] font-mono text-slate-500 pt-0.5">
                        Exp: {skill.experienceYears}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

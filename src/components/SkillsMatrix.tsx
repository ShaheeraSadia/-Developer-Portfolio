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
import { useSEO } from '../hooks/useSEO';
import { sectionSEOConfig } from '../data/seoConfig';

export const SkillsMatrix: React.FC = () => {
  useSEO(sectionSEOConfig.skills);

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

  const coreStackPills = [
    { name: 'React', badge: 'v19 / Functional & Hooks', primary: true },
    { name: 'JavaScript (ES6+)', badge: 'Modern Async & DOM', primary: true },
    { name: 'Vite', badge: 'Lightning HMR & Build', primary: true },
    { name: 'Tailwind CSS', badge: 'v4 Zero-Runtime Tokens', primary: true },
    { name: 'Client Web Workers', badge: 'Off-Thread Compute', primary: true },
    { name: 'Gemini AI', badge: 'LLM & Code Audits', primary: false },
    { name: 'HTML5 & CSS3', badge: 'Accessible Semantic UI', primary: false },
    { name: 'Git & GitHub', badge: 'Version Control', primary: false },
    { name: 'Vercel', badge: 'Edge Deployments', primary: false },
  ];

  return (
    <section id="skills" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0d12] scroll-mt-20">
      <div id="tech-stack" className="max-w-6xl mx-auto space-y-10 scroll-mt-20">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f172a] border border-[#1e293b] text-xs font-mono text-[#3b82f6]">
            <Wrench className="w-3.5 h-3.5" />
            <span>Technical Proficiencies &amp; Stack</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Tech Stack &amp; Skills Matrix
          </h2>
          <p className="text-sm sm:text-base text-white max-w-2xl font-sans">
            A verified matrix of tools, browser APIs, and libraries I use to engineer fast, accessible front-end applications.
          </p>
        </div>

        {/* Core Tech Stack Highlights Strip */}
        <div className="p-5 sm:p-6 bg-[#0f172a] rounded-2xl border border-blue-500/25 space-y-3 shadow-sm">
          <div className="flex items-center justify-between gap-2 border-b border-[#1e293b] pb-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Core Production Tech Stack</span>
            </div>
            <span className="text-[11px] font-mono text-slate-300">Daily Driver Workflow</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {coreStackPills.map((pill, idx) => (
              <div
                key={idx}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-mono transition-all ${
                  pill.primary
                    ? 'bg-[#0a0d12] border-blue-500/40 text-white shadow-2xs'
                    : 'bg-[#0a0d12] border-[#1e293b] text-slate-200'
                }`}
              >
                <span className="font-semibold text-white">{pill.name}</span>
                <span className="text-[10px] text-blue-400 font-sans">• {pill.badge}</span>
              </div>
            ))}
          </div>
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
                  : 'bg-[#0f172a] text-slate-300 hover:text-white hover:bg-[#1e293b] border border-[#1e293b]'
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
                    <div className="p-2 rounded-lg bg-[#0a0d12] text-blue-400 border border-[#1e293b]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {catGroup.category}
                      </h3>
                      <span className="text-[11px] text-white font-mono">
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
                        <span className="text-xs font-bold text-white">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0f172a] text-blue-400 border border-[#1e293b]">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-white font-sans line-clamp-2">
                        {skill.focus}
                      </p>
                      <div className="text-[10px] font-mono text-white pt-0.5">
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

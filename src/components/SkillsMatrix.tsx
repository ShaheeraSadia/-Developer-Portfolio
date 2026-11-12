import React, { useState } from 'react';
import {
  Wrench,
  Layers,
  Cpu,
  Database,
  Globe,
  Sparkles
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
    { name: 'React', badge: 'Component Architecture', primary: true },
    { name: 'Next.js', badge: 'App Router & SSR', primary: true },
    { name: 'PWAs', badge: 'Offline & Service Workers', primary: true },
    { name: 'Web Workers', badge: 'Off-Thread Compute', primary: true },
    { name: 'JavaScript (ES6+)', badge: 'Modern Async & DOM', primary: true },
    { name: 'Vite', badge: 'Fast Build Tooling', primary: true },
    { name: 'Tailwind CSS', badge: 'Utility Design Tokens', primary: true },
    { name: 'Gemini AI', badge: 'AI Code Analysis', primary: false },
    { name: 'HTML5 & CSS3', badge: 'Semantic Accessible UI', primary: false },
    { name: 'Git & GitHub', badge: 'Version Control', primary: false },
    { name: 'Vercel', badge: 'Edge Deployments', primary: false },
  ];

  return (
    <section id="skills" className="w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0d12] scroll-mt-20 border-b border-[#1e293b]">
      <div id="tech-stack" className="max-w-6xl mx-auto space-y-12 sm:space-y-16 scroll-mt-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1e293b]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f172a] border border-[#1e293b] text-xs font-mono text-blue-400">
              <Wrench className="w-3.5 h-3.5" />
              <span>Core Stack &amp; Tooling</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Skills &amp; Technologies
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 max-w-md leading-relaxed font-sans">
            Tools, browser APIs, and libraries used to engineer accessible, responsive, and performance-driven web products.
          </p>
        </div>

        {/* Core Tech Stack Highlights Strip */}
        <div className="p-6 sm:p-8 bg-[#0f172a] rounded-3xl border border-blue-500/25 space-y-5 shadow-lg shadow-black/20">
          <div className="flex items-center justify-between gap-3 border-b border-[#1e293b] pb-3">
            <div className="flex items-center gap-2.5 text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Primary Technical Proficiencies</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Daily Driver Workflow</span>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-1">
            {coreStackPills.map((pill, idx) => (
              <div
                key={idx}
                className={`px-3.5 py-2 rounded-xl border flex items-center gap-2 text-xs font-mono transition-all ${
                  pill.primary
                    ? 'bg-[#0a0d12] border-blue-500/40 text-white shadow-sm'
                    : 'bg-[#0a0d12] border-[#1e293b] text-slate-300'
                }`}
              >
                <span className="font-semibold text-white">{pill.name}</span>
                <span className="text-[11px] text-blue-400 font-sans">• {pill.badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeTab === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 font-semibold'
                  : 'bg-[#0f172a] text-slate-300 hover:text-white hover:bg-[#1e293b] border border-[#1e293b]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid - Airy, Non-Bulky Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredCategories.map((catGroup) => {
            const Icon = getCategoryIcon(catGroup.category);
            return (
              <div
                key={catGroup.category}
                className="bg-[#0f172a] border border-[#1e293b] rounded-3xl p-7 sm:p-8 space-y-6 shadow-md shadow-black/20"
              >
                <div className="flex items-center justify-between border-b border-[#1e293b] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#0a0d12] text-blue-400 border border-[#1e293b]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {catGroup.category}
                      </h3>
                      <span className="text-xs text-slate-400 font-mono">
                        {catGroup.skills.length} core technologies
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {catGroup.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-4 rounded-2xl bg-[#0a0d12] border border-[#1e293b] space-y-2 hover:border-slate-500 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-sm font-bold text-white">
                          {skill.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {skill.focus}
                      </p>
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

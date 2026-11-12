import React, { useState } from 'react';
import { 
  ExternalLink, 
  Github, 
  Filter, 
  Eye, 
  AlertCircle,
  Wrench,
  Sparkles
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types';
import { useSEO } from '../hooks/useSEO';
import { sectionSEOConfig } from '../data/seoConfig';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  useSEO(sectionSEOConfig.projects);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'AI & Cybersecurity', label: 'AI & Cybersecurity' },
    { id: 'Web Utilities & Design Systems', label: 'Design Systems' },
    { id: 'Web Utilities & SaaS Engine', label: 'Client-Side Utilities' },
    { id: 'Web Utilities & E-Commerce', label: 'Catalog & Store' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 sm:py-32 bg-[#0a0d12] text-[#f8fafc] border-b border-[#1e293b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header with Generous Breathing Room */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1e293b]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f172a] border border-[#1e293b] text-xs font-mono text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Production Applications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Featured Work
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 max-w-md leading-relaxed font-sans">
            Real production applications engineered with React, modern JavaScript (ES6+), Vite, Tailwind CSS, Web Workers, and client-side performance.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-[#0f172a] text-slate-300 hover:text-white hover:border-slate-500 border border-[#1e293b]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Unified, Spacious Project Cards List */}
        <div className="space-y-10 sm:space-y-12">
          {filteredProjects.map((project) => {
            const liveUrl = project.liveUrl || 'https://shaheera-sadia.vercel.app';

            return (
              <div
                key={project.id}
                className="bg-[#0f172a] border border-[#1e293b] rounded-3xl p-6 sm:p-8 lg:p-9 transition-all hover:border-slate-500/80 group shadow-lg shadow-black/20 flex flex-col lg:flex-row gap-8 lg:gap-10 items-start"
              >
                {/* Project Image Thumbnail */}
                {project.image && (
                  <div className="w-full lg:w-80 xl:w-96 shrink-0 aspect-[16/10] sm:aspect-video rounded-2xl overflow-hidden border border-[#1e293b] bg-slate-900 relative shadow-md">
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.opacity = '0.4';
                      }}
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#0a0d12]/90 backdrop-blur-md border border-[#1e293b] text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Production</span>
                    </div>
                  </div>
                )}

                {/* Right Project Content */}
                <div className="flex-1 space-y-5 w-full">
                  {/* Title & Metadata Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
                        {project.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    {project.repoName && (
                      <span className="text-xs font-mono px-3 py-1 rounded-lg bg-[#0a0d12] border border-[#1e293b] text-slate-300">
                        {project.repoName}
                      </span>
                    )}
                  </div>

                  {/* Summary */}
                  <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Key Highlights: Problem Solved & What I Built */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-5 bg-[#0a0d12] rounded-2xl border border-[#1e293b]">
                    {project.problemSolved && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>Problem Solved:</span>
                        </div>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed">
                          {project.problemSolved}
                        </p>
                      </div>
                    )}
                    {project.whatBuilt && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                          <Wrench className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>What I Engineered:</span>
                        </div>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed">
                          {project.whatBuilt}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs font-mono text-slate-400 mr-1">Stack:</span>
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-[#0a0d12] text-slate-200 border border-[#1e293b] px-3 py-1 rounded-lg text-xs font-mono hover:border-blue-500/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons Row */}
                  <div className="pt-3 flex flex-wrap items-center gap-3 border-t border-[#1e293b]">
                    <a 
                      href={liveUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md shadow-blue-600/25 transition-all flex items-center gap-2"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-[#0a0d12] hover:bg-[#1e293b] text-slate-200 hover:text-white border border-[#1e293b] hover:border-slate-500 text-xs sm:text-sm font-mono px-4 py-2.5 rounded-xl transition-all flex items-center gap-2"
                      title="GitHub Source"
                    >
                      <Github className="w-4 h-4" />
                      <span>{project.repoName || 'Source'}</span>
                    </a>

                    <button
                      onClick={() => onSelectProject(project)}
                      className="bg-[#0a0d12] hover:bg-[#1e293b] text-slate-300 hover:text-white border border-[#1e293b] hover:border-slate-500 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-400" />
                      <span>Case Study</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

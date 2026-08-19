import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Github, 
  Filter, 
  Eye, 
  Rocket, 
  CheckCircle2 
} from 'lucide-react';
import { projectsData, featuredToolsData } from '../data/portfolioData';
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
    { id: 'Web Utilities & Design Systems', label: 'Design Systems & Generators' },
    { id: 'Web Utilities & SaaS Platform', label: 'Client-Side Utilities' },
    { id: 'E-Commerce & Interactive Utilities', label: 'E-Commerce & Portals' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-[#0a0d12] text-[#f8fafc] border-b border-[#1e293b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#1e293b]">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#3b82f6] uppercase tracking-wider block">
              Featured Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f8fafc]">
              Selected Projects
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#94a3b8] max-w-md leading-relaxed font-sans">
            Real production tools and web applications built with 100% client-side compute, Web Workers, and zero server latency.
          </p>
        </div>

        {/* Live Production Tools Spotlight */}
        <div className="mb-12 bg-[#0f172a] p-6 sm:p-7 rounded-2xl border border-[#1e293b] shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1e293b] text-xs">
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 text-[#3b82f6]" />
              <span className="font-semibold text-[#f8fafc]">Live Production Deployments</span>
            </div>
            <span className="text-xs font-mono text-[#22c55e] bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Deployed on Vercel
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
            {featuredToolsData.map((tool, idx) => (
              <div
                key={idx}
                className="bg-[#0a0d12] p-5 rounded-xl border border-[#1e293b] hover:border-slate-600 transition-all duration-200 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-[#3b82f6] uppercase tracking-wider block">
                    {tool.category}
                  </span>
                  <h4 className="text-base font-bold text-[#f8fafc] group-hover:text-[#3b82f6] transition-colors">
                    {tool.application}
                  </h4>
                  <p className="text-xs text-[#94a3b8] font-sans leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between">
                  <a
                    href={tool.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3b82f6] hover:text-blue-300 transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={tool.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-[#94a3b8] hover:text-[#f8fafc] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-mono text-[#94a3b8] mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#3b82f6]" />
            Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#2563eb] text-white shadow-sm'
                  : 'bg-[#0f172a] text-[#94a3b8] hover:text-[#f8fafc] hover:border-slate-600 border border-[#1e293b]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Table & Cards List */}
        <div className="space-y-4">
          {filteredProjects.map((project) => {
            const liveUrl =
              project.id === 'brand-identity-generator'
                ? 'https://brand-identity-five.vercel.app/'
                : project.id === 'toolkit-pro'
                ? 'https://toolkit-pro-chi.vercel.app/'
                : 'https://app-tool.vercel.app/shopping.html';

            return (
              <div
                key={project.id}
                className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 sm:p-7 transition-all hover:border-slate-600 group shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left Project Info */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-[#f8fafc] font-bold text-lg sm:text-xl group-hover:text-[#3b82f6] transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono text-[#3b82f6] bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-[#94a3b8]">
                        ({project.year})
                      </span>
                    </div>

                    <p className="text-[#94a3b8] text-sm sm:text-base max-w-2xl font-sans leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="bg-[#0a0d12] text-[#94a3b8] border border-[#1e293b] px-2.5 py-0.5 rounded text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Key Metrics row */}
                    <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[#94a3b8]">
                          <span>{m.label}:</span>
                          <span className="text-[#f8fafc] font-semibold">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="bg-[#0a0d12] hover:bg-[#1e293b] text-[#94a3b8] hover:text-[#f8fafc] border border-[#1e293b] hover:border-slate-600 text-xs font-medium px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#3b82f6]" />
                      <span>Case Study</span>
                    </button>

                    <a 
                      href={liveUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-[#2563eb] hover:bg-[#3b82f6] text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-[#0a0d12] hover:bg-[#1e293b] text-[#94a3b8] hover:text-[#f8fafc] border border-[#1e293b] hover:border-slate-600 text-xs font-mono px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1"
                      title="GitHub Source"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
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

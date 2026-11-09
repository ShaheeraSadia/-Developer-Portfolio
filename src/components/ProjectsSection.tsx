import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Github, 
  Filter, 
  Eye, 
  Rocket, 
  CheckCircle2,
  AlertCircle,
  Wrench,
  Sparkles
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
    { id: 'AI & Cybersecurity', label: 'AI & Cybersecurity' },
    { id: 'Web Utilities & Design Systems', label: 'Design Systems & Palettes' },
    { id: 'Web Utilities & SaaS Engine', label: 'Client-Side SaaS Utilities' },
    { id: 'Web Utilities & E-Commerce', label: 'E-Commerce & Portals' },
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
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Selected Projects &amp; Tools
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white max-w-md leading-relaxed font-sans">
            Real production tools and web applications built with React, Vite, Gemini AI, Web Workers, and zero server latency.
          </p>
        </div>

        {/* Live Production Tools Spotlight Grid */}
        <div className="mb-14 bg-[#0f172a] p-6 sm:p-7 rounded-2xl border border-[#1e293b] shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#1e293b] text-xs">
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 text-[#3b82f6]" />
              <span className="font-semibold text-white">Live Production Deployments</span>
            </div>
            <span className="text-xs font-mono text-[#22c55e] bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Active on Vercel
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-5">
            {featuredToolsData.map((tool, idx) => (
              <div
                key={idx}
                className="bg-[#0a0d12] rounded-xl border border-[#1e293b] hover:border-slate-500 transition-all duration-200 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-md"
              >
                {/* Image Screenshot Preview */}
                {tool.image && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-[#1e293b]">
                    <img
                      src={tool.image}
                      alt={`${tool.application} screenshot preview`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#0a0d12]/90 backdrop-blur-xs border border-[#1e293b] text-[10px] font-mono text-emerald-400">
                      Live
                    </div>
                  </div>
                )}

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-[#3b82f6] uppercase tracking-wider block">
                        {tool.category}
                      </span>
                      {tool.repoName && (
                        <span className="text-[10px] font-mono text-slate-400">
                          {tool.repoName}
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-[#3b82f6] transition-colors leading-snug">
                      {tool.application}
                    </h4>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Problem Solved & What Built Snippets */}
                    {tool.problemSolved && (
                      <div className="pt-1 text-[11px] text-amber-200/90 font-sans leading-snug flex items-start gap-1.5">
                        <span className="text-amber-400 font-semibold shrink-0">Problem:</span>
                        <span>{tool.problemSolved}</span>
                      </div>
                    )}
                    {tool.whatBuilt && (
                      <div className="text-[11px] text-emerald-200/90 font-sans leading-snug flex items-start gap-1.5">
                        <span className="text-emerald-400 font-semibold shrink-0">Built:</span>
                        <span>{tool.whatBuilt}</span>
                      </div>
                    )}

                    {/* Explicit Tech Stack Tagging in Spotlight */}
                    <div className="pt-2 flex flex-wrap items-center gap-1">
                      <span className="text-[10px] font-mono text-blue-400 font-semibold mr-1">Stack:</span>
                      {tool.keyTech.split(',').map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0f172a] border border-[#1e293b] text-white"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
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
                      className="inline-flex items-center gap-1 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                      title={`View ${tool.repoName || 'source'} on GitHub`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>{tool.repoName || 'Source'}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-mono text-slate-300 mr-1 flex items-center gap-1">
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
                  : 'bg-[#0f172a] text-slate-300 hover:text-white hover:border-slate-500 border border-[#1e293b]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Detailed Cards List */}
        <div className="space-y-6">
          {filteredProjects.map((project) => {
            const liveUrl = project.liveUrl || 'https://shaheerasadia.dev';

            return (
              <div
                key={project.id}
                className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-5 sm:p-7 transition-all hover:border-slate-500 group shadow-sm flex flex-col lg:flex-row gap-6 items-start"
              >
                {/* Project Image Thumbnail (Left / Top on mobile) */}
                {project.image && (
                  <div className="w-full lg:w-72 xl:w-80 shrink-0 aspect-[16/10] sm:aspect-video rounded-xl overflow-hidden border border-[#1e293b] bg-slate-900 relative shadow-sm">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#0a0d12]/90 backdrop-blur-xs border border-[#1e293b] text-[10px] font-mono text-slate-200">
                      {project.category}
                    </div>
                  </div>
                )}

                {/* Right Project Content */}
                <div className="flex-1 space-y-3.5 w-full">
                  {/* Title & Metadata Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-white font-bold text-lg sm:text-xl group-hover:text-[#3b82f6] transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono text-[#3b82f6] bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-slate-300">
                        ({project.year})
                      </span>
                    </div>

                    {/* Clean Repo Name Badge */}
                    {project.repoName && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0a0d12] border border-[#1e293b] text-slate-300">
                        github.com/shaheerasadia/{project.repoName}
                      </span>
                    )}
                  </div>

                  {/* Summary */}
                  <p className="text-slate-200 text-sm sm:text-base font-sans leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Key Highlights: Problem Solved & What I Built */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 bg-[#0a0d12] rounded-xl border border-[#1e293b]">
                    {project.problemSolved && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>The Problem It Solves:</span>
                        </div>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed">
                          {project.problemSolved}
                        </p>
                      </div>
                    )}
                    {project.whatBuilt && (
                      <div className="space-y-1">
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

                  {/* Explicit Tech Stack Tagging */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-xs font-mono text-blue-400 font-semibold mr-1 flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-blue-400 shrink-0" />
                      <span>Tech Stack:</span>
                    </span>
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-[#0a0d12] text-white border border-blue-500/25 px-2.5 py-0.5 rounded text-xs font-mono shadow-2xs hover:border-blue-400/60 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Key Metrics row */}
                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                        <span>{m.label}:</span>
                        <span className="text-white font-semibold">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons Row */}
                  <div className="pt-2 flex flex-wrap items-center gap-3 border-t border-[#1e293b]/70">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="bg-[#0a0d12] hover:bg-[#1e293b] text-slate-200 hover:text-white border border-[#1e293b] hover:border-slate-500 text-xs font-medium px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#3b82f6]" />
                      <span>Case Study</span>
                    </button>

                    <a 
                      href={liveUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-[#2563eb] hover:bg-[#3b82f6] text-white font-medium text-xs px-4 py-2 rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-[#0a0d12] hover:bg-[#1e293b] text-slate-200 hover:text-white border border-[#1e293b] hover:border-slate-500 text-xs font-mono px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
                      title="GitHub Source"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>{project.repoName || 'Source'}</span>
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

import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Github, 
  Terminal, 
  Layers, 
  Cpu, 
  Zap, 
  Filter,
  Eye,
  Rocket
} from 'lucide-react';
import { projectsData, featuredToolsData } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'Web Utilities & Design Systems', label: 'Web Utilities & Design Systems' },
    { id: 'Web Utilities & SaaS Platform', label: 'Web Utilities & SaaS Platform' },
    { id: 'E-Commerce & Interactive Utilities', label: 'E-Commerce & Interactive Utilities' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-[#1f242d] text-white border-b border-[#323946]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#323946]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00eeff] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-pulse"></span>
              <span className="font-bold">02. FEATURED PROJECTS</span>
              <span className="text-gray-500">//</span>
              <span>PRODUCTION SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Latest <span className="text-[#00eeff] text-glow-cyan">Portfolio Work</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-300 max-w-md leading-relaxed font-sans">
            Real production tools and responsive web apps built with 100% client-side compute, Web Workers, and zero server latency.
          </p>
        </div>

        {/* Live Product Highlights Banner (Featured 3 Live Production Tools) */}
        <div className="mb-12 bg-[#323946] p-6 sm:p-7 rounded-2xl border border-[#00eeff]/30 shadow-[0_0_20px_rgba(0,238,255,0.1)]">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1f242d] text-xs font-mono">
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 text-[#00eeff]" />
              <span className="font-bold text-white uppercase tracking-wider">Verified Live Production Demos</span>
            </div>
            <span className="text-[#00eeff] font-semibold bg-[#1f242d] px-2.5 py-1 rounded-full border border-[#00eeff]/30">
              Live &amp; Deployed on Vercel
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
            {featuredToolsData.map((tool, idx) => (
              <div
                key={idx}
                className="bg-[#1f242d] p-5 rounded-xl border border-[#323946] hover:border-[#00eeff] transition-all duration-200 flex flex-col justify-between space-y-3 group hover:shadow-[0_0_15px_rgba(0,238,255,0.2)]"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#00eeff] uppercase">{tool.category}</span>
                    <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-pulse"></span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-[#00eeff] transition-colors">
                    {tool.application}
                  </h4>
                  <p className="text-xs text-gray-300 font-sans leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#323946] flex items-center justify-between">
                  <a
                    href={tool.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#00eeff] hover:underline"
                  >
                    <span>Live Demo 🚀</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={tool.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub 💻</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-mono text-gray-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#00eeff]" />
            Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#00eeff] text-[#1f242d] font-bold shadow-[0_0_12px_#00eeff]'
                  : 'bg-[#323946] text-gray-300 hover:text-white hover:border-[#00eeff]/40 border border-[#323946]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3-Column Projects Grid with Clean Responsive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#323946] rounded-2xl border border-[#323946] hover:border-[#00eeff] transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(0,238,255,0.25)]"
            >
              {/* Card Header & Preview Graphic Container */}
              <div>
                <div className="h-44 bg-[#1f242d] p-4 flex flex-col justify-between border-b border-[#323946] relative overflow-hidden group-hover:border-[#00eeff]/40 transition-colors">
                  <div className="flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#323946] text-[#00eeff] border border-[#00eeff]/30 shadow-xs">
                      {project.category}
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">{project.year}</span>
                  </div>

                  {/* Visual Project Card Graphic / Mockup Banner */}
                  <div className="my-auto text-center space-y-1 z-10">
                    <div className="w-10 h-10 rounded-lg bg-[#323946] text-[#00eeff] mx-auto flex items-center justify-center border border-[#00eeff]/30 shadow-sm group-hover:scale-110 transition-transform">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-white block">
                      {project.title}
                    </span>
                  </div>

                  {/* Bottom Tech Pills inside graphic */}
                  <div className="flex flex-wrap gap-1 z-10">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#323946]/80 text-gray-300 border border-[#323946]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Subtle Background Glow Accent */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00eeff]/5 to-transparent pointer-events-none"></div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 space-y-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00eeff] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1f242d]">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="bg-[#1f242d] p-2 rounded-lg border border-[#323946]">
                        <span className="text-[10px] font-mono text-gray-400 block">{m.label}:</span>
                        <span className="text-xs font-mono font-bold text-[#00eeff] block">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 sm:p-6 pt-0 border-t border-[#1f242d] mt-4 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectProject(project)}
                  className="px-3.5 py-2 rounded-lg bg-[#1f242d] text-white hover:text-[#00eeff] hover:border-[#00eeff] border border-[#323946] text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Case Study</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={
                      project.id === 'brand-identity-generator'
                        ? 'https://brand-identity-five.vercel.app/'
                        : project.id === 'toolkit-pro'
                        ? 'https://toolkit-pro-chi.vercel.app/'
                        : 'https://app-tool.vercel.app/shopping.html'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#00eeff] text-[#1f242d] hover:bg-[#55f3ff] hover:shadow-[0_0_12px_#00eeff] transition-all font-mono text-xs font-bold flex items-center gap-1"
                    title="Open Live Web Application Demo"
                  >
                    <span>Demo 🚀</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

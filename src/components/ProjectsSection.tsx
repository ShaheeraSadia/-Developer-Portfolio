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
    <section id="projects" className="py-20 bg-[#12161f] text-white border-b border-[#2a3245]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#2a3245]">
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
        <div className="mb-12 bg-[#1b202c] p-6 sm:p-7 rounded-2xl border border-[#00eeff]/30 shadow-[0_0_20px_rgba(0,238,255,0.15)]">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#2a3245] text-xs font-mono">
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 text-[#00eeff]" />
              <span className="font-bold text-white uppercase tracking-wider">Verified Live Production Demos</span>
            </div>
            <span className="text-[#00eeff] font-semibold bg-[#12161f] px-2.5 py-1 rounded-full border border-[#00eeff]/30">
              Live &amp; Deployed on Vercel
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
            {featuredToolsData.map((tool, idx) => (
              <div
                key={idx}
                className="bg-[#12161f] p-5 rounded-xl border border-[#2a3245] hover:border-[#00eeff] transition-all duration-200 flex flex-col justify-between space-y-3 group hover:shadow-[0_0_15px_rgba(0,238,255,0.2)]"
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

                <div className="pt-3 border-t border-[#2a3245] flex items-center justify-between">
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
                  ? 'bg-[#00eeff] text-[#12161f] font-bold shadow-[0_0_12px_#00eeff]'
                  : 'bg-[#1b202c] text-gray-300 hover:text-white hover:border-[#00eeff]/40 border border-[#2a3245]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Table & Cards List (Cyan Dark Variant) */}
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
                className="bg-[#1b202c] border border-[#2a3245] rounded-xl p-6 transition-all hover:border-[#00eeff]/50 hover:shadow-[0_0_20px_rgba(0,238,255,0.15)] group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  {/* Left Project Info */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-white font-bold text-lg group-hover:text-[#00eeff] transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-[10px] font-mono text-[#00eeff] bg-[#00eeff]/10 border border-[#00eeff]/30 px-2 py-0.5 rounded">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-gray-400">
                        ({project.year})
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm max-w-2xl font-sans leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="bg-[#12161f] text-gray-300 border border-[#2a3245] px-2.5 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Key Metrics row */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-gray-400">
                          <span>{m.label}:</span>
                          <span className="text-[#00eeff] font-bold">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="bg-[#12161f] hover:text-[#00eeff] text-gray-300 border border-[#2a3245] hover:border-[#00eeff] font-mono text-xs px-3.5 py-2.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Case Study</span>
                    </button>

                    <a 
                      href={liveUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-[#00eeff] hover:bg-[#00cce0] text-[#12161f] font-bold text-xs font-mono px-4 py-2.5 rounded-lg shadow-[0_0_10px_#00eeff] hover:shadow-[0_0_20px_#00eeff] transition-all flex items-center gap-1.5"
                    >
                      <span>Live Demo 🚀</span>
                    </a>

                    <a 
                      href="https://github.com/ShaheeraSadia" 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-[#12161f] hover:text-[#00eeff] text-gray-300 border border-[#2a3245] hover:border-[#00eeff] font-mono text-xs px-4 py-2.5 rounded-lg transition-all flex items-center gap-1"
                    >
                      <span>GitHub 💻</span>
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

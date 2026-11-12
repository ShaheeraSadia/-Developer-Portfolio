import React from 'react';
import {
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Sparkles
} from 'lucide-react';
import { developerConfig, featuredToolsData } from '../data/portfolioData';
import { ResumeDownloadButton } from './ResumeDownloadButton';
import { XIcon } from './icons/XIcon';

interface FooterProps {
  activeSection?: string;
  onOpenResume?: () => void;
  onNavigate?: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ activeSection = 'home', onOpenResume, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="main-footer" className="w-full bg-[#0a0d12] text-[#f8fafc] pt-14 pb-16 px-4 sm:px-6 lg:px-8 border-t border-[#1e293b]">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Narrative */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-blue-500/40 bg-[#0a0d12] shadow-sm shrink-0">
                <img
                  src="/assets/aistudio/OIP_3c866659.jpg"
                  alt="Shaheera Sadia"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Shaheera <span className="text-blue-500 font-normal">Sadia</span>
              </span>
            </div>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed font-sans">
              Front-End Developer engineering fast, client-side web utilities and accessible interfaces with React, JavaScript, Vite, and Tailwind CSS.
            </p>

            <div className="pt-2 flex items-center gap-2.5">
              <a
                href={developerConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0f172a] border border-[#1e293b] text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-[#1e293b] flex items-center justify-center transition-all duration-200"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={developerConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0f172a] border border-[#1e293b] text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-[#1e293b] flex items-center justify-center transition-all duration-200"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={developerConfig.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0f172a] border border-[#1e293b] text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-[#1e293b] flex items-center justify-center transition-all duration-200"
                title="X (Twitter)"
              >
                <XIcon className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${developerConfig.email}`}
                className="w-9 h-9 rounded-lg bg-[#0f172a] border border-[#1e293b] text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-[#1e293b] flex items-center justify-center transition-all duration-200"
                title={developerConfig.email}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Featured Projects Column */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
              Featured Work
            </span>
            <ul className="space-y-2 text-sm text-slate-300">
              {featuredToolsData.map((tool) => (
                <li key={tool.application}>
                  <a
                    href={tool.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span>{tool.application}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
              Navigation
            </span>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Overview &amp; Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('projects')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Featured Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('skills')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Skills Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  About &amp; Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Contact &amp; Hire
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#1e293b] text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()}</span>
            <span className="text-white font-semibold">{developerConfig.name}</span>
            <span>— Front-End Developer</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <ResumeDownloadButton variant="outline" onOpenModal={onOpenResume} />

            <button
              id="footer-back-to-top-btn"
              onClick={scrollToTop}
              className="hover:text-blue-400 transition-colors flex items-center gap-1 group cursor-pointer text-slate-300 font-medium"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

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
    <footer id="main-footer" className="w-full bg-[#0a0d12] text-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8 border-t border-[#1e293b]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-blue-500/40 bg-[#0a0d12] shadow-sm shrink-0">
            <img
              src="/assets/aistudio/OIP_3c866659.jpg"
              alt="Shaheera Sadia"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-sm font-bold text-white block">
              Shaheera Sadia
            </span>
            <span className="text-xs text-slate-400 font-sans">
              Front-End Developer • Since 2021
            </span>
          </div>
        </div>

        {/* Social Icons Bar */}
        <div className="flex items-center gap-2">
          <a
            href={developerConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-[#0f172a] border border-[#1e293b] text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-[#1e293b] flex items-center justify-center transition-all duration-200"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={developerConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-[#0f172a] border border-[#1e293b] text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-[#1e293b] flex items-center justify-center transition-all duration-200"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={developerConfig.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-[#0f172a] border border-[#1e293b] text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-[#1e293b] flex items-center justify-center transition-all duration-200"
            title="X (Twitter)"
          >
            <XIcon className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${developerConfig.email}`}
            className="w-9 h-9 rounded-xl bg-[#0f172a] border border-[#1e293b] text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-[#1e293b] flex items-center justify-center transition-all duration-200"
            title={developerConfig.email}
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Action & Back to Top */}
        <div className="flex items-center gap-4">
          <ResumeDownloadButton variant="compact" onOpenModal={onOpenResume} />
          <button
            id="footer-back-to-top-btn"
            onClick={scrollToTop}
            className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-xs text-slate-300 font-medium cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 mt-6 border-t border-[#1e293b]/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
        <span>© {new Date().getFullYear()} Shaheera Sadia. All rights reserved.</span>
        <span>shaheera-sadia.vercel.app</span>
      </div>
    </footer>
  );
};

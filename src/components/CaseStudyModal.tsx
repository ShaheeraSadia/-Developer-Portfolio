import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  X,
  ExternalLink,
  Github,
  Check,
  Copy,
  Activity,
  Layers,
  Cpu,
  Terminal,
  ArrowUpRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Project } from '../types';
import { projectsData } from '../data/portfolioData';
import { useToast } from './Toast';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onSelectProject,
}) => {
  const { showToast } = useToast();
  const [codeCopied, setCodeCopied] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentIndex = project
    ? projectsData.findIndex((p) => p.id === project.id)
    : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < projectsData.length - 1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0 && onSelectProject) {
      onSelectProject(projectsData[currentIndex - 1]);
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex, onSelectProject]);

  const handleNext = useCallback(() => {
    if (currentIndex < projectsData.length - 1 && onSelectProject) {
      onSelectProject(projectsData[currentIndex + 1]);
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex, onSelectProject]);

  useEffect(() => {
    if (!project) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [project, onClose, onSelectProject, currentIndex, handlePrev, handleNext]);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCodeCopied(true);
      showToast('Code snippet copied to clipboard');
      setTimeout(() => setCodeCopied(false), 2500);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      id="case-study-modal-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      aria-keyshortcuts="Escape ArrowLeft ArrowRight"
    >
      <div
        id="case-study-modal-container"
        className="relative w-full max-w-4xl bg-[#12161f] text-white rounded-2xl border border-[#00eeff]/40 shadow-[0_0_40px_rgba(0,238,255,0.2)] overflow-hidden my-6 max-h-[92vh] flex flex-col"
      >
        {/* Header Metadata & Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[#2a3245] bg-[#1b202c]">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[#12161f] border border-[#00eeff]/30 text-xs font-mono text-[#00eeff] font-semibold">
              {project.category}
            </span>
            <span className="text-xs font-mono text-gray-300 hidden sm:inline">
              {project.year} • {project.role}
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs">
            <div className="flex items-center gap-1 bg-[#12161f] border border-[#2a3245] rounded-lg p-0.5">
              <button
                id="case-study-prev-btn"
                onClick={handlePrev}
                disabled={!hasPrev}
                aria-label="Previous project"
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors cursor-pointer ${
                  hasPrev
                    ? 'text-white hover:bg-[#1b202c] hover:text-[#00eeff]'
                    : 'text-gray-600 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Prev</span>
              </button>

              <span className="text-[11px] text-gray-400 px-1 font-mono">
                {currentIndex >= 0 ? `${currentIndex + 1}/${projectsData.length}` : ''}
              </span>

              <button
                id="case-study-next-btn"
                onClick={handleNext}
                disabled={!hasNext}
                aria-label="Next project"
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors cursor-pointer ${
                  hasNext
                    ? 'text-white hover:bg-[#1b202c] hover:text-[#00eeff]'
                    : 'text-gray-600 cursor-not-allowed'
                }`}
              >
                <span className="hidden md:inline">Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* External Links */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-bold rounded-lg bg-[#00eeff] text-[#12161f] hover:bg-[#55f3ff] hover:shadow-[0_0_10px_#00eeff] transition-all"
                title="Open Live Application"
              >
                <span>Live Demo 🚀</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-gray-400 hover:text-white hover:bg-[#12161f] rounded-lg transition-colors"
                title="View Source on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {/* Close Button */}
            <button
              id="close-case-study-modal-btn"
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-[#12161f] rounded-lg transition-colors cursor-pointer"
              aria-label="Close case study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div ref={scrollContainerRef} className="p-6 sm:p-8 overflow-y-auto space-y-8 font-sans bg-[#12161f]">
          {/* Title & Tagline */}
          <div className="space-y-2 border-b border-[#2a3245] pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2 id="case-study-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {project.title}
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              {project.tagline}
            </p>

            {/* Metrics Chips */}
            <div className="flex flex-wrap gap-2.5 pt-3">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1b202c] border border-[#2a3245] text-xs font-mono"
                >
                  <span className="text-gray-400">{m.label}:</span>
                  <span className="font-bold text-[#00eeff]">{m.value}</span>
                  {m.change && <span className="text-[11px] text-[#00eeff]">({m.change})</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Overview & Problem Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00eeff]" />
                <span>The Architectural Challenge</span>
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {project.summary}
              </p>

              <div className="space-y-2 pt-2">
                <p className="text-xs font-mono text-[#00eeff] uppercase font-bold">Core Constraints &amp; Goals:</p>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00eeff] mt-2 shrink-0"></span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Stack & Context Sidebar */}
            <div className="lg:col-span-5 space-y-4 bg-[#1b202c] p-5 rounded-2xl border border-[#2a3245]">
              <h4 className="text-xs font-mono uppercase font-bold text-white flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#00eeff]" />
                <span>Technical Specifications</span>
              </h4>

              <div className="space-y-2.5 text-xs font-mono">
                <div>
                  <span className="text-gray-400 block mb-1">context:</span>
                  <span className="text-white font-medium">{project.clientOrContext}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">stack:</span>
                  <div className="flex flex-wrap gap-1">
                    {project.stack.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-[#12161f] border border-[#2a3245] text-[#00eeff] text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">status:</span>
                  <span className="text-[#00eeff] font-medium">production_validated</span>
                </div>
                {project.liveUrl && (
                  <div className="pt-1">
                    <span className="text-gray-400 block mb-1">live_url:</span>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00eeff] underline break-all text-[11px]"
                    >
                      {project.liveUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Key Architectural Solutions */}
          <div className="space-y-3 border-t border-[#2a3245] pt-6">
            <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#00eeff]" />
              <span>Architectural Decisions &amp; Implementation</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.architecturalDecisions.map((dec, i) => (
                <div key={i} className="p-4 bg-[#1b202c] rounded-xl border border-[#2a3245] space-y-2">
                  <span className="text-xs font-mono font-bold text-[#00eeff]">0{i + 1}_DECISION</span>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{dec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippet Spotlight */}
          {project.codeSnippet && (
            <div className="space-y-3 border-t border-[#2a3245] pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#00eeff]" />
                  <span>Core Implementation ({project.codeSnippet.filename})</span>
                </h3>
                <button
                  id="copy-case-study-code-btn"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-lg bg-[#1b202c] border border-[#2a3245] hover:border-[#00eeff] text-[#00eeff] transition-colors cursor-pointer"
                >
                  {codeCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{codeCopied ? 'copied' : 'copy_code'}</span>
                </button>
              </div>

              <div className="rounded-xl bg-[#0d1017] text-white p-4 font-mono text-xs overflow-x-auto border border-[#2a3245]">
                <pre className="text-[#00eeff] leading-relaxed font-mono">
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>
              <p className="text-xs text-gray-400 font-mono">
                // {project.codeSnippet.explanation}
              </p>
            </div>
          )}

          {/* Business Impact */}
          <div className="p-5 rounded-2xl bg-[#1b202c] border border-[#2a3245] space-y-1">
            <h4 className="text-xs font-mono uppercase font-bold text-[#00eeff]">Impact Summary</h4>
            <p className="text-sm text-gray-200 font-medium leading-relaxed">
              {project.impactDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

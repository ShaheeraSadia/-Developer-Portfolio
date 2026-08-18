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
  CornerDownLeft,
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

  // Find index in projectsData
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

  // Keyboard navigation & accessibility handlers
  useEffect(() => {
    if (!project) return;

    // Body scroll lock
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't hijack if typing in an active text input or textarea
      const activeTag = (document.activeElement?.tagName || '').toUpperCase();
      const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag);

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (isTyping) return;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentIndex > 0 && onSelectProject) {
          onSelectProject(projectsData[currentIndex - 1]);
          scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentIndex < projectsData.length - 1 && onSelectProject) {
          onSelectProject(projectsData[currentIndex + 1]);
          scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [project, onClose, onSelectProject, currentIndex]);

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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      aria-keyshortcuts="Escape ArrowLeft ArrowRight"
    >
      <div
        id="case-study-modal-container"
        className="relative w-full max-w-4xl bg-[#FAFAF8] text-[#14151A] rounded-xl border border-[#E7E6E2] shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header Metadata & Keyboard Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[#E7E6E2] bg-[#F4F3EF]">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="px-2 py-0.5 rounded bg-white border border-[#D5D4CE] text-xs font-mono text-[#2F5CFF] font-medium">
              {project.category}
            </span>
            <span className="text-xs font-mono text-[#64666E] hidden sm:inline">
              {project.year} • {project.role}
            </span>
          </div>

          {/* Navigation Controls & Keyboard Badges */}
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs">
            {/* Prev / Next Project Buttons */}
            <div className="flex items-center gap-1 bg-white border border-[#D5D4CE] rounded-lg p-0.5 shadow-2xs">
              <button
                id="case-study-prev-btn"
                onClick={handlePrev}
                disabled={!hasPrev}
                aria-label="Previous project (Left arrow key)"
                title={hasPrev ? `Previous: ${projectsData[currentIndex - 1].title} (←)` : 'No previous project'}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                  hasPrev
                    ? 'text-[#14151A] hover:bg-[#F4F3EF] hover:text-[#2F5CFF]'
                    : 'text-[#B8B7B0] cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Prev</span>
                <kbd className="hidden sm:inline-block px-1 py-0.2 bg-[#F4F3EF] border border-[#E7E6E2] rounded text-[10px] text-[#64666E]">
                  ←
                </kbd>
              </button>

              <span className="text-[11px] text-[#64666E] px-1 font-mono font-medium">
                {currentIndex >= 0 ? `${currentIndex + 1}/${projectsData.length}` : ''}
              </span>

              <button
                id="case-study-next-btn"
                onClick={handleNext}
                disabled={!hasNext}
                aria-label="Next project (Right arrow key)"
                title={hasNext ? `Next: ${projectsData[currentIndex + 1].title} (→)` : 'No next project'}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                  hasNext
                    ? 'text-[#14151A] hover:bg-[#F4F3EF] hover:text-[#2F5CFF]'
                    : 'text-[#B8B7B0] cursor-not-allowed'
                }`}
              >
                <span className="hidden md:inline">Next</span>
                <kbd className="hidden sm:inline-block px-1 py-0.2 bg-[#F4F3EF] border border-[#E7E6E2] rounded text-[10px] text-[#64666E]">
                  →
                </kbd>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* External Links */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 p-1.5 text-xs font-mono rounded bg-[#2F5CFF] text-white hover:bg-[#254BD8] transition-colors"
                title="Open Live Application"
              >
                <span>Live</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-[#64666E] hover:text-[#14151A] hover:bg-[#EAE8E2] rounded transition-colors"
                title="View Source on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {/* Close Button with Esc Badge */}
            <button
              id="close-case-study-modal-btn"
              onClick={onClose}
              className="flex items-center gap-1 p-1.5 text-[#64666E] hover:text-[#14151A] hover:bg-[#EAE8E2] rounded transition-colors"
              aria-label="Close case study (Esc)"
              title="Close (Esc)"
            >
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-white border border-[#D5D4CE] rounded text-[10px] text-[#64666E] font-mono">
                ESC
              </kbd>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div ref={scrollContainerRef} className="p-6 sm:p-8 overflow-y-auto space-y-8 font-sans">
          {/* Title & Tagline */}
          <div className="space-y-2 border-b border-[#E7E6E2] pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2 id="case-study-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-[#14151A]">
                {project.title}
              </h2>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2F5CFF] hover:underline"
                >
                  <span>launch_live_product</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            <p className="text-base sm:text-lg text-[#555761] leading-relaxed">
              {project.tagline}
            </p>

            {/* Metrics Chips */}
            <div className="flex flex-wrap gap-2.5 pt-3">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#E7E6E2] text-xs font-mono shadow-2xs"
                >
                  <span className="text-[#64666E]">{m.label}:</span>
                  <span className="font-bold text-[#2F5CFF]">{m.value}</span>
                  {m.change && <span className="text-[11px] text-[#1FAA6E]">({m.change})</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Overview & Problem Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-[#14151A] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#2F5CFF]" />
                <span>The Architectural Challenge</span>
              </h3>
              <p className="text-sm text-[#44464F] leading-relaxed">
                {project.summary}
              </p>

              <div className="space-y-2 pt-2">
                <p className="text-xs font-mono text-[#64666E] uppercase font-semibold">Core Constraints &amp; Pain Points:</p>
                <ul className="space-y-2 text-xs sm:text-sm text-[#44464F]">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2F5CFF] mt-2 shrink-0"></span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Stack & Context Sidebar */}
            <div className="lg:col-span-5 space-y-4 bg-[#F4F3EF] p-5 rounded-xl border border-[#E7E6E2]">
              <h4 className="text-xs font-mono uppercase font-bold text-[#14151A] flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#2F5CFF]" />
                <span>Technical Specifications</span>
              </h4>

              <div className="space-y-2.5 text-xs font-mono">
                <div>
                  <span className="text-[#64666E] block mb-1">context:</span>
                  <span className="text-[#14151A] font-medium">{project.clientOrContext}</span>
                </div>
                <div>
                  <span className="text-[#64666E] block mb-1">stack:</span>
                  <div className="flex flex-wrap gap-1">
                    {project.stack.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white border border-[#D5D4CE] text-[#14151A] text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[#64666E] block mb-1">status:</span>
                  <span className="text-[#1FAA6E] font-medium">production_validated</span>
                </div>
                {project.liveUrl && (
                  <div className="pt-1">
                    <span className="text-[#64666E] block mb-1">live_url:</span>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2F5CFF] underline break-all text-[11px]"
                    >
                      {project.liveUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Key Architectural Solutions */}
          <div className="space-y-3 border-t border-[#E7E6E2] pt-6">
            <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-[#14151A] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#2F5CFF]" />
              <span>Architectural Decisions &amp; Implementation</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.architecturalDecisions.map((dec, i) => (
                <div key={i} className="p-4 bg-white rounded-lg border border-[#E7E6E2] space-y-2">
                  <span className="text-xs font-mono font-bold text-[#2F5CFF]">0{i + 1}_DECISION</span>
                  <p className="text-xs sm:text-sm text-[#44464F] leading-relaxed">{dec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benchmark Before vs After (if available) */}
          {project.benchmarkComparison && (
            <div className="space-y-3 border-t border-[#E7E6E2] pt-6">
              <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-[#14151A] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#1FAA6E]" />
                <span>Quantifiable Benchmark Results</span>
              </h3>

              <div className="overflow-x-auto rounded-lg border border-[#E7E6E2] bg-white">
                <table className="w-full text-left text-xs sm:text-sm font-mono">
                  <thead className="bg-[#F4F3EF] border-b border-[#E7E6E2] text-[#64666E]">
                    <tr>
                      <th className="px-4 py-2.5 font-medium">Metric</th>
                      <th className="px-4 py-2.5 font-medium">Before Migration</th>
                      <th className="px-4 py-2.5 font-medium">After Architecture</th>
                      <th className="px-4 py-2.5 font-medium">Net Delta</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E6E2]">
                    {project.benchmarkComparison.map((bm, i) => (
                      <tr key={i} className="hover:bg-[#FAFAF8]">
                        <td className="px-4 py-2.5 font-sans font-medium text-[#14151A]">{bm.metricName}</td>
                        <td className="px-4 py-2.5 text-[#64666E] line-through">{bm.before}</td>
                        <td className="px-4 py-2.5 text-[#2F5CFF] font-bold">{bm.after}</td>
                        <td className="px-4 py-2.5 text-[#1FAA6E] font-bold">{bm.improvement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Code Snippet Spotlight */}
          {project.codeSnippet && (
            <div className="space-y-3 border-t border-[#E7E6E2] pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-[#14151A] flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#2F5CFF]" />
                  <span>Core Implementation Snippet ({project.codeSnippet.filename})</span>
                </h3>
                <button
                  id="copy-case-study-code-btn"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded bg-[#F4F3EF] border border-[#D5D4CE] hover:bg-[#EAE8E2] text-[#14151A] transition-colors"
                >
                  {codeCopied ? <Check className="w-3.5 h-3.5 text-[#1FAA6E]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{codeCopied ? 'copied' : 'copy_code'}</span>
                </button>
              </div>

              <div className="rounded-lg bg-[#14151A] text-[#FAFAF8] p-4 font-mono text-xs overflow-x-auto border border-[#2B2D37] shadow-inner">
                <pre className="text-emerald-400/90 leading-relaxed font-mono">
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>
              <p className="text-xs text-[#64666E] font-mono">
                // {project.codeSnippet.explanation}
              </p>
            </div>
          )}

          {/* Business & Developer Impact */}
          <div className="p-5 rounded-xl bg-[#F4F3EF] border border-[#E7E6E2] space-y-1">
            <h4 className="text-xs font-mono uppercase font-bold text-[#2F5CFF]">Impact Summary</h4>
            <p className="text-sm text-[#14151A] font-medium leading-relaxed">
              {project.impactDescription}
            </p>
          </div>
        </div>

        {/* Modal Footer with Keyboard Navigation Hints */}
        <div className="px-6 py-3.5 bg-[#F4F3EF] border-t border-[#E7E6E2] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#64666E]">
            <span className="hidden sm:inline">Navigate:</span>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-[#D5D4CE] rounded text-[10px] text-[#14151A]">
                ←
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-[#D5D4CE] rounded text-[10px] text-[#14151A]">
                →
              </kbd>
              <span className="text-[11px] text-[#64666E]">arrow keys</span>
            </div>
            <span className="text-[#9E9EA7]">•</span>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-[#D5D4CE] rounded text-[10px] text-[#14151A]">
                Esc
              </kbd>
              <span className="text-[11px] text-[#64666E]">to close</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="case-study-prev-bottom-btn"
              onClick={handlePrev}
              disabled={!hasPrev}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                hasPrev
                  ? 'bg-white border-[#D5D4CE] text-[#14151A] hover:bg-[#EAE8E2]'
                  : 'bg-transparent border-transparent text-[#B8B7B0] cursor-not-allowed'
              }`}
            >
              ← Prev Project
            </button>

            <button
              id="case-study-next-bottom-btn"
              onClick={handleNext}
              disabled={!hasNext}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                hasNext
                  ? 'bg-white border-[#D5D4CE] text-[#14151A] hover:bg-[#EAE8E2]'
                  : 'bg-transparent border-transparent text-[#B8B7B0] cursor-not-allowed'
              }`}
            >
              Next Project →
            </button>

            <button
              id="close-case-study-bottom-btn"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#14151A] text-white text-xs font-mono hover:bg-[#2F5CFF] transition-colors"
            >
              close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

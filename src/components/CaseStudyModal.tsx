import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  X,
  ExternalLink,
  Github,
  Check,
  Copy,
  Layers,
  Cpu,
  Terminal,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div
        id="case-study-modal-container"
        className="relative w-full max-w-4xl bg-[#0f172a] text-[#f8fafc] rounded-2xl border border-[#1e293b] shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
      >
        {/* Header Metadata & Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-[#1e293b] bg-[#0a0d12]">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#0f172a] border border-[#1e293b] text-xs font-mono text-[#3b82f6] font-semibold">
              {project.category}
            </span>
            <span className="text-xs font-mono text-[#94a3b8] hidden sm:inline">
              {project.year} • {project.role}
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1 bg-[#0f172a] border border-[#1e293b] rounded-lg p-0.5 font-mono">
              <button
                id="case-study-prev-btn"
                onClick={handlePrev}
                disabled={!hasPrev}
                aria-label="Previous project"
                className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  hasPrev
                    ? 'text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b]'
                    : 'text-slate-600 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Prev</span>
              </button>

              <span className="text-[11px] text-[#94a3b8] px-1 font-mono">
                {currentIndex >= 0 ? `${currentIndex + 1}/${projectsData.length}` : ''}
              </span>

              <button
                id="case-study-next-btn"
                onClick={handleNext}
                disabled={!hasNext}
                aria-label="Next project"
                className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  hasNext
                    ? 'text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b]'
                    : 'text-slate-600 cursor-not-allowed'
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
                className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#2563eb] hover:bg-[#3b82f6] text-white shadow-sm transition-all"
                title="Open Live Application"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#0f172a] border border-[#1e293b] rounded-lg transition-colors"
                title="View Source on GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Close Button */}
            <button
              id="close-case-study-modal-btn"
              onClick={onClose}
              className="p-2 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#0f172a] border border-[#1e293b] rounded-lg transition-colors cursor-pointer"
              aria-label="Close case study"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div ref={scrollContainerRef} className="p-6 sm:p-8 overflow-y-auto space-y-8 font-sans bg-[#0f172a]">
          {/* Title & Tagline */}
          <div className="space-y-2 border-b border-[#1e293b] pb-6">
            <h2 id="case-study-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f8fafc]">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed font-sans">
              {project.tagline}
            </p>

            {/* Metrics Chips */}
            <div className="flex flex-wrap gap-2.5 pt-3">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0a0d12] border border-[#1e293b] text-xs font-mono"
                >
                  <span className="text-[#94a3b8]">{m.label}:</span>
                  <span className="font-bold text-[#3b82f6]">{m.value}</span>
                  {m.change && <span className="text-[11px] text-slate-500">({m.change})</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Overview & Problem Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-semibold text-[#f8fafc] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#3b82f6]" />
                <span>The Challenge &amp; Problem Statement</span>
              </h3>
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed font-sans">
                {project.summary}
              </p>

              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-mono text-[#3b82f6] uppercase tracking-wider font-semibold">Core Engineering Goals:</p>
                <div className="space-y-2 text-xs sm:text-sm text-[#94a3b8]">
                  {project.challenges.map((c, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5" />
                      <span className="text-[#f8fafc]">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack & Context Sidebar */}
            <div className="lg:col-span-5 space-y-4 bg-[#0a0d12] p-5 rounded-2xl border border-[#1e293b]">
              <h4 className="text-xs font-mono uppercase font-bold text-[#f8fafc] flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#3b82f6]" />
                <span>Technical Specifications</span>
              </h4>

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block mb-1">Context:</span>
                  <span className="text-[#f8fafc] font-medium">{project.clientOrContext}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Stack:</span>
                  <div className="flex flex-wrap gap-1">
                    {project.stack.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-[#0f172a] border border-[#1e293b] text-[#94a3b8] text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Status:</span>
                  <span className="text-[#22c55e] font-medium">Production Verified</span>
                </div>
                {project.liveUrl && (
                  <div className="pt-1">
                    <span className="text-slate-500 block mb-1">Live URL:</span>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3b82f6] hover:underline break-all text-[11px]"
                    >
                      {project.liveUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Key Architectural Solutions */}
          <div className="space-y-3 border-t border-[#1e293b] pt-6">
            <h3 className="text-sm font-semibold text-[#f8fafc] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#3b82f6]" />
              <span>Architectural Decisions &amp; Implementation</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.architecturalDecisions.map((dec, i) => (
                <div key={i} className="p-4 bg-[#0a0d12] rounded-xl border border-[#1e293b] space-y-2">
                  <span className="text-xs font-mono font-bold text-[#3b82f6]">Decision 0{i + 1}</span>
                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed font-sans">{dec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippet Spotlight */}
          {project.codeSnippet && (
            <div className="space-y-3 border-t border-[#1e293b] pt-6">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#f8fafc] flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#3b82f6]" />
                  <span>{project.codeSnippet.filename}</span>
                </span>
                <button
                  id="copy-case-study-code-btn"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#0a0d12] border border-[#1e293b] hover:border-slate-600 text-[#94a3b8] hover:text-[#f8fafc] transition-colors cursor-pointer"
                >
                  {codeCopied ? <Check className="w-3.5 h-3.5 text-[#22c55e]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{codeCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="rounded-xl bg-[#0a0d12] text-[#f8fafc] p-4 font-mono text-xs overflow-x-auto border border-[#1e293b]">
                <pre className="text-[#f8fafc] leading-relaxed font-mono">
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>
              <p className="text-xs text-[#94a3b8] font-sans">
                {project.codeSnippet.explanation}
              </p>
            </div>
          )}

          {/* Impact Statement */}
          <div className="p-5 rounded-2xl bg-[#0a0d12] border border-[#1e293b] space-y-1">
            <h4 className="text-xs font-mono uppercase font-bold text-[#3b82f6]">Impact &amp; Performance Summary</h4>
            <p className="text-sm text-[#f8fafc] font-medium leading-relaxed font-sans">
              {project.impactDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

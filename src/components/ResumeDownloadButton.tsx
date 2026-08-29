import React, { useState, useRef, useEffect } from 'react';
import {
  Download,
  FileText,
  ChevronDown,
  FileCode,
  FileCheck,
  Printer,
  Eye,
  Check
} from 'lucide-react';
import { downloadResume } from '../utils/resumeDownload';
import { useToast } from './Toast';

export interface ResumeDownloadButtonProps {
  variant?: 'primary' | 'compact' | 'outline' | 'split' | 'hero';
  className?: string;
  onOpenModal?: () => void;
  showPreviewOption?: boolean;
}

export const ResumeDownloadButton: React.FC<ResumeDownloadButtonProps> = ({
  variant = 'primary',
  className = '',
  onOpenModal,
  showPreviewOption = true,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleDownload = (format: 'txt' | 'md' | 'html' | 'pdf', label: string) => {
    try {
      downloadResume(format);
      setDownloadSuccess(format);
      setDropdownOpen(false);

      if (format === 'pdf') {
        showToast('Opening print dialog to Save as PDF...');
      } else {
        const ext = format === 'txt' ? '_ATS.txt' : `.${format}`;
        showToast(`Resume downloaded: Shaheera_Sadia_Resume${ext}`);
      }

      setTimeout(() => setDownloadSuccess(null), 2500);
    } catch {
      showToast('Download initiated');
    }
  };

  const formatOptions = [
    {
      id: 'txt',
      label: 'ATS Plain Text (.txt)',
      sub: 'Clean text formatted for Workday, Greenhouse & Taleo',
      icon: FileCheck,
      badge: 'Recommended',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      action: () => handleDownload('txt', 'ATS Plain Text'),
    },
    {
      id: 'pdf',
      label: 'Print / Save as PDF',
      sub: 'Formatted printable curriculum vitae layout',
      icon: Printer,
      badge: 'Standard PDF',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      action: () => handleDownload('pdf', 'Print / PDF'),
    },
    {
      id: 'md',
      label: 'Markdown Document (.md)',
      sub: 'GitHub flavored markdown for developers & tech leads',
      icon: FileCode,
      badge: 'Dev Format',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      action: () => handleDownload('md', 'Markdown Document'),
    },
    {
      id: 'html',
      label: 'Standalone HTML (.html)',
      sub: 'Self-contained document with responsive typography',
      icon: FileText,
      badge: 'Browser Ready',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      action: () => handleDownload('html', 'Standalone HTML'),
    },
  ];

  // Render based on variant
  if (variant === 'hero') {
    return (
      <div className={`relative inline-flex items-center ${className}`} ref={dropdownRef}>
        <div className="inline-flex rounded-xl shadow-md shadow-blue-900/30 overflow-hidden">
          {/* Main Action: Primary Download Trigger */}
          <button
            type="button"
            id="hero-download-resume-btn"
            onClick={() => handleDownload('txt', 'ATS Plain Text')}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm sm:text-base transition-all duration-150 flex items-center gap-2.5 cursor-pointer"
            title="Download ATS Plain Text Resume"
          >
            {downloadSuccess ? (
              <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
            ) : (
              <Download className="w-4 h-4 stroke-[2.5]" />
            )}
            <span>{downloadSuccess ? 'Downloaded!' : 'Download Resume'}</span>
          </button>

          {/* Dropdown Menu Arrow to pick other formats */}
          <button
            type="button"
            id="hero-download-options-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            aria-label="Select resume download format"
            className="px-3 py-3 bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white border-l border-blue-500/40 transition-colors flex items-center justify-center cursor-pointer"
            title="Choose format (.txt, .pdf, .md, .html)"
          >
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div
            id="resume-format-dropdown-hero"
            className="absolute left-0 top-full mt-2 w-80 sm:w-96 bg-[#0f172a] border border-[#1e293b] rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
          >
            <div className="px-3 py-2 border-b border-[#1e293b] mb-1 flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                Choose Download Format
              </span>
              <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                ATS Ready
              </span>
            </div>

            <div className="space-y-1">
              {formatOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={opt.action}
                    className="w-full p-2.5 rounded-xl hover:bg-[#1e293b] text-left transition-colors flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-[#0a0d12] text-blue-400 border border-[#1e293b] group-hover:border-blue-500/40 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="grow min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-100 group-hover:text-white">
                          {opt.label}
                        </span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${opt.badgeColor}`}>
                          {opt.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 group-hover:text-slate-300 font-sans leading-relaxed">
                        {opt.sub}
                      </p>
                    </div>
                  </button>
                );
              })}

              {showPreviewOption && onOpenModal && (
                <div className="pt-1.5 border-t border-[#1e293b] mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenModal();
                    }}
                    className="w-full p-2.5 rounded-xl bg-[#0a0d12] hover:bg-[#1e293b] text-left transition-colors flex items-center justify-between text-xs font-medium text-slate-300 hover:text-white border border-[#1e293b] cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Eye className="w-3.5 h-3.5 text-blue-400" />
                      <span>Preview Styled Interactive CV</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">Modal View →</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Compact variant (For Navbar / Header)
  if (variant === 'compact') {
    return (
      <div className={`relative inline-flex items-center ${className}`} ref={dropdownRef}>
        <div className="inline-flex rounded-lg overflow-hidden border border-[#1e293b] bg-[#0f172a]">
          <button
            type="button"
            id="nav-download-resume-btn"
            onClick={() => handleDownload('txt', 'ATS Plain Text')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white hover:bg-[#1e293b] transition-colors cursor-pointer"
            title="Download ATS Plain Text Resume"
          >
            {downloadSuccess ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Download className="w-3.5 h-3.5 text-blue-400" />
            )}
            <span>{downloadSuccess ? 'Downloaded' : 'Download CV'}</span>
          </button>

          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-1.5 py-1.5 text-slate-400 hover:text-white hover:bg-[#1e293b] border-l border-[#1e293b] transition-colors cursor-pointer"
            aria-label="More download options"
          >
            <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-72 bg-[#0f172a] border border-[#1e293b] rounded-xl shadow-xl p-2 z-50 animate-in fade-in duration-100">
            <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-400 border-b border-[#1e293b] mb-1">
              Select Resume Format
            </div>
            {formatOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={opt.action}
                className="w-full px-2.5 py-2 rounded-lg text-left hover:bg-[#1e293b] transition-colors flex items-center justify-between text-xs text-slate-200 cursor-pointer"
              >
                <span className="font-medium">{opt.label}</span>
                <span className={`text-[9px] font-mono px-1 rounded ${opt.badgeColor}`}>
                  {opt.badge}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Outline variant (For About / Experience / Section banners)
  return (
    <div className={`relative inline-flex items-center ${className}`} ref={dropdownRef}>
      <button
        type="button"
        id="resume-download-btn-outline"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-white font-medium text-xs sm:text-sm transition-all duration-150 cursor-pointer"
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>Download Resume (.txt / .pdf)</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {dropdownOpen && (
        <div className="absolute left-0 top-full mt-2 w-80 bg-[#0f172a] border border-[#1e293b] rounded-xl shadow-xl p-2 z-50 animate-in fade-in duration-100">
          <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase text-slate-400 border-b border-[#1e293b] mb-1">
            Choose Resume File Format
          </div>
          {formatOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={opt.action}
                className="w-full p-2 rounded-lg text-left hover:bg-[#1e293b] transition-colors flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer"
              >
                <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="grow">
                  <div className="font-semibold text-slate-100">{opt.label}</div>
                  <div className="text-[10px] text-slate-400">{opt.sub}</div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

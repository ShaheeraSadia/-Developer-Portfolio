import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText, Briefcase, GraduationCap, Award } from 'lucide-react';
import { developerConfig, experienceData, skillCategories } from '../data/portfolioData';
import { useToast } from './Toast';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyMarkdown = () => {
    const markdown = `# ${developerConfig.name}
**${developerConfig.role}** | ${developerConfig.location} | ${developerConfig.email}
GitHub: ${developerConfig.github} | LinkedIn: ${developerConfig.linkedin}

---

## Summary
Front-End Developer with over 5 years of experience building user-centric interfaces, performance-driven web tools, and responsive mobile/web applications. Specialized in React, JavaScript (ES6+), modern CSS architectures, and client-side browser capabilities (Web Workers) delivering zero server latency and total privacy.

---

## Experience
${experienceData
  .map(
    (exp) => `### ${exp.role} — ${exp.company}
*${exp.period} | ${exp.location}*
${exp.summary}
${exp.achievements.map((a) => `- ${a}`).join('\n')}
**Key Technologies:** ${exp.technologies.join(', ')}
`
  )
  .join('\n\n')}

---

## Core Skills
${skillCategories
  .map(
    (cat) => `### ${cat.category}
${cat.skills.map((s) => `- **${s.name}** (${s.level}, ${s.experienceYears}): ${s.focus}`).join('\n')}
`
  )
  .join('\n')}
`;

    navigator.clipboard.writeText(markdown);
    setCopied(true);
    showToast('Resume copied to clipboard in Markdown format');
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        id="resume-modal-content"
        className="relative w-full max-w-4xl bg-[#0f172a] text-[#f8fafc] rounded-2xl border border-[#1e293b] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e293b] bg-[#0a0d12]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0f172a] rounded-xl border border-[#1e293b] text-[#3b82f6]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 id="resume-modal-title" className="text-sm sm:text-base font-bold text-[#f8fafc]">
                Shaheera Sadia — Curriculum Vitae
              </h2>
              <p className="text-xs text-[#94a3b8]">Front-End Developer • React &amp; Client-Side Architectures</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              id="copy-resume-markdown-btn"
              onClick={handleCopyMarkdown}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1e293b] bg-[#0f172a] text-[#94a3b8] hover:text-[#f8fafc] hover:border-slate-600 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#22c55e]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied MD' : 'Copy Markdown'}</span>
            </button>
            <button
              id="print-resume-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 font-semibold rounded-lg bg-[#2563eb] hover:bg-[#3b82f6] text-white shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              id="close-resume-modal-btn"
              onClick={onClose}
              className="p-1.5 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#0f172a] rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Printable Area */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans print:p-0 bg-[#0f172a]">
          {/* Header */}
          <div className="border-b border-[#1e293b] pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f8fafc]">
                  {developerConfig.name}
                </h1>
                <p className="text-sm text-[#3b82f6] font-semibold mt-0.5">
                  {developerConfig.role}
                </p>
              </div>
              <div className="text-xs text-[#94a3b8] space-y-0.5 font-mono">
                <p>{developerConfig.location}</p>
                <p className="text-[#3b82f6]">{developerConfig.email}</p>
                <p className="text-[#94a3b8]">{developerConfig.github}</p>
              </div>
            </div>
            <p className="text-sm text-[#94a3b8] mt-4 leading-relaxed max-w-3xl font-sans">
              Front-End Developer with over 5 years of experience building user-centric interfaces, performance-driven web tools, and responsive mobile/web applications. Journey began on freeCodeCamp in 2021 with continuous dedication to fast, accessible, privacy-first web utilities.
            </p>
          </div>

          {/* Professional Experience Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#3b82f6] uppercase tracking-wider font-bold">
              <Briefcase className="w-4 h-4" />
              <span>Professional Experience</span>
            </div>

            <div className="space-y-4">
              {experienceData.map((exp) => (
                <div key={exp.id} className="space-y-2 bg-[#0a0d12] p-5 rounded-xl border border-[#1e293b]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h3 className="text-sm sm:text-base font-bold text-[#f8fafc]">
                      {exp.role} <span className="text-[#3b82f6] font-normal">@ {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-[#94a3b8]">
                      {exp.period} | {exp.location}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed font-sans">
                    {exp.summary}
                  </p>
                  <div className="space-y-1 pt-1 font-sans">
                    {exp.achievements.map((ach, i) => (
                      <div key={i} className="text-xs text-[#94a3b8] flex items-start gap-2">
                        <span className="text-[#3b82f6]">•</span>
                        <span className="text-[#f8fafc]">{ach}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 flex flex-wrap gap-1">
                    {exp.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#0f172a] text-[#94a3b8] border border-[#1e293b]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

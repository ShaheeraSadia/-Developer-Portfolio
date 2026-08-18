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

## Executive Summary
Front-End Developer with over 5 years of experience building user-centric interfaces, performance-driven web tools, and responsive mobile/web applications. Starting on freeCodeCamp in 2021, specialized in React, JavaScript (ES6+), modern CSS architectures, and client-side browser capabilities (Web Workers & WebAssembly) delivering zero server latency and total privacy.

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        id="resume-modal-content"
        className="relative w-full max-w-4xl bg-[#12161f] text-white rounded-2xl border border-[#00eeff]/40 shadow-[0_0_40px_rgba(0,238,255,0.2)] overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a3245] bg-[#1b202c]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#12161f] rounded-xl border border-[#00eeff]/30 text-[#00eeff]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 id="resume-modal-title" className="text-base font-bold font-mono tracking-tight text-white">
                cv_shaheera_sadia_developer.pdf
              </h2>
              <p className="text-xs text-gray-300">Verified Web &amp; Mobile Developer • React &amp; Client-Side Architectures</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-resume-markdown-btn"
              onClick={handleCopyMarkdown}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg border border-[#2a3245] bg-[#12161f] text-gray-200 hover:text-[#00eeff] hover:border-[#00eeff] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00eeff]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied MD' : 'Copy MD'}</span>
            </button>
            <button
              id="print-resume-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg bg-[#00eeff] text-[#12161f] hover:bg-[#55f3ff] hover:shadow-[0_0_12px_#00eeff] transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              id="close-resume-modal-btn"
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-[#12161f] rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Printable Area */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans print:p-0 bg-[#12161f]">
          {/* Header */}
          <div className="border-b border-[#2a3245] pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {developerConfig.name}
                </h1>
                <p className="text-base text-[#00eeff] font-mono mt-1 font-bold">
                  {developerConfig.role}
                </p>
              </div>
              <div className="text-xs sm:text-sm font-mono text-gray-300 space-y-0.5">
                <p>{developerConfig.location}</p>
                <p className="text-[#00eeff]">{developerConfig.email}</p>
                <p>{developerConfig.github} • {developerConfig.linkedin}</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mt-4 leading-relaxed max-w-3xl">
              Front-End Developer with over 5 years of experience building user-centric interfaces, performance-driven web tools, and responsive mobile/web applications. Journey began on freeCodeCamp in 2021 with continuous dedication to fast, accessible, privacy-first web utilities.
            </p>
          </div>

          {/* Professional Experience Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-mono text-[#00eeff] uppercase font-bold">
              <Briefcase className="w-4 h-4" />
              <span>Professional Experience</span>
            </div>

            <div className="space-y-6">
              {experienceData.map((exp) => (
                <div key={exp.id} className="space-y-2 bg-[#1b202c] p-5 rounded-xl border border-[#2a3245]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h3 className="text-base font-bold text-white">
                      {exp.role} <span className="text-[#00eeff]">@ {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-gray-400">
                      {exp.period} | {exp.location}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    {exp.summary}
                  </p>
                  <ul className="list-disc list-inside text-xs text-gray-300 space-y-1 pt-1 font-sans">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                  <div className="pt-2 flex flex-wrap gap-1">
                    {exp.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#12161f] text-[#00eeff] border border-[#00eeff]/20">
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

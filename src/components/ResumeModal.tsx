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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        id="resume-modal-content"
        className="relative w-full max-w-4xl bg-[#FAFAF8] text-[#14151A] rounded-xl border border-[#E7E6E2] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E6E2] bg-[#F4F3EF]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded border border-[#E7E6E2]">
              <FileText className="w-5 h-5 text-[#2F5CFF]" />
            </div>
            <div>
              <h2 id="resume-modal-title" className="text-base font-semibold font-mono tracking-tight text-[#14151A]">
                cv_shaheera_sadia_front_end_developer.pdf
              </h2>
              <p className="text-xs text-[#64666E]">Verified Web &amp; Mobile Developer • React &amp; Client-Side Architectures</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-resume-markdown-btn"
              onClick={handleCopyMarkdown}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded border border-[#D5D4CE] bg-white text-[#14151A] hover:bg-[#EAE8E2] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#1FAA6E]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied MD' : 'Copy MD'}</span>
            </button>
            <button
              id="print-resume-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded bg-[#2F5CFF] text-white hover:bg-[#254BD8] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              id="close-resume-modal-btn"
              onClick={onClose}
              className="p-1.5 text-[#64666E] hover:text-[#14151A] hover:bg-[#EAE8E2] rounded transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Printable Area */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans print:p-0">
          {/* Header */}
          <div className="border-b border-[#E7E6E2] pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#14151A]">
                  {developerConfig.name}
                </h1>
                <p className="text-base text-[#2F5CFF] font-mono mt-1 font-medium">
                  {developerConfig.role}
                </p>
              </div>
              <div className="text-xs sm:text-sm font-mono text-[#64666E] space-y-0.5">
                <p>{developerConfig.location}</p>
                <p>{developerConfig.email}</p>
                <p>{developerConfig.github} • {developerConfig.linkedin}</p>
              </div>
            </div>
            <p className="text-sm text-[#44464F] mt-4 leading-relaxed max-w-3xl">
              Front-End Developer with over 5 years of experience building user-centric interfaces, performance-driven web tools, and responsive mobile/web applications. Journey began on freeCodeCamp in 2021 with continuous dedication to fast, accessible, privacy-first web utilities.
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-[#64666E] font-semibold">
              <Briefcase className="w-4 h-4 text-[#2F5CFF]" />
              <span>Professional Experience</span>
            </div>

            <div className="space-y-6">
              {experienceData.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h3 className="text-base font-bold text-[#14151A]">
                      {exp.role} <span className="text-[#2F5CFF] font-normal">@ {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-[#64666E]">{exp.period}</span>
                  </div>
                  <p className="text-xs font-mono text-[#64666E]">{exp.location} • {exp.type}</p>
                  <p className="text-sm text-[#44464F]">{exp.summary}</p>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-[#44464F] space-y-1.5 pl-1">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="leading-relaxed">
                        <span className="text-[#14151A]">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="space-y-4 border-t border-[#E7E6E2] pt-6">
            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-[#64666E] font-semibold">
              <GraduationCap className="w-4 h-4 text-[#2F5CFF]" />
              <span>Technical Specializations</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillCategories.map((cat, idx) => (
                <div key={idx} className="p-4 bg-[#F4F3EF] rounded-lg border border-[#E7E6E2]">
                  <h4 className="text-xs font-mono uppercase font-bold text-[#14151A] mb-2">{cat.category}</h4>
                  <ul className="text-xs space-y-1.5 text-[#44464F]">
                    {cat.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex justify-between items-baseline">
                        <span className="font-medium text-[#14151A]">{skill.name}</span>
                        <span className="font-mono text-[11px] text-[#64666E]">{skill.level}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Learning */}
          <div className="border-t border-[#E7E6E2] pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs font-mono text-[#64666E]">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-[#14151A] mb-1">
                <Award className="w-3.5 h-3.5 text-[#2F5CFF]" />
                <span>freeCodeCamp Certifications</span>
              </div>
              <p>Responsive Web Design &amp; JavaScript Algorithms (Since 2021)</p>
            </div>
            <div className="sm:text-right">
              <p className="font-bold text-[#14151A]">Web Accessibility &amp; Standards</p>
              <p>WCAG 2.1 AAA Practitioner • Zero-Jank UI Focus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

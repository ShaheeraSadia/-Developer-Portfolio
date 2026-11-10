import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  Code2,
  CheckCircle2,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Clock,
  ChevronDown,
  FileDown,
  Printer,
  FileCheck,
  Loader2,
  Rocket
} from 'lucide-react';
import {
  developerConfig,
  experienceData,
  skillCategories,
  educationCertificationsData,
  resumeSummary,
  featuredToolsData
} from '../data/portfolioData';
import { downloadResume } from '../utils/resumeDownload';
import { useToast } from './Toast';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'formatted' | 'ats_text'>('formatted');
  const [copiedType, setCopiedType] = useState<'none' | 'ats' | 'md'>('none');
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const downloadDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (downloadDropdownRef.current && !downloadDropdownRef.current.contains(e.target as Node)) {
        setDownloadDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleDownloadFormat = async (format: 'pdf' | 'docx' | 'txt' | 'md' | 'html' | 'print') => {
    if (isGeneratingPdf) return;

    setDownloadDropdownOpen(false);

    try {
      if (format === 'pdf') {
        setIsGeneratingPdf(true);
        setGenerationProgress('Compiling native vector PDF...');
        showToast('Compiling LinkedIn & ATS-verified PDF...');
      } else if (format === 'docx') {
        setIsGeneratingPdf(true);
        setGenerationProgress('Generating .docx...');
        showToast('Generating Microsoft Word document (.docx)...');
      }

      await downloadResume(format, {
        onProgress: (stage) => setGenerationProgress(stage),
      });

      if (format === 'pdf') {
        setPdfSuccess(true);
        showToast('Shaheera_Sadia_Resume.pdf downloaded (LinkedIn & ATS Ready)!');
        setTimeout(() => setPdfSuccess(false), 3000);
      } else if (format === 'docx') {
        showToast('Shaheera_Sadia_Resume.docx downloaded (LinkedIn & Word Ready)!');
      } else if (format === 'print') {
        showToast('Opened browser print dialog');
      } else {
        const ext = format === 'txt' ? '_ATS.txt' : `.${format}`;
        showToast(`Resume downloaded: Shaheera_Sadia_Resume${ext}`);
      }
    } catch (err) {
      console.error('Download error:', err);
      showToast('Download encountered an issue. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
      setGenerationProgress('');
    }
  };

  if (!isOpen) return null;

  const atsPlainText = `Shaheera Sadia
Front-End Developer | Remote

Email: ${developerConfig.email} | GitHub: ${developerConfig.github.replace('https://', '')} | LinkedIn: ${developerConfig.linkedin.replace('https://', '')}

Summary
${resumeSummary.summary}

Core Skills
${skillCategories
  .map(
    (cat) =>
      `${cat.category}: ${cat.skills.map((s) => `${s.name} (${s.level}, ${s.experienceYears})`).join(', ')}`
  )
  .join('\n')}

Key Featured Projects
${featuredToolsData
  .map(
    (tool) => `• ${tool.application} (${tool.keyTech})
  Live Application: ${tool.liveUrl}
  GitHub Repository: ${tool.githubUrl}
  Problem Solved: ${tool.problemSolved || tool.description}
  What Was Built: ${tool.whatBuilt || tool.coreFocus}`
  )
  .join('\n\n')}

Professional Experience
${experienceData
  .map(
    (exp) => `${exp.role} — ${exp.company}
${exp.period} | ${exp.location}

${exp.achievements.map((a) => `- ${a}`).join('\n')}

Tech Stack: ${exp.technologies.join(', ')}`
  )
  .join('\n\n')}

Education & Certifications
${educationCertificationsData
  .map((cert) => `- ${cert.title} — ${cert.issuer} (Issued ${cert.issuedDate}) [${cert.badge}]`)
  .join('\n')}
`;

  const markdownContent = `# ${developerConfig.name}
**${developerConfig.role}** | ${developerConfig.location}

**Email:** ${developerConfig.email} | **GitHub:** ${developerConfig.github} | **LinkedIn:** ${developerConfig.linkedin}

---

## Summary
${resumeSummary.summary}

---

## Core Skills
${skillCategories
  .map(
    (cat) => `### ${cat.category}
${cat.skills.map((s) => `- **${s.name}** (${s.level}, ${s.experienceYears}): ${s.focus}`).join('\n')}`
  )
  .join('\n\n')}

---

## Featured Production Projects
${featuredToolsData
  .map(
    (tool) => `### [${tool.application}](${tool.liveUrl})
**Tech Stack:** \`${tool.keyTech}\` | [GitHub Source](${tool.githubUrl})

- **Problem Solved:** ${tool.problemSolved || tool.description}
- **What Was Built:** ${tool.whatBuilt || tool.coreFocus}`
  )
  .join('\n\n')}

---

## Professional Experience
${experienceData
  .map(
    (exp) => `### ${exp.role} — ${exp.company}
*${exp.period} | ${exp.location}*

${exp.achievements.map((a) => `- ${a}`).join('\n')}

**Tech Stack:** ${exp.technologies.join(', ')}`
  )
  .join('\n\n')}

---

## Education & Certifications
${educationCertificationsData
  .map(
    (cert) => `### ${cert.title}
*${cert.issuer} | Issued: ${cert.issuedDate}* [${cert.badge}]
${cert.description}`
  )
  .join('\n\n')}
`;

  const handleCopyATS = () => {
    navigator.clipboard.writeText(atsPlainText);
    setCopiedType('ats');
    showToast('ATS Plain Text copied to clipboard');
    setTimeout(() => setCopiedType('none'), 2500);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopiedType('md');
    showToast('Resume copied to clipboard in Markdown format');
    setTimeout(() => setCopiedType('none'), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        id="resume-modal-content"
        className="relative w-full max-w-4xl bg-[#0f172a] text-[#f8fafc] rounded-2xl border border-[#1e293b] shadow-2xl overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col print:border-none print:shadow-none print:max-h-none print:w-full print:my-0 print:rounded-none print:bg-white print:text-black"
      >
        {/* Header Control Bar (Hidden on Print) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 border-b border-[#1e293b] bg-[#0a0d12] gap-3 print:hidden shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0f172a] rounded-xl border border-[#1e293b] text-[#3b82f6]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="resume-modal-title" className="text-sm sm:text-base font-bold text-white">
                  {developerConfig.name} — Curriculum Vitae
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ATS Ready
                </span>
              </div>
              <p className="text-xs text-slate-300">Front-End Developer • 5+ Years Experience • Remote</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* View Mode Toggle */}
            <div className="inline-flex p-0.5 rounded-lg bg-[#0f172a] border border-[#1e293b]">
              <button
                type="button"
                onClick={() => setActiveTab('formatted')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer font-medium ${
                  activeTab === 'formatted'
                    ? 'bg-[#2563eb] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Styled CV
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ats_text')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer font-medium ${
                  activeTab === 'ats_text'
                    ? 'bg-[#2563eb] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                ATS Raw Text
              </button>
            </div>

            <button
              id="copy-ats-text-btn"
              onClick={handleCopyATS}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1e293b] bg-[#0f172a] text-slate-300 hover:text-white hover:border-slate-600 transition-colors cursor-pointer"
              title="Copy plain ATS-formatted text for job portals"
            >
              {copiedType === 'ats' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copiedType === 'ats' ? 'Copied ATS' : 'Copy ATS'}</span>
            </button>

            {/* Primary Download Resume Split Dropdown (jsPDF & html2canvas) */}
            <div className="relative inline-flex items-center" ref={downloadDropdownRef}>
              <div className="inline-flex rounded-lg overflow-hidden border border-blue-500/40 bg-blue-600">
                <button
                  type="button"
                  id="modal-download-resume-btn"
                  disabled={isGeneratingPdf}
                  onClick={() => handleDownloadFormat('pdf')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 font-semibold text-white transition-colors cursor-pointer shadow-sm ${
                    isGeneratingPdf ? 'bg-blue-800 text-blue-200 cursor-wait' : 'hover:bg-blue-500'
                  }`}
                  title="Download Resume PDF (generated via jsPDF & html2canvas)"
                >
                  {isGeneratingPdf ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : pdfSuccess ? (
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {isGeneratingPdf
                      ? generationProgress || 'Generating PDF...'
                      : pdfSuccess
                      ? 'Downloaded PDF!'
                      : 'Download Resume (PDF)'}
                  </span>
                </button>
                <button
                  type="button"
                  disabled={isGeneratingPdf}
                  onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
                  className="px-2 py-1.5 bg-blue-700 hover:bg-blue-600 text-white border-l border-blue-500/50 transition-colors cursor-pointer disabled:opacity-50"
                  aria-label="Select download format"
                  title="Select format (PDF, .txt, .md, .html)"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${downloadDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {downloadDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-[#0f172a] border border-[#1e293b] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in duration-100">
                  <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-400 border-b border-[#1e293b] mb-1">
                    Select Download Format
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownloadFormat('pdf')}
                    className="w-full px-2.5 py-2 rounded-lg text-left hover:bg-[#1e293b] transition-colors flex items-center justify-between text-xs text-slate-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <FileDown className="w-3.5 h-3.5 text-blue-400" />
                      <span className="font-semibold">PDF Document (.pdf)</span>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      LinkedIn & ATS
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadFormat('docx')}
                    className="w-full px-2.5 py-2 rounded-lg text-left hover:bg-[#1e293b] transition-colors flex items-center justify-between text-xs text-slate-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      <span className="font-semibold">Word Document (.docx)</span>
                    </div>
                    <span className="text-[9px] font-mono text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                      LinkedIn Native
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadFormat('txt')}
                    className="w-full px-2.5 py-2 rounded-lg text-left hover:bg-[#1e293b] transition-colors flex items-center justify-between text-xs text-slate-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-semibold">ATS Plain Text (.txt)</span>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      Standard
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadFormat('md')}
                    className="w-full px-2.5 py-2 rounded-lg text-left hover:bg-[#1e293b] transition-colors flex items-center justify-between text-xs text-slate-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-purple-400" />
                      <span className="font-semibold">Markdown (.md)</span>
                    </div>
                    <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                      Dev
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadFormat('html')}
                    className="w-full px-2.5 py-2 rounded-lg text-left hover:bg-[#1e293b] transition-colors flex items-center justify-between text-xs text-slate-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-semibold">Standalone HTML (.html)</span>
                    </div>
                    <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                      Web
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadFormat('print')}
                    className="w-full px-2.5 py-2 rounded-lg text-left hover:bg-[#1e293b] transition-colors flex items-center justify-between text-xs text-slate-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Printer className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold">Native Print Dialog</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 bg-slate-500/10 px-1.5 py-0.5 rounded">
                      Print
                    </span>
                  </button>
                </div>
              )}
            </div>

            <button
              id="close-resume-modal-btn"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-[#0f172a] rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ATS Raw Text Tab */}
        {activeTab === 'ats_text' ? (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-4 font-mono text-xs leading-relaxed bg-[#0a0d12]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
              <div>
                <span className="text-blue-400 font-bold uppercase tracking-wider block">
                  ATS Formatted Text Stream
                </span>
                <p className="text-slate-400 text-[11px] font-sans">
                  Clean unformatted text designed to pass applicant tracking systems (Workday, Greenhouse, Lever, Taleo).
                </p>
              </div>
              <button
                onClick={handleCopyATS}
                className="px-3 py-1.5 rounded-lg bg-[#2563eb] hover:bg-blue-500 text-white font-sans font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                {copiedType === 'ats' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Full Text</span>
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-slate-200 bg-[#0f172a] p-5 rounded-xl border border-[#1e293b] select-all overflow-x-auto text-[11.5px] leading-6">
              {atsPlainText}
            </pre>
          </div>
        ) : (
          /* Styled CV View / Printable Area */
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans print:p-8 print:overflow-visible print:bg-white print:text-black bg-[#0f172a]">
            {/* Candidate Header */}
            <div className="border-b border-[#1e293b] print:border-neutral-300 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white print:text-black">
                    {developerConfig.name}
                  </h1>
                  <p className="text-sm sm:text-base text-blue-400 print:text-blue-700 font-semibold">
                    {developerConfig.role}
                  </p>
                </div>
                <div className="text-xs text-slate-300 print:text-neutral-700 space-y-1 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-400 print:text-blue-700 shrink-0" />
                    <a href={`mailto:${developerConfig.email}`} className="hover:underline">
                      {developerConfig.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-blue-400 print:text-blue-700 shrink-0" />
                    <a href={developerConfig.github} target="_blank" rel="noreferrer" className="hover:underline">
                      {developerConfig.github.replace('https://', '')}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-blue-400 print:text-blue-700 shrink-0" />
                    <a href={developerConfig.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                      {developerConfig.linkedin.replace('https://', '')}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 print:text-neutral-500">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>Remote • 5+ Years Experience</span>
                  </div>
                </div>
              </div>

              {/* Summary Section */}
              <div className="mt-5 pt-4 border-t border-[#1e293b]/60 print:border-neutral-200">
                <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 print:text-blue-800 font-bold mb-2">
                  Professional Summary
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 print:text-neutral-800 leading-relaxed font-sans">
                  {resumeSummary.summary}
                </p>
              </div>
            </div>

            {/* LinkedIn Upload Assistant Banner (print:hidden) */}
            <div className="p-4 bg-gradient-to-r from-blue-950/60 to-slate-900/60 border border-blue-500/30 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs print:hidden shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm flex flex-wrap items-center gap-2">
                    <span>Ready for LinkedIn Profile &amp; Job Applications</span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Experience • Education • Skills Verified
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                    Formatted specifically with structured headings for LinkedIn&apos;s resume parser. Upload either the <strong>Native Text PDF</strong> or <strong>Word (.docx)</strong> file to auto-fill Experience, Education, and Skills.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-start md:self-auto pt-1 md:pt-0">
                <button
                  type="button"
                  id="banner-download-pdf-btn"
                  onClick={() => handleDownloadFormat('pdf')}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-sm transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                  title="Download LinkedIn & ATS-verified Native Text PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
                <button
                  type="button"
                  id="banner-download-docx-btn"
                  onClick={() => handleDownloadFormat('docx')}
                  className="px-3.5 py-2 bg-[#1e293b] hover:bg-[#334155] border border-blue-400/30 text-blue-200 hover:text-white font-semibold rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                  title="Download Microsoft Word (.docx) format"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>Word (.docx)</span>
                </button>
              </div>
            </div>

            {/* Core Skills Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 print:text-blue-800 uppercase tracking-wider font-bold">
                <Award className="w-4 h-4" />
                <span>Core Skills &amp; Proficiencies</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print:grid-cols-2">
                {skillCategories.map((cat) => (
                  <div
                    key={cat.category}
                    className="p-3.5 rounded-xl bg-[#0a0d12] print:bg-neutral-50 border border-[#1e293b] print:border-neutral-200 space-y-1.5"
                  >
                    <h4 className="text-xs font-bold text-white print:text-black font-mono">
                      {cat.category}
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-300 print:text-neutral-700">
                      {cat.skills.map((skill) => (
                        <li key={skill.name} className="flex items-baseline justify-between gap-2">
                          <span className="font-medium text-slate-200 print:text-black">
                            {skill.name}
                          </span>
                          <span className="text-[11px] font-mono text-blue-400 print:text-blue-700 shrink-0">
                            {skill.level} ({skill.experienceYears})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Experience Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 print:text-blue-800 uppercase tracking-wider font-bold">
                <Briefcase className="w-4 h-4" />
                <span>Professional Experience</span>
              </div>

              <div className="space-y-4">
                {experienceData.map((exp) => (
                  <div
                    key={exp.id}
                    className="space-y-3 bg-[#0a0d12] print:bg-neutral-50 p-5 rounded-xl border border-[#1e293b] print:border-neutral-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-white print:text-black">
                          {exp.role}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-blue-400 print:text-blue-700">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-slate-400 print:text-neutral-600">
                        {exp.period} | {exp.location}
                      </span>
                    </div>

                    <div className="space-y-2 pt-1 font-sans">
                      {exp.achievements.map((ach, i) => (
                        <div key={i} className="text-xs text-slate-300 print:text-neutral-800 flex items-start gap-2">
                          <span className="text-blue-400 print:text-blue-700 shrink-0 mt-0.5">•</span>
                          <span className="leading-relaxed">{ach}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-mono text-slate-400 print:text-neutral-600 mr-1">
                        Tech Stack:
                      </span>
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0f172a] print:bg-neutral-200 text-slate-300 print:text-black border border-[#1e293b] print:border-neutral-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Featured Production Projects */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 print:text-blue-800 uppercase tracking-wider font-bold">
                <Rocket className="w-4 h-4" />
                <span>Key Featured Production Projects</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {featuredToolsData.map((tool, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0a0d12] print:bg-neutral-50 p-4 rounded-xl border border-[#1e293b] print:border-neutral-200 flex flex-col justify-between space-y-2.5"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-white print:text-black leading-snug">
                          {tool.application}
                        </h4>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
                          Live
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 print:text-neutral-700 leading-relaxed font-sans">
                        {tool.description}
                      </p>
                      {tool.problemSolved && (
                        <p className="text-[11px] text-amber-200/90 print:text-amber-800 font-sans pt-0.5">
                          <strong>Problem:</strong> {tool.problemSolved}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#1e293b] print:border-neutral-200 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <div className="flex flex-wrap gap-1">
                        {tool.keyTech.split(',').slice(0, 3).map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-1.5 py-0.5 rounded text-[10px] bg-[#0f172a] print:bg-neutral-200 text-slate-300 print:text-black border border-[#1e293b] print:border-neutral-300"
                          >
                            {t.trim()}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 print:hidden">
                        <a
                          href={tool.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 text-[11px]"
                        >
                          <span>Live</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                        <span className="text-slate-600">•</span>
                        <a
                          href={tool.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                        >
                          <Github className="w-2.5 h-2.5" />
                          <span>Code</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 print:text-blue-800 uppercase tracking-wider font-bold">
                <GraduationCap className="w-4 h-4" />
                <span>Education &amp; Certifications</span>
              </div>

              <div className="space-y-3">
                {educationCertificationsData.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-[#0a0d12] print:bg-neutral-50 p-4 rounded-xl border border-[#1e293b] print:border-neutral-200 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-white print:text-black">
                          {cert.title}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/10 text-blue-400 print:text-blue-700 border border-blue-500/20">
                          {cert.badge}
                        </span>
                      </div>
                      <p className="text-xs text-blue-400 print:text-blue-700 font-semibold font-mono">
                        {cert.issuer}
                      </p>
                      <p className="text-xs text-slate-300 print:text-neutral-700 leading-relaxed font-sans pt-1">
                        {cert.description}
                      </p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-xs font-mono text-slate-400 print:text-neutral-600 block">
                        Issued {cert.issuedDate}
                      </span>
                      {cert.hours && (
                        <span className="text-[11px] font-mono text-emerald-400 print:text-emerald-700 block">
                          {cert.hours} Accredited
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Bottom Export Toolbar (Print-Hidden) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3.5 border-t border-[#1e293b] bg-[#0a0d12] gap-3 print:hidden shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>ATS Compliant Resume • 5+ Years Experience • Remote</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              type="button"
              id="footer-download-pdf-btn"
              disabled={isGeneratingPdf}
              onClick={() => handleDownloadFormat('pdf')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold text-white shadow-sm transition-all cursor-pointer ${
                isGeneratingPdf
                  ? 'bg-blue-800 text-blue-200 cursor-wait'
                  : 'bg-blue-600 hover:bg-blue-500'
              }`}
              title="Compile and download PDF via jsPDF & html2canvas"
            >
              {isGeneratingPdf ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : pdfSuccess ? (
                <Check className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{isGeneratingPdf ? 'Generating...' : 'Download PDF (ATS & LinkedIn)'}</span>
            </button>

            <button
              type="button"
              id="footer-download-docx-btn"
              disabled={isGeneratingPdf}
              onClick={() => handleDownloadFormat('docx')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-500/30 bg-blue-950/40 text-blue-200 hover:text-white hover:bg-blue-900/60 transition-colors cursor-pointer"
              title="Download Microsoft Word document (.docx) for LinkedIn upload"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Word (.docx)</span>
            </button>

            <button
              type="button"
              id="footer-download-ats-btn"
              disabled={isGeneratingPdf}
              onClick={() => handleDownloadFormat('txt')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1e293b] bg-[#0f172a] text-slate-200 hover:text-white hover:border-slate-600 transition-colors cursor-pointer"
            >
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ATS (.txt)</span>
            </button>

            <button
              type="button"
              id="footer-download-md-btn"
              disabled={isGeneratingPdf}
              onClick={() => handleDownloadFormat('md')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1e293b] bg-[#0f172a] text-slate-200 hover:text-white hover:border-slate-600 transition-colors cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Markdown (.md)</span>
            </button>

            <button
              type="button"
              id="footer-print-pdf-btn"
              disabled={isGeneratingPdf}
              onClick={() => handleDownloadFormat('print')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1e293b] bg-[#0f172a] text-slate-200 hover:text-white hover:border-slate-600 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print Dialog</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

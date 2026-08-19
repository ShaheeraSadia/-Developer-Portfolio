import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Download, Code2 } from 'lucide-react';
import { developerConfig, projectsData, experienceData, philosophyPillars, skillCategories } from '../data/portfolioData';
import { useToast } from './Toast';

interface RawConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RawConfigModal: React.FC<RawConfigModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullData = {
    developerConfig,
    projects: projectsData,
    experience: experienceData,
    philosophyPillars,
    skills: skillCategories,
    generatedAt: new Date().toISOString(),
  };

  const jsonString = JSON.stringify(fullData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    showToast('Full portfolio JSON copied to clipboard');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shaheera_sadia_portfolio_manifest.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded portfolio JSON manifest');
  };

  return (
    <div
      id="raw-config-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="raw-config-title"
    >
      <div
        id="raw-config-container"
        className="relative w-full max-w-4xl bg-[#0f172a] text-[#f8fafc] rounded-2xl border border-[#1e293b] shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col font-mono"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e293b] bg-[#0a0d12]">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#3b82f6]" />
            <h2 id="raw-config-title" className="text-xs sm:text-sm font-semibold tracking-tight text-[#f8fafc]">
              portfolio_schema_manifest.json
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0f172a] border border-[#1e293b] hover:border-slate-600 text-[#94a3b8] hover:text-[#f8fafc] transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#22c55e]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#2563eb] hover:bg-[#3b82f6] text-white font-semibold shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#0f172a] rounded-lg transition-colors cursor-pointer"
              aria-label="Close raw JSON modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* JSON Code Viewer */}
        <div className="p-6 overflow-y-auto text-xs font-mono max-h-[calc(90vh-120px)] bg-[#0a0d12]">
          <pre className="text-[#f8fafc] leading-relaxed">
            <code>{jsonString}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

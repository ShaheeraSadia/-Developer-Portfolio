import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Download } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="raw-config-title"
    >
      <div
        id="raw-config-container"
        className="relative w-full max-w-4xl bg-[#14151A] text-[#FAFAF8] rounded-xl border border-[#2B2D37] shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col font-mono"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2B2D37] bg-[#1C1E26]">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#2F5CFF]" />
            <h2 id="raw-config-title" className="text-sm font-bold tracking-tight text-white">
              portfolio_manifest.json (Raw Data Schema)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-[#2B2D37] text-white hover:bg-[#393C4A] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#1FAA6E]" /> : <Copy className="w-3.5 h-3.5 text-[#9E9EA7]" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-[#2F5CFF] text-white hover:bg-[#254BD8] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-[#9E9EA7] hover:text-white rounded"
              aria-label="Close raw config"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* JSON Code Viewer */}
        <div className="p-6 overflow-y-auto text-xs font-mono max-h-[calc(90vh-120px)] bg-[#101116]">
          <pre className="text-emerald-400 leading-relaxed">
            <code>{jsonString}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

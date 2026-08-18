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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="raw-config-title"
    >
      <div
        id="raw-config-container"
        className="relative w-full max-w-4xl bg-[#1f242d] text-white rounded-2xl border border-[#00eeff]/40 shadow-[0_0_30px_rgba(0,238,255,0.2)] overflow-hidden my-6 max-h-[90vh] flex flex-col font-mono"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#323946] bg-[#323946]">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00eeff]" />
            <h2 id="raw-config-title" className="text-sm font-bold tracking-tight text-white">
              developer_portfolio_schema.json
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-[#1f242d] border border-[#323946] text-[#00eeff] hover:bg-[#00eeff] hover:text-[#1f242d] transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-[#00eeff] text-[#1f242d] font-bold hover:bg-[#55f3ff] hover:shadow-[0_0_10px_#00eeff] transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-white hover:bg-[#1f242d] rounded-lg transition-colors cursor-pointer"
              aria-label="Close raw JSON modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* JSON Code Viewer */}
        <div className="p-6 overflow-y-auto text-xs font-mono max-h-[calc(90vh-120px)] bg-[#181d25]">
          <pre className="text-[#00eeff] leading-relaxed">
            <code>{jsonString}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

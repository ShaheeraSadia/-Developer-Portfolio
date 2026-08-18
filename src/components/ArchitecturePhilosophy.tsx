import React, { useState } from 'react';
import { Zap, ShieldCheck, Layers, Cpu, Copy, Check, Terminal, Code2 } from 'lucide-react';
import { philosophyPillars } from '../data/portfolioData';
import { useToast } from './Toast';

export const ArchitecturePhilosophy: React.FC = () => {
  const { showToast } = useToast();
  const [selectedPillarId, setSelectedPillarId] = useState<string>(philosophyPillars[0].id);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const selectedPillar = philosophyPillars.find((p) => p.id === selectedPillarId) || philosophyPillars[0];

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    showToast('Architecture pattern snippet copied');
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-4 h-4 text-[#2F5CFF]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-[#1FAA6E]" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-[#2F5CFF]" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-[#14151A]" />;
      default:
        return <Code2 className="w-4 h-4 text-[#2F5CFF]" />;
    }
  };

  return (
    <section id="architecture" className="py-16 border-b border-[#E7E6E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E7E6E2]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#64666E] uppercase tracking-wider mb-2">
              <span className="text-[#2F5CFF]">03.</span>
              <span>TECHNICAL_PILLARS</span>
              <span className="text-[#9E9EA7]">//</span>
              <span>ENGINEERING_STANDARDS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#14151A]">
              Architectural philosophies &amp; principles.
            </h2>
          </div>
          <p className="text-sm text-[#64666E] max-w-md font-sans">
            How I structure front-end systems to guarantee low latency, mathematical accessibility, and type safety at scale.
          </p>
        </div>

        {/* 4 Pillar Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-8 pb-6">
          {philosophyPillars.map((pillar, idx) => {
            const isSelected = pillar.id === selectedPillarId;
            return (
              <button
                key={pillar.id}
                id={`philosophy-tab-${pillar.id}`}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-white border-[#2F5CFF] shadow-xs ring-1 ring-[#2F5CFF]/20'
                    : 'bg-[#F4F3EF]/60 border-[#E7E6E2] hover:bg-white hover:border-[#D5D4CE]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-[#F4F3EF] rounded-md border border-[#E7E6E2]">
                    {getIcon(pillar.iconName)}
                  </div>
                  <span className="text-xs font-mono text-[#64666E]">0{idx + 1}</span>
                </div>
                <h3 className="text-sm font-bold text-[#14151A] tracking-tight">{pillar.title}</h3>
                <p className="text-xs text-[#64666E] mt-1 line-clamp-2">{pillar.tagline}</p>
              </button>
            );
          })}
        </div>

        {/* Interactive Deep-Dive Details Panel */}
        <div className="rounded-xl border border-[#E7E6E2] bg-white p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-4 font-sans">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#F4F3EF] border border-[#E7E6E2] text-xs font-mono text-[#2F5CFF] font-medium">
                {getIcon(selectedPillar.iconName)}
                <span>{selectedPillar.title}</span>
              </div>

              <blockquote className="text-base sm:text-lg font-medium text-[#14151A] italic border-l-2 border-[#2F5CFF] pl-3 py-0.5">
                &ldquo;{selectedPillar.quote}&rdquo;
              </blockquote>

              <p className="text-sm text-[#44464F] leading-relaxed">
                {selectedPillar.description}
              </p>

              <div className="pt-2 text-xs font-mono text-[#64666E] space-y-1 bg-[#F4F3EF] p-3 rounded-lg border border-[#E7E6E2]">
                <div><span className="text-[#9E9EA7]">pattern:</span> <span className="text-[#14151A] font-medium">{selectedPillar.codeExample.title}</span></div>
                <div><span className="text-[#9E9EA7]">status:</span> <span className="text-[#1FAA6E]">production_standard</span></div>
              </div>
            </div>

            {/* Right Code Snippet Box */}
            <div className="lg:col-span-7 space-y-2 font-mono">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs text-[#64666E] flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#2F5CFF]" />
                  <span>{selectedPillar.codeExample.filename}</span>
                </span>

                <button
                  id={`copy-pillar-code-${selectedPillar.id}`}
                  onClick={() => handleCopy(selectedPillar.codeExample.code, selectedPillar.id)}
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-[#F4F3EF] border border-[#D5D4CE] hover:bg-[#EAE8E2] text-[#14151A] transition-colors"
                >
                  {copiedCodeId === selectedPillar.id ? (
                    <>
                      <Check className="w-3 h-3 text-[#1FAA6E]" />
                      <span className="text-[#1FAA6E]">copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#64666E]" />
                      <span>copy_pattern</span>
                    </>
                  )}
                </button>
              </div>

              <div className="rounded-lg bg-[#14151A] text-[#FAFAF8] p-4 text-xs overflow-x-auto border border-[#2B2D37] shadow-inner">
                <pre className="text-emerald-400/90 leading-relaxed font-mono">
                  <code>{selectedPillar.codeExample.code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
        return <Zap className="w-4 h-4 text-[#00eeff]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-[#00eeff]" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-[#00eeff]" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-[#00eeff]" />;
      default:
        return <Code2 className="w-4 h-4 text-[#00eeff]" />;
    }
  };

  return (
    <section id="architecture" className="py-20 bg-[#12161f] text-white border-b border-[#2a3245]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Clear Hierarchy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#2a3245]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00eeff] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-pulse"></span>
              <span className="font-bold">03. TECHNICAL PILLARS</span>
              <span className="text-gray-500">//</span>
              <span>ENGINEERING STANDARDS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Architectural <span className="text-[#00eeff] text-glow-cyan">Philosophies &amp; Principles</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-300 max-w-md font-sans leading-relaxed">
            How I structure front-end systems to guarantee low latency, mathematical accessibility, and type safety at scale.
          </p>
        </div>

        {/* 4 Pillar Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
          {philosophyPillars.map((pillar) => {
            const isSelected = pillar.id === selectedPillarId;
            return (
              <button
                key={pillar.id}
                id={`pillar-tab-${pillar.id}`}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1b202c] border-[#00eeff] shadow-[0_0_15px_rgba(0,238,255,0.25)]'
                    : 'bg-[#1b202c]/60 border-[#2a3245] hover:border-[#00eeff]/40 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-md bg-[#12161f] border border-[#2a3245]">
                    {getIcon(pillar.iconName)}
                  </div>
                  <span className="text-[10px] font-mono text-[#00eeff]">
                    Core Pillar
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white font-mono">
                  {pillar.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Deep Dive Card */}
        <div className="rounded-2xl border border-[#2a3245] bg-[#1b202c] overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.3)]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Explanation */}
            <div className="lg:col-span-6 p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#12161f] text-[#00eeff] border border-[#00eeff]/30">
                    Philosophy Standard
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {selectedPillar.title}
                </h3>
                <p className="text-xs font-mono text-[#00eeff]">
                  {selectedPillar.tagline}
                </p>
              </div>

              <p className="text-sm text-gray-300 font-sans leading-relaxed">
                {selectedPillar.description}
              </p>

              <div className="p-4 bg-[#12161f] rounded-xl border border-[#2a3245] space-y-1">
                <span className="text-[11px] font-mono uppercase text-gray-400 block">// architectural_quote</span>
                <p className="text-xs font-mono text-[#00eeff] italic leading-relaxed">
                  "{selectedPillar.quote}"
                </p>
              </div>
            </div>

            {/* Right: Code Sample */}
            <div className="lg:col-span-6 bg-[#12161f] text-white p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#2a3245]">
              <div>
                <div className="flex items-center justify-between border-b border-[#2a3245] pb-3 mb-4 font-mono text-xs">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Terminal className="w-3.5 h-3.5 text-[#00eeff]" />
                    <span>{selectedPillar.codeExample.filename}</span>
                  </div>

                  <button
                    onClick={() => handleCopy(selectedPillar.codeExample.code, selectedPillar.id)}
                    className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-[#1b202c] text-gray-300 hover:text-white hover:border-[#00eeff] border border-[#2a3245] transition-colors cursor-pointer"
                  >
                    {copiedCodeId === selectedPillar.id ? (
                      <>
                        <Check className="w-3 h-3 text-[#00eeff]" />
                        <span className="text-[#00eeff]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="font-mono text-xs leading-relaxed text-[#00eeff] overflow-x-auto p-4 bg-[#0d1017] rounded-xl border border-[#2a3245]">
                  <code>{selectedPillar.codeExample.code}</code>
                </pre>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2a3245] text-xs font-mono text-gray-400">
                <span className="text-[#00eeff]">Architecture Pattern: </span>
                <span>{selectedPillar.codeExample.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

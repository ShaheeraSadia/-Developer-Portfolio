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
    <section id="architecture" className="py-24 sm:py-28 md:py-32 border-b border-[#E7E6E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Clear Hierarchy and mb-14 spacing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-14 border-b border-[#E7E6E2]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#64666E] uppercase tracking-wider">
              <span className="text-[#2F5CFF] font-bold">03.</span>
              <span>TECHNICAL_PILLARS</span>
              <span className="text-[#9E9EA7]">//</span>
              <span>ENGINEERING_STANDARDS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#14151A]">
              Architectural philosophies &amp; principles.
            </h2>
          </div>
          <p className="text-base text-[#555761] max-w-md font-sans leading-relaxed">
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
                className={`p-4 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-[#14151A] text-white border-[#14151A] shadow-xs'
                    : 'bg-white text-[#14151A] border-[#E7E6E2] hover:bg-[#F4F3EF]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected ? 'bg-white/10' : 'bg-[#F4F3EF]'
                    }`}
                  >
                    {getIcon(pillar.iconName)}
                  </div>
                  <span
                    className={`text-[11px] font-mono ${
                      isSelected ? 'text-[#9E9EA7]' : 'text-[#64666E]'
                    }`}
                  >
                    // 0{philosophyPillars.indexOf(pillar) + 1}
                  </span>
                </div>
                <div className="font-bold text-sm mb-1">{pillar.title}</div>
                <p
                  className={`text-xs line-clamp-2 ${
                    isSelected ? 'text-[#B6B5AE]' : 'text-[#64666E]'
                  }`}
                >
                  {pillar.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Expanded Detail Card */}
        <div className="rounded-xl border border-[#E7E6E2] bg-white overflow-hidden shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E7E6E2]">
            {/* Left: Detailed Technical Narrative */}
            <div className="lg:col-span-6 p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#2F5CFF] uppercase mb-1 font-semibold">
                  <span>Pillar Focus</span>
                  <span>•</span>
                  <span>Zero-Jank SLA</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#14151A]">
                  {selectedPillar.title}
                </h3>
                <p className="text-sm font-mono text-[#64666E] mt-0.5">
                  &quot;{selectedPillar.quote}&quot;
                </p>
              </div>

              <p className="text-base text-[#44464F] leading-relaxed font-sans">
                {selectedPillar.description}
              </p>

              <div className="p-4 rounded-lg bg-[#F4F3EF] border border-[#E7E6E2] text-xs font-mono text-[#14151A] space-y-1.5">
                <span className="text-[#2F5CFF] font-bold">// implementation_guarantee:</span>
                <p className="text-[#44464F] font-sans text-xs leading-relaxed">
                  {selectedPillar.tagline}
                </p>
              </div>
            </div>

            {/* Right: Code Sample */}
            <div className="lg:col-span-6 bg-[#14151A] text-white p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#2C2D35] pb-3 mb-4 font-mono text-xs">
                  <div className="flex items-center gap-2 text-[#9E9EA7]">
                    <Terminal className="w-3.5 h-3.5 text-[#2F5CFF]" />
                    <span>{selectedPillar.codeExample.filename}</span>
                  </div>
                  <button
                    onClick={() =>
                      handleCopy(
                        selectedPillar.codeExample.code,
                        selectedPillar.id
                      )
                    }
                    className="flex items-center gap-1 text-[#9E9EA7] hover:text-white transition-colors"
                  >
                    {copiedCodeId === selectedPillar.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#1FAA6E]" />
                        <span className="text-[#1FAA6E]">copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>copy</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="font-mono text-xs leading-relaxed text-[#EAE8E2] overflow-x-auto p-2 bg-[#1C1D24] rounded-lg border border-[#2C2D35]">
                  <code>{selectedPillar.codeExample.code}</code>
                </pre>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2C2D35] text-xs font-mono text-[#9E9EA7]">
                <span className="text-[#2F5CFF]">Architecture: </span>
                <span>{selectedPillar.codeExample.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

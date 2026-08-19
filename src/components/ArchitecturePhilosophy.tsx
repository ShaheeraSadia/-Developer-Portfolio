import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Code2,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Activity,
  Award
} from 'lucide-react';
import { philosophyPillars } from '../data/portfolioData';

export const ArchitecturePhilosophy: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const activePillar = philosophyPillars[activePillarIndex];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return Zap;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Layers':
        return Layers;
      case 'Cpu':
      default:
        return Cpu;
    }
  };

  return (
    <section id="architecture-philosophy" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0d12]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f172a] border border-[#1e293b] text-xs font-mono text-[#3b82f6]">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture &amp; Engineering Philosophy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f8fafc]">
            Core Technical Standards
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] max-w-2xl font-sans">
            Clear, uncompromising architectural principles that guide every web application and mobile interface I build.
          </p>
        </div>

        {/* Interactive Principle Selector & Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Principle Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {philosophyPillars.map((pillar, index) => {
              const Icon = getIcon(pillar.iconName);
              const isActive = index === activePillarIndex;

              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillarIndex(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#0f172a] border-blue-500/60 shadow-sm ring-1 ring-blue-500/20'
                      : 'bg-[#0a0d12] border-[#1e293b] hover:border-slate-600 hover:bg-[#0f172a]/60'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 transition-colors ${
                      isActive ? 'bg-[#2563eb] text-white' : 'bg-[#0f172a] text-[#3b82f6] border border-[#1e293b]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-semibold ${isActive ? 'text-[#f8fafc]' : 'text-[#94a3b8]'}`}>
                        {pillar.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="text-xs text-[#94a3b8] line-clamp-2 font-sans">
                      {pillar.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Dive & Code Implementation */}
          <div className="lg:col-span-7 bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 sm:p-7 space-y-6">
            <div className="space-y-2 border-b border-[#1e293b] pb-5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#3b82f6] font-semibold">
                <span>Standard 0{activePillarIndex + 1}</span>
                <span className="text-slate-600">•</span>
                <span className="text-[#94a3b8]">{activePillar.quote}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#f8fafc]">
                {activePillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed font-sans pt-1">
                {activePillar.description}
              </p>
            </div>

            {/* Code Snippet */}
            {activePillar.codeExample && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#94a3b8]">
                  <span className="flex items-center gap-1.5 text-[#f8fafc]">
                    <Code2 className="w-3.5 h-3.5 text-[#3b82f6]" />
                    <span>{activePillar.codeExample.filename}</span>
                  </span>
                  <span className="text-slate-500">{activePillar.codeExample.title}</span>
                </div>
                <div className="rounded-xl bg-[#0a0d12] border border-[#1e293b] p-4 text-xs font-mono overflow-x-auto text-[#f8fafc]">
                  <pre className="leading-relaxed">
                    <code>{activePillar.codeExample.code}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SLA & Production Benchmarks Card */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1e293b] pb-4">
            <div>
              <h3 className="text-base font-bold text-[#f8fafc]">
                Core Web Vitals &amp; Performance SLA Commitments
              </h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] font-sans">
                Measurable quality benchmarks guaranteed across all deliverable projects.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#22c55e] text-xs font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Production Validated</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#0a0d12] border border-[#1e293b] space-y-1">
              <span className="text-[#94a3b8] block">Interaction Latency (INP)</span>
              <span className="text-lg font-bold text-[#3b82f6]">&lt; 16 ms</span>
              <span className="text-[11px] text-slate-500 block">Sub-frame budget guarantee</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0d12] border border-[#1e293b] space-y-1">
              <span className="text-[#94a3b8] block">Accessibility Score</span>
              <span className="text-lg font-bold text-[#3b82f6]">100 / 100</span>
              <span className="text-[11px] text-slate-500 block">WCAG 2.1 AA/AAA contrast</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0d12] border border-[#1e293b] space-y-1">
              <span className="text-[#94a3b8] block">Layout Stability (CLS)</span>
              <span className="text-lg font-bold text-[#3b82f6]">0.000</span>
              <span className="text-[11px] text-slate-500 block">Zero content jumps or jitter</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0d12] border border-[#1e293b] space-y-1">
              <span className="text-[#94a3b8] block">Client-Side Compute</span>
              <span className="text-lg font-bold text-[#3b82f6]">100% Local</span>
              <span className="text-[11px] text-slate-500 block">Zero server latency &amp; full privacy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

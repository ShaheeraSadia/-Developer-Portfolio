import React from 'react';
import {
  BarChart2,
  RotateCcw,
  TrendingUp,
  ArrowUp,
  Github,
  Linkedin,
  Twitter,
  Mail,
  CheckCircle2,
  Sparkles,
  Compass
} from 'lucide-react';
import { developerConfig } from '../data/portfolioData';
import { useSectionTelemetry } from '../hooks/useSectionTelemetry';

interface FooterProps {
  activeSection?: string;
}

export const Footer: React.FC<FooterProps> = ({ activeSection = 'home' }) => {
  const telemetry = useSectionTelemetry(activeSection);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="w-full bg-[#0a0d12] text-[#f8fafc] pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-t border-[#1e293b]">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Navigation Insights / Session Activity Telemetry Panel */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 sm:p-7 space-y-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1e293b]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#f8fafc]">
              <Compass className="w-4 h-4 text-[#3b82f6]" />
              <span>Session Navigation Activity</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-[#94a3b8] font-normal">
                {telemetry.totalVisits} section transition{telemetry.totalVisits === 1 ? '' : 's'} recorded this visit
              </span>
            </div>

            <div className="flex items-center gap-2">
              {telemetry.topSection && (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0a0d12] border border-[#1e293b] text-xs font-mono">
                  <TrendingUp className="w-3.5 h-3.5 text-[#3b82f6]" />
                  <span className="text-[#94a3b8]">Most Explored:</span>
                  <span className="text-[#f8fafc] font-bold">{telemetry.topSection.label}</span>
                  <span className="text-[#3b82f6]">({telemetry.topSection.percentage}%)</span>
                </div>
              )}
              <button
                onClick={telemetry.resetStats}
                className="px-2.5 py-1 bg-[#0a0d12] hover:bg-[#1e293b] text-[#94a3b8] hover:text-[#f8fafc] border border-[#1e293b] hover:border-slate-600 rounded-lg text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                title="Reset session telemetry data"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Activity Matrix Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {telemetry.sortedSections.slice(0, 6).map((sec) => {
              const isCurrent = sec.id === activeSection;
              return (
                <div
                  key={sec.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-[#1e293b] border-blue-500/50 shadow-sm'
                      : 'bg-[#0a0d12] border-[#1e293b]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={`font-semibold truncate ${isCurrent ? 'text-[#3b82f6]' : 'text-[#f8fafc]'}`}>
                      {sec.label}
                    </span>
                    <div className="flex items-center gap-1 font-mono text-xs">
                      <span className="text-[#f8fafc] font-bold">{sec.count}x</span>
                      <span className="text-[#94a3b8]">({sec.percentage}%)</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-[#0f172a] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isCurrent ? 'bg-[#3b82f6]' : 'bg-[#94a3b8]'
                      }`}
                      style={{ width: `${Math.max(sec.percentage, 5)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Architecture Metadata */}
          <div className="pt-4 border-t border-[#1e293b] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-[#94a3b8]">
            <div>
              <span className="text-slate-500 block text-[11px]">Framework:</span>
              <span className="text-[#f8fafc] font-semibold">React 19 + Vite</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Styling:</span>
              <span className="text-[#f8fafc] font-semibold">Tailwind CSS</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Compute:</span>
              <span className="text-[#f8fafc] font-semibold">100% Client-Side</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Typography:</span>
              <span className="text-[#f8fafc] font-semibold">Plus Jakarta Sans</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1e293b] text-xs text-[#94a3b8]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()}</span>
            <span className="text-[#f8fafc] font-semibold">{developerConfig.name}</span>
            <span>— Front-End &amp; Mobile Developer</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href={developerConfig.github}
                target="_blank"
                rel="noreferrer"
                className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={developerConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={developerConfig.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            <button
              id="footer-back-to-top-btn"
              onClick={scrollToTop}
              className="hover:text-[#3b82f6] transition-colors flex items-center gap-1 group cursor-pointer text-[#94a3b8] hover:text-[#f8fafc] font-medium"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

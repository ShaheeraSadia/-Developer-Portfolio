import React from 'react';
import { 
  CheckCircle2, 
  Gauge, 
  Sparkles,
  Zap,
  ShieldCheck
} from 'lucide-react';

export const PerformanceAuditProof: React.FC = () => {
  const lighthouseScores = [
    { label: 'Performance', score: 100, desc: 'LCP 0.64s • Zero Main Thread Delay' },
    { label: 'Accessibility', score: 100, desc: 'WCAG 2.1 AA Contrast Compliant' },
    { label: 'Best Practices', score: 100, desc: 'Modern ESM Packaging' },
    { label: 'SEO', score: 100, desc: 'Semantic Structure & Meta' },
  ];

  return (
    <div id="performance-proof" className="mt-14 pt-12 border-t border-[#1e293b] space-y-8 scroll-mt-20">
      {/* Proof Header with Generous Spacing */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
            <Gauge className="w-4 h-4 text-emerald-400" />
            <span>Audited Engineering Quality</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Performance &amp; Accessibility Verification
          </h3>
        </div>
        <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
          <CheckCircle2 className="w-4 h-4" />
          <span>Google Lighthouse 100/100 Audit</span>
        </div>
      </div>

      {/* Sleek, Non-Bulky Lighthouse Scorecards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {lighthouseScores.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#0f172a] p-6 rounded-2xl border border-[#1e293b] hover:border-emerald-500/40 transition-all flex flex-col items-center text-center space-y-3 shadow-md shadow-black/20"
          >
            {/* Circular Gauge */}
            <div className="relative w-18 h-18 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.2"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500"
                  strokeDasharray="100, 100"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-bold font-mono text-white leading-none">
                  {item.score}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white tracking-tight">
                {item.label}
              </h4>
              <p className="text-[11px] text-slate-300 font-mono leading-tight">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

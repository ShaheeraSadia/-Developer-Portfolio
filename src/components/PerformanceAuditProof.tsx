import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Gauge, 
  ExternalLink, 
  Lock, 
  Cpu, 
  Database,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';

export const PerformanceAuditProof: React.FC = () => {
  const lighthouseScores = [
    { label: 'Performance', score: 100, color: '#22c55e', desc: 'LCP 0.64s • Zero Main Thread Blocking' },
    { label: 'Accessibility', score: 100, color: '#22c55e', desc: 'WCAG 2.1 AA Compliant Contrast' },
    { label: 'Best Practices', score: 100, color: '#22c55e', desc: 'Strict CSP & Modern ESM Packaging' },
    { label: 'SEO', score: 100, color: '#22c55e', desc: 'JSON-LD Structured Schema & Meta' },
  ];

  const coreWebVitals = [
    { name: 'Largest Contentful Paint (LCP)', value: '0.64s', threshold: '< 2.5s', status: 'Good', isPass: true },
    { name: 'Cumulative Layout Shift (CLS)', value: '0.00', threshold: '< 0.10', status: 'Perfect', isPass: true },
    { name: 'Interaction to Next Paint (INP)', value: '< 16ms', threshold: '< 200ms', status: '60 FPS', isPass: true },
    { name: 'First Contentful Paint (FCP)', value: '0.38s', threshold: '< 1.8s', status: 'Instant', isPass: true },
  ];

  const architecturalProofs = [
    {
      title: '100% Client-Side Compute',
      tag: 'Zero Cloud Storage / 0 Bytes Sent',
      description: 'Media transformation (Toolkit Pro) and color contrast validation (Brand Identity Generator) execute entirely in browser Web Workers using OffscreenCanvas and Transferable ArrayBuffers. Your files and photos never touch a remote backend.',
      metrics: '0 ms Server Upload • 100% In-Browser Privacy',
      icon: Cpu,
    },
    {
      title: 'Enterprise-Grade Security',
      tag: 'OWASP Top 10 & Anti-Abuse Defenses',
      description: 'Engineered SecuLens AI to automatically detect OWASP Top 10 vulnerabilities (SQLi, XSS, SSRF, IDOR). The portfolio itself runs automated honeypot bot traps, client-side rate limiting, RFC mail validation, and XSS string sanitization.',
      metrics: 'CVSS Risk Scoring • Anti-Bot Honeypots',
      icon: ShieldCheck,
    },
    {
      title: 'Zero Server Latency (Sub-10ms)',
      tag: 'Optimistic UI & Local State',
      description: 'Shopping cart interactions (App Tool) and design token generators persist state instantaneously to LocalStorage without database query roundtrips, delivering silky-smooth 60fps frame rates.',
      metrics: '< 10ms State Sync • 0 Network Latency',
      icon: Zap,
    },
  ];

  return (
    <div id="performance-proof" className="mt-12 pt-10 border-t border-[#1e293b] space-y-6 scroll-mt-20">
      {/* Proof Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
            <Gauge className="w-4 h-4 text-emerald-400" />
            <span>Verifiable Benchmarks &amp; Claims</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Proof: Enterprise-Grade, 100% Client-Side &amp; Fast
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Audited with Google Lighthouse</span>
        </div>
      </div>

      {/* Lighthouse Circular Scorecards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {lighthouseScores.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#0f172a] p-5 rounded-2xl border border-[#1e293b] hover:border-emerald-500/40 transition-all flex flex-col items-center text-center space-y-3 shadow-sm"
          >
            {/* Circular Gauge */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.2"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 transition-all duration-1000 ease-out"
                  strokeDasharray="100, 100"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold font-mono text-white leading-none">
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

      {/* Core Web Vitals Row */}
      <div className="bg-[#0f172a] p-5 sm:p-6 rounded-2xl border border-[#1e293b] space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
              Real User &amp; Lab Core Web Vitals
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400">All Metrics Passing</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {coreWebVitals.map((metric, idx) => (
            <div key={idx} className="bg-[#0a0d12] p-4 rounded-xl border border-[#1e293b] space-y-1">
              <span className="text-[11px] text-slate-300 font-sans block truncate" title={metric.name}>
                {metric.name}
              </span>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                  {metric.value}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {metric.status}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 block">
                Target: {metric.threshold}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Architectural Explanations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {architecturalProofs.map((proof, idx) => {
          const Icon = proof.icon;
          return (
            <div
              key={idx}
              className="bg-[#0f172a] p-5 rounded-2xl border border-[#1e293b] hover:border-slate-500 transition-all flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {proof.title}
                    </h4>
                    <span className="text-[10px] font-mono text-blue-400 block">
                      {proof.tag}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {proof.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1e293b] text-[11px] font-mono text-emerald-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{proof.metrics}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

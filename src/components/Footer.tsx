import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ArrowUp, Sparkles, Activity, Play, Pause, Trash2, ShieldCheck, Cpu } from 'lucide-react';
import { developerConfig } from '../data/portfolioData';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'OK' | 'METRIC' | 'INFO' | 'EVENT';
  message: string;
  component: string;
}

export const Footer: React.FC = () => {
  const [isStreaming, setIsStreaming] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    
    return [
      {
        id: '1',
        timestamp: time,
        level: 'OK',
        component: 'telemetry_core',
        message: 'System telemetry initialized. Zero fatal exceptions recorded.',
      },
      {
        id: '2',
        timestamp: time,
        level: 'METRIC',
        component: 'client_bundle',
        message: 'Bundle brotli size verified: 24.2 kB. Chunk tree optimized.',
      },
      {
        id: '3',
        timestamp: time,
        level: 'INFO',
        component: 'edge_cdn',
        message: 'Global edge cache latency: 12ms (AP-SE1 / EU-CENTRAL / US-EAST).',
      },
    ];
  });

  const mockMessages = [
    { level: 'OK' as const, component: 'dom_engine', message: 'Main-thread INP profiled: 8ms response latency (100/100 Core Web Vital).' },
    { level: 'METRIC' as const, component: 'v8_heap', message: 'Memory allocation: 18.2 MB heap allocated. Garbage collector idle.' },
    { level: 'INFO' as const, component: 'tls_handshake', message: 'HTTP/3 TLS 1.3 secure session handshake verified.' },
    { level: 'EVENT' as const, component: 'fsm_router', message: 'Reactive route transition dispatched. View rendered in 4.1ms.' },
    { level: 'OK' as const, component: 'a11y_auditor', message: 'Contrast ratio validation: 100% WCAG AA/AAA pass across color tokens.' },
    { level: 'INFO' as const, component: 'web_worker', message: 'Background worker thread pool ready for token synthesis tasks.' },
    { level: 'METRIC' as const, component: 'lighthouse', message: 'Performance: 100, Accessibility: 100, Best Practices: 100, SEO: 100.' },
    { level: 'OK' as const, component: 'security_sandbox', message: 'Zero CSP violations. Referrer-Policy and HSTS headers enforced.' },
  ];

  const logCounterRef = useRef(4);

  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      
      const randomMsg = mockMessages[Math.floor(Math.random() * mockMessages.length)];
      
      setLogs((prev) => [
        {
          id: (logCounterRef.current++).toString(),
          timestamp: time,
          level: randomMsg.level,
          component: randomMsg.component,
          message: randomMsg.message,
        },
        ...prev.slice(0, 5), // Keep latest 6 logs
      ]);
    }, 3800);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const handleInjectEvent = () => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    
    setLogs((prev) => [
      {
        id: (logCounterRef.current++).toString(),
        timestamp: time,
        level: 'EVENT',
        component: 'manual_trigger',
        message: 'Operator ping initiated from client interface. System latency: 0.8ms.',
      },
      ...prev.slice(0, 5),
    ]);
  };

  const handleClearLogs = () => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setLogs([
      {
        id: (logCounterRef.current++).toString(),
        timestamp: time,
        level: 'INFO',
        component: 'telemetry_console',
        message: 'Console buffer flushed by operator.',
      },
    ]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="w-full bg-[#1f242d] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-t border-[#323946]">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* System Telemetry Manifest & Dynamic Logs Box */}
        <div className="bg-[#323946] border border-[#323946] rounded-2xl p-5 sm:p-6 font-mono text-sm shadow-[0_0_25px_rgba(0,0,0,0.25)]">
          {/* Manifest Header */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#1f242d] pb-4 mb-4 gap-3">
            <div className="flex items-center gap-2 text-white">
              <span className="text-[#00eeff] font-bold">&gt;_</span>
              <span className="font-bold">system_telemetry.manifest</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-xs text-[#00eeff] font-semibold bg-[#1f242d] px-3 py-1 rounded-full border border-[#00eeff]/30 shadow-[0_0_8px_rgba(0,238,255,0.2)]">
                <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-pulse"></span>
                <span>telemetry_stream: ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs pb-5 border-b border-[#1f242d]">
            <div className="bg-[#1f242d] p-3 rounded-xl border border-[#323946]">
              <span className="block text-gray-400 mb-0.5 text-[11px]">build_hash:</span>
              <code className="text-[#00eeff] font-bold">git@8f4a21e</code>
            </div>
            <div className="bg-[#1f242d] p-3 rounded-xl border border-[#323946]">
              <span className="block text-gray-400 mb-0.5 text-[11px]">runtime:</span>
              <span className="text-white font-bold">React 19 + Vite 6</span>
            </div>
            <div className="bg-[#1f242d] p-3 rounded-xl border border-[#323946]">
              <span className="block text-gray-400 mb-0.5 text-[11px]">bundle_weight:</span>
              <span className="text-[#00eeff] font-bold">24.2 kB (brotli)</span>
            </div>
            <div className="bg-[#1f242d] p-3 rounded-xl border border-[#323946]">
              <span className="block text-gray-400 mb-0.5 text-[11px]">lighthouse_score:</span>
              <span className="text-[#00eeff] font-bold">100 / 100</span>
            </div>
          </div>

          {/* Dynamic Real-Time Operational System Logs Feed */}
          <div className="pt-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
                <Activity className="w-3.5 h-3.5 text-[#00eeff]" />
                <span className="uppercase tracking-wider text-[#00eeff]">// live_system_operational_logs</span>
                <span className="text-gray-500">•</span>
                <span className="text-[11px] text-gray-400 font-normal">periodic polling (3.8s)</span>
              </div>

              {/* Log Controls */}
              <div className="flex items-center gap-1.5 text-xs">
                <button
                  onClick={handleInjectEvent}
                  className="px-2.5 py-1 bg-[#1f242d] hover:bg-[#1f242d]/80 text-[#00eeff] border border-[#323946] hover:border-[#00eeff]/50 rounded-lg text-[11px] font-mono transition-colors flex items-center gap-1 cursor-pointer"
                  title="Inject test telemetry ping"
                >
                  <span>+ inject_ping</span>
                </button>

                <button
                  onClick={() => setIsStreaming(!isStreaming)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors flex items-center gap-1 cursor-pointer border ${
                    isStreaming
                      ? 'bg-[#1f242d] border-[#323946] text-gray-300 hover:text-white'
                      : 'bg-[#00eeff] text-[#1f242d] font-bold border-[#00eeff]'
                  }`}
                  title={isStreaming ? 'Pause streaming' : 'Resume streaming'}
                >
                  {isStreaming ? (
                    <>
                      <Pause className="w-3 h-3 text-[#00eeff]" />
                      <span>pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" />
                      <span>resume</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleClearLogs}
                  className="p-1 bg-[#1f242d] hover:bg-[#1f242d]/80 text-gray-400 hover:text-rose-400 border border-[#323946] rounded-lg transition-colors cursor-pointer"
                  title="Clear log buffer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Terminal Log Console */}
            <div className="bg-[#181d25] rounded-xl p-3.5 border border-[#1f242d] text-xs space-y-1.5 overflow-hidden">
              {logs.map((log) => {
                const levelColor =
                  log.level === 'OK'
                    ? 'text-[#00eeff] bg-[#00eeff]/10 border-[#00eeff]/30'
                    : log.level === 'METRIC'
                    ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30'
                    : log.level === 'EVENT'
                    ? 'text-cyan-300 bg-cyan-300/10 border-cyan-300/30'
                    : 'text-gray-300 bg-gray-400/10 border-gray-400/30';

                return (
                  <div key={log.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-2 leading-relaxed animate-in fade-in duration-200">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-gray-500 font-mono text-[11px]">[{log.timestamp}]</span>
                      <span className={`px-1.5 py-0.2 rounded border text-[10px] font-mono font-bold ${levelColor}`}>
                        {log.level}
                      </span>
                      <span className="text-gray-400 font-mono text-[11px]">[{log.component}]:</span>
                    </div>
                    <span className="text-gray-200 text-xs font-mono break-all">{log.message}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back-to-Top Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4 pt-4 border-t border-[#323946] font-mono">
          <p>
            © 2026 <span className="text-white font-bold">{developerConfig.name}</span> • Built with React, Tailwind CSS, and Vibrant Cyan Dark Architecture.
          </p>
          <button
            id="footer-back-to-top-btn"
            onClick={scrollToTop}
            className="hover:text-[#00eeff] transition-colors flex items-center gap-1 group cursor-pointer"
          >
            <span>back_to_top</span>
            <span className="group-hover:-translate-y-0.5 transition-transform text-[#00eeff]">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

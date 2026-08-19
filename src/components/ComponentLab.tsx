import React, { useState, useEffect, useRef } from 'react';
import {
  Sliders,
  Play,
  RotateCcw,
  Zap,
  Activity,
  Layers,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  Cpu
} from 'lucide-react';
import { useToast } from './Toast';

export const ComponentLab: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'tokens' | 'perf' | 'fsm'>('tokens');

  // Token Synthesizer State
  const [baseGrid, setBaseGrid] = useState<number>(4);
  const [typeScaleRatio, setTypeScaleRatio] = useState<number>(1.25);
  const [brandHue, setBrandHue] = useState<number>(217); // Blue-ish
  const [tokensCopied, setTokensCopied] = useState(false);

  // Performance RAF State
  const [isRunningRaf, setIsRunningRaf] = useState(false);
  const [fps, setFps] = useState(60);
  const [frameHistory, setFrameHistory] = useState<number[]>([]);
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const framesCountRef = useRef<number>(0);

  // FSM State
  const [fsmState, setFsmState] = useState<'IDLE' | 'FETCHING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [fsmLogs, setFsmLogs] = useState<string[]>([
    'State machine initialized with state: IDLE',
  ]);

  // Handle RAF loop
  useEffect(() => {
    if (!isRunningRaf) {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      return;
    }

    const loop = (now: number) => {
      framesCountRef.current++;
      const elapsed = now - lastTimeRef.current;

      if (elapsed >= 1000) {
        const currentFps = Math.round((framesCountRef.current * 1000) / elapsed);
        setFps(currentFps);
        setFrameHistory((prev) => [...prev.slice(-19), currentFps]);
        framesCountRef.current = 0;
        lastTimeRef.current = now;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isRunningRaf]);

  const handleFsmTransition = (target: 'IDLE' | 'FETCHING' | 'SUCCESS' | 'ERROR') => {
    const timestamp = new Date().toLocaleTimeString();
    setFsmState(target);
    setFsmLogs((prev) => [`[${timestamp}] Transitioned: ${fsmState} → ${target}`, ...prev.slice(0, 5)]);
  };

  const handleCopyTokens = () => {
    const cssCode = `:root {\n  --base-grid: ${baseGrid}px;\n  --type-scale-ratio: ${typeScaleRatio};\n  --brand-primary: hsl(${brandHue}, 90%, 60%);\n  --brand-surface: hsl(${brandHue}, 30%, 12%);\n}`;
    navigator.clipboard.writeText(cssCode);
    setTokensCopied(true);
    showToast('Design tokens copied to clipboard');
    setTimeout(() => setTokensCopied(false), 2500);
  };

  return (
    <section id="component_lab" className="py-20 bg-[#0a0d12] text-[#f8fafc] border-b border-[#1e293b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#1e293b]">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#3b82f6] uppercase tracking-wider block">
              Interactive Workbench
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f8fafc]">
              Component &amp; Performance Lab
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#94a3b8] max-w-md leading-relaxed font-sans">
            Live interactive tools demonstrating token synthesis, non-blocking RAF rendering, and deterministic finite state machines.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('tokens')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'tokens'
                ? 'bg-[#2563eb] text-white shadow-sm'
                : 'bg-[#0f172a] text-[#94a3b8] hover:text-[#f8fafc] hover:border-slate-600 border border-[#1e293b]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Design Token Synthesizer</span>
          </button>

          <button
            onClick={() => setActiveTab('perf')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'perf'
                ? 'bg-[#2563eb] text-white shadow-sm'
                : 'bg-[#0f172a] text-[#94a3b8] hover:text-[#f8fafc] hover:border-slate-600 border border-[#1e293b]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>60 FPS RAF Profiler</span>
          </button>

          <button
            onClick={() => setActiveTab('fsm')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'fsm'
                ? 'bg-[#2563eb] text-white shadow-sm'
                : 'bg-[#0f172a] text-[#94a3b8] hover:text-[#f8fafc] hover:border-slate-600 border border-[#1e293b]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Deterministic FSM State</span>
          </button>
        </div>

        {/* Tab 1: Design Token Synthesizer */}
        {activeTab === 'tokens' && (
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#1e293b]">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#f8fafc]">
                  Mathematical Token &amp; Scale Synthesizer
                </h3>
                <p className="text-xs text-[#94a3b8] font-sans">
                  Adjust grid baselines, typographic scales, and HSL palettes in real-time.
                </p>
              </div>
              <button
                onClick={handleCopyTokens}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0a0d12] hover:bg-[#1e293b] border border-[#1e293b] hover:border-slate-600 text-xs font-mono text-[#94a3b8] hover:text-[#f8fafc] transition-all cursor-pointer"
              >
                {tokensCopied ? <Check className="w-3.5 h-3.5 text-[#22c55e]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{tokensCopied ? 'Copied CSS' : 'Copy Tokens'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Controls Column */}
              <div className="space-y-6">
                {/* Base Grid Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#94a3b8]">Base Spacing Unit:</span>
                    <span className="text-[#3b82f6] font-bold">{baseGrid}px</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    step="1"
                    value={baseGrid}
                    onChange={(e) => setBaseGrid(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>2px (Ultra-Dense)</span>
                    <span>8px (Standard)</span>
                    <span>12px (Spacious)</span>
                  </div>
                </div>

                {/* Type Scale Ratio */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#94a3b8]">Type Scale Ratio:</span>
                    <span className="text-[#3b82f6] font-bold">{typeScaleRatio} (Major Third)</span>
                  </div>
                  <input
                    type="range"
                    min="1.1"
                    max="1.4"
                    step="0.025"
                    value={typeScaleRatio}
                    onChange={(e) => setTypeScaleRatio(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                {/* Brand Color Hue */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#94a3b8]">Brand Color Hue:</span>
                    <span className="text-[#3b82f6] font-bold">{brandHue}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="5"
                    value={brandHue}
                    onChange={(e) => setBrandHue(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Live Preview Column */}
              <div
                className="p-6 rounded-xl border transition-colors space-y-4"
                style={{
                  backgroundColor: `hsl(${brandHue}, 30%, 10%)`,
                  borderColor: `hsl(${brandHue}, 40%, 25%)`,
                }}
              >
                <span className="text-[11px] font-mono uppercase tracking-wider block" style={{ color: `hsl(${brandHue}, 80%, 65%)` }}>
                  Live Dynamic Preview
                </span>

                <div className="space-y-2">
                  <div
                    className="font-bold text-[#f8fafc] leading-tight"
                    style={{ fontSize: `${16 * Math.pow(typeScaleRatio, 2)}px` }}
                  >
                    Heading Display
                  </div>
                  <div
                    className="font-semibold text-slate-200"
                    style={{ fontSize: `${16 * typeScaleRatio}px` }}
                  >
                    Subheading Level 2
                  </div>
                  <p className="text-sm text-[#94a3b8] leading-relaxed font-sans">
                    Body text scaling computed with base grid of {baseGrid}px and mathematical modular multiplier.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    className="px-4 py-2 rounded-lg font-semibold text-xs text-white shadow-sm transition-all"
                    style={{ backgroundColor: `hsl(${brandHue}, 85%, 50%)` }}
                  >
                    Primary Button
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg text-xs font-medium text-[#94a3b8] border transition-all"
                    style={{
                      backgroundColor: `hsl(${brandHue}, 20%, 15%)`,
                      borderColor: `hsl(${brandHue}, 35%, 30%)`,
                    }}
                  >
                    Secondary Action
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 60 FPS RAF Profiler */}
        {activeTab === 'perf' && (
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#1e293b]">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#f8fafc]">
                  Non-Blocking Frame Rate &amp; RAF Engine
                </h3>
                <p className="text-xs text-[#94a3b8] font-sans">
                  Measure frame intervals and observe 60 FPS non-blocking execution.
                </p>
              </div>
              <button
                onClick={() => setIsRunningRaf(!isRunningRaf)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isRunningRaf
                    ? 'bg-rose-600 hover:bg-rose-500 text-white'
                    : 'bg-[#2563eb] hover:bg-[#3b82f6] text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isRunningRaf ? 'Stop Profiler' : 'Start Profiler'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#0a0d12] p-5 rounded-xl border border-[#1e293b] text-center space-y-1">
                <span className="text-3xl font-bold font-mono text-[#f8fafc] block">
                  {isRunningRaf ? `${fps} FPS` : 'Idle'}
                </span>
                <span className="text-xs text-[#94a3b8]">Current Frame Rate</span>
              </div>
              <div className="bg-[#0a0d12] p-5 rounded-xl border border-[#1e293b] text-center space-y-1">
                <span className="text-3xl font-bold font-mono text-[#22c55e] block">
                  {isRunningRaf ? `${(1000 / Math.max(fps, 1)).toFixed(1)} ms` : '—'}
                </span>
                <span className="text-xs text-[#94a3b8]">Frame Budget Latency</span>
              </div>
              <div className="bg-[#0a0d12] p-5 rounded-xl border border-[#1e293b] text-center space-y-1">
                <span className="text-3xl font-bold font-mono text-[#3b82f6] block">0</span>
                <span className="text-xs text-[#94a3b8]">Main-Thread Drops</span>
              </div>
            </div>

            {/* Frame History Bars */}
            <div className="bg-[#0a0d12] p-5 rounded-xl border border-[#1e293b] space-y-3">
              <div className="flex justify-between text-xs font-mono text-[#94a3b8]">
                <span>Recent Frame History (last 20 intervals):</span>
                <span>{frameHistory.length} samples recorded</span>
              </div>
              <div className="flex items-end gap-1.5 h-20 pt-2">
                {frameHistory.length === 0 ? (
                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-500 font-mono">
                    Press "Start Profiler" to stream real-time RAF intervals
                  </div>
                ) : (
                  frameHistory.map((val, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-[#3b82f6] rounded-t transition-all duration-200"
                      style={{ height: `${(val / 60) * 100}%` }}
                      title={`${val} FPS`}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Deterministic FSM State */}
        {activeTab === 'fsm' && (
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#1e293b]">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#f8fafc]">
                  Deterministic Finite State Machine (FSM)
                </h3>
                <p className="text-xs text-[#94a3b8] font-sans">
                  Guarantees invalid state transitions cannot occur during asynchronous flows.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#94a3b8]">Active State:</span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-[#3b82f6] border border-blue-500/30">
                  {fsmState}
                </span>
              </div>
            </div>

            {/* Transition Action Buttons */}
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => handleFsmTransition('IDLE')}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-[#0a0d12] hover:bg-[#1e293b] text-[#94a3b8] hover:text-[#f8fafc] border border-[#1e293b] hover:border-slate-600 transition-all cursor-pointer"
              >
                Trigger → IDLE
              </button>
              <button
                onClick={() => handleFsmTransition('FETCHING')}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-[#0a0d12] hover:bg-[#1e293b] text-[#3b82f6] hover:text-blue-300 border border-[#1e293b] hover:border-blue-500/40 transition-all cursor-pointer"
              >
                Trigger → FETCHING
              </button>
              <button
                onClick={() => handleFsmTransition('SUCCESS')}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-[#0a0d12] hover:bg-[#1e293b] text-[#22c55e] hover:text-emerald-300 border border-[#1e293b] hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                Trigger → SUCCESS
              </button>
              <button
                onClick={() => handleFsmTransition('ERROR')}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-[#0a0d12] hover:bg-[#1e293b] text-rose-400 hover:text-rose-300 border border-[#1e293b] hover:border-rose-500/40 transition-all cursor-pointer"
              >
                Trigger → ERROR
              </button>
            </div>

            {/* FSM History Console */}
            <div className="bg-[#0a0d12] p-4 rounded-xl border border-[#1e293b] space-y-2">
              <div className="text-xs font-mono text-[#94a3b8]">Transition History Log:</div>
              <div className="space-y-1">
                {fsmLogs.map((log, idx) => (
                  <div key={idx} className="text-xs font-mono text-[#94a3b8]">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

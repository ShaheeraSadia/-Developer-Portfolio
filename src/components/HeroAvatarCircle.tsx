import React from 'react';
import { motion } from 'motion/react';

export const HeroAvatarCircle: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center p-2 sm:p-4 select-none w-full max-w-full overflow-hidden">
      {/* Soft, subtle ambient lighting - balanced and non-intrusive */}
      <div className="absolute inset-4 rounded-full bg-blue-500/5 blur-xl -z-10" />

      {/* Main Circular Container */}
      <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-84 md:h-84 lg:w-92 lg:h-92 max-w-[calc(100vw-2.5rem)] rounded-full flex items-center justify-center bg-[#0f172a]/80 backdrop-blur-sm border border-blue-500/30 shadow-xl shadow-black/40 shrink-0">
        
        {/* Inner Subtle Dashed Orbital Ring */}
        <div className="absolute inset-3 sm:inset-4 rounded-full border border-dashed border-blue-500/25" />

        {/* Floating Stack Badges - Responsive & high contrast */}
        {/* Top Right: React */}
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-4 sm:top-2 sm:right-8 z-20 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-[#0f172a] border border-[#1e293b] text-slate-200 font-mono text-[10px] sm:text-xs shadow-md"
        >
          React
        </motion.div>

        {/* Bottom Left: Tailwind CSS */}
        <motion.div
          animate={{ y: [2, -2, 2] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-4 sm:bottom-4 sm:left-6 z-20 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-[#0f172a] border border-[#1e293b] text-slate-200 font-mono text-[10px] sm:text-xs shadow-md"
        >
          Tailwind CSS
        </motion.div>

        {/* Top Left: JavaScript */}
        <motion.div
          animate={{ y: [1.5, -1.5, 1.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-8 left-1 sm:top-10 sm:left-0 z-20 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-lg bg-[#0f172a] border border-[#1e293b] text-slate-300 font-mono text-[10px] sm:text-[11px] shadow-md hidden sm:block"
        >
          JavaScript
        </motion.div>

        {/* Bottom Right: Web Workers */}
        <motion.div
          animate={{ y: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 right-1 sm:bottom-10 sm:right-0 z-20 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-lg bg-[#0f172a] border border-[#1e293b] text-slate-300 font-mono text-[10px] sm:text-[11px] shadow-md hidden sm:block"
        >
          Web Workers
        </motion.div>

        {/* Center Content Area */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 space-y-2 sm:space-y-2.5">
          {/* Code Brackets Circle */}
          <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-[#0a0d12] border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-sm">
            <span className="font-mono font-bold text-base sm:text-lg tracking-tighter">
              &lt;/&gt;
            </span>
          </div>

          {/* Subtitle / Focus */}
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
            Front-End &amp; Mobile
          </span>

          {/* Availability Title */}
          <h3 className="text-base sm:text-xl font-bold text-white tracking-tight">
            Available for Hire
          </h3>

          {/* Availability Status Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#0a0d12] border border-emerald-500/30 shadow-sm">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono text-emerald-400 font-medium whitespace-nowrap">
              5+ Yrs • Full-Time &amp; Freelance
            </span>
          </div>

          <span className="text-[10px] sm:text-[11px] font-mono text-slate-300">
            React • JavaScript • Vite
          </span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { motion } from 'motion/react';

export const HeroAvatarCircle: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center p-4 select-none">
      {/* Soft, subtle ambient lighting - balanced and non-intrusive */}
      <div className="absolute inset-4 rounded-full bg-blue-500/5 blur-xl -z-10" />

      {/* Main Circular Container */}
      <div className="relative w-64 h-64 sm:w-76 sm:h-76 md:w-84 md:h-84 lg:w-92 lg:h-92 rounded-full flex items-center justify-center bg-[#0f172a]/80 backdrop-blur-sm border border-blue-500/30 shadow-xl shadow-black/40">
        
        {/* Inner Subtle Dashed Orbital Ring */}
        <div className="absolute inset-3 sm:inset-4 rounded-full border border-dashed border-blue-500/25" />

        {/* Floating Stack Badges - Clean Handcrafted Style */}
        {/* Top Right: React */}
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1 right-6 sm:top-2 sm:right-8 z-20 px-3 py-1 rounded-lg bg-[#0f172a] border border-[#1e293b] text-slate-300 font-mono text-[11px] sm:text-xs shadow-md"
        >
          React
        </motion.div>

        {/* Bottom Left: Tailwind CSS */}
        <motion.div
          animate={{ y: [2, -2, 2] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-1 left-4 sm:bottom-4 sm:left-6 z-20 px-3 py-1 rounded-lg bg-[#0f172a] border border-[#1e293b] text-slate-300 font-mono text-[11px] sm:text-xs shadow-md"
        >
          Tailwind CSS
        </motion.div>

        {/* Top Left: TypeScript */}
        <motion.div
          animate={{ y: [1.5, -1.5, 1.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-8 -left-2 sm:top-10 sm:left-0 z-20 px-2.5 py-0.5 rounded-lg bg-[#0f172a] border border-[#1e293b] text-slate-400 font-mono text-[10px] sm:text-[11px] shadow-md hidden sm:block"
        >
          TypeScript
        </motion.div>

        {/* Bottom Right: Web Workers */}
        <motion.div
          animate={{ y: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 -right-2 sm:bottom-10 sm:right-0 z-20 px-2.5 py-0.5 rounded-lg bg-[#0f172a] border border-[#1e293b] text-slate-400 font-mono text-[10px] sm:text-[11px] shadow-md hidden sm:block"
        >
          Web Workers
        </motion.div>

        {/* Center Content Area */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 space-y-2 sm:space-y-3">
          {/* Code Brackets Circle */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-[#0a0d12] border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-sm">
            <span className="font-mono font-bold text-lg sm:text-xl tracking-tighter">
              &lt;/&gt;
            </span>
          </div>

          {/* Name */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Shaheera Sadia
          </h2>

          {/* Handle */}
          <span className="text-xs sm:text-sm font-mono text-blue-400 font-medium tracking-wide">
            @shaheerasadia.dev
          </span>

          {/* Experience Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a0d12] border border-[#1e293b] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono text-slate-300 font-medium whitespace-nowrap">
              5+ Yrs Frontend Dev
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

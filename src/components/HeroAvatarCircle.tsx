import React from 'react';
import { motion } from 'motion/react';

export const HeroAvatarCircle: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center p-4 select-none">
      {/* Outer ambient royal blue glow */}
      <div className="absolute inset-0 rounded-full bg-blue-600/20 blur-3xl -z-10 scale-95" />

      {/* Main Circular Container */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 lg:w-96 lg:h-96 rounded-full flex items-center justify-center bg-[#0a0d12]/60 backdrop-blur-sm">
        {/* Glowing Outer Solid Royal Blue Ring */}
        <div className="absolute inset-0 rounded-full border-2 sm:border-[3px] border-[#3b82f6] shadow-[0_0_35px_rgba(59,130,246,0.55),inset_0_0_20px_rgba(59,130,246,0.25)]" />

        {/* Inner Dashed Orbital Ring */}
        <div className="absolute inset-3 sm:inset-4 rounded-full border sm:border-2 border-dashed border-[#3b82f6]/50" />

        {/* Floating Orbital Tech Badges */}
        {/* Top Right: React */}
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1 right-6 sm:top-2 sm:right-10 z-20 px-3 py-1 rounded-lg bg-[#0a0d12]/95 border border-[#3b82f6]/60 text-blue-300 font-mono text-[11px] sm:text-xs shadow-lg backdrop-blur-md"
        >
          React
        </motion.div>

        {/* Bottom Left: Tailwind CSS */}
        <motion.div
          animate={{ y: [3, -3, 3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-1 left-4 sm:bottom-4 sm:left-6 z-20 px-3 py-1 rounded-lg bg-[#0a0d12]/95 border border-[#3b82f6]/60 text-blue-300 font-mono text-[11px] sm:text-xs shadow-lg backdrop-blur-md"
        >
          Tailwind CSS
        </motion.div>

        {/* Top Left: TypeScript */}
        <motion.div
          animate={{ y: [2, -2, 2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-8 -left-2 sm:top-12 sm:left-0 z-20 px-2.5 py-0.5 rounded-lg bg-[#0a0d12]/95 border border-[#3b82f6]/50 text-blue-300/90 font-mono text-[10px] sm:text-[11px] shadow-lg backdrop-blur-md hidden sm:block"
        >
          TypeScript
        </motion.div>

        {/* Bottom Right: Web Workers */}
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 -right-2 sm:bottom-12 sm:right-0 z-20 px-2.5 py-0.5 rounded-lg bg-[#0a0d12]/95 border border-[#3b82f6]/50 text-blue-300/90 font-mono text-[10px] sm:text-[11px] shadow-lg backdrop-blur-md hidden sm:block"
        >
          Web Workers
        </motion.div>

        {/* Inner Content Area */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 space-y-2 sm:space-y-3">
          {/* Top Code Brackets Circle */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#0a0d12] border-2 border-[#3b82f6] flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] text-[#3b82f6]">
            <span className="font-mono font-bold text-xl sm:text-2xl tracking-tighter">
              &lt;/&gt;
            </span>
          </div>

          {/* Name */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#f8fafc] tracking-tight">
            Shaheera Sadia
          </h2>

          {/* Handle / Domain */}
          <span className="text-xs sm:text-sm font-mono text-[#3b82f6] font-semibold tracking-wide">
            @shaheerasadia.dev
          </span>

          {/* Experience Pill */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#0a0d12]/90 border border-[#3b82f6]/60 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono text-blue-100 font-medium whitespace-nowrap">
              5+ Yrs Frontend Dev
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

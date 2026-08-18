import React from 'react';

interface TerminalDividerProps {
  label?: string;
  className?: string;
}

export const TerminalDivider: React.FC<TerminalDividerProps> = ({
  label,
  className = '',
}) => {
  return (
    <div className={`relative w-full max-w-6xl mx-auto my-2 px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Subtle Glowing Cyan Line */}
      <div className="relative flex items-center justify-center">
        {/* Glow backdrop layer */}
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00eeff]/60 to-transparent blur-[1px]"></div>
        {/* Crisp line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00eeff]/40 to-transparent"></div>

        {/* Center Terminal Node Badge */}
        {label ? (
          <div className="absolute px-3 py-0.5 bg-[#1f242d] border border-[#00eeff]/40 rounded-full text-[10px] font-mono text-[#00eeff] tracking-widest uppercase flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,238,255,0.35)] select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00eeff] animate-pulse shadow-[0_0_6px_#00eeff]"></span>
            <span>{label}</span>
          </div>
        ) : (
          <div className="absolute w-2.5 h-2.5 rotate-45 bg-[#1f242d] border border-[#00eeff] shadow-[0_0_8px_#00eeff] flex items-center justify-center">
            <div className="w-1 h-1 bg-[#00eeff]"></div>
          </div>
        )}
      </div>
    </div>
  );
};

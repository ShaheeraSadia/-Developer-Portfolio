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
    <div className={`relative w-full max-w-6xl mx-auto my-6 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div className="w-full h-px bg-[#1e293b]"></div>
        {label && (
          <div className="absolute px-3 py-1 bg-[#0a0d12] border border-[#1e293b] rounded-full text-[11px] font-mono text-[#94a3b8] select-none">
            {label}
          </div>
        )}
      </div>
    </div>
  );
};

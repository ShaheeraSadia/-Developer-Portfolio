import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ showLabel = false, className = '' }) => {
  const { theme, toggleTheme, isDay } = useTheme();

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0f172a] border border-[#1e293b] text-slate-400 hover:text-[#f8fafc] hover:border-slate-600 transition-all cursor-pointer shadow-sm group ${className}`}
      title={isDay ? 'Switch to Midnight Theme' : 'Switch to Day Theme'}
      aria-label="Toggle visual theme between Midnight and Day mode"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <motion.div
          key={theme}
          initial={{ rotate: -45, scale: 0.7, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 45, scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDay ? (
            <Sun className="w-4 h-4 text-amber-500 group-hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-4 h-4 text-blue-400 group-hover:-rotate-12 transition-transform" />
          )}
        </motion.div>
      </div>

      {showLabel && (
        <span className="text-xs font-mono font-medium capitalize">
          {isDay ? 'Day Mode' : 'Midnight Mode'}
        </span>
      )}
    </button>
  );
};

import React from 'react';
import { Terminal, ArrowUp } from 'lucide-react';
import { developerConfig } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="w-full max-w-6xl mx-auto mt-12 pt-8 pb-14 px-4 sm:px-6 lg:px-8">
      {/* System Telemetry Manifest */}
      <div className="bg-[#F3F3EE] border border-[#14151A]/10 rounded-xl p-6 font-mono text-sm shadow-2xs mb-8">
        {/* Manifest Header */}
        <div className="flex items-center justify-between border-b border-[#14151A]/10 pb-4 mb-4">
          <div className="flex items-center gap-2 text-[#14151A]">
            <span className="text-[#2F5CFF] font-bold">&gt;_</span>
            <span className="font-semibold">system_telemetry.manifest</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#1FAA6E] font-semibold bg-[#1FAA6E]/10 px-2.5 py-1 rounded-full border border-[#1FAA6E]/20">
            <span className="w-2 h-2 rounded-full bg-[#1FAA6E] animate-pulse"></span>
            <span>status: 200_OK</span>
          </div>
        </div>

        {/* Metric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div>
            <span className="block text-[#14151A]/50 mb-1">build_hash:</span>
            <code className="text-[#14151A] font-bold">git@8f4a21e</code>
          </div>
          <div>
            <span className="block text-[#14151A]/50 mb-1">runtime:</span>
            <span className="text-[#14151A] font-bold">React 19 + Vite 6</span>
          </div>
          <div>
            <span className="block text-[#14151A]/50 mb-1">bundle_weight:</span>
            <span className="text-[#2F5CFF] font-bold">24.2 kB (brotli)</span>
          </div>
          <div>
            <span className="block text-[#14151A]/50 mb-1">lighthouse_a11y:</span>
            <span className="text-[#1FAA6E] font-bold">100 / 100</span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Back-to-Top Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#14151A]/60 gap-4 pt-4 border-t border-[#14151A]/10 font-mono">
        <p>
          © 2026 {developerConfig.name}. • Crafted with zero-runtime design tokens &amp; accessible semantic HTML.
        </p>
        <button
          id="footer-back-to-top-btn"
          onClick={scrollToTop}
          className="hover:text-[#2F5CFF] transition-colors flex items-center gap-1 group cursor-pointer"
        >
          <span>back_to_top</span>
          <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
        </button>
      </div>
    </footer>
  );
};

import React from 'react';
import { Terminal, ArrowUp, Github, Heart } from 'lucide-react';
import { developerConfig } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#F4F3EF] text-[#14151A] border-t border-[#E7E6E2] py-12 font-mono text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Footer Top: Metadata Motif Config Block */}
        <div className="p-4 sm:p-6 rounded-lg bg-white border border-[#E7E6E2] space-y-3">
          <div className="flex items-center justify-between border-b border-[#E7E6E2] pb-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#2F5CFF]" />
              <span className="font-bold text-[#14151A]">system_telemetry.manifest</span>
            </div>
            <span className="text-[#1FAA6E] text-[11px] font-bold">status: 200_OK</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-[#64666E]">
            <div>
              <span className="text-[#9E9EA7] block">build_hash:</span>
              <span className="text-[#14151A] font-bold">git@8f4a21e</span>
            </div>
            <div>
              <span className="text-[#9E9EA7] block">runtime:</span>
              <span className="text-[#14151A] font-bold">React 19 + Vite 6</span>
            </div>
            <div>
              <span className="text-[#9E9EA7] block">bundle_weight:</span>
              <span className="text-[#2F5CFF] font-bold">24.2 kB (brotli)</span>
            </div>
            <div>
              <span className="text-[#9E9EA7] block">lighthouse_a11y:</span>
              <span className="text-[#1FAA6E] font-bold">100 / 100</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E7E6E2]/60 text-xs text-[#64666E]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {developerConfig.name}.</span>
            <span className="text-[#9E9EA7]">•</span>
            <span>Crafted with zero-runtime design tokens &amp; accessible semantic HTML.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#hero-section"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#14151A] hover:text-[#2F5CFF] transition-colors"
            >
              <span>back_to_top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

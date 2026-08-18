import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, FileText, Code2, ArrowUpRight, Clock } from 'lucide-react';
import { developerConfig } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  isConfigMode: boolean;
  onToggleConfigMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, isConfigMode, onToggleConfigMode }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'about', href: '#about' },
    { label: 'projects', href: '#projects' },
    { label: 'component_lab', href: '#component-lab' },
    { label: 'experience', href: '#experience' },
    { label: 'skills', href: '#skills-matrix' },
    { label: 'contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-50 w-full transition-all duration-200 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#E7E6E2] ${
        scrolled ? 'shadow-xs' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Branding / Handle with Monospace Key Motif */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            id="nav-logo"
            className="flex items-center gap-2 text-sm font-mono font-bold text-[#14151A] hover:text-[#2F5CFF] transition-colors group"
          >
            <div className="w-7 h-7 rounded bg-[#14151A] text-white flex items-center justify-center text-xs font-mono font-semibold group-hover:bg-[#2F5CFF] transition-colors">
              SS
            </div>
            <span className="tracking-tight">
              shaheerasadia<span className="text-[#2F5CFF]">.dev</span>
            </span>
          </a>

          {/* Availability badge */}
          <div
            id="nav-status-indicator"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F4F3EF] border border-[#E7E6E2] text-xs font-mono text-[#14151A]"
            title="Available for Web & Mobile Application Development Opportunities"
          >
            <span className="w-2 h-2 rounded-full bg-[#1FAA6E] animate-pulse-subtle"></span>
            <span className="text-[11px] text-[#64666E]">status:</span>
            <span className="font-medium text-[#14151A]">open_to_work</span>
          </div>
        </div>

        {/* Center / Right Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              id={`nav-link-${link.label}`}
              className="text-xs font-mono text-[#64666E] hover:text-[#2F5CFF] transition-colors tracking-tight relative py-1"
            >
              <span className="text-[#9E9EA7]">~/</span>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2.5">
          {/* Real-time SF Clock */}
          <div
            id="sf-clock-display"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#64666E] bg-[#F4F3EF] rounded border border-[#E7E6E2]"
            title="Current Time in San Francisco, CA (PST)"
          >
            <Clock className="w-3.5 h-3.5 text-[#2F5CFF]" />
            <span>SF {currentTime || '09:48:00 AM'}</span>
          </div>

          {/* Config / Raw JSON View Switcher */}
          <button
            id="toggle-config-mode-btn"
            onClick={onToggleConfigMode}
            className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono border transition-all ${
              isConfigMode
                ? 'bg-[#14151A] text-white border-[#14151A]'
                : 'bg-white text-[#64666E] border-[#D5D4CE] hover:text-[#14151A] hover:bg-[#F4F3EF]'
            }`}
            title="Toggle between Interactive UI Mode and Raw Config / JSON Schema View"
            aria-pressed={isConfigMode}
          >
            <Code2 className="w-3.5 h-3.5 text-[#2F5CFF]" />
            <span>{isConfigMode ? 'ui_mode' : 'raw_json'}</span>
          </button>

          {/* Resume Trigger */}
          <button
            id="open-resume-btn"
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded bg-[#14151A] text-white hover:bg-[#2F5CFF] transition-colors shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#14151A] hover:bg-[#F4F3EF] rounded border border-[#E7E6E2] transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden border-b border-[#E7E6E2] bg-[#FAFAF8] px-4 py-4 space-y-3"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E6E2] text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1FAA6E]"></span>
              <span className="text-[#64666E]">status: open_for_q2</span>
            </div>
            <div className="text-[#64666E]">SF {currentTime}</div>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-mono text-[#14151A] hover:bg-[#F4F3EF] hover:text-[#2F5CFF] rounded transition-colors"
              >
                <span className="text-[#9E9EA7]">~/</span>
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E7E6E2] flex items-center justify-between">
            <button
              onClick={() => {
                onToggleConfigMode();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono text-[#64666E] hover:text-[#2F5CFF] flex items-center gap-1.5"
            >
              <Code2 className="w-3.5 h-3.5 text-[#2F5CFF]" />
              <span>Toggle {isConfigMode ? 'UI View' : 'Raw JSON View'}</span>
            </button>
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono text-[#2F5CFF] font-semibold flex items-center gap-1"
            >
              <span>View Full CV</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

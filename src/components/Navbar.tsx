import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Code2, ArrowUpRight, Clock, ChevronRight, Sparkles, Home } from 'lucide-react';
import { developerConfig } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  isConfigMode: boolean;
  onToggleConfigMode: () => void;
  activeSection?: string;
  onNavigate?: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
  isConfigMode,
  onToggleConfigMode,
  activeSection = 'home',
  onNavigate,
}) => {
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'about', label: 'About', desc: 'Bio & Journey' },
    { id: 'services', label: 'Services', desc: 'Capabilities & Offerings' },
    { id: 'projects', label: 'Projects', desc: 'Live Demos & Code' },
    { id: 'skills', label: 'Skills', desc: 'Tech Stack & Proficiencies' },
    { id: 'experience', label: 'Experience', desc: 'Career Log & Milestones' },
    { id: 'component_lab', label: 'Lab', desc: 'Performance Workbench' },
    { id: 'architecture', label: 'Principles', desc: 'Architectural Standards' },
    { id: 'contact', label: 'Contact', desc: 'Direct Inquiries' },
  ];

  const handleNavClick = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-50 w-full transition-all duration-200 bg-[#1f242d]/95 backdrop-blur-md border-b border-[#323946] ${
        scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.5)] border-[#00eeff]/20' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left Branding / Handle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            id="nav-logo"
            className="flex items-center gap-2.5 text-sm font-mono font-bold text-white hover:text-[#00eeff] transition-colors group shrink-0 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#323946] border border-[#00eeff]/40 text-[#00eeff] flex items-center justify-center text-xs font-mono font-bold group-hover:bg-[#00eeff] group-hover:text-[#1f242d] group-hover:shadow-[0_0_12px_#00eeff] transition-all shrink-0">
              SS
            </div>
            <span className="tracking-tight whitespace-nowrap text-base">
              shaheerasadia<span className="text-[#00eeff]">.dev</span>
            </span>
          </button>

          {/* Availability badge */}
          <div
            id="nav-status-indicator"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#323946] border border-[#00eeff]/30 text-xs font-mono text-gray-200 whitespace-nowrap shrink-0 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-pulse shrink-0 shadow-[0_0_6px_#00eeff]"></span>
            <span className="text-gray-400 text-[11px]">status:</span>
            <span className="font-semibold text-white">open_to_work</span>
          </div>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 font-mono text-xs">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'home'
                ? 'bg-[#00eeff] text-[#1f242d] font-bold border border-[#00eeff] animate-nav-glow'
                : 'text-gray-300 hover:text-white hover:bg-[#323946] border border-transparent'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#00eeff] text-[#1f242d] font-bold border border-[#00eeff] animate-nav-glow'
                    : 'text-gray-300 hover:text-white hover:bg-[#323946] border border-transparent'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools: Clock, raw_json, Resume, Hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* SF Clock */}
          <div
            id="sf-clock-display"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-gray-300 bg-[#323946] rounded-lg border border-[#323946] whitespace-nowrap shrink-0"
            title="Current Time in San Francisco, CA (PST)"
          >
            <Clock className="w-3.5 h-3.5 text-[#00eeff] shrink-0" />
            <span className="whitespace-nowrap font-mono">SF {currentTime || '05:04:00 AM'}</span>
          </div>

          {/* Config / Raw JSON View Switcher */}
          <button
            id="toggle-config-mode-btn"
            onClick={onToggleConfigMode}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap shrink-0 shadow-xs cursor-pointer ${
              isConfigMode
                ? 'bg-[#00eeff] text-[#1f242d] font-bold border-[#00eeff] shadow-[0_0_12px_#00eeff]'
                : 'bg-[#323946] text-gray-300 border-[#323946] hover:text-[#00eeff] hover:border-[#00eeff]/50'
            }`}
            title="Toggle between UI Mode and Raw JSON Schema View"
            aria-pressed={isConfigMode}
          >
            <Code2 className="w-3.5 h-3.5 text-[#00eeff] shrink-0" />
            <span>{isConfigMode ? 'ui_mode' : 'raw_json'}</span>
          </button>

          {/* Resume Trigger */}
          <button
            id="open-resume-btn"
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg bg-[#00eeff] text-[#1f242d] hover:bg-[#55f3ff] hover:shadow-[0_0_15px_#00eeff] transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>Resume</span>
          </button>

          {/* Hamburger Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg border transition-all shadow-xs shrink-0 flex items-center justify-center cursor-pointer ${
              mobileMenuOpen
                ? 'bg-[#00eeff] text-[#1f242d] border-[#00eeff] shadow-[0_0_12px_#00eeff]'
                : 'bg-[#323946] text-white border-[#323946] hover:border-[#00eeff] hover:text-[#00eeff]'
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Navigation Drawer / Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-b border-[#323946] bg-[#1f242d] px-4 sm:px-6 lg:px-8 py-5 animate-in fade-in slide-in-from-top-2 duration-150 shadow-2xl"
        >
          <div className="max-w-6xl mx-auto space-y-4">
            {/* Drawer Header Info */}
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#323946] text-xs font-mono gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-pulse"></span>
                <span className="text-gray-400">click_to_open_section:</span>
                <span className="font-semibold text-white">Interactive Section Mode</span>
              </div>
              <button
                onClick={() => handleNavClick('home')}
                className="text-xs font-mono text-[#00eeff] font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <Home className="w-3 h-3" />
                <span>Return to Home Overview</span>
              </button>
            </div>

            {/* Navigation Grid Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`nav-drawer-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`group p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeSection === link.id
                      ? 'bg-[#323946] border-[#00eeff] shadow-[0_0_15px_rgba(0,238,255,0.4)] animate-nav-glow'
                      : 'bg-[#323946]/70 border-[#323946] hover:border-[#00eeff] hover:bg-[#323946]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-mono font-bold text-white group-hover:text-[#00eeff] transition-colors flex items-center gap-1">
                      <span className="text-[#00eeff] font-normal">~/</span>
                      <span>{link.label}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-sans">
                      {link.desc}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#00eeff] group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>

            {/* Quick Actions Footer inside Drawer */}
            <div className="pt-3 border-t border-[#323946] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  onToggleConfigMode();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-mono text-gray-300 hover:text-[#00eeff] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#323946] border border-[#323946] hover:border-[#00eeff]/40 transition-colors cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5 text-[#00eeff]" />
                <span>Switch to {isConfigMode ? 'UI View' : 'Raw JSON View'}</span>
              </button>

              <button
                onClick={() => handleNavClick('all')}
                className="text-xs font-mono text-gray-300 hover:text-white px-3 py-1.5 rounded-lg bg-[#323946] border border-[#323946] cursor-pointer"
              >
                <span>View All Sections (Stacked)</span>
              </button>

              <button
                onClick={() => {
                  onOpenResume();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-mono text-[#00eeff] font-bold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Open Resume Modal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

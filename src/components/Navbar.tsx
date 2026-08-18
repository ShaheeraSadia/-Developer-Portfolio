import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  FileText,
  Code2,
  ArrowUpRight,
  Clock,
  ChevronRight,
  Sparkles,
  Home,
  ChevronDown,
  UserCheck,
  Layers,
  FolderGit2,
  Wrench,
  Briefcase,
  FlaskConical,
  Cpu,
  MessageSquare
} from 'lucide-react';
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
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target as Node)
      ) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setMoreDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Primary navigation links shown directly in the header
  const primaryNavLinks = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  // Secondary navigation links available in the "More" dropdown
  const secondaryNavLinks = [
    { id: 'experience', label: 'Experience', desc: 'Career Log & Milestones', icon: Briefcase },
    { id: 'component_lab', label: 'Lab', desc: 'Interactive Performance Workbench', icon: FlaskConical },
    { id: 'architecture', label: 'Principles', desc: 'Architectural Standards & SLAs', icon: Cpu },
  ];

  // All navigation links for mobile drawer
  const allNavLinks = [
    { id: 'about', label: 'About', desc: 'Bio & Journey', icon: UserCheck },
    { id: 'services', label: 'Services', desc: 'Capabilities & Offerings', icon: Layers },
    { id: 'projects', label: 'Projects', desc: 'Live Demos & Source Code', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', desc: 'Tech Stack & Proficiencies', icon: Wrench },
    { id: 'experience', label: 'Experience', desc: 'Career Log & Milestones', icon: Briefcase },
    { id: 'component_lab', label: 'Lab', desc: 'Performance Workbench', icon: FlaskConical },
    { id: 'architecture', label: 'Principles', desc: 'Architectural Standards', icon: Cpu },
    { id: 'contact', label: 'Contact', desc: 'Direct Transmission', icon: MessageSquare },
  ];

  const handleNavClick = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    }
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isSecondaryActive = secondaryNavLinks.some((l) => l.id === activeSection);

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-50 w-full transition-all duration-200 bg-[#1f242d]/95 backdrop-blur-md border-b border-[#323946] ${
        scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.5)] border-[#00eeff]/20' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Branding / Handle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            id="nav-logo"
            className="flex items-center gap-2 text-sm font-mono font-bold text-white hover:text-[#00eeff] transition-colors group shrink-0 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#323946] border border-[#00eeff]/40 text-[#00eeff] flex items-center justify-center text-xs font-mono font-bold group-hover:bg-[#00eeff] group-hover:text-[#1f242d] group-hover:shadow-[0_0_12px_#00eeff] transition-all shrink-0">
              SS
            </div>
            <span className="tracking-tight whitespace-nowrap text-sm sm:text-base">
              shaheerasadia<span className="text-[#00eeff]">.dev</span>
            </span>
          </button>

          {/* Availability badge (shown on extra-wide screens only to prevent crowding) */}
          <div
            id="nav-status-indicator"
            className="hidden 2xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#323946] border border-[#00eeff]/30 text-xs font-mono text-gray-200 whitespace-nowrap shrink-0 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-pulse shrink-0 shadow-[0_0_6px_#00eeff]"></span>
            <span className="text-gray-400 text-[11px]">status:</span>
            <span className="font-semibold text-white">open_to_work</span>
          </div>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-xs shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              activeSection === 'home'
                ? 'bg-[#00eeff] text-[#1f242d] font-bold border border-[#00eeff] animate-nav-glow'
                : 'text-gray-300 hover:text-white hover:bg-[#323946] border border-transparent'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          {primaryNavLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#00eeff] text-[#1f242d] font-bold border border-[#00eeff] animate-nav-glow'
                    : 'text-gray-300 hover:text-white hover:bg-[#323946] border border-transparent'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {/* "More" Dropdown Menu for Experience, Lab & Principles */}
          <div className="relative" ref={moreDropdownRef}>
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                isSecondaryActive
                  ? 'bg-[#00eeff] text-[#1f242d] font-bold border border-[#00eeff] animate-nav-glow'
                  : 'text-gray-300 hover:text-white hover:bg-[#323946] border border-transparent'
              }`}
              aria-expanded={moreDropdownOpen}
              aria-haspopup="true"
            >
              <span>More</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#1f242d] border border-[#323946] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {secondaryNavLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full px-3.5 py-2.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#323946] text-[#00eeff] font-bold'
                          : 'text-gray-300 hover:text-white hover:bg-[#323946]/80'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#00eeff] shrink-0" />
                      <div>
                        <div className="text-xs font-mono font-semibold">{item.label}</div>
                        <div className="text-[10px] text-gray-400 font-sans">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Tools: Clock, raw_json, Resume, Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* SF Clock (shown on wide screens) */}
          <div
            id="sf-clock-display"
            className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono text-gray-300 bg-[#323946] rounded-lg border border-[#323946] whitespace-nowrap shrink-0"
            title="Current Time in San Francisco, CA (PST)"
          >
            <Clock className="w-3.5 h-3.5 text-[#00eeff] shrink-0" />
            <span className="whitespace-nowrap font-mono text-[11px]">SF {currentTime || '05:04 AM'}</span>
          </div>

          {/* Config / Raw JSON View Switcher */}
          <button
            id="toggle-config-mode-btn"
            onClick={onToggleConfigMode}
            className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              isConfigMode
                ? 'bg-[#00eeff] text-[#1f242d] font-bold border-[#00eeff] shadow-[0_0_10px_#00eeff]'
                : 'bg-[#323946] text-gray-300 border-[#323946] hover:text-[#00eeff] hover:border-[#00eeff]/50'
            }`}
            title="Toggle between UI Mode and Raw JSON Schema View"
            aria-pressed={isConfigMode}
          >
            <Code2 className="w-3.5 h-3.5 text-[#00eeff] shrink-0" />
            <span className="hidden sm:inline">{isConfigMode ? 'ui_mode' : 'raw_json'}</span>
          </button>

          {/* Resume Trigger (Always High Priority & Fully Visible) */}
          <button
            id="open-resume-btn"
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg bg-[#00eeff] text-[#1f242d] hover:bg-[#55f3ff] hover:shadow-[0_0_15px_#00eeff] transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>Resume</span>
          </button>

          {/* Hamburger Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg border transition-all shrink-0 flex items-center justify-center cursor-pointer ${
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
                <span className="text-gray-400">explore_sections:</span>
                <span className="font-semibold text-white">Interactive Section Hub</span>
              </div>
              <button
                onClick={() => handleNavClick('home')}
                className="text-xs font-mono text-[#00eeff] font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <Home className="w-3 h-3" />
                <span>Return to Home</span>
              </button>
            </div>

            {/* Navigation Grid Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {allNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-drawer-link-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    className={`group p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#323946] border-[#00eeff] shadow-[0_0_15px_rgba(0,238,255,0.4)] animate-nav-glow'
                        : 'bg-[#323946]/70 border-[#323946] hover:border-[#00eeff] hover:bg-[#323946]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-[#1f242d] border border-[#00eeff]/30 text-[#00eeff] shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-mono font-bold text-white group-hover:text-[#00eeff] transition-colors">
                          {link.label}
                        </div>
                        <p className="text-[10px] text-gray-400 font-sans">
                          {link.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#00eeff] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })}
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

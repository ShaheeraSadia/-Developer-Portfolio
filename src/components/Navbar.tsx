import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  FileText,
  Code2,
  Clock,
  ChevronDown,
  UserCheck,
  Layers,
  FolderGit2,
  Wrench,
  Briefcase,
  FlaskConical,
  Cpu,
  MessageSquare,
  Search,
  Command,
  Home
} from 'lucide-react';
import { developerConfig } from '../data/portfolioData';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onOpenResume: () => void;
  isConfigMode: boolean;
  onToggleConfigMode: () => void;
  activeSection?: string;
  onNavigate?: (section: string) => void;
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
  isConfigMode,
  onToggleConfigMode,
  activeSection = 'home',
  onNavigate,
  onOpenCommandPalette,
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
    { id: 'experience', label: 'Experience', desc: 'Career path & milestones', icon: Briefcase },
    { id: 'component_lab', label: 'Lab', desc: 'Interactive token & RAF profiler', icon: FlaskConical },
    { id: 'architecture', label: 'Principles', desc: 'SLA & engineering standards', icon: Cpu },
  ];

  // All navigation links for mobile drawer
  const allNavLinks = [
    { id: 'about', label: 'About', desc: 'Background & Story', icon: UserCheck },
    { id: 'services', label: 'Services', desc: 'Offerings & Capabilities', icon: Layers },
    { id: 'projects', label: 'Projects', desc: 'Featured Applications', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', desc: 'Technologies & Matrix', icon: Wrench },
    { id: 'experience', label: 'Experience', desc: 'Career History', icon: Briefcase },
    { id: 'component_lab', label: 'Lab', desc: 'Interactive Workbench', icon: FlaskConical },
    { id: 'architecture', label: 'Principles', desc: 'Engineering Standards', icon: Cpu },
    { id: 'contact', label: 'Contact', desc: 'Get in Touch', icon: MessageSquare },
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
      className={`sticky top-0 z-50 w-full transition-all duration-200 bg-[#0a0d12]/90 backdrop-blur-md border-b border-[#1e293b] ${
        scrolled ? 'shadow-md shadow-black/40' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left Branding */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            id="nav-logo"
            className="flex items-center gap-2.5 text-sm font-semibold text-[#f8fafc] hover:text-[#3b82f6] transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#2563eb] text-[#f8fafc] flex items-center justify-center text-xs font-bold font-mono shadow-sm group-hover:bg-[#3b82f6] transition-all shrink-0">
              SS
            </div>
            <span className="tracking-tight text-sm sm:text-base font-bold text-[#f8fafc]">
              shaheerasadia<span className="text-[#3b82f6] font-normal">.dev</span>
            </span>
          </button>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-medium shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-1.5 rounded-lg transition-colors duration-200 cursor-pointer flex items-center gap-1.5 font-medium ${
              activeSection === 'home'
                ? 'bg-[#2563eb] text-white font-semibold shadow-sm'
                : 'text-slate-100 hover:text-blue-400 hover:bg-[#0f172a]'
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
                className={`px-3 py-1.5 rounded-lg transition-colors duration-200 cursor-pointer font-medium ${
                  isActive
                    ? 'bg-[#2563eb] text-white font-semibold shadow-sm'
                    : 'text-slate-100 hover:text-blue-400 hover:bg-[#0f172a]'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {/* "More" Dropdown Menu */}
          <div className="relative" ref={moreDropdownRef}>
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`px-3 py-1.5 rounded-lg transition-colors duration-200 cursor-pointer flex items-center gap-1 font-medium ${
                isSecondaryActive
                  ? 'bg-[#2563eb] text-white font-semibold shadow-sm'
                  : 'text-slate-100 hover:text-blue-400 hover:bg-[#0f172a]'
              }`}
              aria-expanded={moreDropdownOpen}
              aria-haspopup="true"
            >
              <span>More</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0f172a] border border-[#1e293b] rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {secondaryNavLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full px-3.5 py-2.5 text-left flex items-center gap-2.5 transition-colors duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#1e293b] text-blue-400 font-semibold'
                          : 'text-slate-100 hover:text-blue-400 hover:bg-[#1e293b]'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-white">{item.label}</div>
                        <div className="text-[10px] text-slate-300">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Command Palette Trigger Button */}
          {onOpenCommandPalette && (
            <button
              id="open-command-palette-btn"
              onClick={onOpenCommandPalette}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0f172a] text-[#94a3b8] border border-[#1e293b] hover:border-slate-600 hover:text-[#f8fafc] transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm group"
              title="Open Command Palette (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#3b82f6] transition-colors shrink-0" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0a0d12] border border-[#1e293b] text-[#94a3b8]">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </button>
          )}

          {/* SF Clock */}
          <div
            id="sf-clock-display"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#94a3b8] bg-[#0f172a] rounded-lg border border-[#1e293b] whitespace-nowrap shrink-0"
            title="Local Time (PST)"
          >
            <Clock className="w-3.5 h-3.5 text-[#94a3b8] shrink-0" />
            <span>SF {currentTime || '05:04 PM'}</span>
          </div>

          {/* Theme Mode Switcher (Day / Midnight) */}
          <ThemeToggle />

          {/* Config / Raw JSON View Switcher */}
          <button
            id="toggle-config-mode-btn"
            onClick={onToggleConfigMode}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              isConfigMode
                ? 'bg-[#2563eb] text-white font-semibold border-blue-500'
                : 'bg-[#0f172a] text-[#94a3b8] border-[#1e293b] hover:text-[#f8fafc] hover:border-slate-600'
            }`}
            title="Toggle between UI Mode and Raw JSON Schema View"
          >
            <Code2 className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">{isConfigMode ? 'UI' : 'JSON'}</span>
          </button>

          {/* Resume Trigger */}
          <button
            id="open-resume-btn"
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#2563eb] hover:bg-[#3b82f6] text-white shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>Resume</span>
          </button>

          {/* Hamburger Menu (Mobile) */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#0f172a] text-[#94a3b8] border border-[#1e293b] hover:text-[#f8fafc] hover:border-slate-600 transition-all shrink-0 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden border-b border-[#1e293b] bg-[#0a0d12] px-4 py-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150 shadow-xl"
        >
          {/* Mobile Theme Toggle Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
            <span className="text-xs font-mono text-slate-400">Theme Mode:</span>
            <ThemeToggle showLabel={true} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {allNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-[#1e293b] border-blue-500/50'
                      : 'bg-[#0f172a] border-[#1e293b] hover:border-slate-600'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-[#0a0d12] text-[#3b82f6] shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-100 group-hover:text-blue-400">{link.label}</div>
                    <div className="text-[10px] text-slate-300">{link.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

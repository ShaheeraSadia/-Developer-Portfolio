import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  ArrowRight,
  FolderGit2,
  Wrench,
  Briefcase,
  Layers,
  FlaskConical,
  Cpu,
  UserCheck,
  MessageSquare,
  FileText,
  Code2,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Command,
  CornerDownLeft,
  Home,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { developerConfig, projectsData, experienceData, skillCategories } from '../data/portfolioData';
import { Project } from '../types';
import { useToast } from './Toast';
import { useTheme } from '../context/ThemeContext';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenProject: (project: Project) => void;
  onOpenResume: () => void;
  onToggleConfigMode: () => void;
}

type ItemType = 'section' | 'project' | 'skill' | 'experience' | 'action';

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  type: ItemType;
  icon: React.ElementType;
  tags?: string[];
  action: () => void;
  externalUrl?: string;
  metaBadge?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenProject,
  onOpenResume,
  onToggleConfigMode,
}) => {
  const { showToast } = useToast();
  const { theme, toggleTheme, isDay } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Build searchable index
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // 1. Navigation sections
    const sections = [
      { id: 'home', title: 'Home Overview', subtitle: 'Launchpad & Executive Summary', icon: Home },
      { id: 'about', title: 'About Me', subtitle: 'Developer Journey & Background', icon: UserCheck },
      { id: 'services', title: 'Services & Capabilities', subtitle: 'Single Page Apps, Client Tools & Mobile', icon: Layers },
      { id: 'projects', title: 'Featured Projects', subtitle: 'Production Applications & Case Studies', icon: FolderGit2 },
      { id: 'skills', title: 'Skills & Stack Matrix', subtitle: 'React, TypeScript, Tailwind & Web Workers', icon: Wrench },
      { id: 'experience', title: 'Career Timeline', subtitle: 'Professional Roles & Milestones', icon: Briefcase },
      { id: 'component_lab', title: 'Interactive Lab', subtitle: 'Design Tokens, 60 FPS Profiler & State Machine', icon: FlaskConical },
      { id: 'architecture', title: 'Architecture Principles', subtitle: 'Zero Server Latency & SLA Standards', icon: Cpu },
      { id: 'contact', title: 'Contact', subtitle: 'Send a Message or Project Inquiry', icon: MessageSquare },
      { id: 'all', title: 'Continuous Full Page View', subtitle: 'Render all sections continuously', icon: Layers },
    ];

    sections.forEach((sec) => {
      items.push({
        id: `nav-${sec.id}`,
        title: sec.title,
        subtitle: sec.subtitle,
        category: 'Navigation',
        type: 'section',
        icon: sec.icon,
        action: () => {
          onNavigate(sec.id);
          onClose();
        },
      });
    });

    // 2. Projects
    projectsData.forEach((p) => {
      items.push({
        id: `project-${p.id}`,
        title: p.title,
        subtitle: p.summary,
        category: 'Project',
        type: 'project',
        icon: FolderGit2,
        tags: p.stack,
        metaBadge: `${p.category} (${p.year})`,
        externalUrl: p.liveUrl,
        action: () => {
          onOpenProject(p);
          onClose();
        },
      });
    });

    // 3. Skills
    skillCategories.forEach((catGroup) => {
      catGroup.skills.forEach((skill) => {
        items.push({
          id: `skill-${skill.name}`,
          title: skill.name,
          subtitle: `${skill.level} Proficiency • ${skill.focus}`,
          category: 'Skill',
          type: 'skill',
          icon: Wrench,
          metaBadge: catGroup.category,
          action: () => {
            onNavigate('skills');
            onClose();
          },
        });
      });
    });

    // 4. Experience
    experienceData.forEach((exp) => {
      items.push({
        id: `exp-${exp.id}`,
        title: `${exp.role} @ ${exp.company}`,
        subtitle: `${exp.period} • ${exp.location}`,
        category: 'Experience',
        type: 'experience',
        icon: Briefcase,
        tags: exp.technologies,
        metaBadge: exp.type,
        action: () => {
          onNavigate('experience');
          onClose();
        },
      });
    });

    // 5. Actions & Quick Utilities
    items.push({
      id: 'action-resume',
      title: 'View Verified Resume & Credentials',
      subtitle: 'Open full-screen interactive curriculum vitae with export options',
      category: 'Actions',
      type: 'action',
      icon: FileText,
      action: () => {
        onOpenResume();
        onClose();
      },
    });

    items.push({
      id: 'action-config',
      title: 'Inspect Developer JSON Manifest',
      subtitle: 'View raw programmatic configuration schema & data feeds',
      category: 'Actions',
      type: 'action',
      icon: Code2,
      action: () => {
        onToggleConfigMode();
        onClose();
      },
    });

    items.push({
      id: 'action-email',
      title: 'Copy Direct Email Address',
      subtitle: developerConfig.email,
      category: 'Actions',
      type: 'action',
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText(developerConfig.email);
        showToast('Developer email copied to clipboard');
        onClose();
      },
    });

    items.push({
      id: 'action-theme-toggle',
      title: isDay ? 'Switch to Midnight Theme (Dark Mode)' : 'Switch to Day Theme (Light Mode)',
      subtitle: `Currently active: ${isDay ? 'Day Mode' : 'Midnight Mode'}`,
      category: 'Actions',
      type: 'action',
      icon: isDay ? Moon : Sun,
      action: () => {
        toggleTheme();
        showToast(isDay ? 'Switched to Midnight theme' : 'Switched to Day theme');
        onClose();
      },
    });

    items.push({
      id: 'action-github',
      title: 'Open GitHub Profile',
      subtitle: developerConfig.github,
      category: 'Actions',
      type: 'action',
      icon: ExternalLink,
      action: () => {
        window.open(developerConfig.github, '_blank', 'noopener,noreferrer');
        onClose();
      },
    });

    return items;
  }, [onNavigate, onOpenProject, onOpenResume, onToggleConfigMode, onClose, showToast, isDay, toggleTheme]);

  // Fuzzy filter logic
  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return allItems.slice(0, 12);
    }

    const tokens = query.toLowerCase().trim().split(/\s+/);

    return allItems.filter((item) => {
      const searchTarget = [
        item.title,
        item.subtitle,
        item.category,
        item.metaBadge || '',
        ...(item.tags || []),
      ]
        .join(' ')
        .toLowerCase();

      return tokens.every((token) => searchTarget.includes(token));
    });
  }, [query, allItems]);

  // Reset selected index on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  // Keyboard navigation inside modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="command-palette-backdrop"
          className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-20 bg-black/80 backdrop-blur-md overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
        >
          <motion.div
            id="command-palette-container"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-[#0f172a] border border-[#1e293b] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh]"
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-[#1e293b] bg-[#0a0d12]">
              <Search className="w-5 h-5 text-[#3b82f6] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, skills, experience, or actions..."
                className="w-full bg-transparent text-[#f8fafc] placeholder-slate-500 text-sm sm:text-base font-sans outline-none focus:ring-0"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-[#94a3b8] hover:text-[#f8fafc] rounded-lg transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-[#94a3b8] px-2 py-0.5 rounded bg-[#0f172a] border border-[#1e293b]">
                <span>ESC</span>
              </div>
            </div>

            {/* Category / Result Count Bar */}
            <div className="px-4 sm:px-5 py-2 border-b border-[#1e293b] bg-[#0a0d12] flex items-center justify-between text-xs font-mono text-[#94a3b8]">
              <span>
                {query ? (
                  <span>
                    Found <strong className="text-[#f8fafc]">{filteredItems.length}</strong> matches for "{query}"
                  </span>
                ) : (
                  <span>Quick Navigation &amp; Search Index</span>
                )}
              </span>
              <span className="hidden sm:inline text-[11px] text-slate-500">
                Use ↑↓ to navigate • ↵ to select
              </span>
            </div>

            {/* Search Results List */}
            <div
              ref={listRef}
              className="overflow-y-auto p-2 sm:p-3 space-y-1 divide-y divide-[#1e293b]/50"
            >
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-[#94a3b8] space-y-2">
                  <Search className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                  <p className="text-sm font-medium text-[#f8fafc]">No matching entries found</p>
                  <p className="text-xs text-slate-500 font-mono">
                    Try searching for "React", "Toolkit", "Tailwind", or "Skills"
                  </p>
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;

                  return (
                    <div
                      key={item.id}
                      data-active={isSelected}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`group flex items-center justify-between gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#1e293b] text-[#f8fafc] shadow-sm'
                          : 'hover:bg-[#1e293b]/50 text-[#94a3b8]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg border shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#2563eb] text-white border-blue-500'
                              : 'bg-[#0a0d12] text-[#3b82f6] border-[#1e293b]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs sm:text-sm font-bold truncate text-[#f8fafc]">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#0a0d12] text-[#94a3b8] border border-[#1e293b]">
                              {item.category}
                            </span>
                            {item.metaBadge && (
                              <span className="text-[10px] font-mono text-[#94a3b8] hidden md:inline">
                                • {item.metaBadge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#94a3b8] truncate mt-0.5 font-sans">
                            {item.subtitle}
                          </p>

                          {/* Tech stack badges for projects */}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {item.tags.slice(0, 4).map((t) => (
                                <span
                                  key={t}
                                  className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#0a0d12] text-[#94a3b8] border border-[#1e293b]"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.externalUrl && (
                          <a
                            href={item.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 text-[#94a3b8] hover:text-[#f8fafc] transition-colors"
                            title="Open live link directly"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <div
                          className={`flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded transition-all ${
                            isSelected
                              ? 'bg-[#2563eb] text-white font-semibold'
                              : 'text-slate-500 opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          <span className="hidden sm:inline">Select</span>
                          <CornerDownLeft className="w-3 hand-3" />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Shortcut Navigation Bar */}
            <div className="px-4 py-2.5 bg-[#0a0d12] border-t border-[#1e293b] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#94a3b8] gap-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[#0f172a] border border-[#1e293b] text-[#f8fafc] text-[10px]">↑↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[#0f172a] border border-[#1e293b] text-[#f8fafc] text-[10px]">↵</kbd>
                  <span>Open</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[#0f172a] border border-[#1e293b] text-[#f8fafc] text-[10px]">ESC</kbd>
                  <span>Close</span>
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#3b82f6]">
                <Command className="w-3 h-3" />
                <span>Command Palette</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

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
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { developerConfig, projectsData, experienceData, skillCategories } from '../data/portfolioData';
import { Project } from '../types';
import { useToast } from './Toast';

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
      { id: 'services', title: 'Core Services', subtitle: 'Capabilities, Client Solutions & SLAs', icon: Layers },
      { id: 'projects', title: 'Featured Projects', subtitle: 'Production Applications & Case Studies', icon: FolderGit2 },
      { id: 'skills', title: 'Skills & Stack Matrix', subtitle: 'Proficiencies, Technologies & Benchmarks', icon: Wrench },
      { id: 'experience', title: 'Career Timeline', subtitle: 'Professional Roles & Milestones', icon: Briefcase },
      { id: 'component_lab', title: 'Component & Performance Lab', subtitle: 'Interactive INP Profiler & State Machine', icon: FlaskConical },
      { id: 'architecture', title: 'Architecture Principles', subtitle: 'Philosophy, Zero Server Latency & SLAs', icon: Cpu },
      { id: 'contact', title: 'Contact Transmission', subtitle: 'Send Message, Hire or Inquire', icon: MessageSquare },
      { id: 'all', title: 'Continuous Full Page View', subtitle: 'Render all sections continuously in single stack', icon: Layers },
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
    projectsData.forEach((project) => {
      items.push({
        id: `project-${project.id}`,
        title: project.title,
        subtitle: `${project.tagline.slice(0, 75)}...`,
        category: 'Projects & Case Studies',
        type: 'project',
        icon: FolderGit2,
        tags: project.stack,
        metaBadge: project.category,
        externalUrl: project.liveUrl,
        action: () => {
          onOpenProject(project);
          onClose();
        },
      });
    });

    // 3. Skills
    skillCategories.forEach((cat) => {
      cat.skills.forEach((skill) => {
        items.push({
          id: `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          title: skill.name,
          subtitle: `${cat.category} • ${skill.focus}`,
          category: 'Skills & Tech Stack',
          type: 'skill',
          icon: Wrench,
          metaBadge: `${skill.level} (${skill.experienceYears})`,
          action: () => {
            onNavigate('skills');
            onClose();
            showToast(`Navigated to Skills Matrix: ${skill.name}`);
          },
        });
      });
    });

    // 4. Experience items
    experienceData.forEach((exp) => {
      items.push({
        id: `exp-${exp.id}`,
        title: `${exp.role} @ ${exp.company}`,
        subtitle: `${exp.period} • ${exp.location} — ${exp.summary.slice(0, 60)}...`,
        category: 'Experience & History',
        type: 'experience',
        icon: Briefcase,
        tags: exp.technologies,
        metaBadge: exp.period,
        action: () => {
          onNavigate('experience');
          onClose();
        },
      });
    });

    // 5. Quick Actions
    items.push({
      id: 'action-resume',
      title: 'View & Download Resume / CV',
      subtitle: 'Printable formatted resume with Markdown export option',
      category: 'Quick Actions',
      type: 'action',
      icon: FileText,
      action: () => {
        onClose();
        onOpenResume();
      },
    });

    items.push({
      id: 'action-config',
      title: 'Inspect Raw JSON Portfolio Schema',
      subtitle: 'Structured developer manifest with full JSON export',
      category: 'Quick Actions',
      type: 'action',
      icon: Code2,
      action: () => {
        onClose();
        onToggleConfigMode();
      },
    });

    items.push({
      id: 'action-email',
      title: `Copy Email (${developerConfig.email})`,
      subtitle: 'Copy developer email address to clipboard',
      category: 'Quick Actions',
      type: 'action',
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText(developerConfig.email);
        showToast('Developer email copied to clipboard');
        onClose();
      },
    });

    items.push({
      id: 'action-github',
      title: 'Open GitHub Profile',
      subtitle: developerConfig.github,
      category: 'Quick Actions',
      type: 'action',
      icon: ExternalLink,
      action: () => {
        window.open(developerConfig.github, '_blank', 'noopener,noreferrer');
        onClose();
      },
    });

    return items;
  }, [onNavigate, onOpenProject, onOpenResume, onToggleConfigMode, onClose, showToast]);

  // Fuzzy filter logic
  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return allItems.slice(0, 12); // Show initial default list
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
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-[#12161f] border border-[#00eeff]/40 rounded-2xl shadow-[0_0_50px_rgba(0,238,255,0.25)] overflow-hidden flex flex-col max-h-[82vh]"
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-[#2a3245] bg-[#1b202c]">
              <Search className="w-5 h-5 text-[#00eeff] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, skills, experience, or type commands..."
                className="w-full bg-transparent text-white placeholder-gray-400 text-sm sm:text-base font-sans outline-none focus:ring-0"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-gray-400 px-2 py-0.5 rounded bg-[#12161f] border border-[#2a3245]">
                <span>ESC</span>
              </div>
            </div>

            {/* Category / Result Count Bar */}
            <div className="px-4 sm:px-5 py-2 border-b border-[#2a3245] bg-[#12161f] flex items-center justify-between text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00eeff]" />
                {query ? (
                  <span>
                    Found <strong className="text-[#00eeff]">{filteredItems.length}</strong> matches for "{query}"
                  </span>
                ) : (
                  <span>Quick Navigation &amp; Search Index</span>
                )}
              </span>
              <span className="hidden sm:inline text-[11px] text-gray-500">
                Use ↑↓ to navigate • ↵ to select
              </span>
            </div>

            {/* Search Results List */}
            <div
              ref={listRef}
              className="overflow-y-auto p-2 sm:p-3 space-y-1 divide-y divide-[#2a3245]/40"
            >
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-gray-400 space-y-2">
                  <Search className="w-8 h-8 mx-auto text-gray-600 mb-2" />
                  <p className="text-sm font-medium text-gray-300">No matching entries found</p>
                  <p className="text-xs text-gray-500 font-mono">
                    Try searching for "React", "Toolkit", "INP", "Tailwind", or "freeCodeCamp"
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
                          ? 'bg-[#1b202c] border border-[#00eeff]/40 shadow-[0_0_15px_rgba(0,238,255,0.15)] text-white'
                          : 'hover:bg-[#1b202c]/60 text-gray-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg border shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#00eeff] text-[#12161f] border-[#00eeff]'
                              : 'bg-[#12161f] text-[#00eeff] border-[#2a3245] group-hover:border-[#00eeff]/40'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs sm:text-sm font-bold truncate text-white">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#12161f] text-[#00eeff] border border-[#2a3245]">
                              {item.category}
                            </span>
                            {item.metaBadge && (
                              <span className="text-[10px] font-mono text-gray-400 hidden md:inline">
                                • {item.metaBadge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 truncate mt-0.5 font-sans">
                            {item.subtitle}
                          </p>

                          {/* Tech stack badges for projects */}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {item.tags.slice(0, 4).map((t) => (
                                <span
                                  key={t}
                                  className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#12161f] text-gray-300 border border-[#2a3245]"
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
                            className="p-1 text-gray-400 hover:text-[#00eeff] transition-colors"
                            title="Open live link directly"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <div
                          className={`flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded transition-all ${
                            isSelected
                              ? 'bg-[#00eeff] text-[#12161f] font-bold shadow-[0_0_8px_#00eeff]'
                              : 'text-gray-500 opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          <span className="hidden sm:inline">Select</span>
                          <CornerDownLeft className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Shortcut Navigation Bar */}
            <div className="px-4 py-2.5 bg-[#1b202c] border-t border-[#2a3245] flex flex-wrap items-center justify-between text-[11px] font-mono text-gray-400 gap-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[#12161f] border border-[#2a3245] text-[#00eeff] text-[10px]">↑↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[#12161f] border border-[#2a3245] text-[#00eeff] text-[10px]">↵</kbd>
                  <span>Open</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[#12161f] border border-[#2a3245] text-[#00eeff] text-[10px]">ESC</kbd>
                  <span>Close</span>
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#00eeff]">
                <Command className="w-3 h-3" />
                <span>Quick Palette</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

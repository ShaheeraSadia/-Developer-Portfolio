import React, { useState, useEffect } from 'react';
import {
  Home,
  ArrowLeft,
  Layers,
  Wrench,
  FolderGit2,
  Briefcase,
  FlaskConical,
  Cpu,
  MessageSquare,
  UserCheck,
  Eye,
  FileDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ComponentLab } from './components/ComponentLab';
import { ArchitecturePhilosophy } from './components/ArchitecturePhilosophy';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ResumeModal } from './components/ResumeModal';
import { RawConfigModal } from './components/RawConfigModal';
import { CommandPalette } from './components/CommandPalette';
import { TerminalDivider } from './components/TerminalDivider';
import { Project } from './types';
import { useSEO } from './hooks/useSEO';
import { sectionSEOConfig } from './data/seoConfig';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isConfigModeOpen, setIsConfigModeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Dynamically synchronize document title, meta description & OG tags based on active section
  const currentSEO = sectionSEOConfig[activeSection] || sectionSEOConfig.home;
  useSEO(currentSEO);

  const navTabs = [
    { id: 'about', label: 'About', icon: UserCheck },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'component_lab', label: 'Lab', icon: FlaskConical },
    { id: 'architecture', label: 'Principles', icon: Cpu },
    { id: 'contact', label: 'Contact', icon: MessageSquare },
  ];

  // Global keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-[#0a0d12] text-[#f8fafc] flex flex-col selection:bg-blue-600/30 selection:text-[#3b82f6]">
          {/* Navigation Header */}
        <Navbar
          onOpenResume={() => setIsResumeOpen(true)}
          isConfigMode={isConfigModeOpen}
          onToggleConfigMode={() => setIsConfigModeOpen(!isConfigModeOpen)}
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        {/* Main Content Area */}
        <main className="grow" id="main-content">
          {/* Subtle contextual back navigation for dedicated section views (non-sticky) */}
          {activeSection !== 'home' && activeSection !== 'all' && (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
              <button
                onClick={() => handleNavigate('home')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] border border-[#1e293b] hover:border-slate-600 text-slate-400 hover:text-white text-xs font-medium transition-all cursor-pointer shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>← Back to Overview</span>
              </button>
            </div>
          )}

          {/* Animated Transition Wrapper */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{
                duration: 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* If on Home, show Hero & Section Explorer Launchpad */}
              {activeSection === 'home' && (
                <Hero
                  onOpenResume={() => setIsResumeOpen(true)}
                  onNavigate={handleNavigate}
                />
              )}

              {/* Conditional Rendering of Target Section */}
              {activeSection === 'about' && <AboutSection />}

              {activeSection === 'services' && (
                <ServicesSection onExploreProjects={() => handleNavigate('projects')} />
              )}

              {activeSection === 'projects' && (
                <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
              )}

              {activeSection === 'skills' && <SkillsMatrix />}

              {activeSection === 'experience' && <ExperienceTimeline />}

              {activeSection === 'component_lab' && <ComponentLab />}

              {activeSection === 'architecture' && <ArchitecturePhilosophy />}

              {activeSection === 'contact' && <ContactSection />}

              {/* Full Continuous Stacked View if user selects "View All" */}
              {activeSection === 'all' && (
                <div>
                  <div className="bg-[#0f172a] border-b border-[#1e293b] py-2.5 px-4 text-center">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                      <span className="text-xs font-mono text-[#94a3b8]">
                        Full Continuous View Mode
                      </span>
                      <button
                        onClick={() => handleNavigate('home')}
                        className="text-xs font-medium text-[#3b82f6] hover:text-blue-300 cursor-pointer"
                      >
                        ← Return to Overview
                      </button>
                    </div>
                  </div>
                  <Hero onOpenResume={() => setIsResumeOpen(true)} onNavigate={handleNavigate} />
                  <TerminalDivider label="About &amp; Background" />
                  <AboutSection />
                  <TerminalDivider label="Services &amp; Offerings" />
                  <ServicesSection onExploreProjects={() => handleNavigate('projects')} />
                  <TerminalDivider label="Featured Projects" />
                  <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
                  <TerminalDivider label="Interactive Lab" />
                  <ComponentLab />
                  <TerminalDivider label="Architecture Principles" />
                  <ArchitecturePhilosophy />
                  <TerminalDivider label="Career Experience" />
                  <ExperienceTimeline />
                  <TerminalDivider label="Technical Skills" />
                  <SkillsMatrix />
                  <TerminalDivider label="Contact" />
                  <ContactSection />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer with Session Activity Telemetry */}
        <Footer activeSection={activeSection} />

        {/* Global Command Palette (Ctrl+K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={handleNavigate}
          onOpenProject={(project) => setSelectedProject(project)}
          onOpenResume={() => setIsResumeOpen(true)}
          onToggleConfigMode={() => setIsConfigModeOpen(!isConfigModeOpen)}
        />

        {/* Interactive Modals */}
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />

        <RawConfigModal
          isOpen={isConfigModeOpen}
          onClose={() => setIsConfigModeOpen(false)}
        />
      </div>
    </ToastProvider>
  </ThemeProvider>
  );
}

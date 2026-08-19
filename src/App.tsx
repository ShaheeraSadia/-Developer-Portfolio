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

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isConfigModeOpen, setIsConfigModeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

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
          {/* If on a dedicated section view, show Top Section Breadcrumb & Switcher Bar */}
          {activeSection !== 'home' && activeSection !== 'all' && (
            <div className="sticky top-16 z-40 bg-[#0a0d12]/90 backdrop-blur-md border-b border-[#1e293b] py-3 px-4 sm:px-6 lg:px-8 shadow-sm">
              <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
                {/* Back to Home Button */}
                <button
                  onClick={() => handleNavigate('home')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] border border-[#1e293b] hover:border-slate-600 text-[#94a3b8] hover:text-[#f8fafc] text-xs font-medium transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Overview</span>
                </button>

                {/* Section Quick-Switch Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
                  {navTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeSection === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleNavigate(tab.id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#2563eb] text-white shadow-sm'
                            : 'bg-[#0f172a] text-[#94a3b8] hover:text-[#f8fafc] hover:border-slate-600 border border-[#1e293b]'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handleNavigate('all')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap bg-[#0f172a] text-[#94a3b8] hover:text-[#f8fafc] border border-[#1e293b] hover:border-slate-600 cursor-pointer"
                    title="Display all sections continuously on one page"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View All</span>
                  </button>
                </div>
              </div>
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
  );
}

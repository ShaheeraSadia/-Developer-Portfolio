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
import { TerminalDivider } from './components/TerminalDivider';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isConfigModeOpen, setIsConfigModeOpen] = useState(false);
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

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#1f242d] text-white flex flex-col selection:bg-[#00eeff]/20 selection:text-[#00eeff]">
        {/* Navigation Header */}
        <Navbar
          onOpenResume={() => setIsResumeOpen(true)}
          isConfigMode={isConfigModeOpen}
          onToggleConfigMode={() => setIsConfigModeOpen(!isConfigModeOpen)}
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />

        {/* Main Content Area */}
        <main className="grow" id="main-content">
          {/* If on Home, show Hero & Section Explorer Launchpad */}
          {activeSection === 'home' && (
            <Hero
              onOpenResume={() => setIsResumeOpen(true)}
              onNavigate={handleNavigate}
            />
          )}

          {/* If on a dedicated section view, show Top Section Breadcrumb & Switcher Bar */}
          {activeSection !== 'home' && activeSection !== 'all' && (
            <div className="sticky top-16 z-40 bg-[#1f242d]/95 backdrop-blur-md border-b border-[#323946] py-3 px-4 sm:px-6 lg:px-8 shadow-lg">
              <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
                
                {/* Back to Home Button */}
                <button
                  onClick={() => handleNavigate('home')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#323946] border border-[#00eeff]/40 text-[#00eeff] hover:bg-[#00eeff] hover:text-[#1f242d] text-xs font-mono font-bold transition-all shadow-[0_0_10px_rgba(0,238,255,0.2)] cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>← Return to Home Overview</span>
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
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#00eeff] text-[#1f242d] font-bold border border-[#00eeff] animate-nav-glow'
                            : 'bg-[#323946] text-gray-300 hover:text-white hover:border-[#00eeff]/50 border border-[#323946]'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handleNavigate('all')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono whitespace-nowrap bg-[#323946] text-gray-400 hover:text-white border border-[#323946] cursor-pointer"
                    title="Display all sections continuously on one page"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View All</span>
                  </button>
                </div>

              </div>
            </div>
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

          {/* Full Page Stacked View if user selects "View All" */}
          {activeSection === 'all' && (
            <div>
              <div className="bg-[#323946] border-b border-[#00eeff]/30 py-3 px-4 text-center">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                  <span className="text-xs font-mono text-[#00eeff]">
                    // FULL_CONTINUOUS_VIEW_MODE
                  </span>
                  <button
                    onClick={() => handleNavigate('home')}
                    className="text-xs font-mono text-[#00eeff] hover:underline cursor-pointer"
                  >
                    ← Back to Modular Home
                  </button>
                </div>
              </div>
              <Hero onOpenResume={() => setIsResumeOpen(true)} onNavigate={handleNavigate} />
              <TerminalDivider label="SYS.01 // ABOUT_ME" />
              <AboutSection />
              <TerminalDivider label="SYS.02 // CORE_SERVICES" />
              <ServicesSection onExploreProjects={() => handleNavigate('projects')} />
              <TerminalDivider label="SYS.03 // FEATURED_PROJECTS" />
              <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
              <TerminalDivider label="SYS.04 // ARCHITECTURE_LAB" />
              <ComponentLab />
              <TerminalDivider label="SYS.05 // CORE_PILLARS" />
              <ArchitecturePhilosophy />
              <TerminalDivider label="SYS.06 // CAREER_TIMELINE" />
              <ExperienceTimeline />
              <TerminalDivider label="SYS.07 // SKILLS_MATRIX" />
              <SkillsMatrix />
              <TerminalDivider label="SYS.08 // TRANSMISSION_PORT" />
              <ContactSection />
            </div>
          )}
        </main>

        {/* Footer with Dynamic Operational Telemetry */}
        <Footer />

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

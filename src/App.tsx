import React, { useState } from 'react';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
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
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isConfigModeOpen, setIsConfigModeOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#FAFAF8] text-[#14151A] flex flex-col selection:bg-[#2F5CFF]/15 selection:text-[#2F5CFF]">
        {/* Navigation */}
        <Navbar
          onOpenResume={() => setIsResumeOpen(true)}
          isConfigMode={isConfigModeOpen}
          onToggleConfigMode={() => setIsConfigModeOpen(!isConfigModeOpen)}
        />

        {/* Main Content Area */}
        <main className="grow" id="main-content">
          <Hero />
          <AboutSection />
          <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
          <ComponentLab />
          <ArchitecturePhilosophy />
          <ExperienceTimeline />
          <SkillsMatrix />
          <ContactSection />
        </main>

        {/* Footer */}
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

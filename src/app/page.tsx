"use client";

import React, { useCallback, useState } from "react";
import { MotionConfig } from "framer-motion";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Navbar } from "@/components/Navbar";
import { CommandPalette } from "@/components/CommandPalette";
import { Hero } from "@/components/Hero";
import { JourneyLanding } from "@/components/JourneyLanding";
import { Snapshot } from "@/components/Snapshot";
import { ProjectsSection } from "@/components/ProjectsSection";
import { InteractiveSimulators } from "@/components/InteractiveSimulators";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  const openPalette = useCallback(() => setCommandPaletteOpen(true), []);
  const closePalette = useCallback(() => setCommandPaletteOpen(false), []);

  const openProject = useCallback((id: string) => {
    setSelectedProjectId(id);
    setProjectModalOpen(true);
  }, []);
  const closeProject = useCallback(() => setProjectModalOpen(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-[#090a0f] text-slate-100 selection:bg-indigo-500/30 selection:text-white relative">
        <AmbientBackground />
        <JourneyLanding />
        <Navbar onOpenCommandPalette={openPalette} />
        <CommandPalette
          isOpen={commandPaletteOpen}
          onOpen={openPalette}
          onClose={closePalette}
          onSelectProject={openProject}
        />

        <div id="portfolio">
          <Hero />
        <Snapshot />
        <ProjectsSection
          selectedProjectId={selectedProjectId}
          isModalOpen={projectModalOpen}
          onOpenProject={openProject}
          onCloseProject={closeProject}
        />
        <InteractiveSimulators />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
        </div>
      </main>
    </MotionConfig>
  );
}

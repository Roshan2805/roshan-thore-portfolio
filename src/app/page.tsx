"use client";

import React, { useState } from "react";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Navbar } from "@/components/Navbar";
import { CommandPalette } from "@/components/CommandPalette";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { InteractiveSimulators } from "@/components/InteractiveSimulators";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { TerminalSection } from "@/components/TerminalSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#090a0f] text-slate-100 selection:bg-indigo-500/30 selection:text-white relative">
      {/* Interactive Background with Ambient Glow & Spotlight */}
      <AmbientBackground />

      {/* Navigation Header */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Command Palette (⌘K) Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Flagship Products & Engineering Deep-Dives */}
      <ProjectsSection />

      {/* 3. Interactive Architecture Playgrounds (HLS, 3D Stories, Virtualization) */}
      <InteractiveSimulators />

      {/* 4. Technical Skills Matrix */}
      <SkillsSection />

      {/* 6. Professional Experience & Education */}
      <ExperienceSection />

      {/* 7. Interactive Developer CLI Terminal */}
      <TerminalSection />

      {/* 8. Contact & Direct Connection */}
      <ContactSection />

      {/* 9. Footer with Live Mumbai Clock */}
      <Footer />
    </main>
  );
}

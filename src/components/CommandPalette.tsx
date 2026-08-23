"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Terminal, 
  FileDown, 
  Mail, 
  Phone, 
  Sparkles, 
  Layers, 
  Briefcase, 
  Cpu, 
  X, 
  ArrowRight,
  ExternalLink
} from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO, PROJECTS } from "@/data/portfolioData";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
          setQuery("");
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#6366f1", "#06b6d4", "#10b981", "#ec4899"]
    });
    onClose();
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied ${label} to clipboard!`);
    onClose();
  };

  const actions = [
    {
      id: "projects",
      title: "View Flagship Projects",
      subtitle: "Creator Media Platform, Enterprise Admin, Agency Portal, 3D Web",
      icon: Layers,
      action: () => scrollTo("projects"),
      category: "Navigation"
    },
    {
      id: "simulators",
      title: "Interactive Architecture Playground",
      subtitle: "HLS Adaptive Stream, 3D Stories, Virtualization Benchmark",
      icon: Cpu,
      action: () => scrollTo("simulators"),
      category: "Interactive"
    },

    {
      id: "skills",
      title: "Technical Skills Matrix",
      subtitle: "React 18, Next.js 14, TypeScript, HLS, WebRTC, Tailwind",
      icon: Cpu,
      action: () => scrollTo("skills"),
      category: "Navigation"
    },
    {
      id: "experience",
      title: "Work Experience & History",
      subtitle: "Software Development Engineer @ INK IN CAPS & Education",
      icon: Briefcase,
      action: () => scrollTo("experience"),
      category: "Navigation"
    },
    {
      id: "terminal",
      title: "Open Developer CLI Terminal",
      subtitle: "Execute interactive shell commands and easter eggs",
      icon: Terminal,
      action: () => scrollTo("terminal"),
      category: "Interactive"
    },
    {
      id: "resume",
      title: "Download Resume (PDF)",
      subtitle: "Direct download of Roshan Thore's verified resume",
      icon: FileDown,
      action: () => {
        window.open(PERSONAL_INFO.resumeUrl, "_blank");
        onClose();
      },
      category: "Actions"
    },
    {
      id: "email",
      title: "Copy Email Address",
      subtitle: PERSONAL_INFO.email,
      icon: Mail,
      action: () => copyToClipboard(PERSONAL_INFO.email, "Email"),
      category: "Actions"
    },
    {
      id: "phone",
      title: "Copy Phone Number",
      subtitle: PERSONAL_INFO.phone,
      icon: Phone,
      action: () => copyToClipboard(PERSONAL_INFO.phone, "Phone number"),
      category: "Actions"
    },
    {
      id: "confetti",
      title: "Celebrate / Launch Confetti 🎉",
      subtitle: "Trigger a particle burst on your screen",
      icon: Sparkles,
      action: triggerConfetti,
      category: "Actions"
    }
  ];

  const projectActions = PROJECTS.map((proj) => ({
    id: `proj-${proj.id}`,
    title: proj.title,
    subtitle: `${proj.role} · ${proj.productType}`,
    icon: ExternalLink,
    action: () => {
      onClose();
      if (onSelectProject) {
        onSelectProject(proj.id);
      } else {
        scrollTo("projects");
      }
    },
    category: "Projects"
  }));

  const allItems = [...actions, ...projectActions];

  const filteredItems = query.trim() === ""
    ? allItems
    : allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Palette Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-[#0e121d] border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#131826]">
              <Search className="w-5 h-5 text-indigo-400 mr-3 flex-shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, project, or skill..."
                className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of Results */}
            <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-sm">
                  No commands found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-indigo-600/10 hover:border-indigo-500/30 border border-transparent transition group"
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="p-2 rounded-lg bg-slate-800/80 group-hover:bg-indigo-500/20 text-slate-400 group-hover:text-indigo-400 transition flex-shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <div className="text-sm font-medium text-slate-200 group-hover:text-white transition">
                            {item.title}
                          </div>
                          <div className="text-xs text-slate-400 truncate">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0 pl-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition" />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Bar */}
            <div className="px-4 py-2.5 bg-[#0a0d14] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <div className="flex items-center space-x-3">
                <span>Navigation: <kbd className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">↑↓</kbd></span>
                <span>Select: <kbd className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">↵</kbd></span>
                <span>Close: <kbd className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">ESC</kbd></span>
              </div>
              <span className="text-indigo-400">Roshan Thore Portfolio CLI</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

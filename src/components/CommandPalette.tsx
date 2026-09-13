"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { fireConfetti } from "@/lib/confetti";
import { PERSONAL_INFO, PROJECTS } from "@/data/portfolioData";
import { useDialog } from "@/hooks/useDialog";

interface CommandPaletteProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onOpen,
  onClose,
  onSelectProject
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialog(isOpen, dialogRef);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          onOpen();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div ref={dialogRef} className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          <Palette onClose={onClose} onSelectProject={onSelectProject} />
        </div>
      )}
    </AnimatePresence>
  );
};

// Mounted only while open, so query and selection reset each time.
const Palette: React.FC<Pick<CommandPaletteProps, "onClose" | "onSelectProject">> = ({
  onClose,
  onSelectProject
}) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const triggerConfetti = () => {
    fireConfetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    onClose();
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(onClose, 700);
  };

  const actions = [
    {
      id: "projects",
      title: "View Projects",
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
      subtitle: "PDF, opens in a new tab",
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
      action: () => copyToClipboard("email", PERSONAL_INFO.email),
      category: "Actions"
    },
    {
      id: "phone",
      title: "Copy Phone Number",
      subtitle: PERSONAL_INFO.phone,
      icon: Phone,
      action: () => copyToClipboard("phone", PERSONAL_INFO.phone),
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
      onSelectProject(proj.id);
    },
    category: "Projects"
  }));

  const allItems = [...actions, ...projectActions];
  const q = query.trim().toLowerCase();
  const filteredItems = q === ""
    ? allItems
    : allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const count = filteredItems.length;
    if (count === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % count);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + count) % count);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filteredItems[activeIndex]?.action();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="relative w-full max-w-2xl bg-[#0e121d] border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden z-10"
    >
      <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#131826]">
        <Search className="w-5 h-5 text-indigo-400 mr-3 flex-shrink-0" />
        <input
          type="text"
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={handleInputKeyDown}
          aria-label="Search commands"
          placeholder="Type a command, project, or skill..."
          className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
        />
        <button
          onClick={onClose}
          aria-label="Close"
          className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
        {filteredItems.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm">
            No commands found for &ldquo;{query}&rdquo;
          </div>
        ) : (
          filteredItems.map((item, idx) => {
            const Icon = item.icon;
            const active = idx === activeIndex;
            const copied = copiedId === item.id;
            return (
              <button
                key={item.id}
                data-index={idx}
                onClick={item.action}
                onMouseMove={() => setActiveIndex(idx)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left border transition ${
                  active ? "bg-indigo-600/10 border-indigo-500/30" : "border-transparent"
                }`}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className={`p-2 rounded-lg transition flex-shrink-0 ${
                    active ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-800/80 text-slate-400"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className={`text-sm font-medium transition ${active ? "text-white" : "text-slate-200"}`}>
                      {item.title}
                    </div>
                    <div className={`text-xs truncate ${copied ? "text-emerald-400" : "text-slate-400"}`}>
                      {copied ? "Copied to clipboard" : item.subtitle}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0 pl-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 transition ${active ? "text-indigo-400" : "text-slate-600"}`} />
                </div>
              </button>
            );
          })
        )}
      </div>

      <div className="px-4 py-2.5 bg-[#0a0d14] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center space-x-3">
          <span>Navigation: <kbd className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">↑↓</kbd></span>
          <span>Select: <kbd className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">↵</kbd></span>
          <span>Close: <kbd className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">ESC</kbd></span>
        </div>
        <span className="text-indigo-400">Roshan Thore Portfolio CLI</span>
      </div>
    </motion.div>
  );
};

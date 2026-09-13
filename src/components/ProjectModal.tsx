"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  CheckCircle2, 
  Zap
} from "lucide-react";
import { Project } from "@/data/portfolioData";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<"architecture" | "challenges" | "features" | "stack">("architecture");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-3xl bg-[#0e1322] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800 bg-[#12182b] flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                    {project.productType}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {project.period}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="text-xs text-cyan-300 font-medium">
                  {project.role} · {project.subtitle}
                </p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-[#090b11] border-b border-slate-800 text-center">
              {project.stats.map((stat, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-slate-900/50">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">
                    {stat.label}
                  </div>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 bg-[#0d111d] px-6">
              {[
                { id: "architecture", label: "Architecture" },
                { id: "challenges", label: "Solved Challenges" },
                { id: "features", label: "System Features" },
                { id: "stack", label: "Tech Stack" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`py-3 px-4 text-xs font-semibold border-b-2 transition ${
                    activeTab === tab.id
                      ? "border-cyan-400 text-cyan-300 bg-cyan-500/5"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-300">
              {activeTab === "architecture" && (
                <div className="space-y-4">
                  <p className="leading-relaxed text-slate-300">
                    {project.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                      Architectural Highlights
                    </h4>
                    <div className="space-y-2.5">
                      {project.architecturalHighlights.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start space-x-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80"
                        >
                          <Zap className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-slate-200">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "challenges" && (
                <div className="space-y-4">
                  {project.solvedChallenges.map((challenge, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                          Problem
                        </span>
                        <p className="text-xs font-medium text-slate-200 mt-1">
                          {challenge.problem}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          Engineering Solution
                        </span>
                        <p className="text-xs text-slate-300 mt-1">
                          {challenge.solution}
                        </p>
                      </div>

                      <div className="pt-1 border-t border-slate-800/60 flex items-center space-x-2 text-xs text-emerald-400 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span><strong>Impact:</strong> {challenge.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "features" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center space-x-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span className="text-xs text-slate-200 font-medium">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "stack" && (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-mono text-cyan-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#0a0d14] border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                Verified Production Architecture
              </span>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

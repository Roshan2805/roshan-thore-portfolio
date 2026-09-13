"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Layers, 
  ArrowUpRight, 
  Zap, 
  ChevronRight
} from "lucide-react";
import { PROJECTS } from "@/data/portfolioData";
import { ProjectModal } from "./ProjectModal";

interface ProjectsSectionProps {
  selectedProjectId: string | null;
  isModalOpen: boolean;
  onOpenProject: (projectId: string) => void;
  onCloseProject: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  selectedProjectId,
  isModalOpen,
  onOpenProject,
  onCloseProject
}) => {
  const selectedProject = PROJECTS.find((p) => p.id === selectedProjectId) ?? null;

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Work</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Key Web Applications
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Production web applications built with Next.js 14, React 18, Vite, TypeScript, and modern UI libraries.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-3xl bg-[#0d1222]/80 border border-slate-800/90 hover:border-indigo-500/40 p-7 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              {/* Glow Accent Background */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${project.gradient} rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition duration-500 pointer-events-none`} />

              {/* Card Top */}
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                    {project.productType}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {project.period}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>
                  <p className="text-xs text-indigo-400 font-mono font-medium mt-1">
                    {project.role} · {project.highlightStat}
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Key Architectural Bullets */}
                <div className="space-y-2 pt-2">
                  {project.architecturalHighlights.slice(0, 2).map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <Zap className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Metrics & Details CTA */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-3">
                  {project.stats.slice(0, 2).map((st, sIdx) => (
                    <div key={sIdx} className="text-left">
                      <div className="text-[10px] uppercase font-mono text-slate-400">
                        {st.label}
                      </div>
                      <div className="text-xs font-bold font-mono text-white">
                        {st.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onOpenProject(project.id)}
                    className="px-4 py-2 rounded-xl bg-slate-800/90 hover:bg-indigo-600 text-xs font-medium text-white transition flex items-center space-x-1.5 shadow-sm"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal
        key={selectedProjectId}
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={onCloseProject}
      />
    </section>
  );
};

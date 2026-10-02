"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  FileDown, 
  Mail, 
  MapPin, 
  Layers, 
  Play
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { fireConfetti } from "@/lib/confetti";

export const Hero: React.FC = () => {
  const handleConfetti = () => {
    fireConfetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
  };

  return (
    <section id="hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 text-xs font-mono backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 font-medium">Open to Opportunities</span>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-800/40 border border-slate-700/50 text-slate-400 text-xs font-mono">
                <MapPin className="w-3 h-3 text-cyan-400" />
                <span>Mumbai / Nashik, India</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Hi, I&apos;m{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                  {PERSONAL_INFO.name}
                </span>
              </h2>

              <p className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400">
                {PERSONAL_INFO.title}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light"
            >
              Frontend engineer with <strong className="text-white font-medium">3.5 years</strong> building KNKY, a creator monetization platform serving 30K+ users. I own its <strong className="text-white font-medium">payments and subscription module</strong>, which handles <strong className="text-white font-medium">45K+ transactions a year</strong>, and built its admin console as the only frontend engineer. I also ship HLS video streaming and real-time chat.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <a
                href="#projects"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all transform hover:-translate-y-0.5 group"
              >
                <Layers className="w-4 h-4 text-cyan-200" />
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#simulators"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 text-slate-200 font-medium text-sm transition hover:border-slate-600"
              >
                <Play className="w-4 h-4 text-emerald-400" />
                <span>Try the Demos</span>
              </a>

              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Roshan-Thore-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleConfetti}
                className="inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 text-sm font-medium transition"
              >
                <FileDown className="w-4 h-4 text-indigo-400" />
                <span>Resume (PDF)</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-slate-400 text-xs font-mono"
            >
              <span className="text-slate-400">Connect:</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 hover:text-white transition"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 hover:text-indigo-400 transition"
              >
                <LinkedinIcon className="w-4 h-4 text-indigo-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center space-x-1.5 hover:text-cyan-400 transition"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

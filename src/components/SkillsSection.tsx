"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Cpu, 
  Layers, 
  Radio, 
  Sparkles, 
  Database, 
  Gauge, 
  Search,
  Zap,
  Code
} from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";

export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    const matchingSkills = cat.skills.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      skills: matchingSkills
    };
  }).filter((cat) => cat.skills.length > 0);

  const getCategoryIcon = (category: string) => {
    if (category.includes("Frontend")) return Layers;
    if (category.includes("State")) return Database;
    if (category.includes("Media")) return Radio;
    if (category.includes("Styling")) return Sparkles;
    if (category.includes("Backend")) return Code;
    return Gauge;
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering Skills &amp; Stack
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Hands-on experience with modern React, Next.js, TypeScript, state management, and responsive UI design systems.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search skills"
              placeholder="Search skills (e.g. Next.js, HLS, Redux, LiveKit)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#0e1424] border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, idx) => {
            const Icon = getCategoryIcon(cat.category);
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-3xl bg-[#0d1222]/80 border border-slate-800/90 hover:border-indigo-500/30 p-6 backdrop-blur-xl transition duration-300 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {cat.category}
                      </h3>
                      <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Skill Items List */}
                  <div className="space-y-3 pt-2">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5 group">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-1.5">
                            {skill.highlight && (
                              <Zap className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                            )}
                            <span className={`font-medium ${skill.highlight ? "text-white" : "text-slate-300"} group-hover:text-cyan-300 transition`}>
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">
                            {skill.experience}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              skill.highlight
                                ? "bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"
                                : "bg-slate-600 group-hover:bg-indigo-400"
                            }`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Indicator */}
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{cat.skills.length} core technologies</span>
                  <span className="text-emerald-400">Production Tested</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

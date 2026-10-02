"use client";

import React, { useState } from "react";
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  TrendingUp
} from "lucide-react";
import { EXPERIENCES, EDUCATION_LIST } from "@/data/portfolioData";

export const ExperienceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

  return (
    <section id="experience" className="py-24 bg-[#090b12]/80 border-t border-slate-800/80 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work Experience &amp; Education
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From intern to SDE at INK IN CAPS over 3.5+ years.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#0e1322] border border-slate-800 shadow-xl gap-1">
            <button
              onClick={() => setActiveTab("experience")}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "experience"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Professional Experience</span>
            </button>

            <button
              onClick={() => setActiveTab("education")}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "education"
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/25"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education &amp; Training</span>
            </button>
          </div>
        </div>

        {activeTab === "experience" && (
          <div className="mt-14 max-w-4xl mx-auto space-y-8 relative">
            <div className="absolute top-4 bottom-4 left-4 md:left-8 w-[2px] bg-gradient-to-b from-indigo-500 via-cyan-500 to-transparent" />

            {EXPERIENCES.map((exp, idx) => (
              <div
                key={idx}
                className="relative pl-12 md:pl-20"
              >
                <div className={`absolute left-1 md:left-5 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-[#090b12] ${
                  exp.active ? "border-cyan-400 text-cyan-400 ring-4 ring-cyan-500/20" : "border-slate-600 text-slate-400"
                }`}>
                  <div className={`w-2 h-2 rounded-full ${exp.active ? "bg-cyan-400 animate-ping" : "bg-slate-600"}`} />
                </div>

                <div className="p-6 sm:p-7 rounded-3xl bg-[#0e1424]/90 border border-slate-800 hover:border-indigo-500/30 backdrop-blur-xl shadow-xl space-y-4 transition duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-bold text-white">
                          {exp.title}
                        </h3>
                        {exp.active && (
                          <span className="text-[10px] font-mono uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-cyan-300 mt-0.5 flex items-center space-x-2">
                        <span>{exp.company}</span>
                        <span>·</span>
                        <span className="text-xs text-slate-400 font-normal">{exp.location}</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 w-fit">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {exp.summary}
                  </p>

                  <div className="space-y-2 pt-1">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                    {exp.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
                        <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "education" && (
          <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {EDUCATION_LIST.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#0e1424]/90 border border-slate-800 hover:border-cyan-500/30 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300">
                    <GraduationCap className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-xs font-medium text-cyan-300 mt-0.5">
                      {edu.institution}
                    </p>
                    <div className="text-[11px] font-mono text-slate-400 mt-1">
                      {edu.period} · {edu.location}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {edu.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                  {edu.badges.map((b, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

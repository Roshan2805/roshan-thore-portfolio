"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowDown, ChevronDown, ChevronUp } from "lucide-react";
import { JOURNEY } from "@/data/journeyData";

const JourneyScene = dynamic(
  () => import("@/components/JourneyScene").then((mod) => mod.JourneyScene),
  { ssr: false }
);

const COUNT = JOURNEY.length;

function scrollToStage(section: HTMLElement | null, index: number, behavior: ScrollBehavior) {
  if (!section) return;
  const range = section.offsetHeight - window.innerHeight;
  const clamped = Math.min(COUNT - 1, Math.max(0, index));
  window.scrollTo({ top: section.offsetTop + ((clamped + 0.5) / COUNT) * range, behavior });
}

export const JourneyLanding: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    progressRef.current = value;
    setActive(Math.min(COUNT - 1, Math.floor(value * COUNT)));
  });

  useEffect(() => {
    const match = window.location.hash.match(/^#stage-(\d+)$/);
    if (match) scrollToStage(sectionRef.current, Number(match[1]) - 1, "instant");
  }, []);

  const goTo = (index: number) => scrollToStage(sectionRef.current, index, "smooth");
  const isLast = active === COUNT - 1;

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative"
      style={{ height: `${COUNT * 65}vh` }}
      aria-label="My journey into software"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#07080d]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(99,102,241,0.14),transparent_60%)]" />
        <JourneyScene progressRef={progressRef} />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#07080d]/85 via-[#07080d]/30 to-transparent lg:via-[#07080d]/20" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none bg-gradient-to-t from-[#07080d] to-transparent lg:hidden" />

        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 sm:px-8 lg:px-12 py-5">
          <h1 className="text-sm font-bold text-white tracking-tight">
            Roshan Thore
            <span className="hidden sm:inline font-normal text-slate-400"> · how I became a frontend engineer</span>
          </h1>
          <a
            href="#portfolio"
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/70 hover:bg-slate-800 border border-slate-700/70 text-xs font-medium text-slate-200 backdrop-blur-md transition"
          >
            <span>Skip to portfolio</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="absolute inset-x-0 bottom-24 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 z-10 px-5 sm:px-8 lg:px-12">
          <div className="grid max-w-xl">
            {JOURNEY.map((stage, idx) => {
              const shown = idx === active;
              return (
                <article
                  key={stage.label}
                  aria-hidden={!shown}
                  className={`col-start-1 row-start-1 self-end lg:self-center transition-all duration-500 ease-out ${
                    shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <div
                    className="text-xs font-mono uppercase tracking-[0.2em]"
                    style={{ color: stage.accent }}
                  >
                    {String(idx + 1).padStart(2, "0")} · {stage.label}
                  </div>
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mt-3">
                    {stage.title}
                  </h2>
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed mt-4 max-w-lg">
                    {stage.body}
                  </p>

                  {stage.tags && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {stage.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-slate-900/70 border border-slate-700/70 text-xs font-mono text-slate-200 backdrop-blur-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {stage.stats && (
                    <div className="flex flex-wrap gap-x-8 gap-y-3 mt-6">
                      {stage.stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="text-2xl sm:text-3xl font-extrabold font-mono" style={{ color: stage.accent }}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {idx === COUNT - 1 && (
                    <a
                      href="#portfolio"
                      tabIndex={shown ? 0 : -1}
                      className="inline-flex items-center space-x-2 mt-7 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-sm shadow-xl shadow-indigo-500/25 transition"
                    >
                      <span>See what I build</span>
                      <ArrowDown className="w-4 h-4" />
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        <nav
          aria-label="Journey stages"
          className="hidden md:flex absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-10 flex-col items-end space-y-2.5"
        >
          {JOURNEY.map((stage, idx) => {
            const shown = idx === active;
            return (
              <button
                key={stage.label}
                onClick={() => goTo(idx)}
                aria-label={`Go to ${stage.label}`}
                aria-current={shown ? "step" : undefined}
                className="group flex items-center space-x-3"
              >
                <span
                  className={`text-[11px] font-mono transition ${
                    shown ? "opacity-100 text-white" : "opacity-0 group-hover:opacity-100 text-slate-400"
                  }`}
                >
                  {stage.label}
                </span>
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    shown ? "w-2.5 h-2.5" : idx < active ? "w-1.5 h-1.5 bg-slate-400" : "w-1.5 h-1.5 bg-slate-700"
                  }`}
                  style={shown ? { backgroundColor: stage.accent } : undefined}
                />
              </button>
            );
          })}
        </nav>

        <div className="absolute inset-x-0 bottom-0 z-10 px-5 sm:px-8 lg:px-12 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono text-slate-400">
                <span className="text-white">{String(active + 1).padStart(2, "0")}</span> / {COUNT}
              </span>
              <span className={`text-xs text-slate-400 transition-opacity ${active === 0 ? "opacity-100" : "opacity-0"}`}>
                Scroll to travel through it
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => goTo(active - 1)}
                disabled={active === 0}
                aria-label="Previous stage"
                className="p-2 rounded-full bg-slate-900/70 border border-slate-700/70 text-slate-200 hover:bg-slate-800 disabled:opacity-30 backdrop-blur-md transition"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => goTo(active + 1)}
                disabled={isLast}
                aria-label="Next stage"
                className="p-2 rounded-full bg-slate-900/70 border border-slate-700/70 text-slate-200 hover:bg-slate-800 disabled:opacity-30 backdrop-blur-md transition"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-4 h-px bg-slate-800">
            <div
              className="h-px bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${((active + 1) / COUNT) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

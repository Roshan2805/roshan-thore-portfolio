"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { JOURNEY } from "@/data/journeyData";
import { endJourney, useJourneyPlaying } from "@/lib/journey";

const IntroScene = dynamic(() => import("./IntroScene"), { ssr: false });

const STAGE_MS = 3800;

function IntroOverlay() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const elapsed = useRef(0);
  const bar = useRef<HTMLSpanElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  const stage = JOURNEY[index];
  const onScreen = stage.tone === "screen";

  const go = useCallback(
    (step: number) => {
      const next = index + step;
      elapsed.current = 0;
      if (next >= JOURNEY.length) {
        endJourney();
        return;
      }
      setIndex(Math.max(next, 0));
    },
    [index]
  );

  useEffect(() => {
    if (paused) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += Math.min(now - last, 100);
      last = now;
      const progress = Math.min(elapsed.current / STAGE_MS, 1);
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
      if (progress >= 1) {
        go(1);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [go, paused]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") endJourney();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === " ") {
        e.preventDefault();
        setPaused((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    dialog.current?.focus({ preventScroll: true });
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      ref={dialog}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="My journey, in eight steps"
      className={`fixed inset-0 z-[100] cursor-pointer outline-none select-none transition-colors duration-1000 ${
        onScreen ? "bg-ink text-paper" : "bg-paper text-ink"
      }`}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      onClick={(e) => go(e.clientX < window.innerWidth * 0.3 ? -1 : 1)}
    >
      <IntroScene index={index} />

      <div className="absolute inset-x-0 top-0 px-5 pt-5 sm:px-10 sm:pt-8">
        <div className="flex gap-1.5">
          {JOURNEY.map((item, i) => (
            <span key={item.label} className="h-px flex-1 bg-current/25">
              <span
                ref={i === index ? bar : undefined}
                className="block h-full origin-left bg-current"
                style={{ transform: `scaleX(${i < index ? 1 : 0})` }}
              />
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em]">
          <span>
            Roshan Thore<span className="max-sm:hidden">, the short version</span>
          </span>
          <span className="flex items-center gap-5">
            <button
              type="button"
              className="hidden cursor-pointer opacity-60 hover:opacity-100 sm:block"
              onClick={(e) => {
                e.stopPropagation();
                setPaused((value) => !value);
              }}
            >
              {paused ? "Play" : "Pause"}
            </button>
            <button
              type="button"
              className="cursor-pointer border-b border-current pb-0.5"
              onClick={(e) => {
                e.stopPropagation();
                endJourney();
              }}
            >
              Skip journey
            </button>
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 px-5 pb-8 sm:px-10 sm:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
            className="max-w-3xl"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] opacity-60">
              {String(index + 1).padStart(2, "0")} / {String(JOURNEY.length).padStart(2, "0")}
              <span className="mx-3">·</span>
              {stage.label}
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.02em] text-balance">
              {stage.title}
            </h2>
            <p className="mt-3 max-w-xl text-base opacity-70 sm:text-lg">{stage.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function Intro() {
  const playing = useJourneyPlaying();
  return <AnimatePresence>{playing && <IntroOverlay key="intro" />}</AnimatePresence>;
}

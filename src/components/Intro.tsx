"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { BEATS } from "@/data/journeyData";
import { endJourney, markJourneySeen, useJourneyPlaying } from "@/lib/journey";

const IntroScene = dynamic(() => import("./IntroScene"), { ssr: false });

const BEAT_MS = 2000;
const LEAVE_MS = 1700;

function IntroOverlay() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const last = BEATS.length - 1;

  // The particle name is sitting on the hero's name by now. The page fades in under it.
  const leave = useCallback(() => {
    markJourneySeen();
    document.documentElement.classList.remove("intro-on");
    document.documentElement.classList.add("from-intro");
    setIndex(last);
    setLeaving(true);
  }, [last]);

  useEffect(() => {
    if (leaving) {
      const timer = setTimeout(endJourney, LEAVE_MS);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => (index === last ? leave() : setIndex(index + 1)), BEAT_MS);
    return () => clearTimeout(timer);
  }, [index, last, leave, leaving]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") leave();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [leave]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dialog.current?.focus({ preventScroll: true });
    document.documentElement.classList.add("intro-on");
    document.documentElement.classList.remove("from-intro");
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.classList.remove("intro-on");
      document.documentElement.style.overflow = "";
    };
  }, []);

  const beat = BEATS[index];
  const tone = leaving
    ? "bg-transparent text-ink pointer-events-none"
    : beat.tone === "screen"
      ? "bg-ink text-paper"
      : "bg-paper text-ink";

  return (
    <motion.div
      ref={dialog}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Introduction"
      className={`fixed inset-0 z-[100] select-none outline-none transition-colors duration-700 ${tone}`}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <IntroScene index={index} leaving={leaving} />

      <div className={`transition-opacity duration-300 ${leaving ? "opacity-0" : ""}`}>
        <div className="label absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-5 sm:px-10 sm:pt-7">
          <span className="flex w-24 gap-1.5">
            {BEATS.map((item, i) => (
              <span key={item.line} className={`h-px flex-1 transition-colors duration-500 ${i <= index ? "bg-current" : "bg-current/25"}`} />
            ))}
          </span>
          <button type="button" className="cursor-pointer border-b border-current pb-0.5 uppercase tracking-[inherit]" onClick={leave}>
            Skip
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 text-center sm:pb-16">
          <AnimatePresence mode="wait">
            <motion.p
              key={beat.line}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
              className="font-display text-[clamp(1.7rem,4.4vw,3.2rem)] leading-tight tracking-[-0.02em]"
            >
              {beat.line}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function Intro() {
  const playing = useJourneyPlaying();
  return <AnimatePresence>{playing && <IntroOverlay key="intro" />}</AnimatePresence>;
}

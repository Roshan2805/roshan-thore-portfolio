"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const letters = "Roshan Thore".split("");

// The name the intro's particles land on. Letters put on weight near the cursor,
// and the whole line drifts back as the story below scrolls over it.
export function KineticName() {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 140]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.12]);

  const all = () => ref.current?.querySelectorAll<HTMLElement>("span") ?? [];

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    all().forEach((letter) => {
      const box = letter.getBoundingClientRect();
      const distance = Math.hypot(e.clientX - box.left - box.width / 2, e.clientY - box.top - box.height / 2);
      letter.style.fontWeight = String(Math.round(500 + 300 * Math.max(0, 1 - distance / 260)));
    });
  };

  return (
    <motion.h1
      style={{ y, opacity }}
      aria-label="Roshan Thore"
      onPointerMove={onMove}
      onPointerLeave={() => all().forEach((letter) => (letter.style.fontWeight = ""))}
      className="text-center font-display text-[13.6vw] font-medium leading-none tracking-[-0.045em] whitespace-nowrap"
    >
      <span ref={ref} data-hero-name aria-hidden="true" className="hero-name inline-block">
        {letters.map((letter, i) => (
          <span key={i} className="transition-[font-weight] duration-300">
            {letter}
          </span>
        ))}
      </span>
    </motion.h1>
  );
}

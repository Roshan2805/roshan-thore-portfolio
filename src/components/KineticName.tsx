"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// The name the intro's particles land on. Letters put on weight near the cursor,
// and on the first scroll the two words part to let the story through.
export function KineticName() {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollY } = useScroll();
  const left = useTransform(scrollY, [0, 650], ["0vw", "-14vw"]);
  const right = useTransform(scrollY, [0, 650], ["0vw", "14vw"]);
  const opacity = useTransform(scrollY, [0, 550], [1, 0]);

  const letters = () => ref.current?.querySelectorAll<HTMLElement>("[data-letter]") ?? [];

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    letters().forEach((letter) => {
      const box = letter.getBoundingClientRect();
      const distance = Math.hypot(e.clientX - box.left - box.width / 2, e.clientY - box.top - box.height / 2);
      letter.style.fontWeight = String(Math.round(500 + 300 * Math.max(0, 1 - distance / 260)));
    });
  };

  const word = (text: string) =>
    text.split("").map((letter, i) => (
      <span key={i} data-letter className="transition-[font-weight] duration-300">
        {letter}
      </span>
    ));

  return (
    <motion.h1
      style={{ opacity }}
      aria-label="Roshan Thore"
      onPointerMove={onMove}
      onPointerLeave={() => letters().forEach((letter) => (letter.style.fontWeight = ""))}
      className="text-center font-display text-[13.6vw] font-medium leading-none tracking-[-0.045em] whitespace-nowrap"
    >
      <span ref={ref} data-hero-name aria-hidden="true" className="hero-name inline-block">
        <motion.span style={{ x: left }} className="inline-block">
          {word("Roshan")}
        </motion.span>
        {" "}
        <motion.span style={{ x: right }} className="inline-block">
          {word("Thore")}
        </motion.span>
      </span>
    </motion.h1>
  );
}

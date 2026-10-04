"use client";

import { useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

const words = "I didn't start with code. I studied commerce, and found code by accident.".split(" ");
const accentFrom = words.indexOf("found");

// The page goes dark for one sentence, and the words light up as you scroll through it.
export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const text = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const background = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], ["#f1eee6", "#17160f", "#17160f", "#f1eee6"]);
  const fill = useTransform(scrollYProgress, [0.12, 0.75], [0, 1]);

  useMotionValueEvent(fill, "change", (value) => text.current?.style.setProperty("--fill", String(value)));

  return (
    <motion.section ref={ref} style={{ backgroundColor: background }} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-[100svh] items-center px-5 sm:px-10">
        <p
          ref={text}
          className="scroll-fill max-w-[18ch] font-display text-[clamp(2.6rem,8.4vw,9rem)] leading-[0.98] tracking-[-0.045em] text-paper"
        >
          {words.map((word, i) => (
            <span
              key={i}
              className={i >= accentFrom ? "text-ember italic" : ""}
              style={{ opacity: `clamp(0.12, calc(var(--fill, 0) * ${words.length + 3} - ${i}), 1)` }}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </motion.section>
  );
}

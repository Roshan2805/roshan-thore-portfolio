"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const words = "I didn't start with code. I studied commerce, and found code by accident.".split(" ");
const accentFrom = words.indexOf("found");

function Word({ fill, index, children }: { fill: MotionValue<number>; index: number; children: string }) {
  const opacity = useTransform(fill, (value) => Math.min(1, Math.max(0.14, value * (words.length + 3) - index)));
  return (
    <motion.span style={{ opacity }} className={index >= accentFrom ? "text-ember italic" : ""}>
      {children}{" "}
    </motion.span>
  );
}

// The page goes dark for one sentence, and the words light up as you scroll through it.
// Each word's opacity is read straight from the scroll position, so the section looks
// the same however you arrive at it: scrolling, a nav link, a refresh or a replay.
export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const fill = useTransform(scrollYProgress, [0.08, 0.72], [0, 1]);

  return (
    <section ref={ref} className="relative h-[260vh] bg-ink text-paper">
      <div className="sticky top-0 flex h-[100svh] items-center px-5 sm:px-10">
        <p
          className="max-w-[18ch] font-display text-[clamp(2.6rem,8.4vw,9rem)] leading-[0.98] tracking-[-0.045em]"
        >
          {words.map((word, i) => (
            <Word key={i} fill={fill} index={i}>
              {word}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}

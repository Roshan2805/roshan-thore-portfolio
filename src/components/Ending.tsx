"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

const path = ["52% in 12th.", "A B.Com.", "Python, from YouTube.", "Angular, in a course in Pune.", "React, on the job."];

// The whole path again in five short lines, then the line it was all leading to.
export function Ending() {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => setShown(Math.floor(value * (path.length + 2))));

  const done = shown > path.length;

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center px-5 sm:px-10">
        <ol className="font-display text-[clamp(1.8rem,4.4vw,4rem)] leading-[1.12] tracking-[-0.03em]">
          {path.map((line, i) => (
            <li
              key={line}
              className={`transition-all duration-500 ${i < shown ? (done ? "text-mute/35" : "text-ink") : "translate-y-3 opacity-0"}`}
            >
              {line}
            </li>
          ))}
        </ol>
        <p
          className={`mt-8 font-display text-[clamp(3.6rem,12vw,12rem)] italic leading-[0.9] tracking-[-0.05em] text-signal transition-all duration-700 ${
            done ? "" : "translate-y-6 opacity-0"
          }`}
        >
          Still building.
        </p>
      </div>
    </section>
  );
}

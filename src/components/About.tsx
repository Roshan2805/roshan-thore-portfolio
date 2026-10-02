"use client";

import { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { OUTSIDE } from "@/data/portfolioData";
import { ReplayJourney } from "./ReplayJourney";

const statement =
  "I like the parts of a product where something real is at stake. A payment going through. A video starting on a bad connection. A list of thousands of items that still scrolls.".split(
    " "
  );

export function About() {
  const fill = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: fill, offset: ["start 0.85", "end 0.45"] });

  // Words darken one by one as the paragraph moves up the screen.
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    fill.current?.style.setProperty("--fill", String(value));
  });

  return (
    <section id="about" className="mx-auto max-w-[96rem] px-5 pt-28 sm:px-10 sm:pt-44">
      <p className="label text-mute">The person</p>

      <p
        ref={fill}
        className="scroll-fill mt-8 max-w-6xl font-display text-[clamp(2rem,5.4vw,5rem)] leading-[1.04] tracking-[-0.03em]"
      >
        {statement.map((word, i) => (
          <span key={i} style={{ opacity: `clamp(0.16, calc(var(--fill, 0) * ${statement.length + 4} - ${i}), 1)` }}>
            {word}{" "}
          </span>
        ))}
      </p>

      <div className="mt-16 grid gap-x-8 gap-y-12 sm:mt-24 md:grid-cols-12">
        <div className="space-y-5 text-lg leading-relaxed md:col-span-5 md:col-start-2">
          <p>
            I got into this late and sideways, so I still find it slightly unreal that typing the right things makes a
            product work. That hasn&apos;t worn off.
          </p>
          <p>
            What I care about in frontend is mostly what happens when things go wrong. A checkout is judged by what it
            does when the bank says no. A page is judged on the slow phone, not the fast laptop.
          </p>
          <p>
            When something breaks I look for the one place to fix it. One modal system instead of ten. One interceptor
            instead of a change at every call site. When the same request keeps coming back, I turn it into
            configuration so the next one needs no code.
          </p>
        </div>

        <div className="md:col-span-4 md:col-start-8">
          <p className="label text-mute">Outside work</p>
          <p className="mt-4 font-display text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1] tracking-[-0.035em]">
            {OUTSIDE.map((word, i) => (
              <span key={word} className="block transition-transform duration-500 hover:translate-x-3" style={{ paddingLeft: `${i * 0.6}em` }}>
                {word}
                {i < OUTSIDE.length - 1 ? "," : "."}
              </span>
            ))}
          </p>
          <p className="mt-5 text-mute">The last one is the only hobby I have that doesn&apos;t involve a screen.</p>

          <ReplayJourney className="link mt-10 cursor-pointer text-sm font-medium">↗ Replay the intro</ReplayJourney>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { STAGES, STORY } from "@/data/journeyData";

const python = [
  ["steps = ", '["learn", "build", "repeat"]', ""],
  ["", "", ""],
  ["for ", "step", " in steps:"],
  ["    print(", '"Roshan will"', ", step)"]
];

const angular = [
  ["@Component({ selector: ", '"app-story"', " })"],
  ["export class ", "StoryComponent", " {"],
  ["  @Input() seen = false;", "", ""],
  ["}", "", ""],
  ["", "", ""],
  ["<button class=\"ring\" ", "[class.seen]", '="seen">'],
  ["  <app-avatar />", "", ""],
  ["</button>", "", ""]
];

function Code({ lines }: { lines: string[][] }) {
  return (
    <pre className="overflow-hidden leading-relaxed">
      {lines.map(([plain, accent, rest], i) => (
        <span key={i} className="block">
          <span className="mr-4 text-paper/30">{i + 1}</span>
          {plain}
          <span className="text-ember">{accent}</span>
          {rest}
        </span>
      ))}
    </pre>
  );
}

function Rings() {
  return (
    <div className="flex gap-3">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={`size-7 rounded-full border-2 p-0.5 sm:size-11 ${i < 3 ? "border-ember" : "border-paper/30"}`}>
          <span className="block size-full rounded-full bg-paper/20" />
        </span>
      ))}
    </div>
  );
}

function Layer({ show, children, className = "" }: { show: boolean; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center p-6 transition-all duration-700 sm:p-10 ${
        show ? "opacity-100" : "pointer-events-none scale-95 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// One frame that changes with the story: a guess at a website, a ledger, code, an interface, a product.
function Visual({ step }: { step: number }) {
  const dark = step >= 2;

  return (
    <div
      aria-hidden="true"
      className={`relative size-full overflow-hidden border font-mono text-[11px] transition-colors sm:text-[13px] duration-700 ${
        dark ? "border-ink bg-ink text-paper" : "border-rule text-ink"
      }`}
    >
      <Layer show={step === 0}>
        <p className="label mb-4 text-mute">Software engineer = websites?</p>
        <div className="border border-dashed border-mute p-4">
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full border border-mute" />
            <span className="size-2 rounded-full border border-mute" />
            <span className="size-2 rounded-full border border-mute" />
          </div>
          <div className="mt-4 h-16 border border-dashed border-mute" />
          <div className="mt-3 grid grid-cols-3 gap-3">
            <div className="h-12 border border-dashed border-mute" />
            <div className="h-12 border border-dashed border-mute" />
            <div className="h-12 border border-dashed border-mute" />
          </div>
        </div>
      </Layer>

      <Layer show={step === 1}>
        <p className="label mb-4 text-mute">B.Com, 2019 – 2022</p>
        {["Accounting", "Banking", "Business studies", "A career in software"].map((row, i) => (
          <p key={row} className={`flex items-baseline gap-2 border-b border-rule py-2.5 ${i === 3 ? "text-mute line-through" : ""}`}>
            {row}
            <span className="leader" />
            {i === 3 ? "not on the syllabus" : "Dr / Cr"}
          </p>
        ))}
      </Layer>

      <Layer show={step === 2}>
        <p className="label mb-4 text-paper/50">first.py</p>
        <Code lines={python} />
      </Layer>

      <Layer show={step === 3} className="!justify-start">
        <p className="label mb-4 text-paper/50">story.component.ts</p>
        <Code lines={angular} />
      </Layer>

      <Layer show={step === 3} className="!justify-end">
        <p className="label mb-3 text-paper/50 max-sm:hidden">→ renders</p>
        <Rings />
      </Layer>

      <Layer show={step >= 4} className="!items-center">
        <div
          className={`w-44 border border-paper/30 p-3 transition-transform duration-700 sm:w-52 ${
            step === 5 ? "-translate-x-[45%] sm:-translate-x-[60%]" : ""
          }`}
        >
          <div className="origin-left scale-[0.6]">
            <Rings />
          </div>
          <div className="mt-2 flex gap-1">
            <span className="h-0.5 flex-1 bg-paper" />
            <span className="h-0.5 flex-1 bg-paper/30" />
            <span className="h-0.5 flex-1 bg-paper/30" />
          </div>
          <div className="mt-2 h-40 bg-paper/10 sm:h-48" />
          <div className="mt-2 bg-ember py-1.5 text-center text-[11px] text-ink">Subscribe</div>
        </div>
      </Layer>

      <Layer show={step === 5} className="!items-end">
        <p className="font-display text-6xl tracking-tight sm:text-8xl">30K+</p>
        <p className="label mt-2 text-paper/60">people using it</p>
      </Layer>
    </div>
  );
}

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setStep(Math.min(STORY.length - 1, Math.floor(value * STORY.length)));
  });

  const stage = STAGES.indexOf(STORY[step].stage);

  return (
    <section id="story" ref={ref} style={{ height: `${STORY.length * 85}vh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col px-5 pb-6 pt-20 sm:px-10">
        <div className="grid min-h-0 flex-1 items-center gap-6 md:grid-cols-12 md:gap-8">
          <div className="relative h-[38svh] md:order-2 md:col-span-6 md:col-start-7 md:h-[62svh]">
            <Visual step={step} />
          </div>

          <div className="relative min-h-[13rem] md:order-1 md:col-span-5">
            {STORY.map((item, i) => (
              <div
                key={item.label}
                aria-hidden={step !== i}
                className={`absolute inset-x-0 top-0 transition-all duration-500 md:top-1/2 md:-translate-y-1/2 ${
                  step === i ? "opacity-100" : `pointer-events-none opacity-0 ${i < step ? "-translate-y-4 md:-translate-y-[60%]" : "translate-y-4 md:-translate-y-[40%]"}`
                }`}
              >
                <p className="label text-signal">{item.label}</p>
                <p className="mt-4 font-display text-[clamp(1.5rem,3.1vw,2.7rem)] leading-[1.14] tracking-[-0.02em]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-6">
          <span className="block h-px bg-rule">
            <motion.span style={{ scaleX: scrollYProgress }} className="block h-full origin-left bg-signal" />
          </span>
          <ol className="label mt-3 flex justify-between">
            {STAGES.map((name, i) => (
              <li key={name} className={`transition-colors duration-500 ${i === stage ? "text-ink" : "text-mute/60"} ${i !== stage ? "max-sm:hidden" : ""}`}>
                {name}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

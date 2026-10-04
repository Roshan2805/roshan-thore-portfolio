"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { useMotionState } from "@/lib/useMotionState";
import { STAGES, STORY } from "@/data/journeyData";

const python = [
  ["steps = ", '["learn", "build", "repeat"]', ""],
  ["", "", ""],
  ["for ", "step", " in steps:"],
  ["    print(", '"Roshan will"', ", step)"]
];

const fundamentals = [
  { file: "index.html", lines: ['<div class="card">', '  <button id="like">Like</button>', "</div>"] },
  { file: "style.css", lines: [".card { padding: 1rem; }", "#like { border-radius: 99px; }"] },
  { file: "app.js", lines: ['like.addEventListener("click", () => {', '  like.textContent = "Liked";', "});"] }
];

const stack = ["Angular", "Node.js", "MongoDB"];

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

// One frame that changes with the story: a computer, a ledger, code, an interface, a product.
function Visual({ step }: { step: number }) {
  const dark = step >= 2;

  return (
    <div
      aria-hidden="true"
      className={`relative size-full overflow-hidden border font-mono text-[11px] transition-colors sm:text-[13px] duration-700 ${
        dark ? "border-ink bg-ink text-paper" : "border-rule text-ink"
      }`}
    >
      <Layer show={step === 0} className="!items-center">
        {/* A computer as a kid sees it: games, then the internet, then a question. */}
        <div className="w-full max-w-sm">
          <div className="relative aspect-[4/3] border-2 border-ink p-2">
            <div className="relative size-full overflow-hidden bg-ink text-paper">
              <div className="screen absolute inset-0 flex flex-col justify-between p-3">
                <p className="flex justify-between text-[10px] text-paper/60">
                  <span>1UP</span>
                  <span>HI 004200</span>
                </p>
                <div className="relative h-1/2">
                  <span className="hop absolute bottom-3 left-[20%] size-4 bg-ember" />
                  <span className="absolute bottom-10 left-[52%] size-2 rounded-full bg-paper" />
                  <span className="absolute bottom-3 left-[70%] h-6 w-5 bg-paper/40" />
                  <span className="absolute inset-x-0 bottom-0 h-3 bg-paper/25" />
                </div>
              </div>
              <div className="screen absolute inset-0 p-3" style={{ animationDelay: "2.4s" }}>
                <p className="border border-paper/30 px-2 py-1.5">how are games made?</p>
                <div className="mt-3 space-y-2">
                  <span className="block h-1.5 w-3/4 bg-ember/70" />
                  <span className="block h-1.5 w-full bg-paper/25" />
                  <span className="block h-1.5 w-2/3 bg-paper/25" />
                  <span className="block h-1.5 w-5/6 bg-paper/25" />
                </div>
              </div>
              <div className="screen absolute inset-0 flex items-center justify-center" style={{ animationDelay: "4.8s" }}>
                <span className="font-display text-7xl text-ember">?</span>
                <span className="blink ml-1 h-12 w-1 bg-paper/70" />
              </div>
            </div>
          </div>
          <div className="mx-auto h-5 w-10 border-x-2 border-ink" />
          <div className="mx-auto h-0.5 w-28 bg-ink" />
          <p className="label mt-5 flex justify-center gap-3 text-mute">
            <span className="screen-label">Games</span>·
            <span className="screen-label" style={{ animationDelay: "2.4s" }}>
              Internet
            </span>·
            <span className="screen-label" style={{ animationDelay: "4.8s" }}>
              Curiosity
            </span>
          </p>
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
        {/* Three files, one after another, the way the course taught them. */}
        <div key={step === 3 ? "on" : "off"} className="space-y-4">
          {fundamentals.map((file, i) => (
            <div key={file.file} className="type-in" style={{ animationDelay: `${i * 450}ms` }}>
              <p className="label mb-1.5 text-ember">{file.file}</p>
              <Code lines={file.lines.map((line) => [line, "", ""])} />
            </div>
          ))}
        </div>
      </Layer>

      <Layer show={step === 4}>
        <p className="label mb-6 text-paper/50">How an application fits together</p>
        <div className="flex items-center gap-2 sm:gap-3">
          {stack.map((part, i) => (
            <div key={part} className="contents">
              {i > 0 && <span className="text-ember">↔</span>}
              <span className="flex-1 border border-paper/30 px-2 py-4 text-center sm:px-3">{part}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between px-2 text-paper/40">
          <span>screen</span>
          <span>server</span>
          <span>data</span>
        </div>
        <p className="label mb-3 mt-8 text-paper/50 max-sm:hidden">→ renders</p>
        <div className="max-sm:mt-6">
          <Rings />
        </div>
      </Layer>

      <Layer show={step >= 5} className="!items-center">
        <div
          className={`w-44 border border-paper/30 p-3 transition-transform duration-700 sm:w-52 ${
            step === 6 ? "-translate-x-[45%] sm:-translate-x-[60%]" : ""
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

      <Layer show={step === 6} className="!items-end">
        <p className="font-display text-6xl tracking-tight sm:text-8xl">30K+</p>
        <p className="label mt-2 text-paper/60">people using it</p>
      </Layer>
    </div>
  );
}

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const step = useMotionState(scrollYProgress, (value) => Math.min(STORY.length - 1, Math.floor(value * STORY.length)));

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
                {item.note && <p className="mt-4 max-w-md text-base leading-relaxed text-mute sm:text-lg">{item.note}</p>}
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

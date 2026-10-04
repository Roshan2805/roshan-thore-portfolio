"use client";

import { useRef } from "react";
import { motion, useScroll, type MotionValue } from "framer-motion";
import { useMotionState } from "@/lib/useMotionState";
import { CHAPTERS, DISCOVERY, EARLY, LATER, type StoryStep } from "@/data/journeyData";

function Chapters({ active, progress, dark = false }: { active: number; progress: MotionValue<number>; dark?: boolean }) {
  return (
    <div className="relative mt-6">
      <span className={`block h-px ${dark ? "bg-paper/20" : "bg-rule"}`}>
        <motion.span style={{ scaleX: progress }} className="block h-full origin-left bg-signal" />
      </span>
      <ol className="label mt-3 flex justify-between">
        {CHAPTERS.map((name, i) => (
          <li
            key={name}
            className={`transition-colors duration-500 ${i === active ? (dark ? "text-paper" : "text-ink") : dark ? "text-paper/30" : "text-mute/60"} ${
              i !== active ? "max-sm:hidden" : ""
            }`}
          >
            <span className="mr-2">{String(i + 1).padStart(2, "0")}</span>
            {name}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Text({ steps, step }: { steps: StoryStep[]; step: number }) {
  return (
    <div className="relative min-h-[14rem] md:min-h-[22rem]">
      {steps.map((item, i) => (
        <div
          key={item.title}
          aria-hidden={step !== i}
          className={`absolute inset-x-0 top-0 transition-all duration-500 md:top-1/2 md:-translate-y-1/2 ${
            step === i ? "opacity-100" : `pointer-events-none opacity-0 ${i < step ? "-translate-y-4 md:-translate-y-[60%]" : "translate-y-4 md:-translate-y-[40%]"}`
          }`}
        >
          <p className="label text-signal">{item.label}</p>
          <h3 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.08] tracking-[-0.025em] text-balance">{item.title}</h3>
          {item.note && <p className="mt-4 max-w-md text-base leading-relaxed opacity-70 sm:text-lg">{item.note}</p>}
        </div>
      ))}
    </div>
  );
}

function Layer({ show, children, className = "" }: { show: boolean; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ${
        show ? "opacity-100" : "pointer-events-none scale-95 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function usePinnedStep(count: number) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const step = useMotionState(scrollYProgress, (value) => Math.min(count - 1, Math.floor(value * count)));
  return { ref, step, progress: scrollYProgress };
}

// A computer as a kid sees it: games, then the internet, then a question.
function KidsComputer() {
  return (
    <div className="mx-auto w-full max-w-sm">
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
        </span>
        ·
        <span className="screen-label" style={{ animationDelay: "4.8s" }}>
          Curiosity
        </span>
      </p>
    </div>
  );
}

// Interest in computers and formal education run side by side, then meet at code.
function TwoPaths({ phase }: { phase: number }) {
  const show = (from: number, to = 3) => `transition-opacity duration-700 ${phase >= from && phase <= to ? "opacity-100" : "opacity-0"}`;

  return (
    <svg viewBox="0 0 400 240" className="w-full overflow-visible font-mono" fill="none" stroke="currentColor">
      <circle cx="16" cy="120" r="4" fill="currentColor" />
      <text x="16" y="104" fill="currentColor" stroke="none" fontSize="11">
        Computers
      </text>
      <path d="M16 120 H120" strokeWidth="1.5" />

      <path d="M120 120 C190 120 220 60 300 60" strokeWidth="1.5" strokeDasharray="5 5" className={show(1)} />
      <text x="150" y="52" fill="currentColor" stroke="none" fontSize="10" className={show(2)} opacity="0.7">
        in the background
      </text>

      <path d="M120 120 C190 120 220 180 300 180" strokeWidth="1.5" className={show(1)} />
      <text x="16" y="142" fill="currentColor" stroke="none" fontSize="10" className={show(1)}>
        12th · Science · 52%
      </text>
      <text x="196" y="204" fill="currentColor" stroke="none" fontSize="10" className={show(2)}>
        B.Com, 2019 – 2022
      </text>

      <path d="M300 60 H384" strokeWidth="1" strokeDasharray="2 6" className={show(1, 2)} opacity="0.4" />
      <path d="M300 180 H384" strokeWidth="1" strokeDasharray="2 6" className={show(1, 2)} opacity="0.4" />

      <path d="M300 60 C340 60 350 120 384 120" strokeWidth="1.5" className={`text-signal ${show(3)}`} />
      <path d="M300 180 C340 180 350 120 384 120" strokeWidth="1.5" className={`text-signal ${show(3)}`} />
      <circle cx="384" cy="120" r="5" className={`fill-signal stroke-none ${show(3)}`} />
      <text x="384" y="102" textAnchor="end" stroke="none" fontSize="11" className={`fill-signal ${show(3)}`}>
        Code
      </text>
    </svg>
  );
}

export function StoryEarly() {
  const { ref, step, progress } = usePinnedStep(EARLY.length);

  return (
    <section id="story" ref={ref} style={{ height: `${EARLY.length * 75}vh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col px-5 pb-6 pt-20 sm:px-10">
        <div className="grid min-h-0 flex-1 items-center gap-6 md:grid-cols-12 md:gap-8">
          <div aria-hidden="true" className="relative h-[34svh] font-mono text-[11px] sm:text-[13px] md:order-2 md:col-span-6 md:col-start-7 md:h-[56svh]">
            <Layer show={step === 0}>
              <KidsComputer />
            </Layer>
            <Layer show={step > 0}>
              <TwoPaths phase={step} />
            </Layer>
          </div>
          <div className="md:order-1 md:col-span-5">
            <Text steps={EARLY} step={step} />
          </div>
        </div>
        <Chapters active={EARLY[step].chapter} progress={progress} />
      </div>
    </section>
  );
}

const files = [
  { name: "HTML", sample: "<button>Like</button>" },
  { name: "CSS", sample: "button { border-radius: 99px }" },
  { name: "JavaScript", sample: 'button.onclick = () => like()' }
];

function Browser({ annotated }: { annotated: boolean }) {
  const note = `label absolute whitespace-nowrap text-ember transition-opacity duration-700 ${annotated ? "opacity-100" : "opacity-0"}`;
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="border border-paper/30">
        <div className="flex items-center gap-1.5 border-b border-paper/30 px-3 py-2">
          <span className="size-2 rounded-full bg-paper/30" />
          <span className="size-2 rounded-full bg-paper/30" />
          <span className="size-2 rounded-full bg-paper/30" />
          <span className="ml-3 flex-1 bg-paper/10 px-2 py-0.5 text-[11px] text-paper/50">localhost:4200</span>
        </div>
        <div className="space-y-3 p-4">
          {["Post one", "Post two"].map((post, i) => (
            <div key={post} className="flex items-center justify-between border border-paper/20 px-3 py-3">
              <span>{post}</span>
              <span className={`rounded-full px-3 py-1 text-[11px] ${i === 0 ? "bg-ember text-ink" : "border border-paper/40"}`}>
                {i === 0 ? "Liked" : "Like"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <span className={`${note} -top-6 left-0`}>HTML · the structure</span>
      <span className={`${note} -top-6 right-0`}>CSS · the look</span>
      <span className={`${note} -bottom-6 right-0`}>JavaScript · what happens on click</span>
      <span className={`${note} -left-2 top-[60%] -translate-x-full max-md:hidden`}>data from a server →</span>
    </div>
  );
}

// The one loud moment in the story: finding out what code is.
export function Discovery() {
  const { ref, step, progress } = usePinnedStep(DISCOVERY.length);
  const dark = step > 0;

  return (
    <section
      ref={ref}
      style={{ height: `${DISCOVERY.length * 85}vh` }}
      className={`relative transition-colors duration-700 ${dark ? "bg-ink text-paper" : "bg-paper text-ink"}`}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col px-5 pb-6 pt-20 sm:px-10">
        <div className="grid min-h-0 flex-1 items-center gap-6 md:grid-cols-12 md:gap-8">
          <div aria-hidden="true" className="relative h-[34svh] font-mono text-[12px] sm:text-[13px] md:order-2 md:col-span-6 md:col-start-7 md:h-[56svh]">
            <Layer show={step === 0}>
              <TwoPaths phase={3} />
            </Layer>

            <Layer show={step === 1}>
              <div key={step === 1 ? "on" : "off"} className="space-y-5 sm:space-y-8">
                {files.map((file, i) => (
                  <div key={file.name} className="type-in" style={{ animationDelay: `${150 + i * 500}ms` }}>
                    <p className="font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-none tracking-[-0.04em]">{file.name}</p>
                    <p className="mt-1 text-paper/50">{file.sample}</p>
                  </div>
                ))}
              </div>
            </Layer>

            <Layer show={step >= 2}>
              <Browser annotated={step === 3} />
              <div className={`mx-auto mt-10 flex w-full max-w-md items-center gap-2 transition-opacity duration-700 ${step === 2 ? "opacity-100" : "opacity-0"}`}>
                {["Angular", "Node.js", "MongoDB"].map((part, i) => (
                  <div key={part} className="contents">
                    {i > 0 && <span className="text-ember">↔</span>}
                    <span className="flex-1 border border-paper/30 py-2 text-center">{part}</span>
                  </div>
                ))}
              </div>
            </Layer>
          </div>

          <div className="md:order-1 md:col-span-5">
            <Text steps={DISCOVERY} step={step} />
          </div>
        </div>
        <Chapters active={2} progress={progress} dark={dark} />
      </div>
    </section>
  );
}

function Phone({ shifted }: { shifted: boolean }) {
  return (
    <div className={`w-44 border border-paper/30 p-3 transition-transform duration-700 sm:w-52 ${shifted ? "-translate-x-[45%] sm:-translate-x-[60%]" : ""}`}>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`size-6 rounded-full border-2 ${i < 3 ? "border-ember" : "border-paper/30"}`} />
        ))}
      </div>
      <div className="mt-2 flex gap-1">
        <span className="h-0.5 flex-1 bg-paper" />
        <span className="h-0.5 flex-1 bg-paper/30" />
        <span className="h-0.5 flex-1 bg-paper/30" />
      </div>
      <div className="mt-2 h-40 bg-paper/10 sm:h-48" />
      <div className="mt-2 bg-ember py-1.5 text-center text-[11px] text-ink">Subscribe</div>
    </div>
  );
}

export function StoryLater() {
  const { ref, step, progress } = usePinnedStep(LATER.length);

  return (
    <section ref={ref} style={{ height: `${LATER.length * 75}vh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col px-5 pb-6 pt-20 sm:px-10">
        <div className="grid min-h-0 flex-1 items-center gap-6 md:grid-cols-12 md:gap-8">
          <div
            aria-hidden="true"
            className="relative h-[34svh] overflow-hidden bg-ink px-6 font-mono text-[11px] text-paper sm:px-10 sm:text-[13px] md:order-2 md:col-span-6 md:col-start-7 md:h-[56svh]"
          >
            <Layer show={step === 0} className="items-center px-6">
              <div className="w-full max-w-sm">
                <p className="label text-paper/50">admin-panel / src / app</p>
                {["users.component.ts", "events.service.ts", "rewards.module.ts", "api.interceptor.ts"].map((file, i) => (
                  <p key={file} className={`border-b border-paper/15 py-2 ${i === 1 ? "text-ember" : ""}`}>
                    {file}
                    {i === 1 && <span className="ml-3 text-paper/40">← reading</span>}
                  </p>
                ))}
              </div>
            </Layer>

            <Layer show={step === 1} className="px-6 sm:px-10">
              <p className="label text-paper/50">Part-time, alongside the job</p>
              <p className="mt-4 font-display text-3xl leading-tight tracking-tight sm:text-4xl">Master of Computer Applications</p>
              <p className="mt-2 text-paper/60">Sandip University · 2023 – 2026</p>
              <div className="mt-8 grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((semester) => (
                  <div key={semester} className="border-t-2 border-ember pt-2 text-paper/60">
                    Sem {semester}
                  </div>
                ))}
              </div>
              <p className="mt-8 flex items-baseline gap-2 text-base">
                CGPA
                <span className="leader" />
                7.85
              </p>
            </Layer>

            <Layer show={step === 2} className="items-center">
              <Phone shifted />
            </Layer>
            <Layer show={step === 2} className="items-end px-6 sm:px-10">
              <p className="font-display text-6xl tracking-tight sm:text-8xl">30K+</p>
              <p className="label mt-2 text-paper/60">people using it</p>
            </Layer>
          </div>

          <div className="md:order-1 md:col-span-5">
            <Text steps={LATER} step={step} />
          </div>
        </div>
        <Chapters active={LATER[step].chapter} progress={progress} />
      </div>
    </section>
  );
}

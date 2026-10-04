"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, type MotionValue } from "framer-motion";
import { useMotionState } from "@/lib/useMotionState";
import { CHAPTERS, DISCOVERY, EARLY, LATER, type Chapter } from "@/data/journeyData";
import { KidsComputer } from "./KidsComputer";

function usePinnedStep(count: number) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const step = useMotionState(scrollYProgress, (value) => Math.min(count - 1, Math.floor(value * count)));
  return { ref, step, progress: scrollYProgress };
}

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
              i !== active ? "max-lg:hidden" : ""
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

function Layer({ show, children, className = "" }: { show: boolean; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
        show ? "opacity-100" : "pointer-events-none scale-95 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// The quiet chapters: a small headline, the facts, one plain paragraph.
function ChapterText({ chapters, step }: { chapters: Chapter[]; step: number }) {
  return (
    <div className="relative min-h-[17rem] md:min-h-[24rem]">
      {chapters.map((item, i) => (
        <div
          key={item.title}
          aria-hidden={step !== i}
          className={`absolute inset-x-0 top-0 transition-all duration-500 md:top-1/2 md:-translate-y-1/2 ${
            step === i ? "opacity-100" : `pointer-events-none opacity-0 ${i < step ? "-translate-y-4 md:-translate-y-[60%]" : "translate-y-4 md:-translate-y-[40%]"}`
          }`}
        >
          <p className="label text-signal">
            {String(item.chapter + 1).padStart(2, "0")} · {item.label}
          </p>
          <h3 className="mt-4 font-display text-[clamp(1.7rem,2.8vw,2.6rem)] leading-[1.1] tracking-[-0.02em] text-balance">{item.title}</h3>
          {item.facts && (
            <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-sm text-mute">
              {item.facts.map((fact, k) => (
                <span key={fact}>
                  {k > 0 && <span className="mr-3 text-signal">/</span>}
                  {fact}
                </span>
              ))}
            </p>
          )}
          <p className="mt-5 max-w-md text-base leading-relaxed sm:text-lg">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

// Interest in computers and formal education running side by side for a while.
function TwoPaths() {
  return (
    <svg viewBox="0 0 400 240" className="w-full overflow-visible font-mono" fill="none" stroke="currentColor">
      <circle cx="16" cy="120" r="4" fill="currentColor" />
      <text x="16" y="104" fill="currentColor" stroke="none" fontSize="11">
        Computers
      </text>
      <path d="M16 120 H120" strokeWidth="1.5" />
      <path d="M120 120 C190 120 220 60 300 60 H384" strokeWidth="1.5" strokeDasharray="5 5" />
      <text x="170" y="50" fill="currentColor" stroke="none" fontSize="10" opacity="0.7">
        in the background
      </text>
      <path d="M120 120 C190 120 220 180 300 180 H384" strokeWidth="1.5" />
      <text x="16" y="142" fill="currentColor" stroke="none" fontSize="10">
        12th · Science
      </text>
      <text x="236" y="204" fill="currentColor" stroke="none" fontSize="10">
        B.Com
      </text>
    </svg>
  );
}

export function StoryEarly() {
  const { ref, step, progress } = usePinnedStep(EARLY.length);

  return (
    <section id="story" ref={ref} style={{ height: `${EARLY.length * 90}vh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col px-5 pb-6 pt-20 sm:px-10">
        <div className="grid min-h-0 flex-1 items-center gap-6 md:grid-cols-12 md:gap-8">
          <div aria-hidden="true" className="relative h-[32svh] md:order-2 md:col-span-5 md:col-start-8 md:h-[52svh]">
            <Layer show={step === 0}>
              <KidsComputer />
            </Layer>
            <Layer show={step === 1}>
              <TwoPaths />
            </Layer>
          </div>
          <div className="md:order-1 md:col-span-5 md:col-start-2">
            <ChapterText chapters={EARLY} step={step} />
          </div>
        </div>
        <Chapters active={EARLY[step].chapter} progress={progress} />
      </div>
    </section>
  );
}

function LikeButton({ live }: { live: boolean }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!live) return;
    const timer = setInterval(() => setLiked((value) => !value), 1100);
    return () => clearInterval(timer);
  }, [live]);

  return (
    <span className={`rounded-full px-4 py-1.5 font-sans text-sm transition-colors duration-300 ${liked && live ? "bg-ember text-ink" : "border border-paper/50"}`}>
      {liked && live ? "Liked" : "Like"}
    </span>
  );
}

// The one loud chapter. A few lines of code on one stage, getting more real with every scroll.
export function Discovery() {
  const { ref, step, progress } = usePinnedStep(DISCOVERY.length);
  const dark = step >= 2;
  const showObject = step >= 2 && step <= 6;
  const current = DISCOVERY[step];

  return (
    <section
      ref={ref}
      style={{ height: `${DISCOVERY.length * 60}vh` }}
      className={`relative transition-colors duration-700 ${dark ? "bg-ink text-paper" : "bg-paper text-ink"}`}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col px-5 pb-6 pt-20 sm:px-10">
        <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center text-center">
          <div aria-hidden="true" className={`relative h-[44svh] w-full max-w-2xl transition-opacity duration-500 ${showObject ? "" : "opacity-0"}`}>
            <Layer show={step === 2}>
              <pre className="text-left font-mono text-[clamp(0.95rem,2vw,1.5rem)] leading-relaxed text-paper/90">
                <span className="text-ember">&lt;h1&gt;</span>Hello<span className="text-ember">&lt;/h1&gt;</span>
                {"\n"}
                <span className="text-ember">&lt;p&gt;</span>My first page.<span className="text-ember">&lt;/p&gt;</span>
                {"\n"}
                <span className="text-ember">&lt;button&gt;</span>Like<span className="text-ember">&lt;/button&gt;</span>
              </pre>
            </Layer>

            <Layer show={step === 3 || step === 4}>
              <div className="w-full max-w-sm border border-paper/30 p-6 text-left sm:p-8">
                <p className="font-display text-5xl tracking-tight">Hello</p>
                <p className="mt-2 text-paper/60">My first page.</p>
                <div className="mt-6">
                  <LikeButton live={step === 4} />
                </div>
              </div>
              <p className="mt-6 font-mono text-xs text-paper/50 sm:text-sm">
                {step === 3 ? "h1 { font-family: serif } button { border-radius: 99px }" : "button.onclick = () => like()"}
              </p>
            </Layer>

            <Layer show={step === 5}>
              <div className="w-full max-w-md border border-paper/30 text-left font-mono text-[12px]">
                <div className="flex items-center gap-1.5 border-b border-paper/30 px-3 py-2">
                  <span className="size-2 rounded-full bg-paper/30" />
                  <span className="size-2 rounded-full bg-paper/30" />
                  <span className="size-2 rounded-full bg-paper/30" />
                  <span className="ml-3 flex-1 bg-paper/10 px-2 py-0.5 text-paper/50">localhost:4200/posts</span>
                </div>
                <div className="space-y-2.5 p-4">
                  {["Post one", "Post two", "Post three"].map((post, i) => (
                    <div key={post} className="flex items-center justify-between border border-paper/20 px-3 py-2.5">
                      {post}
                      <span className={`rounded-full px-3 py-0.5 text-[11px] ${i === 0 ? "bg-ember text-ink" : "border border-paper/40"}`}>
                        {i === 0 ? "Liked" : "Like"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-5 flex items-center gap-2 font-mono text-xs text-paper/60 sm:text-sm">
                screen <span className="text-ember">↔</span> server <span className="text-ember">↔</span> database
              </p>
            </Layer>

            <Layer show={step === 6}>
              <div className="w-48 border border-paper/30 p-3 sm:w-56">
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className={`size-7 rounded-full border-2 ${i < 3 ? "border-ember" : "border-paper/30"}`} />
                  ))}
                </div>
                <div className="mt-2 flex gap-1">
                  <span className="h-0.5 flex-1 bg-paper" />
                  <span className="h-0.5 flex-1 bg-paper/30" />
                  <span className="h-0.5 flex-1 bg-paper/30" />
                </div>
                <div className="mt-2 h-36 bg-paper/10 sm:h-44" />
                <div className="mt-2 bg-ember py-1.5 text-center text-[11px] text-ink">Subscribe</div>
              </div>
            </Layer>
          </div>

          {/* The line under the stage. Before and after the code it fills the screen on its own. */}
          <div
            className={`transition-all duration-500 ${
              showObject ? "mt-8 max-w-xl" : "absolute inset-x-0 top-1/2 mx-auto max-w-4xl -translate-y-1/2"
            }`}
          >
            {current.label && <p className="label mb-3 text-signal">{current.label}</p>}
            <p
              key={current.line}
              className={`story-in font-display tracking-[-0.025em] text-balance ${
                showObject ? "text-xl sm:text-2xl" : "text-[clamp(2rem,5vw,4.4rem)] leading-[1.06]"
              }`}
            >
              {current.line}
            </p>
            {step === 5 && <p className="mt-3 text-sm opacity-60">Angular, Node.js and MongoDB, in a six-month course after B.Com.</p>}
          </div>
        </div>
        <Chapters active={2} progress={progress} dark={dark} />
      </div>
    </section>
  );
}

export function StoryLater() {
  const { ref, step, progress } = usePinnedStep(LATER.length);

  return (
    <section ref={ref} style={{ height: `${LATER.length * 90}vh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col px-5 pb-6 pt-20 sm:px-10">
        <div className="grid min-h-0 flex-1 items-center gap-6 md:grid-cols-12 md:gap-8">
          <div
            aria-hidden="true"
            className="relative h-[30svh] overflow-hidden bg-ink font-mono text-[11px] text-paper sm:text-[13px] md:order-2 md:col-span-5 md:col-start-8 md:h-[52svh]"
          >
            <Layer show={step === 0} className="px-6">
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

            <Layer show={step === 1} className="!items-start px-6 sm:px-10">
              <p className="label text-paper/50">Part-time, alongside the job</p>
              <p className="mt-3 font-display text-2xl leading-tight tracking-tight sm:mt-4 sm:text-4xl">Master of Computer Applications</p>
              <p className="mt-2 text-paper/60">Sandip University · 2023</p>
              <div className="mt-8 grid w-full grid-cols-5 gap-2 max-sm:hidden">
                {[1, 2, 3, 4, 5].map((semester) => (
                  <div key={semester} className="border-t-2 border-ember pt-2 text-paper/60">
                    Sem {semester}
                  </div>
                ))}
              </div>
              <p className="mt-5 flex w-full items-baseline gap-2 text-base sm:mt-8">
                CGPA
                <span className="leader" />
                7.85
              </p>
            </Layer>

            <Layer show={step === 2} className="!items-start !justify-end px-6 pb-8 sm:px-10">
              <p className="font-display text-6xl tracking-tight sm:text-8xl">30K+</p>
              <p className="label mt-2 text-paper/60">people use what I build</p>
            </Layer>
          </div>

          <div className="md:order-1 md:col-span-5 md:col-start-2">
            <ChapterText chapters={LATER} step={step} />
          </div>
        </div>
        <Chapters active={LATER[step].chapter} progress={progress} />
      </div>
    </section>
  );
}

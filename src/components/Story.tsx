"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, type MotionValue } from "framer-motion";
import { useMotionState } from "@/lib/useMotionState";
import { CHAPTERS, EARLY, FUNDAMENTALS, LATER, type Chapter } from "@/data/journeyData";

// Every step of the story lives on one pinned stage, and each step owns a fixed share of the
// scroll. Which step is on screen is only ever a function of how far the page has scrolled:
// nothing is locked, queued or waiting on an animation to finish.
const quiet = [...EARLY, ...LATER];

const steps = [
  { chapter: 0, weight: 1 },
  { chapter: 1, weight: 1 },
  { chapter: 2, weight: 1 },
  { chapter: 2, weight: 1.8 },
  { chapter: 2, weight: 1 },
  { chapter: 3, weight: 1 },
  { chapter: 4, weight: 1 },
  { chapter: 5, weight: 1 }
];
const FUNDAMENTALS_STEP = 3;
const totalWeight = steps.reduce((sum, step) => sum + step.weight, 0);

function locate(progress: number) {
  let covered = 0;
  for (let i = 0; i < steps.length; i++) {
    const share = steps[i].weight / totalWeight;
    if (progress < covered + share || i === steps.length - 1) {
      return { step: i, within: Math.min(Math.max((progress - covered) / share, 0), 1) };
    }
    covered += share;
  }
  return { step: 0, within: 0 };
}

// The stage itself changes with the story: paper while things are quiet, dark when code
// arrives, and red when it reaches today.
type Tone = "paper" | "ink" | "red";
const stageTone: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  ink: "bg-ink text-paper",
  red: "bg-signal text-paper"
};

function Chapters({ active, progress, tone }: { active: number; progress: MotionValue<number>; tone: Tone }) {
  const light = tone === "paper";
  return (
    <div className="relative mt-6">
      <span className={`block h-px ${light ? "bg-rule" : "bg-paper/25"}`}>
        <motion.span style={{ scaleX: progress }} className={`block h-full origin-left ${tone === "red" ? "bg-paper" : "bg-signal"}`} />
      </span>
      <ol className="label mt-3 flex justify-between">
        {CHAPTERS.map((name, i) => (
          <li
            key={name}
            className={`transition-colors duration-500 ${i === active ? "" : light ? "text-mute/60" : "text-paper/40"} ${i !== active ? "max-lg:hidden" : ""}`}
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

// The quiet chapters: one large headline, the facts in small type, one plain paragraph.
function ChapterText({ chapters, step, tone }: { chapters: Chapter[]; step: number; tone: Tone }) {
  const accent = tone === "paper" ? "text-signal" : "text-paper/70";
  const soft = tone === "paper" ? "text-mute" : "text-paper/70";
  return (
    <div className="relative min-h-[19rem] md:min-h-[30rem]">
      {chapters.map((item, i) => (
        <div
          key={item.title}
          aria-hidden={step !== i}
          className={`absolute inset-x-0 top-0 transition-all duration-500 md:top-1/2 md:-translate-y-1/2 ${
            step === i ? "opacity-100" : `pointer-events-none opacity-0 ${i < step ? "-translate-y-4 md:-translate-y-[60%]" : "translate-y-4 md:-translate-y-[40%]"}`
          }`}
        >
          <p className={`label ${accent}`}>{item.label}</p>
          <h3 className="mt-3 font-display text-[clamp(1.6rem,4.4vw,4.6rem)] leading-[1.02] tracking-[-0.035em] text-balance sm:mt-5">
            {item.title}
          </h3>
          {item.facts && (
            <p className={`mt-3 flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-xs sm:mt-6 sm:gap-y-1 sm:text-sm ${soft}`}>
              {item.facts.map((fact, k) => (
                <span key={fact}>
                  {k > 0 && <span className={`mr-3 ${accent}`}>/</span>}
                  {fact}
                </span>
              ))}
            </p>
          )}
          <p className="mt-3 max-w-md text-[15px] leading-snug sm:mt-6 sm:text-lg sm:leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

// 01. Not a picture of a computer: the questions a kid has in front of one.
const questions = [
  { text: "?", at: "left-[4%] top-[2%]", style: "font-display text-[clamp(6rem,15vw,15rem)] leading-none text-signal", drift: 9 },
  { text: "how does this work?", at: "left-[34%] top-[12%]", style: "font-display text-[clamp(1.1rem,2.2vw,2.2rem)] italic", drift: 7 },
  { text: "games", at: "right-[4%] top-[34%]", style: "font-display text-[clamp(2rem,5vw,5rem)] tracking-tight", drift: 11 },
  { text: "what's inside it?", at: "left-[10%] top-[52%]", style: "font-mono text-sm sm:text-base", drift: 8 },
  { text: "the internet", at: "left-[38%] top-[62%]", style: "font-display text-[clamp(1.4rem,3.2vw,3.2rem)] italic text-signal", drift: 10 },
  { text: "who makes these?", at: "right-[6%] top-[8%]", style: "font-mono text-xs text-mute sm:text-sm", drift: 12 },
  { text: "why?", at: "right-[12%] bottom-[6%]", style: "font-display text-[clamp(1.6rem,3.6vw,3.6rem)]", drift: 6 },
  { text: "exploring", at: "left-[2%] bottom-[4%]", style: "label text-mute", drift: 13 }
];

function Curiosity() {
  return (
    <div className="relative size-full">
      {questions.map((item) => (
        <span key={item.text} className={`drift absolute whitespace-nowrap ${item.at} ${item.style}`} style={{ animationDuration: `${item.drift}s` }}>
          {item.text}
        </span>
      ))}
    </div>
  );
}

// 02. Set like a ledger page: what I studied, and what stayed in the background.
function EducationTable() {
  const rows = [
    ["12th", "Science", "52%"],
    ["2019 – 22", "B.Com", "64%"]
  ];
  return (
    <div className="w-full">
      <div className="label flex justify-between border-b-2 border-ink pb-2 text-mute">
        <span>When</span>
        <span>What</span>
        <span>Result</span>
      </div>
      {rows.map(([when, what, result]) => (
        <div key={what} className="grid grid-cols-[1fr_1.4fr_auto] items-baseline gap-4 border-b border-ink py-4 sm:py-6">
          <span className="font-mono text-sm tabular-nums sm:text-base">{when}</span>
          <span className="font-display text-[clamp(1.8rem,4.4vw,4.4rem)] leading-none tracking-[-0.03em]">{what}</span>
          <span className="font-mono text-sm tabular-nums sm:text-base">{result}</span>
        </div>
      ))}
      <div className="grid grid-cols-[1fr_1.4fr_auto] items-baseline gap-4 border-b border-dashed border-mute py-4 text-mute sm:py-6">
        <span className="font-mono text-sm sm:text-base">meanwhile</span>
        <span className="font-display text-[clamp(1.8rem,4.4vw,4.4rem)] italic leading-none tracking-[-0.03em]">Computers</span>
        <span className="font-mono text-sm sm:text-base">in the background</span>
      </div>
    </div>
  );
}

// 04. A system diagram, since this is where it becomes engineering.
function Roles() {
  const roles = [
    ["Web Developer Intern", "Intern", "Jan 2023"],
    ["Junior Software Development Engineer", "Junior SDE", "Aug 2023"],
    ["Software Development Engineer", "SDE", "Aug 2024"]
  ];
  return (
    <div className="blueprint flex size-full flex-col justify-center px-6 sm:px-10">
      <p className="label text-paper/50 max-sm:hidden">Ink In Caps, Mumbai</p>
      <ol className="border-l border-ember sm:mt-8">
        {roles.map(([title, short, from], i) => (
          <li key={title} className="relative pb-3 pl-6 last:pb-0 sm:pb-9 sm:pl-8">
            <span className="absolute -left-[5px] top-1.5 size-[9px] bg-ember" />
            <p className="font-mono text-xs text-ember sm:text-sm">
              {String(i + 1).padStart(2, "0")} · {from}
            </p>
            <p className="mt-0.5 font-display text-lg leading-tight tracking-tight sm:mt-1 sm:text-3xl">
              <span className="sm:hidden">{short}</span>
              <span className="max-sm:hidden">{title}</span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

// 05. Dense, like a transcript.
function Transcript() {
  return (
    <div className="flex size-full flex-col justify-center px-6 sm:px-10">
      <div className="label flex justify-between border-b border-paper/30 pb-2 text-paper/50">
        <span>Master of Computer Applications</span>
        <span className="max-sm:hidden">Sandip University</span>
      </div>
      <div className="flex items-end justify-between gap-6 border-b border-paper/30 py-4 sm:py-6">
        <p className="font-display text-[clamp(4rem,11vw,11rem)] leading-[0.8] tracking-[-0.05em]">7.85</p>
        <p className="label pb-1 text-right text-paper/50">
          CGPA
          <br />
          Aug 2023 – Jun 2026
        </p>
      </div>
      <div className="grid grid-cols-5 font-mono text-[11px] sm:text-sm">
        {[1, 2, 3, 4, 5].map((semester) => (
          <span key={semester} className="border-b border-r border-paper/30 py-2 text-center last:border-r-0 sm:py-3">
            Sem {semester}
          </span>
        ))}
      </div>
      <p className="label mt-3 text-ember">Part-time, alongside the job</p>
    </div>
  );
}

// 06. Where the story lands: what the job covers now, set large.
function Today() {
  const areas = ["Payments", "Subscriptions", "Media", "Real-time", "Admin tools"];
  return (
    <ol className="w-full">
      {areas.map((area, i) => (
        <li key={area} className="flex items-baseline justify-between border-b border-paper/40 py-2 first:border-t sm:py-3">
          <span className="font-display text-[clamp(1.6rem,4.2vw,4.2rem)] leading-none tracking-[-0.035em]">{area}</span>
          <span className="font-mono text-xs text-paper/70 sm:text-sm">{String(i + 1).padStart(2, "0")}</span>
        </li>
      ))}
    </ol>
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

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const step = useMotionState(scrollYProgress, (value) => locate(value).step);
  // Inside the fundamentals step the same lines go from bare HTML to styled to interactive.
  const layer = useMotionState(scrollYProgress, (value) => {
    const at = locate(value);
    if (at.step < FUNDAMENTALS_STEP) return 0;
    return at.step > FUNDAMENTALS_STEP ? 2 : Math.min(2, Math.floor(at.within * 3));
  });

  const discovering = step >= 2 && step <= 4;
  const tone: Tone = step === 3 || step === 4 ? "ink" : step === 7 ? "red" : "paper";
  // Index into the quiet chapters. During discovery it already points at the next one.
  const chapter = step <= 1 ? step : Math.max(step - 3, 2);
  const number = steps[step].chapter;
  const pane = (shown: boolean) => `absolute inset-0 transition-opacity duration-500 ${shown ? "" : "pointer-events-none opacity-0"}`;

  return (
    <section id="story" ref={ref} style={{ height: `${Math.round(totalWeight * 60)}vh` }} className="relative">
      <div
        data-tone={tone}
        className={`sticky top-0 flex h-[100svh] flex-col overflow-hidden px-5 pb-6 pt-20 transition-colors duration-500 sm:px-10 ${stageTone[tone]}`}
      >
        {/* The chapter number, set as large as the stage allows. */}
        <span
          key={number}
          aria-hidden="true"
          className={`numeral pointer-events-none absolute -bottom-[0.14em] right-0 select-none font-display text-[46vw] leading-[0.7] tracking-[-0.06em] md:text-[34vw] ${
            tone === "paper" ? "text-ink/[0.045]" : "text-paper/[0.07]"
          }`}
        >
          {String(number + 1).padStart(2, "0")}
        </span>

        <div className="relative min-h-0 flex-1">
          <div aria-hidden={discovering} className={`${pane(!discovering)} grid content-start items-center gap-5 md:grid-cols-12 md:content-center md:gap-8`}>
            <div
              aria-hidden="true"
              className={`relative h-[24svh] overflow-hidden transition-colors duration-500 [@media(min-height:740px)]:h-[30svh] sm:h-[32svh] md:order-2 md:col-span-6 md:col-start-7 md:h-[58svh] ${
                chapter === 2 || chapter === 3 ? "bg-ink text-paper" : ""
              }`}
            >
              <Layer show={chapter === 0}>
                <Curiosity />
              </Layer>
              <Layer show={chapter === 1}>
                <EducationTable />
              </Layer>
              <Layer show={chapter === 2}>
                <Roles />
              </Layer>
              <Layer show={chapter === 3}>
                <Transcript />
              </Layer>
              <Layer show={chapter === 4}>
                <Today />
              </Layer>
            </div>

            <div className="md:order-1 md:col-span-5">
              <ChapterText chapters={quiet} step={chapter} tone={tone} />
            </div>
          </div>

          {/* The one loud chapter: finding out what code is. */}
          <div aria-hidden={!discovering} className={`${pane(discovering)} text-center`}>
            <Layer show={step === 2}>
              <p className="label text-signal">Lockdown, 2020</p>
              <p className="mt-5 max-w-5xl font-display text-[clamp(2rem,5.6vw,5.4rem)] leading-[1.02] tracking-[-0.035em] text-balance">
                During lockdown, a friend told me about courses that could get me into IT.
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-70">
                I liked computers, but I didn&apos;t really know what careers there were in software. That conversation made
                me think about it seriously, so I signed up for a six-month software development course.
              </p>
            </Layer>

            <Layer show={step === 3}>
              <div aria-hidden="true" className="relative h-[38svh] w-full max-w-2xl">
                <Layer show={layer === 0}>
                  <pre className="text-left font-mono text-[clamp(0.95rem,2vw,1.5rem)] leading-relaxed text-paper/90">
                    <span className="text-ember">&lt;h1&gt;</span>Hello<span className="text-ember">&lt;/h1&gt;</span>
                    {"\n"}
                    <span className="text-ember">&lt;p&gt;</span>My first page.<span className="text-ember">&lt;/p&gt;</span>
                    {"\n"}
                    <span className="text-ember">&lt;button&gt;</span>Like<span className="text-ember">&lt;/button&gt;</span>
                  </pre>
                </Layer>
                <Layer show={layer > 0}>
                  <div className="w-full max-w-sm border border-paper/30 p-6 text-left sm:p-8">
                    <p className="font-display text-5xl tracking-tight">Hello</p>
                    <p className="mt-2 text-paper/60">My first page.</p>
                    <div className="mt-6">
                      <LikeButton live={step === 3 && layer === 2} />
                    </div>
                  </div>
                </Layer>
              </div>
              <ol className="mt-8 flex items-end gap-6 sm:gap-12">
                {FUNDAMENTALS.map((item, i) => (
                  <li key={item.name} className={`text-left transition-colors duration-500 ${i <= layer ? "text-paper" : "text-paper/20"}`}>
                    <span className={`block font-display text-[clamp(1.5rem,3.4vw,3.4rem)] leading-none tracking-[-0.03em] ${i === layer ? "text-ember" : ""}`}>
                      {item.name}
                    </span>
                    <span className="label mt-2 block opacity-60">{item.role}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 max-w-lg text-base opacity-70">
                <span className="label mr-3 text-ember">The course, 2022</span>
                That&apos;s where I started learning to code, from the fundamentals.
              </p>
            </Layer>

            <Layer show={step === 4}>
              <div aria-hidden="true" className="grid w-full max-w-3xl grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 sm:gap-5">
                {[
                  ["Angular", "the screen"],
                  ["Node.js", "the server"],
                  ["MongoDB", "the data"]
                ].map(([name, role], i) => (
                  <div key={name} className="contents">
                    {i > 0 && <span className="font-mono text-ember">↔</span>}
                    <div className="border border-paper/30 px-2 py-7 text-center sm:py-12">
                      <p className="font-display text-[clamp(1.2rem,3.2vw,3rem)] leading-none tracking-[-0.03em]">{name}</p>
                      <p className="label mt-3 text-paper/50">{role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-10 max-w-3xl font-display text-[clamp(1.6rem,3.6vw,3.4rem)] leading-[1.04] tracking-[-0.03em]">
                Then how a complete application comes together.
              </p>
              <p className="mt-4 max-w-lg text-base opacity-70">My first real look at how software is actually built.</p>
            </Layer>
          </div>
        </div>

        <Chapters active={number} progress={scrollYProgress} tone={tone} />
      </div>
    </section>
  );
}

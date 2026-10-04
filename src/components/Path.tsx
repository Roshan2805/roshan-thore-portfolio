"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { useMotionState } from "@/lib/useMotionState";
import { TIMELINE } from "@/data/portfolioData";
import { useDesktop } from "@/lib/useDesktop";

const { start, end, education, work, moments, stages } = TIMELINE;
const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
const x = (year: number) => `${((year - start) / (end - start)) * 100}%`;

type Bar = { label: string; detail: string; from: number; to: number; row?: number };

function Lane({ name, bars, at, top }: { name: string; bars: Bar[]; at: number; top: string }) {
  return (
    <div className="absolute inset-x-0" style={{ top }}>
      <span className="label absolute -top-6 left-0 text-mute">{name}</span>
      {bars.map((bar) => {
        const filled = Math.min(Math.max((at - bar.from) / (bar.to - bar.from), 0), 1);
        return (
          <div
            key={bar.label}
            className="absolute"
            style={{ left: x(bar.from), top: `${(bar.row ?? 0) * 14}px`, width: `calc(${x(bar.to)} - ${x(bar.from)} - 6px)` }}
          >
            <span className="block h-1.5 bg-rule">
              <span className="block h-full origin-left bg-signal" style={{ transform: `scaleX(${filled})` }} />
            </span>
            <p className={`mt-2 whitespace-nowrap text-sm transition-colors duration-300 ${filled > 0 ? "text-ink" : "text-mute"}`}>
              {bar.label}
              <span className="ml-2 font-mono text-[11px] text-mute max-2xl:hidden">{bar.detail}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function Path() {
  const ref = useRef<HTMLElement>(null);
  const desktop = useDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const at = useMotionState(scrollYProgress, (value) => start + Math.min(Math.max((value - 0.05) / 0.85, 0), 1) * (end - start));

  const current = [...stages].reverse().find((stage) => at >= stage.from) ?? stages[0];

  if (!desktop) {
    return (
      <section id="experience" className="px-5 pt-28">
        <p className="label text-mute">Education and work, on one line</p>
        <ol className="mt-8 border-l border-ink">
          {stages.map((stage) => (
            <li key={stage.word} className="relative pb-10 pl-6">
              <span className="absolute -left-[5px] top-3 size-[9px] rounded-full bg-signal" />
              <p className="font-mono text-xs text-mute">{stage.period}</p>
              <h3 className="mt-1 font-display text-4xl tracking-[-0.03em]">{stage.word}</h3>
              <p className="mt-2 text-lg leading-relaxed">{stage.text}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section id="experience" ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-between px-10 pb-12 pt-24">
        <div className="flex items-baseline justify-between">
          <p className="label text-mute">Education and work, on one line</p>
          <p className="font-mono text-sm tabular-nums text-mute">{Math.floor(at)}</p>
        </div>

        <div className="grid grid-cols-12 items-end gap-8">
          <h2 key={current.word} className="story-in col-span-6 font-display text-[clamp(4rem,9vw,9rem)] leading-[0.9] tracking-[-0.05em]">
            {current.word}
          </h2>
          <div key={current.period} className="story-in col-span-5 col-start-8 pb-3">
            <p className="font-mono text-sm text-signal">{current.period}</p>
            <p className="mt-3 text-xl leading-relaxed">{current.text}</p>
          </div>
        </div>

        <div className="relative h-56">
          <Lane name="Education" bars={education} at={at} top="1.5rem" />

          <div className="absolute inset-x-0 top-[6.5rem] border-t border-ink">
            {years.map((year) => (
              <span key={year} className="absolute top-2 -translate-x-1/2 font-mono text-[11px] text-mute" style={{ left: x(year) }}>
                {year}
              </span>
            ))}
            {moments.map((moment) => (
              <span key={moment.label} className="absolute -top-[5px]" style={{ left: x(moment.at) }}>
                <span className={`block size-[9px] -translate-x-1/2 rounded-full border border-ink ${at >= moment.at ? "bg-ink" : "bg-paper"}`} />
                <span className="absolute -top-7 -translate-x-1/2 whitespace-nowrap font-mono text-[11px]">{moment.label}</span>
              </span>
            ))}
          </div>

          <Lane name="Work" bars={work} at={at} top="10rem" />

          <span className="absolute inset-y-0 w-px bg-signal" style={{ left: x(at) }} />
        </div>
      </div>
    </section>
  );
}

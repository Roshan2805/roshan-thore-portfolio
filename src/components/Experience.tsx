"use client";

import { useEffect, useRef, useState } from "react";
import { GROWTH } from "@/data/portfolioData";

export function Experience() {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-48% 0px -48% 0px" }
    );
    list.current?.querySelectorAll("[data-index]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="mx-auto grid max-w-[96rem] gap-x-8 px-5 pt-28 sm:px-10 sm:pt-44 md:grid-cols-12">
      <div className="md:col-span-6">
        <div className="md:sticky md:top-[28vh]">
          <p className="label text-mute">How it grew · Ink In Caps, Mumbai</p>

          {/* The word stays put while the entries scroll past it. */}
          <div className="relative mt-6 h-[1.9em] font-display text-[clamp(3rem,8.4vw,8.5rem)] leading-[0.92] tracking-[-0.045em] max-md:hidden">
            {GROWTH.map((item, i) => (
              <span
                key={item.stage}
                className={`absolute left-0 top-0 transition-all duration-500 ${
                  active === i ? "opacity-100" : `opacity-0 ${i < active ? "-translate-y-6" : "translate-y-6"}`
                }`}
              >
                {item.stage}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-4 max-md:hidden">
            <span className="font-mono text-sm tabular-nums text-signal">
              {String(active + 1).padStart(2, "0")} / {String(GROWTH.length).padStart(2, "0")}
            </span>
            <span className="h-px w-40 bg-rule">
              <span
                className="block h-full origin-left bg-signal transition-transform duration-500"
                style={{ transform: `scaleX(${(active + 1) / GROWTH.length})` }}
              />
            </span>
          </div>
        </div>
      </div>

      <div ref={list} className="mt-10 md:col-span-5 md:col-start-8 md:mt-0 md:pb-[20vh] md:pt-[10vh]">
        {GROWTH.map((item, i) => (
          <div
            key={item.stage}
            data-index={i}
            className={`border-t border-ink py-10 transition-opacity duration-500 md:min-h-[46vh] ${
              active === i ? "" : "md:opacity-30"
            }`}
          >
            <p className="font-display text-5xl tracking-[-0.04em] text-signal md:hidden">{item.stage}</p>
            <p className="font-mono text-sm tabular-nums text-mute max-md:mt-3">{item.period}</p>
            <h3 className="mt-2 font-display text-2xl leading-tight tracking-tight sm:text-3xl">{item.role}</h3>
            <ul className="mt-5 space-y-3">
              {item.points.map((point) => (
                <li key={point} className="text-lg leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

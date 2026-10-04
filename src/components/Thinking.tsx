"use client";

import { useEffect, useRef, useState } from "react";
import { PRINCIPLES } from "@/data/portfolioData";

export function Thinking() {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-46% 0px -46% 0px" }
    );
    list.current?.querySelectorAll("[data-index]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="mx-auto max-w-[96rem] px-5 pt-28 sm:px-10 sm:pt-44">
      <p className="label text-mute">How I work</p>
      <p className="on-view mt-6 max-w-5xl font-display text-[clamp(2rem,4.8vw,4.4rem)] leading-[1.04] tracking-[-0.03em]">
        I like the parts of a product where something real is at stake. A payment going through. A video starting on a
        bad connection.
      </p>

      <div className="mt-16 grid gap-x-10 md:mt-24 md:grid-cols-12">
        <ol ref={list} className="md:col-span-7">
          {PRINCIPLES.map((item, i) => (
            <li key={item.title} data-index={i} className="border-t border-ink py-8 md:py-12">
              <p className="font-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</p>
              <h3
                className={`mt-3 font-display text-4xl leading-[1.02] tracking-[-0.035em] transition-colors duration-500 sm:text-6xl ${
                  active === i ? "text-ink" : "md:text-mute/40"
                }`}
              >
                {item.title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-mute md:hidden">{item.proof}</p>
            </li>
          ))}
        </ol>

        <div className="max-md:hidden md:col-span-4 md:col-start-9">
          <div className="sticky top-[38vh]">
            <p className="label text-mute">Where I learned it</p>
            <p key={active} className="story-in mt-4 text-xl leading-relaxed">
              {PRINCIPLES[active].proof}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

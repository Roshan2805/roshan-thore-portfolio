"use client";

import { useCenteredIndex } from "@/lib/useCenteredIndex";
import { CAPABILITIES } from "@/data/portfolioData";

export function Skills() {
  const { ref: list, active } = useCenteredIndex<HTMLDivElement>();

  return (
    <section id="skills" className="mt-28 bg-ink text-paper sm:mt-44">
      <div ref={list} className="mx-auto max-w-[96rem] px-5 py-24 sm:px-10 sm:py-40">
        <p className="label text-paper/50">What I&apos;ve become good at</p>

        {CAPABILITIES.map((item, i) => (
          <div key={item.title} data-index={i} className="grid gap-x-8 gap-y-6 py-12 md:grid-cols-12 md:py-[9vh]">
            <h2
              className={`font-display text-[clamp(2.6rem,7.2vw,7rem)] leading-[0.94] tracking-[-0.04em] transition-colors duration-500 md:col-span-7 ${
                active === i ? "text-paper" : "md:text-paper/20"
              }`}
            >
              {item.title}
            </h2>
            <ul className="self-center md:col-span-4 md:col-start-9">
              {item.tools.map((tool, k) => (
                <li
                  key={tool}
                  style={{ transitionDelay: active === i ? `${k * 45}ms` : "0ms" }}
                  className={`border-t border-paper/20 py-2 transition-all duration-500 ${
                    active === i ? "" : "md:translate-x-4 md:opacity-0"
                  }`}
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className="text-sm text-paper/50">Only what I use at work and can explain in an interview.</p>
      </div>
    </section>
  );
}

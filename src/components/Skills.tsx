"use client";

import { useCenteredIndex } from "@/lib/useCenteredIndex";
import { ALL_SKILLS, CAPABILITIES } from "@/data/portfolioData";

export function Skills() {
  const { ref: list, active } = useCenteredIndex<HTMLDivElement>();

  return (
    <section id="skills" className="mt-28 bg-ink text-paper sm:mt-44">
      <div ref={list} className="mx-auto max-w-[96rem] px-5 py-24 sm:px-10 sm:py-40">
        <p className="label text-paper/50">What I work with</p>

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

        <details className="group border-t border-paper/20">
          <summary className="flex cursor-pointer items-baseline justify-between py-5 text-sm text-paper/60 hover:text-paper">
            The full list, as it is on my résumé
            <span className="font-mono text-ember">
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
          </summary>
          <dl className="grid gap-x-8 gap-y-6 pb-8 sm:grid-cols-2 lg:grid-cols-4">
            {ALL_SKILLS.map((row) => (
              <div key={row.group}>
                <dt className="label text-paper/50">{row.group}</dt>
                <dd className="mt-2 leading-relaxed">{row.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </details>
      </div>
    </section>
  );
}

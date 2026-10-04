"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EARLIER_WORK, PROJECTS, type Project } from "@/data/portfolioData";
import { useDesktop } from "@/lib/useDesktop";
import { FiltersPreview } from "./previews/FiltersPreview";
import { AssignmentPreview } from "./previews/AssignmentPreview";

const [, admin, agency] = PROJECTS;

function Panel({ project, index, children }: { project: Project; index: number; children: React.ReactNode }) {
  return (
    <article className="grid shrink-0 grid-cols-1 items-center gap-x-10 gap-y-8 px-5 py-16 sm:px-10 md:w-screen md:grid-cols-12 md:py-0">
      <div className="md:col-span-6">
        <p className="label text-mute">
          Case {String(index).padStart(2, "0")} · {project.kind} · {project.status}
        </p>
        <h2 className="mt-5 font-display text-[clamp(2.6rem,6.2vw,6rem)] leading-[0.92] tracking-[-0.04em]">{project.title}</h2>
        <p className="mt-3 font-display text-xl italic text-signal">{project.role}</p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed">{project.contribution}</p>
        <dl className="mt-6 max-w-xl">
          {project.results.map((result) => (
            <div key={result.label} className="flex items-baseline gap-2 border-t border-rule py-2 text-sm">
              <dt className="text-mute">{result.label}</dt>
              <span className="leader" aria-hidden="true" />
              <dd className="font-mono tabular-nums">{result.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 max-w-xl font-mono text-xs leading-relaxed text-mute">{project.stack.join(" / ")}</p>
      </div>
      <div data-cursor="Try it" className="bg-ink p-5 text-paper sm:p-8 md:col-span-5 md:col-start-8">{children}</div>
    </article>
  );
}

export function MoreWork() {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.06, 0.94], ["0vw", "-200vw"]);

  return (
    <div ref={ref} className="md:h-[300vh]">
      <div className="md:sticky md:top-0 md:flex md:h-screen md:items-center md:overflow-hidden">
        <motion.div style={desktop ? { x } : undefined} className="md:flex">
          <Panel project={admin} index={2}>
            <FiltersPreview />
          </Panel>
          <Panel project={agency} index={3}>
            <AssignmentPreview />
          </Panel>

          <article className="shrink-0 px-5 py-16 sm:px-10 md:w-screen md:py-0">
            <p className="label text-mute">Before KNKY</p>
            {EARLIER_WORK.map((work) => (
              <div key={work.title} className="mt-8 grid gap-x-10 gap-y-2 border-t border-ink pt-6 md:grid-cols-12">
                <h2 className="font-display text-4xl tracking-tight sm:text-5xl md:col-span-5">{work.title}</h2>
                <p className="text-lg leading-relaxed md:col-span-5">{work.summary}</p>
                <p className="font-mono text-xs text-mute md:col-span-2 md:text-right">
                  {work.period}
                  <br />
                  {work.stack}
                </p>
              </div>
            ))}
            <p className="mt-10 max-w-xl text-sm text-mute">
              The previews on this page are working sketches I redrew for it. The production code and UI belong to the
              company, and I&apos;m happy to walk through any of it on a call.
            </p>
          </article>
        </motion.div>
      </div>
    </div>
  );
}

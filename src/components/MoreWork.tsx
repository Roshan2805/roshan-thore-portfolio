"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EARLIER_WORK, PROJECTS, type Project } from "@/data/portfolioData";
import { useDesktop } from "@/lib/useDesktop";
import { Flow } from "./Flow";
import { FiltersPreview } from "./previews/FiltersPreview";
import { AssignmentPreview } from "./previews/AssignmentPreview";

const [, admin, agency] = PROJECTS;

function Panel({ project, index, note, children }: { project: Project; index: number; note: string; children: React.ReactNode }) {
  return (
    <article className="grid shrink-0 grid-cols-1 items-center gap-x-10 gap-y-8 px-5 py-16 sm:px-10 md:w-screen md:grid-cols-12 md:py-0">
      <div className="md:col-span-6">
        <p className="label text-mute">
          Case {String(index).padStart(2, "0")} · {project.kind} · {project.period}
        </p>
        <h2 className="mt-4 font-display text-[clamp(2.6rem,5.6vw,5.4rem)] leading-[0.92] tracking-[-0.04em]">{project.title}</h2>
        <p className="mt-2 font-display text-xl italic text-signal">{project.role}</p>

        <dl className="mt-8 grid grid-cols-2 gap-6">
          {project.headline.map((item) => (
            <div key={item.label} className="border-t border-ink pt-3">
              <dd className="font-display text-4xl tracking-tight sm:text-5xl">{item.value}</dd>
              <dt className="mt-1 text-sm text-mute">{item.label}</dt>
            </div>
          ))}
        </dl>

        <p className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-sm">
          {project.areas.map((area, i) => (
            <span key={area}>
              {i > 0 && <span className="mr-3 text-signal">/</span>}
              {area}
            </span>
          ))}
        </p>

        {project.flow && (
          <div className="mt-6">
            <Flow steps={project.flow} tone="light" />
          </div>
        )}

        <p className="mt-6 max-w-xl leading-relaxed">{project.problem}</p>
        <a href="#details" className="link mt-5 inline-block text-sm">
          What I built, in full ↓
        </a>
      </div>
      <div className="md:col-span-5 md:col-start-8">
        <div data-cursor="Try it" className="bg-ink p-5 text-paper sm:p-8">
          {children}
        </div>
        <p className="label mt-3 text-mute">{note}</p>
      </div>
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
          <Panel project={admin} index={2} note="Portfolio demo · sample rows · the URL is the filter">
            <FiltersPreview />
          </Panel>
          <Panel project={agency} index={3} note="Portfolio demo · sample staff and creators">
            <AssignmentPreview />
          </Panel>

          <article className="shrink-0 px-5 py-16 sm:px-10 md:flex md:w-screen md:flex-col md:justify-center md:py-0">
            <p className="label text-mute">Before KNKY</p>
            {EARLIER_WORK.map((work) => (
              <div key={work.title} className="mt-8 grid gap-x-10 gap-y-3 border-t border-ink pt-6 md:grid-cols-12">
                <div className="md:col-span-4">
                  <h2 className="font-display text-4xl tracking-tight sm:text-5xl">{work.title}</h2>
                  <p className="mt-2 text-sm text-mute">
                    {work.kind} · {work.period}
                  </p>
                </div>
                <div className="md:col-span-6">
                  <p className="text-lg leading-relaxed">{work.summary}</p>
                  <p className="mt-3 font-mono text-xs text-mute">{work.stack.join(" / ")}</p>
                </div>
              </div>
            ))}
            <p className="mt-10 max-w-xl text-sm text-mute">
              The demos on this page are working sketches I rebuilt for the portfolio, with made-up sample data. The
              production code and UI belong to the company, and I&apos;m happy to walk through any of it on a call.
            </p>
          </article>
        </motion.div>
      </div>
    </div>
  );
}

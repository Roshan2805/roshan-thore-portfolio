import { EARLIER_WORK, PROJECTS } from "@/data/portfolioData";
import { ProjectFigure } from "./ProjectFigure";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[84rem] px-5 pt-28 sm:px-10 sm:pt-44">
      <div className="flex items-end justify-between gap-6">
        <h2 className="font-display text-[clamp(2.6rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em]">
          Selected <em className="text-signal">work</em>
        </h2>
        <p className="label hidden pb-3 text-mute sm:block">Three products, one platform</p>
      </div>

      {PROJECTS.map((project, i) => (
        <article key={project.id} className="mt-16 border-t border-ink pt-6 sm:mt-24">
          <div className="label flex flex-wrap justify-between gap-x-6 gap-y-1 text-mute">
            <span>
              {String(i + 1).padStart(2, "0")} · {project.kind}
            </span>
            <span>
              {project.period} · {project.status}
            </span>
          </div>

          <div className="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-12">
            <div className={`md:col-span-7 ${i % 2 ? "md:order-2 md:col-start-6" : ""}`}>
              <h3 className="font-display text-4xl tracking-[-0.03em] sm:text-6xl">{project.title}</h3>
              <p className="mt-2 text-signal">{project.role}</p>

              <p className="mt-8 max-w-xl font-display text-xl leading-snug sm:text-2xl">{project.problem}</p>
              <p className="mt-5 max-w-xl leading-relaxed">{project.contribution}</p>

              <p className="mt-8 max-w-xl font-mono text-xs leading-relaxed text-mute">{project.stack.join(" / ")}</p>
            </div>

            <div className={`md:col-span-4 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
              <figure className="border border-rule p-5 sm:p-6">
                <ProjectFigure id={project.id} />
              </figure>
              <dl className="mt-6">
                {project.results.map((result) => (
                  <div key={result.label} className="flex items-baseline gap-2 border-b border-rule py-2 text-sm">
                    <dt className="text-mute">{result.label}</dt>
                    <span className="leader" aria-hidden="true" />
                    <dd className="font-mono tabular-nums">{result.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <details className="group mt-10">
            <summary className="label inline-flex cursor-pointer items-center gap-2 text-mute hover:text-ink">
              <span className="text-signal group-open:hidden">+</span>
              <span className="hidden text-signal group-open:inline">−</span>
              Problems I solved here
            </summary>
            <div className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-3">
              {project.solved.map((item) => (
                <div key={item.problem}>
                  <p className="font-medium leading-snug">{item.problem}</p>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{item.fix}</p>
                </div>
              ))}
            </div>
          </details>
        </article>
      ))}

      <div className="mt-20 grid gap-x-8 md:grid-cols-12 sm:mt-28">
        <p className="label text-mute md:col-span-2">Before KNKY</p>
        <div className="mt-4 md:col-span-10 md:mt-0">
          {EARLIER_WORK.map((work) => (
            <div key={work.title} className="grid gap-x-8 gap-y-1 border-t border-rule py-5 md:grid-cols-10">
              <h3 className="font-display text-xl md:col-span-3">{work.title}</h3>
              <p className="leading-relaxed md:col-span-5">{work.summary}</p>
              <p className="font-mono text-xs text-mute md:col-span-2 md:text-right">
                {work.period}
                <br />
                {work.stack}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-mute">
        All of this is company work, so the code is private. I&apos;m happy to walk through any of it on a call.
      </p>
    </section>
  );
}

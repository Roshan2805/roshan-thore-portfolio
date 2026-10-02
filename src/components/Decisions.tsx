import { PROJECTS } from "@/data/portfolioData";

export function Decisions() {
  return (
    <section id="decisions" className="mx-auto max-w-[96rem] px-5 pt-20 sm:px-10 sm:pt-32">
      <p className="label text-mute">For the engineers reading</p>
      <h2 className="on-view mt-5 max-w-4xl font-display text-[clamp(2rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.03em]">
        Problems I ran into on these products, and what I did about them.
      </h2>

      <div className="mt-12">
        {PROJECTS.map((project) => (
          <details key={project.id} className="group border-t border-ink" open={project.id === "knky"}>
            <summary className="flex cursor-pointer items-baseline justify-between gap-6 py-5">
              <span className="font-display text-2xl tracking-tight sm:text-3xl">{project.title}</span>
              <span className="label text-mute">
                {project.solved.length} decisions
                <span className="ml-3 text-signal group-open:hidden">+</span>
                <span className="ml-3 hidden text-signal group-open:inline">−</span>
              </span>
            </summary>
            <div className="grid gap-x-8 gap-y-8 pb-10 md:grid-cols-3">
              {project.solved.map((item) => (
                <div key={item.problem}>
                  <p className="label text-signal">Problem</p>
                  <p className="mt-2 font-medium leading-snug">{item.problem}</p>
                  <p className="label mt-4 text-mute">What I did</p>
                  <p className="mt-2 leading-relaxed text-mute">{item.fix}</p>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

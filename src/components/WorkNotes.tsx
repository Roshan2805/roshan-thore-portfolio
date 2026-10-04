import { PROJECTS } from "@/data/portfolioData";

// For engineers who want more than the summary: the hard parts of each product and what I did.
export function WorkNotes() {
  return (
    <section aria-label="What was hard" className="mx-auto max-w-[96rem] px-5 pt-20 sm:px-10 sm:pt-28">
      <div className="grid gap-x-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="label text-mute">What was hard</p>
          <p className="mt-4 max-w-xs text-mute">For the engineers reading. Open any of them.</p>
        </div>
        <div className="mt-8 md:col-span-8 md:mt-0">
          {PROJECTS.map((project) => (
            <details key={project.id} className="group border-t border-ink last:border-b">
              <summary className="flex cursor-pointer items-baseline justify-between gap-6 py-5">
                <span className="font-display text-2xl tracking-tight sm:text-3xl">{project.title}</span>
                <span className="font-mono text-signal">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <div className="grid gap-x-8 gap-y-6 pb-8 sm:grid-cols-2">
                {project.solved.map((item) => (
                  <div key={item.problem}>
                    <p className="font-medium leading-snug">{item.problem}</p>
                    <p className="mt-2 leading-relaxed text-mute">{item.fix}</p>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

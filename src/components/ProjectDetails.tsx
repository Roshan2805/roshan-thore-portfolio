import { EARLIER_WORK, PROJECTS } from "@/data/portfolioData";
import { Benchmark } from "./Benchmark";

type Entry = {
  id: string;
  title: string;
  kind: string;
  period: string;
  stack: string[];
  built: { area: string; points: string[] }[];
  solved: { problem: string; fix: string }[];
};

const entries: Entry[] = [
  ...PROJECTS,
  ...EARLIER_WORK.map((work) => ({ ...work, id: work.title.toLowerCase().replace(/\s+/g, "-") }))
];

// Everything the summaries above leave out, closed until someone wants it.
export function ProjectDetails() {
  return (
    <section id="details" className="mx-auto max-w-[96rem] px-5 pt-20 sm:px-10 sm:pt-28">
      <div className="grid gap-x-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="label text-mute">Project details</p>
          <p className="mt-4 max-w-xs text-mute">What I built on each project, and what was hard. Open any of them.</p>
        </div>

        <div className="mt-8 md:col-span-8 md:mt-0">
          {entries.map((entry) => (
            <details key={entry.id} className="group border-t border-ink last:border-b">
              <summary className="flex cursor-pointer items-baseline justify-between gap-6 py-5">
                <span>
                  <span className="font-display text-2xl tracking-tight sm:text-3xl">{entry.title}</span>
                  <span className="ml-3 text-sm text-mute max-sm:block max-sm:ml-0">
                    {entry.kind} · {entry.period}
                  </span>
                </span>
                <span className="font-mono text-signal">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>

              <div className="pb-10">
                <p className="label text-mute">What I built</p>
                <div className="mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {entry.built.map((group) => (
                    <div key={group.area}>
                      <h4 className="font-medium">{group.area}</h4>
                      <ul className="mt-2 space-y-1.5">
                        {group.points.map((point) => (
                          <li key={point} className="leading-relaxed text-mute">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <p className="label mt-10 text-mute">What was hard</p>
                <div className="mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {entry.solved.map((item) => (
                    <div key={item.problem}>
                      <p className="font-medium leading-snug">{item.problem}</p>
                      <p className="mt-2 leading-relaxed text-mute">{item.fix}</p>
                    </div>
                  ))}
                </div>

                {entry.id === "knky" && (
                  <div className="mt-10">
                    <p className="label text-mute">Try the idea behind the Media Vault</p>
                    <div className="mt-4">
                      <Benchmark />
                    </div>
                  </div>
                )}

                <p className="mt-8 font-mono text-xs leading-relaxed text-mute">{entry.stack.join(" / ")}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

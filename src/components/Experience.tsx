import { EXPERIENCES, PERSONAL_INFO } from "@/data/portfolioData";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[84rem] px-5 pt-28 sm:px-10 sm:pt-44">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink pb-3">
        <p className="label text-mute">Experience</p>
        <p className="label text-mute">
          {PERSONAL_INFO.company} · Mumbai · 2023 to now
        </p>
      </div>

      {EXPERIENCES.map((job) => (
        <article key={job.title} className="grid gap-x-8 gap-y-3 border-b border-rule py-8 md:grid-cols-12 md:py-10">
          <p className="font-mono text-sm tabular-nums text-mute md:col-span-2 md:pt-2">{job.period}</p>
          <div className="md:col-span-4">
            <h3 className="font-display text-2xl leading-tight tracking-tight sm:text-3xl">{job.title}</h3>
            <p className="mt-2 text-mute">{job.summary}</p>
          </div>
          <ul className="space-y-2.5 md:col-span-6">
            {job.points.map((point) => (
              <li key={point} className="flex gap-3 leading-relaxed">
                <span className="text-signal" aria-hidden="true">
                  —
                </span>
                {point}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}

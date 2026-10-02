import { EDUCATION } from "@/data/portfolioData";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-[96rem] px-5 pt-28 sm:px-10 sm:pt-44">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b border-ink pb-6">
        <h2 className="on-view font-display text-[clamp(2.6rem,7.2vw,7rem)] leading-[0.94] tracking-[-0.04em]">Education</h2>
        <p className="max-w-xs pb-2 text-mute">Commerce first, then code, then a master&apos;s alongside the job.</p>
      </div>

      {EDUCATION.map((item) => (
        <div key={item.degree} className="grid gap-x-8 gap-y-2 border-b border-rule py-8 md:grid-cols-12 md:py-10">
          <p className="font-mono text-sm tabular-nums text-signal md:col-span-2 md:pt-2">{item.period}</p>
          <div className="md:col-span-6">
            <h3 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">{item.degree}</h3>
            <p className="mt-2 text-mute">{item.school}</p>
          </div>
          <p className="text-lg leading-relaxed md:col-span-4 md:pt-1">{item.note}</p>
        </div>
      ))}
    </section>
  );
}

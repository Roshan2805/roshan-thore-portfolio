import { EDUCATION, SKILLS } from "@/data/portfolioData";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[84rem] px-5 pt-28 sm:px-10 sm:pt-44">
      <div className="grid gap-x-8 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="label text-mute">Skills</p>
          <p className="mt-4 max-w-[16rem] text-mute">Only what I use at work and can explain in an interview.</p>
        </div>

        <div className="mt-8 md:col-span-9 md:mt-0">
          {SKILLS.map((skill) => (
            <div key={skill.group} className="grid gap-x-8 gap-y-2 border-t border-rule py-6 md:grid-cols-9">
              <h3 className="label pt-2 text-mute md:col-span-2">{skill.group}</h3>
              <p className="font-display text-2xl leading-snug tracking-tight md:col-span-7 sm:text-[1.75rem]">
                {skill.items.map((item, i) => (
                  <span key={item}>
                    {i > 0 && <span className="text-signal"> / </span>}
                    {item}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-[84rem] px-5 pt-28 sm:px-10 sm:pt-44">
      <div className="grid gap-x-8 md:grid-cols-12">
        <p className="label text-mute md:col-span-3">Education</p>

        <div className="mt-8 md:col-span-9 md:mt-0">
          {EDUCATION.map((item) => (
            <div key={item.degree} className="grid gap-x-8 gap-y-1 border-t border-rule py-5 md:grid-cols-9">
              <p className="font-mono text-sm tabular-nums text-mute md:col-span-2">{item.period}</p>
              <div className="md:col-span-4">
                <h3 className="font-display text-xl">{item.degree}</h3>
                <p className="text-sm text-mute">{item.school}</p>
              </div>
              <p className="text-sm leading-relaxed text-mute md:col-span-3">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { FIGURES, PERSONAL_INFO } from "@/data/portfolioData";
import { ReplayJourney } from "./ReplayJourney";

export function Hero() {
  return (
    <section id="overview" className="mx-auto max-w-[84rem] px-5 pt-28 sm:px-10 sm:pt-40">
      <p className="label rise text-mute">
        {PERSONAL_INFO.role} at {PERSONAL_INFO.company} · {PERSONAL_INFO.location}
      </p>

      <h1 className="rise mt-6 font-display text-[clamp(4.5rem,21vw,11.5rem)] leading-[0.86] tracking-[-0.045em] [animation-delay:80ms]">
        Roshan
        <br />
        <span className="sm:pl-[1.1em]">Thore</span>
      </h1>

      <div className="rise mt-10 grid gap-10 [animation-delay:200ms] md:mt-14 md:grid-cols-12">
        <p className="font-display text-3xl italic text-signal md:col-span-4 md:text-4xl">Frontend Engineer</p>

        <div className="md:col-span-7 md:col-start-6">
          <p className="max-w-xl text-lg leading-relaxed sm:text-xl">
            I build the parts of a product that can&apos;t break: checkout, subscriptions, video and chat. For three
            and a half years that has been KNKY, a creator platform with 30K+ users, written in React, Next.js and
            TypeScript.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#projects" className="bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-signal">
              View work
            </a>
            <a href="#about" className="link text-sm font-medium">
              About me
            </a>
            <a href={PERSONAL_INFO.resumeUrl} download className="link text-sm font-medium">
              Download résumé
            </a>
          </div>
        </div>
      </div>

      <dl className="mt-20 border-t border-ink sm:mt-28">
        {FIGURES.map((figure) => (
          <div key={figure.label} className="flex items-baseline gap-3 border-b border-rule py-3">
            <dt className="text-sm text-mute sm:text-base">{figure.label}</dt>
            <span className="leader" aria-hidden="true" />
            <dd className="font-mono text-base tabular-nums sm:text-lg">{figure.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex justify-end">
        <ReplayJourney className="label cursor-pointer text-mute transition-colors hover:text-signal">
          ▶ Replay my journey · 30 sec
        </ReplayJourney>
      </div>
    </section>
  );
}

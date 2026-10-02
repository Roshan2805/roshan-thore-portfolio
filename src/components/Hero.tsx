import { PERSONAL_INFO } from "@/data/portfolioData";
import { KineticName } from "./KineticName";
import { Magnetic } from "./Magnetic";

export function Hero() {
  return (
    <section id="top" className="flex min-h-[100svh] flex-col px-5 pb-8 pt-24 sm:px-10">
      <p className="label reveal flex justify-between text-mute">
        <span>
          {PERSONAL_INFO.company}, {PERSONAL_INFO.location}
        </span>
        <span className="max-sm:hidden">Portfolio, 2026</span>
      </p>

      <div className="flex flex-1 items-center justify-center py-10">
        <KineticName />
      </div>

      <div className="reveal grid items-end gap-8 [animation-delay:300ms] md:grid-cols-12">
        <p className="font-display text-4xl italic text-signal md:col-span-4 md:text-5xl">Frontend Engineer</p>

        <div className="md:col-span-5 md:col-start-6">
          <p className="text-lg leading-relaxed sm:text-xl">
            I build the parts of a product that can&apos;t break: checkout, subscriptions, video and chat. In React,
            Next.js and TypeScript, for 30K+ people.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Magnetic>
              <a href="#work" className="block bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-signal">
                See the work
              </a>
            </Magnetic>
            <a href={PERSONAL_INFO.resumeUrl} download className="link text-sm font-medium">
              Download résumé
            </a>
          </div>
        </div>

        <p className="label text-mute md:col-span-2 md:text-right">
          Scroll
          <span className="scroll-cue ml-3 inline-block">↓</span>
        </p>
      </div>
    </section>
  );
}

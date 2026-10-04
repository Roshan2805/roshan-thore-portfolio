import { PERSONAL_INFO } from "@/data/portfolioData";
import { JourneyLine } from "./JourneyLine";
import { KineticName } from "./KineticName";
import { Magnetic } from "./Magnetic";
import { MumbaiTime } from "./MumbaiTime";
import { ReplayJourney } from "./ReplayJourney";
import { RotatingLine } from "./RotatingLine";

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-20 sm:px-10">
      <div aria-hidden="true" className="ledger absolute inset-0 -z-10" />

      <p className="label reveal flex justify-between text-mute">
        <span>
          Portfolio<span className="max-sm:hidden"> of a frontend engineer</span>
        </span>
        <span>
          Mumbai · <MumbaiTime />
        </span>
      </p>

      <div className="flex flex-1 flex-col justify-center gap-[4vh] py-8">
        <KineticName />
        <JourneyLine />
      </div>

      <div className="reveal grid items-end gap-x-8 gap-y-6 [animation-delay:250ms] md:grid-cols-12">
        <h2 className="font-display text-[clamp(2.4rem,5vw,4.6rem)] italic leading-none tracking-[-0.03em] text-signal md:col-span-5">
          Frontend Engineer
        </h2>

        <div className="md:col-span-4 md:col-start-6">
          <RotatingLine />
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-3 md:justify-end">
          <Magnetic>
            <a href="#work" className="block bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-signal">
              See my work ↓
            </a>
          </Magnetic>
          <a href={PERSONAL_INFO.resumeUrl} download className="link text-sm font-medium">
            Résumé
          </a>
          <ReplayJourney className="label cursor-pointer text-mute transition-colors hover:text-signal">↗ Replay story</ReplayJourney>
        </div>
      </div>
    </section>
  );
}

import { PERSONAL_INFO } from "@/data/portfolioData";
import { KineticName } from "./KineticName";
import { Magnetic } from "./Magnetic";
import { RotatingLine } from "./RotatingLine";

export function Hero() {
  return (
    <section id="top" className="flex min-h-[100svh] flex-col px-5 pb-8 pt-24 sm:px-10">
      <p className="label reveal flex justify-between text-mute">
        <span>Frontend engineer · {PERSONAL_INFO.company}, Mumbai</span>
        <span className="max-sm:hidden">3.5 years, 3 products, 1 commerce degree</span>
      </p>

      <div className="flex flex-1 items-center justify-center py-10">
        <KineticName />
      </div>

      <div className="reveal grid items-end gap-8 [animation-delay:300ms] md:grid-cols-12">
        <div className="md:col-span-7">
          <RotatingLine />
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-4 md:col-start-9 md:justify-end">
          <Magnetic>
            <a href="#story" className="block bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-signal">
              How I got here
            </a>
          </Magnetic>
          <a href="#work" className="link text-sm font-medium">
            Skip to the work
          </a>
        </div>
      </div>
    </section>
  );
}

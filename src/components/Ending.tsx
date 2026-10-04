import { KidsComputer } from "./KidsComputer";

// The computer from the start of the story, showing something I built this time.
export function Ending() {
  return (
    <section className="mx-auto grid max-w-[96rem] items-center gap-12 px-5 py-28 sm:px-10 sm:py-44 md:grid-cols-12">
      <div className="md:col-span-4 md:col-start-2">
        <KidsComputer now />
      </div>
      <div className="md:col-span-5 md:col-start-7">
        <p className="on-view font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.02] tracking-[-0.035em]">
          I still like computers.
        </p>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-mute">
          The difference is that now I know what&apos;s behind the screen, and I get to build some of it.
        </p>
      </div>
    </section>
  );
}

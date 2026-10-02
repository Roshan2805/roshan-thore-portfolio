import { ReplayJourney } from "./ReplayJourney";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[84rem] px-5 pt-28 sm:px-10 sm:pt-44">
      <p className="label text-mute">About</p>

      <p className="mt-8 max-w-5xl font-display text-[clamp(2rem,5.2vw,4.4rem)] leading-[1.04] tracking-[-0.03em]">
        I didn&apos;t take the straight road into software. <em className="text-signal">I took commerce.</em>
      </p>

      <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12">
        <div className="space-y-5 text-lg leading-relaxed md:col-span-5 md:col-start-3">
          <p>
            I wanted to be a developer early, and chose Science in 12th for it. Then I scored 52%, took B.Com, and
            started thinking about banking. During lockdown a friend showed me programming. I got curious and kept
            going.
          </p>
          <p>
            A seven-month full-stack course in Pune led to an internship at Ink In Caps in January 2023, and the
            internship became a job.
          </p>
        </div>

        <div className="space-y-5 text-lg leading-relaxed md:col-span-4">
          <p>
            Since then I&apos;ve worked on three production products for KNKY: the platform itself, its admin console
            and its agency portal. Today I own the payments and subscription module, review pull requests and mentor
            two junior developers.
          </p>
          <p className="border-l border-signal pl-4 text-base text-mute">
            The commerce degree wasn&apos;t wasted. I build the screens money moves through.
          </p>
          <ReplayJourney className="link cursor-pointer text-sm font-medium">Watch the 30-second version</ReplayJourney>
        </div>
      </div>
    </section>
  );
}

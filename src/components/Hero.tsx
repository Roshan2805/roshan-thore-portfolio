import { PERSONAL_INFO } from "@/data/portfolioData";
import { JourneyLine } from "./JourneyLine";
import { KineticName } from "./KineticName";
import { Magnetic } from "./Magnetic";
import { MumbaiTime } from "./MumbaiTime";
import { ReplayJourney } from "./ReplayJourney";
import { RotatingLine } from "./RotatingLine";

const contents = [
  { no: "01", label: "The story", href: "#story" },
  { no: "02", label: "Work", href: "#work" },
  { no: "03", label: "Experience", href: "#experience" },
  { no: "04", label: "Skills", href: "#skills" },
  { no: "05", label: "How I work", href: "#about" },
  { no: "06", label: "Contact", href: "#contact" }
];

// The first screen is set like a magazine cover: a masthead line, the name edge to edge
// with the role locked against it, and the contents underneath.
export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-5 pb-6 pt-20 sm:px-10">
      <div aria-hidden="true" className="ledger absolute inset-0 -z-10" />

      <div className="label reveal grid grid-cols-2 gap-4 border-b border-ink pb-3 md:grid-cols-4">
        <span>Portfolio · 2026</span>
        <span className="max-md:hidden">Frontend engineering</span>
        <span className="max-md:hidden">{PERSONAL_INFO.company}</span>
        <span className="text-right">
          Mumbai · <MumbaiTime />
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center py-6">
        <KineticName />
        <h2 className="reveal -mt-[0.06em] self-end pr-[1vw] font-display text-[clamp(2rem,6.4vw,6.6rem)] italic leading-none tracking-[-0.04em] text-signal [animation-delay:200ms]">
          Frontend Engineer
        </h2>
        <div className="mt-[3vh]">
          <JourneyLine />
        </div>
      </div>

      <div className="reveal grid items-end gap-x-8 gap-y-8 [animation-delay:350ms] md:grid-cols-12">
        <div className="md:col-span-5">
          <RotatingLine />
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
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

        <nav aria-label="Contents" className="max-md:hidden md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
          <p className="label border-b border-ink pb-2 text-mute">Contents</p>
          <div className="grid grid-cols-2 gap-x-8">
            {contents.map((item) => (
              <a
                key={item.no}
                href={item.href}
                className="group flex items-baseline gap-3 border-b border-rule py-1.5 transition-colors hover:text-signal"
              >
                <span className="font-mono text-xs text-signal">{item.no}</span>
                <span className="whitespace-nowrap font-display text-lg tracking-tight transition-transform duration-300 group-hover:translate-x-1.5">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
}

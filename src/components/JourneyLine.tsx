import { TIMELINE } from "@/data/portfolioData";

const { start, end } = TIMELINE;
const marks = [
  { at: 2019.5, label: "B.Com" },
  { at: 2020.3, label: "Curious" },
  { at: 2022.6, label: "Learning" },
  { at: 2023.0, label: "First job" },
  { at: 2024.6, label: "Owning it" },
  { at: 2026.8, label: "Now" }
];
const x = (year: number) => `${((year - start) / (end - start)) * 100}%`;

// The path in one line, under the name. The particles from the intro land on it.
export function JourneyLine() {
  return (
    <a href="#story" data-hero-line aria-label="Read how I got here" className="group relative block h-12">
      <span className="hero-line absolute inset-x-0 top-0 block h-px origin-left bg-ink" />
      {marks.map((mark, i) => (
        <span
          key={mark.label}
          className="hero-mark absolute top-0"
          style={{ left: x(mark.at), animationDelay: `${900 + i * 140}ms` }}
        >
          <span
            className={`absolute -top-[4px] block size-[9px] -translate-x-1/2 rounded-full border transition-transform duration-300 group-hover:scale-125 ${
              i === marks.length - 1 ? "border-signal bg-signal" : "border-ink bg-paper"
            }`}
          />
          <span
            className={`label absolute whitespace-nowrap transition-colors duration-300 ${i % 2 && i < marks.length - 1 ? "bottom-3" : "top-4"} ${
              i === marks.length - 1
                ? "right-0 translate-x-1 text-signal"
                : i === 0
                  ? "left-0 -translate-x-1 text-mute group-hover:text-ink"
                  : "-translate-x-1/2 text-mute group-hover:text-ink"
            } ${i > 0 && i < marks.length - 1 ? "max-sm:hidden" : ""}`}
          >
            {mark.label}
          </span>
        </span>
      ))}
    </a>
  );
}

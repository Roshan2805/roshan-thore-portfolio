"use client";

import { useEffect, useRef, useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { playJourney } from "@/lib/journey";

const links = [
  { id: "story", label: "Story" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience & education" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "How I work" },
  { id: "contact", label: "Contact" }
];

// What the nav is sitting on right now. Sections mark themselves with data-tone;
// anything unmarked is paper.
function toneAt(x: number, y: number) {
  for (const el of document.elementsFromPoint(x, y)) {
    const marked = el.closest<HTMLElement>("[data-tone]");
    if (marked) return marked.dataset.tone === "paper" ? "paper" : "dark";
  }
  return "paper";
}

export function Nav() {
  const [past, setPast] = useState(false);
  const [current, setCurrent] = useState("");
  const [tone, setTone] = useState("paper");
  const [railTone, setRailTone] = useState("paper");
  const [open, setOpen] = useState(false);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleY(${max > 0 ? window.scrollY / max : 0})`;
      setPast(window.scrollY > window.innerHeight * 0.5);
      const line = window.innerHeight * 0.4;
      let inView = "";
      links.forEach(({ id }) => {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line) inView = id;
      });
      setCurrent(inView);
      setTone(toneAt(8, 28));
      setRailTone(toneAt(8, window.innerHeight - 40));
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // The story stage changes tone without the page moving, so watch for that too.
    const observer = new MutationObserver(schedule);
    document.querySelectorAll("[data-tone]").forEach((el) => observer.observe(el, { attributes: true, attributeFilter: ["data-tone"] }));
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  const index = links.findIndex(({ id }) => id === current);

  return (
    <>
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${tone === "paper" ? "text-ink" : "text-paper"}`}
      >
        <div className="label flex h-14 items-center justify-between px-5 sm:px-10">
          <a
            href="#top"
            className={`pointer-events-auto font-medium tracking-[0.2em] transition-opacity duration-500 ${past ? "" : "opacity-0"}`}
          >
            Roshan Thore
          </a>

          <nav aria-label="Sections" className="pointer-events-auto hidden items-center gap-6 lg:flex">
            {links.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={current === id ? "true" : undefined}
                className={`transition-opacity hover:opacity-100 ${current === id ? "opacity-100 underline underline-offset-[6px]" : "opacity-60"}`}
              >
                {label}
              </a>
            ))}
            <button
              type="button"
              onClick={playJourney}
              className="cursor-pointer uppercase tracking-[inherit] opacity-60 transition-opacity hover:opacity-100"
            >
              ↗ Replay story
            </button>
            <a href={PERSONAL_INFO.resumeUrl} download>
              Résumé ↓
            </a>
          </nav>

          <button
            type="button"
            className="pointer-events-auto uppercase tracking-[inherit] lg:hidden"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      {/* The ledger's margin line, carried down the whole page: how far you are, and where. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed bottom-0 left-[1.4rem] top-0 z-40 w-px transition-colors duration-300 max-lg:hidden ${
          railTone === "paper" ? "text-ink" : "text-paper"
        }`}
      >
        <span className="absolute inset-0 bg-current opacity-15" />
        <span ref={progress} className="absolute inset-0 origin-top scale-y-0 bg-signal" />
        <span
          className={`label absolute bottom-6 left-0 whitespace-nowrap transition-opacity duration-300 ${
            index < 0 ? "opacity-0" : "opacity-70"
          }`}
          style={{ transform: "translateX(-0.45rem) rotate(-90deg)", transformOrigin: "bottom left" }}
        >
          {index >= 0 && `${String(index + 1).padStart(2, "0")} — ${links[index].label}`}
        </span>
      </div>

      {open && (
        <div data-lenis-prevent className="fixed inset-0 z-[60] flex flex-col bg-ink px-5 pb-8 pt-4 text-paper lg:hidden">
          <button type="button" className="label self-end py-3" onClick={() => setOpen(false)}>
            Close
          </button>
          <nav aria-label="Sections" className="mt-6 flex-1">
            {links.map(({ id, label }, i) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-paper/20 py-3 font-display text-3xl tracking-tight"
              >
                <span className="label text-paper/50">{String(i + 1).padStart(2, "0")}</span>
                {label}
              </a>
            ))}
          </nav>
          <div className="label flex justify-between">
            <button
              type="button"
              className="uppercase tracking-[inherit]"
              onClick={() => {
                setOpen(false);
                playJourney();
              }}
            >
              ↗ Replay story
            </button>
            <a href={PERSONAL_INFO.resumeUrl} download className="text-ember">
              Résumé ↓
            </a>
          </div>
        </div>
      )}
    </>
  );
}

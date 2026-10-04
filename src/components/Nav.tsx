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

export function Nav() {
  const [past, setPast] = useState(false);
  const [open, setOpen] = useState(false);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      setPast(window.scrollY > window.innerHeight * 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* White text with a difference blend, so it reads on the paper and the dark sections alike. */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
        <span ref={progress} className="block h-0.5 origin-left scale-x-0 bg-white" />
        <div className="label flex h-14 items-center justify-between px-5 sm:px-10">
          <a
            href="#top"
            className={`pointer-events-auto font-medium tracking-[0.2em] transition-opacity duration-500 ${past ? "" : "opacity-0"}`}
          >
            Roshan Thore
          </a>

          <nav aria-label="Sections" className="pointer-events-auto hidden items-center gap-6 lg:flex">
            {links.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className="opacity-70 transition-opacity hover:opacity-100">
                {label}
              </a>
            ))}
            <button
              type="button"
              onClick={playJourney}
              className="cursor-pointer uppercase tracking-[inherit] opacity-70 transition-opacity hover:opacity-100"
            >
              ↗ Replay intro
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
              ↗ Replay intro
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

"use client";

import { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Magnetic } from "./Magnetic";
import { ReplayJourney } from "./ReplayJourney";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section id="contact" className="mt-28 bg-ink text-paper sm:mt-44">
      <div className="mx-auto max-w-[96rem] px-5 pb-8 pt-20 sm:px-10 sm:pt-32">
        <p className="label text-paper/60">
          Where this goes next
        </p>
        <p className="on-view mt-6 max-w-4xl font-display text-[clamp(1.8rem,4.2vw,3.4rem)] leading-[1.08] tracking-[-0.025em] text-paper/70">
          Toward larger systems, harder frontend problems and more technical ownership.
        </p>

        <h2 className="on-view mt-20 font-display text-[clamp(3rem,11vw,10rem)] leading-[0.88] tracking-[-0.045em] sm:mt-32">
          Let&apos;s build
          <br />
          <em className="text-ember">something.</em>
        </h2>

        <div className="mt-12 flex flex-wrap items-baseline gap-x-6 gap-y-3 sm:mt-16">
          <a href={`mailto:${PERSONAL_INFO.email}`} className="link break-all font-display text-2xl sm:text-4xl">
            {PERSONAL_INFO.email}
          </a>
          <button type="button" onClick={copyEmail} className="label cursor-pointer text-paper/60 hover:text-paper">
            <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
          <Magnetic>
            <a href={PERSONAL_INFO.resumeUrl} download className="block bg-paper px-6 py-3 font-medium text-ink transition-colors hover:bg-ember">
              Download résumé
            </a>
          </Magnetic>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="link">
            LinkedIn
          </a>
          <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="link">
            GitHub
          </a>
          <a href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, "")}`} className="link">
            {PERSONAL_INFO.phone}
          </a>
        </div>

        <footer className="label mt-24 flex flex-wrap justify-between gap-x-8 gap-y-3 border-t border-paper/20 pt-5 text-paper/70 sm:mt-36">
          <span>
            © {new Date().getFullYear()} Roshan Thore · {PERSONAL_INFO.location}
          </span>
          <ReplayJourney className="cursor-pointer uppercase tracking-[inherit] hover:text-ember">↗ Replay intro</ReplayJourney>
          <a href="#top">Back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}

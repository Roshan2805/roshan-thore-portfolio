"use client";

import { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
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
      <div className="mx-auto max-w-[84rem] px-5 pb-8 pt-20 sm:px-10 sm:pt-32">
        <p className="label opacity-60">Contact</p>
        <h2 className="mt-6 font-display text-[clamp(2.6rem,8vw,7rem)] leading-[0.92] tracking-[-0.04em]">
          Hiring a frontend engineer?
          <br />
          <em className="text-ember">Write to me.</em>
        </h2>

        <div className="mt-12 flex flex-wrap items-baseline gap-x-6 gap-y-3 sm:mt-16">
          <a href={`mailto:${PERSONAL_INFO.email}`} className="link break-all font-display text-2xl sm:text-4xl">
            {PERSONAL_INFO.email}
          </a>
          <button type="button" onClick={copyEmail} className="label cursor-pointer opacity-60 hover:opacity-100">
            <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="link">
            LinkedIn
          </a>
          <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="link">
            GitHub
          </a>
          <a href={PERSONAL_INFO.resumeUrl} download className="link">
            Résumé (PDF)
          </a>
          <a href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, "")}`} className="link">
            {PERSONAL_INFO.phone}
          </a>
        </div>

        <footer className="label mt-24 flex flex-wrap justify-between gap-x-8 gap-y-3 border-t border-paper/20 pt-5 opacity-70 sm:mt-36">
          <span>© {new Date().getFullYear()} Roshan Thore · {PERSONAL_INFO.location}</span>
          <ReplayJourney className="cursor-pointer uppercase tracking-[inherit] hover:text-ember">
            ▶ Replay my journey
          </ReplayJourney>
          <a href="#overview">Back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}

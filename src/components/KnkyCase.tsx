"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useMotionState } from "@/lib/useMotionState";
import { PROJECTS } from "@/data/portfolioData";
import { useDesktop } from "@/lib/useDesktop";
import { StoriesPreview } from "./previews/StoriesPreview";
import { CheckoutPreview } from "./previews/CheckoutPreview";
import { Flow } from "./Flow";

const knky = PROJECTS[0];
const parts = ["KNKY", "Stories", "Checkout", "Result"];

export function KnkyCase() {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // The panel opens from a small window to the full screen, then its contents change.
  const vertical = useTransform(scrollYProgress, [0, 0.16], [24, 0]);
  const horizontal = useTransform(scrollYProgress, [0, 0.16], [30, 0]);
  const clipPath = useMotionTemplate`inset(${vertical}% ${horizontal}%)`;

  const part = useMotionState(scrollYProgress, (value) => (value < 0.24 ? 0 : value < 0.5 ? 1 : value < 0.76 ? 2 : 3));

  const layer = (i: number) =>
    `flex flex-col justify-center px-5 py-16 transition-all duration-500 sm:px-10 md:absolute md:inset-0 md:py-20 ${
      part === i ? "" : "md:pointer-events-none md:translate-y-6 md:opacity-0"
    }`;

  return (
    <div id="work" ref={ref} className="md:h-[440vh]">
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden">
        <p className="label absolute left-10 top-20 text-mute max-md:hidden">What I&apos;ve built · case 01</p>

        <motion.article style={desktop ? { clipPath } : undefined} className="relative bg-ink text-paper md:h-full">
          <div className={layer(0)}>
            <p className="label flex flex-wrap justify-between gap-x-6 gap-y-1 text-paper/50">
              <span>Case 01 · {knky.kind}</span>
              <span>
                {knky.period} · {knky.status}
              </span>
            </p>
            <h2 className="mt-6 font-display text-[clamp(5rem,24vw,22rem)] leading-[0.8] tracking-[-0.06em] md:text-center">
              {knky.title}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-12">
              <p className="font-display text-2xl italic text-ember md:col-span-4">
                Built for real users.
                <span className="label mt-2 block not-italic text-paper/50">{knky.role}</span>
              </p>
              <p className="max-w-xl text-lg leading-relaxed text-paper/80 md:col-span-6 md:col-start-7">{knky.problem}</p>
            </div>
          </div>

          <div className={layer(1)}>
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
              <div className="md:col-span-4 md:col-start-2" data-cursor="Tap">
                <StoriesPreview />
              </div>
              <div className="md:col-span-5 md:col-start-7">
                <p className="label text-ember">What I built · 1</p>
                <h3 className="mt-4 font-display text-5xl tracking-tight sm:text-7xl">Stories</h3>
                <div className="mt-6">
                  <Flow steps={["Create", "Publish", "View", "Seen", "Unlock"]} />
                </div>
                <p className="mt-6 text-lg leading-relaxed text-paper/80">
                  The first thing I built in React. Cube navigation between creators, a lower bitrate on slow
                  connections, seen state, and premium stories that stay locked until you subscribe. 20K+ are posted a
                  month.
                </p>
                <p className="label mt-6 text-paper/50">← Tap it, hold it, unlock it</p>
              </div>
            </div>
          </div>

          <div className={layer(2)}>
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <p className="label text-ember">What I built · 2</p>
                <h3 className="mt-4 font-display text-5xl tracking-tight sm:text-7xl">Checkout &amp; subscriptions</h3>
                <div className="mt-6">
                  <Flow steps={["Create plan", "Set price", "Subscribe", "Pay", "Active"]} />
                </div>
                <p className="mt-6 text-lg leading-relaxed text-paper/80">
                  The part I own. Four payment methods, saved cards, guest checkout, and a clear next step when a bank
                  says no. Then everything after: upgrades, downgrades, trials and lifetime plans.
                </p>
                <p className="label mt-6 text-paper/50">Try a payment, then make the bank decline it →</p>
              </div>
              <div className="md:col-span-5 md:col-start-8" data-cursor="Try it">
                <CheckoutPreview />
              </div>
            </div>
          </div>

          <div className={layer(3)}>
            <p className="label text-ember">What that adds up to, every month</p>
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
              {knky.results.map((result) => (
                <div key={result.label} className="border-t border-paper/30 pt-4">
                  <dd className="font-display text-5xl tracking-tight tabular-nums sm:text-7xl">{result.value}</dd>
                  <dt className="mt-2 text-sm text-paper/60">{result.label}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-12 grid gap-8 md:grid-cols-12">
              <p className="text-lg leading-relaxed text-paper/80 md:col-span-6">{knky.contribution}</p>
              <p className="font-mono text-xs leading-relaxed text-paper/50 md:col-span-5 md:col-start-8">
                {knky.stack.join(" / ")}
              </p>
            </div>
          </div>

          <ol className="label absolute bottom-6 left-10 flex gap-6 max-md:hidden">
            {parts.map((name, i) => (
              <li key={name} className={`transition-colors duration-300 ${part === i ? "text-paper" : "text-paper/30"}`}>
                {name}
              </li>
            ))}
          </ol>
        </motion.article>
      </div>
    </div>
  );
}

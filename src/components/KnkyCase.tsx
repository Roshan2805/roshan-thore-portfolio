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
const parts = ["KNKY", "Checkout", "Subscriptions", "Stories & media", "Also built"];
const starts = [0, 0.2, 0.38, 0.56, 0.76];

const checkoutStates = [
  ["Paid", "the subscription or purchase goes live"],
  ["Declined", "a clear message and a way to try again"],
  ["Cancelled", "the buyer backs out and nothing is charged"],
  ["Guest", "pay without making an account first"]
];

const plans = [
  ["Trials", "start free, convert later"],
  ["Upgrades and downgrades", "moving between plans"],
  ["Lifetime tiers", "pay once"],
  ["Retention offers", "shown before someone cancels"]
];

const media = [
  ["HLS adaptive bitrate", "drops quality on a slow connection instead of stalling"],
  ["Gesture carousel", "a 3D cube between creators, with seen state"],
  ["Resumable uploads", "large files to S3 with Uppy and tus"],
  ["Virtualized vault", "thousands of items, only the visible ones in the DOM"]
];

const alsoBuilt = [
  ["Live rooms", "Video and audio rooms with LiveKit."],
  ["Chat", "Real-time chat over Socket.IO and XMPP, with Firebase push notifications."],
  ["Sign-in", "Two-factor authentication over OTP, silent token renewal, encrypted API payloads."],
  ["Performance", "hls.js loads only where video plays, Firebase starts lazily, long lists are virtualized."]
];

function Pairs({ rows, accent = false }: { rows: string[][]; accent?: boolean }) {
  return (
    <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
      {rows.map(([title, text]) => (
        <div key={title} className="border-t border-paper/20 pt-3">
          <dt className={`font-medium ${accent ? "text-ember" : ""}`}>{title}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-paper/60">{text}</dd>
        </div>
      ))}
    </dl>
  );
}

export function KnkyCase() {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // The panel opens from a small window to the full screen, then its contents change.
  const vertical = useTransform(scrollYProgress, [0, 0.12], [24, 0]);
  const horizontal = useTransform(scrollYProgress, [0, 0.12], [30, 0]);
  const clipPath = useMotionTemplate`inset(${vertical}% ${horizontal}%)`;

  const part = useMotionState(scrollYProgress, (value) => starts.filter((start) => value >= start).length - 1);

  const layer = (i: number) =>
    `flex flex-col justify-center px-5 py-16 transition-all duration-500 sm:px-10 md:absolute md:inset-0 md:py-20 ${
      part === i ? "" : "md:pointer-events-none md:translate-y-6 md:opacity-0"
    }`;

  return (
    <div id="work" ref={ref} className="md:h-[560vh]">
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden">
        <p className="absolute left-10 top-16 flex items-baseline gap-4 max-md:hidden">
          <span className="font-display text-6xl leading-[0.8] tracking-[-0.05em] text-signal">02</span>
          <span className="label">Work · what I&apos;ve built</span>
        </p>

        <motion.article data-tone="ink" style={desktop ? { clipPath } : undefined} className="relative bg-ink text-paper md:h-full">
          <div className={layer(0)}>
            <p className="label flex flex-wrap justify-between gap-x-6 gap-y-1 text-paper/50">
              <span>Case 01 · {knky.kind}</span>
              <span>
                {knky.period} · {knky.status}
              </span>
            </p>
            <h2 className="mt-6 font-display text-[clamp(5rem,17vw,15rem)] leading-[0.8] tracking-[-0.06em] md:text-center">
              {knky.title}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-12">
              <p className="font-display text-2xl italic text-ember md:col-span-4">
                Built for real users.
                <span className="label mt-2 block not-italic text-paper/50">{knky.role}</span>
              </p>
              <p className="max-w-xl text-lg leading-relaxed text-paper/80 md:col-span-6 md:col-start-7">{knky.problem}</p>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
              {knky.results.map((result) => (
                <div key={result.label} className="border-t border-paper/30 pt-3">
                  <dd className="font-display text-5xl leading-none tracking-[-0.04em] tabular-nums sm:text-7xl">{result.value}</dd>
                  <dt className="mt-1 text-sm text-paper/60">{result.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className={layer(1)}>
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
              <div className="md:col-span-6">
                <p className="label text-ember">What I own · 1</p>
                <h3 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">Checkout</h3>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-paper/80">
                  One checkout for every way creators earn, with four payment methods: tokenized cards, iDEAL, Bancontact
                  and Centrobill. The hard part is every way a payment can end.
                </p>
                <div className="mt-8">
                  <Pairs rows={checkoutStates} accent />
                </div>
              </div>
              <div className="md:col-span-5 md:col-start-8" data-cursor="Try it">
                <CheckoutPreview />
                <p className="label mt-4 text-paper/40">Portfolio demo · no real payments</p>
              </div>
            </div>
          </div>

          <div className={layer(2)}>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <p className="label text-ember">What I own · 2</p>
                <h3 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">Subscriptions</h3>
                <p className="mt-5 text-lg leading-relaxed text-paper/80">
                  More than a subscribe button. A plan has to handle trials, changes, and people who are about to leave.
                </p>
                <div className="mt-8">
                  <Flow steps={["Plan", "Checkout", "Payment", "Active", "Upgrade / downgrade"]} />
                </div>
                <p className="mt-8 font-display text-5xl tracking-tight tabular-nums">9.5K+</p>
                <p className="text-sm text-paper/60">subscription payments a month</p>
              </div>
              <div className="self-center md:col-span-6 md:col-start-7">
                <Pairs rows={plans} />
                <p className="mt-6 border-t border-paper/20 pt-3 text-sm text-paper/60">
                  Plus the money around it: wallet, tipping and revenue splits.
                </p>
              </div>
            </div>
          </div>

          <div className={layer(3)}>
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
              <div className="md:col-span-4 md:col-start-1" data-cursor="Tap">
                <StoriesPreview />
                <p className="label mt-4 text-center text-paper/40">Portfolio demo · tap, hold, unlock</p>
              </div>
              <div className="md:col-span-7 md:col-start-6">
                <p className="label text-ember">What I built · 3</p>
                <h3 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">Stories &amp; Media Vault</h3>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/80">
                  The first thing I built in React. Not just a feed: video playback, uploads, gestures and very long lists,
                  all on phones. <span className="text-paper">20K+ stories are posted a month.</span>
                </p>
                <div className="mt-8">
                  <Pairs rows={media} />
                </div>
              </div>
            </div>
          </div>

          <div className={layer(4)}>
            <p className="label text-ember">Also built on KNKY</p>
            <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-4">
              {alsoBuilt.map(([title, text]) => (
                <div key={title} className="border-t border-paper/30 pt-4">
                  <h3 className="font-display text-3xl tracking-tight">{title}</h3>
                  <p className="mt-3 leading-relaxed text-paper/70">{text}</p>
                </div>
              ))}
            </div>
            <p className="mt-12 max-w-3xl text-paper/70">
              And the product around them: Channels, Collabs, the creator Shop, Services, seasonal campaigns with their own
              pricing, and offline support as a PWA.
            </p>
            <p className="mt-6 font-mono text-xs leading-relaxed text-paper/50">{knky.stack.join(" / ")}</p>
            <a href="#details" className="link mt-8 self-start text-sm">
              Every detail, and what was hard ↓
            </a>
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

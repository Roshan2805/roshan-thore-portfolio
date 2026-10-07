"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useJourneyPlaying } from "@/lib/journey";

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const playing = useJourneyPlaying();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({ autoRaf: true, lerp: 0.11 });
    lenis.current = instance;

    // Links to a section glide there, taking longer the further away it is.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const target = link && document.querySelector<HTMLElement>(link.getAttribute("href")!);
      if (!target) return;
      e.preventDefault();
      const distance = Math.abs(target.getBoundingClientRect().top);
      instance.scrollTo(target, {
        duration: Math.min(2.4, Math.max(1, distance / 4000)),
        easing: easeInOut
      });
      history.replaceState(null, "", link.hash);
    };
    document.addEventListener("click", onClick);

    // Keyboard scrolling goes through the same scroller. Left to the browser, a key pressed
    // while a wheel scroll is still settling gets overwritten and appears to do nothing.
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || instance.isStopped) return;
      if (el.closest("input, textarea, select, button, a, summary, [contenteditable], [data-lenis-prevent]")) return;
      const page = window.innerHeight * 0.85;
      const moves: Record<string, number> = {
        ArrowDown: 80,
        ArrowUp: -80,
        PageDown: page,
        PageUp: -page,
        " ": e.shiftKey ? -page : page,
        Home: -Infinity,
        End: Infinity
      };
      const by = moves[e.key];
      if (by === undefined) return;
      e.preventDefault();
      instance.scrollTo(Math.min(Math.max(instance.targetScroll + by, 0), instance.limit));
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  useEffect(() => {
    if (playing) lenis.current?.stop();
    else lenis.current?.start();
  }, [playing]);

  return null;
}

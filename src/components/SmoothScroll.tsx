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

    return () => {
      document.removeEventListener("click", onClick);
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

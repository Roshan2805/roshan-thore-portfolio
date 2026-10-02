"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useJourneyPlaying } from "@/lib/journey";

export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const playing = useJourneyPlaying();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis.current = new Lenis({ autoRaf: true, anchors: true, lerp: 0.11 });
    return () => {
      lenis.current?.destroy();
      lenis.current = null;
    };
  }, []);

  useEffect(() => {
    if (playing) lenis.current?.stop();
    else lenis.current?.start();
  }, [playing]);

  return null;
}

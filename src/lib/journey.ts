import { useSyncExternalStore } from "react";
import { INTRO_KEY } from "./introKey";

const listeners = new Set<() => void>();
let playing: boolean | undefined;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// The inline script in layout.tsx adds this class on a first visit, before paint.
function isPlaying() {
  if (playing === undefined) {
    playing = document.documentElement.classList.contains("intro-pending");
  }
  return playing;
}

function setPlaying(next: boolean) {
  playing = next;
  listeners.forEach((listener) => listener());
}

export function playJourney() {
  setPlaying(true);
}

export function markJourneySeen() {
  try {
    localStorage.setItem(INTRO_KEY, "1");
  } catch {}
  document.documentElement.classList.remove("intro-pending");
}

export function endJourney() {
  setPlaying(false);
}

export function useJourneyPlaying() {
  return useSyncExternalStore(subscribe, isPlaying, () => false);
}

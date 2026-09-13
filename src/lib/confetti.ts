import type confetti from "canvas-confetti";

const COLORS = ["#6366f1", "#06b6d4", "#10b981", "#ec4899"];

// canvas-confetti is only needed after a click, so keep it out of the initial bundle.
export async function fireConfetti(options: confetti.Options = {}) {
  const { default: launch } = await import("canvas-confetti");
  launch({ colors: COLORS, disableForReducedMotion: true, ...options });
}

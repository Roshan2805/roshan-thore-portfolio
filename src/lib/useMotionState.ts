import { useSyncExternalStore } from "react";
import type { MotionValue } from "framer-motion";

// React state derived from a motion value. It reads the value on every render,
// so it's right on mount, after a refresh mid-page, and after jumping to a section,
// not only after the next change event.
export function useMotionState<T>(value: MotionValue<number>, map: (latest: number) => T): T {
  return useSyncExternalStore(
    (onChange) => value.on("change", onChange),
    () => map(value.get()),
    () => map(0)
  );
}

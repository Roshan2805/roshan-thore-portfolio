import { useSyncExternalStore } from "react";

const query = "(min-width: 768px)";

function subscribe(listener: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

// The pinned, scroll-driven layouts are desktop only. Phones get the same content stacked.
export function useDesktop() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

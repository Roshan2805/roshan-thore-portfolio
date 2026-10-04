import { useEffect, useRef, useState } from "react";

// Which [data-index] child is closest to the middle of the screen, worked out from the
// scroll position itself so it's right after a jump, a refresh or a nav link.
export function useCenteredIndex<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      const items = ref.current?.querySelectorAll<HTMLElement>("[data-index]") ?? [];
      const middle = window.innerHeight / 2;
      let best = 0;
      let bestDistance = Infinity;
      items.forEach((item, i) => {
        const box = item.getBoundingClientRect();
        const distance = Math.abs(box.top + box.height / 2 - middle);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      setActive(best);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return { ref, active };
}

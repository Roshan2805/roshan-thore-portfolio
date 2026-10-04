"use client";

import { useEffect, useRef, useState } from "react";

// A product flow, one step lit at a time while it's on screen.
export function Flow({ steps, tone = "dark" }: { steps: string[]; tone?: "dark" | "light" }) {
  const ref = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setActive((active + 1) % steps.length), 1300);
    return () => clearTimeout(timer);
  }, [active, visible, steps.length]);

  const on = tone === "dark" ? "text-paper" : "text-ink";
  const off = tone === "dark" ? "text-paper/30" : "text-mute/50";

  return (
    <ol ref={ref} className="label flex flex-wrap items-center gap-x-2 gap-y-2" aria-label="Flow">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          {i > 0 && <span className={i <= active ? "text-ember" : off}>→</span>}
          <span className={`transition-colors duration-500 ${i <= active ? on : off} ${i === active ? "underline decoration-ember underline-offset-4" : ""}`}>
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}

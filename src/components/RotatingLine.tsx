"use client";

import { useEffect, useState } from "react";

const things = [
  "the checkout people pay through.",
  "the stories they tap through.",
  "the console a finance team runs on.",
  "screens that still work on a slow phone."
];

export function RotatingLine() {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (held) return;
    const timer = setTimeout(() => setIndex((index + 1) % things.length), 2600);
    return () => clearTimeout(timer);
  }, [index, held]);

  return (
    <p
      className="font-display text-[clamp(1.6rem,3.2vw,2.8rem)] leading-[1.1] tracking-[-0.02em]"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
    >
      I build
      <button
        type="button"
        aria-live="polite"
        onClick={() => setIndex((index + 1) % things.length)}
        className="relative block h-[2.3em] w-full sm:h-[1.15em] cursor-pointer overflow-hidden text-left text-signal italic"
      >
        {things.map((thing, i) => (
          <span
            key={thing}
            aria-hidden={i !== index}
            className={`absolute inset-x-0 top-0 transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] sm:whitespace-nowrap ${
              i === index ? "translate-y-0 opacity-100" : i === (index + things.length - 1) % things.length ? "-translate-y-full opacity-0" : "translate-y-full opacity-0"
            }`}
          >
            {thing}
          </span>
        ))}
      </button>
    </p>
  );
}

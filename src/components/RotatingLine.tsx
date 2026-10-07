"use client";

import { useEffect, useState } from "react";

const things = [
  "the checkout people pay through.",
  "the stories people tap through.",
  "the tools a team runs its product on.",
  "interfaces that still work when the connection doesn't."
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
    <p className="text-lg leading-snug sm:text-2xl" onPointerEnter={() => setHeld(true)} onPointerLeave={() => setHeld(false)}>
      I build
      <button
        type="button"
        aria-live="polite"
        onClick={() => setIndex((index + 1) % things.length)}
        className="relative block h-[2.5em] w-full cursor-pointer overflow-hidden text-left font-display text-[1.35em] italic leading-tight"
      >
        {things.map((thing, i) => (
          <span
            key={thing}
            aria-hidden={i !== index}
            className={`absolute inset-x-0 top-0 transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
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

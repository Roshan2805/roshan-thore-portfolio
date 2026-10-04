"use client";

import { useEffect, useRef, useState } from "react";

// A small dot that trails the pointer and opens up over things you can use.
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const target = { x: -100, y: -100 };
    const position = { x: -100, y: -100 };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const hint = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setLabel(hint?.dataset.cursor ?? "");
    };
    let frame = 0;
    const follow = () => {
      position.x += (target.x - position.x) * 0.2;
      position.y += (target.y - position.y) * 0.2;
      if (dot.current) dot.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
      frame = requestAnimationFrame(follow);
    };
    window.addEventListener("pointermove", onMove);
    frame = requestAnimationFrame(follow);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={dot} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[95] mix-blend-difference [@media(pointer:coarse)]:hidden motion-reduce:hidden">
      <span
        className={`label flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[10px] text-black transition-all duration-300 ${
          label ? "size-20" : "size-2.5"
        }`}
      >
        {label && <span>{label}</span>}
      </span>
    </div>
  );
}

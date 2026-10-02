"use client";

import { useRef } from "react";

export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const pull = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const box = el.getBoundingClientRect();
    const x = (e.clientX - box.left - box.width / 2) * 0.25;
    const y = (e.clientY - box.top - box.height / 2) * 0.35;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-300 ease-out ${className ?? ""}`}
      onPointerMove={pull}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </span>
  );
}

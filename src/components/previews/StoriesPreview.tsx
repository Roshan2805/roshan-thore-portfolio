"use client";

import { useEffect, useRef, useState } from "react";

const stories = [
  { title: "Tap right for the next story.", note: "Left goes back." },
  { title: "Hold to pause.", note: "The bar above stops with you." },
  { title: "Subscribers only.", note: "Premium stories stay locked until you subscribe.", locked: true },
  { title: "Seen.", note: "Every story you finish is tracked as seen." }
];

const STORY_MS = 4200;

export function StoriesPreview() {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const elapsed = useRef(0);

  const story = stories[index];
  const locked = story.locked && !unlocked;

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.6 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (held || !visible || locked) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += Math.min(now - last, 100);
      last = now;
      const progress = Math.min(elapsed.current / STORY_MS, 1);
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
      if (progress >= 1) {
        elapsed.current = 0;
        setIndex((index + 1) % stories.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, held, visible, locked]);

  const step = (by: number) => {
    elapsed.current = 0;
    setIndex((index + by + stories.length) % stories.length);
  };

  return (
    <div
      ref={frame}
      className="relative mx-auto aspect-[9/16] w-full max-w-[17rem] cursor-pointer select-none overflow-hidden border border-paper/25 bg-[#22211a]"
      onPointerDown={() => setHeld(true)}
      onPointerUp={() => setHeld(false)}
      onPointerLeave={() => setHeld(false)}
      onClick={(e) => {
        const box = e.currentTarget.getBoundingClientRect();
        step(e.clientX - box.left < box.width * 0.35 ? -1 : 1);
      }}
    >
      <div className="absolute inset-x-3 top-3 flex gap-1">
        {stories.map((item, i) => (
          <span key={item.title} className="h-0.5 flex-1 bg-paper/25">
            <span
              ref={i === index ? bar : undefined}
              className="block h-full origin-left bg-paper"
              style={{ transform: `scaleX(${i < index ? 1 : 0})` }}
            />
          </span>
        ))}
      </div>

      <div className="absolute inset-x-3 top-7 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-paper/60">
        <span className="size-5 rounded-full border border-ember" />
        creator · {held ? "paused" : `${index + 1} of ${stories.length}`}
      </div>

      <div key={index} className="story-in absolute inset-x-5 bottom-6">
        <p className={`font-display text-3xl leading-tight ${locked ? "blur-sm" : ""}`}>{story.title}</p>
        <p className="mt-2 text-sm text-paper/60">{story.note}</p>
        {locked && (
          <button
            type="button"
            className="mt-4 cursor-pointer bg-ember px-4 py-2 text-sm font-medium text-ink"
            onClick={(e) => {
              e.stopPropagation();
              setUnlocked(true);
            }}
          >
            Subscribe to unlock
          </button>
        )}
      </div>
    </div>
  );
}

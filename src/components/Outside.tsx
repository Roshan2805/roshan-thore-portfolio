"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from "framer-motion";
import { OUTSIDE } from "@/data/portfolioData";

// A slow band of the things I do away from work. Scrolling pushes it along faster.
export function Outside() {
  const offset = useMotionValue(0);
  const direction = useRef(1);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-2000, 0, 2000], [5, 0, 5], { clamp: false });
  const x = useTransform(offset, (value) => `${wrap(-50, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    if (velocity.get() < 0) direction.current = -1;
    else if (velocity.get() > 0) direction.current = 1;
    offset.set(offset.get() - direction.current * (delta / 1000) * (1.2 + Math.abs(boost.get())));
  });

  const row = [...OUTSIDE, ...OUTSIDE];

  return (
    <section aria-label="Outside the browser" className="mt-28 overflow-hidden bg-signal py-10 text-paper sm:mt-44 sm:py-14">
      <p className="label px-5 sm:px-10">Outside the browser</p>
      <motion.p style={{ x }} className="mt-4 flex w-max whitespace-nowrap font-display text-[clamp(3rem,9vw,8rem)] italic leading-none tracking-[-0.04em]">
        {[row, row].map((items, k) => (
          <span key={k} aria-hidden={k === 1} className="flex">
            {items.map((item, i) => (
              <span key={i} className="px-[0.35em]">
                {item}
                <span className="pl-[0.7em] not-italic opacity-50">·</span>
              </span>
            ))}
          </span>
        ))}
      </motion.p>
    </section>
  );
}

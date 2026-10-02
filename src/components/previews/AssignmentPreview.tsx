"use client";

import { useState } from "react";

const staff = [
  { name: "Staff A", y: 24, creators: [0, 1, 3] },
  { name: "Staff B", y: 70, creators: [1, 2, 3] },
  { name: "Staff C", y: 116, creators: [3, 4] }
];
const creators = [12, 41, 70, 99, 128];

export function AssignmentPreview() {
  const [active, setActive] = useState(1);

  return (
    <div className="font-mono text-[13px]">
      <div className="label flex justify-between text-paper/60">
        <span>Agency staff</span>
        <span>Creators</span>
      </div>

      <div className="mt-3 flex items-stretch gap-3">
        <div className="flex flex-col justify-between py-1">
          {staff.map((person, i) => (
            <button
              key={person.name}
              type="button"
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`cursor-pointer border px-2.5 py-1 text-left transition-colors ${
                active === i ? "border-paper bg-paper text-ink" : "border-paper/25"
              }`}
            >
              {person.name}
            </button>
          ))}
        </div>

        <svg viewBox="0 0 300 140" preserveAspectRatio="none" className="h-36 flex-1" aria-hidden="true">
          {staff.map((person, i) =>
            person.creators.map((creator) => (
              <line
                key={`${i}-${creator}`}
                x1="0"
                y1={person.y}
                x2="300"
                y2={creators[creator]}
                vectorEffect="non-scaling-stroke"
                className={`transition-all duration-300 ${active === i ? "stroke-ember" : "stroke-paper/20"}`}
                strokeWidth={active === i ? 1.5 : 1}
              />
            ))
          )}
        </svg>

        <div className="flex flex-col justify-between py-1">
          {creators.map((y, i) => (
            <span
              key={y}
              className={`size-3 rounded-full transition-colors duration-300 ${
                staff[active].creators.includes(i) ? "bg-ember" : "bg-paper/25"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="mt-4 border-t border-paper/15 pt-3 text-paper/50">
        {staff[active].name} is assigned {staff[active].creators.length} creators. Saving sends only what changed.
      </p>
    </div>
  );
}

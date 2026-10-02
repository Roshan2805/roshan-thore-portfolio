"use client";

import { playJourney } from "@/lib/journey";

export function ReplayJourney({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={playJourney} className={className}>
      {children}
    </button>
  );
}

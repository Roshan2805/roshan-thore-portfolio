import type { Metadata } from "next";
import { JourneyStory } from "@/components/JourneyStory";

export const metadata: Metadata = {
  title: "How I got here — Roshan Thore",
  description:
    "From a commerce degree and a banking plan to frontend engineering: how Roshan Thore learned to code in lockdown and ended up building payments and streaming for a platform with 30K+ users.",
  alternates: {
    canonical: "/journey"
  }
};

export default function JourneyPage() {
  return <JourneyStory />;
}

export type Shape = "tag" | "score" | "ring" | "code" | "window" | "users" | "bars" | "name";

export interface Milestone {
  label: string;
  title: string;
  body: string;
  shape: Shape;
  tone: "paper" | "screen";
  dots: string;
}

export const JOURNEY: Milestone[] = [
  {
    label: "Early ambition",
    title: "I wanted to build software before I knew how.",
    body: "So I chose Science in 12th.",
    shape: "tag",
    tone: "paper",
    dots: "#17160f"
  },
  {
    label: "Unexpected direction",
    title: "Then I scored 52%.",
    body: "I took B.Com instead, and started planning a career in banking.",
    shape: "score",
    tone: "paper",
    dots: "#6b675c"
  },
  {
    label: "Lockdown, 2020",
    title: "Everything stopped. A friend showed me programming.",
    body: "I got curious, and kept going.",
    shape: "ring",
    tone: "screen",
    dots: "#8a867c"
  },
  {
    label: "Learning to code, 2022",
    title: "HTML, CSS, JavaScript. Then React.",
    body: "Seven months of full-stack training to build the foundation properly.",
    shape: "code",
    tone: "screen",
    dots: "#f1eee6"
  },
  {
    label: "First job, 2023",
    title: "An internship became a full-time job.",
    body: "Ink In Caps, Mumbai. Real products, real deadlines.",
    shape: "window",
    tone: "screen",
    dots: "#f1eee6"
  },
  {
    label: "Real products",
    title: "Stories. Subscriptions. Payments.",
    body: "Built for KNKY with a small team, and used by 30K+ people.",
    shape: "users",
    tone: "screen",
    dots: "#ff7a4d"
  },
  {
    label: "Ownership",
    title: "From shipping features to owning the frontend.",
    body: "React, Next.js, TypeScript. Reviewing code and mentoring two juniors.",
    shape: "bars",
    tone: "screen",
    dots: "#ff7a4d"
  },
  {
    label: "Today",
    title: "Frontend engineer. Still building.",
    body: "Next: larger systems, and more technical ownership.",
    shape: "name",
    tone: "paper",
    dots: "#17160f"
  }
];

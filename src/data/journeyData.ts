export type Shape = "degree" | "tag" | "name";

export interface Beat {
  line: string;
  shape: Shape;
  tone: "paper" | "screen";
  dots: string;
}

export const BEATS: Beat[] = [
  { line: "I studied commerce.", shape: "degree", tone: "paper", dots: "#6b675c" },
  { line: "I write code for a living.", shape: "tag", tone: "screen", dots: "#ff7a4d" },
  { line: "This is how that happened.", shape: "name", tone: "paper", dots: "#17160f" }
];

export const CHAPTERS = ["Curious", "A different path", "Discovery", "Building", "Going deeper", "Today"];

export interface Chapter {
  chapter: number;
  label: string;
  title: string;
  facts?: string[];
  text: string;
}

export const EARLY: Chapter[] = [
  {
    chapter: 0,
    label: "As a kid",
    title: "I liked computers.",
    facts: ["Games", "Internet", "Exploring things"],
    text: "I knew I liked being around them. I didn't understand software engineering yet, or what the job actually involved."
  },
  {
    chapter: 1,
    label: "School and college",
    title: "My education went another way.",
    facts: ["12th · Science · 52%", "2019 – 2022 · B.Com"],
    text: "I chose Science because of computers. My result changed the direction of my education, and I went on to study B.Com. Computers stayed in the background."
  }
];

// The discovery is told on one stage: the same few lines of code become more and more real.
export const DISCOVERY = [
  { label: "", line: "I liked computers long before I understood how they worked." },
  { label: "Lockdown, 2020", line: "Then a friend introduced me to coding." },
  { label: "HTML", line: "First, structure." },
  { label: "CSS", line: "Then, how it looks." },
  { label: "JavaScript", line: "Then, what it does." },
  { label: "Angular · Node.js · MongoDB", line: "Then a whole application: a screen, a server and a database." },
  { label: "", line: "Then something real people use." },
  { label: "", line: "That was when the curiosity started making sense." }
];

export const LATER: Chapter[] = [
  {
    chapter: 3,
    label: "2023",
    title: "Learning turned into building.",
    facts: ["Intern → full-time", "Ink In Caps, Mumbai"],
    text: "A six-month course had taken me through the fundamentals properly. Then I joined Ink In Caps as an intern. My first task was an admin panel in a codebase I didn't understand yet, so I spent the first few days reading it. Seven months later it was a full-time job."
  },
  {
    chapter: 4,
    label: "Alongside the job",
    title: "I wanted to understand it more deeply.",
    facts: ["MCA · Sandip University", "Part-time · 2023 · CGPA 7.85"],
    text: "By then I was already working in software. I wanted to understand computers and software development beyond what day-to-day work teaches, so I took an MCA alongside my job."
  },
  {
    chapter: 5,
    label: "Today",
    title: "Now I'm a frontend engineer building real products.",
    facts: ["React", "Next.js", "TypeScript", "JavaScript"],
    text: "I learned React on the job by building Stories, and now I own payments and subscriptions on a product about 30,000 people use."
  }
];

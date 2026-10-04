export type Shape = "question" | "tag" | "name";

export interface Beat {
  line: string;
  shape: Shape;
  tone: "paper" | "screen";
  dots: string;
}

export const BEATS: Beat[] = [
  { line: "I liked computers before I knew how they worked.", shape: "question", tone: "paper", dots: "#6b675c" },
  { line: "Now I build software.", shape: "tag", tone: "screen", dots: "#ff7a4d" },
  { line: "This is how I got here.", shape: "name", tone: "paper", dots: "#17160f" }
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
    title: "I liked computers before I understood how they worked.",
    facts: ["Games", "Internet", "Exploring things"],
    text: "I spent a lot of time playing games and using the internet. I'd heard of software engineers and liked the idea of working with computers, but I didn't really understand what the job involved."
  },
  {
    chapter: 1,
    label: "School and college",
    title: "My education took a different direction.",
    facts: ["12th · Science · 52%", "B.Com · Aug 2019 – Aug 2022"],
    text: "I chose Science in 12th because I was interested in computers. After scoring 52%, I went on to study B.Com. My interest in computers was still there. I just hadn't found my way into software yet."
  }
];

export const FUNDAMENTALS = [
  { name: "HTML", role: "structure" },
  { name: "CSS", role: "appearance" },
  { name: "JavaScript", role: "behavior" }
];

export const LATER: Chapter[] = [
  {
    chapter: 3,
    label: "2023",
    title: "Then I started building real software.",
    facts: ["Ink In Caps, Mumbai", "Intern → full-time"],
    text: "I joined Ink In Caps as an intern. My first task was an admin panel in a production Angular codebase I didn't understand yet, so I spent the first few days reading it. Seven months later I was full-time."
  },
  {
    chapter: 4,
    label: "Alongside the job",
    title: "I wanted to understand it more deeply.",
    facts: ["MCA · Sandip University", "Part-time · 5 semesters", "Aug 2023 – Jun 2026 · CGPA 7.85"],
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

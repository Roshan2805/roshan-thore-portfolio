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

export interface StoryStep {
  label: string;
  title: string;
  note?: string;
}

export const CHAPTERS = ["Early on", "Education", "Discovery", "Going deeper", "Today"];

export const EARLY: (StoryStep & { chapter: number })[] = [
  {
    chapter: 0,
    label: "As a kid",
    title: "I was curious about computers.",
    note: "Games, the internet, just being around a computer. I'd heard of software engineers and liked the idea of working with computers. I didn't know what the job actually involved."
  },
  {
    chapter: 1,
    label: "12th",
    title: "My education took a different path.",
    note: "I chose Science in 12th because of that interest in computers. I scored 52%, and that changed where my education went next."
  },
  {
    chapter: 1,
    label: "2019 – 2022",
    title: "B.Com.",
    note: "Three years of commerce. I wasn't a programmer, and I didn't really know what software development was. Computers stayed in the background."
  }
];

export const DISCOVERY: StoryStep[] = [
  {
    label: "Lockdown, 2020",
    title: "Then a friend showed me some code.",
    note: "I tried Python from YouTube, mostly to see how it worked."
  },
  {
    label: "After B.Com, 2022",
    title: "So I learned it properly.",
    note: "A six-month software development course, starting from the fundamentals."
  },
  {
    label: "The course",
    title: "Then Angular, Node.js and MongoDB.",
    note: "A screen, a server and a database, talking to each other."
  },
  {
    label: "The course",
    title: "For the first time, I understood what was behind the websites I had always used."
  }
];

export const LATER: (StoryStep & { chapter: number })[] = [
  {
    chapter: 3,
    label: "2023",
    title: "I started working in software.",
    note: "An internship at Ink In Caps that became a job. My first task was an admin panel in a codebase I didn't understand, so for the first few days I mostly read it."
  },
  {
    chapter: 3,
    label: "2023 – 2026",
    title: "Alongside the job, I went back to studying.",
    note: "A part-time MCA at Sandip University, because I wanted to understand computers and software beyond what work was teaching me."
  },
  {
    chapter: 4,
    label: "Now",
    title: "I build software for a living.",
    note: "Frontend engineer, in React, Next.js and TypeScript. I learned React on the job by building Stories, for a product about 30,000 people use."
  }
];

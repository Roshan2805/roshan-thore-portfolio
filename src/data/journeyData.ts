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
  stage: string;
  label: string;
  text: string;
  note?: string;
}

export const STORY: StoryStep[] = [
  {
    stage: "Childhood",
    label: "Early on",
    text: "I was curious about computers long before I understood code.",
    note: "Mostly games and the internet. I'd heard the words \u201csoftware engineer\u201d and liked the sound of them. I had no idea what the job actually was."
  },
  {
    stage: "Detour",
    label: "12th, then B.Com",
    text: "I took Science in 12th, scored 52%, and ended up in commerce. Banking started to look like the sensible plan."
  },
  {
    stage: "Curiosity",
    label: "Lockdown, 2020",
    text: "A friend who knew some code got me wondering how the apps I used every day were actually made. I tried Python, from YouTube."
  },
  {
    stage: "Discovery",
    label: "After B.Com, 2022",
    text: "I joined a six-month software development course. It was the first time I learned to code properly, from the ground up: HTML, then CSS, then JavaScript."
  },
  {
    stage: "Understanding",
    label: "The course",
    text: "Then Angular, Node.js and MongoDB. A screen, a server, a database. That's when it clicked: this is what software development actually is."
  },
  {
    stage: "Career",
    label: "First job, 2023",
    text: "Ink In Caps took me on as an intern. My first task was an admin panel in a codebase I didn't understand, so for the first few days I mostly just read it."
  },
  {
    stage: "Career",
    label: "On the job",
    text: "Then I moved to a product built in React and Next.js, which I had never written. I learned it by building Stories. About 30,000 people use it now."
  }
];

export const STAGES = ["Childhood", "Detour", "Curiosity", "Discovery", "Understanding", "Career"];

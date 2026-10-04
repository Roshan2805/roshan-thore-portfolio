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

export const STORY = [
  {
    stage: "Curiosity",
    label: "Early on",
    text: "As a kid I wanted to work with computers. I couldn't have told you what a software engineer did. I thought it meant making websites."
  },
  {
    stage: "Curiosity",
    label: "12th, then B.Com",
    text: "I took Science in 12th for it, scored 52%, and ended up in commerce. Banking started to look like the sensible plan."
  },
  {
    stage: "Code",
    label: "Lockdown, 2020",
    text: "A friend who knew some code got me curious. It was the first time I saw that the apps I used every day were written by people, line by line. I started on Python, from YouTube."
  },
  {
    stage: "Code",
    label: "After B.Com, 2022",
    text: "I joined a six-month software development course. It was the first time I learned to code properly, from the ground up: HTML, then CSS, then JavaScript."
  },
  {
    stage: "Interface",
    label: "The course",
    text: "Then Angular, Node.js and MongoDB. A screen, a server, a database. That's when it clicked: this is what software development actually is."
  },
  {
    stage: "Product",
    label: "First job, 2023",
    text: "Ink In Caps took me on as an intern. My first task was an admin panel in a codebase I didn't understand, so for the first few days I mostly just read it."
  },
  {
    stage: "Career",
    label: "On the job",
    text: "Then I moved to a product built in React and Next.js, which I had never written. I learned it by building Stories. About 30,000 people use it now."
  }
];

export const STAGES = ["Curiosity", "Code", "Interface", "Product", "Career"];

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
    stage: "12th",
    label: "A different start",
    text: "I chose Science in 12th because I was drawn to computers.",
    note: "I scored 52%, and that changed the direction of my education."
  },
  {
    stage: "B.Com",
    label: "2019 – 2022",
    text: "So I studied B.Com.",
    note: "A different path from where my curiosity about computers had started. The curiosity didn't go anywhere, though."
  },
  {
    stage: "Discovery",
    label: "Lockdown, 2020",
    text: "A friend who knew some code got me wondering how the apps I used every day were actually made.",
    note: "I tried Python, from YouTube. The two paths started to meet."
  },
  {
    stage: "Learning",
    label: "The course, 2022",
    text: "My curiosity about computers finally became something I could build with.",
    note: "A six-month software development course: HTML, CSS and JavaScript first, then Angular, Node.js and MongoDB."
  },
  {
    stage: "Learning",
    label: "The course",
    text: "For the first time I understood what actually happens behind the websites and apps I'd been using for years."
  },
  {
    stage: "Work",
    label: "First job, 2023",
    text: "Ink In Caps took me on as an intern. My first task was an admin panel in a codebase I didn't understand, so for the first few days I mostly just read it."
  },
  {
    stage: "MCA",
    label: "I wanted to understand more",
    text: "Once I was working in software, I wanted to go deeper.",
    note: "So I took a part-time MCA at Sandip University alongside the job, to understand computers and software beyond what day-to-day work teaches."
  },
  {
    stage: "Today",
    label: "On the job",
    text: "Then I moved to a product built in React and Next.js, which I had never written. I learned it by building Stories. About 30,000 people use it now."
  }
];

export const STAGES = ["Childhood", "12th", "B.Com", "Discovery", "Learning", "Work", "MCA", "Today"];

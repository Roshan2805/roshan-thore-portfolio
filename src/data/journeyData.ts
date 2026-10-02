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
    text: "I knew I wanted to build things with technology. I didn't really know what a software engineer did. I thought it meant websites."
  },
  {
    stage: "Curiosity",
    label: "After 12th",
    text: "I scored 52% and ended up in B.Com. Banking looked like the plan."
  },
  {
    stage: "Code",
    label: "Lockdown, 2020",
    text: "A friend showed me some code. It was the first time I understood that the sites and apps I used every day were written, line by line, by people."
  },
  {
    stage: "Interface",
    label: "Learning, 2022",
    text: "So I started learning. HTML, CSS, JavaScript, then React. Type something, and a thing appears on the screen. I couldn't leave that alone."
  },
  {
    stage: "Product",
    label: "First opportunity, 2023",
    text: "Ink In Caps took me on as an intern in Mumbai. Seven months later it was a job, and the screens I built were going to real users."
  },
  {
    stage: "Career",
    label: "Today",
    text: "Curiosity turned into a career. The things I build are now used by more than 30,000 people."
  }
];

export const STAGES = ["Curiosity", "Code", "Interface", "Product", "Career"];

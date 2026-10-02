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
    text: "A friend showed me some code. It was the first time I understood that the sites and apps I used every day were written, line by line, by people. I started learning Python on YouTube."
  },
  {
    stage: "Interface",
    label: "The course, 2022",
    text: "I had the basics but couldn't work out how to build a whole app on my own. So I joined a full-stack course in Pune, and learned Angular there."
  },
  {
    stage: "Product",
    label: "First opportunity, 2023",
    text: "Ink In Caps took me on as an intern in Mumbai. My first task was an admin panel in a codebase I didn't understand yet. Seven months later it was a job."
  },
  {
    stage: "Career",
    label: "Today",
    text: "Then I was moved to a product built in React and Next.js, and learned both on the job. What I build there is now used by more than 30,000 people."
  }
];

export const STAGES = ["Curiosity", "Code", "Interface", "Product", "Career"];

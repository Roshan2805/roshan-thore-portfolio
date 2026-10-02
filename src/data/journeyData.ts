export interface JourneyChapter {
  label: string;
  title: string;
  body: string;
  tags?: string[];
}

export const JOURNEY: JourneyChapter[] = [
  {
    label: "The plan",
    title: "I wanted to build software",
    body: "After 10th I took Science, because I had decided I wanted to be a software developer. That was the whole plan, and I had no backup for it."
  },
  {
    label: "The detour",
    title: "It didn't go the way I planned",
    body: "My 12th results closed that door. So I moved to commerce, did my B.Com, and started preparing for a career in banking instead. For a while I assumed the software thing just wasn't going to happen."
  },
  {
    label: "Lockdown",
    title: "A friend who could code",
    body: "During the COVID lockdown a friend who knew some programming told me how much was happening in software. I suddenly had time, so I started learning Python from YouTube to find out what code actually was.",
    tags: ["Python", "YouTube", "Curiosity"]
  },
  {
    label: "Getting serious",
    title: "Tutorials weren't enough",
    body: "I could follow along, but I couldn't build anything complete on my own. I needed structure, so I joined a full stack course and learned properly, including my first framework: Angular.",
    tags: ["Angular", "JavaScript", "MERN basics"]
  },
  {
    label: "First job",
    title: "My first real codebase",
    body: "I got hired at Ink In Caps. My first task was to update an admin panel and connect it to a few APIs. It was the first time I had opened a project written by other people, and I spent two or three days just reading it before I changed a line.",
    tags: ["Angular", "REST APIs", "Reading code"]
  },
  {
    label: "The Angular years",
    title: "Metaverse worlds and client sites",
    body: "Then came the real work. I built the Angular layer over Unity 3D worlds for a metaverse platform, with AI chat characters, rewards and a Stripe store. Alongside it I built a healthcare non-profit site with an interactive map of India, a virtual resort showcase, and animation-heavy brand sites.",
    tags: ["Unity WebGL", "GSAP", "Stripe", "RxJS"]
  },
  {
    label: "Starting over",
    title: "I had never written a React component",
    body: "I was moved to KNKY, a creator platform built in React and Next.js. I learned React, then Next.js, then how the codebase was put together, and only then started picking up real work. My first modules were Stories and the Shop.",
    tags: ["React", "Next.js", "TypeScript"]
  },
  {
    label: "Now",
    title: "Payments, streaming and scale",
    body: "Today I own payments and subscriptions on a platform with 30K+ users, I built its Stories and Channels features, I'm the only frontend engineer on its admin console, and I mentor the juniors who joined after me.",
    tags: ["Payments", "HLS streaming", "Mentoring"]
  }
];

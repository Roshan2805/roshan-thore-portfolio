export interface JourneyStage {
  label: string;
  title: string;
  body: string;
  accent: string;
  tags?: string[];
  stats?: { value: string; label: string }[];
}

// Path height at each stage, used by the 3D scene: it dips where things went wrong and climbs after.
export const JOURNEY: (JourneyStage & { height: number })[] = [
  {
    label: "Childhood",
    title: "It started as a kid's plan",
    body: "Long before I knew what code looked like, I had decided I would build software one day.",
    accent: "#818cf8",
    height: 0
  },
  {
    label: "School",
    title: "I chose Science for one reason",
    body: "After 10th I took Science. It was the road to becoming a developer, and I had no backup plan.",
    accent: "#818cf8",
    height: 1
  },
  {
    label: "12th",
    title: "The results closed that door",
    body: "My 12th marks weren't enough. The plan I had carried for years was suddenly off the table.",
    accent: "#94a3b8",
    height: -2.5
  },
  {
    label: "B.Com",
    title: "Plan B: commerce",
    body: "I enrolled in B.Com and started preparing for a career in banking. Software became something other people did.",
    accent: "#94a3b8",
    height: -3.2
  },
  {
    label: "Lockdown",
    title: "Then everything stopped",
    body: "COVID sent everyone home. A friend who could code told me how much was happening in software, and I had nothing but time.",
    accent: "#94a3b8",
    height: -4.2
  },
  {
    label: "Discovering code",
    title: "Python, from YouTube",
    body: "I started with tutorials just to see what programming really was. The more I learned, the more the old plan came back.",
    accent: "#22d3ee",
    tags: ["Python", "Self-taught"],
    height: -2.6
  },
  {
    label: "Learning properly",
    title: "Tutorials weren't enough",
    body: "I could follow along but couldn't build anything whole. So I joined a full stack course and learned it properly, starting with Angular.",
    accent: "#22d3ee",
    tags: ["Angular", "JavaScript", "Full stack course"],
    height: -1
  },
  {
    label: "First job",
    title: "My first real codebase",
    body: "Ink In Caps hired me as an intern. My first task was an admin panel, and I spent two or three days just reading other people's code before changing a line.",
    accent: "#22d3ee",
    tags: ["Ink In Caps", "REST APIs"],
    height: 0.6
  },
  {
    label: "Projects",
    title: "Metaverse worlds and client sites",
    body: "I built the web layer over Unity 3D worlds, with AI characters, rewards and a Stripe store, and a healthcare site mapping programmes across 16 states.",
    accent: "#22d3ee",
    tags: ["Unity WebGL", "GSAP", "Stripe"],
    height: 2
  },
  {
    label: "Growth",
    title: "Starting over in React",
    body: "I was moved to a product built in React and Next.js. I had never written a React component, so I learned the stack first, then shipped Stories and the Shop.",
    accent: "#22d3ee",
    tags: ["React", "Next.js", "TypeScript"],
    height: 2.6
  },
  {
    label: "Frontend engineer",
    title: "Owning the hard parts",
    body: "I took over payments and subscriptions, rebuilt the Stories feed, and became the only frontend engineer on the admin console the finance team runs on.",
    accent: "#67e8f9",
    tags: ["Payments", "HLS streaming", "Admin console"],
    height: 4
  },
  {
    label: "Today",
    title: "Where I am now",
    body: "Software Development Engineer at Ink In Caps, working on a creator platform, and mentoring the developers who joined after me.",
    accent: "#34d399",
    stats: [
      { value: "30K+", label: "users" },
      { value: "45K+", label: "transactions a year" },
      { value: "3.5+", label: "years" }
    ],
    height: 5.6
  },
  {
    label: "Next",
    title: "What comes next",
    body: "Harder problems, larger systems, and making the way in a little easier for the next person who starts outside tech.",
    accent: "#34d399",
    height: 7.6
  }
];

export const PERSONAL_INFO = {
  name: "Roshan Thore",
  role: "Frontend Engineer",
  siteUrl: "https://roshan-thore.vercel.app",
  company: "Ink In Caps",
  location: "Mumbai, India",
  email: "thoreroshan2805@gmail.com",
  phone: "+91 7028643184",
  github: "https://github.com/Roshan2805",
  linkedin: "https://www.linkedin.com/in/roshan-thore",
  resumeUrl: "/Roshan-Thore-Resume.pdf",
  avatar: "/profile.jpg"
};

export interface Project {
  id: string;
  title: string;
  kind: string;
  role: string;
  period: string;
  status: string;
  problem: string;
  contribution: string;
  results: { label: string; value: string }[];
  stack: string[];
  solved: { problem: string; fix: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: "knky",
    title: "KNKY",
    kind: "Creator monetization platform",
    role: "Lead frontend contributor",
    period: "Oct 2023 – Present",
    status: "Live",
    problem:
      "A platform where creators earn from subscriptions, tips, a shop and paid content. Every one of those ends in a checkout that has to work in different countries.",
    contribution:
      "I own checkout and subscriptions: four payment methods, card tokenization, guest checkout, and plan upgrades, downgrades, trials and lifetime tiers. I also built Stories, Channels, Shop and the Media Vault.",
    results: [
      { label: "Users", value: "30K+" },
      { label: "Transactions a month", value: "45K+" },
      { label: "Subscription payments a month", value: "9.5K+" },
      { label: "Stories posted a month", value: "20K+" }
    ],
    stack: ["Next.js 14", "TypeScript", "Redux Toolkit", "TanStack Query", "TanStack Virtual", "Tailwind CSS", "HLS.js", "LiveKit", "Socket.IO"],
    solved: [
      {
        problem: "The video player and third-party SDKs made the first load slow on mobile.",
        fix: "Loaded hls.js with a dynamic import and initialized Firebase lazily, so video code downloads only on pages that play video."
      },
      {
        problem: "Media vaults with thousands of image and video cards scrolled badly.",
        fix: "Virtualized the lists with TanStack Virtual and dynamic height estimation, so only visible cards are in the DOM."
      },
      {
        problem: "Every feature wired up its own modal, which caused z-index collisions and duplicate code.",
        fix: "Introduced one shared ModalPortal and moved the app onto it."
      }
    ]
  },
  {
    id: "admin",
    title: "KNKY Admin Console",
    kind: "Internal finance and operations tool",
    role: "Sole frontend engineer",
    period: "Mar 2025 – Present",
    status: "Internal",
    problem:
      "Operations and finance need to see every transaction and payout on the platform, filter them many ways, and export them without waiting on an engineer.",
    contribution:
      "I set the project up and have been its only frontend engineer. I built the transactions and payout modules, role-based access, and the table and filter system most list pages share.",
    results: [
      { label: "Frontend engineers on it", value: "1" },
      { label: "Build time after moving to Vite", value: "~50% less" },
      { label: "Filtered views", value: "Shareable by URL" }
    ],
    stack: ["React 19", "React Router 7", "TypeScript", "Vite", "Material UI", "Material React Table", "Redux Toolkit", "AWS CodeBuild"],
    solved: [
      {
        problem: "Exporting a large transaction history froze the browser tab.",
        fix: "Generated the CSV in chunks instead of converting every row at once."
      },
      {
        problem: "Sessions expired while admins were halfway through long forms.",
        fix: "Scheduled a silent token renewal shortly before expiry."
      },
      {
        problem: "Finance wanted the same data filtered in ways nobody had predicted.",
        fix: "Made filters configuration-driven and stored them in the URL, so a new filter set is config and a view can be bookmarked."
      }
    ]
  },
  {
    id: "agency",
    title: "KNKY Agency Portal",
    kind: "B2B portal for talent agencies",
    role: "Frontend engineer",
    period: "Feb 2025 – Sep 2025",
    status: "Live",
    problem:
      "Agencies manage many creators with many staff, and each creator contract splits revenue differently.",
    contribution:
      "I built creator invitations with three revenue-share models and per-feature permissions, employee management with role-based routing, and the earnings and analytics pages.",
    results: [
      { label: "Revenue-share models", value: "3" },
      { label: "Staff to creators", value: "Many-to-many" },
      { label: "API responses", value: "AES-encrypted" }
    ],
    stack: ["React 18", "Vite", "TypeScript", "Radix UI", "Tailwind CSS", "TanStack Virtual", "React Hook Form", "ApexCharts"],
    solved: [
      {
        problem: "Revenue split maths differed between the creator view and the agency view.",
        fix: "Moved the calculation into one shared module that both views read from."
      },
      {
        problem: "Encrypting API responses would have meant touching every call site.",
        fix: "Decrypted inside the Axios response interceptor and returned the usual response shape."
      }
    ]
  }
];

export const EARLIER_WORK = [
  {
    title: "Heftyverse",
    period: "2023 – 2024",
    summary:
      "The Angular layer over four Unity WebGL worlds: two-way messaging with the 3D runtime, AI chat characters, rewards, and a store with Stripe checkout.",
    stack: "Angular, RxJS, Unity WebGL, Stripe"
  },
  {
    title: "Digital Bharat Collaborative",
    period: "2023",
    summary:
      "Lead developer on a healthcare non-profit's site for Piramal Swasthya, with an interactive map of programmes across 16 Indian states.",
    stack: "Angular, GSAP ScrollTrigger"
  }
];

export const CAPABILITIES = [
  {
    title: "I build interfaces.",
    tools: ["React", "Next.js", "TypeScript", "JavaScript", "HTML and CSS", "Tailwind CSS", "Radix UI", "Material UI", "Framer Motion", "GSAP"]
  },
  {
    title: "I build product functionality.",
    tools: ["Checkout and card tokenization", "Subscription flows", "OTP sign-in and token renewal", "State with Redux Toolkit and TanStack Query", "REST API integration", "HLS video", "Live rooms and chat with LiveKit and Socket.IO"]
  },
  {
    title: "I ship production software.",
    tools: ["Git and code review", "Vite", "AWS CodeBuild pipelines", "Code splitting", "List virtualization", "Responsive layouts", "Node.js, Express and MongoDB basics"]
  }
];

// Education and work on one time axis. Years are decimal: 2023.5 is roughly July 2023.
export const TIMELINE = {
  start: 2019.3,
  end: 2026.8,
  education: [
    { label: "B.Com", detail: "YCMOU", from: 2019.5, to: 2022.4 },
    { label: "Dev course", detail: "6 months", from: 2022.45, to: 2022.95 },
    { label: "MCA, part-time", detail: "CGPA 7.85", from: 2023.5, to: 2026.45 }
  ],
  work: [
    { label: "Intern", detail: "Ink In Caps", from: 2023.0, to: 2023.55 },
    { label: "Junior SDE", detail: "Ink In Caps", from: 2023.6, to: 2024.6 },
    { label: "SDE", detail: "Ink In Caps", from: 2024.6, to: 2026.8 }
  ],
  moments: [
    { label: "Python, from YouTube", at: 2020.3 },
    { label: "KNKY launches", at: 2023.78 }
  ],
  stages: [
    {
      from: 2019.3,
      word: "B.Com",
      period: "2019 – 2022",
      text: "Science in 12th because I liked computers, then 52%, and my education went a different way. Three years of commerce."
    },
    {
      from: 2020.2,
      word: "Curious",
      period: "2020",
      text: "Lockdown. A friend got me curious about code, and I tried Python from YouTube."
    },
    {
      from: 2022.45,
      word: "Learning",
      period: "2022",
      text: "After B.Com, a six-month software development course. HTML, CSS and JavaScript first, then Angular, Node.js and MongoDB. The first time I saw how an application is actually built."
    },
    {
      from: 2023.0,
      word: "First job",
      period: "Jan – Jul 2023",
      text: "Intern at Ink In Caps. Admin panel work and REST APIs in a production Angular codebase. Full-time after seven months."
    },
    {
      from: 2023.5,
      word: "Building",
      period: "Aug 2023",
      text: "Junior SDE. I start a part-time MCA alongside the job, because I want to understand more than work teaches. At work: the web layer over Unity 3D worlds for Heftyverse."
    },
    {
      from: 2023.78,
      word: "Shipping",
      period: "Oct 2023",
      text: "KNKY launches. I learn React and Next.js on the job, and build Stories, Shop, Channels and the Media Vault."
    },
    {
      from: 2024.6,
      word: "Owning",
      period: "Aug 2024",
      text: "SDE. I own payments and subscriptions, 45K+ transactions a month, and I'm the only frontend engineer on the admin console."
    },
    {
      from: 2026.4,
      word: "Now",
      period: "2026",
      text: "MCA done, part-time over five semesters, CGPA 7.85. Reviewing the team's pull requests, and still building."
    }
  ]
};

export const PRINCIPLES = [
  {
    title: "Small details change how it feels.",
    proof: "On a slow connection, Stories drop to a lower bitrate instead of stalling. Skeletons hold the layout while content loads, so nothing jumps."
  },
  {
    title: "Plan for the failure first.",
    proof: "A declined payment tells the buyer what happened and what to do next. Admin sessions renew before they expire, so nobody loses a half-filled form."
  },
  {
    title: "Fix it once, in the right place.",
    proof: "One shared modal portal replaced a modal per feature. Decryption lives in one Axios interceptor instead of at every call site."
  },
  {
    title: "Send less code.",
    proof: "The video player only downloads on pages that play video. Lists of thousands render only the rows on screen. Big CSV exports are built in chunks so the tab keeps working."
  },
  {
    title: "Learn by building.",
    proof: "Python from YouTube, the fundamentals in a six-month course, and React by building Stories on a real product in my first weeks with it."
  }
];

export const OUTSIDE = ["Anime", "Movies", "Hiking", "Exploring"];

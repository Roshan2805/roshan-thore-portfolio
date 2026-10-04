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
      "I own checkout and subscriptions: four payment methods, card tokenization, guest checkout, and plan upgrades, downgrades, trials and lifetime tiers. I also built Stories, Channels, Shop and the Media Vault, integrated live video and audio rooms and real-time chat, and added OTP sign-in.",
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
      "I set the project up and have been its only frontend engineer. I built the transactions and payout modules, role-based access, the table and filter system most list pages share, and CSV exports. I also moved it to Vite and set up its AWS CodeBuild pipeline.",
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
    tools: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Radix UI", "Material UI", "Framer Motion", "GSAP"]
  },
  {
    title: "I build product functionality.",
    tools: ["Checkout", "Subscription flows", "Authentication", "REST API integration", "Redux Toolkit", "TanStack Query", "HLS video", "Live rooms", "Chat"]
  },
  {
    title: "I ship production software.",
    tools: ["Git", "Code review", "Vite", "AWS CodeBuild", "Code splitting", "List virtualization", "Responsive design", "Node.js, Express and MongoDB basics"]
  }
];

// Everything on the resume, grouped the same way, for anyone who wants the whole list.
export const ALL_SKILLS = [
  { group: "Frontend", items: ["React", "Next.js (App Router)", "TypeScript", "JavaScript", "HTML and CSS", "SCSS", "Angular", "Redux Toolkit", "TanStack Query, Table and Virtual", "React Hook Form", "React Router"] },
  { group: "UI", items: ["Tailwind CSS", "Radix UI", "shadcn/ui", "Material UI", "Framer Motion", "GSAP"] },
  { group: "Media and real-time", items: ["HLS.js", "LiveKit (WebRTC)", "Socket.IO", "XMPP", "Uppy and tus uploads", "Firebase"] },
  { group: "Backend and tooling", items: ["Node.js", "Express", "MongoDB", "REST APIs", "Git", "Vite", "Vitest", "React Testing Library", "AWS CodeBuild", "Amplitude"] }
];

// Education and work on one time axis. Years are decimal: 2023.5 is roughly July 2023.
// The story above tells why; this is just what happened, and when.
export const TIMELINE = {
  start: 2019.3,
  end: 2026.8,
  education: [
    { label: "B.Com", detail: "YCMOU", from: 2019.6, to: 2022.6 },
    // The course ran while B.Com was finishing, so it sits just under it.
    { label: "Course", detail: "6 months", from: 2022.45, to: 2022.95, row: 1 },
    { label: "MCA, part-time", detail: "Sandip University", from: 2023.58, to: 2026.45 }
  ],
  work: [
    { label: "Intern", detail: "", from: 2023.0, to: 2023.55 },
    { label: "Junior SDE", detail: "", from: 2023.6, to: 2024.55 },
    { label: "SDE", detail: "", from: 2024.6, to: 2026.8 }
  ],
  moments: [
    { label: "First lines of code", at: 2020.3 },
    { label: "KNKY launches", at: 2023.78 }
  ],
  stages: [
    {
      from: 2019.3,
      word: "B.Com",
      period: "Aug 2019 – Aug 2022",
      text: "Bachelor of Commerce, Yashwantrao Chavan Maharashtra Open University. 64%."
    },
    {
      from: 2020.2,
      word: "Lockdown",
      period: "2020",
      text: "A friend introduces me to coding."
    },
    {
      from: 2022.45,
      word: "Course",
      period: "2022",
      text: "Full Stack Web Development, SPARK IT Training Institute, Pune. Six months: HTML, CSS and JavaScript, then Angular, Node.js and MongoDB."
    },
    {
      from: 2023.0,
      word: "Intern",
      period: "Jan – Jul 2023",
      text: "Web Developer Intern, Ink In Caps, Mumbai. Admin panel and REST API work in a production Angular codebase. Converted to full-time."
    },
    {
      from: 2023.58,
      word: "MCA",
      period: "Aug 2023",
      text: "Master of Computer Applications at Sandip University begins, part-time, alongside the job."
    },
    {
      from: 2023.6,
      word: "Junior SDE",
      period: "Aug 2023 – Jul 2024",
      text: "Junior Software Development Engineer. The web layer over Unity WebGL for Heftyverse, lead developer on Digital Bharat Collaborative, and KNKY from its launch in October 2023."
    },
    {
      from: 2024.6,
      word: "SDE",
      period: "Aug 2024 – Present",
      text: "Software Development Engineer. I own KNKY's payments and subscriptions, 45K+ transactions a month, and I'm the only frontend engineer on its admin console."
    },
    {
      from: 2026.4,
      word: "MCA done",
      period: "Jun 2026",
      text: "Five semesters, part-time, CGPA 7.85."
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
    proof: "The fundamentals came from a six-month course. React came from building Stories on a real product in my first weeks with it."
  }
];

export const OUTSIDE = ["Games", "Movies", "Anime", "Weekend rides", "Hiking", "Exploring"];

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
  headline: { label: string; value: string }[];
  areas: string[];
  flow?: string[];
  results: { label: string; value: string }[];
  stack: string[];
  built: { area: string; points: string[] }[];
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
    headline: [
      { label: "Users", value: "30K+" },
      { label: "Transactions a month", value: "45K+" }
    ],
    areas: ["Checkout", "Subscriptions", "Stories", "Media Vault", "Shop", "Channels", "Live rooms", "Chat", "Sign-in"],
    results: [
      { label: "Users", value: "30K+" },
      { label: "Transactions a month", value: "45K+" },
      { label: "Subscription payments a month", value: "9.5K+" },
      { label: "Stories posted a month", value: "20K+" }
    ],
    stack: ["Next.js 14", "TypeScript", "Redux Toolkit", "TanStack Query", "TanStack Virtual", "Tailwind CSS", "HLS.js", "LiveKit", "Socket.IO"],
    built: [
      {
        area: "Checkout",
        points: [
          "Four payment methods: tokenized cards, iDEAL, Bancontact and Centrobill.",
          "Guest checkout, transaction cancellation, and failure states driven by the backend so the buyer always gets a next step."
        ]
      },
      {
        area: "Subscriptions",
        points: [
          "Plan changes across upgrades, downgrades, trials and lifetime tiers, with retention offers.",
          "Wallet, tipping and revenue-split flows."
        ]
      },
      {
        area: "Stories",
        points: [
          "A gesture-driven 3D cube carousel between creators, seen-state tracking, and locked stories for subscribers.",
          "HLS adaptive-bitrate playback tuned for slow connections."
        ]
      },
      {
        area: "Media Vault and uploads",
        points: [
          "A virtualized asset library with dynamic item heights, for mobile drawers and desktop grids.",
          "Resumable large-file S3 uploads with Uppy and tus."
        ]
      },
      {
        area: "Real-time",
        points: ["LiveKit video and audio rooms.", "Chat over Socket.IO and XMPP, and typed notifications with Firebase push."]
      },
      {
        area: "Sign-in and security",
        points: ["Two-factor authentication over OTP and silent token renewal before expiry.", "Client-side encryption of API payloads."]
      },
      {
        area: "Product areas",
        points: ["Channels, Collabs, the creator Shop, Services and seasonal campaigns with their own pricing.", "Offline support as a PWA with service worker caching."]
      }
    ],
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
    headline: [
      { label: "Frontend engineer on it", value: "1" },
      { label: "Less build time after moving to Vite", value: "~50%" }
    ],
    areas: ["Transactions", "Payouts", "Filters", "Exports", "RBAC"],
    results: [
      { label: "Frontend engineers on it", value: "1" },
      { label: "Build time after moving to Vite", value: "~50% less" },
      { label: "Filtered views", value: "Shareable by URL" }
    ],
    stack: ["React 19", "React Router 7", "TypeScript", "Vite", "Material UI", "Material React Table", "Redux Toolkit", "AWS CodeBuild"],
    built: [
      {
        area: "Setup",
        points: [
          "Set the project up and replaced the previous Next.js/Webpack app with a Vite SPA, roughly halving build times.",
          "Separate test, staging and live builds on AWS CodeBuild."
        ]
      },
      {
        area: "Transactions and payouts",
        points: ["Overview dashboards with revenue and transaction-type charts, and a payout status breakdown.", "A VAT-inclusive / exclusive toggle for finance."]
      },
      {
        area: "Tables and filters",
        points: [
          "One table and filter system behind most list pages: server-side pagination, debounced search and compound filters.",
          "Filters are configuration and live in the URL, so a filtered view can be bookmarked and shared."
        ]
      },
      {
        area: "Exports",
        points: ["CSV export generated in chunks, so large histories export without freezing the tab."]
      },
      {
        area: "Access",
        points: ["Role-based access control: server-driven grants become client-side route and action guards.", "OTP login, scheduled token renewal, and decryption of encrypted API responses."]
      }
    ],
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
    headline: [
      { label: "Revenue-share models", value: "3" },
      { label: "Staff to creators", value: "Many-to-many" }
    ],
    areas: ["Invitations", "Permissions", "Employees", "Earnings", "Analytics"],
    flow: ["Agency staff", "Creators", "Permissions", "Revenue share", "Earnings", "Analytics"],
    results: [
      { label: "Revenue-share models", value: "3" },
      { label: "Staff to creators", value: "Many-to-many" },
      { label: "API responses", value: "AES-encrypted" }
    ],
    stack: ["React 18", "Vite", "TypeScript", "Radix UI", "Tailwind CSS", "TanStack Virtual", "React Hook Form", "ApexCharts"],
    built: [
      {
        area: "Invitations",
        points: [
          "Creator invitations across pending, accepted and cancelled states.",
          "Three revenue-share models and per-feature permissions, sending only what the agency selected."
        ]
      },
      {
        area: "Employees",
        points: [
          "Employee management with role-based routing.",
          "Many-to-many staff-to-creator assignment that diffs old and new assignments, in one shared create/edit modal."
        ]
      },
      {
        area: "Money",
        points: [
          "Earnings and analytics with ApexCharts and date-range filters, including staff with zero earnings.",
          "A wallet with infinite-scroll transactions and masked card details."
        ]
      },
      {
        area: "Security",
        points: ["AES decryption of API responses inside the Axios interceptor."]
      }
    ],
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
    kind: "Metaverse platform",
    period: "2023 – 2024",
    summary:
      "The Angular layer over four Unity WebGL worlds: two-way messaging with the 3D runtime, chat and leaderboards, AI chat characters, rewards, and a store with Stripe checkout.",
    stack: ["Angular", "RxJS", "Unity WebGL", "Socket.IO", "Stripe"],
    built: [
      {
        area: "Web and Unity",
        points: [
          "The Angular layer over four Unity WebGL worlds, and the two-way message contract I defined with the Unity team.",
          "Live in-world video through a WebRTC streaming SDK, with reconnection handling."
        ]
      },
      {
        area: "In the worlds",
        points: [
          "Real-time chat and leaderboards over Socket.IO.",
          "AI chat characters with the Inworld AI SDK, and an AI photobooth.",
          "Rewards, badges, spin the wheel, referrals, and a store with cart, guest checkout and Stripe payments."
        ]
      }
    ],
    solved: [
      {
        problem: "Chat messages lagged before showing up on avatars in the 3D world.",
        fix: "Queued events with RxJS and updated the UI optimistically while messages went over WebSockets."
      },
      {
        problem: "Guests who played challenges lost their rewards when they signed up.",
        fix: "Held guest progress and replayed the reward calls once the account existed."
      }
    ]
  },
  {
    title: "Digital Bharat Collaborative",
    kind: "Healthcare non-profit site, Piramal Swasthya",
    period: "2023",
    summary:
      "Lead developer on a healthcare non-profit's site for Piramal Swasthya, with an interactive map of programmes across 16 Indian states.",
    stack: ["Angular", "GSAP ScrollTrigger"],
    built: [
      {
        area: "Site",
        points: [
          "Lead developer: every page built from the designs up, including news, case studies and resources.",
          "An interactive map of programmes across 16 states, and scroll animations and counters with GSAP ScrollTrigger."
        ]
      }
    ],
    solved: [
      {
        problem: "A state-by-state map of India is hard to use on a phone.",
        fix: "Built a landscape-only mobile mode with its own controls, so the map stayed on the mobile site."
      }
    ]
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
    { label: "A friend mentions IT courses", at: 2020.3 },
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
      text: "Talking to a friend about what I'm into, I hear about courses that could get me into IT."
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

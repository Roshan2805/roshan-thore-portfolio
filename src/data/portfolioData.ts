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

export const FIGURES = [
  { label: "people use what I build", value: "30K+" },
  { label: "transactions a year through my checkout", value: "45K+" },
  { label: "products in production", value: "3" },
  { label: "years of frontend, professionally", value: "3.5+" }
];

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
      "Creators earn through subscriptions, tips, a shop and paid content. Every one of those ends in a checkout that has to work across countries and payment methods.",
    contribution:
      "I own checkout and subscriptions: four payment methods, card tokenization, guest checkout, and plan upgrades, downgrades, trials and lifetime tiers. I also built Stories, Channels, Shop and the Media Vault.",
    results: [
      { label: "Users", value: "30K+" },
      { label: "Transactions a year", value: "45K+" },
      { label: "Subscription payments a year", value: "9.6K+" },
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

export const GROWTH = [
  {
    stage: "Learning",
    period: "Jun – Dec 2022",
    role: "Full-stack course, SPARK IT, Pune",
    points: ["Seven months of React, Node.js, Express and MongoDB, straight after a commerce degree."]
  },
  {
    stage: "First opportunity",
    period: "Jan – Jul 2023",
    role: "Web Developer Intern, Ink In Caps",
    points: [
      "Worked in a production Angular codebase from the first weeks: admin panel updates, REST API integration, cross-browser fixes.",
      "Converted to full-time after seven months."
    ]
  },
  {
    stage: "Building",
    period: "Aug 2023",
    role: "Junior Software Development Engineer",
    points: [
      "Built the web layer over Unity 3D worlds for Heftyverse, including the message contract between Angular and the 3D runtime.",
      "Lead developer on the Digital Bharat Collaborative site for Piramal Swasthya."
    ]
  },
  {
    stage: "Shipping",
    period: "Oct 2023",
    role: "KNKY launches",
    points: [
      "Joined KNKY at launch and moved to React and Next.js.",
      "Built Stories, Channels, Shop and the Media Vault, and integrated live rooms and real-time chat."
    ]
  },
  {
    stage: "Owning",
    period: "Aug 2024",
    role: "Software Development Engineer",
    points: [
      "Own KNKY's payments and subscription module, which handles 45K+ transactions a year.",
      "Only frontend engineer on the admin console finance and operations run the platform from."
    ]
  },
  {
    stage: "Growing",
    period: "Now",
    role: "Same title, wider job",
    points: [
      "Review pull requests across the team's frontend work.",
      "Mentored two junior developers through their first production releases."
    ]
  }
];

export const OUTSIDE = ["Anime", "Movies", "Hiking"];

export const EDUCATION = [
  {
    degree: "Master of Computer Applications",
    school: "Sandip University, Nashik",
    period: "2023 – 2026",
    note: "Studied alongside the full-time job."
  },
  {
    degree: "Full Stack Web Development",
    school: "SPARK IT Training Institute, Pune",
    period: "2022",
    note: "Seven months of React, Node.js, Express and MongoDB."
  },
  {
    degree: "Bachelor of Commerce",
    school: "Yashwantrao Chavan Maharashtra Open University",
    period: "2019 – 2022",
    note: "Banking and accounting. Where the plan was, before code."
  }
];

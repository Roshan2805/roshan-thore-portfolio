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
  { label: "People using what I build", value: "30K+" },
  { label: "Transactions through my checkout, a year", value: "45K+" },
  { label: "Products in production", value: "3" },
  { label: "Years writing frontend for a living", value: "3.5+" }
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

export const SKILLS = [
  {
    group: "Frontend",
    items: ["React", "Next.js (App Router)", "TypeScript", "JavaScript", "HTML", "CSS", "Angular"]
  },
  {
    group: "State and data",
    items: ["Redux Toolkit", "TanStack Query", "TanStack Virtual", "React Hook Form", "REST APIs"]
  },
  {
    group: "Interface",
    items: ["Tailwind CSS", "Radix UI", "Material UI", "Framer Motion", "GSAP", "SCSS"]
  },
  {
    group: "Product areas",
    items: ["Checkout and card tokenization", "Subscription billing", "HLS video streaming", "LiveKit and WebRTC", "Socket.IO chat"]
  },
  {
    group: "Backend and tools",
    items: ["Node.js", "Express", "MongoDB", "Git", "Vite", "AWS CodeBuild", "Firebase"]
  }
];

export const EXPERIENCES = [
  {
    title: "Software Development Engineer",
    period: "Aug 2024 – Present",
    summary: "Frontend across three production products on a team of ten.",
    points: [
      "Own KNKY's payments and subscription module, which handles 45K+ transactions a year.",
      "Built the admin console finance and operations run the platform from, as its only frontend engineer.",
      "Built Stories, Channels, Shop and the Media Vault, and integrated LiveKit rooms and real-time chat.",
      "Review pull requests and mentored two junior developers through their first production releases."
    ]
  },
  {
    title: "Junior Software Development Engineer",
    period: "Aug 2023 – Aug 2024",
    summary: "Angular, Unity and client sites, then the move to React and Next.js when KNKY started.",
    points: [
      "Built the web layer over Unity 3D worlds for Heftyverse, including the messaging contract between Angular and the 3D runtime.",
      "Was lead developer on the Digital Bharat Collaborative site for Piramal Swasthya.",
      "Joined KNKY at launch in October 2023."
    ]
  },
  {
    title: "Web Developer Intern",
    period: "Jan 2023 – Jul 2023",
    summary: "Joined with no professional experience. Converted to full-time after seven months.",
    points: [
      "Worked in a production Angular codebase from the first weeks: admin panel updates, REST API integration, cross-browser fixes."
    ]
  }
];

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

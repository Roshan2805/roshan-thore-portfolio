export interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  period: string;
  description: string;
  productType: "Consumer Web (PWA)" | "Internal Admin Console" | "B2B Agency Portal" | "Metaverse Web Bridge";
  stars?: number;
  highlightStat: string;
  stats: { label: string; value: string }[];
  tags: string[];
  techStack: string[];
  color: string;
  gradient: string;
  architecturalHighlights: string[];
  solvedChallenges: {
    problem: string;
    solution: string;
    impact: string;
  }[];
  features: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    experience: string;
    highlight?: boolean;
    icon?: string;
  }[];
}

export interface ExperienceItem {
  company: string;
  location: string;
  title: string;
  period: string;
  type: "Full-Time" | "Internship" | "Contract";
  active?: boolean;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  metrics: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  description: string;
  badges: string[];
}

export const PERSONAL_INFO = {
  name: "Roshan Thore",
  siteUrl: "https://roshan-thore.vercel.app",
  title: "Frontend Engineer · React & Next.js",
  bio: "Frontend engineer with 3.5 years building KNKY, a creator monetization platform serving 30K+ users. I own its payments and subscription module, which handles 45K+ transactions a year, and built its admin console as the only frontend engineer. I also ship HLS video streaming and real-time chat.",
  location: "Mumbai / Nashik, Maharashtra, India",
  email: "thoreroshan2805@gmail.com",
  phone: "+91 7028643184",
  github: "https://github.com/Roshan2805",
  linkedin: "https://www.linkedin.com/in/roshan-thore",
  resumeUrl: "/Roshan-Thore-Resume.pdf",
  avatar: "/profile.jpg"
};

export const PROJECTS: Project[] = [
  {
    id: "consumer-streaming-platform",
    title: "KNKY · Creator Monetization Platform",
    subtitle: "Payments, subscriptions, streaming & live rooms",
    role: "Frontend Engineer",
    period: "Oct 2023 – Present",
    productType: "Consumer Web (PWA)",
    highlightStat: "Payments & subscriptions · 30K+ users",
    stats: [
      { label: "Users", value: "30K+" },
      { label: "Transactions / Year", value: "45K+" },
      { label: "Subscription Payments / Year", value: "9.6K+" },
      { label: "Stories / Month", value: "20K+" }
    ],
    color: "#6366f1",
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    description:
      "A creator monetization platform with 30K+ users, built on Next.js 14. I own the payments and subscription module, which handles 45K+ transactions a year, and built the Stories and Media Vault features, live rooms, and chat.",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "HLS.js", "LiveKit", "Redux Toolkit", "TanStack Virtual", "PWA"],
    techStack: [
      "Next.js 14 (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit & Persist",
      "TanStack Query",
      "TanStack Virtual",
      "HLS.js",
      "LiveKit WebRTC",
      "Socket.IO",
      "Uppy + tus (S3)",
      "Framer Motion",
      "Amplitude & PostHog"
    ],
    architecturalHighlights: [
      "Owned checkout across multiple payment providers, handling 45K+ transactions a year, with card tokenization, regional bank transfers, guest checkout, and backend-driven failure states.",
      "Built the subscription module, which handles 9.6K+ subscription payments a year: plan changes across upgrade, downgrade, trial, and lifetime tiers, plus wallet, tipping, and revenue-split flows.",
      "Built Stories and Media Vault, where creators post 20K+ stories a month: HLS adaptive playback tuned for slow connections, a gesture-driven 3D story carousel, and a virtualized asset library.",
      "Added resumable large-file S3 uploads with Uppy + tus, LiveKit video and audio rooms, and Socket.IO / XMPP chat."
    ],
    solvedChallenges: [
      {
        problem: "The video player and third-party SDKs made the first page load slow on mobile.",
        solution: "Loaded hls.js with a dynamic import, initialized Firebase lazily, and added skeleton loaders.",
        impact: "A lighter first load, with video code only downloaded when a page needs it."
      },
      {
        problem: "Scrolling media vaults with thousands of image and video cards got janky.",
        solution: "Integrated TanStack Virtual with dynamic item height estimation for mobile drawers and desktop grids.",
        impact: "Only the visible cards are in the DOM, so large vaults scroll smoothly."
      },
      {
        problem: "Modals wired up separately in each feature caused z-index collisions and duplicate code.",
        solution: "Introduced a shared ModalPortal abstraction that replaced ad-hoc modal wiring across the app.",
        impact: "No more z-index collisions or duplicated modal code."
      }
    ],
    features: [
      "Multi-Provider Checkout with Card Tokenization",
      "Subscription Module: Upgrades, Downgrades, Trials & Lifetime Plans",
      "Adaptive-Bitrate HLS Streaming Player",
      "3D Story Carousel with Gestures & Content Gating",
      "Live Video & Audio Rooms via LiveKit",
      "Resumable Large-File S3 Uploads (Uppy + tus)",
      "Real-Time Chat with XMPP & Socket.IO",
      "Typed Notifications with Firebase Push",
      "Two-Factor Authentication over OTP",
      "Client-Side Payload Encryption"
    ]
  },
  {
    id: "enterprise-admin-console",
    title: "KNKY Admin Console",
    subtitle: "Internal console for transactions, payouts & access control",
    role: "Sole Frontend Engineer",
    period: "Mar 2025 – Present",
    productType: "Internal Admin Console",
    highlightStat: "Vite + React · ~50% faster builds",
    stats: [
      { label: "Role", value: "Sole frontend" },
      { label: "Builds", value: "~50% faster" },
      { label: "Access", value: "Role-based" },
      { label: "Exports", value: "Unbounded CSV" }
    ],
    color: "#06b6d4",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    description:
      "The internal console behind KNKY for transactions, payouts, and user access. I'm its only frontend engineer, and I replaced the previous Next.js/Webpack app with a Vite SPA, roughly halving build times.",
    tags: ["Vite", "React 18", "React Router 7", "Material UI", "TanStack Table", "ApexCharts"],
    techStack: [
      "Vite",
      "React 18",
      "React Router 7",
      "TypeScript",
      "Material UI",
      "TanStack Table",
      "ApexCharts / MUI X Charts",
      "Redux Toolkit",
      "Crypto-JS",
      "@json2csv/plainjs"
    ],
    architecturalHighlights: [
      "Built the console as its only frontend engineer, covering architecture, routing, state, and build setup.",
      "Built a role-based permission model where server-driven grants become client-side route and action guards.",
      "Built transaction search over large datasets with server-side pagination, combined filters, and unbounded CSV export.",
      "Built reporting dashboards that aggregate earnings and payouts across accounts."
    ],
    solvedChallenges: [
      {
        problem: "Exporting large transaction histories to CSV froze the browser tab.",
        solution: "Generated the CSV in chunks with @json2csv/plainjs instead of converting every row at once.",
        impact: "Staff can export large record sets without the tab freezing."
      },
      {
        problem: "Sessions expired while admins were halfway through long forms.",
        solution: "Added silent token renewal scheduled shortly before the session expires.",
        impact: "Admins no longer lose form progress to an expired session."
      }
    ],
    features: [
      "Role-Based Access Control (RBAC)",
      "Transaction Search with Server-Side Pagination",
      "Unbounded CSV Export",
      "Earnings & Payout Dashboards",
      "Platform Fee & Badge Settings",
      "Device Session & Activity Tracking"
    ]
  },
  {
    id: "agency-b2b-portal",
    title: "KNKY Agency Portal",
    subtitle: "B2B portal for agencies managing creators and staff",
    role: "Frontend Engineer",
    period: "Feb 2025 – Present",
    productType: "B2B Agency Portal",
    highlightStat: "B2B · Multi-tenant",
    stats: [
      { label: "Type", value: "B2B, multi-tenant" },
      { label: "UI", value: "Radix + Tailwind" },
      { label: "Lists", value: "Virtualized" },
      { label: "Search", value: "Debounced" }
    ],
    color: "#10b981",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    description:
      "A B2B portal where talent agencies manage their creators and staff: roles, invitations, earnings, and product listings. Built with Vite, React, Radix UI, and Tailwind CSS.",
    tags: ["Vite", "React 18", "Radix UI", "Tailwind CSS", "TanStack Virtual", "Redux Toolkit"],
    techStack: [
      "Vite",
      "React 18",
      "TypeScript",
      "Radix UI Primitives",
      "Tailwind CSS",
      "TanStack Virtual",
      "Redux Toolkit",
      "Lucide Icons",
      "Sonner"
    ],
    architecturalHighlights: [
      "Modelled multi-tenant access with role definitions and many-to-many assignment of employees to creators.",
      "Built the invitation flow across pending, accepted, and cancelled states, with per-creator permissions and revenue splits.",
      "Built analytics, earnings breakdown, and product-listing screens.",
      "Kept large lists responsive with virtualized rendering and debounced search."
    ],
    solvedChallenges: [
      {
        problem: "Revenue split calculations varied across creator contracts.",
        solution: "Moved split calculations into one shared module that shows the same breakdown in creator and agency views.",
        impact: "Simpler monthly agency invoicing and clearer payouts."
      }
    ],
    features: [
      "Multi-Tenant Roles & Employee Assignment",
      "Creator Invitations (Pending, Accepted, Cancelled)",
      "Per-Creator Permissions & Revenue Splits",
      "Virtualized Earnings Breakdown",
      "Digital & Physical Product Listings",
      "Analytics Dashboard"
    ]
  },
  {
    id: "metaverse-3d-bridge",
    title: "Heftyverse · Metaverse Integration Platform",
    subtitle: "Angular web layer for a Unity 3D world, with live video & chat",
    role: "Frontend Engineer",
    period: "Aug 2023 – Jan 2024",
    productType: "Metaverse Web Bridge",
    highlightStat: "Angular · Unity 3D · WebRTC",
    stats: [
      { label: "Framework", value: "Angular" },
      { label: "3D Engine", value: "Unity WebGL" },
      { label: "Real-Time", value: "WebRTC + Socket.IO" },
      { label: "State", value: "RxJS" }
    ],
    color: "#ec4899",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    description:
      "A metaverse platform where the browser talks to a Unity 3D world. I built the Angular web layer: two-way real-time messaging, live WebRTC video on in-world screens, leaderboards, and chat.",
    tags: ["Angular", "WebRTC", "Socket.IO", "RxJS", "Unity 3D", "Lottie", "Bootstrap"],
    techStack: [
      "Angular",
      "TypeScript",
      "RxJS",
      "WebRTC Streaming SDK",
      "Socket.IO",
      "Unity WebGL Bridge",
      "Lottie Animations",
      "Bootstrap"
    ],
    architecturalHighlights: [
      "Built the Angular web layer connecting the browser to a Unity 3D runtime, with real-time messaging for chat, leaderboards, and event state.",
      "Defined the web-to-engine message contract with the Unity team.",
      "Integrated a WebRTC video streaming SDK for live in-world video, handling connection lifecycle and reconnection.",
      "Built session analytics for concurrency and engagement."
    ],
    solvedChallenges: [
      {
        problem: "Chat messages lagged before showing up on avatars in the 3D world.",
        solution: "Queued events with RxJS and updated the UI optimistically while messages went over WebSockets.",
        impact: "Chat feels instant to users, even during crowded live events."
      }
    ],
    features: [
      "Two-Way Web ↔ Unity Messaging",
      "In-World WebRTC Video with Reconnection",
      "Real-Time Chat & Leaderboards",
      "Concurrency & Engagement Analytics",
      "Lottie Micro-Interactions & Responsive UI"
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend",
    description: "Component architecture, responsive layouts, and modern JavaScript.",
    skills: [
      { name: "React.js", experience: "3 years", highlight: true },
      { name: "Next.js", experience: "2+ years", highlight: true },
      { name: "TypeScript", experience: "2+ years", highlight: true },
      { name: "JavaScript (ES6+)", experience: "3 years", highlight: true },
      { name: "Vite & React Router", experience: "2 years", highlight: true },
      { name: "Angular & RxJS", experience: "1.5 years" },
      { name: "HTML5 & Semantic Web", experience: "3 years" },
      { name: "CSS3 / SASS / SCSS", experience: "3 years" }
    ]
  },
  {
    category: "State & Data",
    description: "Application state, caching, data tables, and form handling.",
    skills: [
      { name: "Redux Toolkit", experience: "3 years", highlight: true },
      { name: "TanStack Query", experience: "2 years", highlight: true },
      { name: "TanStack Table", experience: "2 years", highlight: true },
      { name: "TanStack Virtual", experience: "2 years", highlight: true },
      { name: "React Hook Form", experience: "3 years" },
      { name: "Context API", experience: "3 years" }
    ]
  },
  {
    category: "Real-Time, Media & APIs",
    description: "Video playback, WebRTC rooms, WebSockets, and file uploads.",
    skills: [
      { name: "HLS.js (Adaptive Video)", experience: "2 years", highlight: true },
      { name: "LiveKit (WebRTC Rooms)", experience: "1.5 years", highlight: true },
      { name: "Socket.IO Client", experience: "2.5 years", highlight: true },
      { name: "Uppy & tus (S3 Uploads)", experience: "2 years", highlight: true },
      { name: "RESTful APIs & GraphQL", experience: "3 years" },
      { name: "Firebase Push Notifications", experience: "2 years" }
    ]
  },
  {
    category: "Styling & UI",
    description: "Design system implementation, animations, and accessible UI.",
    skills: [
      { name: "Tailwind CSS", experience: "3 years", highlight: true },
      { name: "Framer Motion", experience: "2 years", highlight: true },
      { name: "Radix UI Primitives", experience: "2 years", highlight: true },
      { name: "Material UI (MUI)", experience: "2 years" },
      { name: "Bootstrap", experience: "3 years" },
      { name: "Lottie Animations", experience: "2 years" }
    ]
  },
  {
    category: "Backend",
    description: "Node.js services, MongoDB database, and authentication.",
    skills: [
      { name: "Node.js", experience: "2 years" },
      { name: "Express.js", experience: "2 years" },
      { name: "MongoDB & Mongoose", experience: "2 years" },
      { name: "2FA / OTP Authentication", experience: "2 years", highlight: true },
      { name: "Postman & API Testing", experience: "3 years" }
    ]
  },
  {
    category: "Performance, Testing & Tools",
    description: "Performance optimization, testing, and modern developer workflow.",
    skills: [
      { name: "Lighthouse Optimization", experience: "2+ years", highlight: true },
      { name: "Code Splitting & Lazy Loading", experience: "2+ years", highlight: true },
      { name: "Vitest & React Testing Library", experience: "1.5 years" },
      { name: "Git & GitHub Workflow", experience: "3 years", highlight: true },
      { name: "Figma to Code", experience: "3 years" }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: "INK IN CAPS",
    location: "Mumbai, Maharashtra, India",
    title: "Software Development Engineer (SDE)",
    period: "Aug 2024 – Present",
    type: "Full-Time",
    active: true,
    summary:
      "Frontend engineer on a 10+ person team, working across three production products: the KNKY creator platform, its admin console, and its B2B agency portal.",
    responsibilities: [
      "Owned KNKY's payments and subscription module, handling 45K+ transactions a year: multi-provider checkout, card tokenization, regional bank transfers, plan upgrades, downgrades, trials and lifetime tiers, plus wallet, tipping, and revenue splits.",
      "Built the KNKY Admin Console as its only frontend engineer, replacing a Next.js/Webpack app with a Vite SPA and roughly halving build times.",
      "Built the Stories and Media Vault features with HLS.js playback, a gesture-driven 3D story carousel, virtualized lists, and resumable S3 uploads.",
      "Integrated LiveKit for live video and audio rooms, and Socket.IO / XMPP for chat.",
      "Reviewed pull requests and mentored two junior developers through their first production releases."
    ],
    technologies: ["React.js", "Next.js 14", "TypeScript", "Tailwind CSS", "HLS.js", "LiveKit", "Redux Toolkit", "TanStack", "Radix UI", "Material UI", "Vite"],
    metrics: [
      "45K+ transactions a year through checkout",
      "20K+ stories posted a month",
      "Sole frontend engineer on the admin console",
      "Mentored 2 junior developers"
    ]
  },
  {
    company: "INK IN CAPS",
    location: "Mumbai, Maharashtra, India",
    title: "Junior Software Development Engineer",
    period: "Aug 2023 – Aug 2024",
    type: "Full-Time",
    summary:
      "Built the Angular web layer for Heftyverse, a metaverse platform, and shipped UI across React and Angular projects.",
    responsibilities: [
      "Built the Angular web layer connecting the browser to a Unity 3D runtime, with real-time messaging for chat, leaderboards, and event state.",
      "Defined the web-to-engine message contract with the Unity team.",
      "Integrated a WebRTC video streaming SDK for live in-world video, including reconnection handling.",
      "Built responsive UI components with SCSS, React, and Angular, working from Figma designs."
    ],
    technologies: ["React.js", "Angular", "TypeScript", "WebRTC", "Socket.IO", "RxJS", "SASS/SCSS", "Bootstrap", "Lottie"],
    metrics: [
      "Defined the web-to-Unity message contract",
      "Shipped live in-world video over WebRTC"
    ]
  },
  {
    company: "INK IN CAPS",
    location: "Mumbai, Maharashtra, India",
    title: "Web Developer Intern",
    period: "Jan 2023 – Jul 2023",
    type: "Internship",
    summary:
      "Worked on frontend features, responsive styling, and bug fixes with the engineering team.",
    responsibilities: [
      "Developed responsive UI components using HTML5, CSS3, JavaScript, and React.",
      "Fixed frontend bugs across desktop and mobile browsers.",
      "Worked in agile sprints with a Git-based workflow."
    ],
    technologies: ["JavaScript (ES6+)", "HTML5", "CSS3", "React.js", "Git", "Postman"],
    metrics: [
      "Converted to full-time after 7 months"
    ]
  }
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Sandip University",
    location: "Nashik, Maharashtra",
    period: "July 2023 – June 2026",
    description:
      "Focus on Advanced Computer Applications, Software Engineering, and Modern Web Development.",
    badges: ["Computer Applications", "Web Architecture", "Software Engineering"]
  },
  {
    degree: "Bachelor of Commerce (BCom)",
    institution: "Yashwantrao Chavan Maharashtra Open University (YCMOU)",
    location: "Nashik, Maharashtra",
    period: "2019 – 2022",
    description:
      "Focus on Banking, Financial Services, Accounting, and Business Administration.",
    badges: ["Financial Systems", "Banking Operations", "Business Studies"]
  },
  {
    degree: "Full Stack Web Development Certification",
    institution: "SPARK IT Training Institute",
    location: "Pune, Maharashtra",
    period: "June 2022 – Dec 2022",
    description:
      "Intensive 7-month software engineering course covering React.js, Node.js, MongoDB, Express, and JavaScript (ES6+).",
    badges: ["MERN Stack", "Data Structures", "Hands-on Projects"]
  }
];

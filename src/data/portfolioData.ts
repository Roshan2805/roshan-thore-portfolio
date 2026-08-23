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
  demoType?: "hls" | "stories" | "virtualization";
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0 to 100
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
  preferredName: "Roshan",
  title: "Frontend Developer (React.js / Next.js)",
  roles: [
    "Frontend Developer (React.js / Next.js)",
    "Software Development Engineer @ INK IN CAPS",
    "TypeScript & Tailwind CSS Developer",
    "Full Stack Web Developer (MERN Stack)"
  ],
  bio: "Frontend developer with 3.5+ years of experience (including 3 years full-time at INK IN CAPS) building responsive, user-friendly web applications using React.js, Next.js, TypeScript, and modern UI libraries. Experienced in developing consumer web apps, admin dashboards, and B2B portals with a strong focus on clean code and performance.",
  location: "Mumbai / Nashik, Maharashtra, India",
  timezone: "Asia/Kolkata (IST)",
  email: "thoreroshan2805@gmail.com",
  phone: "+91 7028643184",
  github: "https://github.com/Roshan2805",
  linkedin: "https://www.linkedin.com/in/roshan-thore",
  resumeUrl: "/Roshan-Thore-Resume.pdf",
  avatar: "/profile.jpg",
  availability: "Available for Frontend & Full-Stack roles",
  experienceYears: "3.5+ Years",
  appsShipped: "3+ Applications",
  activeUsers: "30K+ MAU",
  uptime: "99.9% Uptime",
};

export const PROJECTS: Project[] = [
  {
    id: "consumer-streaming-platform",
    title: "Creator Streaming & Monetization Platform",
    subtitle: "Creator Subscription & Media Platform",
    role: "Frontend Developer",
    period: "Oct 2023 – Present",
    productType: "Consumer Web (PWA)",
    highlightStat: "Next.js 14 · 30K+ MAU",
    stats: [
      { label: "Active Users", value: "30K+ MAU" },
      { label: "Lighthouse Performance", value: "95+" },
      { label: "Page Load Reduction", value: "40%" },
      { label: "Production Uptime", value: "99.9%" }
    ],
    color: "#6366f1",
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    description:
      "A creator subscription and media streaming web application built with Next.js 14 App Router. Powers monetization for creators with adaptive video playback, live audio/video rooms, ephemeral stories, and multi-provider checkout.",
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
      "Implemented adaptive video streaming with HLS.js, dynamically imported to keep initial bundle size light.",
      "Built 3D Cube-Face Stories module with touch gestures, seen-state caching, comment overlays, and NSFW blur gating.",
      "Integrated multi-provider payment checkout supporting international gateways, card tokenization, and digital wallets.",
      "Integrated TanStack Virtual for smooth 60fps scrolling across large creator media galleries."
    ],
    solvedChallenges: [
      {
        problem: "Heavy video players and background services increased initial page load on mobile connections.",
        solution: "Implemented dynamic runtime imports for `hls.js`, lazy initialization of background SDKs, and shimmer skeleton layouts.",
        impact: "Cut initial JavaScript bundle weight by 45% and reduced mobile Time-to-Interactive by 1.8 seconds."
      },
      {
        problem: "Lag and performance drops when scrolling media vaults containing thousands of image & video cards.",
        solution: "Integrated TanStack Virtual with dynamic item height estimation for mobile drawers and desktop grids.",
        impact: "Maintained smooth 60fps scroll performance with constant DOM footprint of ~15 nodes regardless of list size."
      },
      {
        problem: "Handling multiple modals across different features caused z-index collisions and duplicate code.",
        solution: "Created a shared `ModalPortal` abstraction that programmatically opens and manages dialog states cleanly.",
        impact: "Streamlined modal management and eliminated modal z-index collisions across the app."
      }
    ],
    features: [
      "3D Cube Story Viewer with Gestures & NSFW gating",
      "Adaptive-Bitrate HLS Streaming Player",
      "Live Video & Audio Rooms via LiveKit",
      "Multi-Method Payment & Tokenization Engine",
      "Resumable Multi-GB S3 File Uploads via tus",
      "Real-time Chat with XMPP & Socket.IO",
      "Typed Notification System with Cloud Push",
      "Offline PWA with Service Worker Caching"
    ],
    demoType: "hls"
  },
  {
    id: "enterprise-admin-console",
    title: "Enterprise Operations & Financial Ledger Console",
    subtitle: "Internal Operations & Analytics Dashboard",
    role: "Frontend Developer",
    period: "Mar 2025 – Present",
    productType: "Internal Admin Console",
    highlightStat: "Vite + React · Fast Builds",
    stats: [
      { label: "Architecture", value: "Vite SPA" },
      { label: "Build Time Cut", value: "50%" },
      { label: "CSV Export", value: "Large Datasets" },
      { label: "RBAC Modules", value: "Role-Based Access" }
    ],
    color: "#06b6d4",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    description:
      "A fast operational administration and financial intelligence dashboard. Migrated from legacy Webpack to a Vite SPA to improve development and build times while handling high-volume transaction tables.",
    tags: ["Vite", "React 18", "React Router 7", "Material UI", "TanStack Table", "ApexCharts", "Crypto-JS"],
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
      "Set up the frontend architecture, state management with Redux, route hierarchy, and Vite build configuration.",
      "Built a role-based permission system that resolves server permission sets into client route and action guards.",
      "Built transaction search with compound multi-facet filters (agency, creator, payment gateway, status).",
      "Added client-side request/response encryption using Crypto-JS for secure API communication."
    ],
    solvedChallenges: [
      {
        problem: "Browser tabs freezing when exporting large transaction records to CSV.",
        solution: "Built a chunked stream-based data parser using `@json2csv/plainjs` without row bottlenecks.",
        impact: "Allowed seamless, crash-free CSV exports of large record sets for operations staff."
      },
      {
        problem: "Token expiration interrupting admins filling multi-step forms.",
        solution: "Implemented silent background token refresh with expiration buffer tuning.",
        impact: "Maintained continuous admin sessions with zero lost form submissions."
      }
    ],
    features: [
      "Role-Based Access Control (RBAC)",
      "Multi-Filter Transaction Ledger",
      "CSV Streaming Export Engine",
      "Earnings & Payout Analytics Graphs",
      "User Platform Fee & Badge Configuration",
      "Payload Encryption with Crypto-JS",
      "Device Session & Activity Tracking"
    ],
    demoType: "virtualization"
  },
  {
    id: "agency-b2b-portal",
    title: "B2B Multi-Tenant Talent & Agency Portal",
    subtitle: "Talent Management, Shop & Analytics Suite",
    role: "Frontend Developer",
    period: "Feb 2025 – Present",
    productType: "B2B Agency Portal",
    highlightStat: "Multi-Tenant · Virtualized UI",
    stats: [
      { label: "Talent Mapping", value: "Multi-Creator" },
      { label: "Search Latency", value: "Debounced" },
      { label: "Shop Modules", value: "E-Commerce" },
      { label: "UI Library", value: "Radix + Tailwind" }
    ],
    color: "#10b981",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    description:
      "A B2B workspace built with Vite, Radix UI, and Tailwind CSS. Enables talent agencies to manage multiple creators, coordinate employee assignments, track revenue splits, configure shop products, and send messages.",
    tags: ["Vite", "React 18", "Radix UI", "Tailwind CSS", "TanStack Virtual", "Redux Toolkit", "Lucide"],
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
      "Built multi-tenant organization models with employee role hierarchies and multi-creator assignment.",
      "Created creator invitation workflows with permission toggles and custom revenue split configurations.",
      "Built digital and physical shop module with media verification, pricing logic, and purchase chat.",
      "Integrated virtualized scrolling and debounced lookup for search lists."
    ],
    solvedChallenges: [
      {
        problem: "Revenue split calculations varied across creator contracts.",
        solution: "Built a centralized calculation engine surfacing clear breakdowns across creator and agency views.",
        impact: "Simplified monthly agency invoicing and improved payout transparency."
      }
    ],
    features: [
      "Multi-Tenant Agency & Employee Role Hierarchy",
      "Creator Invitation & Revenue Split Matrix",
      "Virtualized Agency Earnings Breakdown",
      "Digital & Physical Shop Management Suite",
      "Mass-Message History & Broadcast Retargeting",
      "Instant Creator Switcher & Permission Masks"
    ],
    demoType: "stories"
  },
  {
    id: "metaverse-3d-bridge",
    title: "Real-Time 3D Web & Metaverse Integration Platform",
    subtitle: "Browser-to-Unity 3D Bridge, WebRTC Video & Chat",
    role: "Frontend Developer",
    period: "Aug 2023 – Jan 2024",
    productType: "Metaverse Web Bridge",
    highlightStat: "Unity 3D Bridge · WebRTC Video",
    stats: [
      { label: "3D Engine", value: "Unity WebGL" },
      { label: "Protocol", value: "WebRTC + Socket.IO" },
      { label: "State Architecture", value: "RxJS Streams" },
      { label: "UI Layer", value: "Angular + Lottie" }
    ],
    color: "#ec4899",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    description:
      "A platform bridging the web browser and Unity 3D engine. Integrated bidirectional real-time WebSocket messaging, WebRTC video streaming directly into 3D virtual spaces, live event leaderboards, and chat.",
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
      "Handled the bidirectional messaging contract between Angular web layer and Unity 3D runtime using WebSocket event streams.",
      "Integrated WebRTC live streaming SDK with automated reconnection for in-world virtual screens.",
      "Built Admin Panel with graphs tracking user world entry/exit timestamps and real-time concurrency."
    ],
    solvedChallenges: [
      {
        problem: "Latency between web chat inputs and in-world 3D Unity avatars.",
        solution: "Implemented an RxJS event queue with optimistic UI state over WebSockets.",
        impact: "Reduced messaging latency to sub-20ms with smooth message delivery during crowd events."
      }
    ],
    features: [
      "Bidirectional Web-to-Unity 3D Engine Bridge",
      "In-World WebRTC Video Streaming Integration",
      "Real-time Spatial Chat & Leaderboards",
      "Metaverse Concurrency Analytics Dashboard",
      "Lottie Micro-Interactions & Responsive UI"
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Core Frontend & Frameworks",
    description: "Component architecture, responsive layouts, and modern JavaScript.",
    skills: [
      { name: "React.js", level: 95, experience: "3 years", highlight: true },
      { name: "Next.js 14", level: 92, experience: "2+ years", highlight: true },
      { name: "TypeScript", level: 90, experience: "2+ years", highlight: true },
      { name: "JavaScript (ES6+)", level: 94, experience: "3 years", highlight: true },
      { name: "Vite & React Router", level: 88, experience: "2 years", highlight: true },
      { name: "Angular & RxJS", level: 82, experience: "1.5 years" },
      { name: "HTML5 & Semantic Web", level: 96, experience: "3 years" },
      { name: "CSS3 / SASS / SCSS", level: 92, experience: "3 years" }
    ]
  },
  {
    category: "State Management & Data Layer",
    description: "Application state, caching, data tables, and form handling.",
    skills: [
      { name: "Redux Toolkit", level: 92, experience: "3 years", highlight: true },
      { name: "TanStack Query", level: 88, experience: "2 years", highlight: true },
      { name: "TanStack Table", level: 86, experience: "2 years", highlight: true },
      { name: "TanStack Virtual", level: 90, experience: "2 years", highlight: true },
      { name: "React Hook Form", level: 90, experience: "3 years" },
      { name: "Context API", level: 90, experience: "3 years" }
    ]
  },
  {
    category: "Realtime, Media & APIs",
    description: "Video playback, WebRTC rooms, WebSockets, and file uploads.",
    skills: [
      { name: "HLS.js (Adaptive Video)", level: 88, experience: "2 years", highlight: true },
      { name: "LiveKit (WebRTC Rooms)", level: 84, experience: "1.5 years", highlight: true },
      { name: "Socket.IO Client", level: 88, experience: "2.5 years", highlight: true },
      { name: "Uppy & tus (S3 Uploads)", level: 86, experience: "2 years", highlight: true },
      { name: "RESTful APIs & GraphQL", level: 90, experience: "3 years" },
      { name: "Firebase Push Notifications", level: 84, experience: "2 years" }
    ]
  },
  {
    category: "Styling & UI Components",
    description: "Design system implementation, animations, and accessible UI.",
    skills: [
      { name: "Tailwind CSS", level: 95, experience: "3 years", highlight: true },
      { name: "Framer Motion", level: 90, experience: "2 years", highlight: true },
      { name: "Radix UI Primitives", level: 88, experience: "2 years", highlight: true },
      { name: "Material UI (MUI)", level: 86, experience: "2 years" },
      { name: "Bootstrap", level: 90, experience: "3 years" },
      { name: "Lottie Animations", level: 84, experience: "2 years" }
    ]
  },
  {
    category: "Backend & Database",
    description: "Node.js services, MongoDB database, and authentication.",
    skills: [
      { name: "Node.js", level: 82, experience: "2 years" },
      { name: "Express.js", level: 82, experience: "2 years" },
      { name: "MongoDB & Mongoose", level: 82, experience: "2 years" },
      { name: "2FA / OTP Authentication", level: 88, experience: "2 years", highlight: true },
      { name: "Postman & API Testing", level: 90, experience: "3 years" }
    ]
  },
  {
    category: "Performance, Testing & Tools",
    description: "Performance optimization, testing, and modern developer workflow.",
    skills: [
      { name: "Lighthouse Optimization", level: 90, experience: "2+ years", highlight: true },
      { name: "Code Splitting & Lazy Loading", level: 92, experience: "2+ years", highlight: true },
      { name: "Vitest & React Testing Library", level: 82, experience: "1.5 years" },
      { name: "Git & GitHub Workflow", level: 92, experience: "3 years", highlight: true },
      { name: "Figma to Code", level: 92, experience: "3 years" }
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
      "Frontend engineer developing web applications across consumer platforms, internal operations dashboards, and B2B SaaS portals serving 30K+ active users.",
    responsibilities: [
      "Develop and maintain web applications using React.js, Next.js 14 App Router, TypeScript, and Tailwind CSS.",
      "Implemented payment checkout flows supporting card tokenization, wallet balance, and dynamic subscription plans.",
      "Built Stories and Media Vault features with video streaming (HLS.js), 3D carousel gestures, and TanStack Virtual rendering.",
      "Integrated LiveKit for live audio/video rooms and Socket.IO for real-time chat communication.",
      "Optimized web performance through code splitting, dynamic imports, and lazy loading, achieving Lighthouse scores above 90."
    ],
    technologies: ["React.js", "Next.js 14", "TypeScript", "Tailwind CSS", "HLS.js", "LiveKit", "Redux Toolkit", "TanStack", "Radix UI", "Vite"],
    metrics: [
      "30K+ Monthly Active Users",
      "99.9% Production Uptime",
      "40% Reduction in Initial Page Load Time",
      "3+ Web Applications Shipped"
    ]
  },
  {
    company: "INK IN CAPS",
    location: "Mumbai, Maharashtra, India",
    title: "Junior Software Development Engineer",
    period: "Aug 2023 – Aug 2024",
    type: "Full-Time",
    summary:
      "Developed responsive web applications, integrated real-time WebSocket communication, and built UI components with React, Angular, and SASS.",
    responsibilities: [
      "Built the frontend for 3D web platform in Angular, integrating WebSocket messaging with Unity runtime.",
      "Integrated WebRTC live video streaming SDK and dynamic leaderboards with Lottie animations.",
      "Built responsive UI components with SASS/SCSS, React, and Angular, ensuring cross-device compatibility.",
      "Collaborated with UI/UX designers to translate Figma designs into pixel-perfect web interfaces."
    ],
    technologies: ["React.js", "Angular", "TypeScript", "WebRTC", "Socket.IO", "RxJS", "SASS/SCSS", "Bootstrap", "Lottie"],
    metrics: [
      "15+ Responsive Web Modules Shipped",
      "Sub-20ms Messaging Latency",
      "30% Improvement in Bundle Load Speeds"
    ]
  },
  {
    company: "INK IN CAPS",
    location: "Mumbai, Maharashtra, India",
    title: "Web Developer Intern",
    period: "Jan 2023 – Jul 2023",
    type: "Internship",
    summary:
      "Assisted engineering team with frontend feature development, responsive styling, and bug fixes.",
    responsibilities: [
      "Developed responsive UI components using HTML5, CSS3, JavaScript, and React.",
      "Investigated and resolved 50+ frontend issues across desktop and mobile browsers.",
      "Applied Git version control best practices and agile sprint workflows."
    ],
    technologies: ["JavaScript (ES6+)", "HTML5", "CSS3", "React.js", "Git", "Postman"],
    metrics: [
      "50+ Bugs Resolved with Clean Code",
      "25% Improvement in User Satisfaction"
    ]
  }
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Sandip University",
    location: "Nashik, Maharashtra",
    period: "July 2023 – Feb 2026",
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

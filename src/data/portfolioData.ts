export interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  period: string;
  description: string;
  productType: "Consumer Web (PWA)" | "Internal Admin Console" | "B2B Agency Portal" | "Metaverse Platform" | "Client Website";
  status: "Live" | "Internal tool" | "Client project";
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
    role: "Lead Frontend Contributor",
    period: "Oct 2023 – Present",
    productType: "Consumer Web (PWA)",
    status: "Live",
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
      "A creator monetization platform with 30K+ users, built on Next.js 14. I have worked on it since launch and am its lead frontend contributor. I own the payments and subscription module, which handles 45K+ transactions a year, and built the Stories, Shop, Channels and Media Vault features.",
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
      "Owned checkout across four payment methods (card tokenization, iDEAL, Centrobill, Bancontact), with guest checkout, transaction cancellation and idempotent payment finalization.",
      "Built the subscription module: plan upgrades, downgrades, trials, lifetime tiers and retention offers, plus wallet, tipping and revenue-split flows.",
      "Rebuilt the Stories feed with cube navigation, adaptive bitrate for slow connections, seen-state tracking and locked states for premium content.",
      "Built Channels, Shop, Services and the Media Vault end to end, both creator side and buyer side, and shipped seasonal campaigns with their own pricing rules."
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
      "Checkout Across Four Payment Methods",
      "Subscription Plans, Upgrades, Trials & Retention Offers",
      "Stories Feed with Cube Navigation & Adaptive Bitrate",
      "Channels, Collabs & Creator Shop",
      "Services Marketplace & Media Vault",
      "Live Video & Audio Rooms via LiveKit",
      "Real-Time Chat with XMPP & Socket.IO",
      "Two-Factor Authentication over OTP",
      "Seasonal Campaigns with Campaign Pricing",
      "Offline PWA with Service Worker Caching"
    ]
  },
  {
    id: "enterprise-admin-console",
    title: "KNKY Admin Console",
    subtitle: "Internal console for transactions, payouts & access control",
    role: "Sole Frontend Engineer",
    period: "Mar 2025 – Present",
    productType: "Internal Admin Console",
    status: "Internal tool",
    highlightStat: "Sole frontend engineer · finance tooling",
    stats: [
      { label: "Role", value: "Sole frontend" },
      { label: "Builds", value: "~50% faster" },
      { label: "Access", value: "Role-based" },
      { label: "Exports", value: "Unbounded CSV" }
    ],
    color: "#06b6d4",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    description:
      "The internal console the operations and finance teams use to run KNKY: transactions, payouts, agencies, moderation and platform settings. I set the project up and have been its only frontend engineer since.",
    tags: ["React 19", "React Router 7", "TypeScript", "Material UI", "MUI X Charts", "Material React Table", "Formik"],
    techStack: [
      "React 19",
      "React Router v7",
      "TypeScript",
      "Redux Toolkit & redux-persist",
      "Material UI v6",
      "MUI X Charts",
      "Material React Table",
      "Formik & Yup",
      "Crypto-JS",
      "AWS CodeBuild"
    ],
    architecturalHighlights: [
      "Set the project up from scratch, including the AWS CodeBuild pipeline with separate test, staging and live builds.",
      "Owned the Transactions and Payout modules: overview dashboards, revenue and transaction-type charts, advanced filters, Excel export and a VAT-inclusive toggle for finance.",
      "Built the shared table and filter system behind most list pages, with server-side pagination, debounced search and filters saved in the URL so a view can be bookmarked.",
      "Built the auth layer: JWT renewal scheduled before expiry, OTP login, and AES decryption of encrypted API responses."
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
      },
      {
        problem: "Finance needed the same transaction views filtered many different ways.",
        solution: "Made the filter system configuration-driven, with multi-select, text and user-search filters stored in the URL.",
        impact: "New filter sets are configuration, not new code, and filtered views can be shared."
      }
    ],
    features: [
      "Transactions Dashboard with Revenue Charts",
      "Payout Module with Status Breakdown",
      "Role-Based Access Control (RBAC)",
      "Configuration-Driven Filter System",
      "Unbounded Excel Export",
      "VAT-Inclusive / Exclusive Toggle",
      "Agency Approval & Magic-Link Login",
      "Content Moderation & NSFW Location Controls"
    ]
  },
  {
    id: "agency-b2b-portal",
    title: "KNKY Agency Portal",
    subtitle: "B2B portal for agencies managing creators and staff",
    role: "Frontend Engineer",
    period: "Feb 2025 – Sep 2025",
    productType: "B2B Agency Portal",
    status: "Live",
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
      "A B2B dashboard where talent agencies manage their creators and staff: invitations, revenue splits, employees, earnings and content. Built with Vite, React, Radix UI and Tailwind CSS.",
    tags: ["Vite", "React 18", "Radix UI", "Tailwind CSS", "TanStack Virtual", "Redux Toolkit", "ApexCharts"],
    techStack: [
      "Vite",
      "React 18",
      "TypeScript",
      "Radix UI Primitives",
      "Tailwind CSS",
      "TanStack Virtual",
      "Redux Toolkit",
      "React Hook Form",
      "ApexCharts",
      "Crypto-JS"
    ],
    architecturalHighlights: [
      "Built the creator invitation flow with three revenue-share models, per-feature access permissions, and request bodies assembled from only what the agency selected.",
      "Built employee management with role-based routing, multi-creator assignment that diffs previous and new assignments, and one shared create/edit modal opened through a global modal service.",
      "Built the analytics and earnings pages with ApexCharts, date-range filters and an employee breakdown that still lists employees with zero earnings.",
      "Built the wallet with infinite scroll, throttled scroll handling and a transaction details view with masked card information."
    ],
    solvedChallenges: [
      {
        problem: "Revenue split calculations varied across creator contracts.",
        solution: "Moved split calculations into one shared module that shows the same breakdown in creator and agency views.",
        impact: "Simpler monthly agency invoicing and clearer payouts."
      },
      {
        problem: "Encrypted API responses would have meant changing every call site.",
        solution: "Added AES decryption inside the Axios response interceptor, returning the usual response shape.",
        impact: "Encryption landed without touching the calling code, and real error messages still reach the UI."
      }
    ],
    features: [
      "Creator Invitations with Revenue Splits",
      "Per-Feature Access Permissions",
      "Employee Management & Role-Based Access",
      "Earnings & Agency Analytics",
      "Wallet with Infinite-Scroll Transactions",
      "Creator Shop & Story Creation",
      "Channels, Collabs & Subscription Plans",
      "AES-Encrypted API Responses"
    ]
  },
  {
    id: "metaverse-3d-bridge",
    title: "Heftyverse · Metaverse Platform",
    subtitle: "Angular web layer over Unity 3D worlds, with AI and gamification",
    role: "Frontend Engineer",
    period: "Aug 2023 – Jan 2024",
    productType: "Metaverse Platform",
    status: "Live",
    highlightStat: "Angular · Unity WebGL · AI",
    stats: [
      { label: "Framework", value: "Angular" },
      { label: "3D Engine", value: "Unity WebGL" },
      { label: "AI", value: "Inworld chat & photobooth" },
      { label: "Commerce", value: "Stripe store" }
    ],
    color: "#ec4899",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    description:
      "A browser-based metaverse where users explore 3D worlds built in Unity WebGL, play challenges, earn rewards, chat with AI characters and buy real merchandise. I built the Angular layer on top of those worlds and the messaging between the web app and Unity.",
    tags: ["Angular", "Unity WebGL", "Inworld AI", "Stripe", "Socket.IO", "RxJS", "Firebase"],
    techStack: [
      "Angular 14",
      "TypeScript",
      "RxJS",
      "SCSS & Bootstrap 5",
      "Unity WebGL bridge (postMessage)",
      "Inworld AI Web SDK",
      "Stripe",
      "Socket.IO",
      "Firebase",
      "Google Analytics & GTM"
    ],
    architecturalHighlights: [
      "Built the two-way messaging contract between the Angular app and the Unity 3D runtime, and integrated four Unity worlds including an avatar world and a virtual plant ecosystem.",
      "Integrated the Inworld AI Web SDK so users chat in real time with AI characters, and built an AI photobooth around a generated-image service.",
      "Built the gamification stack: rewards and badges, Spin the Wheel with coupon claiming, leaderboard, bonus hours, XP and coin animations, and referrals.",
      "Built the in-world merchandise store with cart, address management, guest checkout and Stripe payments."
    ],
    solvedChallenges: [
      {
        problem: "Chat messages lagged before showing up on avatars in the 3D world.",
        solution: "Queued events with RxJS and updated the UI optimistically while messages went over WebSockets.",
        impact: "Chat feels instant to users, even during crowded live events."
      },
      {
        problem: "Guests who played challenges lost the rewards they had earned when they signed up.",
        solution: "Held guest progress and replayed the reward calls once the account existed.",
        impact: "Guests keep their XP and rewards after logging in, so the funnel stops leaking."
      }
    ],
    features: [
      "Two-Way Web ↔ Unity Messaging",
      "Inworld AI Conversational Characters",
      "AI Photobooth with Generated Images",
      "Spin the Wheel, Leaderboard & Bonus Hours",
      "Rewards, Badges & Referrals",
      "In-World Store with Stripe Checkout",
      "Avatar Customization Across Worlds",
      "Google OAuth, GA, GTM & Meta Pixel"
    ]
  },
  {
    id: "digital-bharat-collaborative",
    title: "Digital Bharat Collaborative",
    subtitle: "Healthcare non-profit site with an interactive India map",
    role: "Lead Developer",
    period: "2023",
    productType: "Client Website",
    status: "Live",
    highlightStat: "Angular · GSAP · 16-state map",
    stats: [
      { label: "Role", value: "Lead developer" },
      { label: "States Mapped", value: "16" },
      { label: "Animation", value: "GSAP ScrollTrigger" },
      { label: "Client", value: "Piramal Swasthya" }
    ],
    color: "#f59e0b",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    description:
      "The website for Digital Bharat Collaborative, part of Piramal Swasthya, which uses technology to bring healthcare to underserved populations across 16 Indian states. I was the lead developer and built the site from the designs up.",
    tags: ["Angular 15", "TypeScript", "GSAP", "ScrollTrigger", "Swiper", "Bootstrap"],
    techStack: [
      "Angular 15",
      "TypeScript",
      "GSAP + ScrollTrigger",
      "Swiper",
      "Bootstrap",
      "REST APIs"
    ],
    architecturalHighlights: [
      "Built every page from scratch: home, about, news, blogs, case studies, resources and event details, with a navbar that changes with the page.",
      "Integrated an interactive map of India showing programme information for 16 states, with info popups, map controls and a mobile landscape mode.",
      "Built the scroll animations, animated counters and data ticker with GSAP ScrollTrigger.",
      "Optimized assets and refactored the home page, moving media to static content."
    ],
    solvedChallenges: [
      {
        problem: "An interactive state-wise map of India is hard to use on a phone.",
        solution: "Built a landscape-only mode for mobile with its own controls and a loading screen.",
        impact: "The map stayed usable on phones instead of being dropped from the mobile site."
      }
    ],
    features: [
      "Interactive 16-State Programme Map",
      "GSAP Scroll Animations & Counters",
      "Case Studies & Blog System",
      "Leadership & Partners Sections",
      "Fully Responsive Page Set"
    ]
  }
];

export interface EarlierProject {
  title: string;
  org: string;
  period: string;
  status: "Live" | "Internal tool" | "Client project";
  summary: string;
  tech: string[];
}

export const EARLIER_WORK: EarlierProject[] = [
  {
    title: "Heftyverse Admin Panel",
    org: "Ink In Caps",
    period: "2023 – 2024",
    status: "Internal tool",
    summary:
      "The CMS and analytics dashboard behind Heftyverse: events, spin-wheel configuration, coupons, bonus hours, inventory and games, with Chart.js analytics and Excel export.",
    tech: ["Angular 13", "Chart.js", "SheetJS", "JWT auth"]
  },
  {
    title: "Club Mahindra vRetail",
    org: "Ink In Caps",
    period: "2023",
    status: "Client project",
    summary:
      "A virtual resort showcase where prospective members explore resorts, experiences and membership plans. I was the top contributor, building the UI from the designs plus resort maps, filters and the membership questionnaire.",
    tech: ["Angular 15", "Maptalks", "Glide.js", "Bootstrap"]
  },
  {
    title: "Ink In Caps Website",
    org: "Ink In Caps",
    period: "2023",
    status: "Live",
    summary:
      "The company's Gatsby site. I handled technical SEO, including JSON-LD schema, canonical tags, the sitemap and Search Console setup, added GTM, and published around 40 blog posts.",
    tech: ["Gatsby", "Styled Components", "GSAP", "Technical SEO"]
  },
  {
    title: "Wata",
    org: "Ink In Caps",
    period: "2023",
    status: "Client project",
    summary:
      "A scroll-driven storytelling site for a sustainable water brand, raising awareness of ocean plastic. I built the scroll animations across the site.",
    tech: ["Angular 12", "GSAP ScrollTrigger", "Swiper"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend",
    description: "The frameworks I build products in, day to day.",
    skills: [
      { name: "React", experience: "3 years", highlight: true },
      { name: "Next.js (App Router)", experience: "3 years", highlight: true },
      { name: "TypeScript", experience: "3 years", highlight: true },
      { name: "JavaScript (ES6+)", experience: "3.5 years", highlight: true },
      { name: "Angular & RxJS", experience: "2 years" },
      { name: "Semantic HTML & CSS", experience: "3.5 years" }
    ]
  },
  {
    category: "Payments & Monetization",
    description: "Checkout, subscriptions and the money flows behind them.",
    skills: [
      { name: "Multi-Gateway Checkout", experience: "2 years", highlight: true },
      { name: "Card Tokenization", experience: "2 years", highlight: true },
      { name: "Subscription & Billing Flows", experience: "2 years", highlight: true },
      { name: "Wallet, Payouts & Revenue Splits", experience: "2 years", highlight: true },
      { name: "Stripe", experience: "1 year" },
      { name: "iDEAL, Bancontact & Centrobill", experience: "1 year" }
    ]
  },
  {
    category: "Media & Streaming",
    description: "Video playback, live rooms and 3D integration.",
    skills: [
      { name: "HLS.js (Adaptive Bitrate)", experience: "2 years", highlight: true },
      { name: "LiveKit (WebRTC Rooms)", experience: "1.5 years", highlight: true },
      { name: "Unity WebGL Bridge", experience: "1 year", highlight: true },
      { name: "Uppy & tus (Resumable Uploads)", experience: "2 years" },
      { name: "Socket.IO & XMPP", experience: "2.5 years" },
      { name: "Firebase Push Notifications", experience: "2 years" }
    ]
  },
  {
    category: "State & Data",
    description: "Application state, server data, tables and forms.",
    skills: [
      { name: "Redux Toolkit", experience: "3 years", highlight: true },
      { name: "TanStack Query", experience: "2 years", highlight: true },
      { name: "TanStack Virtual", experience: "2 years", highlight: true },
      { name: "TanStack Table & Material React Table", experience: "2 years" },
      { name: "React Hook Form", experience: "3 years" },
      { name: "Formik & Yup", experience: "1.5 years" }
    ]
  },
  {
    category: "Styling & UI",
    description: "Design systems, component libraries and animation.",
    skills: [
      { name: "Tailwind CSS", experience: "3 years", highlight: true },
      { name: "Radix UI & shadcn", experience: "2 years", highlight: true },
      { name: "Material UI", experience: "2 years" },
      { name: "Framer Motion", experience: "2 years" },
      { name: "GSAP & ScrollTrigger", experience: "1 year" },
      { name: "SCSS & Bootstrap", experience: "3 years" }
    ]
  },
  {
    category: "Performance & Tooling",
    description: "Keeping apps fast, and the tools around them.",
    skills: [
      { name: "List Virtualization", experience: "2 years", highlight: true },
      { name: "Code Splitting & Dynamic Imports", experience: "2+ years", highlight: true },
      { name: "Vite, Webpack & Gatsby", experience: "2 years" },
      { name: "Technical SEO & Schema Markup", experience: "1.5 years" },
      { name: "Analytics (GA, GTM, Amplitude, PostHog)", experience: "2 years" },
      { name: "Git, CI/CD & AWS CodeBuild", experience: "3 years" }
    ]
  },
  {
    category: "Backend Basics",
    description: "Enough to work well with the people who own the API.",
    skills: [
      { name: "REST API Integration", experience: "3.5 years", highlight: true },
      { name: "Node.js & Express", experience: "2 years" },
      { name: "MongoDB", experience: "2 years" },
      { name: "2FA / OTP Authentication", experience: "2 years" },
      { name: "AES Payload Encryption", experience: "1 year" }
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
      "Owned KNKY's payments and subscription module, handling 45K+ transactions a year: checkout across four payment methods, card tokenization, plan upgrades, trials and lifetime tiers, plus wallet, tipping and revenue splits.",
      "Built the Stories, Channels, Shop and Media Vault features, including a Stories feed with cube navigation, adaptive bitrate playback and seen-state tracking.",
      "Built the KNKY Admin Console as its only frontend engineer, including the transactions and payout modules the finance team uses, and a reusable table and filter system.",
      "Built the agency portal's invitation, revenue-split, employee management and analytics flows.",
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
      "Angular years: a metaverse platform built over Unity 3D worlds, its admin CMS, and client websites for healthcare, hospitality and consumer brands.",
    responsibilities: [
      "Built the Angular web layer over Unity 3D worlds, including the two-way messaging contract, AI chat characters, an AI photobooth, rewards and an in-world store with Stripe.",
      "Built the CMS and analytics dashboard behind that platform: events, spin-wheel configuration, coupons, bonus hours, inventory and Excel export.",
      "Was lead developer on the Digital Bharat Collaborative site for Piramal Swasthya, including an interactive map showing programme information across 16 states.",
      "Built a virtual resort showcase for Club Mahindra as its top contributor, and scroll-driven GSAP animations for brand sites.",
      "Handled technical SEO on the company website, including schema markup, canonical tags, sitemap and Search Console, and published around 40 blog posts."
    ],
    technologies: ["Angular", "TypeScript", "RxJS", "Unity WebGL", "GSAP", "Stripe", "Chart.js", "Socket.IO", "SASS/SCSS", "Gatsby"],
    metrics: [
      "Lead developer on a 16-state healthcare site",
      "Top contributor on the Club Mahindra build",
      "Four Angular products shipped in a year"
    ]
  },
  {
    company: "INK IN CAPS",
    location: "Mumbai, Maharashtra, India",
    title: "Web Developer Intern",
    period: "Jan 2023 – Jul 2023",
    type: "Internship",
    summary:
      "Joined with no professional experience and was converted to full-time after seven months.",
    responsibilities: [
      "Started on production work early: updating an admin panel and integrating REST APIs in an existing Angular codebase.",
      "Developed responsive UI components using HTML5, CSS3, JavaScript and Angular.",
      "Fixed frontend bugs across desktop and mobile browsers.",
      "Worked in agile sprints with a Git-based workflow."
    ],
    technologies: ["JavaScript (ES6+)", "HTML5", "CSS3", "Angular", "Bootstrap", "Git", "Postman"],
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

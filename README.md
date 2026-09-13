# Roshan Thore — Senior Frontend Engineer & Web Architect Portfolio

An ultra-modern, high-performance developer portfolio built with **Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, and Framer Motion**.

Featuring real-world production architectures across creator media streaming platforms, internal financial consoles, and B2B SaaS portals serving 30K+ active users.

---

## ✨ Features & Architecture

- **Interactive Ambient Canvas & Cyber Glow**: Mouse-tracking radial glow and animated cyber mesh background.
- **`Cmd+K` / `Ctrl+K` Command Palette**: Keyboard-navigable quick command palette for instant navigation, actions, and easter eggs.
- **Flagship Products & Architecture Deep-Dives**:
  - *Creator Streaming & Monetization Platform* (Next.js 14 App Router, HLS Adaptive Streaming, LiveKit WebRTC, 3D Stories, Multi-gateway checkout)
  - *Enterprise Operations & Financial Ledger Console* (Sole Frontend Architecture, Vite SPA, Granular RBAC, Unbounded CSV Streaming)
  - *B2B Multi-Tenant Talent & Agency Portal* (Vite, Radix UI, Multi-tenant Talent Management, Shop Module)
  - *Real-Time 3D Web & Metaverse Integration Engine* (Angular, Unity 3D runtime bridge, WebRTC live video)
- **Interactive Live Architecture Simulators**:
  1. *Adaptive HLS Bitrate Stream Simulator* (simulated network throttling and ABR rendition switching)
  2. *3D Gesture Stories Subsystem* (Mobile preview with timers, NSFW blur gating, and touch gestures)
  3. *Virtualized List Benchmark* (real TanStack Virtual vs plain DOM comparison, up to 25,000 rows, measured in the browser)
- **Technical Skills Matrix**: Categorized tech stack with progress meters and stack filters.
- **Interactive Developer CLI Terminal**: Built-in terminal emulator with interactive commands (`skills`, `projects`, `stats`, `contact`, `sudo hire`, `clear`).
- **Direct Contact & Download**: Direct 1-click copy for email/phone, celebratory confetti, and verified PDF resume download.
- **Live IST Clock**: Real-time timezone clock for Mumbai/India.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Production Build & Test
```bash
npm run build
npm run start
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router & Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Glassmorphism + Cyber-clean themes
- **Animations & Motion**: Framer Motion
- **Icons**: Lucide Icons & Custom SVG components
- **Effects**: Canvas Confetti
- **Deployment Ready**: Vercel / Netlify / Cloudflare Pages

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── profile.jpg               # Profile image (converted from HEIC)
│   └── Roshan-Thore-Resume.pdf   # Direct downloadable PDF resume
├── src/
│   ├── app/
│   │   ├── globals.css           # Cyber-clean styles & animations
│   │   ├── layout.tsx            # SEO metadata & fonts
│   │   └── page.tsx              # Main portfolio single-page application
│   ├── components/
│   │   ├── AmbientBackground.tsx # Mouse-following spotlight & ambient glow
│   │   ├── CommandPalette.tsx    # Cmd+K interactive quick launcher
│   │   ├── ContactSection.tsx    # Direct contact form & copyable details
│   │   ├── ExperienceSection.tsx # Career timeline & education
│   │   ├── Footer.tsx            # Footer & live Mumbai clock
│   │   ├── Hero.tsx              # Hero section, typewriter roles, stats
│   │   ├── Icons.tsx             # Brand SVG icons (GitHub, LinkedIn)
│   │   ├── InteractiveSimulators.tsx # HLS, 3D Stories & Virtualization
│   │   ├── Navbar.tsx            # Glassmorphism header & navigation
│   │   ├── ProjectModal.tsx      # In-depth architectural inspection modal
│   │   ├── ProjectsSection.tsx   # Flagship product showcases
│   │   ├── SkillsSection.tsx     # Filterable technical skills matrix
│   │   └── TerminalSection.tsx   # Interactive CLI terminal
│   └── data/
│       └── portfolioData.ts      # Central data store for all portfolio content
├── package.json
└── tsconfig.json
```

---

## 🌐 Deploy to Vercel

The easiest way to deploy your portfolio is using [Vercel](https://vercel.com):

1. Push your repository to GitHub:
```bash
git init
git add .
git commit -m "feat: initial commit for Roshan Thore portfolio"
git branch -M main
git remote add origin https://github.com/Roshan2805/roshan-thore-portfolio.git
git push -u origin main
```
2. Import your GitHub repository to [Vercel](https://vercel.com/new).
3. Click **Deploy**. Vercel will automatically build and deploy your site with zero config.

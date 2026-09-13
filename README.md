# Roshan Thore · Portfolio

Personal site of Roshan Thore, frontend engineer at INK IN CAPS. It covers the products I've worked on (KNKY, its admin console and agency portal, and Heftyverse), a few interactive demos, and how to get in touch.

## What's on the site

- **Projects**, each with a details view: what I built, problems I solved, and the stack
- **Interactive demos**
  - Adaptive bitrate streaming (simulated): change the network speed and see which rendition a player picks
  - Stories viewer (simulated): tap through stories, pause, and reveal gated content
  - Virtualization benchmark (real): TanStack Virtual against a plain list of up to 25,000 rows, timed in your browser
- **Command palette**: press ⌘K or Ctrl+K to jump anywhere
- **Terminal**: try `help`, `projects`, or `sudo hire`
- Skills, experience, education, and a contact form that opens your email app

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, TanStack Virtual.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` creates a production build. GitHub Actions runs lint and build on every push to `main` and on pull requests.

## Project structure

```
portfolio/
├── .github/workflows/ci.yml        # Lint and build
├── public/
│   ├── profile.jpg                 # Profile photo
│   └── Roshan-Thore-Resume.pdf     # Resume
├── src/
│   ├── app/
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Metadata, fonts, JSON-LD
│   │   ├── page.tsx                # Home page
│   │   ├── robots.ts               # robots.txt
│   │   └── sitemap.ts              # sitemap.xml
│   ├── components/
│   │   ├── AmbientBackground.tsx   # Background grid and cursor glow
│   │   ├── CommandPalette.tsx      # ⌘K command palette
│   │   ├── ContactSection.tsx      # Contact details and email form
│   │   ├── ExperienceSection.tsx   # Work history and education
│   │   ├── Footer.tsx              # Footer with Mumbai clock
│   │   ├── Hero.tsx                # Intro, profile card, stats
│   │   ├── Icons.tsx               # GitHub and LinkedIn icons
│   │   ├── InteractiveSimulators.tsx  # Demo tabs
│   │   ├── Navbar.tsx              # Header and navigation
│   │   ├── ProjectModal.tsx        # Project details
│   │   ├── ProjectsSection.tsx     # Project cards
│   │   ├── SkillsSection.tsx       # Searchable skills
│   │   ├── TerminalSection.tsx     # Interactive terminal
│   │   └── VirtualizationBenchmark.tsx  # Real virtualization benchmark
│   ├── data/
│   │   └── portfolioData.ts        # All site content
│   ├── hooks/
│   │   └── useDialog.ts            # Focus trap and scroll lock
│   └── lib/
│       └── confetti.ts             # Lazy-loaded confetti
├── package.json
└── tsconfig.json
```

## Deploying

The site builds to static pages, so it deploys to Vercel with no extra setup: import the repository at https://vercel.com/new and deploy. Once you have the final URL, set `siteUrl` in `src/data/portfolioData.ts` so the canonical link, sitemap, and share previews point to it.

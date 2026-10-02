# Roshan Thore · Portfolio

Personal site of Roshan Thore, frontend engineer at Ink In Caps.

## What's on the site

- **A 30-second intro** on a first visit: eight milestones, from a 52% in 12th to frontend engineer, drawn with one set of particles that rearranges for each step. It can be skipped, plays once, and can be replayed from the page.
- **The portfolio**: overview, about, experience, three projects in detail, skills, education and contact.

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, three.js, Framer Motion.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` creates a production build. GitHub Actions runs lint and build on every push to `main` and on pull requests.

## Project structure

```
portfolio/
├── .github/workflows/ci.yml     # Lint and build
├── public/                      # Resume PDF, share image
├── resume/                      # Resume source (HTML) and fonts
└── src/
    ├── app/
    │   ├── globals.css          # Colors, type and the few shared styles
    │   ├── layout.tsx           # Metadata, fonts, JSON-LD, first-visit check
    │   └── page.tsx             # Home page
    ├── components/
    │   ├── Intro.tsx            # Intro overlay: timing, text, controls
    │   ├── IntroScene.tsx       # three.js particles that form each milestone
    │   ├── ReplayJourney.tsx    # Button that plays the intro again
    │   ├── Nav.tsx
    │   ├── Hero.tsx
    │   ├── About.tsx
    │   ├── Experience.tsx
    │   ├── Projects.tsx
    │   ├── ProjectFigure.tsx    # The small diagram beside each project
    │   ├── Skills.tsx           # Skills and education
    │   └── Contact.tsx          # Contact and footer
    ├── data/
    │   ├── journeyData.ts       # The eight intro milestones
    │   └── portfolioData.ts     # All other site content
    └── lib/
        └── journey.ts           # Whether the intro is playing, and the seen flag
```


## Deploying

The site builds to static pages, so it deploys to Vercel with no extra setup: import the repository at https://vercel.com/new and deploy. Once you have the final URL, set `siteUrl` in `src/data/portfolioData.ts` so the canonical link, sitemap, and share previews point to it.

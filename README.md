# Roshan Thore · Portfolio

Personal site of Roshan Thore, frontend engineer at Ink In Caps.

## What's on the site

The page is one continuous scroll that tells how I got here and what I've built.

- **A short intro** on a first visit (about eight seconds, skippable). Its last frame draws my name in particles exactly where the page's headline is, and the page takes over from there.
- **The story**, pinned while you scroll: a guess at a website, a commerce ledger, the first code, an interface, a product.
- **The work**: KNKY opens from a small window to the full screen and steps through Stories, checkout and the results, with previews you can use. The admin console and agency portal follow in a horizontal run.
- **Experience, skills, about and contact**, each with its own layout.

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion for the scroll-driven parts, Lenis for smooth scrolling, three.js for the intro only.

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
    │   ├── Intro.tsx            # Intro overlay and its timing
    │   ├── IntroScene.tsx       # three.js particles, ending on the hero's name
    │   ├── SmoothScroll.tsx     # Lenis
    │   ├── Nav.tsx
    │   ├── Hero.tsx
    │   ├── KineticName.tsx      # The headline name
    │   ├── Story.tsx            # Pinned story sequence
    │   ├── KnkyCase.tsx         # Expanding case study
    │   ├── MoreWork.tsx         # Horizontal run of the other projects
    │   ├── previews/            # The interactive sketches inside the projects
    │   ├── Experience.tsx
    │   ├── Decisions.tsx        # Problems and fixes per project
    │   ├── Skills.tsx
    │   ├── Education.tsx
    │   ├── About.tsx
    │   └── Contact.tsx
    ├── data/
    │   ├── journeyData.ts       # Intro beats and story steps
    │   └── portfolioData.ts     # All other site content
    └── lib/
        ├── journey.ts           # Whether the intro is playing, and the seen flag
        └── useDesktop.ts        # Pinned layouts are desktop only
```



## Deploying

The site builds to static pages, so it deploys to Vercel with no extra setup: import the repository at https://vercel.com/new and deploy. Once you have the final URL, set `siteUrl` in `src/data/portfolioData.ts` so the canonical link, sitemap, and share previews point to it.

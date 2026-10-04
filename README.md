# Roshan Thore · Portfolio

Personal site of Roshan Thore, frontend engineer at Ink In Caps.

## What's on the site

One continuous scroll, in the order the story happened.

- **A short intro** on a first visit (about eight seconds, skippable). Its last frame draws my name in particles exactly where the headline sits, and the page takes over.
- **The story**, in five pinned chapters: a kid curious about computers, an education that went another way (Science, 52%, B.Com), finding code through a friend in lockdown and learning it properly (the one loud moment), then work, a part-time MCA, and today.
- **The work**: KNKY opens from a small window to the full screen, with the Stories and checkout flows animated and usable. The admin console and agency portal follow in a horizontal run.
- **Education and work on one timeline**, with a playhead that moves through the years as you scroll.
- **Skills, how I work** (each principle tied to something I actually fixed), a band of what I do outside work that speeds up with your scroll, and **an ending** that replays the whole path in five lines.

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
    │   ├── Intro.tsx, IntroScene.tsx   # Intro overlay and its three.js particles
    │   ├── SmoothScroll.tsx            # Lenis, plus eased section links
    │   ├── Cursor.tsx                  # Pointer dot that opens over previews
    │   ├── Nav.tsx
    │   ├── Hero.tsx, KineticName.tsx, RotatingLine.tsx
    │   ├── Story.tsx                   # The story: early chapters, discovery, later chapters
    │   ├── KnkyCase.tsx, Flow.tsx      # Expanding case study and its flows
    │   ├── MoreWork.tsx                # Horizontal run of the other projects
    │   ├── previews/                   # The interactive sketches
    │   ├── Path.tsx                    # Education and work timeline
    │   ├── Skills.tsx
    │   ├── Thinking.tsx                # How I work
    │   ├── Outside.tsx                 # Scroll-speed band
    │   ├── Ending.tsx
    │   └── Contact.tsx
    ├── data/
    │   ├── journeyData.ts       # Intro beats and story steps
    │   └── portfolioData.ts     # All other site content
    └── lib/
        ├── journey.ts           # Whether the intro is playing, and the seen flag
        ├── useDesktop.ts        # Pinned layouts are desktop only
        └── useMotionState.ts    # React state read from a scroll position
```



## Deploying

The site builds to static pages, so it deploys to Vercel with no extra setup: import the repository at https://vercel.com/new and deploy. Once you have the final URL, set `siteUrl` in `src/data/portfolioData.ts` so the canonical link, sitemap, and share previews point to it.

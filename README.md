# SPKATAGERI — Santhosh Katageri

Personal technology portfolio: **AI · DevOps · Software · Systems**.
Built with Next.js (App Router), TypeScript and plain CSS Modules — no UI kit,
no animation library, no web-font requests.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static production build
npm run typecheck
```

## Updating the site

**All content lives in [`content/site.ts`](content/site.ts).** No component
hard-codes biography, employment, project or skill facts, so the site can be
updated without touching the design.

The shape of every field is documented in [`content/types.ts`](content/types.ts):

| Key                | Renders in                | Empty behaviour                   |
| ------------------ | ------------------------- | --------------------------------- |
| `profile`          | Hero, About, Footer, SEO  | required                          |
| `experience[]`     | Engineering experience    | honest empty state                |
| `projects[]`       | Things I've built         | honest empty state                |
| `skills[]`         | What I work with          | honest empty state                |
| `education[]`      | About sidebar             | block hidden                      |
| `certifications[]` | About sidebar             | block hidden                      |
| `links[]`          | Contact + Footer          | "Public profiles coming soon."    |
| `recognitions[]`   | About sidebar             | block hidden                      |
| `experiments[]`    | SPKATAGERI Lab            | falls back to `labTracks[]` cards |
| `labTracks[]`      | Lab placeholder cards     | —                                 |
| `articles[]`       | Notes & insights          | honest empty state                |

### Content rules baked into this repo

* Only add entries supported by the résumé or by information Santhosh supplies.
* Never invent metrics, clients, dates, certifications or links.
* Leave an array empty rather than guessing — every section has a designed
  empty state, so an incomplete site still looks finished.
* Do not publish private contact details, employer-confidential material,
  internal architecture, or credentials.

### Adding a project

```ts
projects: [
  {
    id: 'pipeline-automation',
    name: 'Project name',
    description: 'One line describing what it is.',
    category: 'DevOps',
    period: '2025',
    context: 'The problem it addressed.',
    built: ['What was actually built.'],
    outcomes: ['Only if the result was really measured.'],
    technologies: ['Docker', 'GitHub Actions'],
    link: { label: 'View repository', href: 'https://…' },
    visual: 'pipeline',   // graph | pipeline | grid | stack
    featured: true,       // full-width card
  },
],
```

Project artwork is generated as abstract SVG diagrams (`ProjectVisual`) — there
are no fake product screenshots. Drop in real images later if you have them.

## Current content status

Populated from the résumé: `profile`, `experience[]` (Oracle, Zynga, Mindtree),
`projects[]` (four, all derived from résumé work), `skills[]`, `education[]`,
`recognitions[]`, `links[]` (LinkedIn, GitHub).

Still empty by design: `certifications[]` (none in the résumé), `experiments[]`
and `articles[]` (nothing published yet — the Lab shows planned tracks and Notes
shows an empty state).

**Deliberately excluded from this public site:** personal phone number,
referees' names/emails/phone numbers, and any employer-internal or proprietary
detail. Public email is not published because no public address was supplied —
add one to `links[]` as `{ kind: 'email', href: 'mailto:…' }` when ready.

## Structure

```
app/
  layout.tsx        metadata, fonts, global CSS
  page.tsx          homepage composition (sections only)
  globals.css       design tokens, base layer, utilities
  page.module.css   section layout
  not-found.tsx     404
  robots.ts sitemap.ts
components/
  Hero, SystemGraph, SectionHeading, ProjectCard, ProjectVisual,
  ExperienceTimeline, SkillGroup, LabExperiment, ArticleCard,
  SocialLink, EmptyState, Pillars, Reveal, SiteHeader, SiteFooter
content/
  types.ts          content model
  site.ts           single source of truth
```

## Configuration

* Canonical URL / Open Graph base: `profile.siteUrl` in `content/site.ts`.
* Favicon: `public/favicon.svg`.
* Typography uses the platform UI + mono stacks. To switch to a hosted face,
  add `next/font` in `app/layout.tsx` and point `--font-sans` / `--font-mono`
  at it in `app/globals.css`.

## Accessibility & motion

Semantic landmarks, skip link, visible focus rings, `aria-current` on the
active nav item, labelled sections, WCAG AA text contrast, and a full
`prefers-reduced-motion` path that disables reveals, flows and pulses.

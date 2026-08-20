# SPKATAGERI — personal engineering platform

**AI · DevOps · Software · Systems** — the home of what Santosh Katageri
builds, knows, is exploring, and writes about.

Portfolio + engineering blog + experimentation lab in one cohesive site.
Built with Next.js (App Router), TypeScript, CSS Modules, GSAP and
Framer Motion. Dark-only, editorial, statically exported for Cloudflare.

```
/         Home      cinematic hero, selected work, latest writing,
                    labs, current exploration, experience, contact
/work     Work      professional projects in a bento layout
/writing  Writing   technical articles + the KernelBites series
/labs     Labs      experiments, prototypes, technical investigations
/about    About     story, experience, skills, education, recognition
/resume   Résumé    printable résumé (Print / Save PDF)
```

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static production build → out/
npm run typecheck
```

`npm run build` uses `output: 'export'` and produces the `out/` directory —
deploy it to Cloudflare Pages (or any static host) as-is.

## Content architecture

Content stays separate from presentation. Two places, both data:

| Source                   | Owns                                                       |
| ------------------------ | ---------------------------------------------------------- |
| `content/site.ts`        | the person: profile, experience, projects, skills, education, recognition, links, experiments, lab tracks, explorations, principles |
| `content/writing.ts`     | the writing system: categories and content series (KernelBites) |
| `content/articles/*.mdx` | article bodies with frontmatter (see that folder's README) |

Types live in `content/types.ts`. No component hard-codes biography,
employment, project or skill facts.

### Content rules baked into this repo

* Only add entries supported by the résumé or by information Santosh supplies.
* Never invent metrics, clients, dates, certifications or links.
* Leave an array empty rather than guessing — every section has a designed
  empty state, so an incomplete site still looks finished.
* Writing: no filler articles. The empty state is the honest state.
* Labs: `experiments[]` stays empty until an experiment is real (code, a
  write-up, or a working prototype).
* Do not publish private contact details, employer-confidential material,
  internal architecture, or credentials.

### Adding a project

Projects are professional work — add to `projects[]` in `content/site.ts`:

```ts
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
  link: { label: 'View repository', href: 'https://…' }, // only if public
  visual: 'pipeline',   // graph | pipeline | grid | stack
  featured: true,       // full-width bento card
}
```

Project artwork is generated as abstract SVG diagrams (`ProjectVisual`) — no
fake screenshots.

### Adding an experiment (Labs)

Same idea in `experiments[]` — every field beyond title/summary/status/tags is
optional and should only be filled when honest (links only when public):

```ts
{
  id: 'agent-eval-harness',
  title: 'Agent eval harness',
  summary: 'What it is, one line.',
  status: 'in-progress',        // planned | in-progress | published
  track: 'ai-experiments',      // a labTracks id
  why: 'The question behind it.',
  learned: 'What it actually taught — once it did.',
  technologies: ['Python', 'Golang'],
  github: 'https://github.com/santoshkatageri/…',   // only if public
  demo: 'https://…',                                 // only if live
  tags: ['ai', 'evals'],
}
```

### Adding an article (Writing)

Drop an `.mdx` file into `content/articles/` — see
[`content/articles/README.md`](content/articles/README.md) for frontmatter.
No UI changes needed. Categories and series live in `content/writing.ts`;
KernelBites is a series there (`series: kernelbites` + `seriesSlot: "#01"` in
frontmatter), not a separate site.

## Structure

```
app/
  layout.tsx              metadata, self-hosted fonts, shared header/footer
  template.tsx            route transition (Framer Motion)
  page.tsx                homepage composition
  work/ writing/ labs/ about/ resume/     route pages
  writing/[slug]/         article pages (generateStaticParams + MDX)
  globals.css             design tokens, base layer, utilities
components/
  Hero, Marquee, SystemGraph, SiteHeader, SiteFooter, Reveal,
  PageHeader, SectionHeading, ProjectCard, ProjectVisual,
  ExperienceTimeline, SkillGroup, Pillars, ExplorationList,
  LabExperiment, ArticleCard, ArticleCardMini, SeriesCard,
  SocialLink, EmptyState, MotionProvider, PrintButton,
  articleMdxComponents + ArticleBody (MDX styling)
content/
  site.ts types.ts        single source of truth + content model
  writing.ts              categories & series
  articles/               .mdx article bodies
lib/
  articles.ts             build-time article loader (fs + gray-matter)
  nav.ts                  route structure
mdx-components.tsx         global MDX component mapping
```

## Motion

Restrained, purposeful, and always cleaned up:

* **GSAP** — hero entrance (masked display lines), principles marquee,
  desktop-only hero parallax via ScrollTrigger. Every effect runs inside
  `gsap.context()` and is reverted on unmount; all of it is skipped under
  `prefers-reduced-motion`.
* **Framer Motion** — section reveals (`Reveal`), route transitions
  (`template.tsx`), mobile menu, via `MotionConfig reducedMotion="user"`.

## Fonts

Inter Variable + Instrument Serif, self-hosted through `@fontsource`
packages — no runtime web-font requests, fully static-export friendly.

## Accessibility

Semantic landmarks, skip link, visible focus rings, `aria-current` on the
active nav item, labelled sections, WCAG AA text contrast, and a full
`prefers-reduced-motion` path that disables reveals, flows, pulses and the
marquee.

## Deployment

`npm run build` → `out/`. Point Cloudflare Pages (build command
`npm run build`, output directory `out`) at the repo. No server runtime, no
environment variables, no external services.

**Deliberately excluded from this public site:** personal phone number,
referees' names/emails/phone numbers, and any employer-internal or
proprietary detail. Public email is not published because no public address
was supplied — add one to `links[]` as `{ kind: 'email', href: 'mailto:…' }`
when ready.

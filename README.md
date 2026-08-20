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

Content stays separate from presentation:

| Source                   | Owns                                                       |
| ------------------------ | ---------------------------------------------------------- |
| `content/site.ts`        | the person: profile, experience, projects, skills, education, recognition, links, experiments, lab tracks, explorations, principles |
| `content/writing.ts`     | the writing taxonomy: categories and content series (KernelBites) — canonical for **both** article sources |
| `content/articles/*.mdx` | article bodies with frontmatter — the default source (see that folder's README) |
| Ghost (optional)         | article bodies when headless mode is enabled — see below |

Types live in `content/types.ts`. No component hard-codes biography,
employment, project or skill facts.

### Writing sources: MDX (default) or Ghost (headless CMS)

`lib/articles.ts` is the one interface pages consume. Behind it, the article
source is selected at build time:

- **No configuration** → MDX files in `content/articles/`.
- **`GHOST_API_URL` + `GHOST_CONTENT_API_KEY` set** → Ghost Content API
  becomes the source of truth for published writing (MDX files are ignored).

Both produce the same `WritingArticle[]`, so no UI changes with the source.

```
GitHub (design, portfolio/labs content, taxonomy)
   │
   ▼
Cloudflare Pages build ── fetch at build time ──► Ghost Content API
   │                                                (Ghost(Pro)/self-hosted,
   ▼                                                 Private Site Mode)
out/ served by Cloudflare CDN  ◄── publish webhook ── Ghost → Deploy Hook
```

**Ghost tag conventions** (taxonomy ids live in `content/writing.ts` and are
validated at build — a post with no/unknown category fails the build):

| Meaning | Tag in Ghost | Example |
| --- | --- | --- |
| Category | public tag, slug = category id | `system-design` |
| Series | public tag, slug = series id | `kernelbites` |
| Series slot | internal tag | `#slot-01` → renders as `#01` |
| Free-form tags | any other public tags | `Terraform` |

**Resilience:** every successful Ghost fetch is cached to
`.ghost-cache.json` (gitignored). If Ghost is unreachable during a build, the
cache is reused with a warning; with no cache the build **fails on purpose**
so Cloudflare keeps serving the last good deployment instead of a site with
its articles missing.

**Drafts:** the Content API never returns drafts or scheduled posts, so they
can never leak into the static site. The KernelBites roadmap
(`plannedTopics`) stays in the repository — drafts are invisible to the
Content API by design.

**Setup:** host Ghost, enable *Private Site Mode* (prevents duplicate-content
SEO), create a Custom Integration, add the Content API key + URL to Cloudflare
Pages environment variables, and point Ghost webhooks (`post.published`,
`post.published.edited`, `post.unpublished`, `post.deleted`) at a Cloudflare
**Deploy Hook** (Workers & Pages → Settings → Builds) so publishes rebuild the
site. A scheduled nightly rebuild is a good missed-webhook safety net.

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
  writing/[slug]/         article pages (generateStaticParams; MDX or Ghost HTML)
  rss.xml/route.ts        build-time RSS feed from the active source
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
  articles.ts             article interface + source dispatch (MDX default, Ghost optional)
  articles-mdx.ts         MDX loader (fs + gray-matter)
  ghost.ts                Ghost Content API adapter (tag mapping, validation, cache)
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

## Feeds

`/rss.xml` is generated at build time from the active article source (MDX or
Ghost) and advertised via `<link rel="alternate">` — the feed always matches
the static site exactly. Ghost's own `/rss/` stays private in headless mode.

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

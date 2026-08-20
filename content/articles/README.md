# Articles

MDX articles for the `/writing` section live in this folder (`.mdx` files).
Nothing is auto-generated and nothing is faked — the Writing page shows an
honest empty state until the first real article file exists.

> **Ghost mode:** when `GHOST_API_URL` + `GHOST_CONTENT_API_KEY` are set at
> build time, the Ghost Content API replaces this folder as the article
> source (see the root README). The taxonomy conventions are identical —
> same categories and series ids from `content/writing.ts`, expressed as
> Ghost tags.

## Adding an article

Create an `.mdx` file named after its slug, optionally inside a category
folder:

```
content/articles/
  system-design/
    what-is-system-design.mdx      →  /writing/what-is-system-design
  hardening-terraform-pipelines.mdx →  /writing/hardening-terraform-pipelines
```

The **filename** (without `.mdx`) becomes the URL slug — folders are for
organisation only. No UI component needs to change; the loader picks the file
up at build time.

## Frontmatter

```yaml
---
title: Kernel Behind System Design        # required
description: One-line excerpt for cards and meta description
date: 2026-01-15                          # required (YYYY-MM-DD)
category: system-design                   # required — a WritingCategory id from content/writing.ts
tags: [system-design, architecture]       # optional
readingTime: 6 min read                   # optional — computed from the body when omitted
cover: /images/covers/example.png         # optional — a real image placed in /public
series: kernelbites                       # optional — a WritingSeries id from content/writing.ts
seriesSlot: "#01"                         # optional — e.g. "#01" within the series
---

Body in MDX…
```

## Body features

- Standard Markdown plus GFM (tables, strikethrough, task lists, autolinks).
- Fenced code blocks render with a dark code frame and a language label.
- Headings get automatic anchor links.
- Article pages end with related articles (same series, category or tags).
- Images placed in `/public` can be referenced with plain Markdown image
  syntax — use real screenshots or diagrams only.

## Categories & series

Categories and series (including KernelBites) are defined once in
[`content/writing.ts`](../writing.ts) and consumed by the UI — never hardcoded
in components. The build fails with a clear message if an article references
an unknown category or series, or if two files share a slug.

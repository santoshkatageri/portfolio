/**
 * Ghost Content API adapter — the optional headless-CMS article source.
 *
 * Active when both GHOST_API_URL and GHOST_CONTENT_API_KEY are set at build
 * time (see README). Ghost becomes the source of truth for published writing;
 * the repository's MDX folder is ignored while Ghost mode is on.
 *
 * Contract: produce the same WritingArticle[] the MDX loader produces, so no
 * page or component changes with the source. Ghost specifics:
 *
 *   category  → public tag whose slug equals a category id in content/writing.ts
 *               (primary_tag wins when several match)
 *   series    → public tag whose slug equals a series id (e.g. "kernelbites")
 *   seriesSlot→ internal tag "#slot-01" (Ghost slugs internal tags as
 *               "hash-slot-01") mapped to "#01"
 *   tags      → remaining public tags, by name
 *   body      → post html, rendered inside the scoped ArticleBody styles
 *   cover     → feature_image; date → published_at; readingTime → reading_time
 *
 * Validation matches the MDX loader's strictness: unknown taxonomy and slug
 * conflicts fail the build with a clear message instead of shipping silently.
 *
 * Resilience: the raw response is cached to .ghost-cache.json on success. If
 * Ghost is unreachable during a later build, the cache is reused with a
 * warning; without a cache the build fails — deliberately, so Cloudflare
 * keeps serving the last good deployment rather than a site with its articles
 * missing.
 */

import fs from 'node:fs';
import path from 'node:path';
import GhostAPI from '@tryghost/content-api';
import { getCategory, getSeries } from '@/content/writing';
import type { WritingArticle } from './articles';

/* ── minimal structural types for the Content API payload ───────────────── */

type GhostTag = {
  id?: string;
  name: string;
  slug: string;
  visibility?: 'public' | 'internal' | 'private';
};

type GhostPost = {
  slug: string;
  title: string;
  html: string;
  custom_excerpt?: string | null;
  published_at: string;
  reading_time?: number;
  feature_image?: string | null;
  tags?: GhostTag[];
  primary_tag?: GhostTag | null;
};

const CACHE_FILE = path.join(process.cwd(), '.ghost-cache.json');
const WORDS_PER_MINUTE = 215;

/* ── client ─────────────────────────────────────────────────────────────── */

function createClient() {
  const url = process.env.GHOST_API_URL;
  const key = process.env.GHOST_CONTENT_API_KEY;
  if (!url || !key) {
    throw new Error(
      '[ghost] GHOST_API_URL and GHOST_CONTENT_API_KEY must both be set to use Ghost as the article source.',
    );
  }
  return new GhostAPI({
    url,
    key,
    version: process.env.GHOST_API_VERSION ?? 'v5.0',
  });
}

/* ── mapping ────────────────────────────────────────────────────────────── */

const INTERNAL_PREFIXES = ['hash-', '#'];

/** "#slot-01" / "hash-slot-01" / "slot-01" → "#01" */
function parseSlot(tag: GhostTag): string | null {
  const raw = [tag.name, tag.slug]
    .find((value) => INTERNAL_PREFIXES.some((prefix) => value.startsWith(prefix)));
  if (!raw) return null;
  const cleaned = raw.replace(/^hash-|^#/, '');
  const match = /^slot[-_]?(\d+)$/i.exec(cleaned);
  return match ? `#${match[1].padStart(2, '0')}` : null;
}

function isInternal(tag: GhostTag): boolean {
  return (
    tag.visibility === 'internal' ||
    INTERNAL_PREFIXES.some((prefix) => tag.slug.startsWith(prefix) || tag.name.startsWith(prefix))
  );
}

/** Estimate reading time when Ghost omits it. */
function estimateReadingTime(html: string): string {
  const words = html
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
}

/**
 * Tag fenced code blocks with their language so CSS can label the frame the
 * same way the MDX pipeline does. Ghost markdown emits
 * `<pre><code class="language-x">`; the attribute is inert in every browser.
 */
function enhanceCodeBlocks(html: string): string {
  return html.replace(
    /<pre><code class="language-([a-zA-Z0-9#+_-]+)"/g,
    '<pre data-lang="$1"><code class="language-$1"',
  );
}

function mapPost(post: GhostPost): WritingArticle {
  const tags = post.tags ?? [];
  const publicTags = tags.filter((tag) => !isInternal(tag));

  /* Category: primary_tag when it is one, otherwise the single category tag */
  const categoryCandidates = publicTags.filter((tag) => Boolean(getCategory(tag.slug)));
  let categoryTag = categoryCandidates[0];
  if (post.primary_tag && getCategory(post.primary_tag.slug)) {
    categoryTag = post.primary_tag;
  }
  if (!categoryTag) {
    throw new Error(
      `[ghost] "${post.slug}" has no category tag — tag it with one of the category ids from content/writing.ts (found: ${
        publicTags.map((tag) => tag.slug).join(', ') || 'none'
      }).`,
    );
  }
  if (categoryCandidates.length > 1 && categoryTag !== post.primary_tag) {
    throw new Error(
      `[ghost] "${post.slug}" has multiple category tags (${categoryCandidates
        .map((tag) => tag.slug)
        .join(', ')}) — keep exactly one, or make it the primary tag.`,
    );
  }
  const category = getCategory(categoryTag.slug);
  if (!category) throw new Error(`[ghost] "${post.slug}" has an unresolvable category.`);

  /* Series + slot */
  const seriesTags = publicTags.filter((tag) => Boolean(getSeries(tag.slug)));
  if (seriesTags.length > 1) {
    throw new Error(
      `[ghost] "${post.slug}" belongs to multiple series (${seriesTags
        .map((tag) => tag.slug)
        .join(', ')}) — a post can only be in one.`,
    );
  }
  const series = seriesTags[0] ? getSeries(seriesTags[0].slug) : undefined;
  const slotTag = tags.map(parseSlot).find((slot): slot is string => slot !== null);

  /* Free-form tags: public tags that are neither category nor series */
  const taxonomySlugs = new Set([categoryTag.slug, ...seriesTags.map((tag) => tag.slug)]);
  const freeTags = publicTags
    .filter((tag) => !taxonomySlugs.has(tag.slug))
    .map((tag) => tag.name);

  const html = enhanceCodeBlocks(post.html ?? '');

  return {
    slug: post.slug,
    format: 'html',
    path: '',
    title: post.title,
    description: post.custom_excerpt ?? undefined,
    date: (post.published_at ?? '').slice(0, 10),
    category,
    tags: freeTags,
    readingTime: post.reading_time
      ? `${post.reading_time} min read`
      : estimateReadingTime(html),
    cover: post.feature_image ?? undefined,
    series,
    seriesSlot: slotTag ?? undefined,
    body: html,
  };
}

/* ── public entry (used by the dispatcher only) ─────────────────────────── */

export async function getGhostArticles(): Promise<WritingArticle[]> {
  let posts: GhostPost[];
  try {
    const api = createClient();
    const result = (await api.posts.browse({
      limit: 'all',
      include: ['tags', 'authors'],
    })) as unknown as GhostPost[];
    posts = result;
    try {
      fs.writeFileSync(CACHE_FILE, JSON.stringify({ savedAt: new Date().toISOString(), posts }));
    } catch {
      /* cache writing is best-effort (read-only filesystems are fine) */
    }
  } catch (error) {
    const cache = readCache();
    if (cache) {
      console.warn(
        `[ghost] Content API unreachable (${
          error instanceof Error ? error.message : String(error)
        }) — building from .ghost-cache.json saved ${cache.savedAt}.`,
      );
      posts = cache.posts;
    } else {
      throw new Error(
        `[ghost] Could not reach the Content API and no cache exists (${
          error instanceof Error ? error.message : String(error)
        }). Failing the build on purpose so the previous deployment stays live.`,
      );
    }
  }

  const seen = new Set<string>();
  return posts
    .map((post) => {
      if (seen.has(post.slug)) {
        throw new Error(`[ghost] duplicate post slug "${post.slug}".`);
      }
      seen.add(post.slug);
      return mapPost(post);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function readCache(): { savedAt: string; posts: GhostPost[] } | null {
  try {
    const raw = fs.readFileSync(CACHE_FILE, 'utf8');
    const parsed = JSON.parse(raw) as { savedAt?: string; posts?: GhostPost[] };
    if (Array.isArray(parsed.posts)) {
      return { savedAt: parsed.savedAt ?? 'unknown time', posts: parsed.posts };
    }
    return null;
  } catch {
    return null;
  }
}

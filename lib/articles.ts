/**
 * Article loader — the single interface consumed by pages and components.
 *
 * Two interchangeable sources behind one async API, selected at build time:
 *
 *  1. Ghost Content API (headless CMS) when GHOST_API_URL and
 *     GHOST_CONTENT_API_KEY are set — Ghost is then the source of truth for
 *     published writing (see lib/ghost.ts for the tag taxonomy conventions).
 *  2. MDX files under content/articles/ (default; zero configuration).
 *
 * The UI never knows which source is active — both produce WritingArticle[].
 * The resolved list is fetched once per build/dev process and reused.
 */

import type { WritingCategory, WritingSeries } from '@/content/writing';
import { getMdxArticles } from './articles-mdx';
import { getGhostArticles } from './ghost';

export type WritingArticleFormat = 'mdx' | 'html';

export type WritingArticle = {
  slug: string;
  /**
   * Body format: 'mdx' bodies are compiled by the bundler and rendered as
   * components; 'html' bodies (Ghost) render inside the scoped ArticleBody.
   */
  format: WritingArticleFormat;
  /** Path relative to content/articles/, including extension — MDX import key */
  path: string;
  title: string;
  description?: string;
  /** ISO date string, e.g. "2026-01-15" */
  date: string;
  /** Resolved category object */
  category: WritingCategory;
  tags: string[];
  readingTime: string;
  cover?: string;
  /** Resolved series object, when the article belongs to one */
  series?: WritingSeries;
  seriesSlot?: string;
  /** MDX source (frontmatter stripped) or Ghost HTML */
  body: string;
};

/** Whether the build is using Ghost as its article source. */
export function isGhostSource(): boolean {
  return Boolean(process.env.GHOST_API_URL && process.env.GHOST_CONTENT_API_KEY);
}

let articlesPromise: Promise<WritingArticle[]> | null = null;

function load(): Promise<WritingArticle[]> {
  articlesPromise ??= isGhostSource()
    ? getGhostArticles()
    : Promise.resolve(getMdxArticles());
  return articlesPromise;
}

/** All articles, newest first. Empty array when none are published yet. */
export async function getArticles(): Promise<WritingArticle[]> {
  return load();
}

/** A single article by slug, or undefined. */
export async function getArticleBySlug(
  slug: string,
): Promise<WritingArticle | undefined> {
  return (await load()).find((article) => article.slug === slug);
}

/**
 * Related articles for an article: same series first, then same category,
 * then shared tags — capped, newest first.
 */
export async function getRelatedArticles(
  article: WritingArticle,
  limit = 3,
): Promise<WritingArticle[]> {
  return (await load())
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      let score = 0;
      if (candidate.series && candidate.series.id === article.series?.id) score += 4;
      if (candidate.category.id === article.category.id) score += 2;
      score += candidate.tags.filter((tag) => article.tags.includes(tag)).length;
      return { candidate, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

/** Articles belonging to a series, in series-slot order then date. */
export async function getSeriesArticles(
  seriesId: string,
): Promise<WritingArticle[]> {
  return (await load())
    .filter((article) => article.series?.id === seriesId)
    .sort((a, b) => (a.seriesSlot ?? '').localeCompare(b.seriesSlot ?? ''));
}

/** Article count per category id. */
export async function getCategoryCounts(): Promise<Record<string, number>> {
  return (await load()).reduce<Record<string, number>>((counts, article) => {
    counts[article.category.id] = (counts[article.category.id] ?? 0) + 1;
    return counts;
  }, {});
}

/** Formats an ISO date as e.g. "Jan 15, 2026". */
export function formatArticleDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

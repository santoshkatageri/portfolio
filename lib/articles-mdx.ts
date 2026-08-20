/**
 * MDX article loader — the default (repository) article source.
 *
 * Reads MDX files from `content/articles/`, parses frontmatter with
 * gray-matter, derives slugs from filenames and computes reading time.
 * Runs entirely at build time; the static export never needs filesystem
 * access at runtime.
 *
 * Articles are never fabricated: an empty folder yields an empty list and the
 * Writing page renders its designed empty state.
 *
 * Exposed only through the dispatcher in `lib/articles.ts` — pages and
 * components import from there, never from here.
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {
  getCategory,
  getSeries,
  type ArticleFrontmatter,
} from '@/content/writing';
import type { WritingArticle } from './articles';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');
/** Articles are .mdx only — the extension the MDX loader and import context handle. */
const ARTICLE_EXTENSIONS = ['.mdx'];
const WORDS_PER_MINUTE = 215;

/* ── filesystem helpers ─────────────────────────────────────────────────── */

/** Files that document the folder rather than contain articles. */
const IGNORED_FILES = new Set(['readme.md', 'readme.mdx']);

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (IGNORED_FILES.has(entry.name.toLowerCase())) return [];
    if (entry.name.startsWith('_')) return []; // _drafts, partials
    return ARTICLE_EXTENSIONS.includes(path.extname(entry.name)) ? [full] : [];
  });
}

function computeReadingTime(body: string): string {
  const words = body
    .replace(/```[\s\S]*?```/g, ' ') // code blocks read faster than prose
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
}

/** Normalise frontmatter dates (gray-matter yields Date objects for YAML dates). */
function normaliseDate(value: unknown): string {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      throw new Error('[articles] invalid date in frontmatter');
    }
    return value.toISOString().slice(0, 10);
  }
  return String(value);
}

function parseArticleFile(file: string, seenSlugs: Set<string>): WritingArticle {
  const slug = path.basename(file, path.extname(file));

  if (seenSlugs.has(slug)) {
    throw new Error(
      `[articles] Duplicate article slug "${slug}" — slugs come from filenames, so rename one of the files.`,
    );
  }
  seenSlugs.add(slug);

  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const frontmatter = data as Partial<ArticleFrontmatter>;
  const relPath = path.relative(process.cwd(), file);

  const missing = (['title', 'date', 'category'] as const).filter(
    (key) => !frontmatter[key],
  );
  if (missing.length) {
    throw new Error(
      `[articles] ${relPath} is missing required frontmatter: ${missing.join(', ')}.`,
    );
  }

  const category = getCategory(String(frontmatter.category));
  if (!category) {
    throw new Error(
      `[articles] ${relPath} uses unknown category "${frontmatter.category}" — add it to content/writing.ts first.`,
    );
  }

  const seriesId = frontmatter.series ? String(frontmatter.series) : undefined;
  const series = seriesId ? getSeries(seriesId) : undefined;
  if (seriesId && !series) {
    throw new Error(
      `[articles] ${relPath} references unknown series "${seriesId}" — define it in content/writing.ts first.`,
    );
  }

  return {
    slug,
    format: 'mdx',
    path: path.relative(ARTICLES_DIR, file).split(path.sep).join('/'),
    title: String(frontmatter.title),
    description: frontmatter.description
      ? String(frontmatter.description)
      : undefined,
    date: normaliseDate(frontmatter.date),
    category,
    tags: (frontmatter.tags ?? []).map(String),
    readingTime: frontmatter.readingTime
      ? String(frontmatter.readingTime)
      : computeReadingTime(content),
    cover: frontmatter.cover ? String(frontmatter.cover) : undefined,
    series,
    seriesSlot: frontmatter.seriesSlot
      ? String(frontmatter.seriesSlot)
      : undefined,
    body: content.trim(),
  };
}

/** All MDX articles, newest first. Empty array when none are published yet. */
export function getMdxArticles(): WritingArticle[] {
  const seen = new Set<string>();
  return walk(ARTICLES_DIR)
    .map((file) => parseArticleFile(file, seen))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Writing configuration — categories and content series.
 *
 * Categories and series are data, not markup: the UI reads them from here, so
 * adding a category or a planned series entry never requires touching a
 * component. Articles themselves live as MDX files under `content/articles/`
 * (see that folder's README) and are loaded at build time by `lib/articles.ts`.
 */

/** A category an article can belong to (referenced from article frontmatter). */
export type WritingCategory = {
  /** Kebab-case id used in frontmatter, e.g. "system-design" */
  id: string;
  /** Human label, e.g. "System Design" */
  label: string;
  /** One-line description shown on the Writing index */
  description: string;
};

/** A planned entry inside a series. An intent, not a published article. */
export type SeriesTopic = {
  /** Display slot, e.g. "#01" */
  slot: string;
  /** Working title, e.g. "Kernel Behind System Design" */
  title: string;
  /** Category id the topic belongs to */
  category: string;
};

/** A recurring content series (e.g. KernelBites). */
export type WritingSeries = {
  id: string;
  /** Display name, e.g. "KernelBites" */
  name: string;
  /** Format pattern the series follows, shown as its tagline */
  format: string;
  /** What the series is about */
  description: string;
  /** Topics planned for the series — published only when real */
  plannedTopics: SeriesTopic[];
};

/**
 * Validated frontmatter for an article MDX file. Required: title, date,
 * category. Everything else is optional and derived when absent
 * (reading time is computed from the body).
 */
export type ArticleFrontmatter = {
  title: string;
  description?: string;
  date: string;
  category: string;
  tags?: string[];
  readingTime?: string;
  /** Path to a cover image in /public, e.g. "/images/covers/example.png" */
  cover?: string;
  /** Series id from WRITING_SERIES, e.g. "kernelbites" */
  series?: string;
  /** Position within the series, e.g. "#01" */
  seriesSlot?: string;
};

/** Categories the Writing section organises around. */
export const WRITING_CATEGORIES: WritingCategory[] = [
  {
    id: 'system-design',
    label: 'System Design',
    description:
      'Architectures, trade-offs, and how the pieces of a system fit together.',
  },
  {
    id: 'kubernetes',
    label: 'Kubernetes',
    description:
      'Clusters, controllers, operators — and what the platform actually does underneath.',
  },
  {
    id: 'devops',
    label: 'DevOps',
    description:
      'Pipelines, automation, and the delivery loop between writing code and running it.',
  },
  {
    id: 'cloud-engineering',
    label: 'Cloud Engineering',
    description:
      'Building on OCI, AWS and GCP — infrastructure as code, identity, networking.',
  },
  {
    id: 'platform-engineering',
    label: 'Platform Engineering',
    description:
      'Golden paths, internal platforms, and the tooling teams build on top of the cloud.',
  },
  {
    id: 'llm-concepts',
    label: 'LLM Concepts',
    description:
      'Models, prompts, context and agents — the ideas behind the current AI wave.',
  },
  {
    id: 'ai-infrastructure',
    label: 'AI Infrastructure',
    description:
      'The systems that make AI work in production: serving, scaling, evaluation.',
  },
  {
    id: 'production-engineering',
    label: 'Production Engineering',
    description:
      'Operating real services: releases, health, incidents, on-call.',
  },
];

/**
 * Content series. KernelBites is the flagship: short, visual explanations of
 * the kernel-level idea behind everyday engineering concepts. Topics below are
 * planned — each becomes a real article only once written and published as an
 * MDX file with `series: kernelbites`.
 */
export const WRITING_SERIES: WritingSeries[] = [
  {
    id: 'kernelbites',
    name: 'KernelBites',
    format: '🔬 Kernel Behind X',
    description:
      'A technical series that digs one level deeper than the dashboard: the kernel-level and systems idea behind everyday engineering concepts — what is really happening when you design a system, deploy to Kubernetes, or ship a pipeline. Each bite pairs an explanation with diagrams, code and related resources; planned formats include short videos, infographics and end-of-bite quizzes.',
    plannedTopics: [
      {
        slot: '#01',
        title: 'Kernel Behind System Design',
        category: 'system-design',
      },
      {
        slot: '#02',
        title: 'Kernel Behind Kubernetes',
        category: 'kubernetes',
      },
      {
        slot: '#03',
        title: 'Kernel Behind DevOps',
        category: 'devops',
      },
    ],
  },
];

/** Look up a category by id (returns undefined for unknown ids). */
export function getCategory(id: string): WritingCategory | undefined {
  return WRITING_CATEGORIES.find((category) => category.id === id);
}

/** Look up a series by id. */
export function getSeries(id: string): WritingSeries | undefined {
  return WRITING_SERIES.find((series) => series.id === id);
}

import type { SiteContent } from './types';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH
 * ─────────────────────────────────────────────────────────────────────────────
 * Update this file to update the website. No presentation code needs to change.
 *
 * FACTUAL RULE: only add entries that are supported by the resume or by
 * information Santhosh has explicitly supplied. Leave arrays empty rather than
 * guessing — every section below has a designed empty state and will simply
 * hide or show a "to be added" panel when there is no data.
 *
 * Sections currently awaiting resume data:
 *   experience[], projects[], skills[], education[], certifications[],
 *   links[], experiments[], articles[]
 */

export const content: SiteContent = {
  profile: {
    brand: 'SPKATAGERI',
    name: 'Santhosh Katageri',
    positioning: 'AI · DevOps · Software · Systems',
    philosophy: 'Build it. Understand it. Experiment with it. Share it.',
    headline: 'I build, understand, and experiment with technology.',
    intro:
      'My work sits where AI, DevOps, software engineering and systems meet — building things end to end, taking them apart to understand how they actually behave, and turning what I learn into the next experiment.',
    // currentRole: 'Add from resume, e.g. "DevOps Engineer at <Company>"',
    // location: 'Add only if you want it public',
    about: [
      'SPKATAGERI is where I keep my work in one place: the software I build, the infrastructure I run, the AI tooling I test, and the notes I take while figuring out how systems behave under real conditions.',
      'I care less about collecting tools and more about understanding them — why a pipeline fails at scale, where an abstraction leaks, what a model is actually good at. Building is how I find out.',
      'This site is intentionally a work in progress. It grows as the projects, experiments and notes do.',
    ],
    siteUrl: 'https://spkatageri.com',
  },

  /**
   * ── Engineering experience ────────────────────────────────────────────────
   * Shape:
   * {
   *   id: 'company-role',
   *   company: '', title: '', start: '2022', end: 'Present',
   *   location: '',                       // optional, public only
   *   summary: '',                        // 1–2 sentences, factual
   *   highlights: ['', ''],               // resume bullets, rewritten for web
   *   technologies: ['', ''],
   * }
   */
  experience: [],

  /**
   * ── Projects ──────────────────────────────────────────────────────────────
   * Shape:
   * {
   *   id: 'slug', name: '', description: '',
   *   category: 'DevOps', period: '2024',
   *   context: 'the problem', built: ['what was built'],
   *   outcomes: ['only if explicitly measured'],
   *   technologies: [''],
   *   link: { label: 'View repository', href: 'https://…' },
   *   visual: 'graph' | 'pipeline' | 'grid' | 'stack',
   *   featured: true,
   * }
   */
  projects: [],

  /**
   * ── Technical capabilities ────────────────────────────────────────────────
   * Suggested groups (only keep the ones the resume supports):
   * 'AI & Automation', 'DevOps & Infrastructure', 'Software Engineering',
   * 'Cloud & Platform', 'Systems', 'Developer Tools'
   */
  skills: [],

  education: [],

  certifications: [],

  /**
   * ── Public links ──────────────────────────────────────────────────────────
   * Only add links that are meant to be public. Example:
   * { id: 'linkedin', kind: 'linkedin', label: 'LinkedIn',
   *   value: '/in/handle', href: 'https://www.linkedin.com/in/handle',
   *   primary: true }
   */
  links: [],

  /** ── SPKATAGERI Lab: real experiments, once they exist ──────────────────── */
  experiments: [],

  /**
   * Themes the Lab is being built around. These are descriptions of intent,
   * not claims that work already exists — safe to keep before the first
   * experiment ships.
   */
  labTracks: [
    {
      id: 'ai-experiments',
      title: 'AI experiments',
      description:
        'Hands-on tests of models, prompts and agent workflows — what holds up outside a demo, and what does not.',
    },
    {
      id: 'ai-assisted-development',
      title: 'AI-assisted development',
      description:
        'Using AI inside the real development loop: scaffolding, review, refactoring, and the guardrails it needs.',
    },
    {
      id: 'automation-workflows',
      title: 'Automation workflows',
      description:
        'Removing repeated manual steps from delivery, operations and everyday engineering work.',
    },
    {
      id: 'devops-experiments',
      title: 'DevOps experiments',
      description:
        'Pipelines, environments, observability and release mechanics — tried in the open, then written up.',
    },
    {
      id: 'system-design',
      title: 'System design explorations',
      description:
        'Reading, modelling and rebuilding architectures to understand the trade-offs behind them.',
    },
    {
      id: 'tools-and-prototypes',
      title: 'Developer tools & prototypes',
      description:
        'Small products and internal tools built to solve a specific problem, then sharpened in public.',
    },
  ],

  /** ── Notes & insights: only real, published writing ─────────────────────── */
  articles: [],
};

export default content;

/**
 * Content model for the SPKATAGERI portfolio.
 *
 * Everything the site displays about Santosh Katageri is typed here and
 * supplied from `content/site.ts`. No component should hard-code biography,
 * employment, project, or skill facts.
 */

export type Profile = {
  /** Visual wordmark, e.g. "SPKATAGERI" */
  brand: string;
  /** Full name of the person */
  name: string;
  /** Short positioning line, e.g. "AI · DevOps · Software · Systems" */
  positioning: string;
  /** Identity line used in the hero, e.g. "Software Engineer · Builder · Systems Explorer" */
  identity: string;
  /** Brand philosophy line */
  philosophy: string;
  /** Hero headline */
  headline: string;
  /**
   * Editorial display lines for the cinematic hero (Instrument Serif italic).
   * Derived from the positioning / philosophy, never fictional.
   */
  displayLines: string[];
  /** 1–2 sentence hero support copy */
  intro: string;
  /** Optional current role line shown under the name in About */
  currentRole?: string;
  /** Optional city / region, only if intended to be public */
  location?: string;
  /** About section paragraphs. Empty array renders an empty state. */
  about: string[];
  /** Compact credibility strip under the hero actions. Facts only. */
  credibility?: {
    /** One line, e.g. "9+ years building and operating cloud infrastructure" */
    statement: string;
    /** Employers, in order */
    companies: string[];
    /** Cloud platforms */
    platforms: string[];
  };
  /** Canonical site URL used for metadata */
  siteUrl: string;
};

export type Experience = {
  id: string;
  company: string;
  title: string;
  /** e.g. "2021" */
  start: string;
  /** e.g. "Present" */
  end: string;
  /** Optional work location, only if public */
  location?: string;
  /** One or two sentences describing scope and impact */
  summary: string;
  /** Selected responsibilities / achievements, factual only */
  highlights: string[];
  /** Technologies used in the role */
  technologies: string[];
};

export type Project = {
  id: string;
  name: string;
  /** One-line description used on the card */
  description: string;
  /** Optional short tag, e.g. "DevOps", "AI" */
  category?: string;
  /** Problem or context the project addressed */
  context?: string;
  /** What was actually built */
  built?: string[];
  /** Outcome statements — only if explicitly supported */
  outcomes?: string[];
  technologies: string[];
  /** Public link, if one exists */
  link?: { label: string; href: string };
  /** Optional year or range */
  period?: string;
  /** Abstract visual variant for the card artwork */
  visual?: 'graph' | 'pipeline' | 'grid' | 'stack';
  /** Show as a full-width feature card */
  featured?: boolean;
};

export type SkillGroup = {
  id: string;
  /** e.g. "DevOps & Infrastructure" */
  title: string;
  /** Optional one-line framing for the group */
  note?: string;
  items: string[];
};

export type Education = {
  id: string;
  institution: string;
  qualification: string;
  period?: string;
  detail?: string;
};

export type Recognition = {
  id: string;
  name: string;
  issuer?: string;
  year?: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer?: string;
  year?: string;
  href?: string;
};

export type LinkKind = 'email' | 'linkedin' | 'github' | 'website' | 'other';

export type ProfileLink = {
  id: string;
  kind: LinkKind;
  label: string;
  /** Displayed text, e.g. the handle */
  value: string;
  href: string;
  primary?: boolean;
};

export type Experiment = {
  id: string;
  title: string;
  summary: string;
  /** Never mark planned work as published. */
  status: 'planned' | 'in-progress' | 'published';
  tags: string[];
  href?: string;
  /* ── Lab detail fields (all optional so a minimal entry stays valid) ── */
  /** Lab grouping, e.g. "AI experiments", "DevOps" — see labTracks ids */
  track?: string;
  /** Why this experiment exists — the question or itch behind it */
  why?: string;
  /** What the experiment actually taught — added once it is real */
  learned?: string;
  /** Technologies used in the experiment */
  technologies?: string[];
  /** Public repository, when one exists */
  github?: string;
  /** Live demo, when one exists */
  demo?: string;
  /** Optional last-update marker, e.g. "2025-01" */
  updated?: string;
};

/**
 * A current area of exploration shown on the homepage ("What I'm exploring").
 * Framed as intent — what is being dug into right now — never as a claim of
 * mastery. Keep entries aligned with the résumé / positioning / lab tracks.
 */
export type Exploration = {
  id: string;
  /** Short area name, e.g. "System design" */
  area: string;
  /** One line on what exactly is being explored in that area */
  focus: string;
  /** Optional pointer to something concrete being used/read/built */
  note?: string;
};

/** One of the four operating principles (build / learn / explore / share). */
export type Principle = {
  id: string;
  /** Imperative label, e.g. "Build" */
  label: string;
  /** One line expanding the principle */
  body: string;
};

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  date?: string;
  readingTime?: string;
  tags: string[];
  href?: string;
};

/** Placeholder themes shown in the Lab empty state. Descriptive, not claims. */
export type LabTrack = {
  id: string;
  title: string;
  description: string;
};

export type SiteContent = {
  profile: Profile;
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  education: Education[];
  certifications: Certification[];
  recognitions: Recognition[];
  links: ProfileLink[];
  experiments: Experiment[];
  labTracks: LabTrack[];
  articles: Article[];
  /** Homepage "What I'm exploring" — current, intent-framed areas */
  explorations: Exploration[];
  /** Operating principles: build / learn / explore / share */
  principles: Principle[];
};

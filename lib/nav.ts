/**
 * Site navigation structure — routes, not personal facts.
 * Shared by the header, footer and sitemap so the IA lives in one place.
 */

export type Route = {
  href: string;
  label: string;
  /** Short description used in footer link lists */
  description: string;
};

/** Primary navigation, in order. */
export const PRIMARY_NAV: Route[] = [
  { href: '/', label: 'Home', description: 'The whole platform, top to bottom.' },
  { href: '/work', label: 'Work', description: 'Professional projects — the things built on the job.' },
  { href: '/writing', label: 'Writing', description: 'Technical articles and the KernelBites series.' },
  { href: '/labs', label: 'Labs', description: 'Experiments, prototypes and technical investigations.' },
  { href: '/about', label: 'About', description: 'Story, experience, education and recognitions.' },
];

/** Secondary header actions. */
export const RESUME_HREF = '/resume';

/** All indexable routes for the sitemap. */
export const SITE_ROUTES: string[] = [...PRIMARY_NAV.map((route) => route.href), RESUME_HREF];

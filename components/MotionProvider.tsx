'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Global motion policy: every framer-motion animation below this provider
 * automatically drops transform animations when the user prefers reduced
 * motion. GSAP effects implement their own guards (see Hero, Marquee).
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Route transition wrapper. `template.tsx` remounts on every navigation, so
 * this gives each page a quiet entrance — a short fade with a slight rise.
 * Transforms are dropped automatically under prefers-reduced-motion via
 * MotionConfig in the root layout.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

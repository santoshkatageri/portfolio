'use client';

import { motion } from 'framer-motion';
import { useMemo, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds */
  delay?: number;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Extra data-* attributes forwarded to the element */
  dataAttrs?: Record<string, string | boolean | undefined>;
};

/**
 * Section reveal driven by framer-motion: elements enter once, when they
 * scroll into view. Props are stable with the previous IntersectionObserver
 * implementation, so existing call sites work unchanged. Reduced-motion users
 * get the content without travel (opacity-only) through MotionConfig.
 */
export default function Reveal({
  children,
  delay = 0,
  as,
  className,
  id,
  dataAttrs,
}: RevealProps) {
  const Tag = as ?? 'div';
  const MotionTag = useMemo(
    () => motion.create(Tag as ElementType),
    [Tag],
  );

  return (
    <MotionTag
      id={id}
      className={className}
      {...dataAttrs}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: delay / 1000,
      }}
    >
      {children}
    </MotionTag>
  );
}

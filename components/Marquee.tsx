'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import type { Principle } from '@/content/types';
import styles from './Marquee.module.css';

/**
 * Quiet editorial marquee — the operating principles drifting across a hairline
 * strip. One GSAP tween on transform only (compositor-friendly), duplicated
 * track for a seamless loop, fully reverted on unmount, and disabled entirely
 * under prefers-reduced-motion.
 */
export default function Marquee({ principles }: { principles: Principle[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: -50,
        ease: 'none',
        duration: Math.max(12, principles.length * 4),
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [principles.length]);

  const sequence = [...principles, ...principles, ...principles];

  return (
    <div className={styles.strip} aria-hidden="true">
      <div className={styles.track} ref={trackRef}>
        {[0, 1].map((half) => (
          <div className={styles.half} key={half}>
            {sequence.map((principle, index) => (
              <span className={styles.item} key={`${half}-${principle.id}-${index}`}>
                <span className={styles.word}>{principle.label}</span>
                <span className={styles.dot}>·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

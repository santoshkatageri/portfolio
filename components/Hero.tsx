'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Profile } from '@/content/types';
import SystemGraph from './SystemGraph';
import styles from './Hero.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Cinematic editorial hero.
 *
 * GSAP drives the entrance (masked serif display lines, staggered support
 * copy, visual fade-in) and the scroll response (restrained parallax between
 * the copy and the system diagram, desktop only). Everything is cleaned up
 * through gsap.context().revert(), and the whole choreography is skipped for
 * prefers-reduced-motion — CSS keeps those states visible.
 */
export default function Hero({ profile }: { profile: Profile }) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      const entrance = gsap.timeline({
        defaults: { ease: 'power4.out' },
        delay: 0.1,
      });

      entrance
        .fromTo(
          '[data-hero-line]',
          { yPercent: 112 },
          { yPercent: 0, duration: 1.15, stagger: 0.13 },
          0.1,
        )
        .fromTo(
          '[data-hero-fade]',
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09 },
          0.5,
        )
        .fromTo(
          '[data-hero-visual]',
          { autoAlpha: 0, scale: 0.965 },
          { autoAlpha: 1, scale: 1, duration: 1.3, ease: 'power3.out' },
          0.45,
        );

      /* Scroll response: parallax only where there is room for it */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px)', () => {
        gsap.to('[data-hero-visual]', {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to('[data-hero-copy]', {
          yPercent: -5,
          autoAlpha: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      id="top"
      aria-labelledby="hero-title"
    >
      <div className="shell">
        <div className={styles.grid}>
          <div className={styles.copy} data-hero-copy>
            <p className={styles.identity} data-hero-fade>
              <span className={styles.identityName}>{profile.name}</span>
              <span className={styles.identityDivider} aria-hidden="true">
                /
              </span>
              <span className={styles.identityRole}>{profile.identity}</span>
            </p>

            <h1 className={styles.title} id="hero-title">
              <span className="sr-only">
                {profile.displayLines.join(' ')}
              </span>
              <span className={styles.lines} aria-hidden="true">
                {profile.displayLines.map((line, index) => (
                  <span className={styles.lineMask} key={line}>
                    <span
                      className={`${styles.line} ${
                        index === profile.displayLines.length - 1
                          ? styles.lineAccent
                          : ''
                      }`}
                      data-hero-line
                    >
                      {line}
                    </span>
                  </span>
                ))}
              </span>
            </h1>

            <p className={`lede ${styles.intro}`} data-hero-fade>
              {profile.intro}
            </p>

            <div className={styles.actions} data-hero-fade>
              <Link className="btn btn--primary" href="/work">
                Explore Work
                <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
              <Link className="btn" href="/writing">
                Read Writing
              </Link>
            </div>

            {profile.credibility ? (
              <div className={styles.credibility} data-hero-fade>
                <p className={styles.credStatement}>
                  {profile.credibility.statement}
                </p>
                <p className={styles.credMeta}>
                  <span>{profile.credibility.companies.join(' · ')}</span>
                  <span className={styles.credDivider} aria-hidden="true" />
                  <span>{profile.credibility.platforms.join(' · ')}</span>
                </p>
              </div>
            ) : null}
          </div>

          <div className={styles.visual} data-hero-visual>
            <SystemGraph />
          </div>
        </div>
      </div>

      <div className={styles.scrollCue} aria-hidden="true" data-hero-fade>
        <span className={styles.scrollLine} />
        <span className="mono">Scroll</span>
      </div>
    </section>
  );
}

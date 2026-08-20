'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PRIMARY_NAV, RESUME_HREF } from '@/lib/nav';
import styles from './SiteHeader.module.css';

type SiteHeaderProps = {
  brand: string;
  name: string;
  /** External "say hi" target — the primary profile link, when one exists */
  sayHiHref?: string;
};

export default function SiteHeader({ brand, name, sayHiHref }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const reduceMotion = useReducedMotion();

  /* Close the mobile panel whenever the route changes */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Elevate the bar into its glass state once the page scrolls */
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock scroll and allow Escape to close the mobile panel */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className={`site-chrome ${styles.header}`} data-stuck={stuck} data-open={open}>
      <div className="shell">
        <div className={styles.bar}>
          <Link className={styles.brand} href="/" aria-label={`${brand} — home`}>
            <span className={styles.mark} aria-hidden="true">
              SK
            </span>
            <span className={styles.wordmark}>{brand}</span>
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                className={styles.link}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <Link className={`btn btn--primary ${styles.cta}`} href={RESUME_HREF}>
              Resume
              <span className="btn__arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
            {sayHiHref ? (
              <a
                className={`btn ${styles.cta} ${styles.ctaSecondary}`}
                href={sayHiHref}
                target="_blank"
                rel="noreferrer noopener"
              >
                Say hi
                <span className="btn__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ) : null}
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? 'Close' : 'Menu'}
              <span className={styles.bars} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className={styles.panel}
            id="mobile-nav"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shell">
              <nav className={styles.panelInner} aria-label="Mobile">
                {PRIMARY_NAV.map((item, index) => (
                  <Link
                    key={item.href}
                    className={styles.panelLink}
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    <span className={styles.panelIndex}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </Link>
                ))}
                <div className={styles.panelActions}>
                  <Link className="btn btn--primary" href={RESUME_HREF}>
                    Resume
                    <span className="btn__arrow" aria-hidden="true">↗</span>
                  </Link>
                  {sayHiHref ? (
                    <a
                      className="btn"
                      href={sayHiHref}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Say hi
                      <span className="btn__arrow" aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

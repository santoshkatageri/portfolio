'use client';

import { useEffect, useState } from 'react';
import styles from './SiteHeader.module.css';

export type NavItem = { href: string; label: string };

type SiteHeaderProps = {
  name: string;
  navItems: NavItem[];
  ctaLabel: string;
  ctaHref: string;
};

export default function SiteHeader({
  name,
  navItems,
  ctaLabel,
  ctaHref,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState<string>('');

  /* Elevate the bar once the page scrolls */
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Highlight the section currently in view */
  useEffect(() => {
    const ids = navItems
      .map((item) => item.href.replace('#', ''))
      .filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navItems]);

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

  return (
    <header className={styles.header} data-stuck={stuck} data-open={open}>
      <div className="shell">
        <div className={styles.bar}>
          <a className={styles.brand} href="#top" onClick={() => setOpen(false)}>
            <span className={styles.mark} aria-hidden="true">
              SK
            </span>
            <span className={styles.wordmark}>{name}</span>
            <span className="sr-only">— home</span>
          </a>

          <nav className={styles.nav} aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                className={styles.link}
                href={item.href}
                aria-current={active === item.href ? 'true' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <a className={`btn ${styles.cta}`} href={ctaHref}>
              {ctaLabel}
            </a>
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

      <div className={styles.panel} id="mobile-nav" data-open={open}>
        <div className="shell">
          <nav className={styles.panelInner} aria-label="Mobile">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                className={styles.panelLink}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                <span className={styles.panelIndex}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.label}
              </a>
            ))}
            <a
              className={`btn btn--primary ${styles.panelCta}`}
              href={ctaHref}
              onClick={() => setOpen(false)}
            >
              {ctaLabel}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

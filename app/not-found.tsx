import type { Metadata } from 'next';
import Link from 'next/link';
import { PRIMARY_NAV } from '@/lib/nav';
import styles from './not-found.module.css';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <div className="shell">
        <span className="mono">404 — Not found</span>
        <h1 className={`display ${styles.title}`}>
          This page isn&rsquo;t part of the system.
        </h1>
        <p className={styles.body}>
          The link may be out of date, or the page has not been built yet.
        </p>
        <div className={styles.actions}>
          <Link className="btn btn--primary" href="/">
            Back home
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
          {PRIMARY_NAV.filter((route) => route.href !== '/')
            .slice(0, 3)
            .map((route) => (
              <Link key={route.href} className="btn" href={route.href}>
                {route.label}
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
}

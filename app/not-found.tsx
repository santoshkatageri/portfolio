import type { Metadata } from 'next';
import { content } from '@/content/site';
import styles from './not-found.module.css';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <div className="shell">
        <span className="mono">404 — Not found</span>
        <h1 className={styles.title}>This page isn&rsquo;t part of the system.</h1>
        <p className={styles.body}>
          The link may be out of date, or the page has not been built yet.
        </p>
        <a className="btn btn--primary" href="/">
          Back to {content.profile.brand}
          <span className="btn__arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </main>
  );
}

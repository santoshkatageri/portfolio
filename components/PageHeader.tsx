import type { ReactNode } from 'react';
import Reveal from './Reveal';
import styles from './PageHeader.module.css';

type PageHeaderProps = {
  /** Small mono eyebrow, e.g. "Work" or "Writing / KernelBites" */
  eyebrow: string;
  /** Editorial page title (Instrument Serif italic) */
  title: string;
  /** Supporting lede */
  intro?: ReactNode;
  /** Optional meta line (counts, status) shown under the intro */
  meta?: string;
};

/**
 * Consistent editorial header for subpages — generous whitespace, serif
 * display title, quiet meta line.
 */
export default function PageHeader({ eyebrow, title, intro, meta }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div className="shell">
        <Reveal className={styles.inner}>
          <div className={styles.top}>
            <span className="mono">{eyebrow}</span>
            <span className={styles.rule} aria-hidden="true" />
          </div>
          <h1 className={`display ${styles.title}`}>{title}</h1>
          {intro ? <p className={styles.intro}>{intro}</p> : null}
          {meta ? <p className={styles.meta}>{meta}</p> : null}
        </Reveal>
      </div>
    </header>
  );
}

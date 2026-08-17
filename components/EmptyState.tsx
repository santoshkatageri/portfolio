import type { ReactNode } from 'react';
import Reveal from './Reveal';
import styles from './EmptyState.module.css';

type EmptyStateProps = {
  label: string;
  title: string;
  body: ReactNode;
  action?: { label: string; href: string };
};

/**
 * Used wherever content is genuinely not available yet.
 * Better an honest empty state than invented content.
 */
export default function EmptyState({ label, title, body, action }: EmptyStateProps) {
  return (
    <Reveal className={styles.empty}>
      <span className={styles.label}>
        <span className={styles.pulse} aria-hidden="true" />
        {label}
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{body}</p>
      {action ? (
        <a className="btn" href={action.href}>
          {action.label}
          <span className="btn__arrow" aria-hidden="true">→</span>
        </a>
      ) : null}
    </Reveal>
  );
}

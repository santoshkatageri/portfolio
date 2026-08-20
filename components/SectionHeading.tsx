import type { ReactNode } from 'react';
import Reveal from './Reveal';
import styles from './SectionHeading.module.css';

type SectionHeadingProps = {
  /** Small mono eyebrow, e.g. "02 — Work" */
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  /** Heading level; sections use h2 by default */
  level?: 2 | 3;
  align?: 'split' | 'stack';
  /** Render the title in italic Instrument Serif (editorial display) */
  serif?: boolean;
  id?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  level = 2,
  align = 'split',
  serif = true,
  id,
}: SectionHeadingProps) {
  const Title = level === 2 ? 'h2' : 'h3';

  return (
    <Reveal as="header" className={styles.head}>
      <div className={styles.top}>
        <span className="mono">{eyebrow}</span>
        <span className={styles.rule} aria-hidden="true" />
      </div>
      <div className={styles.body} data-align={align}>
        <Title
          className={`${styles.title} ${serif ? 'display' : ''}`}
          id={id}
        >
          {title}
        </Title>
        {intro ? <p className={styles.intro}>{intro}</p> : null}
      </div>
    </Reveal>
  );
}

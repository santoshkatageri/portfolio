import type { Principle } from '@/content/types';
import Reveal from './Reveal';
import styles from './Pillars.module.css';

/**
 * The four operating principles (build / learn / explore / share).
 * Copy is content, not markup — supplied from content/site.ts.
 */
export default function Pillars({ principles }: { principles: Principle[] }) {
  return (
    <div className={styles.grid}>
      {principles.map((principle, index) => (
        <Reveal key={principle.id} className={styles.pillar} delay={index * 70}>
          <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
          <h3 className={`display ${styles.title}`}>{principle.label}</h3>
          <p className={styles.body}>{principle.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

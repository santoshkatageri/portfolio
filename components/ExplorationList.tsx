import type { Exploration } from '@/content/types';
import Reveal from './Reveal';
import styles from './ExplorationList.module.css';

/**
 * "What I'm exploring" — a living engineering notebook, not a skill bar list.
 * Rows come from content (content.site.explorations); an empty array hides
 * the section entirely rather than fabricating interests.
 */
export default function ExplorationList({ items }: { items: Exploration[] }) {
  if (!items.length) return null;

  return (
    <ol className={styles.list}>
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={item.id}
          delay={index * 50}
          className={styles.row}
        >
          <span className={styles.index}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className={styles.cell}>
            <h3 className={`display ${styles.area}`}>{item.area}</h3>
            <p className={styles.focus}>{item.focus}</p>
          </div>
          {item.note ? <span className={styles.note}>{item.note}</span> : null}
        </Reveal>
      ))}
    </ol>
  );
}

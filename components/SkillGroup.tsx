import type { SkillGroup as SkillGroupType } from '@/content/types';
import Reveal from './Reveal';
import styles from './SkillGroup.module.css';

export default function SkillGroup({
  group,
  index,
}: {
  group: SkillGroupType;
  index: number;
}) {
  return (
    <Reveal className={styles.group} delay={index * 60}>
      <div className={styles.head}>
        <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
        <h3 className={styles.title}>{group.title}</h3>
        {group.note ? <p className={styles.note}>{group.note}</p> : null}
      </div>
      <ul className={`chips ${styles.items}`}>
        {group.items.map((item) => (
          <li className="chip" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

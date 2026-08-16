import Reveal from './Reveal';
import styles from './Pillars.module.css';

const PILLARS = [
  {
    id: 'build',
    title: 'Build it',
    body: 'Projects, software, websites, automations and experiments — shipped rather than sketched.',
  },
  {
    id: 'understand',
    title: 'Understand it',
    body: 'Systems, architecture and engineering concepts studied until the behaviour makes sense, not just the syntax.',
  },
  {
    id: 'experiment',
    title: 'Experiment with it',
    body: 'AI tools, new technologies, workflows and prototypes tested against real problems.',
  },
  {
    id: 'share',
    title: 'Share it',
    body: 'Articles, notes, demos and public work — the part that turns learning into something reusable.',
  },
];

export default function Pillars() {
  return (
    <div className={styles.grid}>
      {PILLARS.map((pillar, index) => (
        <Reveal key={pillar.id} className={styles.pillar} delay={index * 70}>
          <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
          <h3 className={styles.title}>{pillar.title}</h3>
          <p className={styles.body}>{pillar.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

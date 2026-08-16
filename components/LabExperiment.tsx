import type { Experiment, LabTrack } from '@/content/types';
import Reveal from './Reveal';
import styles from './LabExperiment.module.css';

const STATUS_LABEL: Record<Experiment['status'], string> = {
  exploring: 'Exploring',
  building: 'Building',
  shipped: 'Shipped',
};

export function LabExperimentCard({
  experiment,
  index,
}: {
  experiment: Experiment;
  index: number;
}) {
  return (
    <Reveal className={styles.card} delay={index * 60}>
      <div className={styles.top}>
        <span className={styles.status} data-status={experiment.status}>
          <span className={styles.dot} aria-hidden="true" />
          {STATUS_LABEL[experiment.status]}
        </span>
      </div>
      <h3 className={styles.title}>{experiment.title}</h3>
      <p className={styles.summary}>{experiment.summary}</p>
      {experiment.tags.length ? (
        <ul className="chips">
          {experiment.tags.map((tag) => (
            <li className="chip" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      {experiment.href ? (
        <a
          className={styles.link}
          href={experiment.href}
          target="_blank"
          rel="noreferrer noopener"
        >
          View experiment ↗
        </a>
      ) : null}
    </Reveal>
  );
}

/** Placeholder card describing a Lab theme — an intent, not a claim. */
export function LabTrackCard({
  track,
  index,
}: {
  track: LabTrack;
  index: number;
}) {
  return (
    <Reveal className={styles.card} delay={index * 50} dataAttrs={{ 'data-placeholder': 'true' }}>
      <div className={styles.top}>
        <span className={styles.slotIndex}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className={styles.status}>
          <span className={styles.dot} aria-hidden="true" />
          Planned track
        </span>
      </div>
      <h3 className={styles.title}>{track.title}</h3>
      <p className={styles.summary}>{track.description}</p>
    </Reveal>
  );
}

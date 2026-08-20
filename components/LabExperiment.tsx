import Link from 'next/link';
import type { Experiment, LabTrack } from '@/content/types';
import Reveal from './Reveal';
import styles from './LabExperiment.module.css';

const STATUS_LABEL: Record<Experiment['status'], string> = {
  planned: 'Planned',
  'in-progress': 'In progress',
  published: 'Published',
};

/**
 * A real lab experiment. Every field beyond title/summary/status/tags is
 * optional and rendered only when the experiment can honestly claim it
 * (links appear only when something public exists).
 */
export function LabExperimentCard({
  experiment,
  index,
}: {
  experiment: Experiment;
  index: number;
}) {
  const links = [
    experiment.github && { label: 'GitHub', href: experiment.github },
    experiment.demo && { label: 'Live demo', href: experiment.demo },
    experiment.href && { label: 'Write-up', href: experiment.href },
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  return (
    <Reveal className={styles.card} delay={index * 60}>
      <div className={styles.top}>
        <span className={styles.slotIndex}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className={styles.status} data-status={experiment.status}>
          <span className={styles.dot} aria-hidden="true" />
          {STATUS_LABEL[experiment.status]}
        </span>
      </div>
      <h3 className={styles.title}>{experiment.title}</h3>
      <p className={styles.summary}>{experiment.summary}</p>

      {experiment.why ? (
        <div className={styles.note}>
          <p className={styles.noteTitle}>Why I built it</p>
          <p>{experiment.why}</p>
        </div>
      ) : null}

      {experiment.learned ? (
        <div className={styles.note}>
          <p className={styles.noteTitle}>What I learned</p>
          <p>{experiment.learned}</p>
        </div>
      ) : null}

      {experiment.technologies?.length ? (
        <ul className="chips" aria-label={`Technologies used in ${experiment.title}`}>
          {experiment.technologies.map((tech) => (
            <li className="chip" key={tech}>
              {tech}
            </li>
          ))}
        </ul>
      ) : experiment.tags.length ? (
        <ul className="chips" aria-label={`Tags for ${experiment.title}`}>
          {experiment.tags.map((tag) => (
            <li className="chip" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      {links.length ? (
        <div className={styles.links}>
          {links.map((link) => (
            <a
              key={link.label}
              className="arrowLink"
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      ) : null}

      {experiment.updated ? (
        <p className={styles.updated}>Updated {experiment.updated}</p>
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
    <Reveal
      className={styles.card}
      delay={index * 50}
      dataAttrs={{ 'data-placeholder': 'true' }}
    >
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

/** Cross-link strip used at the bottom of the Labs page. */
export function LabsFooterLink() {
  return (
    <Reveal className={styles.footerLinkWrap}>
      <Link className="btn" href="/writing">
        Experiments turn into writing
        <span className="btn__arrow" aria-hidden="true">→</span>
      </Link>
    </Reveal>
  );
}

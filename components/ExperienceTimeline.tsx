import type { Experience } from '@/content/types';
import Reveal from './Reveal';
import styles from './ExperienceTimeline.module.css';

/**
 * Employment timeline.
 * `variant="full"` shows summary, highlights and technology chips (About,
 * Résumé). `variant="compact"` condenses each role to a row — period, title,
 * company, summary — for the homepage.
 */
export default function ExperienceTimeline({
  roles,
  variant = 'full',
}: {
  roles: Experience[];
  variant?: 'full' | 'compact';
}) {
  const compact = variant === 'compact';

  return (
    <ol className={styles.timeline} data-variant={variant}>
      {roles.map((role, index) => {
        const current = /present|current/i.test(role.end);
        return (
          <Reveal
            as="li"
            key={role.id}
            delay={index * 60}
            className={styles.item}
            dataAttrs={{ 'data-current': current }}
          >
            <div className={styles.head}>
              <p className={styles.period}>
                <span>
                  {role.start} — {role.end}
                </span>
                {current ? <span className={styles.current}>Current</span> : null}
              </p>
              <h3 className={compact ? styles.compactTitle : styles.title}>
                {role.title}
              </h3>
              <p className={styles.company}>
                {role.company}
                {role.location ? <span> · {role.location}</span> : null}
              </p>
            </div>

            <div className={styles.detail}>
              {role.summary ? <p className={styles.summary}>{role.summary}</p> : null}

              {!compact && role.highlights.length ? (
                <ul className={styles.highlights}>
                  {role.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}

              {!compact && role.technologies.length ? (
                <ul className="chips" aria-label={`Technologies used at ${role.company}`}>
                  {role.technologies.map((tech) => (
                    <li className="chip" key={tech}>
                      {tech}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}

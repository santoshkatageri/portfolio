import type { Experience } from '@/content/types';
import Reveal from './Reveal';
import styles from './ExperienceTimeline.module.css';

export default function ExperienceTimeline({ roles }: { roles: Experience[] }) {
  return (
    <ol className={styles.timeline}>
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
              <h3 className={styles.title}>{role.title}</h3>
              <p className={styles.company}>
                {role.company}
                {role.location ? <span> · {role.location}</span> : null}
              </p>
            </div>

            <div className={styles.detail}>
              {role.summary ? <p className={styles.summary}>{role.summary}</p> : null}

              {role.highlights.length ? (
                <ul className={styles.highlights}>
                  {role.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}

              {role.technologies.length ? (
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

'use client';

import { useId, useState } from 'react';
import type { Project } from '@/content/types';
import ProjectVisual from './ProjectVisual';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const detailId = useId();

  const hasDetail = Boolean(
    project.context ||
      (project.built && project.built.length) ||
      (project.outcomes && project.outcomes.length),
  );

  return (
    <article
      className={styles.card}
      data-featured={project.featured || undefined}
    >
      <div className={styles.media}>
        <ProjectVisual variant={project.visual} label={project.category} />
      </div>

      <div className={styles.body}>
        {(project.period || project.category) && (
          <div className={styles.meta}>
            {project.category ? (
              <span className={styles.metaCategory}>{project.category}</span>
            ) : null}
            {project.period ? (
              <span className={styles.metaPeriod}>{project.period}</span>
            ) : null}
          </div>
        )}

        <h3 className={styles.name}>{project.name}</h3>
        <p className={styles.description}>{project.description}</p>

        {project.technologies.length ? (
          <ul className="chips" aria-label={`Technologies used in ${project.name}`}>
            {project.technologies.map((tech) => (
              <li className="chip" key={tech}>
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        <div className={styles.footer}>
          {hasDetail ? (
            <button
              type="button"
              className={styles.expand}
              aria-expanded={open}
              aria-controls={detailId}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? 'Hide details' : 'View details'}
              <span className={styles.caret} aria-hidden="true">
                ↓
              </span>
            </button>
          ) : null}

          {project.link ? (
            <a
              className="arrowLink"
              href={project.link.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              {project.link.label}
              <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </div>

      {hasDetail ? (
        <div className={styles.detail} data-open={open} id={detailId}>
          <div className={styles.detailInner}>
            <div className={styles.detailGrid}>
              {project.context ? (
                <div className={styles.block}>
                  <h4 className={styles.blockTitle}>Context</h4>
                  <p>{project.context}</p>
                </div>
              ) : null}

              {project.built?.length ? (
                <div className={styles.block}>
                  <h4 className={styles.blockTitle}>What I built</h4>
                  <ul className={styles.bullets}>
                    {project.built.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {project.outcomes?.length ? (
                <div className={`${styles.block} ${styles.blockOutcome}`}>
                  <h4 className={styles.blockTitle}>Outcome</h4>
                  <ul className={styles.bullets}>
                    {project.outcomes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}

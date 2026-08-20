import type { Metadata } from 'next';
import Link from 'next/link';
import PrintButton from '@/components/PrintButton';
import Reveal from '@/components/Reveal';
import { content } from '@/content/site';
import styles from './resume.module.css';

export const metadata: Metadata = {
  title: 'Résumé',
  description:
    'Résumé of Santosh Katageri — Senior Member of Technical Staff, Cloud & DevOps at Oracle. Experience across Oracle, Zynga and Mindtree; OCI, AWS and GCP; Terraform, Kubernetes and automation tooling.',
  alternates: { canonical: '/resume' },
};

/**
 * The résumé, rendered from the same single content source as the rest of the
 * site — no separate document to fall out of sync. Print styles turn it into
 * a clean light document for Print / Save PDF.
 */
export default function ResumePage() {
  const { profile, experience, skills, education, recognitions, links } =
    content;

  return (
    <main id="main" className={styles.main}>
      <div className="shell">
        <p className={styles.eyebrow}>
          <Link className="arrowLink" href="/about">
            <span aria-hidden="true">←</span> About
          </Link>
          <span className="mono">Résumé · {profile.name}</span>
        </p>

        <Reveal as="article" className={styles.paper}>
          <header className={styles.head}>
            <h1 className={styles.name}>{profile.name}</h1>
            <p className={styles.positioning}>{profile.positioning}</p>
            <p className={styles.role}>{profile.currentRole}</p>
            {profile.credibility ? (
              <p className={styles.credibility}>
                {profile.credibility.statement}
              </p>
            ) : null}
            <ul className={styles.contacts}>
              {links.map((link) => (
                <li key={link.id}>
                  {link.kind === 'email' ? (
                    <a href={link.href}>{link.value}</a>
                  ) : (
                    <a href={link.href} target="_blank" rel="noreferrer noopener">
                      {link.value}
                    </a>
                  )}
                </li>
              ))}
              <li>{profile.siteUrl.replace('https://', '')}</li>
            </ul>
          </header>

          {experience.length ? (
            <section className={styles.section} aria-labelledby="resume-experience">
              <h2 className={styles.sectionTitle} id="resume-experience">
                Experience
              </h2>
              {experience.map((role) => (
                <div className={styles.role} key={role.id}>
                  <div className={styles.roleHead}>
                    <h3 className={styles.roleTitle}>{role.title}</h3>
                    <p className={styles.rolePeriod}>
                      {role.start} — {role.end}
                    </p>
                  </div>
                  <p className={styles.roleCompany}>{role.company}</p>
                  {role.summary ? (
                    <p className={styles.roleSummary}>{role.summary}</p>
                  ) : null}
                  {role.highlights.length ? (
                    <ul className={styles.roleHighlights}>
                      {role.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {role.technologies.length ? (
                    <p className={styles.roleTech}>
                      {role.technologies.join(' · ')}
                    </p>
                  ) : null}
                </div>
              ))}
            </section>
          ) : null}

          {skills.length ? (
            <section className={styles.section} aria-labelledby="resume-skills">
              <h2 className={styles.sectionTitle} id="resume-skills">
                Skills
              </h2>
              <div className={styles.skillsGrid}>
                {skills.map((group) => (
                  <div key={group.id}>
                    <p className={styles.skillGroup}>{group.title}</p>
                    <p className={styles.skillItems}>{group.items.join(' · ')}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {education.length || recognitions.length ? (
            <section className={styles.section} aria-labelledby="resume-background">
              <h2 className={styles.sectionTitle} id="resume-background">
                Education & Recognition
              </h2>
              <div className={styles.skillsGrid}>
                {education.length ? (
                  <div>
                    <p className={styles.skillGroup}>Education</p>
                    {education.map((item) => (
                      <p className={styles.skillItems} key={item.id}>
                        {item.qualification} — {item.institution}
                        {item.period ? ` (${item.period})` : ''}
                      </p>
                    ))}
                  </div>
                ) : null}
                {recognitions.length ? (
                  <div>
                    <p className={styles.skillGroup}>Recognition</p>
                    <ul className={styles.recognitions}>
                      {recognitions.map((item) => (
                        <li key={item.id}>
                          {item.name}
                          {item.issuer ? ` — ${item.issuer}` : ''}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}
        </Reveal>

        <PrintButton />
      </div>
    </main>
  );
}

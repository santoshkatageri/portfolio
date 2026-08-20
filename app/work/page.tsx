import type { Metadata } from 'next';
import EmptyState from '@/components/EmptyState';
import PageHeader from '@/components/PageHeader';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import { content } from '@/content/site';
import styles from './work.module.css';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Professional projects from Oracle, Zynga and Mindtree — infrastructure automation, cloud cost engineering and IAM automation, each with its context, build and outcome.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  const { projects, profile } = content;
  const featured = projects.filter((project) => project.featured);
  const standard = projects.filter((project) => !project.featured);
  const ordered = [...featured, ...standard];

  return (
    <main id="main">
      <PageHeader
        eyebrow="Work"
        title="Things I've built"
        intro="Automation and cloud infrastructure work from my roles at Oracle, Zynga and Mindtree. Professional work rather than side projects — each card carries the problem behind it, what was built, and what measurably changed."
        meta={
          profile.credibility
            ? `${profile.credibility.statement}`
            : undefined
        }
      />

      <section className="section" aria-label="Projects">
        <div className="shell">
          {ordered.length ? (
            <div className={styles.grid}>
              {ordered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState
              label="In preparation"
              title="Project write-ups are being added"
              body="Rather than filling this space with placeholder work, projects are published here one at a time — each with the problem it solved, what was built, and the technologies involved."
            />
          )}

          <Reveal className={styles.footerNote}>
            <p>
              Project artwork is generated as abstract diagrams rather than
              product screenshots — no invented visuals for employer-internal
              systems. Side experiments and prototypes live in{' '}
              <a className={styles.footerLink} href="/labs">
                the Lab
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

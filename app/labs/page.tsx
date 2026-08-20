import type { Metadata } from 'next';
import EmptyState from '@/components/EmptyState';
import { LabExperimentCard, LabTrackCard } from '@/components/LabExperiment';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { content } from '@/content/site';
import styles from './labs.module.css';

export const metadata: Metadata = {
  title: 'Labs',
  description:
    'SPKATAGERI Tech Lab — experiments, prototypes, AI-assisted builds and technical investigations. Published as they become real, never before.',
  alternates: { canonical: '/labs' },
};

export default function LabsPage() {
  const { experiments, labTracks, profile } = content;

  return (
    <main id="main">
      <PageHeader
        eyebrow="Labs"
        title={`${profile.brand} Tech Lab`}
        intro="Where the experiments live. Different from Work: Work is what I built professionally; the Lab is what I build to learn — AI experiments, automation workflows, DevOps trials, system design studies and small tools, tried in the open and then written up."
        meta={
          experiments.length
            ? `${experiments.length} ${experiments.length === 1 ? 'experiment' : 'experiments'}`
            : 'Opening soon — tracks below'
        }
      />

      <section className="section" aria-labelledby="experiments-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Experiments"
            title="On the bench"
            id="experiments-title"
            intro="Each experiment records why it was built, what was used, and what was actually learned — links appear only when something public exists to link to."
          />

          {experiments.length ? (
            <div className={styles.grid}>
              {experiments.map((experiment, index) => (
                <LabExperimentCard
                  key={experiment.id}
                  experiment={experiment}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              label="No experiments published yet"
              title="The Lab is open, the shelves are not full"
              body="Experiments are added here once there is something real to show — code, a write-up, or a working prototype. Nothing is published just to fill the grid."
            />
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="tracks-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Tracks"
            title="Lab tracks"
            id="tracks-title"
            intro="The themes the Lab is being built around. Descriptions of intent, not claims that work already exists."
          />
          <div className={styles.grid}>
            {labTracks.map((track, index) => (
              <LabTrackCard key={track.id} track={track} index={index} />
            ))}
          </div>

          <Reveal className={styles.footerNote}>
            <p>
              When an experiment is finished it becomes a write-up in{' '}
              <a className={styles.footerLink} href="/writing">
                Writing
              </a>{' '}
              — the Lab is where things get tried, Writing is where they get
              explained.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

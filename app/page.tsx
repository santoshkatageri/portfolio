import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import EmptyState from '@/components/EmptyState';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import ExplorationList from '@/components/ExplorationList';
import Hero from '@/components/Hero';
import { LabExperimentCard, LabTrackCard } from '@/components/LabExperiment';
import Marquee from '@/components/Marquee';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import SeriesCard from '@/components/SeriesCard';
import SocialLink from '@/components/SocialLink';
import { content } from '@/content/site';
import { getArticles, getSeriesArticles } from '@/lib/articles';
import { WRITING_SERIES } from '@/content/writing';
import styles from './page.module.css';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const kernelbites = WRITING_SERIES[0];

export default function HomePage() {
  const {
    profile,
    experience,
    projects,
    links,
    experiments,
    labTracks,
    explorations,
    principles,
  } = content;

  const articles = getArticles();
  const latestArticles = articles.slice(0, 3);
  const kernelbitesArticles = kernelbites
    ? getSeriesArticles(kernelbites.id)
    : [];

  const featured = projects.filter((project) => project.featured);
  const standard = projects.filter((project) => !project.featured);
  const selectedWork = [...featured, ...standard].slice(0, 3);
  const firstName = profile.name.split(' ')[0];
  const sayHi = links.find((link) => link.primary) ?? links[0];

  return (
    <main id="main">
      {/* ── Cinematic hero ─────────────────────────────────────────────── */}
      <Hero profile={profile} />

      {/* ── Principles marquee ─────────────────────────────────────────── */}
      <Marquee principles={principles} />

      {/* ── Selected work ──────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="work-title">
        <div className="shell">
          <SectionHeading
            eyebrow="01 — Work"
            title="Selected work"
            id="work-title"
            intro="Automation and cloud infrastructure work from my roles at Oracle, Zynga and Mindtree — each with the problem behind it, what was built, and what changed."
          />

          {selectedWork.length ? (
            <div className={styles.projects}>
              {selectedWork.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState
              label="In preparation"
              title="Project write-ups are being added"
              body="Rather than filling this space with placeholder work, projects are published one at a time — each with the problem it solved, what was built, and the technologies involved."
            />
          )}

          <Reveal className={styles.sectionFooter}>
            <Link className="btn" href="/work">
              All work
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Latest writing ─────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="writing-title">
        <div className="shell">
          <SectionHeading
            eyebrow="02 — Writing"
            title="Latest writing"
            id="writing-title"
            intro="Technical notes on system design, Kubernetes, DevOps and the systems underneath everyday engineering — starting with KernelBites."
          />

          {latestArticles.length ? (
            <>
              <div className={styles.articles}>
                {latestArticles.map((article, index) => (
                  <ArticleCard
                    key={article.slug}
                    article={article}
                    index={index}
                  />
                ))}
              </div>
              <Reveal className={styles.sectionFooter}>
                <Link className="btn" href="/writing">
                  All writing
                  <span className="btn__arrow" aria-hidden="true">→</span>
                </Link>
              </Reveal>
            </>
          ) : kernelbites ? (
            <>
              <SeriesCard series={kernelbites} published={kernelbitesArticles} />
              <Reveal className={styles.sectionFooter}>
                <p className={styles.sectionNote}>
                  Articles appear here only once they are actually written — no
                  filler. The first bites are in progress.
                </p>
                <Link className="btn" href="/writing">
                  Visit Writing
                  <span className="btn__arrow" aria-hidden="true">→</span>
                </Link>
              </Reveal>
            </>
          ) : (
            <EmptyState
              label="Nothing published yet"
              title="Writing starts where the work does"
              body="Notes are published only when they come from something actually built or debugged — no filler articles. The first pieces will appear here."
            />
          )}
        </div>
      </section>

      {/* ── Labs ───────────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="labs-title">
        <div className="shell">
          <SectionHeading
            eyebrow="03 — Labs"
            title="Engineering labs"
            id="labs-title"
            intro="A working space for experiments: AI tooling, automation, DevOps trials, system design studies and small products. Published as they become real."
          />

          {experiments.length ? (
            <div className={styles.lab}>
              {experiments.map((experiment, index) => (
                <LabExperimentCard
                  key={experiment.id}
                  experiment={experiment}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <>
              <Reveal className={styles.labIntro}>
                <p className={styles.sectionNote}>
                  No experiments published yet — these are the tracks the Lab is
                  being built around. Each becomes a card once there is
                  something real to show.
                </p>
              </Reveal>
              <div className={styles.lab}>
                {labTracks.map((track, index) => (
                  <LabTrackCard key={track.id} track={track} index={index} />
                ))}
              </div>
            </>
          )}

          <Reveal className={styles.sectionFooter}>
            <Link className="btn" href="/labs">
              Enter the Lab
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Current exploration ────────────────────────────────────────── */}
      {explorations.length ? (
        <section className="section" aria-labelledby="exploring-title">
          <div className="shell">
            <SectionHeading
              eyebrow="04 — Exploring"
              title="What I'm exploring"
              id="exploring-title"
              intro="A living notebook of what is currently being dug into — areas, not skill ratings. It changes as the work changes."
            />
            <ExplorationList items={explorations} />
          </div>
        </section>
      ) : null}

      {/* ── Experience ─────────────────────────────────────────────────── */}
      {experience.length ? (
        <section className="section" aria-labelledby="experience-title">
          <div className="shell">
            <SectionHeading
              eyebrow="05 — Experience"
              title="The through-line"
              id="experience-title"
              intro="Nine-plus years across DevOps consulting, cloud engineering for game teams, and running a cloud service at scale — with automation as the common thread."
            />
            <ExperienceTimeline roles={experience} variant="compact" />
            <Reveal className={styles.sectionFooter}>
              <Link className="btn" href="/about">
                More about {firstName}
                <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ── Contact ────────────────────────────────────────────────────── */}
      <section className="section" id="contact" aria-labelledby="contact-title">
        <div className="shell">
          <SectionHeading
            eyebrow="06 — Contact"
            title="Say hi"
            id="contact-title"
          />

          <div className={styles.contact}>
            <Reveal className={styles.contactCopy}>
              <p className={styles.contactBody}>
                Open to conversations about DevOps, cloud engineering,
                automation, AI, or anything being built in the Lab.
              </p>
              <p className={styles.contactMeta}>
                {profile.brand} · {profile.positioning}
              </p>
              {sayHi ? (
                <a
                  className={`btn btn--primary ${styles.contactCta}`}
                  href={sayHi.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Say hi
                  <span className="btn__arrow" aria-hidden="true">↗</span>
                </a>
              ) : null}
            </Reveal>

            {links.length ? (
              <Reveal className={styles.contactLinks} delay={80}>
                {links.map((link) => (
                  <SocialLink key={link.id} link={link} />
                ))}
              </Reveal>
            ) : (
              <EmptyState
                label="Contact details pending"
                title="Public profiles coming soon"
                body="Email and professional profile links will be published here once confirmed for public use."
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

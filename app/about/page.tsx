import type { Metadata } from 'next';
import EmptyState from '@/components/EmptyState';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import ExplorationList from '@/components/ExplorationList';
import PageHeader from '@/components/PageHeader';
import Pillars from '@/components/Pillars';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import SkillGroup from '@/components/SkillGroup';
import SocialLink from '@/components/SocialLink';
import { content } from '@/content/site';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Santosh Katageri — Senior Member of Technical Staff for Cloud & DevOps at Oracle. The story, the experience, the interests and the current areas of exploration.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  const {
    profile,
    experience,
    skills,
    education,
    certifications,
    recognitions,
    links,
    explorations,
    principles,
  } = content;
  const firstName = profile.name.split(' ')[0];

  return (
    <main id="main">
      <PageHeader
        eyebrow="About"
        title={`About ${firstName}`}
        intro={profile.headline}
        meta={profile.currentRole}
      />

      {/* ── Story ───────────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="story-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Story"
            title="The longer version"
            id="story-title"
          />
          <div className={styles.story}>
            <Reveal className={styles.storyCopy}>
              {profile.about.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </Reveal>

            <Reveal className={styles.storyAside} delay={80}>
              <div className={styles.asideBlock}>
                <p className={styles.asideTitle}>Focus</p>
                <span className={styles.asideItem}>
                  <strong>{profile.positioning}</strong>
                  {profile.currentRole ? <span>{profile.currentRole}</span> : null}
                  {profile.location ? <span>{profile.location}</span> : null}
                </span>
              </div>

              {links.length ? (
                <div className={styles.asideBlock}>
                  <p className={styles.asideTitle}>Elsewhere</p>
                  {links.map((link) => (
                    <SocialLink key={link.id} link={link} />
                  ))}
                </div>
              ) : null}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── How I work ──────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="principles-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Approach"
            title="How I work"
            id="principles-title"
            intro={profile.philosophy}
          />
          <Pillars principles={principles} />
        </div>
      </section>

      {/* ── Experience ──────────────────────────────────────────────────── */}
      {experience.length ? (
        <section className="section" aria-labelledby="experience-title">
          <div className="shell">
            <SectionHeading
              eyebrow="Experience"
              title="Engineering experience"
              id="experience-title"
              intro="Nine-plus years across DevOps consulting, cloud engineering and running a cloud service at scale."
            />
            <ExperienceTimeline roles={experience} />
          </div>
        </section>
      ) : null}

      {/* ── Skills ──────────────────────────────────────────────────────── */}
      {skills.length ? (
        <section className="section" aria-labelledby="skills-title">
          <div className="shell">
            <SectionHeading
              eyebrow="Capabilities"
              title="What I work with"
              id="skills-title"
              intro="Grouped by the kind of problem they solve rather than listed as one long stack — and deliberately without self-assigned skill ratings."
            />
            <div className={styles.skills}>
              {skills.map((group, index) => (
                <SkillGroup key={group.id} group={group} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Current exploration ─────────────────────────────────────────── */}
      {explorations.length ? (
        <section className="section" aria-labelledby="exploring-title">
          <div className="shell">
            <SectionHeading
              eyebrow="Exploring"
              title="What I'm exploring"
              id="exploring-title"
              intro="Areas, not skill ratings — a living notebook that changes as the work changes."
            />
            <ExplorationList items={explorations} />
          </div>
        </section>
      ) : null}

      {/* ── Education & recognition ─────────────────────────────────────── */}
      {education.length || recognitions.length || certifications.length ? (
        <section className="section" aria-labelledby="background-title">
          <div className="shell">
            <SectionHeading
              eyebrow="Background"
              title="Education & recognition"
              id="background-title"
            />

            <div className={styles.background}>
              {education.length ? (
                <Reveal className={styles.backgroundBlock}>
                  <p className={styles.asideTitle}>Education</p>
                  {education.map((item) => (
                    <span className={styles.asideItem} key={item.id}>
                      <strong>{item.qualification}</strong>
                      <span>
                        {item.institution}
                        {item.period ? ` · ${item.period}` : ''}
                      </span>
                    </span>
                  ))}
                </Reveal>
              ) : null}

              {certifications.length ? (
                <Reveal className={styles.backgroundBlock} delay={60}>
                  <p className={styles.asideTitle}>Certifications</p>
                  {certifications.map((item) => (
                    <span className={styles.asideItem} key={item.id}>
                      <strong>{item.name}</strong>
                      <span>
                        {[item.issuer, item.year].filter(Boolean).join(' · ')}
                      </span>
                    </span>
                  ))}
                </Reveal>
              ) : null}

              {recognitions.length ? (
                <Reveal className={styles.backgroundBlock} delay={120}>
                  <p className={styles.asideTitle}>Recognition</p>
                  {recognitions.map((item) => (
                    <span className={styles.asideItem} key={item.id}>
                      <strong>{item.name}</strong>
                      {item.issuer || item.year ? (
                        <span>
                          {[item.issuer, item.year].filter(Boolean).join(' · ')}
                        </span>
                      ) : null}
                    </span>
                  ))}
                </Reveal>
              ) : null}
            </div>
          </div>
        </section>
      ) : (
        <section className="section">
          <div className="shell">
            <EmptyState
              label="Awaiting content"
              title="Education & recognition"
              body="Published from a single verified source file, so nothing appears here until it is accurate."
            />
          </div>
        </section>
      )}
    </main>
  );
}

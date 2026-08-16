import ArticleCard from '@/components/ArticleCard';
import EmptyState from '@/components/EmptyState';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import Hero from '@/components/Hero';
import { LabExperimentCard, LabTrackCard } from '@/components/LabExperiment';
import Pillars from '@/components/Pillars';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader, { type NavItem } from '@/components/SiteHeader';
import SkillGroup from '@/components/SkillGroup';
import SocialLink from '@/components/SocialLink';
import { content } from '@/content/site';
import styles from './page.module.css';

const NAV: NavItem[] = [
  { href: '#top', label: 'Home' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#lab', label: 'Lab' },
  { href: '#notes', label: 'Notes' },
  { href: '#about', label: 'About' },
];

export default function HomePage() {
  const {
    profile,
    experience,
    projects,
    skills,
    education,
    certifications,
    links,
    recognitions,
    experiments,
    labTracks,
    articles,
  } = content;

  const featuredCount = projects.filter((project) => project.featured).length;
  const firstName = profile.name.split(' ')[0];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SiteHeader
        name={profile.name}
        positioning={profile.positioning}
        navItems={NAV}
        ctaLabel="Let's connect"
        ctaHref="#contact"
      />

      <main id="main">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <Hero
          profile={profile}
          primary={{ label: 'Explore my work', href: '#work' }}
          secondary={{ label: 'About me', href: '#about' }}
        />

        {/* ── Work ─────────────────────────────────────────────────────── */}
        <section className="section" id="work" aria-labelledby="work-title">
          <div className="shell">
            <SectionHeading
              eyebrow="01 — Work"
              title="Things I've built"
              id="work-title"
              intro="Automation and cloud infrastructure work from my roles at Oracle, Zynga and Mindtree — each with the problem behind it, what was built, and what measurably changed."
            />

            {projects.length ? (
              <div
                className={styles.projects}
                data-columns={
                  (projects.length - featuredCount) % 3 === 0 &&
                  projects.length - featuredCount >= 3
                    ? '3'
                    : projects.length - featuredCount > 1
                      ? '2'
                      : '1'
                }
              >
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <EmptyState
                label="In preparation"
                title="Project write-ups are being added"
                body="Rather than filling this space with placeholder work, projects are published here one at a time — each with the problem it solved, what was built, and the technologies involved."
                action={{ label: "Let's connect", href: '#contact' }}
              />
            )}
          </div>
        </section>

        {/* ── Experience ───────────────────────────────────────────────── */}
        <section
          className="section"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="shell">
            <SectionHeading
              eyebrow="02 — Career"
              title="Engineering experience"
              id="experience-title"
              intro="Eight-plus years across DevOps consulting, cloud engineering and running a cloud service at scale."
            />

            {experience.length ? (
              <ExperienceTimeline roles={experience} />
            ) : (
              <EmptyState
                label="Awaiting content"
                title="Professional history"
                body="Employment history is published from a single verified source file, so nothing appears here until it is accurate."
              />
            )}
          </div>
        </section>

        {/* ── Capabilities ─────────────────────────────────────────────── */}
        <section
          className="section"
          id="capabilities"
          aria-labelledby="capabilities-title"
        >
          <div className="shell">
            <SectionHeading
              eyebrow="03 — Capabilities"
              title="What I work with"
              id="capabilities-title"
              intro="Grouped by the kind of problem they solve rather than listed as one long stack — and deliberately without self-assigned skill ratings."
            />

            {skills.length ? (
              <div className={styles.skills}>
                {skills.map((group, index) => (
                  <SkillGroup key={group.id} group={group} index={index} />
                ))}
              </div>
            ) : (
              <EmptyState
                label="Awaiting content"
                title="Technology groups"
                body="Tooling is listed here only where it is backed by real, hands-on work — organised into AI and automation, DevOps and infrastructure, software engineering, cloud, systems and developer tooling."
              />
            )}
          </div>
        </section>

        {/* ── Philosophy ───────────────────────────────────────────────── */}
        <section
          className="section"
          id="philosophy"
          aria-labelledby="philosophy-title"
        >
          <div className="shell">
            <Reveal className={styles.philosophyBanner}>
              <span className="mono">04 — Approach</span>
              <h2 className={styles.philosophyHeading} id="philosophy-title">
                Build it. Understand it. <span>Experiment with it. Share it.</span>
              </h2>
              <p className={styles.philosophyBody}>
                This site is not meant to be a static résumé. It is a record of
                what gets built, studied, tested and learned — updated as the
                work happens rather than written once and left alone.
              </p>
            </Reveal>
            <Pillars />
          </div>
        </section>

        {/* ── Lab ──────────────────────────────────────────────────────── */}
        <section className="section" id="lab" aria-labelledby="lab-title">
          <div className="shell">
            <SectionHeading
              eyebrow="05 — Lab"
              title="SPKATAGERI Lab"
              id="lab-title"
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
                <div className={styles.labIntro}>
                  <EmptyState
                    label="No experiments published yet"
                    title="The Lab is open, the shelves are not full"
                    body="These are the tracks the Lab is being built around. Each one becomes a card here once there is something real to show — code, a write-up, or a working prototype."
                  />
                </div>
                <div className={styles.lab}>
                  {labTracks.map((track, index) => (
                    <LabTrackCard key={track.id} track={track} index={index} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* ── Notes ────────────────────────────────────────────────────── */}
        <section className="section" id="notes" aria-labelledby="notes-title">
          <div className="shell">
            <SectionHeading
              eyebrow="06 — Writing"
              title="Notes & insights"
              id="notes-title"
              intro="Technical notes, engineering explanations, DevOps lessons and architecture breakdowns."
            />

            {articles.length ? (
              <div className={styles.notes}>
                {articles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>
            ) : (
              <EmptyState
                label="Nothing published yet"
                title="Writing starts where the work does"
                body="Notes are published only when they come from something actually built or debugged — no filler articles. The first pieces will appear here."
              />
            )}
          </div>
        </section>

        {/* ── About ────────────────────────────────────────────────────── */}
        <section className="section" id="about" aria-labelledby="about-title">
          <div className="shell">
            <SectionHeading
              eyebrow="07 — Profile"
              title={`About ${firstName}`}
              id="about-title"
            />

            <div className={styles.about}>
              <Reveal className={styles.aboutCopy}>
                {profile.about.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </Reveal>

              <Reveal className={styles.aboutAside} delay={80}>
                <div className={styles.asideBlock}>
                  <p className={styles.asideTitle}>Focus</p>
                  <span className={styles.asideItem}>
                    <strong>{profile.positioning}</strong>
                    {profile.currentRole ? <span>{profile.currentRole}</span> : null}
                    {profile.location ? <span>{profile.location}</span> : null}
                  </span>
                </div>

                {education.length ? (
                  <div className={styles.asideBlock}>
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
                  </div>
                ) : null}

                {certifications.length ? (
                  <div className={styles.asideBlock}>
                    <p className={styles.asideTitle}>Certifications</p>
                    {certifications.map((item) => (
                      <span className={styles.asideItem} key={item.id}>
                        <strong>{item.name}</strong>
                        <span>
                          {[item.issuer, item.year].filter(Boolean).join(' · ')}
                        </span>
                      </span>
                    ))}
                  </div>
                ) : null}

                {recognitions.length ? (
                  <div className={styles.asideBlock}>
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
                  </div>
                ) : null}
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────────────── */}
        <section className="section" id="contact" aria-labelledby="contact-title">
          <div className="shell">
            <SectionHeading eyebrow="08 — Contact" title="Let's connect" id="contact-title" />

            <div className={styles.contact}>
              <Reveal className={styles.contactCopy}>
                <p className={styles.contactBody}>
                  Open to conversations about cloud and DevOps engineering,
                  automation work, or anything being built in the Lab.
                </p>
                <p className={styles.contactBody}>
                  {profile.brand} · {profile.positioning}
                </p>
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

      <SiteFooter
        brand={profile.brand}
        name={profile.name}
        positioning={profile.positioning}
        philosophy={profile.philosophy}
        navItems={NAV}
        links={links}
      />
    </>
  );
}

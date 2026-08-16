import type { Profile } from '@/content/types';
import Reveal from './Reveal';
import SystemGraph from './SystemGraph';
import styles from './Hero.module.css';

type HeroProps = {
  profile: Profile;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

export default function Hero({ profile, primary, secondary }: HeroProps) {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className="shell">
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Reveal className={styles.identity}>
              <span className={styles.identityMark}>{profile.brand}</span>
              <span className={styles.identityDot} aria-hidden="true" />
              <span className={styles.identityLine}>{profile.positioning}</span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className={styles.title} id="hero-title">
                I build, understand, and <em>experiment with</em> technology.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className={`lede ${styles.intro}`}>{profile.intro}</p>
            </Reveal>

            <Reveal delay={240} className={styles.actions}>
              <a className="btn btn--primary" href={primary.href}>
                {primary.label}
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="btn" href={secondary.href}>
                {secondary.label}
              </a>
            </Reveal>
          </div>

          <Reveal delay={140} className={styles.visual}>
            <SystemGraph />
          </Reveal>
        </div>

        <Reveal delay={200} className={styles.philosophy}>
          <span className={styles.philosophyLabel}>Working principle</span>
          <p className={styles.philosophyText}>{profile.philosophy}</p>
        </Reveal>
      </div>
    </section>
  );
}

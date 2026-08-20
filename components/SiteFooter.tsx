import Link from 'next/link';
import { content } from '@/content/site';
import { PRIMARY_NAV, RESUME_HREF } from '@/lib/nav';
import styles from './SiteFooter.module.css';

/** Shared chrome footer — data comes from the single content source. */
export default function SiteFooter() {
  const { profile, links, principles } = content;
  const year = new Date().getFullYear();

  return (
    <footer className={`site-chrome ${styles.footer}`}>
      <div className="shell">
        <div className={styles.grid}>
          <div className={styles.brandBlock}>
            <span className={styles.wordmark}>{profile.brand}</span>
            <p className={styles.identity}>{profile.identity}</p>
            <p className={styles.tagline}>{profile.philosophy}</p>
            <p className={styles.principles} aria-hidden="true">
              {principles.map((principle) => principle.label).join(' · ')}
            </p>
          </div>

          <nav className={styles.nav} aria-label="Sections">
            <p className={styles.navTitle}>Sections</p>
            {PRIMARY_NAV.map((item) => (
              <Link className={styles.navLink} key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link className={styles.navLink} href={RESUME_HREF}>
              Resume ↗
            </Link>
          </nav>

          <div className={styles.nav}>
            <p className={styles.navTitle}>Elsewhere</p>
            {links.length ? (
              links.map((link) => (
                <a
                  className={styles.navLink}
                  key={link.id}
                  href={link.href}
                  {...(link.kind === 'email'
                    ? {}
                    : { target: '_blank', rel: 'noreferrer noopener' })}
                >
                  {link.label}
                </a>
              ))
            ) : (
              <p className={styles.tagline}>Public profiles coming soon.</p>
            )}
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            © {year} {profile.name}
          </span>
          <span className={styles.bottomMeta}>{profile.positioning}</span>
          <a className={styles.toTop} href="#top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

import type { ProfileLink } from '@/content/types';
import type { NavItem } from './SiteHeader';
import styles from './SiteFooter.module.css';

type SiteFooterProps = {
  brand: string;
  name: string;
  positioning: string;
  philosophy: string;
  navItems: NavItem[];
  links: ProfileLink[];
};

export default function SiteFooter({
  brand,
  name,
  positioning,
  philosophy,
  navItems,
  links,
}: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="shell">
        <div className={styles.grid}>
          <div className={styles.brandBlock}>
            <span className={styles.wordmark}>{brand}</span>
            <p className={styles.tagline}>{positioning}</p>
            <p className={styles.tagline}>{philosophy}</p>
          </div>

          <nav className={styles.nav} aria-label="Footer">
            <p className={styles.navTitle}>Sections</p>
            {navItems.map((item) => (
              <a className={styles.navLink} key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
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
            © {year} {name}
          </span>
          <a className={styles.toTop} href="#top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

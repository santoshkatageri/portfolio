import type { ProfileLink } from '@/content/types';
import styles from './SocialLink.module.css';

export default function SocialLink({ link }: { link: ProfileLink }) {
  const external = link.kind !== 'email';

  return (
    <a
      className={styles.link}
      href={link.href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      <span className={styles.text}>
        <span className={styles.label}>{link.label}</span>
        <span className={styles.value}>{link.value}</span>
      </span>
      <span className={styles.arrow} aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

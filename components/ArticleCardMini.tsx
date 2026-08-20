import Reveal from './Reveal';
import styles from './ArticleCardMini.module.css';

/**
 * Compact row for an externally hosted note (content.site.articles) — links
 * out when a public href exists, renders as plain text when it does not.
 */
export default function ArticleCardMini({
  title,
  excerpt,
  href,
  date,
  readingTime,
  tags = [],
  index = 0,
}: {
  title: string;
  excerpt: string;
  href?: string;
  date?: string;
  readingTime?: string;
  tags?: string[];
  index?: number;
}) {
  const meta = [date, readingTime, ...tags].filter(Boolean);

  const inner = (
    <>
      {meta.length ? (
        <p className={styles.meta}>
          {meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </p>
      ) : null}
      <h3 className={styles.title}>
        {title}
        {href ? <span aria-hidden="true"> ↗</span> : null}
      </h3>
      <p className={styles.excerpt}>{excerpt}</p>
    </>
  );

  return (
    <Reveal as="article" className={styles.card} delay={index * 50}>
      {href ? (
        <a className={styles.link} href={href} target="_blank" rel="noreferrer noopener">
          {inner}
        </a>
      ) : (
        inner
      )}
    </Reveal>
  );
}

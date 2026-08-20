import Link from 'next/link';
import type { WritingSeries } from '@/content/writing';
import { getCategory } from '@/content/writing';
import type { WritingArticle } from '@/lib/articles';
import Reveal from './Reveal';
import styles from './SeriesCard.module.css';

/**
 * A content series block (KernelBites and any future ones). Planned topics
 * are framed as intent; published articles — supplied by the caller from the
 * article loader — link to their /writing/[slug] pages. The card supports the
 * full future shape of a KernelBites entry: explanation, diagrams, code,
 * video, infographic, quiz and related resources all live inside the article
 * itself once written.
 */
export default function SeriesCard({
  series,
  published = [],
}: {
  series: WritingSeries;
  /** Articles already published in this series, in series order */
  published?: WritingArticle[];
}) {
  const publishedSlots = new Set(
    published.map((article) => article.seriesSlot).filter(Boolean),
  );
  const upcoming = series.plannedTopics.filter(
    (topic) => !publishedSlots.has(topic.slot),
  );

  return (
    <Reveal className={styles.card} dataAttrs={{ 'data-series': series.id }}>
      <div className={styles.head}>
        <p className={styles.format}>{series.format}</p>
        <h3 className={`display ${styles.name}`}>{series.name}</h3>
        <p className={styles.description}>{series.description}</p>
        <p className={styles.formats} aria-hidden="true">
          explanation · diagrams · code · video · infographic · quiz · resources
        </p>
      </div>

      {published.length ? (
        <div className={styles.entries}>
          <p className={styles.entriesTitle}>Published bites</p>
          {published.map((article) => (
            <Link
              key={article.slug}
              className={styles.entry}
              href={`/writing/${article.slug}`}
            >
              <span className={styles.entrySlot}>{article.seriesSlot ?? '—'}</span>
              <span className={styles.entryTitle}>{article.title}</span>
              <span className={styles.entryMeta}>
                {article.category.label} · {article.readingTime}
              </span>
            </Link>
          ))}
        </div>
      ) : null}

      {upcoming.length ? (
        <div className={styles.entries}>
          <p className={styles.entriesTitle}>Planned — written, not filler</p>
          {upcoming.map((topic) => (
            <div className={`${styles.entry} ${styles.entryPlanned}`} key={topic.slot}>
              <span className={styles.entrySlot}>{topic.slot}</span>
              <span className={styles.entryTitle}>{topic.title}</span>
              <span className={styles.entryMeta}>
                {getCategory(topic.category)?.label ?? topic.category}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </Reveal>
  );
}

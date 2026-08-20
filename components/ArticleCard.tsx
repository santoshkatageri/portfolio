import Link from 'next/link';
import type { WritingArticle } from '@/lib/articles';
import { formatArticleDate } from '@/lib/articles';
import Reveal from './Reveal';
import styles from './ArticleCard.module.css';

/**
 * Card for an on-site article (MDX under content/articles). The whole card
 * links to /writing/[slug]; series articles carry their series badge.
 */
export default function ArticleCard({
  article,
  index = 0,
}: {
  article: WritingArticle;
  index?: number;
}) {
  return (
    <Reveal
      as="article"
      className={styles.card}
      delay={index * 60}
      dataAttrs={{ 'data-series': article.series?.id }}
    >
      <Link className={styles.link} href={`/writing/${article.slug}`}>
        <p className={styles.meta}>
          {article.series ? (
            <span className={styles.series}>
              {article.series.name}
              {article.seriesSlot ? ` ${article.seriesSlot}` : ''}
            </span>
          ) : null}
          <span className={styles.category}>{article.category.label}</span>
          <span>{formatArticleDate(article.date)}</span>
          <span>{article.readingTime}</span>
        </p>
        <h3 className={`display ${styles.title}`}>{article.title}</h3>
        {article.description ? (
          <p className={styles.excerpt}>{article.description}</p>
        ) : null}
        {article.tags.length ? (
          <ul className="chips" aria-hidden="true">
            {article.tags.map((tag) => (
              <li className="chip" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </Link>
    </Reveal>
  );
}

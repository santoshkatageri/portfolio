import type { Article } from '@/content/types';
import Reveal from './Reveal';
import styles from './ArticleCard.module.css';

export default function ArticleCard({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  return (
    <Reveal as="article" className={styles.card} delay={index * 50}>
      {(article.date || article.readingTime || article.tags.length) && (
        <p className={styles.meta}>
          {article.date ? <span>{article.date}</span> : null}
          {article.readingTime ? <span>{article.readingTime}</span> : null}
          {article.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </p>
      )}
      <h3 className={styles.title}>
        {article.href ? (
          <a
            className={styles.titleLink}
            href={article.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            {article.title} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          article.title
        )}
      </h3>
      <p className={styles.excerpt}>{article.excerpt}</p>
    </Reveal>
  );
}

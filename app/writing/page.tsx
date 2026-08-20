import type { Metadata } from 'next';
import ArticleCard from '@/components/ArticleCard';
import EmptyState from '@/components/EmptyState';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import SeriesCard from '@/components/SeriesCard';
import { content } from '@/content/site';
import { WRITING_CATEGORIES, WRITING_SERIES } from '@/content/writing';
import { getArticles, getSeriesArticles } from '@/lib/articles';
import ArticleCardMini from '@/components/ArticleCardMini';
import styles from './writing.module.css';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Technical writing on system design, Kubernetes, DevOps, cloud and platform engineering — including the KernelBites series on the kernel-level ideas behind everyday engineering.',
  alternates: { canonical: '/writing', types: { 'application/rss+xml': '/rss.xml' } },
};

export default async function WritingPage() {
  const articles = await getArticles();
  const series = await Promise.all(
    WRITING_SERIES.map(async (item) => ({
      series: item,
      published: await getSeriesArticles(item.id),
    })),
  );

  return (
    <main id="main">
      <PageHeader
        eyebrow="Writing"
        title="Notes & insights"
        intro="Writing about system design, Kubernetes, DevOps, cloud and platform engineering — published only when it comes from something actually built, debugged or studied. No filler."
        meta={
          articles.length
            ? `${articles.length} ${articles.length === 1 ? 'article' : 'articles'}`
            : 'First articles in progress'
        }
      />

      {/* ── Articles ───────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="articles-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Articles"
            title="Latest articles"
            id="articles-title"
            serif
          />

          {articles.length ? (
            <div className={styles.articles}>
              {articles.map((article, index) => (
                <ArticleCard key={article.slug} article={article} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState
              label="Nothing published yet"
              title="Writing starts where the work does"
              body="Notes are published only when they come from something actually built or debugged. The first pieces — starting with KernelBites — will appear here."
            />
          )}

          {content.articles.length ? (
            <Reveal className={styles.elsewhere}>
              <p className={styles.elsewhereTitle}>Elsewhere</p>
              <div className={styles.elsewhereList}>
                {content.articles.map((note) => (
                  <ArticleCardMini
                    key={note.id}
                    title={note.title}
                    excerpt={note.excerpt}
                    href={note.href}
                    date={note.date}
                    readingTime={note.readingTime}
                    tags={note.tags}
                  />
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* ── Series ─────────────────────────────────────────────────────── */}
      {series.length ? (
        <section className="section" aria-labelledby="series-title">
          <div className="shell">
            <SectionHeading
              eyebrow="Series"
              title="Content series"
              id="series-title"
              intro="Recurring formats rather than one-off posts. KernelBites digs one level deeper than the dashboard."
            />
            <div className={styles.seriesList}>
              {series.map(({ series: item, published }) => (
                <SeriesCard
                  key={item.id}
                  series={item}
                  published={published}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Categories ─────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="categories-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Categories"
            title="The map"
            id="categories-title"
            intro="Categories are data, not decoration — every article is filed under exactly one of these, defined once in the content layer."
          />
          <div className={styles.categories}>
            {WRITING_CATEGORIES.map((category, index) => (
              <Reveal
                key={category.id}
                delay={index * 40}
                className={styles.category}
              >
                <span className={styles.categoryLabel}>{category.label}</span>
                <p className={styles.categoryDescription}>
                  {category.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

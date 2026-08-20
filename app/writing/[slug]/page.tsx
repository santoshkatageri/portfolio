import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import Reveal from '@/components/Reveal';
import { ArticleBody } from '@/components/articleMdxComponents';
import {
  formatArticleDate,
  getArticleBySlug,
  getArticles,
  getRelatedArticles,
} from '@/lib/articles';
import styles from './article.module.css';

type Params = { slug: string };

/* `revalidate = 0` keeps this route export-compatible even while the article
   folder is empty — this Next version rejects dynamic routes whose
   generateStaticParams returns no params under output: 'export'. */
/**
 * Webpack context over content/articles — compiled with the app's own MDX
 * loader and React runtime (no eval, no second React copy). Restricted to
 * .mdx so documentation files in the folder never enter the module graph.
 */
type RequireContext = {
  keys(): string[];
  (id: string): { default: ComponentType };
};

const articleContext = (
  import.meta as ImportMeta & {
    webpackContext: (request: string, options: { recursive: boolean; regExp: RegExp }) => RequireContext;
  }
).webpackContext('../../../content/articles', {
  recursive: true,
  regExp: /\.mdx$/,
});

/**
 * Static export: every article page is generated at build time. While the
 * article folder is empty, a single placeholder param keeps this Next version
 * happy (it rejects dynamic routes with zero params under output: 'export');
 * '_' can never collide with a real slug (the loader skips _-prefixed files)
 * and renders the 404 page.
 */
export async function generateStaticParams(): Promise<Params[]> {
  const articles = await getArticles();
  return articles.length
    ? articles.map((article) => ({ slug: article.slug }))
    : [{ slug: '_' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article not found' };

  return {
    title: article.title,
    description: article.description ?? article.title,
    alternates: {
      canonical: `/writing/${article.slug}`,
      types: { 'application/rss+xml': '/rss.xml' },
    },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description ?? article.title,
      publishedTime: article.date,
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  /* MDX bodies are real modules compiled by the bundler with the app's own
     React runtime — no eval, no extra React copy. Ghost bodies are trusted
     HTML rendered inside the scoped ArticleBody styles instead. */
  let Content: ComponentType | null = null;
  if (article.format === 'mdx') {
    try {
      Content = articleContext(`./${article.path}`).default;
    } catch {
      notFound();
    }
  }

  const related = await getRelatedArticles(article);

  return (
    <main id="main" className={styles.main}>
      <article>
        <header className={styles.header}>
          <div className="shell">
            <Link className="arrowLink" href="/writing">
              <span aria-hidden="true">←</span> Writing
            </Link>

            <p className={styles.eyebrow}>
              {article.series ? (
                <span className={styles.series}>
                  {article.series.name}
                  {article.seriesSlot ? ` · ${article.seriesSlot}` : ''}
                </span>
              ) : null}
              <span>{article.category.label}</span>
            </p>

            <h1 className={`display ${styles.title}`}>{article.title}</h1>

            {article.description ? (
              <p className={styles.description}>{article.description}</p>
            ) : null}

            <p className={styles.meta}>
              <span>{formatArticleDate(article.date)}</span>
              <span className={styles.metaDivider} aria-hidden="true">
                /
              </span>
              <span>{article.readingTime}</span>
            </p>
          </div>
        </header>

        {article.cover ? (
          <div className="shell">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.cover}
              src={article.cover}
              alt=""
              loading="lazy"
            />
          </div>
        ) : null}

        <div className={`shell ${styles.bodyShell}`}>
          {article.format === 'html' ? (
            <ArticleBody html={article.body} />
          ) : Content ? (
            <ArticleBody>
              <Content />
            </ArticleBody>
          ) : null}

          {article.tags.length ? (
            <footer className={styles.footer}>
              <ul className="chips" aria-label="Article tags">
                {article.tags.map((tag) => (
                  <li className="chip" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </footer>
          ) : null}
        </div>
      </article>

      {related.length ? (
        <section className={styles.related} aria-labelledby="related-title">
          <div className="shell">
            <h2 className={styles.relatedTitle} id="related-title">
              Related articles
            </h2>
            <div className={styles.relatedList}>
              {related.map((item, index) => (
                <ArticleCard key={item.slug} article={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Reveal className={styles.backWrap}>
        <div className="shell">
          <Link className="btn" href="/writing">
            <span aria-hidden="true">←</span> All writing
          </Link>
        </div>
      </Reveal>
    </main>
  );
}

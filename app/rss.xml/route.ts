import { content } from '@/content/site';
import { getArticles } from '@/lib/articles';

export const dynamic = 'force-static';

/** XML-escape a text value for the feed. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * RSS 2.0 feed for the site's writing — generated at build time from the
 * active article source (Ghost or MDX), so the feed always matches the
 * static site exactly. Ghost's own /rss/ stays disabled/private in headless
 * setups; this is the public feed.
 */
export async function GET(): Promise<Response> {
  const { profile } = content;
  const articles = await getArticles();
  const base = profile.siteUrl;

  const items = articles
    .map((article) => {
      const url = `${base}/writing/${article.slug}`;
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${article.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(article.description ?? article.title)}</description>
      <category>${escapeXml(article.category.label)}</category>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${profile.brand} — Writing`)}</title>
    <link>${base}/writing</link>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(
      `Technical writing by ${profile.name} — ${profile.positioning}`,
    )}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

import type { MetadataRoute } from 'next';
import { content } from '@/content/site';
import { getArticles } from '@/lib/articles';
import { SITE_ROUTES } from '@/lib/nav';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = content.profile.siteUrl;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = SITE_ROUTES.map((route) => ({
    url: `${base}${route === '/' ? '' : route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'monthly' : 'monthly',
    priority: route === '/' ? 1 : route === '/resume' ? 0.5 : 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getArticles().map((article) => ({
    url: `${base}/writing/${article.slug}`,
    lastModified: new Date(`${article.date}T00:00:00Z`),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes];
}

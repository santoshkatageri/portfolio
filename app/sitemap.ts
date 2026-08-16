import type { MetadataRoute } from 'next';
import { content } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: content.profile.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}

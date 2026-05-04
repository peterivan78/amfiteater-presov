import type { MetadataRoute } from 'next';
import { getAllPublishedEvents } from '@/lib/events';
import { eventUrl, siteHomeUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await getAllPublishedEvents();

  return [
    {
      url: siteHomeUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${siteHomeUrl}program`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    ...events.map((event) => ({
      url: eventUrl(event),
      lastModified: new Date(event.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }))
  ];
}

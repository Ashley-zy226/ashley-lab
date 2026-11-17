import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { entries, urlFor } from '../lib/content';
import { site } from '../lib/site';

export const GET: APIRoute = async ({ site: origin }) => {
  const published = [...await entries('blog'), ...await entries('notes')].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return rss({
    title: site.title,
    description: site.description,
    site: origin!,
    xmlns: {},
    customData: '<language>zh-CN</language>',
    items: published.map((entry) => ({ title: entry.data.title, description: entry.data.description, pubDate: entry.data.date, link: urlFor(entry) })),
  });
};

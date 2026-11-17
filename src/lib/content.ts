import { getCollection, type CollectionEntry } from 'astro:content';

export type Entry = CollectionEntry<'blog'>;
export async function entries() {
  const items = await getCollection('blog', ({ data }) => !data.draft);
  return items.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}
export const urlFor = (entry: Entry) => `/${entry.collection}/${entry.id.split('/').map(encodeURIComponent).join('/')}/`;
export const dateText = (date: Date) => date.toISOString().slice(0, 10);
export const yearOf = (date: Date) => date.getUTCFullYear();

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categories, topics } from './lib/site';

const common = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  example: z.boolean().default(false),
  category: z.custom<keyof typeof categories>((value) => typeof value === 'string' && Object.hasOwn(categories, value), '请使用 site.ts 中的分类键'),
  tags: z.array(z.custom<keyof typeof topics>((value) => typeof value === 'string' && Object.hasOwn(topics, value), '请使用 site.ts 中的主题键')).min(1),
});
const files = '**/[!_]*.{md,mdx}';
export const collections = {
  blog: defineCollection({ loader: glob({ pattern: files, base: './src/content/blog' }), schema: common }),
  notes: defineCollection({ loader: glob({ pattern: files, base: './src/content/notes' }), schema: common.extend({ course: z.string().min(1) }) }),
};

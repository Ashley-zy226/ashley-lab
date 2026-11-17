import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const site = process.env.SITE_URL || 'https://ashleyzy.com.cn';
export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap({
    filter: (url) => {
      const { pathname } = new URL(url);
      return !/^\/(?:404(?:\.html)?|search)\/?$/.test(pathname)
        && !/^\/blog\/(?:tag|category)\//.test(pathname);
    },
  })],
  markdown: {
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
    shikiConfig: { theme: 'github-dark' },
  },
});

# Ashley Lab

中文个人技术博客、学习笔记和作品集。使用 Astro、TypeScript 和 Markdown / MDX，构建为纯静态网站；文章、搜索索引与数学字体均随站点发布。

## 本地开发

推荐使用 Node.js 24（见 `.nvmrc`）和 npm。已安装 nvm 时，可先运行 `nvm install && nvm use`。

```bash
npm ci
npm run dev
```

打开 <http://localhost:4321/>。保存源码或文章后，开发服务器会刷新页面。以下命令用于检查并预览实际发布产物：

```bash
npm run check
npm run build
npm run preview
```

全文索引在 `npm run build` 时生成，测试搜索请使用生产预览。默认搜索博客和笔记的正文，可试搜「步幅」和「提前退出」。在任意页面按 `/` 可进入搜索。

## 维护内容

| 文件 / 目录 | 用途 |
| --- | --- |
| `src/lib/site.ts` | 个人简介、姓名、教育信息、公开邮箱、GitHub、社交链接、项目、分类与主题 |
| `src/content/blog/` | 技术文章；新文件自动进入列表、分类、标签与年份归档 |
| `src/content/notes/` | 课程笔记；按 frontmatter 的 `course` 字段分组 |
| `src/styles/global.css` | 响应式布局、主题颜色与文章排版 |
| `astro.config.mjs` | 站点地址、Markdown 处理器和静态构建设置 |
| `public/` | 站标、分享图与可引用的公开文件 |

新建 `src/content/blog/my-first-post.md`（也可用 `.mdx`），参考：

```markdown
---
title: "我的第一篇技术文章"
description: "用一两句话交代读者可以看到什么。"
date: 2026-11-17
category: deep-learning
tags: [pytorch, deep-learning]
featured: false
draft: true
---

## 实验准备

这里写正文。行内公式：$y = Wx + b$。

$$
\frac{1}{n}\sum_{i=1}^n x_i
$$
```

- 分类和标签填写 `src/lib/site.ts` 中已有的键，可在该文件扩充对应的中文展示名。
- 正文从二级标题开始；二、三级标题自动生成目录。代码围栏可标注 `python`、`cpp`、`bash` 等语言。
- 示例内容用 `example: true` 标记；更新时可填 `updated: YYYY-MM-DD`。想置于首页精选优先位置时设 `featured: true`。
- 草稿设为 `draft: true`。草稿不会出现在输出、RSS 或搜索索引中；如果 GitHub 仓库公开，仓库里的草稿源码仍可被看到。
- 笔记使用同样的字段，并添加 `course: 数据结构与算法`。文件名决定链接，推荐小写英文和短横线；避免占用 `archive`、`tag`、`category` 等已有路径。发布后如需改名，给旧地址配置跳转。
- 发布前，将 `draft` 改为 `false`，运行检查和构建，确认文章显示、目录、公式和搜索正常，再提交变更。初始 Markdown 和 MDX 内容均为明确标注的示例，可保留或替换。

## 推送到 GitHub

本地已有 `main` 分支和首个提交。正式上线前请检查你希望公开的个人资料。网站可公开访问，源码仓库的公开性可单独选择。

由你登录 GitHub，[创建一个空仓库](https://github.com/new)，不选初始化 README、许可证或 .gitignore。确认仓库归属和可见性后，从项目目录运行：

```bash
git remote add origin <你的仓库地址>
git remote -v
git push -u origin main
```

日常更新时，检查修改、提交并推送。提交前可运行 `npm ci`、`npm run check` 和 `npm run build`，检查依赖、类型和生产构建。[GitHub 导入本地代码指南](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)

## 部署：Cloudflare Pages（可选）

这个项目可部署到任何支持站点根路径的静态托管服务。必须运行 `npm run build`，它包含 Pagefind 的索引步骤；上传整个 `dist/`，其中包括 `404.html`、`rss.xml`、`robots.txt`、`sitemap-index.xml` 和 `pagefind/`。

如果选用 [Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)，在 Workers & Pages 中创建 **Pages** 项目并导入 GitHub 仓库，由你授权 Cloudflare 访问这个仓库。部署设置：

| 项目 | 值 |
| --- | --- |
| 生产分支 | `main` |
| 根目录 | 仓库根目录 |
| 构建命令 | `npm run build` |
| 输出目录 | `dist` |
| 构建环境 | `NODE_VERSION=24` |
| 规范站点地址 | `SITE_URL=https://<项目>.pages.dev`，绑定独立域名后改为正式 HTTPS URL |

如果使用 `pages.dev` 先公开访问，确认部署后到项目设置填写实际分配的主机名并重新构建，以便 canonical、RSS 和站点地图指向正确域名。源码当前默认的正式地址为 `https://ashleyzy.com.cn`，并不代表该域名已经购买或解析。其他静态平台同样可以用 `SITE_URL` 覆盖默认值；本地设置示例：`SITE_URL=https://example.com npm run build`。

## 绑定 ashleyzy.com.cn

1. 你在腾讯云查询域名可用性，确认价格后自行购买，完成所需的[域名实名认证](https://cloud.tencent.com/document/product/242/8580)。
2. 如果采用 Cloudflare Pages 并希望直接使用根域名 `ashleyzy.com.cn`，把域名作为 zone 添加到与 Pages 相同的 Cloudflare 账号；核对需要保留的 DNS 记录，再到腾讯云把域名服务器改为 Cloudflare 提供的值。生效后在 Pages → Custom domains 中绑定根域名。
3. 如果希望保留腾讯云的 DNS，可采用 `www.ashleyzy.com.cn`：先在 Pages 中添加该自定义域名，再按 Cloudflare 提示在腾讯云加 `www` 的 CNAME。此步骤只配置子域名。详见 [Cloudflare Pages 自定义域指南](https://developers.cloudflare.com/pages/configuration/custom-domains/)与[腾讯云 DNS 服务器修改说明](https://cloud.tencent.com/document/product/302/5518)。
4. 确认 HTTPS 生效，将 `SITE_URL` 更新为选定的正式地址并重新部署。打开首页、文章页、搜索、RSS、站点地图及一个不存在的路径，核对状态与链接。若同时开放多个入口，可将次要地址重定向到主域名。

域名购买、账号授权和公开部署由你操作或确认。

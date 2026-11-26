export const site = {
  title: 'Ashley Lab',
  description: 'Ashley_zy 的个人技术博客和项目作品集。记录深度学习、AI 基础设施与计算机系统的学习和实践。',
  name: 'Ashley_zy',
  school: '中山大学',
  major: '人工智能',
  cohort: 2025,
  interests: '关注深度学习、AI 基础设施与计算机系统。这里记录我的技术文章和项目实践。',
  awards: [
    { year: '2026.11', title: '全国大学生数学竞赛广东省一等奖' },
    { year: '2025–2026', title: '中山大学校级一等奖学金' },
    { year: '2025–2026', title: '国家奖学金' },
  ],
  email: 'zhanssh@mail2.sysu.edu.cn',
  github: 'Ashley-zy226',
  socials: [] as { label: string; url: string }[],
};

export const bio = `我是 ${site.name}，${site.school}${site.major}专业 ${site.cohort} 级学生。${site.interests}`;

export const categories = {
  'deep-learning': '深度学习',
  'ai-infra': 'AI Infra',
  systems: '计算机系统',
  algorithms: '数据结构与算法',
} as const;

export const topics = {
  ai: 'AI',
  'deep-learning': 'Deep Learning',
  pytorch: 'PyTorch',
  cuda: 'CUDA',
  ascend: 'Ascend C / CANN',
  'ai-infra': 'AI Infra',
  algorithms: '数据结构与算法',
  systems: '计算机系统',
} as const;

export const projects: {
  id: string; title: string; summary: string; detail: string;
  stack: string[]; status: string; repository: string; demo: string;
}[] = [{
  id: 'ashley-lab',
  title: 'Ashley Lab · 个人技术站',
  summary: '用 Astro 搭建的技术博客和作品集。',
  detail: '用内容集合管理 Markdown / MDX，在构建时生成静态页面与中文全文索引。此项目就是你正在浏览的网站。',
  stack: ['Astro', 'TypeScript', 'Pagefind'],
  status: '第一版',
  repository: '', // 填入确认公开的 GitHub 仓库 URL
  demo: '/',
}];

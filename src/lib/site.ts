export const site = {
  title: 'Ashley Lab',
  description: '人工智能专业学生的技术博客与学习笔记。记录深度学习、AI 基础设施与计算机系统的学习和实践。',
  name: '［真实姓名待填写］',
  school: '［学校及院系待填写］',
  degree: '［学位及年级待填写］',
  period: '［入学及预计毕业时间待填写］',
  bio: '我是一名人工智能专业的大学生，关注深度学习、AI 基础设施与计算机系统。这里记录我的技术文章、课程笔记和项目实践。',
  email: '',
  github: '',
  socials: [] as { label: string; url: string }[],
};

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
  summary: '用 Astro 搭建的技术博客、课程笔记和作品集。',
  detail: '用内容集合管理 Markdown / MDX，在构建时生成静态页面与中文全文索引。此项目就是你正在浏览的网站。',
  stack: ['Astro', 'TypeScript', 'Pagefind'],
  status: '第一版',
  repository: '', // 填入确认公开的 GitHub 仓库 URL
  demo: '/',
}];

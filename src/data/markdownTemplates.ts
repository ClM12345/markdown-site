import type { Lang } from '../i18n/context';

export interface Template {
  id: string;
  name: string;
  desc: string;
  content: string;
}

const TEMPLATES_ZH: Template[] = [
  {
    id: 'readme', name: 'README', desc: '开源项目说明文档',
    content: `# 项目名称\n\n简短描述项目的用途和功能。\n\n## 功能特性\n\n- 功能一\n- 功能二\n- 功能三\n\n## 快速开始\n\n### 安装\n\n\`\`\`bash\nnpm install your-package\n\`\`\`\n\n### 使用\n\n\`\`\`javascript\nimport { something } from 'your-package';\n\nsomething();\n\`\`\`\n\n## 配置\n\n| 参数 | 类型 | 默认值 | 说明 |\n|------|------|--------|------|\n| port | number | 3000 | 服务端口 |\n| debug | boolean | false | 调试模式 |\n\n## 开发\n\n\`\`\`bash\ngit clone https://github.com/your/repo.git\ncd repo\nnpm install\nnpm run dev\n\`\`\`\n\n## 许可证\n\nMIT License\n`,
  },
  {
    id: 'meeting', name: '会议纪要', desc: '记录会议要点和行动项',
    content: `# 会议纪要\n\n**日期**：2026 年 X 月 X 日\n**时间**：14:00 - 15:00\n**地点**：线上会议\n**参会人**：张三、李四、王五\n\n---\n\n## 会议议题\n\n1. 项目进度同步\n2. 技术方案讨论\n3. 下阶段计划\n\n## 讨论内容\n\n### 1. 项目进度\n\n- 前端开发完成 80%\n- 后端接口开发中\n- 设计稿已确认\n\n### 2. 技术方案\n\n- 决定使用 React + TypeScript\n- 数据库选择 PostgreSQL\n- 部署方案待定\n\n## 行动项\n\n- [ ] 张三：完成前端页面开发（截止 X 月 X 日）\n- [ ] 李四：输出 API 文档（截止 X 月 X 日）\n- [ ] 王五：确认部署方案（截止 X 月 X 日）\n\n## 下次会议\n\n**时间**：X 月 X 日 14:00\n**议题**：进度复盘\n`,
  },
  {
    id: 'study-notes', name: '学习笔记', desc: '结构化的知识整理',
    content: `# 学习笔记：主题名称\n\n**日期**：2026 年 X 月 X 日\n**来源**：课程 / 书籍 / 文档\n\n---\n\n## 核心概念\n\n### 概念一\n\n定义和解释。\n\n### 概念二\n\n定义和解释。\n\n## 重点内容\n\n1. **要点一**：详细说明\n2. **要点二**：详细说明\n3. **要点三**：详细说明\n\n## 代码示例\n\n\`\`\`python\ndef example():\n    print("学习笔记示例")\n\`\`\`\n\n## 常见问题\n\n> Q：问题描述？\n>\n> A：解答内容。\n\n## 总结\n\n- 关键收获一\n- 关键收获二\n- 关键收获三\n\n## 参考资料\n\n- [资料一](https://example.com)\n- [资料二](https://example.com)\n`,
  },
  {
    id: 'blog', name: '博客文章', desc: '标准博客文章结构',
    content: `# 文章标题\n\n> 一句话摘要，吸引读者继续阅读。\n\n## 前言\n\n简要介绍文章背景和写作动机。\n\n## 正文\n\n### 第一部分\n\n详细阐述第一个观点或步骤。\n\n### 第二部分\n\n详细阐述第二个观点或步骤。\n\n### 第三部分\n\n详细阐述第三个观点或步骤。\n\n## 实践示例\n\n\`\`\`bash\necho "Hello World"\n\`\`\`\n\n## 总结\n\n回顾全文要点，给出建议或展望。\n\n---\n\n**作者**：你的名字\n**发布日期**：2026 年 X 月 X 日\n**标签**：\`标签一\` \`标签二\` \`标签三\`\n`,
  },
  {
    id: 'project-doc', name: '项目文档', desc: '技术项目设计文档',
    content: `# 项目名称 - 技术设计文档\n\n## 1. 概述\n\n### 1.1 背景\n\n描述项目背景和业务需求。\n\n### 1.2 目标\n\n- 目标一\n- 目标二\n- 目标三\n\n## 2. 技术方案\n\n### 2.1 技术栈\n\n| 类别 | 技术选型 | 说明 |\n|------|---------|------|\n| 前端 | React | 组件化 UI |\n| 后端 | Node.js | API 服务 |\n| 数据库 | PostgreSQL | 关系型数据 |\n\n### 2.2 架构设计\n\n描述系统整体架构。\n\n### 2.3 核心模块\n\n- **模块一**：功能说明\n- **模块二**：功能说明\n\n## 3. 接口设计\n\n### 3.1 获取列表\n\n\`\`\`\nGET /api/items\n\`\`\`\n\n**响应**：\n\n\`\`\`json\n{\n  "code": 0,\n  "data": []\n}\n\`\`\`\n\n## 4. 里程碑\n\n- [ ] 第一阶段：基础功能\n- [ ] 第二阶段：功能增强\n- [ ] 第三阶段：性能优化\n\n## 5. 风险与应对\n\n| 风险 | 影响 | 应对方案 |\n|------|------|--------|\n| 风险一 | 中 | 方案描述 |\n`,
  },
  {
    id: 'todo', name: '待办清单', desc: '日常任务管理',
    content: `# 待办清单\n\n**日期**：2026 年 X 月 X 日\n\n---\n\n## 紧急重要\n\n- [ ] 任务一\n- [ ] 任务二\n\n## 重要不紧急\n\n- [ ] 任务三\n- [ ] 任务四\n\n## 紧急不重要\n\n- [ ] 任务五\n\n## 不紧急不重要\n\n- [ ] 任务六\n\n---\n\n## 已完成\n\n- [x] 已完成的任务\n- [x] 另一个完成的任务\n\n## 备注\n\n记录需要额外关注的事项。\n`,
  },
];

const TEMPLATES_EN: Template[] = [
  {
    id: 'readme', name: 'README', desc: 'Open-source project documentation',
    content: `# Project Name\n\nA brief description of what this project does.\n\n## Features\n\n- Feature one\n- Feature two\n- Feature three\n\n## Quick Start\n\n### Installation\n\n\`\`\`bash\nnpm install your-package\n\`\`\`\n\n### Usage\n\n\`\`\`javascript\nimport { something } from 'your-package';\n\nsomething();\n\`\`\`\n\n## Configuration\n\n| Parameter | Type | Default | Description |\n|-----------|------|---------|-------------|\n| port | number | 3000 | Server port |\n| debug | boolean | false | Debug mode |\n\n## Development\n\n\`\`\`bash\ngit clone https://github.com/your/repo.git\ncd repo\nnpm install\nnpm run dev\n\`\`\`\n\n## License\n\nMIT License\n`,
  },
  {
    id: 'meeting', name: 'Meeting Notes', desc: 'Record key points and action items',
    content: `# Meeting Notes\n\n**Date**: Jan X, 2026\n**Time**: 2:00 PM - 3:00 PM\n**Location**: Online\n**Attendees**: Alice, Bob, Charlie\n\n---\n\n## Agenda\n\n1. Project progress update\n2. Technical discussion\n3. Next steps\n\n## Discussion\n\n### 1. Project Progress\n\n- Frontend development 80% complete\n- Backend API in progress\n- Design finalized\n\n### 2. Technical Decisions\n\n- Using React + TypeScript\n- Database: PostgreSQL\n- Deployment TBD\n\n## Action Items\n\n- [ ] Alice: Complete frontend pages (Due: Jan X)\n- [ ] Bob: Deliver API documentation (Due: Jan X)\n- [ ] Charlie: Confirm deployment plan (Due: Jan X)\n\n## Next Meeting\n\n**Date**: Jan X, 2026 at 2:00 PM\n**Topic**: Progress review\n`,
  },
  {
    id: 'study-notes', name: 'Study Notes', desc: 'Structured knowledge organization',
    content: `# Study Notes: Topic Name\n\n**Date**: Jan X, 2026\n**Source**: Course / Book / Documentation\n\n---\n\n## Key Concepts\n\n### Concept One\n\nDefinition and explanation.\n\n### Concept Two\n\nDefinition and explanation.\n\n## Main Points\n\n1. **Point one**: Detailed explanation\n2. **Point two**: Detailed explanation\n3. **Point three**: Detailed explanation\n\n## Code Example\n\n\`\`\`python\ndef example():\n    print("Study notes example")\n\`\`\`\n\n## FAQ\n\n> Q: Question?\n>\n> A: Answer.\n\n## Summary\n\n- Key takeaway one\n- Key takeaway two\n- Key takeaway three\n\n## References\n\n- [Reference 1](https://example.com)\n- [Reference 2](https://example.com)\n`,
  },
  {
    id: 'blog', name: 'Blog Post', desc: 'Standard blog article structure',
    content: `# Article Title\n\n> A one-line summary to hook the reader.\n\n## Introduction\n\nBrief background and motivation.\n\n## Body\n\n### Part One\n\nElaborate on the first point or step.\n\n### Part Two\n\nElaborate on the second point or step.\n\n### Part Three\n\nElaborate on the third point or step.\n\n## Example\n\n\`\`\`bash\necho "Hello World"\n\`\`\`\n\n## Conclusion\n\nSummarize key points and outlook.\n\n---\n\n**Author**: Your Name\n**Published**: Jan X, 2026\n**Tags**: \`tag-one\` \`tag-two\` \`tag-three\`\n`,
  },
  {
    id: 'project-doc', name: 'Project Doc', desc: 'Technical design document',
    content: `# Project Name - Technical Design\n\n## 1. Overview\n\n### 1.1 Background\n\nDescribe the project background and business requirements.\n\n### 1.2 Goals\n\n- Goal one\n- Goal two\n- Goal three\n\n## 2. Technical Approach\n\n### 2.1 Tech Stack\n\n| Category | Technology | Notes |\n|----------|-----------|-------|\n| Frontend | React | Component UI |\n| Backend | Node.js | API service |\n| Database | PostgreSQL | Relational data |\n\n### 2.2 Architecture\n\nDescribe the overall system architecture.\n\n### 2.3 Core Modules\n\n- **Module A**: Description\n- **Module B**: Description\n\n## 3. API Design\n\n### 3.1 Get List\n\n\`\`\`\nGET /api/items\n\`\`\`\n\n**Response**:\n\n\`\`\`json\n{\n  "code": 0,\n  "data": []\n}\n\`\`\`\n\n## 4. Milestones\n\n- [ ] Phase 1: Core features\n- [ ] Phase 2: Enhancements\n- [ ] Phase 3: Optimization\n\n## 5. Risks\n\n| Risk | Impact | Mitigation |\n|------|--------|------------|\n| Risk A | Medium | Description |\n`,
  },
  {
    id: 'todo', name: 'Todo List', desc: 'Daily task management',
    content: `# Todo List\n\n**Date**: Jan X, 2026\n\n---\n\n## Urgent & Important\n\n- [ ] Task one\n- [ ] Task two\n\n## Important, Not Urgent\n\n- [ ] Task three\n- [ ] Task four\n\n## Urgent, Not Important\n\n- [ ] Task five\n\n## Neither\n\n- [ ] Task six\n\n---\n\n## Completed\n\n- [x] Completed task\n- [x] Another completed task\n\n## Notes\n\nAdditional notes and reminders.\n`,
  },
];

export function getTemplates(lang: Lang): Template[] {
  return lang === 'zh-CN' ? TEMPLATES_ZH : TEMPLATES_EN;
}

export const TEMPLATES = TEMPLATES_ZH;

import type { Lang } from '../i18n/context';

const DEFAULT_ZH = `# 欢迎使用 Markdown 编辑器

这是一个在线 Markdown 编辑器，支持实时预览。

## 功能

- **实时预览**：输入即可看到渲染效果
- **文件导入**：支持打开 .md 文件
- **多格式导出**：支持导出 Markdown、HTML、PDF

## 代码示例

\`\`\`javascript
function hello() {
  console.log("Hello, Markdown!");
}
\`\`\`

## 表格示例

| 功能 | 状态 |
|------|------|
| 编辑 | ✅ |
| 预览 | ✅ |
| 导出 | ✅ |

## 引用

> Markdown 让写作变得简单而优雅。

---

开始编辑吧！
`;

const DEFAULT_EN = `# Welcome to Markdown Editor

An online Markdown editor with real-time preview.

## Features

- **Live Preview**: See rendered output as you type
- **File Import**: Open local .md files
- **Multi-format Export**: Export to Markdown, HTML, PDF

## Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, Markdown!");
}
\`\`\`

## Table Example

| Feature | Status |
|---------|--------|
| Edit    | ✅ |
| Preview | ✅ |
| Export  | ✅ |

## Quote

> Markdown makes writing simple and elegant.

---

Start editing!
`;

export function getDefaultMarkdown(lang: Lang) {
  return lang === 'zh-CN' ? DEFAULT_ZH : DEFAULT_EN;
}

export const DEFAULT_MARKDOWN = DEFAULT_ZH;

interface SyntaxExample { title: string; syntax: string }

const SYNTAX_ZH: SyntaxExample[] = [
  { title: '标题', syntax: `# 一级标题\n## 二级标题\n### 三级标题\n#### 四级标题` },
  { title: '段落与换行', syntax: `这是第一段文字。\n\n这是第二段文字。\n这一行和上一行之间只有一个换行，会合并在同一段。` },
  { title: '粗体与斜体', syntax: `**粗体文字**\n\n*斜体文字*\n\n***粗斜体文字***\n\n~~删除线~~` },
  { title: '无序列表', syntax: `- 项目一\n- 项目二\n  - 子项目\n  - 子项目\n- 项目三` },
  { title: '有序列表', syntax: `1. 第一步\n2. 第二步\n3. 第三步` },
  { title: '任务列表', syntax: `- [x] 已完成任务\n- [ ] 未完成任务\n- [ ] 待办事项` },
  { title: '引用', syntax: `> 这是一段引用文字。\n>\n> 引用可以有多段。` },
  { title: '代码', syntax: "行内代码：`console.log('hello')`\n\n代码块：\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n```" },
  { title: '链接与图片', syntax: `[访问百度](https://www.baidu.com)\n\n![示例图片](https://via.placeholder.com/200x100)` },
  { title: '表格', syntax: `| 名称 | 说明 | 价格 |\n|------|------|------|\n| 苹果 | 水果 | ¥5  |\n| 牛奶 | 饮品 | ¥8  |\n| 面包 | 主食 | ¥10 |` },
  { title: '分割线', syntax: `上面的内容\n\n---\n\n下面的内容` },
];

const SYNTAX_EN: SyntaxExample[] = [
  { title: 'Headings', syntax: `# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4` },
  { title: 'Paragraphs', syntax: `This is the first paragraph.\n\nThis is the second paragraph.\nThis line and the previous line have only one line break, so they merge into one paragraph.` },
  { title: 'Bold & Italic', syntax: `**Bold text**\n\n*Italic text*\n\n***Bold and italic***\n\n~~Strikethrough~~` },
  { title: 'Unordered List', syntax: `- Item one\n- Item two\n  - Sub-item\n  - Sub-item\n- Item three` },
  { title: 'Ordered List', syntax: `1. Step one\n2. Step two\n3. Step three` },
  { title: 'Task List', syntax: `- [x] Completed task\n- [ ] Incomplete task\n- [ ] Todo item` },
  { title: 'Blockquote', syntax: `> This is a blockquote.\n>\n> Quotes can span multiple paragraphs.` },
  { title: 'Code', syntax: "Inline code: `console.log('hello')`\n\nCode block:\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n```" },
  { title: 'Links & Images', syntax: `[Visit Google](https://www.google.com)\n\n![Sample image](https://via.placeholder.com/200x100)` },
  { title: 'Tables', syntax: `| Name   | Type  | Price |\n|--------|-------|-------|\n| Apple  | Fruit | $1    |\n| Milk   | Drink | $2    |\n| Bread  | Food  | $3    |` },
  { title: 'Horizontal Rule', syntax: `Content above\n\n---\n\nContent below` },
];

export function getSyntaxExamples(lang: Lang) {
  return lang === 'zh-CN' ? SYNTAX_ZH : SYNTAX_EN;
}

export const SYNTAX_EXAMPLES = SYNTAX_ZH;

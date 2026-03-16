export const DEFAULT_MARKDOWN = `# 欢迎使用 Markdown 编辑器

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

export const SYNTAX_EXAMPLES: { title: string; syntax: string }[] = [
  {
    title: '标题',
    syntax: `# 一级标题
## 二级标题
### 三级标题
#### 四级标题`,
  },
  {
    title: '段落与换行',
    syntax: `这是第一段文字。

这是第二段文字。
这一行和上一行之间只有一个换行，会合并在同一段。`,
  },
  {
    title: '粗体与斜体',
    syntax: `**粗体文字**

*斜体文字*

***粗斜体文字***

~~删除线~~`,
  },
  {
    title: '无序列表',
    syntax: `- 项目一
- 项目二
  - 子项目
  - 子项目
- 项目三`,
  },
  {
    title: '有序列表',
    syntax: `1. 第一步
2. 第二步
3. 第三步`,
  },
  {
    title: '任务列表',
    syntax: `- [x] 已完成任务
- [ ] 未完成任务
- [ ] 待办事项`,
  },
  {
    title: '引用',
    syntax: `> 这是一段引用文字。
>
> 引用可以有多段。`,
  },
  {
    title: '代码',
    syntax: "行内代码：`console.log('hello')`\n\n代码块：\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n```",
  },
  {
    title: '链接与图片',
    syntax: `[访问百度](https://www.baidu.com)

![示例图片](https://via.placeholder.com/200x100)`,
  },
  {
    title: '表格',
    syntax: `| 名称 | 说明 | 价格 |
|------|------|------|
| 苹果 | 水果 | ¥5  |
| 牛奶 | 饮品 | ¥8  |
| 面包 | 主食 | ¥10 |`,
  },
  {
    title: '分割线',
    syntax: `上面的内容

---

下面的内容`,
  },
];

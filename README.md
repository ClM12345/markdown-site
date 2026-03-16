# Markdown 工具站

一个面向 Markdown 学习和使用的在线工具网站。学语法、写文档、导出文件，一站搞定。

## 功能

- **Markdown 介绍** — 了解 Markdown 是什么、有哪些应用场景
- **语法教学** — 常见语法源码与渲染效果对照展示
- **在线编辑器** — 输入 Markdown，实时预览渲染结果
- **文件导入** — 支持文件选择和拖拽上传 `.md` 文件
- **多格式导出** — 导出 Markdown、HTML、PDF（浏览器打印）
- **自动保存** — 编辑内容自动存储到 LocalStorage，刷新不丢失

## 技术栈

React + TypeScript + Vite + Tailwind CSS + react-markdown + remark-gfm + rehype-highlight

## 本地运行

```bash
npm install
npm run dev
```

打开 http://localhost:5173 即可访问。

## 构建部署

```bash
npm run build
```

生成的静态文件在 `dist/` 目录，可直接部署到 Vercel、Netlify 等平台。

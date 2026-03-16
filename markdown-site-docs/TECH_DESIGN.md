# Markdown 网站技术设计

## 1. 技术栈
- 前端：React + TypeScript + Vite
- 样式：Tailwind CSS
- Markdown 渲染：react-markdown
- GitHub 风格增强：remark-gfm
- 代码高亮：rehype-highlight 或 prism/react-syntax-highlighter
- 本地存储：LocalStorage
- 导出文件：Blob + URL.createObjectURL
- PDF 导出：window.print() 或 html2pdf（后续可选）
- 部署：Vercel

## 2. 为什么这样选
- React + TypeScript 适合做交互式工具站
- Vite 启动快，开发体验好
- react-markdown 生态成熟，适合实时预览
- remark-gfm 支持表格、任务列表等常见扩展语法
- LocalStorage 足够支撑第一版本地保存需求

## 3. 页面结构
src/
  components/
    Navbar/
    MarkdownEditor/
    MarkdownPreview/
    Toolbar/
    FileUpload/
    ExportActions/
    SyntaxGuide/
    TocPanel/
    StatsPanel/
    ThemeToggle/
  pages/
    HomePage.tsx
    IntroPage.tsx
    GuidePage.tsx
    EditorPage.tsx
  data/
    markdownExamples.ts
    markdownTemplates.ts
  hooks/
    useLocalStorage.ts
    useMarkdownStats.ts
    useToc.ts
  utils/
    file.ts
    export.ts
    markdown.ts
  types/
    markdown.ts

## 4. 数据模型

### MarkdownTemplate
- id: string
- name: string
- description: string
- content: string

### EditorState
- content: string
- currentFileName?: string
- lastSavedAt?: string
- theme: 'light' | 'dark'

## 5. 核心模块设计

### 5.1 教学模块
负责 Markdown 介绍和语法展示。

### 5.2 编辑器模块
负责输入 Markdown 内容，支持本地保存和内容重置。

### 5.3 预览模块
负责渲染 Markdown 内容，支持基础增强语法。

### 5.4 文件处理模块
负责：
- 读取 `.md` 文件
- 导出 `.md`
- 导出 HTML
- 触发打印导出 PDF

### 5.5 辅助增强模块
负责：
- 字数统计
- TOC 目录
- 模板插入
- 主题切换

## 6. 核心状态
- content: 当前 Markdown 文本
- selectedTemplateId: 当前模板
- theme: 当前主题
- fileName: 当前文件名
- tocItems: 当前目录数据
- stats: 当前统计数据

## 7. 关键技术点
1. 编辑器输入与预览同步
2. 大文本更新时的性能控制
3. 文件导入的格式校验
4. Markdown 渲染安全性
5. HTML 导出的内容格式化
6. 打印导出样式优化
7. 目录自动提取逻辑

## 8. 第一版不做的技术内容
- 后端数据库
- 用户系统
- 多人协作
- 实时云同步
- 权限系统

## 9. 后续扩展预留
- Monaco Editor / CodeMirror 编辑体验升级
- 多标签文件编辑
- 历史版本恢复
- 云端存储
- 分享链接
- AI 优化和纠错

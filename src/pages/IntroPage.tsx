import { Link } from 'react-router-dom';

export default function IntroPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">什么是 Markdown？</h1>

      <section className="mb-8">
        <p className="text-gray-700 leading-relaxed mb-4">
          Markdown 是一种轻量级标记语言，由 John Gruber 于 2004 年创建。它使用简单的纯文本格式语法，可以轻松转换为 HTML 等格式化文档。
        </p>
        <p className="text-gray-700 leading-relaxed">
          Markdown 的设计目标是让文档"易读易写"——源文件本身就具有很好的可读性，即使不渲染也能清晰理解内容结构。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">应用场景</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { title: '技术文档', desc: 'README、API 文档、Wiki 等' },
            { title: '博客写作', desc: '大量博客平台原生支持 Markdown' },
            { title: '笔记记录', desc: '快速记录想法，保持结构清晰' },
            { title: '即时通讯', desc: 'Slack、Discord 等支持 Markdown 格式' },
            { title: '演示文稿', desc: '用 Markdown 制作幻灯片' },
            { title: '电子书', desc: 'GitBook 等工具基于 Markdown' },
          ].map((item) => (
            <div key={item.title} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">为什么选择 Markdown？</h2>
        <ul className="space-y-3">
          {[
            '语法简单，几分钟即可上手',
            '纯文本格式，任何编辑器都能打开',
            '版本控制友好，适合 Git 协作',
            '生态丰富，转换工具众多',
            '专注内容本身，不被排版分心',
          ].map((text) => (
            <li key={text} className="flex items-start gap-2 text-gray-700">
              <span className="text-green-500 mt-0.5">✓</span>
              {text}
            </li>
          ))}
        </ul>
      </section>

      <div className="flex gap-3">
        <Link
          to="/guide"
          className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          学习语法
        </Link>
        <Link
          to="/editor"
          className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          开始编辑
        </Link>
      </div>
    </div>
  );
}

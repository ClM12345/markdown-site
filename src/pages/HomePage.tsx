import { Link } from 'react-router-dom';

const FEATURES = [
  { title: '语法教学', desc: '从零学习 Markdown，源码与效果对照展示', link: '/guide', icon: '📖' },
  { title: '在线编辑', desc: '输入 Markdown，实时预览渲染效果', link: '/editor', icon: '✏️' },
  { title: '文件导入', desc: '打开本地 .md 文件，支持拖拽上传', link: '/editor', icon: '📂' },
  { title: '多格式导出', desc: '导出 Markdown、HTML、PDF', link: '/editor', icon: '💾' },
];

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Markdown 工具站
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto">
          学习 Markdown 语法，在线编辑和预览，导入导出文件——一站搞定。
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            to="/editor"
            className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            开始编辑
          </Link>
          <Link
            to="/guide"
            className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            学习语法
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {FEATURES.map((f) => (
          <Link
            key={f.title}
            to={f.link}
            className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all bg-white dark:bg-gray-900"
          >
            <div className="text-2xl mb-2">{f.icon}</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{f.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
          </Link>
        ))}
      </div>

      <footer className="mt-24 pt-8 border-t border-gray-200 dark:border-gray-700 text-center space-y-3">
        <div className="flex justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/terms" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">服务条款</Link>
          <Link to="/privacy" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">隐私政策</Link>
          <Link to="/contact" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">联系我们</Link>
          <Link to="/feedback" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">问题反馈</Link>
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500">© 2026 Markdown 工具站</p>
        <p className="text-xs text-gray-400 dark:text-gray-600">本站为开源工具，所有内容均在本地浏览器处理，不上传或存储任何用户数据</p>
      </footer>
    </div>
  );
}

import { Link } from 'react-router-dom';

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">← 返回首页</Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">联系我们</h1>
      <div className="space-y-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        <p>感谢您使用 Markdown 工具站！如果您有任何问题、建议或反馈，欢迎通过以下方式联系我们。</p>
        <section className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">邮件联系</h2>
          <p>📧 <a href="mailto:neoone0123@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">neoone0123@gmail.com</a></p>
          <p className="mt-2 text-gray-400 dark:text-gray-500">我们会尽快回复您的邮件，通常在 1-3 个工作日内。</p>
        </section>
      </div>
    </div>
  );
}

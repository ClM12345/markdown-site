import { Link } from 'react-router-dom';

export default function FeedbackPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">← 返回首页</Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">问题反馈</h1>
      <div className="space-y-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        <p>我们非常重视您的反馈，它能帮助我们不断改进产品体验。</p>
        <section>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">Bug 报告</h2>
          <p>如果您在使用过程中遇到任何问题，请通过以下方式告知我们：</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-500 dark:text-gray-400">
            <li>发送邮件至 <a href="mailto:neoone0123@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">neoone0123@gmail.com</a></li>
          </ul>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">报告时请包含以下信息</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-500 dark:text-gray-400">
            <li>问题的详细描述</li>
            <li>复现步骤</li>
            <li>您的浏览器和操作系统版本</li>
            <li>截图（如有）</li>
          </ul>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">功能建议</h2>
          <p>如果您有任何功能需求或改进建议，同样欢迎通过上述渠道告诉我们。我们会认真评估每一条建议。</p>
        </section>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { usePageSEO } from '../hooks/usePageSEO';

export default function PrivacyPage() {
  usePageSEO('privacy');
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">← 返回首页</Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">隐私政策</h1>
      <div className="space-y-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">概述</h2>
          <p>Markdown 工具站尊重并保护您的隐私。本隐私政策说明我们如何处理您在使用本站时可能涉及的信息。</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">信息收集</h2>
          <p>本站不收集任何个人信息。我们不要求注册、登录，不使用 Cookie 追踪用户行为，不收集设备信息或 IP 地址。</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">本地存储</h2>
          <p>本站使用浏览器 LocalStorage 保存以下数据，这些数据仅存储在您的设备上：</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-500 dark:text-gray-400">
            <li>编辑器内容和标签页状态</li>
            <li>主题偏好（深色/浅色模式）</li>
            <li>最近文件记录</li>
          </ul>
          <p className="mt-2">您可以随时在编辑器中点击"清除缓存"按钮，或通过浏览器设置清除这些本地数据。</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">第三方服务</h2>
          <p>本站不嵌入任何第三方分析、广告或追踪脚本。</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">政策变更</h2>
          <p>如隐私政策有变更，我们将在此页面更新。如有疑问，请通过 <a href="mailto:neoone0123@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">neoone0123@gmail.com</a> 联系我们。</p>
        </section>
        <p className="text-gray-400 dark:text-gray-500 pt-4">最后更新：2026 年 3 月</p>
      </div>
    </div>
  );
}

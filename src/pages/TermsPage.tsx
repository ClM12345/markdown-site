import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">← 返回首页</Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">服务条款</h1>
      <div className="space-y-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">1. 服务说明</h2>
          <p>Markdown 工具站（以下简称"本站"）是一个开源的在线 Markdown 编辑与学习工具。本站提供 Markdown 语法教学、在线编辑预览、文件导入导出等功能，所有操作均在用户浏览器本地完成。</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">2. 数据处理</h2>
          <p>本站不设置服务器端数据存储。您在编辑器中输入的所有内容仅保存在您浏览器的 LocalStorage 中，不会被上传、收集或传输到任何远程服务器。清除浏览器数据将永久删除本地保存的内容。</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">3. 使用限制</h2>
          <p>您可以自由使用本站提供的所有功能。请勿将本站用于任何违反法律法规的目的。本站不对您创建、编辑或导出的内容承担任何责任。</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">4. 免责声明</h2>
          <p>本站按"现状"提供服务，不对服务的可用性、稳定性或准确性作任何明示或暗示的保证。因使用本站造成的任何直接或间接损失，本站不承担责任。</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">5. 条款变更</h2>
          <p>本站保留随时修改服务条款的权利。修改后的条款将在页面上公布后立即生效。继续使用本站即表示您接受修改后的条款。</p>
        </section>
        <p className="text-gray-400 dark:text-gray-500 pt-4">最后更新：2026 年 3 月</p>
      </div>
    </div>
  );
}

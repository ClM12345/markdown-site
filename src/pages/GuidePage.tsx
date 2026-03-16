import { SYNTAX_EXAMPLES } from '../data/markdownExamples';
import MarkdownPreview from '../components/MarkdownPreview';

export default function GuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Markdown 语法教学</h1>
      <p className="text-gray-500 mb-10">每种语法同时展示源码和渲染效果，方便对照学习。</p>

      <div className="space-y-8">
        {SYNTAX_EXAMPLES.map((item) => (
          <section key={item.title} className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">{item.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="p-5">
                <div className="text-xs font-medium text-gray-400 uppercase mb-2">源码</div>
                <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap leading-relaxed">{item.syntax}</pre>
              </div>
              <div className="p-5">
                <div className="text-xs font-medium text-gray-400 uppercase mb-2">效果</div>
                <MarkdownPreview content={item.syntax} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

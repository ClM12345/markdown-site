import { useMemo } from 'react';
import { getSyntaxExamples } from '../data/markdownExamples';
import MarkdownPreview from '../components/MarkdownPreview';
import { useI18n } from '../i18n/context';
import { usePageSEO } from '../hooks/usePageSEO';

export default function GuidePage() {
  const { lang, t } = useI18n();
  usePageSEO('guide');
  const examples = useMemo(() => getSyntaxExamples(lang), [lang]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 dark:text-white">{t.guide.title}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10">{t.guide.subtitle}</p>

      <div className="space-y-8">
        {examples.map((item) => (
          <section key={item.title} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-white">{item.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
              <div className="p-5">
                <div className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-2">{t.guide.source}</div>
                <pre className="text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">{item.syntax}</pre>
              </div>
              <div className="p-5">
                <div className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-2">{t.guide.result}</div>
                <MarkdownPreview content={item.syntax} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

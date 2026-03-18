import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';
import { usePageSEO } from '../hooks/usePageSEO';

export default function IntroPage() {
  const { t } = useI18n();
  usePageSEO('intro');
  const i = t.intro;
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">{i.title}</h1>

      <section className="mb-8">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{i.p1}</p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{i.p2}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">{i.useCases}</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {i.cases.map((c) => (
            <div key={c.title} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{c.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">{i.whyTitle}</h2>
        <ul className="space-y-3">
          {i.reasons.map((text) => (
            <li key={text} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-500 mt-0.5">✓</span>
              {text}
            </li>
          ))}
        </ul>
      </section>

      <div className="flex gap-3">
        <Link to="/guide" className="px-5 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">{i.learnSyntax}</Link>
        <Link to="/editor" className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">{i.startEditing}</Link>
      </div>
    </div>
  );
}

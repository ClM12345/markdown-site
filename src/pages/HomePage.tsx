import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';

const LINKS = ['/guide', '/editor', '/editor', '/editor'];

export default function HomePage() {
  const { t } = useI18n();
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t.home.title}</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto">{t.home.subtitle}</p>
        <div className="flex gap-3 justify-center">
          <Link to="/editor" className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">{t.home.start}</Link>
          <Link to="/guide" className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">{t.home.learn}</Link>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {t.home.feat.map((f, i) => (
          <Link key={i} to={LINKS[i]} className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all bg-white dark:bg-gray-900">
            <div className="text-2xl mb-2">{f.icon}</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{f.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
          </Link>
        ))}
      </div>
      <footer className="mt-24 pt-8 border-t border-gray-200 dark:border-gray-700 text-center space-y-3">
        <div className="flex justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/terms" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{t.home.terms}</Link>
          <Link to="/privacy" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{t.home.privacy}</Link>
          <Link to="/contact" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{t.home.contact}</Link>
          <Link to="/feedback" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{t.home.feedback}</Link>
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500">{t.home.copyright}</p>
        <p className="text-xs text-gray-400 dark:text-gray-600">{t.home.disclaimer}</p>
      </footer>
    </div>
  );
}

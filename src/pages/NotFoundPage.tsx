import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';
import { usePageSEO } from '../hooks/usePageSEO';

export default function NotFoundPage() {
  const { t } = useI18n();
  usePageSEO('notFound', '/404');
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-4">404</div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t.seo.notFound.title.split('—')[0].trim()}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">{t.seo.notFound.description}</p>
      <Link to="/" className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">{t.nav.home}</Link>
    </div>
  );
}

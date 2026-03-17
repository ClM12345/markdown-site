import { useI18n } from '../i18n/context';

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <button
      onClick={() => setLang(lang === 'zh-CN' ? 'en-US' : 'zh-CN')}
      className="px-2 py-1 text-xs rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      title={lang === 'zh-CN' ? 'Switch to English' : '切换到中文'}
    >
      {lang === 'zh-CN' ? 'EN' : '中文'}
    </button>
  );
}

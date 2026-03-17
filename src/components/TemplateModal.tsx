import { useMemo } from 'react';
import { getTemplates } from '../data/markdownTemplates';
import { useI18n } from '../i18n/context';

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (content: string) => void;
  hasContent: boolean;
}

export default function TemplateModal({ open, onClose, onSelect, hasContent }: Props) {
  const { lang, t } = useI18n();
  const templates = useMemo(() => getTemplates(lang), [lang]);

  if (!open) return null;

  const handleSelect = (content: string) => {
    if (hasContent) {
      if (!window.confirm(t.templateModal.confirm)) return;
    }
    onSelect(content);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t.templateModal.title}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t.templateModal.subtitle}</p>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4 grid sm:grid-cols-2 gap-3">
          {templates.map((tmpl) => (
            <button key={tmpl.id} onClick={() => handleSelect(tmpl.content)} className="text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all group">
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">{tmpl.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{tmpl.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

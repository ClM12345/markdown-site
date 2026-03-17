import { useEffect, useMemo } from 'react';
import { getShortcutGroups } from '../data/shortcutHelp';
import { shortcutLabel } from '../hooks/useEditorShortcuts';
import { useI18n } from '../i18n/context';

interface Props { open: boolean; onClose: () => void; }

function KeyBadge({ keys }: { keys: string }) {
  const parts = shortcutLabel(keys).split('+');
  return (
    <span className="flex items-center gap-1">
      {parts.map((p, i) => (
        <kbd key={i} className="inline-block min-w-[1.5rem] text-center px-1.5 py-0.5 text-xs font-mono rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 shadow-sm">{p}</kbd>
      ))}
    </span>
  );
}

export default function ShortcutHelpModal({ open, onClose }: Props) {
  const { t } = useI18n();
  const groups = useMemo(() => getShortcutGroups(t.shortcutDesc), [t.shortcutDesc]);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white dark:bg-gray-800 flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">{t.shortcutModal.title}</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="px-5 py-4 space-y-5">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">{group.title}</h3>
              <div className="space-y-1.5">
                {group.items.map((item) => (
                  <div key={item.keys} className="flex items-center justify-between py-1">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.desc}</span>
                    <KeyBadge keys={item.keys} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

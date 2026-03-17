import { TOOLBAR_ITEMS, applyAction } from '../utils/toolbar';
import { shortcutLabel } from '../hooks/useEditorShortcuts';
import { useI18n } from '../i18n/context';

interface Props {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  value: string;
  onChange: (value: string) => void;
}

export default function Toolbar({ textareaRef, value, onChange }: Props) {
  const { t } = useI18n();
  const handleClick = (index: number) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { selectionStart, selectionEnd } = ta;
    const item = TOOLBAR_ITEMS[index];
    const result = applyAction(value, selectionStart, selectionEnd, item.action);
    onChange(result.value);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(result.selectionStart, result.selectionEnd);
    });
  };

  return (
    <div className="flex flex-wrap gap-1 px-3 py-1.5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {TOOLBAR_ITEMS.map((item, i) => {
        const title = (t.toolbar as Record<string, string>)[item.id] || item.title;
        return (
          <button
            key={i}
            title={item.shortcut ? `${title} (${shortcutLabel(item.shortcut)})` : title}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleClick(i)}
            className={`px-2 py-1 ${item.className || 'text-xs'} font-mono rounded hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

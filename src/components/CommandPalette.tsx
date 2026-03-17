import { useEffect, useRef, useState, useMemo } from 'react';
import { shortcutLabel } from '../hooks/useEditorShortcuts';
import { useI18n } from '../i18n/context';

export interface CommandItem {
  id: string;
  label: string;
  category?: string;
  shortcut?: string;
  action: () => void;
}

interface Props {
  open: boolean;
  onClose: () => void;
  commands: CommandItem[];
}

export default function CommandPalette({ open, onClose, commands }: Props) {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(c => c.label.toLowerCase().includes(q) || c.category?.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => { if (open) { setQuery(''); setActiveIdx(0); requestAnimationFrame(() => inputRef.current?.focus()); } }, [open]);
  useEffect(() => { setActiveIdx(0); }, [filtered]);
  useEffect(() => { const el = listRef.current?.children[activeIdx] as HTMLElement | undefined; el?.scrollIntoView({ block: 'nearest' }); }, [activeIdx]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (open) onClose(); else (open as unknown) || document.dispatchEvent(new CustomEvent('open-command-palette'));
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const execute = (cmd: CommandItem) => { onClose(); cmd.action(); };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, filtered.length - 1)); return; }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); return; }
    if (e.key === 'Enter' && filtered[activeIdx]) { e.preventDefault(); execute(filtered[activeIdx]); }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-700" onClick={e => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <div className="flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
          <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} placeholder={t.command.placeholder} className="w-full px-3 py-3 text-sm bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" />
        </div>
        <div ref={listRef} className="max-h-72 overflow-auto py-1">
          {filtered.length === 0 && <div className="px-4 py-6 text-center text-sm text-gray-400 dark:text-gray-500">{t.command.noMatch}</div>}
          {filtered.map((cmd, i) => (
            <button key={cmd.id} onClick={() => execute(cmd)} onMouseEnter={() => setActiveIdx(i)} className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${i === activeIdx ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
              <span className="flex items-center gap-2 truncate">
                {cmd.category && <span className="text-xs text-gray-400 dark:text-gray-500">{cmd.category}</span>}
                <span className="truncate">{cmd.label}</span>
              </span>
              {cmd.shortcut && <span className="shrink-0 ml-3 text-xs text-gray-400 dark:text-gray-500">{shortcutLabel(cmd.shortcut)}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

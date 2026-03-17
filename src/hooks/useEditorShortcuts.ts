import { useEffect, useRef } from 'react';
import { applyAction, type InsertAction } from '../utils/toolbar';

export const isMac = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform);

export function shortcutLabel(s: string): string {
  if (isMac) return s.replace('Mod+', '⌘').replace('Shift+', '⇧').replace('Alt+', '⌥');
  return s.replace('Mod', 'Ctrl');
}

interface FormatDef {
  key?: string;
  code?: string;
  shift?: boolean;
  alt?: boolean;
  action: InsertAction;
}

const FORMATS: FormatDef[] = [
  { key: 'b', action: { type: 'wrap', before: '**', after: '**', placeholder: '粗体文字' } },
  { key: 'i', action: { type: 'wrap', before: '*', after: '*', placeholder: '斜体文字' } },
  { key: 'e', action: { type: 'wrap', before: '`', after: '`', placeholder: 'code' } },
  { key: 'k', shift: true, action: { type: 'block', before: '```\n', after: '\n```', placeholder: '代码' } },
  { code: 'Digit1', alt: true, action: { type: 'prefix', before: '# ', placeholder: '标题' } },
  { code: 'Digit2', alt: true, action: { type: 'prefix', before: '## ', placeholder: '标题' } },
  { code: 'Digit3', alt: true, action: { type: 'prefix', before: '### ', placeholder: '标题' } },
  { code: 'Digit7', shift: true, action: { type: 'prefix', before: '- ', placeholder: '列表项' } },
  { code: 'Digit8', shift: true, action: { type: 'prefix', before: '1. ', placeholder: '列表项' } },
  { code: 'Digit9', shift: true, action: { type: 'prefix', before: '- [ ] ', placeholder: '待办事项' } },
  { key: 'l', shift: true, action: { type: 'wrap', before: '[', after: '](url)', placeholder: '链接文字' } },
];

interface Config {
  editorRef: React.RefObject<HTMLTextAreaElement | null>;
  content: string;
  onContentChange: (val: string) => void;
  onSave: () => void;
  onOpenFile: () => void;
  onNewTab: () => void;
  onCloseTab: () => void;
  onExport: () => void;
  onToggleSearch: () => void;
  onSearchNext: () => void;
  onSearchPrev: () => void;
  onUndo: () => void;
  onRedo: () => void;
}

export function useEditorShortcuts(cfg: Config) {
  const c = useRef(cfg);
  c.current = cfg;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;

      const key = e.key.toLowerCase();
      const ae = document.activeElement;
      const inOtherInput = ae && ae !== c.current.editorRef.current &&
        (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA');

      if (key === 's' && !e.shiftKey && !e.altKey) { e.preventDefault(); c.current.onSave(); return; }
      if (key === 's' && e.shiftKey && !e.altKey) { e.preventDefault(); c.current.onExport(); return; }
      if (key === 'o' && !e.shiftKey && !e.altKey) { e.preventDefault(); c.current.onOpenFile(); return; }
      if (key === 'f' && !e.shiftKey && !e.altKey) { e.preventDefault(); c.current.onToggleSearch(); return; }
      if (key === 'h' && !e.shiftKey && !e.altKey) { e.preventDefault(); c.current.onToggleSearch(); return; }
      if (key === 'g' && !e.shiftKey && !e.altKey) { e.preventDefault(); c.current.onSearchNext(); return; }
      if (key === 'g' && e.shiftKey && !e.altKey) { e.preventDefault(); c.current.onSearchPrev(); return; }

      if (inOtherInput) return;

      if (key === 'n' && !e.shiftKey && !e.altKey) { e.preventDefault(); c.current.onNewTab(); return; }
      if (key === 'w' && !e.shiftKey && !e.altKey) { e.preventDefault(); c.current.onCloseTab(); return; }
      if (key === 'z' && !e.shiftKey && !e.altKey) { e.preventDefault(); c.current.onUndo(); return; }
      if ((key === 'z' && e.shiftKey && !e.altKey) || (key === 'y' && !e.shiftKey && !e.altKey)) { e.preventDefault(); c.current.onRedo(); return; }

      const ta = c.current.editorRef.current;
      if (!ta) return;
      for (const f of FORMATS) {
        const km = f.key ? key === f.key : false;
        const cm = f.code ? e.code === f.code : false;
        if ((km || cm) && !!e.shiftKey === !!f.shift && !!e.altKey === !!f.alt) {
          e.preventDefault();
          const r = applyAction(c.current.content, ta.selectionStart, ta.selectionEnd, f.action);
          c.current.onContentChange(r.value);
          requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(r.selectionStart, r.selectionEnd); });
          return;
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
}

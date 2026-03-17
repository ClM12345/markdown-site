import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import zhCN, { type Messages } from './zh-CN';
import enUS from './en-US';

export type Lang = 'zh-CN' | 'en-US';

const LOCALES: Record<Lang, Messages> = { 'zh-CN': zhCN, 'en-US': enUS };
const STORAGE_KEY = 'md-lang';

function getInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'zh-CN' || stored === 'en-US') return stored;
  } catch { /* noop */ }
  const nav = navigator.language || '';
  return nav.startsWith('zh') ? 'zh-CN' : 'en-US';
}

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: Messages }

const I18nCtx = createContext<Ctx>(null!);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, _set] = useState<Lang>(getInitialLang);
  const setLang = useCallback((l: Lang) => {
    _set(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* noop */ }
  }, []);
  return <I18nCtx.Provider value={{ lang, setLang, t: LOCALES[lang] }}>{children}</I18nCtx.Provider>;
}

export function useI18n() { return useContext(I18nCtx); }

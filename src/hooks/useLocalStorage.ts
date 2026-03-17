import { useState, useEffect, useRef, useCallback } from 'react';

const SAVE_TIME_SUFFIX = '__saved_at';

export function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? stored : initialValue;
    } catch {
      return initialValue;
    }
  });

  const [lastSaved, setLastSaved] = useState<string | null>(() => {
    try { return localStorage.getItem(key + SAVE_TIME_SUFFIX); } catch { return null; }
  });

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, value);
        const now = new Date().toLocaleString('zh-CN');
        localStorage.setItem(key + SAVE_TIME_SUFFIX, now);
        setLastSaved(now);
      } catch { /* ignore */ }
    }, 500);
    return () => clearTimeout(timerRef.current);
  }, [key, value]);

  const clearStorage = useCallback(() => {
    try {
      localStorage.removeItem(key);
      localStorage.removeItem(key + SAVE_TIME_SUFFIX);
    } catch { /* ignore */ }
    setValue(initialValue);
    setLastSaved(null);
  }, [key, initialValue]);

  return [value, setValue, lastSaved, clearStorage] as const;
}

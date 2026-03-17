import { useState, useCallback, useEffect, useRef } from 'react';
import type { RecentFile, FileSource } from '../types/workspace';

const KEY = 'md-recent-files';
const MAX = 10;

function load(): RecentFile[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function useRecentFiles() {
  const [files, setFiles] = useState<RecentFile[]>(load);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      try { localStorage.setItem(KEY, JSON.stringify(files)); } catch { /* ignore */ }
    }, 500);
    return () => clearTimeout(timer.current);
  }, [files]);

  const addRecent = useCallback((id: string, name: string, content: string, source: FileSource) => {
    setFiles((prev) => {
      const filtered = prev.filter((f) => f.id !== id);
      const entry: RecentFile = { id, name, content, source, updatedAt: new Date().toLocaleString('zh-CN') };
      return [entry, ...filtered].slice(0, MAX);
    });
  }, []);

  const removeRecent = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearRecent = useCallback(() => {
    setFiles([]);
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  }, []);

  return { recentFiles: files, addRecent, removeRecent, clearRecent };
}

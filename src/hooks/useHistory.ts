import { useRef, useCallback } from 'react';

interface History {
  past: string[];
  future: string[];
}

const MAX_HISTORY = 100;
const DEBOUNCE_MS = 600;

export function useHistory() {
  const historyMap = useRef<Map<string, History>>(new Map());
  const timerMap = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const lastSnap = useRef<Map<string, string>>(new Map());

  const getHistory = (tabId: string): History => {
    if (!historyMap.current.has(tabId)) {
      historyMap.current.set(tabId, { past: [], future: [] });
    }
    return historyMap.current.get(tabId)!;
  };

  const record = useCallback((tabId: string, content: string) => {
    clearTimeout(timerMap.current.get(tabId));
    timerMap.current.set(tabId, setTimeout(() => {
      const h = getHistory(tabId);
      const last = lastSnap.current.get(tabId);
      if (content === last) return;
      if (last !== undefined) {
        h.past.push(last);
        if (h.past.length > MAX_HISTORY) h.past.shift();
      }
      h.future = [];
      lastSnap.current.set(tabId, content);
    }, DEBOUNCE_MS));
  }, []);

  const initTab = useCallback((tabId: string, content: string) => {
    if (!lastSnap.current.has(tabId)) {
      lastSnap.current.set(tabId, content);
      historyMap.current.set(tabId, { past: [], future: [] });
    }
  }, []);

  const undo = useCallback((tabId: string, currentContent: string): string | null => {
    clearTimeout(timerMap.current.get(tabId));
    const h = getHistory(tabId);
    const snap = lastSnap.current.get(tabId);
    if (snap !== undefined && snap !== currentContent) {
      h.past.push(snap);
      h.future.push(currentContent);
      const prev = h.past.pop();
      if (prev !== undefined) {
        lastSnap.current.set(tabId, prev);
        return prev;
      }
    }
    if (h.past.length === 0) return null;
    h.future.push(currentContent);
    const prev = h.past.pop()!;
    lastSnap.current.set(tabId, prev);
    return prev;
  }, []);

  const redo = useCallback((tabId: string, currentContent: string): string | null => {
    clearTimeout(timerMap.current.get(tabId));
    const h = getHistory(tabId);
    if (h.future.length === 0) return null;
    h.past.push(currentContent);
    const next = h.future.pop()!;
    lastSnap.current.set(tabId, next);
    return next;
  }, []);

  const canUndo = useCallback((tabId: string, currentContent: string): boolean => {
    const h = getHistory(tabId);
    const snap = lastSnap.current.get(tabId);
    return h.past.length > 0 || (snap !== undefined && snap !== currentContent);
  }, []);

  const canRedo = useCallback((tabId: string): boolean => {
    return getHistory(tabId).future.length > 0;
  }, []);

  const removeTab = useCallback((tabId: string) => {
    historyMap.current.delete(tabId);
    lastSnap.current.delete(tabId);
    clearTimeout(timerMap.current.get(tabId));
    timerMap.current.delete(tabId);
  }, []);

  return { record, initTab, undo, redo, canUndo, canRedo, removeTab };
}

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Tab, FileSource } from '../types/workspace';
import { DEFAULT_MARKDOWN } from '../data/markdownExamples';

const TABS_KEY = 'md-workspace-tabs';
const ACTIVE_KEY = 'md-workspace-active';

let nextId = 1;
function genId() { return `tab-${Date.now()}-${nextId++}`; }
function now() { return new Date().toLocaleString('zh-CN'); }

function createTab(name: string, content: string, source: FileSource): Tab {
  return { id: genId(), name, content, savedContent: content, source, updatedAt: now() };
}

function loadTabs(): { tabs: Tab[]; activeId: string } {
  try {
    const raw = localStorage.getItem(TABS_KEY);
    if (raw) {
      const tabs = JSON.parse(raw) as Tab[];
      const activeId = localStorage.getItem(ACTIVE_KEY) || tabs[0]?.id || '';
      if (tabs.length > 0) return { tabs, activeId };
    }
    const legacy = localStorage.getItem('md-editor-content');
    if (legacy) {
      const tab = createTab('未命名', legacy, 'created');
      return { tabs: [tab], activeId: tab.id };
    }
  } catch { /* ignore */ }
  const tab = createTab('未命名', DEFAULT_MARKDOWN, 'created');
  return { tabs: [tab], activeId: tab.id };
}

export function useWorkspace() {
  const [tabs, setTabs] = useState<Tab[]>(() => loadTabs().tabs);
  const [activeId, setActiveId] = useState(() => loadTabs().activeId);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(TABS_KEY, JSON.stringify(tabs));
        localStorage.setItem(ACTIVE_KEY, activeId);
      } catch { /* ignore */ }
    }, 500);
    return () => clearTimeout(saveTimer.current);
  }, [tabs, activeId]);

  const activeTab = tabs.find((t) => t.id === activeId) || tabs[0];
  const content = activeTab?.content || '';

  const setContent = useCallback((val: string | ((prev: string) => string)) => {
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeId
          ? { ...t, content: typeof val === 'function' ? val(t.content) : val, updatedAt: now() }
          : t
      )
    );
  }, [activeId]);

  const addTab = useCallback((name: string, content: string, source: FileSource) => {
    const tab = createTab(name, content, source);
    setTabs((prev) => [...prev, tab]);
    setActiveId(tab.id);
    return tab;
  }, []);

  const closeTab = useCallback((id: string) => {
    setTabs((prev) => {
      const idx = prev.findIndex((t) => t.id === id);
      const next = prev.filter((t) => t.id !== id);
      if (next.length === 0) {
        const tab = createTab('未命名', '', 'created');
        setActiveId(tab.id);
        return [tab];
      }
      if (id === activeId) {
        const newIdx = Math.min(idx, next.length - 1);
        setActiveId(next[newIdx].id);
      }
      return next;
    });
  }, [activeId]);

  const switchTab = useCallback((id: string) => setActiveId(id), []);

  const renameTab = useCallback((id: string, name: string) => {
    setTabs((prev) => prev.map((t) => (t.id === id ? { ...t, name } : t)));
  }, []);

  const openExisting = useCallback((id: string) => {
    const existing = tabs.find((t) => t.id === id);
    if (existing) { setActiveId(id); return true; }
    return false;
  }, [tabs]);

  const isModified = (tab: Tab) => tab.content !== tab.savedContent;

  const markSaved = useCallback((id: string) => {
    setTabs((prev) =>
      prev.map((t) => (t.id === id ? { ...t, savedContent: t.content } : t))
    );
  }, []);

  const clearAll = useCallback(() => {
    const tab = createTab('未命名', DEFAULT_MARKDOWN, 'created');
    setTabs([tab]);
    setActiveId(tab.id);
    try {
      localStorage.removeItem(TABS_KEY);
      localStorage.removeItem(ACTIVE_KEY);
      localStorage.removeItem('md-editor-content');
      localStorage.removeItem('md-editor-content__saved_at');
    } catch { /* ignore */ }
  }, []);

  return {
    tabs, activeTab, activeId, content,
    setContent, addTab, closeTab, switchTab, renameTab,
    openExisting, isModified, markSaved, clearAll,
  };
}

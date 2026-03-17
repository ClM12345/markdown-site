import { useState, useRef, useEffect } from 'react';
import type { Tab } from '../types/workspace';

interface Props {
  tabs: Tab[];
  activeId: string;
  isModified: (tab: Tab) => boolean;
  onSwitch: (id: string) => void;
  onClose: (id: string) => void;
  onAdd: () => void;
  onRename: (id: string, name: string) => void;
}

function TabName({ tab, active, onRename }: { tab: Tab; active: boolean; onRename: (name: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(tab.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  const commit = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== tab.name) onRename(trimmed);
    else setValue(tab.name);
    setEditing(false);
  };

  if (editing && active) {
    return (
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setValue(tab.name); setEditing(false); } }}
        className="w-24 px-1 py-0 text-xs bg-transparent border-b border-blue-400 outline-none text-gray-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return (
    <span
      className="truncate max-w-[120px]"
      onDoubleClick={(e) => { e.stopPropagation(); if (active) { setValue(tab.name); setEditing(true); } }}
    >
      {tab.name}
    </span>
  );
}

export default function EditorTabs({ tabs, activeId, isModified, onSwitch, onClose, onAdd, onRename }: Props) {
  return (
    <div className="flex items-center border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 no-print overflow-x-auto">
      <div className="flex min-w-0">
        {tabs.map((tab) => {
          const active = tab.id === activeId;
          const modified = isModified(tab);
          return (
            <button
              key={tab.id}
              onClick={() => onSwitch(tab.id)}
              className={`group flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-r border-gray-200 dark:border-gray-700 whitespace-nowrap transition-colors ${
                active
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <TabName tab={tab} active={active} onRename={(name) => onRename(tab.id, name)} />
              {modified && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
              )}
              {tabs.length > 1 && (
                <span
                  onClick={(e) => { e.stopPropagation(); onClose(tab.id); }}
                  className="ml-0.5 p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition-opacity text-gray-400 dark:text-gray-500"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>
      <button
        onClick={onAdd}
        className="shrink-0 px-2.5 py-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        title="新建标签"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}

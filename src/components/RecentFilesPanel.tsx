import { useState } from 'react';
import type { RecentFile } from '../types/workspace';

const SOURCE_LABEL: Record<string, string> = {
  imported: '导入',
  created: '新建',
  template: '模板',
};

interface Props {
  files: RecentFile[];
  onOpen: (file: RecentFile) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function RecentFilesPanel({ files, onOpen, onRemove, onClear }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        最近文件
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">最近文件</span>
              {files.length > 0 && (
                <button
                  onClick={() => { onClear(); setOpen(false); }}
                  className="text-xs text-red-500 hover:text-red-600 dark:text-red-400"
                >
                  清空
                </button>
              )}
            </div>
            <div className="max-h-64 overflow-auto">
              {files.length === 0 ? (
                <div className="px-3 py-6 text-center text-xs text-gray-400 dark:text-gray-500">暂无记录</div>
              ) : (
                files.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer group"
                    onClick={() => { onOpen(f); setOpen(false); }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">{f.name}</div>
                      <div className="text-[10px] text-gray-400 dark:text-gray-500">
                        {SOURCE_LABEL[f.source] || f.source} · {f.updatedAt}
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onRemove(f.id); }}
                      className="opacity-0 group-hover:opacity-100 p-0.5 text-gray-400 hover:text-red-500 transition-opacity"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

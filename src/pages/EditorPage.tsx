import { useCallback, useMemo, useRef, useState } from 'react';
import MarkdownEditor from '../components/MarkdownEditor';
import MarkdownPreview from '../components/MarkdownPreview';
import FileUpload from '../components/FileUpload';
import Toolbar from '../components/Toolbar';
import TocPanel from '../components/TocPanel';
import TemplateModal from '../components/TemplateModal';
import EditorTabs from '../components/EditorTabs';
import RecentFilesPanel from '../components/RecentFilesPanel';
import { useWorkspace } from '../hooks/useWorkspace';
import { useRecentFiles } from '../hooks/useRecentFiles';
import { useToc } from '../hooks/useToc';
import { DEFAULT_MARKDOWN } from '../data/markdownExamples';
import { exportMarkdown, exportHTML, exportPDF } from '../utils/export';
import type { RecentFile } from '../types/workspace';

const BTN = "px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors";

export default function EditorPage() {
  const ws = useWorkspace();
  const { recentFiles, addRecent, removeRecent, clearRecent } = useRecentFiles();
  const [showTemplate, setShowTemplate] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const content = ws.content;

  const stats = useMemo(() => {
    const chars = content.length;
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const lines = content.split('\n').length;
    const readMin = Math.max(1, Math.ceil(chars / 500));
    return { chars, words, lines, readMin };
  }, [content]);

  const tocItems = useToc(content);

  const handleTocClick = useCallback((index: number) => {
    const container = previewRef.current;
    if (!container) return;
    const headings = container.querySelectorAll('h1, h2, h3');
    const target = headings[index];
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleExportHTML = useCallback(() => {
    const html = previewRef.current?.innerHTML || '';
    exportHTML(html);
  }, []);

  const handleFileLoad = useCallback((text: string) => {
    const tab = ws.addTab('导入文件', text, 'imported');
    addRecent(tab.id, tab.name, text, 'imported');
  }, [ws, addRecent]);

  const handleTemplateSelect = useCallback((text: string) => {
    const tab = ws.addTab('模板文档', text, 'template');
    addRecent(tab.id, tab.name, text, 'template');
  }, [ws, addRecent]);

  const handleOpenRecent = useCallback((file: RecentFile) => {
    if (!ws.openExisting(file.id)) {
      ws.addTab(file.name, file.content, file.source);
    }
  }, [ws]);

  const handleAddTab = useCallback(() => {
    const tab = ws.addTab('未命名', '', 'created');
    addRecent(tab.id, tab.name, '', 'created');
  }, [ws, addRecent]);

  const handleSetContent = useCallback((val: string | ((prev: string) => string)) => {
    ws.setContent(val);
    if (ws.activeTab) {
      const newVal = typeof val === 'function' ? val(ws.activeTab.content) : val;
      addRecent(ws.activeTab.id, ws.activeTab.name, newVal, ws.activeTab.source);
    }
  }, [ws, addRecent]);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 no-print flex-wrap">
        <button onClick={() => ws.setContent('')} className={BTN}>清空</button>
        <button onClick={() => ws.setContent(DEFAULT_MARKDOWN)} className={BTN}>恢复示例</button>
        <button
          onClick={ws.clearAll}
          className="px-3 py-1.5 text-xs font-medium rounded-md border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
        >
          清除缓存
        </button>
        <button onClick={() => setShowTemplate(true)} className="px-3 py-1.5 text-xs font-medium rounded-md border border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">模板</button>
        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
        <button onClick={() => exportMarkdown(content)} className={BTN}>导出 .md</button>
        <button onClick={handleExportHTML} className={BTN}>导出 HTML</button>
        <button onClick={() => exportPDF(previewRef.current?.innerHTML || '')} className={BTN}>导出 PDF</button>
        <div className="flex-1" />
        <RecentFilesPanel files={recentFiles} onOpen={handleOpenRecent} onRemove={removeRecent} onClear={clearRecent} />
        <div className="w-48 md:w-56">
          <FileUpload onLoad={handleFileLoad} />
        </div>
      </div>

      <EditorTabs
        tabs={ws.tabs}
        activeId={ws.activeId}
        isModified={ws.isModified}
        onSwitch={ws.switchTab}
        onClose={ws.closeTab}
        onAdd={handleAddTab}
      />

      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        <div className="md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 no-print flex flex-col">
          <Toolbar textareaRef={editorRef} value={content} onChange={handleSetContent} />
          <div className="flex-1 min-h-0">
            <MarkdownEditor ref={editorRef} value={content} onChange={handleSetContent} />
          </div>
          <div className="flex gap-3 px-3 py-1 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-400 dark:text-gray-500">
            <span>{stats.chars} 字符</span>
            <span>{stats.words} 词</span>
            <span>{stats.lines} 行</span>
            <span>约 {stats.readMin} 分钟阅读</span>
          </div>
        </div>
        <div className="md:w-1/2 h-1/2 md:h-full overflow-auto p-6 print-preview-area" ref={previewRef}>
          <MarkdownPreview content={content} />
        </div>
        <TocPanel items={tocItems} onClickItem={handleTocClick} />
      </div>
      <TemplateModal
        open={showTemplate}
        onClose={() => setShowTemplate(false)}
        onSelect={handleTemplateSelect}
        hasContent={content.trim().length > 0}
      />
    </div>
  );
}

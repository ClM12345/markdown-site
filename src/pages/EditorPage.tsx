import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MarkdownEditor from '../components/MarkdownEditor';
import MarkdownPreview from '../components/MarkdownPreview';
import FileUpload from '../components/FileUpload';
import Toolbar from '../components/Toolbar';
import TocPanel from '../components/TocPanel';
import TemplateModal from '../components/TemplateModal';
import EditorTabs from '../components/EditorTabs';
import RecentFilesPanel from '../components/RecentFilesPanel';
import SearchReplaceBar from '../components/SearchReplaceBar';
import ShortcutHelpModal from '../components/ShortcutHelpModal';
import CommandPalette, { type CommandItem } from '../components/CommandPalette';
import { useWorkspace } from '../hooks/useWorkspace';
import { useRecentFiles } from '../hooks/useRecentFiles';
import { useToc } from '../hooks/useToc';
import { useSearch } from '../hooks/useSearch';
import { useHistory } from '../hooks/useHistory';
import { useScrollSync } from '../hooks/useScrollSync';
import { useEditorShortcuts, shortcutLabel } from '../hooks/useEditorShortcuts';
import { DEFAULT_MARKDOWN } from '../data/markdownExamples';
import { exportMarkdown, exportHTML, exportPDF } from '../utils/export';
import { readMarkdownFile } from '../utils/file';
import type { RecentFile } from '../types/workspace';

const BTN = "px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors";

export default function EditorPage({ toggleTheme }: { toggleTheme?: () => void }) {
  const ws = useWorkspace();
  const { recentFiles, addRecent, removeRecent, clearRecent } = useRecentFiles();
  const [showTemplate, setShowTemplate] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const content = ws.content;

  const stats = useMemo(() => {
    const chars = content.length;
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const lines = content.split('\n').length;
    const readMin = Math.max(1, Math.ceil(chars / 500));
    return { chars, words, lines, readMin };
  }, [content]);

  const tocItems = useToc(content);
  const search = useSearch(content, ws.activeId);
  const history = useHistory();

  useEffect(() => {
    if (ws.activeTab) history.initTab(ws.activeTab.id, ws.activeTab.content);
  }, [ws.activeTab?.id]);

  const _canUndo = ws.activeTab ? history.canUndo(ws.activeTab.id, content) : false;
  const _canRedo = ws.activeTab ? history.canRedo(ws.activeTab.id) : false;

  const scrollSync = useScrollSync(editorRef, previewRef);
  const [activeTocIndex, setActiveTocIndex] = useState(-1);

  const handleEditorScroll = useCallback(() => {
    scrollSync.handleEditorScroll();
    setActiveTocIndex(scrollSync.getActiveHeadingIndex());
  }, [scrollSync]);

  const handleSetContent = useCallback((val: string | ((prev: string) => string)) => {
    ws.setContent(val);
    if (ws.activeTab) {
      const newVal = typeof val === 'function' ? val(ws.activeTab.content) : val;
      addRecent(ws.activeTab.id, ws.activeTab.name, newVal, ws.activeTab.source);
      history.record(ws.activeTab.id, newVal);
    }
  }, [ws, addRecent, history]);

  const handleUndo = useCallback(() => {
    if (!ws.activeTab) return;
    const prev = history.undo(ws.activeTab.id, content);
    if (prev !== null) ws.setContent(prev);
  }, [ws, content, history]);

  const handleRedo = useCallback(() => {
    if (!ws.activeTab) return;
    const next = history.redo(ws.activeTab.id, content);
    if (next !== null) ws.setContent(next);
  }, [ws, content, history]);

  const scrollToMatch = useCallback((pos: number) => {
    const ta = editorRef.current;
    if (!ta || pos < 0) return;
    ta.focus();
    ta.setSelectionRange(pos, pos + search.query.length);
    const linesBefore = content.slice(0, pos).split('\n');
    const lineHeight = ta.scrollHeight / content.split('\n').length;
    ta.scrollTop = Math.max(0, (linesBefore.length - 3) * lineHeight);
  }, [content, search.query.length]);

  const handleSearchNext = useCallback(() => {
    search.goNext();
    setTimeout(() => scrollToMatch(search.currentMatchPos), 0);
  }, [search, scrollToMatch]);

  const handleSearchPrev = useCallback(() => {
    search.goPrev();
    setTimeout(() => scrollToMatch(search.currentMatchPos), 0);
  }, [search, scrollToMatch]);

  const handleReplaceCurrent = useCallback(() => {
    const result = search.replaceCurrent();
    if (result !== null) handleSetContent(result);
  }, [search, handleSetContent]);

  const handleReplaceAll = useCallback(() => {
    const result = search.replaceAll();
    if (result !== null) handleSetContent(result);
  }, [search, handleSetContent]);

  const handleTocClick = useCallback((index: number) => {
    const container = previewRef.current;
    if (!container) return;
    const headings = container.querySelectorAll('h1, h2, h3');
    const target = headings[index];
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    scrollSync.scrollEditorToHeading(index, content);
    setActiveTocIndex(index);
  }, [content, scrollSync]);

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

  const handleSave = useCallback(() => {
    if (!ws.activeTab) return;
    const name = ws.activeTab.name.endsWith('.md') ? ws.activeTab.name : ws.activeTab.name + '.md';
    exportMarkdown(content, name);
    ws.markSaved(ws.activeTab.id);
  }, [ws, content]);

  const handleCloseCurrentTab = useCallback(() => {
    if (ws.activeTab) ws.closeTab(ws.activeTab.id);
  }, [ws]);

  useEffect(() => {
    const h = () => setShowPalette(true);
    document.addEventListener('open-command-palette', h);
    return () => document.removeEventListener('open-command-palette', h);
  }, []);

  const paletteCommands = useMemo((): CommandItem[] => {
    const cmds: CommandItem[] = [
      { id: 'new-tab', label: '新建标签', category: '文件', shortcut: 'Mod+N', action: handleAddTab },
      { id: 'open-file', label: '打开文件', category: '文件', shortcut: 'Mod+O', action: () => fileInputRef.current?.click() },
      { id: 'save', label: '保存当前标签', category: '文件', shortcut: 'Mod+S', action: handleSave },
      { id: 'template', label: '打开模板中心', category: '文件', action: () => setShowTemplate(true) },
      { id: 'export-md', label: '导出 Markdown', category: '导出', shortcut: 'Mod+Shift+S', action: () => exportMarkdown(content) },
      { id: 'export-html', label: '导出 HTML', category: '导出', action: handleExportHTML },
      { id: 'export-pdf', label: '导出 PDF', category: '导出', action: () => exportPDF(previewRef.current?.innerHTML || '') },
      { id: 'search', label: '打开搜索', category: '编辑', shortcut: 'Mod+F', action: () => setShowSearch(true) },
      { id: 'replace', label: '打开替换', category: '编辑', shortcut: 'Mod+H', action: () => setShowSearch(true) },
      { id: 'toggle-theme', label: '切换深色模式', category: '视图', action: () => toggleTheme?.() },
      { id: 'shortcuts', label: '打开快捷键说明', category: '帮助', action: () => setShowShortcuts(true) },
    ];
    recentFiles.forEach(f => {
      cmds.push({ id: `recent-${f.id}`, label: f.name, category: '最近文件', action: () => handleOpenRecent(f) });
    });
    ws.tabs.forEach(t => {
      cmds.push({ id: `tab-${t.id}`, label: t.name, category: '切换标签', action: () => ws.switchTab(t.id) });
    });
    tocItems.forEach(item => {
      cmds.push({ id: `heading-${item.index}`, label: `${'#'.repeat(item.level)} ${item.text}`, category: '跳转标题', action: () => handleTocClick(item.index) });
    });
    return cmds;
  }, [content, recentFiles, ws.tabs, tocItems, handleAddTab, handleSave, handleExportHTML, handleOpenRecent, handleTocClick, toggleTheme]);

  useEditorShortcuts({
    editorRef,
    content,
    onContentChange: handleSetContent,
    onSave: handleSave,
    onOpenFile: () => fileInputRef.current?.click(),
    onNewTab: handleAddTab,
    onCloseTab: handleCloseCurrentTab,
    onExport: () => exportMarkdown(content),
    onToggleSearch: () => setShowSearch(v => !v),
    onSearchNext: handleSearchNext,
    onSearchPrev: handleSearchPrev,
    onUndo: handleUndo,
    onRedo: handleRedo,
  });

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown,.txt"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            readMarkdownFile(file).then(text => { if (text.trim()) handleFileLoad(text); }).catch(() => {});
            e.target.value = '';
          }
        }}
      />
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
        <button onClick={() => setShowSearch((v) => !v)} className={BTN} title={`搜索与替换 (${shortcutLabel('Mod+F')})`}>搜索</button>
        <button onClick={handleSave} className="px-3 py-1.5 text-xs font-medium rounded-md border border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors" title={`保存 (${shortcutLabel('Mod+S')})`}>保存</button>
        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
        <button onClick={handleUndo} disabled={!_canUndo} className={`${BTN} disabled:opacity-30 disabled:cursor-not-allowed`} title={`撤销 (${shortcutLabel('Mod+Z')})`}>撤销</button>
        <button onClick={handleRedo} disabled={!_canRedo} className={`${BTN} disabled:opacity-30 disabled:cursor-not-allowed`} title={`重做 (${shortcutLabel('Mod+Shift+Z')})`}>重做</button>
        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
        <button onClick={() => exportMarkdown(content)} className={BTN} title={`导出 (${shortcutLabel('Mod+Shift+S')})`}>导出 .md</button>
        <button onClick={handleExportHTML} className={BTN}>导出 HTML</button>
        <button onClick={() => exportPDF(previewRef.current?.innerHTML || '')} className={BTN}>导出 PDF</button>
        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
        <button onClick={() => setShowShortcuts(true)} className={BTN} title="快捷键说明">⌨ 快捷键</button>
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
        onRename={ws.renameTab}
      />

      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        <div className="md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 no-print flex flex-col">
          <Toolbar textareaRef={editorRef} value={content} onChange={handleSetContent} />
          {showSearch && (
            <SearchReplaceBar
              query={search.query}
              replace={search.replace}
              caseSensitive={search.caseSensitive}
              match={search.match}
              onQueryChange={search.setQuery}
              onReplaceChange={search.setReplace}
              onToggleCase={search.toggleCase}
              onNext={handleSearchNext}
              onPrev={handleSearchPrev}
              onReplace={handleReplaceCurrent}
              onReplaceAll={handleReplaceAll}
              onClose={() => setShowSearch(false)}
            />
          )}
          <div className="flex-1 min-h-0">
            <MarkdownEditor ref={editorRef} value={content} onChange={handleSetContent} onScroll={handleEditorScroll} />
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
        <TocPanel items={tocItems} activeIndex={activeTocIndex} onClickItem={handleTocClick} />
      </div>
      <CommandPalette open={showPalette} onClose={() => setShowPalette(false)} commands={paletteCommands} />
      <ShortcutHelpModal open={showShortcuts} onClose={() => setShowShortcuts(false)} />
      <TemplateModal
        open={showTemplate}
        onClose={() => setShowTemplate(false)}
        onSelect={handleTemplateSelect}
        hasContent={content.trim().length > 0}
      />
    </div>
  );
}

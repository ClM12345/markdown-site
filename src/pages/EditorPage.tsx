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
import WelcomeModal from '../components/WelcomeModal';
import OnboardingTour from '../components/OnboardingTour';
import { useOnboarding } from '../hooks/useOnboarding';
import EmptyState from '../components/EmptyState';
import { useNavigate } from 'react-router-dom';
import { useWorkspace } from '../hooks/useWorkspace';
import { useRecentFiles } from '../hooks/useRecentFiles';
import { useToc } from '../hooks/useToc';
import { useSearch } from '../hooks/useSearch';
import { useHistory } from '../hooks/useHistory';
import { useScrollSync } from '../hooks/useScrollSync';
import { useEditorShortcuts, shortcutLabel } from '../hooks/useEditorShortcuts';
import { getDefaultMarkdown } from '../data/markdownExamples';
import { exportMarkdown, exportHTML, exportPDF } from '../utils/export';
import { readMarkdownFile } from '../utils/file';
import type { RecentFile } from '../types/workspace';
import { useI18n } from '../i18n/context';
import { usePageSEO } from '../hooks/usePageSEO';

const BTN = "px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors";

export default function EditorPage({ toggleTheme }: { toggleTheme?: () => void }) {
  const { lang, t } = useI18n();
  usePageSEO('editor');
  const DEFAULT_MARKDOWN = useMemo(() => getDefaultMarkdown(lang), [lang]);
  const navigate = useNavigate();
  const ws = useWorkspace();
  const { recentFiles, addRecent, removeRecent, clearRecent } = useRecentFiles();
  const [showTemplate, setShowTemplate] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const onboarding = useOnboarding();
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
      { id: 'new-tab', label: t.command.newTab, category: t.command.catFile, shortcut: 'Mod+N', action: handleAddTab },
      { id: 'open-file', label: t.command.openFile, category: t.command.catFile, shortcut: 'Mod+O', action: () => fileInputRef.current?.click() },
      { id: 'save', label: t.command.save, category: t.command.catFile, shortcut: 'Mod+S', action: handleSave },
      { id: 'template', label: t.command.openTemplate, category: t.command.catFile, action: () => setShowTemplate(true) },
      { id: 'export-md', label: t.command.exportMd, category: t.command.catExport, shortcut: 'Mod+Shift+S', action: () => exportMarkdown(content) },
      { id: 'export-html', label: t.command.exportHtml, category: t.command.catExport, action: handleExportHTML },
      { id: 'export-pdf', label: t.command.exportPdf, category: t.command.catExport, action: () => exportPDF(previewRef.current?.innerHTML || '') },
      { id: 'search', label: t.command.openSearch, category: t.command.catEdit, shortcut: 'Mod+F', action: () => setShowSearch(true) },
      { id: 'replace', label: t.command.openReplace, category: t.command.catEdit, shortcut: 'Mod+H', action: () => setShowSearch(true) },
      { id: 'toggle-theme', label: t.command.toggleTheme, category: t.command.catView, action: () => toggleTheme?.() },
      { id: 'shortcuts', label: t.command.shortcutHelp, category: t.command.catHelp, action: () => setShowShortcuts(true) },
      { id: 'onboarding', label: t.command.onboarding, category: t.command.catHelp, action: onboarding.restart },
      { id: 'help-center', label: t.command.helpCenter, category: t.command.catHelp, action: () => navigate('/help') },
    ];
    recentFiles.forEach(f => {
      cmds.push({ id: `recent-${f.id}`, label: f.name, category: t.command.catRecent, action: () => handleOpenRecent(f) });
    });
    ws.tabs.forEach(tab => {
      cmds.push({ id: `tab-${tab.id}`, label: tab.name, category: t.command.catTab, action: () => ws.switchTab(tab.id) });
    });
    tocItems.forEach(item => {
      cmds.push({ id: `heading-${item.index}`, label: `${'#'.repeat(item.level)} ${item.text}`, category: t.command.catHeading, action: () => handleTocClick(item.index) });
    });
    return cmds;
  }, [content, recentFiles, ws.tabs, tocItems, handleAddTab, handleSave, handleExportHTML, handleOpenRecent, handleTocClick, toggleTheme, t]);

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
      <div data-tour="action-bar" className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 no-print flex-wrap">
        <button onClick={() => ws.setContent('')} className={BTN}>{t.editor.clear}</button>
        <button onClick={() => ws.setContent(DEFAULT_MARKDOWN)} className={BTN}>{t.editor.restoreExample}</button>
        <button
          onClick={ws.clearAll}
          className="px-3 py-1.5 text-xs font-medium rounded-md border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
        >{t.editor.clearCache}</button>
        <button onClick={() => setShowTemplate(true)} className="px-3 py-1.5 text-xs font-medium rounded-md border border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">{t.editor.template}</button>
        <button onClick={() => setShowSearch((v) => !v)} className={BTN} title={`${t.editor.searchTip} (${shortcutLabel('Mod+F')})`}>{t.editor.search}</button>
        <button onClick={handleSave} className="px-3 py-1.5 text-xs font-medium rounded-md border border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors" title={`${t.editor.saveTip} (${shortcutLabel('Mod+S')})`}>{t.editor.save}</button>
        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
        <button onClick={handleUndo} disabled={!_canUndo} className={`${BTN} disabled:opacity-30 disabled:cursor-not-allowed`} title={`${t.editor.undoTip} (${shortcutLabel('Mod+Z')})`}>{t.editor.undo}</button>
        <button onClick={handleRedo} disabled={!_canRedo} className={`${BTN} disabled:opacity-30 disabled:cursor-not-allowed`} title={`${t.editor.redoTip} (${shortcutLabel('Mod+Shift+Z')})`}>{t.editor.redo}</button>
        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
        <button onClick={() => exportMarkdown(content)} className={BTN} title={`${t.editor.exportTip} (${shortcutLabel('Mod+Shift+S')})`}>{t.editor.exportMd}</button>
        <button onClick={handleExportHTML} className={BTN}>{t.editor.exportHtml}</button>
        <button onClick={() => exportPDF(previewRef.current?.innerHTML || '')} className={BTN}>{t.editor.exportPdf}</button>
        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
        <button data-tour="shortcut-btn" onClick={() => setShowShortcuts(true)} className={BTN} title={t.shortcutModal.title}>{t.editor.shortcuts}</button>
        <button onClick={onboarding.restart} className={BTN} title={t.editor.tour}>{t.editor.tour}</button>
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
          <div data-tour="toolbar"><Toolbar textareaRef={editorRef} value={content} onChange={handleSetContent} /></div>
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
          <div data-tour="editor" className="flex-1 min-h-0 relative">
            <MarkdownEditor ref={editorRef} value={content} onChange={handleSetContent} onScroll={handleEditorScroll} />
            {!content.trim() && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="pointer-events-auto">
                  <EmptyState
                    icon="✏️"
                    title={t.editor.emptyTitle}
                    actions={[
                      { label: t.editor.fromExample, onClick: () => handleSetContent(DEFAULT_MARKDOWN), primary: true },
                      { label: t.editor.openTemplate, onClick: () => setShowTemplate(true) },
                      { label: t.editor.importFile, onClick: () => fileInputRef.current?.click() },
                    ]}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-3 px-3 py-1 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-400 dark:text-gray-500">
            <span>{stats.chars} {t.editor.chars}</span>
            <span>{stats.words} {t.editor.words}</span>
            <span>{stats.lines} {t.editor.lines}</span>
            <span>{t.editor.readTime.replace('{n}', String(stats.readMin))}</span>
          </div>
        </div>
        <div data-tour="preview" className="md:w-1/2 h-1/2 md:h-full overflow-auto p-6 print-preview-area" ref={previewRef}>
          {content.trim() ? (
            <MarkdownPreview content={content} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <EmptyState icon="👀" title={t.editor.previewTitle} desc={t.editor.previewHint} />
            </div>
          )}
        </div>
        <TocPanel items={tocItems} activeIndex={activeTocIndex} onClickItem={handleTocClick} />
      </div>
      <WelcomeModal
        open={onboarding.showWelcome}
        onStartTour={onboarding.startTour}
        onSkip={onboarding.finishWelcome}
        onExample={() => { onboarding.finishWelcome(); ws.setContent(DEFAULT_MARKDOWN); }}
        onTemplate={() => { onboarding.finishWelcome(); setShowTemplate(true); }}
        onImport={() => { onboarding.finishWelcome(); fileInputRef.current?.click(); }}
      />
      <OnboardingTour open={onboarding.showTour} onFinish={onboarding.finishTour} />
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

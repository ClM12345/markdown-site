import { useCallback, useRef } from 'react';
import MarkdownEditor from '../components/MarkdownEditor';
import MarkdownPreview from '../components/MarkdownPreview';
import FileUpload from '../components/FileUpload';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_MARKDOWN } from '../data/markdownExamples';
import { exportMarkdown, exportHTML, exportPDF } from '../utils/export';

export default function EditorPage() {
  const [content, setContent] = useLocalStorage('md-editor-content', DEFAULT_MARKDOWN);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExportHTML = useCallback(() => {
    const html = previewRef.current?.innerHTML || '';
    exportHTML(html);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-white no-print flex-wrap">
        <button
          onClick={() => setContent('')}
          className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          清空
        </button>
        <button
          onClick={() => setContent(DEFAULT_MARKDOWN)}
          className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          恢复示例
        </button>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <button
          onClick={() => exportMarkdown(content)}
          className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          导出 .md
        </button>
        <button
          onClick={handleExportHTML}
          className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          导出 HTML
        </button>
        <button
          onClick={() => exportPDF(previewRef.current?.innerHTML || '')}
          className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          导出 PDF
        </button>
        <div className="flex-1" />
        <div className="w-48 md:w-64">
          <FileUpload onLoad={setContent} />
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        <div className="md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-gray-200 no-print">
          <MarkdownEditor value={content} onChange={setContent} />
        </div>
        <div className="md:w-1/2 h-1/2 md:h-full overflow-auto p-6 print-preview-area" ref={previewRef}>
          <MarkdownPreview content={content} />
        </div>
      </div>
    </div>
  );
}

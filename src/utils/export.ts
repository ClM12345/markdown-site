import { downloadFile } from './file';
import { DOCUMENT_CSS } from './exportStyles';

export function exportMarkdown(content: string, filename = 'document.md') {
  downloadFile(content, filename, 'text/markdown;charset=utf-8');
}

export function exportHTML(htmlContent: string, filename = 'document.html') {
  const full = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${filename.replace('.html', '')}</title>
<style>${DOCUMENT_CSS}</style>
</head>
<body>
${htmlContent}
</body>
</html>`;
  downloadFile(full, filename, 'text/html;charset=utf-8');
}

export function exportPDF(previewHTML: string) {
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>导出 PDF</title>
<style>${DOCUMENT_CSS}</style>
</head>
<body>${previewHTML}</body>
</html>`);
  win.document.close();
  setTimeout(() => { win.print(); win.close(); }, 300);
}

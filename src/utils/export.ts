import { downloadFile } from './file';

export function exportMarkdown(content: string, filename = 'document.md') {
  downloadFile(content, filename, 'text/markdown;charset=utf-8');
}

export function exportHTML(htmlContent: string, filename = 'document.html') {
  const full = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${filename}</title>
<style>
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; color: #24292e; line-height: 1.6; }
h1, h2 { border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
code { background: #f6f8fa; padding: 0.2em 0.4em; border-radius: 3px; font-size: 85%; }
pre { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 6px; overflow-x: auto; }
pre code { background: none; color: inherit; padding: 0; }
blockquote { border-left: 4px solid #dfe2e5; padding-left: 1em; color: #6a737d; }
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #dfe2e5; padding: 6px 13px; }
th { background: #f6f8fa; }
img { max-width: 100%; }
</style>
</head>
<body>
${htmlContent}
</body>
</html>`;
  downloadFile(full, filename, 'text/html;charset=utf-8');
}

export function exportPDF() {
  window.print();
}

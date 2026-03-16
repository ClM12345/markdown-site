export function readMarkdownFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown') && !file.name.endsWith('.txt')) {
      reject(new Error('请选择 .md 或 .txt 文件'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsText(file);
  });
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

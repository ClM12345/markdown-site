import { useCallback, useRef, useState } from 'react';
import { readMarkdownFile } from '../utils/file';

interface Props {
  onLoad: (content: string) => void;
}

export default function FileUpload({ onLoad }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    try {
      const text = await readMarkdownFile(file);
      onLoad(text);
    } catch (err) {
      alert(err instanceof Error ? err.message : '文件读取失败');
    }
  }, [onLoad]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".md,.markdown,.txt"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <p className="text-sm text-gray-500">
          点击选择或拖拽 .md 文件到此处
        </p>
      </div>
    </>
  );
}

import { useCallback, useRef, useState, useEffect } from 'react';
import { readMarkdownFile } from '../utils/file';
import { useI18n } from '../i18n/context';

type Status = 'idle' | 'hover' | 'loading' | 'success' | 'error';

interface Props {
  onLoad: (content: string) => void;
  hasContent?: boolean;
}

const STATUS_STYLE: Record<Status, { border: string; bg: string; text: string }> = {
  idle: { border: 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500', bg: '', text: 'text-gray-500 dark:text-gray-400' },
  hover: { border: 'border-blue-500 dark:border-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400' },
  loading: { border: 'border-gray-300 dark:border-gray-600', bg: 'bg-gray-50 dark:bg-gray-800', text: 'text-gray-500 dark:text-gray-400' },
  success: { border: 'border-green-500 dark:border-green-400', bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400' },
  error: { border: 'border-red-500 dark:border-red-400', bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400' },
};

export default function FileUpload({ onLoad, hasContent = false }: Props) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const dragCounter = useRef(0);

  const statusLabels: Record<Exclude<Status, 'error'>, string> = {
    idle: t.file.idle, hover: t.file.hover, loading: t.file.loading, success: t.file.success,
  };

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => setStatus('idle'), 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const processFile = useCallback(async (file: File) => {
    if (hasContent && !window.confirm(t.file.confirmReplace)) return;
    setStatus('loading');
    try {
      const text = await readMarkdownFile(file);
      if (!text.trim()) { setErrorMsg(t.file.emptyContent); setStatus('error'); return; }
      onLoad(text);
      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error');
      setStatus('error');
    }
  }, [onLoad, hasContent, t]);

  const handleDragEnter = useCallback((e: React.DragEvent) => { e.preventDefault(); dragCounter.current++; setStatus('hover'); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); dragCounter.current--; if (dragCounter.current <= 0) { dragCounter.current = 0; setStatus('idle'); } }, []);
  const handleDrop = useCallback((e: React.DragEvent) => { e.preventDefault(); dragCounter.current = 0; const file = e.dataTransfer.files[0]; file ? processFile(file) : setStatus('idle'); }, [processFile]);

  const cfg = STATUS_STYLE[status];
  return (
    <>
      <input ref={inputRef} type="file" accept=".md,.markdown,.txt" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) processFile(file); e.target.value = ''; }} />
      <div onDragEnter={handleDragEnter} onDragOver={(e) => e.preventDefault()} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => status === 'idle' && inputRef.current?.click()} className={`border-2 border-dashed rounded-lg px-4 py-3 text-center cursor-pointer transition-all duration-200 ${cfg.border} ${cfg.bg}`}>
        <p className={`text-xs ${cfg.text} transition-colors`}>{status === 'error' ? errorMsg : statusLabels[status as keyof typeof statusLabels]}</p>
      </div>
    </>
  );
}

import { forwardRef } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onScroll?: () => void;
}

export default forwardRef<HTMLTextAreaElement, Props>(function MarkdownEditor({ value, onChange, onScroll }, ref) {
  return (
    <textarea
      ref={ref}
      className="w-full h-full p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 dark:text-gray-100 border-0 resize-none focus:outline-none focus:ring-0 leading-relaxed placeholder-gray-400 dark:placeholder-gray-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onScroll={onScroll}
      placeholder="在此输入 Markdown 内容..."
      spellCheck={false}
    />
  );
});

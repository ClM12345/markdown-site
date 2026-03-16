interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: Props) {
  return (
    <textarea
      className="w-full h-full p-4 font-mono text-sm bg-gray-50 border-0 resize-none focus:outline-none focus:ring-0 leading-relaxed"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="在此输入 Markdown 内容..."
      spellCheck={false}
    />
  );
}

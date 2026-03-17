export interface InsertAction {
  type: 'wrap' | 'prefix' | 'block';
  before: string;
  after?: string;
  placeholder: string;
}

export interface ToolbarItem {
  label: string;
  title: string;
  action: InsertAction;
  className?: string;
  shortcut?: string;
}

export const TOOLBAR_ITEMS: ToolbarItem[] = [
  { label: 'H1', title: '一级标题', shortcut: 'Mod+Alt+1', action: { type: 'prefix', before: '# ', placeholder: '标题' } },
  { label: 'H2', title: '二级标题', shortcut: 'Mod+Alt+2', action: { type: 'prefix', before: '## ', placeholder: '标题' } },
  { label: 'B', title: '粗体', shortcut: 'Mod+B', action: { type: 'wrap', before: '**', after: '**', placeholder: '粗体文字' } },
  { label: 'I', title: '斜体', shortcut: 'Mod+I', action: { type: 'wrap', before: '*', after: '*', placeholder: '斜体文字' } },
  { label: '`', title: '行内代码', shortcut: 'Mod+E', action: { type: 'wrap', before: '`', after: '`', placeholder: 'code' } },
  { label: '```', title: '代码块', shortcut: 'Mod+Shift+K', action: { type: 'block', before: '```\n', after: '\n```', placeholder: '代码' } },
  { label: '•', title: '无序列表', shortcut: 'Mod+Shift+7', action: { type: 'prefix', before: '- ', placeholder: '列表项' } },
  { label: '1.', title: '有序列表', shortcut: 'Mod+Shift+8', action: { type: 'prefix', before: '1. ', placeholder: '列表项' } },
  { label: '>', title: '引用', action: { type: 'prefix', before: '> ', placeholder: '引用文字' } },
  { label: '☑', title: '任务列表', shortcut: 'Mod+Shift+9', className: 'text-base', action: { type: 'prefix', before: '- [ ] ', placeholder: '待办事项' } },
  { label: '🔗', title: '链接', shortcut: 'Mod+Shift+L', action: { type: 'wrap', before: '[', after: '](url)', placeholder: '链接文字' } },
  { label: '🖼', title: '图片', action: { type: 'wrap', before: '![', after: '](url)', placeholder: '图片描述' } },
  { label: '⊞', title: '表格', className: 'text-base', action: { type: 'block', before: '', after: '', placeholder: '| 列1 | 列2 | 列3 |\n|------|------|------|\n| 内容 | 内容 | 内容 |' } },
  { label: '—', title: '分割线', action: { type: 'block', before: '', after: '', placeholder: '\n---\n' } },
];

export interface InsertResult {
  value: string;
  selectionStart: number;
  selectionEnd: number;
}

export function applyAction(
  text: string,
  selStart: number,
  selEnd: number,
  action: InsertAction,
): InsertResult {
  const selected = text.slice(selStart, selEnd);
  const before = text.slice(0, selStart);
  const after = text.slice(selEnd);

  if (action.type === 'wrap') {
    const content = selected || action.placeholder;
    const inserted = action.before + content + (action.after || '');
    const newCursorStart = selStart + action.before.length;
    const newCursorEnd = newCursorStart + content.length;
    return {
      value: before + inserted + after,
      selectionStart: newCursorStart,
      selectionEnd: newCursorEnd,
    };
  }

  if (action.type === 'prefix') {
    const content = selected || action.placeholder;
    const needNewline = selStart > 0 && text[selStart - 1] !== '\n' ? '\n' : '';
    const inserted = needNewline + action.before + content;
    const newCursorStart = selStart + needNewline.length + action.before.length;
    const newCursorEnd = newCursorStart + content.length;
    return {
      value: before + inserted + after,
      selectionStart: newCursorStart,
      selectionEnd: newCursorEnd,
    };
  }

  const content = selected || action.placeholder;
  const needNewline = selStart > 0 && text[selStart - 1] !== '\n' ? '\n' : '';
  const inserted = needNewline + action.before + content + (action.after || '');
  const newCursorStart = selStart + needNewline.length + action.before.length;
  const newCursorEnd = newCursorStart + content.length;
  return {
    value: before + inserted + after,
    selectionStart: newCursorStart,
    selectionEnd: newCursorEnd,
  };
}

export interface ShortcutEntry {
  keys: string;
  desc: string;
}

export interface ShortcutGroup {
  title: string;
  items: ShortcutEntry[];
}

export const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    title: '文件与标签',
    items: [
      { keys: 'Mod+S', desc: '保存当前标签' },
      { keys: 'Mod+Shift+S', desc: '导出 .md 文件' },
      { keys: 'Mod+O', desc: '打开文件' },
      { keys: 'Mod+N', desc: '新建标签' },
      { keys: 'Mod+W', desc: '关闭当前标签' },
    ],
  },
  {
    title: '编辑操作',
    items: [
      { keys: 'Mod+Z', desc: '撤销' },
      { keys: 'Mod+Shift+Z', desc: '重做' },
      { keys: 'Mod+Y', desc: '重做 (Windows)' },
    ],
  },
  {
    title: '搜索与替换',
    items: [
      { keys: 'Mod+F', desc: '打开搜索' },
      { keys: 'Mod+H', desc: '打开替换' },
      { keys: 'Mod+G', desc: '下一个匹配' },
      { keys: 'Mod+Shift+G', desc: '上一个匹配' },
    ],
  },
  {
    title: 'Markdown 格式',
    items: [
      { keys: 'Mod+B', desc: '粗体' },
      { keys: 'Mod+I', desc: '斜体' },
      { keys: 'Mod+E', desc: '行内代码' },
      { keys: 'Mod+Shift+K', desc: '代码块' },
      { keys: 'Mod+Alt+1', desc: '一级标题' },
      { keys: 'Mod+Alt+2', desc: '二级标题' },
      { keys: 'Mod+Alt+3', desc: '三级标题' },
      { keys: 'Mod+Shift+7', desc: '无序列表' },
      { keys: 'Mod+Shift+8', desc: '有序列表' },
      { keys: 'Mod+Shift+9', desc: '任务列表' },
      { keys: 'Mod+Shift+L', desc: '插入链接' },
    ],
  },
];

import type { Messages } from '../i18n/zh-CN';

export interface ShortcutEntry { keys: string; desc: string; }
export interface ShortcutGroup { title: string; items: ShortcutEntry[]; }

export function getShortcutGroups(sd: Messages['shortcutDesc']): ShortcutGroup[] {
  return [
    {
      title: sd.groupFileTab,
      items: [
        { keys: 'Mod+S', desc: sd.save },
        { keys: 'Mod+Shift+S', desc: sd.exportMd },
        { keys: 'Mod+O', desc: sd.openFile },
        { keys: 'Mod+N', desc: sd.newTab },
        { keys: 'Mod+W', desc: sd.closeTab },
      ],
    },
    {
      title: sd.groupEdit,
      items: [
        { keys: 'Mod+Z', desc: sd.undo },
        { keys: 'Mod+Shift+Z', desc: sd.redo },
        { keys: 'Mod+Y', desc: sd.redoWin },
      ],
    },
    {
      title: sd.groupSearch,
      items: [
        { keys: 'Mod+F', desc: sd.openSearch },
        { keys: 'Mod+H', desc: sd.openReplace },
        { keys: 'Mod+G', desc: sd.nextMatch },
        { keys: 'Mod+Shift+G', desc: sd.prevMatch },
      ],
    },
    {
      title: sd.groupFormat,
      items: [
        { keys: 'Mod+B', desc: sd.bold },
        { keys: 'Mod+I', desc: sd.italic },
        { keys: 'Mod+E', desc: sd.inlineCode },
        { keys: 'Mod+Shift+K', desc: sd.codeBlock },
        { keys: 'Mod+Alt+1', desc: sd.h1 },
        { keys: 'Mod+Alt+2', desc: sd.h2 },
        { keys: 'Mod+Alt+3', desc: sd.h3 },
        { keys: 'Mod+Shift+7', desc: sd.ul },
        { keys: 'Mod+Shift+8', desc: sd.ol },
        { keys: 'Mod+Shift+9', desc: sd.taskList },
        { keys: 'Mod+Shift+L', desc: sd.insertLink },
      ],
    },
  ];
}

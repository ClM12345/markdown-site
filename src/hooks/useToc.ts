import { useMemo } from 'react';

export interface TocItem {
  level: number;
  text: string;
  index: number;
}

export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  const lines = markdown.split('\n');
  let inCodeBlock = false;
  let headingIndex = 0;

  for (const line of lines) {
    if (line.trimStart().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      items.push({
        level: match[1].length,
        text: match[2].trim(),
        index: headingIndex++,
      });
    }
  }
  return items;
}

export function useToc(markdown: string) {
  return useMemo(() => extractToc(markdown), [markdown]);
}

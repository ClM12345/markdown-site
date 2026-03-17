import { useCallback, useRef } from 'react';

export function useScrollSync(
  editorRef: React.RefObject<HTMLTextAreaElement | null>,
  previewRef: React.RefObject<HTMLDivElement | null>,
) {
  const syncing = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const handleEditorScroll = useCallback(() => {
    if (syncing.current) return;
    const ta = editorRef.current;
    const pv = previewRef.current;
    if (!ta || !pv) return;

    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const ratio = ta.scrollTop / (ta.scrollHeight - ta.clientHeight || 1);
      const targetTop = ratio * (pv.scrollHeight - pv.clientHeight);
      syncing.current = true;
      pv.scrollTop = targetTop;
      requestAnimationFrame(() => { syncing.current = false; });
    }, 16);
  }, [editorRef, previewRef]);

  const getActiveHeadingIndex = useCallback((): number => {
    const pv = previewRef.current;
    if (!pv) return -1;
    const headings = pv.querySelectorAll('h1, h2, h3');
    let activeIdx = -1;
    const offset = pv.scrollTop + 40;
    headings.forEach((h, i) => {
      if ((h as HTMLElement).offsetTop <= offset) activeIdx = i;
    });
    return activeIdx;
  }, [previewRef]);

  const scrollEditorToHeading = useCallback((headingIndex: number, content: string) => {
    const ta = editorRef.current;
    if (!ta) return;
    const lines = content.split('\n');
    let count = 0;
    let targetLine = 0;
    let inCode = false;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trimStart().startsWith('```')) { inCode = !inCode; continue; }
      if (inCode) continue;
      if (/^#{1,3}\s+/.test(lines[i])) {
        if (count === headingIndex) { targetLine = i; break; }
        count++;
      }
    }
    const lineHeight = ta.scrollHeight / lines.length;
    ta.scrollTop = Math.max(0, (targetLine - 2) * lineHeight);
  }, [editorRef]);

  return { handleEditorScroll, getActiveHeadingIndex, scrollEditorToHeading };
}

import { useState, useMemo, useCallback, useEffect } from 'react';

export interface SearchState {
  query: string;
  replace: string;
  caseSensitive: boolean;
  currentIndex: number;
}

export interface MatchInfo {
  total: number;
  current: number;
  indices: number[];
}

function findAllIndices(text: string, query: string, caseSensitive: boolean): number[] {
  if (!query) return [];
  const src = caseSensitive ? text : text.toLowerCase();
  const q = caseSensitive ? query : query.toLowerCase();
  const indices: number[] = [];
  let pos = 0;
  while (true) {
    const idx = src.indexOf(q, pos);
    if (idx === -1) break;
    indices.push(idx);
    pos = idx + 1;
  }
  return indices;
}

export function useSearch(content: string, activeTabId: string) {
  const [state, setState] = useState<SearchState>({
    query: '', replace: '', caseSensitive: false, currentIndex: 0,
  });

  useEffect(() => {
    setState((s) => ({ ...s, currentIndex: 0 }));
  }, [activeTabId]);

  const indices = useMemo(
    () => findAllIndices(content, state.query, state.caseSensitive),
    [content, state.query, state.caseSensitive]
  );

  const match: MatchInfo = {
    total: indices.length,
    current: indices.length > 0 ? Math.min(state.currentIndex, indices.length - 1) + 1 : 0,
    indices,
  };

  const safeIndex = indices.length > 0 ? Math.min(state.currentIndex, indices.length - 1) : -1;

  const setQuery = useCallback((q: string) => setState((s) => ({ ...s, query: q, currentIndex: 0 })), []);
  const setReplace = useCallback((r: string) => setState((s) => ({ ...s, replace: r })), []);
  const toggleCase = useCallback(() => setState((s) => ({ ...s, caseSensitive: !s.caseSensitive, currentIndex: 0 })), []);

  const goNext = useCallback(() => {
    setState((s) => ({ ...s, currentIndex: indices.length > 0 ? (s.currentIndex + 1) % indices.length : 0 }));
  }, [indices.length]);

  const goPrev = useCallback(() => {
    setState((s) => ({ ...s, currentIndex: indices.length > 0 ? (s.currentIndex - 1 + indices.length) % indices.length : 0 }));
  }, [indices.length]);

  const replaceCurrent = useCallback((): string | null => {
    if (safeIndex < 0 || !state.query) return null;
    const pos = indices[safeIndex];
    return content.slice(0, pos) + state.replace + content.slice(pos + state.query.length);
  }, [content, indices, safeIndex, state.query, state.replace]);

  const replaceAll = useCallback((): string | null => {
    if (indices.length === 0 || !state.query) return null;
    let result = '';
    let last = 0;
    for (const idx of indices) {
      result += content.slice(last, idx) + state.replace;
      last = idx + state.query.length;
    }
    result += content.slice(last);
    return result;
  }, [content, indices, state.query, state.replace]);

  const currentMatchPos = safeIndex >= 0 ? indices[safeIndex] : -1;

  return {
    ...state, match, setQuery, setReplace, toggleCase,
    goNext, goPrev, replaceCurrent, replaceAll, currentMatchPos,
  };
}

import type { MatchInfo } from '../hooks/useSearch';
import { useI18n } from '../i18n/context';

interface Props {
  query: string;
  replace: string;
  caseSensitive: boolean;
  match: MatchInfo;
  onQueryChange: (q: string) => void;
  onReplaceChange: (r: string) => void;
  onToggleCase: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReplace: () => void;
  onReplaceAll: () => void;
  onClose: () => void;
}

const IBTN = "p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors disabled:opacity-30";

export default function SearchReplaceBar(props: Props) {
  const { t } = useI18n();
  return (
    <div className="flex flex-wrap items-center gap-2 px-3 py-1.5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 no-print">
      <div className="flex items-center gap-1 flex-1 min-w-[200px]">
        <input type="text" value={props.query} onChange={(e) => props.onQueryChange(e.target.value)} placeholder={t.searchBar.search} className="flex-1 px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-400 min-w-0" />
        <button onClick={props.onToggleCase} title={t.searchBar.caseSensitive} className={`px-1.5 py-1 text-xs rounded font-mono transition-colors ${props.caseSensitive ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Aa</button>
        <span className="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap w-12 text-center">{props.match.total > 0 ? `${props.match.current}/${props.match.total}` : t.searchBar.noMatch}</span>
        <button onClick={props.onPrev} disabled={props.match.total === 0} className={IBTN} title={t.searchBar.prev}><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></button>
        <button onClick={props.onNext} disabled={props.match.total === 0} className={IBTN} title={t.searchBar.next}><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
      </div>
      <div className="flex items-center gap-1 flex-1 min-w-[200px]">
        <input type="text" value={props.replace} onChange={(e) => props.onReplaceChange(e.target.value)} placeholder={t.searchBar.replace} className="flex-1 px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-400 min-w-0" />
        <button onClick={props.onReplace} disabled={props.match.total === 0} className={IBTN} title={t.searchBar.replaceCurrent}><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h7l5 5v11H4V4z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 4l5 5h-5V4z" /></svg></button>
        <button onClick={props.onReplaceAll} disabled={props.match.total === 0} className={IBTN} title={t.searchBar.replaceAll}><svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h7l5 5v11H4V4zM15 4l5 5h-5V4zM4 12h12" /></svg></button>
      </div>
      <button onClick={props.onClose} className={IBTN} title={t.searchBar.close}><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
    </div>
  );
}

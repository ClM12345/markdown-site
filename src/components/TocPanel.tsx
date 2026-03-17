import type { TocItem } from '../hooks/useToc';

interface Props {
  items: TocItem[];
  activeIndex?: number;
  onClickItem: (index: number) => void;
}

const LEVEL_STYLE: Record<number, { indent: string; font: string }> = {
  1: { indent: 'pl-3', font: 'text-[13px] font-semibold' },
  2: { indent: 'pl-6', font: 'text-[12px] font-medium' },
  3: { indent: 'pl-9', font: 'text-[11px] font-normal' },
};

export default function TocPanel({ items, activeIndex = -1, onClickItem }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="w-52 shrink-0 border-l border-gray-200 dark:border-gray-700 overflow-auto hidden lg:block no-print bg-gray-50/50 dark:bg-gray-900/50">
      <div className="px-4 py-2.5 text-xs font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase border-b border-gray-100 dark:border-gray-800">
        目录
      </div>
      <nav className="py-2 space-y-0.5">
        {items.map((item) => {
          const style = LEVEL_STYLE[item.level] || LEVEL_STYLE[3];
          const active = item.index === activeIndex;
          return (
            <button
              key={item.index}
              onClick={() => onClickItem(item.index)}
              className={`block w-full text-left pr-3 py-1.5 rounded-r-md truncate transition-colors leading-snug ${style.indent} ${style.font} ${
                active
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-l-2 border-blue-500'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              {item.text}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

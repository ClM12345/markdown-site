interface Action {
  label: string;
  onClick: () => void;
  primary?: boolean;
}

interface Props {
  icon?: string;
  title: string;
  desc?: string;
  actions?: Action[];
  compact?: boolean;
}

export default function EmptyState({ icon, title, desc, actions, compact }: Props) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? 'py-4 px-3' : 'py-10 px-6'}`}>
      {icon && <div className={compact ? 'text-xl mb-1' : 'text-3xl mb-3'}>{icon}</div>}
      <h3 className={`font-medium text-gray-400 dark:text-gray-500 ${compact ? 'text-xs' : 'text-sm'}`}>{title}</h3>
      {desc && <p className={`text-gray-400 dark:text-gray-600 mt-1 max-w-xs ${compact ? 'text-[10px]' : 'text-xs'}`}>{desc}</p>}
      {actions && actions.length > 0 && (
        <div className={`flex flex-wrap justify-center gap-2 ${compact ? 'mt-2' : 'mt-4'}`}>
          {actions.map(a => (
            <button
              key={a.label}
              onClick={a.onClick}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                a.primary
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

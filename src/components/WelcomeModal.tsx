import { useI18n } from '../i18n/context';

interface Props {
  open: boolean;
  onStartTour: () => void;
  onSkip: () => void;
  onExample: () => void;
  onTemplate: () => void;
  onImport: () => void;
}

export default function WelcomeModal(props: Props) {
  const { t } = useI18n();
  if (!props.open) return null;

  const actions = [
    { label: t.welcome.fromExample, action: props.onExample, style: 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200' },
    { label: t.welcome.openTemplate, action: props.onTemplate, style: 'bg-blue-600 text-white hover:bg-blue-700' },
    { label: t.welcome.importFile, action: props.onImport, style: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700' },
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" onClick={props.onSkip}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="px-6 pt-8 pb-2 text-center">
          <div className="text-4xl mb-3">✨</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t.welcome.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.welcome.subtitle}</p>
        </div>
        <div className="px-6 py-5 space-y-2.5">
          {actions.map(a => (
            <button key={a.label} onClick={a.action} className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${a.style}`}>{a.label}</button>
          ))}
        </div>
        <div className="px-6 pb-6 flex gap-3">
          <button onClick={props.onStartTour} className="flex-1 py-2 rounded-lg text-sm font-medium border border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">{t.welcome.startTour}</button>
          <button onClick={props.onSkip} className="flex-1 py-2 rounded-lg text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">{t.welcome.skip}</button>
        </div>
      </div>
    </div>
  );
}

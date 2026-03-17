import { useEffect, useState, useCallback, useMemo } from 'react';
import { getTourSteps } from '../data/onboardingSteps';
import { useI18n } from '../i18n/context';

interface Props {
  open: boolean;
  onFinish: () => void;
}

interface Rect { top: number; left: number; width: number; height: number; }

function getRect(selector: string): Rect | null {
  const el = document.querySelector(selector);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

export default function OnboardingTour({ open, onFinish }: Props) {
  const { t } = useI18n();
  const steps = useMemo(() => getTourSteps(t.tour), [t.tour]);
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);

  const updateRect = useCallback(() => {
    if (!open) return;
    setRect(getRect(steps[step].target));
  }, [open, step, steps]);

  useEffect(() => {
    if (!open) { setStep(0); return; }
    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, [open, updateRect]);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onFinish();
      if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); step < steps.length - 1 ? setStep(s => s + 1) : onFinish(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); setStep(s => Math.max(0, s - 1)); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, step, onFinish, steps.length]);

  if (!open) return null;

  const current = steps[step];
  const pad = 6;

  const tipStyle = (): React.CSSProperties => {
    if (!rect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    const pos = current.position || 'bottom';
    const base: React.CSSProperties = { position: 'fixed' };
    if (pos === 'bottom') { base.top = rect.top + rect.height + pad + 8; base.left = Math.max(12, Math.min(rect.left, window.innerWidth - 320)); }
    else if (pos === 'top') { base.bottom = window.innerHeight - rect.top + pad + 8; base.left = Math.max(12, Math.min(rect.left, window.innerWidth - 320)); }
    else if (pos === 'right') { base.top = rect.top; base.left = rect.left + rect.width + pad + 8; }
    else { base.top = rect.top; base.right = window.innerWidth - rect.left + pad + 8; }
    return base;
  };

  return (
    <div className="fixed inset-0 z-[130]">
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <defs><mask id="tour-mask"><rect x="0" y="0" width="100%" height="100%" fill="white" />{rect && <rect x={rect.left - pad} y={rect.top - pad} width={rect.width + pad * 2} height={rect.height + pad * 2} rx="8" fill="black" />}</mask></defs>
        <rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0.45)" mask="url(#tour-mask)" />
      </svg>
      {rect && <div className="fixed border-2 border-blue-500 rounded-lg pointer-events-none" style={{ top: rect.top - pad, left: rect.left - pad, width: rect.width + pad * 2, height: rect.height + pad * 2, boxShadow: '0 0 0 4px rgba(59,130,246,0.2)' }} />}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-72 p-4 border border-gray-200 dark:border-gray-700" style={tipStyle()}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-400 dark:text-gray-500">{step + 1} / {steps.length}</span>
          <button onClick={onFinish} className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">{t.tour.skip}</button>
        </div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{current.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">{current.desc}</p>
        <div className="flex gap-2">
          {step > 0 && <button onClick={() => setStep(s => s - 1)} className="flex-1 py-1.5 rounded-md text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">{t.tour.prev}</button>}
          <button onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : onFinish()} className="flex-1 py-1.5 rounded-md text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">{step < steps.length - 1 ? t.tour.next : t.tour.finish}</button>
        </div>
      </div>
    </div>
  );
}

import { shortcutLabel } from '../hooks/useEditorShortcuts';
import type { Messages } from '../i18n/zh-CN';

export interface TourStep {
  target: string;
  title: string;
  desc: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const TARGETS: { target: string; position: TourStep['position'] }[] = [
  { target: '[data-tour="toolbar"]', position: 'bottom' },
  { target: '[data-tour="editor"]', position: 'right' },
  { target: '[data-tour="preview"]', position: 'left' },
  { target: '[data-tour="action-bar"]', position: 'bottom' },
  { target: '[data-tour="shortcut-btn"]', position: 'bottom' },
];

export function getTourSteps(tourT: Messages['tour']): TourStep[] {
  return TARGETS.map((t, i) => ({
    ...t,
    title: tourT.steps[i].title,
    desc: tourT.steps[i].desc.replace('{key}', shortcutLabel('Mod+K')),
  }));
}

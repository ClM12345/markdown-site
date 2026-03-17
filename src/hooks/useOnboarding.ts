import { useState, useCallback } from 'react';

const KEY = 'md-onboarding-done';

function isDone(): boolean {
  try { return localStorage.getItem(KEY) === '1'; } catch { return false; }
}

function markDone() {
  try { localStorage.setItem(KEY, '1'); } catch { /* */ }
}

export function useOnboarding() {
  const [showWelcome, setShowWelcome] = useState(!isDone());
  const [showTour, setShowTour] = useState(false);

  const startTour = useCallback(() => {
    setShowWelcome(false);
    setShowTour(true);
  }, []);

  const finishWelcome = useCallback(() => {
    setShowWelcome(false);
    markDone();
  }, []);

  const finishTour = useCallback(() => {
    setShowTour(false);
    markDone();
  }, []);

  const restart = useCallback(() => {
    setShowWelcome(true);
  }, []);

  return { showWelcome, showTour, startTour, finishWelcome, finishTour, restart };
}

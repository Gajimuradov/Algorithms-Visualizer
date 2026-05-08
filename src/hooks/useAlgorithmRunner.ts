import { useEffect, useMemo, useState } from 'react';
import type { AlgorithmStep } from '../algorithms/types';

interface AlgorithmRunner<TState> {
  currentStep: AlgorithmStep<TState>;
  currentIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  canStep: boolean;
  start: () => void;
  pause: () => void;
  step: () => void;
  reset: () => void;
}

export function useAlgorithmRunner<TState>(
  steps: AlgorithmStep<TState>[],
  delayMs = 900
): AlgorithmRunner<TState> {
  const safeSteps = useMemo(() => steps, [steps]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const lastIndex = Math.max(0, safeSteps.length - 1);

  useEffect(() => {
    setCurrentIndex(0);
    setIsPlaying(false);
  }, [safeSteps]);

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }

    if (currentIndex >= lastIndex) {
      setIsPlaying(false);
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setCurrentIndex((index) => Math.min(index + 1, lastIndex));
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [currentIndex, delayMs, isPlaying, lastIndex]);

  return {
    currentStep: safeSteps[currentIndex],
    currentIndex,
    totalSteps: safeSteps.length,
    isPlaying,
    canStep: currentIndex < lastIndex,
    start: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    step: () => {
      setIsPlaying(false);
      setCurrentIndex((index) => Math.min(index + 1, lastIndex));
    },
    reset: () => {
      setIsPlaying(false);
      setCurrentIndex(0);
    }
  };
}


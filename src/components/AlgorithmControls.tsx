import styles from './AlgorithmControls.module.css';

interface AlgorithmControlsProps {
  isPlaying: boolean;
  canStep: boolean;
  onStart: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
}

export function AlgorithmControls({
  isPlaying,
  canStep,
  onStart,
  onPause,
  onStep,
  onReset
}: AlgorithmControlsProps) {
  return (
    <div className={styles.controls} aria-label="Algorithm controls">
      <button className={styles.primaryButton} disabled={isPlaying || !canStep} onClick={onStart} type="button">
        Start
      </button>
      <button disabled={!isPlaying} onClick={onPause} type="button">
        Pause
      </button>
      <button disabled={!canStep} onClick={onStep} type="button">
        Step
      </button>
      <button onClick={onReset} type="button">
        Reset
      </button>
    </div>
  );
}


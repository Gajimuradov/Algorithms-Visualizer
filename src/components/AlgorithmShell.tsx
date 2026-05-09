import type { ReactNode } from 'react';
import type { AlgorithmInfo } from '../data/algorithms';
import { ComplexityBadges } from './ComplexityBadges';
import styles from './AlgorithmShell.module.css';

interface AlgorithmShellProps {
  algorithm: AlgorithmInfo;
  stepIndex: number;
  totalSteps: number;
  explanation: string;
  controls: ReactNode;
  inputs: ReactNode;
  visualization: ReactNode;
}

export function AlgorithmShell({
  algorithm,
  controls,
  explanation,
  inputs,
  stepIndex,
  totalSteps,
  visualization
}: AlgorithmShellProps) {
  const progress = totalSteps <= 1 ? 100 : (stepIndex / (totalSteps - 1)) * 100;

  return (
    <section className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <p className={styles.eyebrow}>Algorithms Visualizer</p>
          <h1>{algorithm.title}</h1>
          <p className={styles.subtitle}>{algorithm.subtitle}</p>
        </div>
        <ComplexityBadges complexity={algorithm.complexity} />
      </header>

      <div className={styles.description}>
        <div>
          <span>Идея алгоритма</span>
          <p>{algorithm.description}</p>
        </div>
        <div className={styles.topicList}>
          {algorithm.topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      </div>

      <div className={styles.workspace}>
        <aside className={styles.panel}>
          <h2>Входные данные</h2>
          {inputs}
          <div className={styles.controlsBlock}>
            <h2>Управление</h2>
            {controls}
          </div>
        </aside>

        <section className={styles.visualPanel}>
          <div className={styles.visualHeader}>
            <div>
              <h2>Визуализация шага</h2>
              <p>Следите за активными указателями, очередью, стеком или visited-состояниями.</p>
            </div>
            <span>Step {Math.min(stepIndex + 1, totalSteps)} / {totalSteps}</span>
          </div>
          <div
            className={styles.progressTrack}
            aria-label="Algorithm progress"
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={Math.round(progress)}
            role="progressbar"
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          {visualization}
          <div className={styles.explanation}>
            <strong>Текущий шаг</strong>
            <p>{explanation}</p>
          </div>
        </section>
      </div>
    </section>
  );
}

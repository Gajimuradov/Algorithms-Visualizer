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
  return (
    <section className={styles.shell}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Algorithms Visualizer</p>
          <h1>{algorithm.title}</h1>
          <p className={styles.subtitle}>{algorithm.subtitle}</p>
        </div>
        <ComplexityBadges complexity={algorithm.complexity} />
      </header>

      <div className={styles.description}>
        <p>{algorithm.description}</p>
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
            <h2>Визуализация</h2>
            <span>
              Step {Math.min(stepIndex + 1, totalSteps)} / {totalSteps}
            </span>
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


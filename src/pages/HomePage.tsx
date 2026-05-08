import { algorithms, type AlgorithmId } from '../data/algorithms';
import { ComplexityBadges } from '../components/ComplexityBadges';
import styles from './HomePage.module.css';

interface HomePageProps {
  onSelect: (id: AlgorithmId) => void;
}

export function HomePage({ onSelect }: HomePageProps) {
  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>React + TypeScript + SVG</p>
          <h1>Algorithms Visualizer</h1>
          <p>
            Pet-проект для подготовки к стажировкам: базовые алгоритмы, пошаговые состояния,
            Big-O и визуальная отладка каждого шага.
          </p>
        </div>
      </header>

      <div className={styles.grid}>
        {algorithms.map((algorithm) => (
          <article className={styles.card} key={algorithm.id}>
            <div>
              <h2>{algorithm.title}</h2>
              <p>{algorithm.subtitle}</p>
            </div>
            <ComplexityBadges complexity={algorithm.complexity} />
            <div className={styles.tags}>
              {algorithm.topics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
            <button onClick={() => onSelect(algorithm.id)} type="button">
              Открыть
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}


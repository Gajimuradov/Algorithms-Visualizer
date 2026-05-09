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
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>React + TypeScript + SVG visualizations</p>
          <h1>Algorithms Visualizer</h1>
          <p className={styles.lead}>
            Тренажер для подготовки к стажировкам: входные данные, Big-O, пошаговый запуск,
            активные элементы и короткое объяснение каждого состояния.
          </p>
          <dl className={styles.metrics} aria-label="Project highlights">
            <div>
              <dt>{algorithms.length}</dt>
              <dd>алгоритмов</dd>
            </div>
            <div>
              <dt>19</dt>
              <dd>unit tests</dd>
            </div>
            <div>
              <dt>SVG</dt>
              <dd>визуализация</dd>
            </div>
          </dl>
        </div>

        <div className={styles.heroPreview} aria-hidden="true">
          <div className={styles.previewHeader}>
            <span>step 04 / 12</span>
            <strong>Binary Search</strong>
          </div>
          <svg className={styles.previewSvg} viewBox="0 0 520 260">
            <rect x="24" y="34" width="472" height="48" rx="8" fill="#eef4ff" />
            {[2, 5, 8, 12, 16, 23].map((value, index) => (
              <g key={value}>
                <rect
                  x={42 + index * 74}
                  y="46"
                  width="54"
                  height="54"
                  rx="8"
                  fill={index === 3 ? '#f59e0b' : index > 0 && index < 5 ? '#dbeafe' : '#e5e7eb'}
                  stroke={index === 3 ? '#d97706' : '#94a3b8'}
                  strokeWidth="2"
                />
                <text x={69 + index * 74} y="79" textAnchor="middle" fill="#172033" fontWeight="800">
                  {value}
                </text>
              </g>
            ))}
            <text x="70" y="128" textAnchor="middle" fill="#1f5eff" fontWeight="800">
              left
            </text>
            <text x="292" y="128" textAnchor="middle" fill="#d97706" fontWeight="800">
              mid
            </text>
            <text x="366" y="128" textAnchor="middle" fill="#7c3aed" fontWeight="800">
              right
            </text>
            <rect x="48" y="170" width="96" height="48" rx="8" fill="#dcfce7" stroke="#86efac" />
            <rect x="166" y="170" width="96" height="48" rx="8" fill="#eff6ff" stroke="#bfdbfe" />
            <rect x="284" y="170" width="96" height="48" rx="8" fill="#fff7ed" stroke="#fed7aa" />
            <text x="96" y="199" textAnchor="middle" fill="#166534" fontWeight="800">
              visited
            </text>
            <text x="214" y="199" textAnchor="middle" fill="#1d4ed8" fontWeight="800">
              range
            </text>
            <text x="332" y="199" textAnchor="middle" fill="#9a3412" fontWeight="800">
              compare
            </text>
          </svg>
        </div>
      </header>

      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.eyebrow}>Algorithm catalog</p>
          <h2>Выберите сценарий для разбора</h2>
        </div>
        <p>Все экраны работают по одной модели шагов, поэтому можно сравнить массивы, структуры данных и графы в одинаковом интерфейсе.</p>
      </div>

      <div className={styles.grid}>
        {algorithms.map((algorithm, index) => (
          <article className={styles.card} key={algorithm.id}>
            <div className={styles.cardTop}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{algorithm.title}</h2>
            </div>
            <div>
              <p>{algorithm.subtitle}</p>
            </div>
            <ComplexityBadges complexity={algorithm.complexity} />
            <div className={styles.tags}>
              {algorithm.topics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
            <button onClick={() => onSelect(algorithm.id)} type="button">
              Разобрать шаги
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

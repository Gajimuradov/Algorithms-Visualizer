import type { SelectionSortState } from '../../algorithms/selectionSort';
import styles from './Visualizations.module.css';

interface SortVisualProps {
  state: SelectionSortState;
}

const BAR_WIDTH = 52;
const GAP = 16;
const START_X = 42;
const BASE_Y = 260;
const MAX_BAR_HEIGHT = 180;

export function SortVisual({ state }: SortVisualProps) {
  const maxValue = Math.max(...state.array, 1);
  const width = START_X * 2 + state.array.length * BAR_WIDTH + (state.array.length - 1) * GAP;
  const height = 320;

  return (
    <div>
      <div className={styles.scrollArea}>
        <svg className={styles.svg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Selection sort visualization">
          {state.array.map((value, index) => {
            const barHeight = Math.max(20, (value / maxValue) * MAX_BAR_HEIGHT);
            const x = START_X + index * (BAR_WIDTH + GAP);
            const y = BASE_Y - barHeight;
            const isSorted = state.sortedIndices.includes(index);
            const isCurrent = state.currentIndex === index;
            const isComparing = state.comparingIndex === index;
            const isMin = state.minIndex === index;
            const isSwapped = state.swappedIndices?.includes(index) ?? false;
            const fill = isSwapped
              ? '#dc2626'
              : isSorted
                ? '#22c55e'
                : isMin
                  ? '#f59e0b'
                  : isComparing
                    ? '#2563eb'
                    : isCurrent
                      ? '#7c3aed'
                      : '#cbd5e1';

            return (
              <g key={`${value}-${index}`}>
                <rect x={x} y={y} width={BAR_WIDTH} height={barHeight} rx="8" fill={fill} />
                <text className={styles.label} x={x + BAR_WIDTH / 2} y={y - 14}>
                  {value}
                </text>
                <text className={styles.smallLabel} x={x + BAR_WIDTH / 2} y={BASE_Y + 24}>
                  {index}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <Legend
        items={[
          ['current', '#7c3aed'],
          ['compare', '#2563eb'],
          ['min', '#f59e0b'],
          ['swap', '#dc2626'],
          ['sorted', '#22c55e']
        ]}
      />
    </div>
  );
}

function Legend({ items }: { items: Array<[string, string]> }) {
  return (
    <div className={styles.legend}>
      {items.map(([label, color]) => (
        <span className={styles.legendItem} key={label}>
          <span className={styles.legendColor} style={{ background: color }} />
          {label}
        </span>
      ))}
    </div>
  );
}


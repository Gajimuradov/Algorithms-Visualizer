import type { StackState } from '../../algorithms/stack';
import styles from './Visualizations.module.css';

interface StackVisualProps {
  state: StackState;
}

const BOX_WIDTH = 88;
const BOX_HEIGHT = 44;
const GAP = 12;
const START_X = 40;
const START_Y = 92;

export function StackVisual({ state }: StackVisualProps) {
  if (state.items.length === 0) {
    return <div className={styles.emptyState}>Stack is empty</div>;
  }

  const width = START_X * 2 + state.items.length * BOX_WIDTH + (state.items.length - 1) * GAP;
  const height = 220;

  return (
    <div className={styles.scrollArea}>
      <svg className={styles.svg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Stack visualization">
        <text x={START_X} y={34} textAnchor="start" fill="#172033" fontWeight="800">
          last operation: {state.lastOperation}
          {state.removedValue !== null ? `, removed ${state.removedValue}` : ''}
        </text>
        {state.items.map((value, index) => {
          const x = START_X + index * (BOX_WIDTH + GAP);
          const isTop = index === state.items.length - 1;
          const isActive = index === state.activeIndex;

          return (
            <g key={`${value}-${index}`}>
              <rect x={x} y={START_Y} width={BOX_WIDTH} height={BOX_HEIGHT} rx="8" fill={isActive ? '#dbeafe' : '#f8fafc'} stroke={isTop ? '#2563eb' : '#cbd5e1'} strokeWidth={isTop ? 3 : 2} />
              <text className={styles.label} x={x + BOX_WIDTH / 2} y={START_Y + BOX_HEIGHT / 2}>
                {value}
              </text>
              {isTop && <text className={styles.smallLabel} x={x + BOX_WIDTH / 2} y={START_Y - 16}>top</text>}
            </g>
          );
        })}
      </svg>
    </div>
  );
}


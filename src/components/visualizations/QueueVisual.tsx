import type { QueueState } from '../../algorithms/queue';
import styles from './Visualizations.module.css';

interface QueueVisualProps {
  state: QueueState;
}

const BOX_WIDTH = 88;
const BOX_HEIGHT = 44;
const GAP = 12;
const START_X = 40;
const START_Y = 92;

export function QueueVisual({ state }: QueueVisualProps) {
  if (state.items.length === 0) {
    return <div className={styles.emptyState}>Queue is empty</div>;
  }

  const width = START_X * 2 + state.items.length * BOX_WIDTH + (state.items.length - 1) * GAP;
  const height = 220;

  return (
    <div className={styles.scrollArea}>
      <svg className={styles.svg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Queue visualization">
        <text x={START_X} y={34} textAnchor="start" fill="#172033" fontWeight="800">
          last operation: {state.lastOperation}
          {state.removedValue !== null ? `, removed ${state.removedValue}` : ''}
        </text>
        {state.items.map((value, index) => {
          const x = START_X + index * (BOX_WIDTH + GAP);
          const isActive = index === state.activeIndex;
          const isFront = index === state.frontIndex;
          const isRear = index === state.rearIndex;

          return (
            <g key={`${value}-${index}`}>
              <rect x={x} y={START_Y} width={BOX_WIDTH} height={BOX_HEIGHT} rx="8" fill={isActive ? '#d1fae5' : '#f8fafc'} stroke={isFront || isRear ? '#0f766e' : '#cbd5e1'} strokeWidth={isFront || isRear ? 3 : 2} />
              <text className={styles.label} x={x + BOX_WIDTH / 2} y={START_Y + BOX_HEIGHT / 2}>
                {value}
              </text>
              {isFront && <text className={styles.smallLabel} x={x + BOX_WIDTH / 2} y={START_Y - 16}>front</text>}
              {isRear && <text className={styles.smallLabel} x={x + BOX_WIDTH / 2} y={START_Y + BOX_HEIGHT + 24}>rear</text>}
            </g>
          );
        })}
      </svg>
    </div>
  );
}


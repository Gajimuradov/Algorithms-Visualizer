import type { BinarySearchState } from '../../algorithms/binarySearch';
import styles from './Visualizations.module.css';

interface BinarySearchVisualProps {
  state: BinarySearchState;
}

const CELL_WIDTH = 72;
const CELL_HEIGHT = 56;
const GAP = 12;
const START_X = 36;
const START_Y = 76;

export function BinarySearchVisual({ state }: BinarySearchVisualProps) {
  const width = START_X * 2 + state.array.length * CELL_WIDTH + (state.array.length - 1) * GAP;
  const height = 220;

  return (
    <div>
      <div className={styles.scrollArea}>
        <svg className={styles.svg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Binary search visualization">
          <text x={START_X} y={30} textAnchor="start" fill="#172033" fontWeight="800">
            target = {state.target}
          </text>
          {state.array.map((value, index) => {
            const x = START_X + index * (CELL_WIDTH + GAP);
            const isMid = state.mid === index;
            const isFound = state.foundIndex === index;
            const isInRange = index >= state.left && index <= state.right;
            const fill = isFound ? '#22c55e' : isMid ? '#f59e0b' : isInRange ? '#dbeafe' : '#e5e7eb';
            const stroke = isFound ? '#15803d' : isMid ? '#d97706' : isInRange ? '#2563eb' : '#cbd5e1';

            return (
              <g key={`${value}-${index}`}>
                <rect x={x} y={START_Y} width={CELL_WIDTH} height={CELL_HEIGHT} rx="8" fill={fill} stroke={stroke} strokeWidth="2" />
                <text className={styles.label} x={x + CELL_WIDTH / 2} y={START_Y + CELL_HEIGHT / 2}>
                  {value}
                </text>
                <text className={styles.smallLabel} x={x + CELL_WIDTH / 2} y={START_Y + CELL_HEIGHT + 24}>
                  {index}
                </text>
                {state.left === index && <Pointer x={x + CELL_WIDTH / 2} y={START_Y - 20} color="#2563eb" label="left" />}
                {state.mid === index && <Pointer x={x + CELL_WIDTH / 2} y={START_Y + CELL_HEIGHT + 54} color="#d97706" label="mid" up />}
                {state.right === index && <Pointer x={x + CELL_WIDTH / 2} y={START_Y - 48} color="#7c3aed" label="right" />}
              </g>
            );
          })}
        </svg>
      </div>
      <Legend
        items={[
          ['active range', '#dbeafe'],
          ['mid', '#f59e0b'],
          ['found', '#22c55e'],
          ['discarded', '#e5e7eb']
        ]}
      />
    </div>
  );
}

function Pointer({ color, label, up = false, x, y }: { color: string; label: string; up?: boolean; x: number; y: number }) {
  return (
    <g>
      <rect x={x - 24} y={y - 12} width="48" height="24" rx="7" fill={color} />
      <text className={styles.pointerLabel} x={x} y={y + 1}>
        {label}
      </text>
      <path d={up ? `M ${x} ${y - 18} l -6 -8 h 12 z` : `M ${x} ${y + 18} l -6 8 h 12 z`} fill={color} />
    </g>
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


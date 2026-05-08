import type { GraphTraversalState } from '../../algorithms/graph';
import { defaultGraphPositions } from '../../algorithms/graph';
import styles from './Visualizations.module.css';

interface GraphVisualProps {
  state: GraphTraversalState;
  frontierLabel: 'queue' | 'stack';
}

export function GraphVisual({ frontierLabel, state }: GraphVisualProps) {
  const nodes = Object.keys(state.graph);
  const edges = nodes.flatMap((node) => state.graph[node].map((neighbor) => [node, neighbor] as [string, string]));

  return (
    <div>
      <div className={styles.scrollArea}>
        <svg className={styles.svg} viewBox="0 0 480 360" role="img" aria-label="Graph traversal visualization">
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
            </marker>
            <marker id="arrow-active" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#d97706" />
            </marker>
          </defs>
          {edges.map(([from, to]) => {
            const fromPosition = defaultGraphPositions[from];
            const toPosition = defaultGraphPositions[to];
            const isActive = state.activeEdge?.[0] === from && state.activeEdge?.[1] === to;

            return (
              <line
                key={`${from}-${to}`}
                x1={fromPosition.x}
                y1={fromPosition.y}
                x2={toPosition.x}
                y2={toPosition.y}
                stroke={isActive ? '#d97706' : '#94a3b8'}
                strokeWidth={isActive ? 4 : 2}
                markerEnd={isActive ? 'url(#arrow-active)' : 'url(#arrow)'}
              />
            );
          })}
          {nodes.map((node) => {
            const position = defaultGraphPositions[node];
            const isVisited = state.visited.includes(node);
            const isFrontier = state.frontier.includes(node);
            const isActive = state.activeNode === node;
            const fill = isActive ? '#f59e0b' : isVisited ? '#22c55e' : isFrontier ? '#dbeafe' : '#ffffff';
            const stroke = isActive ? '#d97706' : isVisited ? '#15803d' : isFrontier ? '#2563eb' : '#64748b';

            return (
              <g key={node}>
                <circle cx={position.x} cy={position.y} r="28" fill={fill} stroke={stroke} strokeWidth="3" />
                <text className={styles.label} x={position.x} y={position.y}>
                  {node}
                </text>
              </g>
            );
          })}
          <text x="28" y="326" fill="#172033" fontWeight="800">
            {frontierLabel}: {state.frontier.length > 0 ? state.frontier.join(', ') : 'empty'}
          </text>
        </svg>
      </div>
      <Legend
        items={[
          ['active', '#f59e0b'],
          ['visited', '#22c55e'],
          [frontierLabel, '#dbeafe']
        ]}
      />
      <div className={styles.sequence} aria-label="Traversal order">
        {state.order.map((node) => (
          <span key={`${node}-${state.order.indexOf(node)}`}>{node}</span>
        ))}
      </div>
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


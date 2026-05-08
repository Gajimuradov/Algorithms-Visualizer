import type { Complexity } from '../algorithms/types';
import styles from './ComplexityBadges.module.css';

interface ComplexityBadgesProps {
  complexity: Complexity;
}

export function ComplexityBadges({ complexity }: ComplexityBadgesProps) {
  return (
    <dl className={styles.badges} aria-label="Complexity">
      <div>
        <dt>Time</dt>
        <dd>{complexity.time}</dd>
      </div>
      <div>
        <dt>Space</dt>
        <dd>{complexity.space}</dd>
      </div>
    </dl>
  );
}


import { describe, expect, it } from 'vitest';
import { bfsSteps, defaultGraph, dfsSteps } from './graph';

describe('graph traversal steps', () => {
  it('produces BFS traversal order by layers', () => {
    const steps = [...bfsSteps(defaultGraph, 'A')];
    const lastStep = steps[steps.length - 1];

    expect(lastStep.state.order).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
  });

  it('produces DFS traversal order with stack depth first behavior', () => {
    const steps = [...dfsSteps(defaultGraph, 'A')];
    const lastStep = steps[steps.length - 1];

    expect(lastStep.state.order).toEqual(['A', 'B', 'D', 'E', 'C', 'F']);
  });
});


import { describe, expect, it } from 'vitest';
import { binarySearchSteps } from './binarySearch';

describe('binarySearchSteps', () => {
  it('finds an existing target', () => {
    const steps = [...binarySearchSteps([2, 4, 8, 15, 16, 23, 42], 15)];
    const lastStep = steps[steps.length - 1];

    expect(lastStep.done).toBe(true);
    expect(lastStep.state.status).toBe('found');
    expect(lastStep.state.foundIndex).toBe(3);
  });

  it('reports when target is absent', () => {
    const steps = [...binarySearchSteps([1, 3, 5, 7, 9], 6)];
    const lastStep = steps[steps.length - 1];

    expect(lastStep.done).toBe(true);
    expect(lastStep.state.status).toBe('not-found');
    expect(lastStep.state.foundIndex).toBeNull();
  });
});


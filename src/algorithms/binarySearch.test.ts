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

  it('handles an empty array', () => {
    const steps = [...binarySearchSteps([], 10)];
    const lastStep = steps[steps.length - 1];

    expect(steps).toHaveLength(2);
    expect(lastStep.done).toBe(true);
    expect(lastStep.state.status).toBe('not-found');
    expect(lastStep.state.left).toBe(0);
    expect(lastStep.state.right).toBe(-1);
  });

  it('finds a valid index when duplicates are present', () => {
    const steps = [...binarySearchSteps([1, 2, 2, 2, 4, 8], 2)];
    const lastStep = steps[steps.length - 1];

    expect(lastStep.state.status).toBe('found');
    expect(lastStep.state.foundIndex).not.toBeNull();
    expect(lastStep.state.array[lastStep.state.foundIndex as number]).toBe(2);
  });
});

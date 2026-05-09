import { describe, expect, it } from 'vitest';
import { selectionSortSteps } from './selectionSort';

describe('selectionSortSteps', () => {
  it('sorts the array without mutating the input', () => {
    const input = [7, 2, 9, 1, 5];
    const steps = [...selectionSortSteps(input)];
    const lastStep = steps[steps.length - 1];

    expect(lastStep.state.array).toEqual([1, 2, 5, 7, 9]);
    expect(input).toEqual([7, 2, 9, 1, 5]);
  });

  it('marks all indices as sorted at the end', () => {
    const steps = [...selectionSortSteps([3, 1, 2])];
    const lastStep = steps[steps.length - 1];

    expect(lastStep.done).toBe(true);
    expect(lastStep.state.sortedIndices).toEqual([0, 1, 2]);
  });

  it('handles an empty array', () => {
    const steps = [...selectionSortSteps([])];
    const lastStep = steps[steps.length - 1];

    expect(lastStep.done).toBe(true);
    expect(lastStep.state.array).toEqual([]);
    expect(lastStep.state.sortedIndices).toEqual([]);
  });

  it('sorts arrays with duplicate values', () => {
    const steps = [...selectionSortSteps([4, 2, 4, 1, 2])];
    const lastStep = steps[steps.length - 1];

    expect(lastStep.state.array).toEqual([1, 2, 2, 4, 4]);
  });
});

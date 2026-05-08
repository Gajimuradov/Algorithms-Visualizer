import { describe, expect, it } from 'vitest';
import { parseQueueOperations, queueSteps } from './queue';
import { parseStackOperations, stackSteps } from './stack';

describe('stackSteps', () => {
  it('applies push and pop operations using LIFO', () => {
    const operations = parseStackOperations('push 3, push 8, pop, push 5');
    const steps = [...stackSteps([1], operations)];
    const lastStep = steps[steps.length - 1];

    expect(lastStep.state.items).toEqual([1, 3, 5]);
  });
});

describe('queueSteps', () => {
  it('applies enqueue and dequeue operations using FIFO', () => {
    const operations = parseQueueOperations('enqueue 3, enqueue 8, dequeue, enqueue 5');
    const steps = [...queueSteps([1], operations)];
    const lastStep = steps[steps.length - 1];

    expect(lastStep.state.items).toEqual([3, 8, 5]);
  });
});


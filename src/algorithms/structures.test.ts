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

  it('ignores malformed stack operations', () => {
    const operations = parseStackOperations('push, push nope, rotate 7, pop');

    expect(operations).toEqual([{ type: 'pop' }]);
  });

  it('keeps an empty stack stable on pop', () => {
    const operations = parseStackOperations('pop');
    const steps = [...stackSteps([], operations)];
    const popStep = steps[1];
    const lastStep = steps[steps.length - 1];

    expect(popStep.state.removedValue).toBeNull();
    expect(lastStep.state.items).toEqual([]);
  });
});

describe('queueSteps', () => {
  it('applies enqueue and dequeue operations using FIFO', () => {
    const operations = parseQueueOperations('enqueue 3, enqueue 8, dequeue, enqueue 5');
    const steps = [...queueSteps([1], operations)];
    const lastStep = steps[steps.length - 1];

    expect(lastStep.state.items).toEqual([3, 8, 5]);
  });

  it('ignores malformed queue operations', () => {
    const operations = parseQueueOperations('enqueue, enqueue nope, rotate 7, dequeue');

    expect(operations).toEqual([{ type: 'dequeue' }]);
  });

  it('keeps an empty queue stable on dequeue', () => {
    const operations = parseQueueOperations('dequeue');
    const steps = [...queueSteps([], operations)];
    const dequeueStep = steps[1];
    const lastStep = steps[steps.length - 1];

    expect(dequeueStep.state.removedValue).toBeNull();
    expect(lastStep.state.items).toEqual([]);
  });
});

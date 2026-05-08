import type { AlgorithmStep } from './types';

export type QueueOperation =
  | {
      type: 'enqueue';
      value: number;
    }
  | {
      type: 'dequeue';
    };

export interface QueueState {
  items: number[];
  frontIndex: number | null;
  rearIndex: number | null;
  activeIndex: number | null;
  lastOperation: string;
  removedValue: number | null;
}

export function parseQueueOperations(input: string): QueueOperation[] {
  return input
    .split(/[,;\n]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .flatMap((part): QueueOperation[] => {
      const [command, rawValue] = part.split(/\s+/);
      const normalized = command.toLowerCase();

      if (normalized === 'dequeue') {
        return [{ type: 'dequeue' }];
      }

      if (normalized === 'enqueue') {
        const value = Number(rawValue);
        return Number.isFinite(value) ? [{ type: 'enqueue', value }] : [];
      }

      return [];
    });
}

export function* queueSteps(
  initialItems: number[],
  operations: QueueOperation[]
): Generator<AlgorithmStep<QueueState>> {
  const items = [...initialItems];

  yield {
    state: {
      items: [...items],
      frontIndex: items.length > 0 ? 0 : null,
      rearIndex: items.length > 0 ? items.length - 1 : null,
      activeIndex: items.length > 0 ? 0 : null,
      lastOperation: 'initial',
      removedValue: null
    },
    explanation: 'Queue работает по принципу FIFO: первым вошел, первым вышел.'
  };

  for (const operation of operations) {
    if (operation.type === 'enqueue') {
      items.push(operation.value);

      yield {
        state: {
          items: [...items],
          frontIndex: items.length > 0 ? 0 : null,
          rearIndex: items.length - 1,
          activeIndex: items.length - 1,
          lastOperation: `enqueue ${operation.value}`,
          removedValue: null
        },
        explanation: `Enqueue добавляет ${operation.value} в конец очереди. Rear сдвигается вправо.`
      };
    } else {
      const removedValue = items.length > 0 ? items.shift() ?? null : null;

      yield {
        state: {
          items: [...items],
          frontIndex: items.length > 0 ? 0 : null,
          rearIndex: items.length > 0 ? items.length - 1 : null,
          activeIndex: 0,
          lastOperation: 'dequeue',
          removedValue
        },
        explanation:
          removedValue === null
            ? 'Dequeue не изменил очередь, потому что она пуста.'
            : `Dequeue удаляет ${removedValue} из начала очереди. Следующий элемент становится front.`
      };
    }
  }

  yield {
    state: {
      items: [...items],
      frontIndex: items.length > 0 ? 0 : null,
      rearIndex: items.length > 0 ? items.length - 1 : null,
      activeIndex: null,
      lastOperation: 'done',
      removedValue: null
    },
    explanation: 'Все операции для Queue выполнены.',
    done: true
  };
}


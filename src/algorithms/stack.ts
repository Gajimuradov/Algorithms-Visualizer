import type { AlgorithmStep } from './types';

export type StackOperation =
  | {
      type: 'push';
      value: number;
    }
  | {
      type: 'pop';
    };

export interface StackState {
  items: number[];
  activeIndex: number | null;
  lastOperation: string;
  removedValue: number | null;
}

export function parseStackOperations(input: string): StackOperation[] {
  return input
    .split(/[,;\n]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .flatMap((part): StackOperation[] => {
      const [command, rawValue] = part.split(/\s+/);
      const normalized = command.toLowerCase();

      if (normalized === 'pop') {
        return [{ type: 'pop' }];
      }

      if (normalized === 'push') {
        const value = Number(rawValue);
        return Number.isFinite(value) ? [{ type: 'push', value }] : [];
      }

      return [];
    });
}

export function* stackSteps(
  initialItems: number[],
  operations: StackOperation[]
): Generator<AlgorithmStep<StackState>> {
  const items = [...initialItems];

  yield {
    state: {
      items: [...items],
      activeIndex: items.length > 0 ? items.length - 1 : null,
      lastOperation: 'initial',
      removedValue: null
    },
    explanation: 'Stack работает по принципу LIFO: последним вошел, первым вышел.'
  };

  for (const operation of operations) {
    if (operation.type === 'push') {
      items.push(operation.value);

      yield {
        state: {
          items: [...items],
          activeIndex: items.length - 1,
          lastOperation: `push ${operation.value}`,
          removedValue: null
        },
        explanation: `Push добавляет ${operation.value} на вершину стека. Новый top находится справа.`
      };
    } else {
      const removedValue = items.length > 0 ? items.pop() ?? null : null;

      yield {
        state: {
          items: [...items],
          activeIndex: items.length > 0 ? items.length - 1 : null,
          lastOperation: 'pop',
          removedValue
        },
        explanation:
          removedValue === null
            ? 'Pop не изменил стек, потому что он пуст.'
            : `Pop удаляет верхний элемент ${removedValue}. Следующий элемент становится top.`
      };
    }
  }

  yield {
    state: {
      items: [...items],
      activeIndex: items.length > 0 ? items.length - 1 : null,
      lastOperation: 'done',
      removedValue: null
    },
    explanation: 'Все операции для Stack выполнены.',
    done: true
  };
}


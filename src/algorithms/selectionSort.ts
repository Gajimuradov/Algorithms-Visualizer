import type { AlgorithmStep } from './types';

export type SelectionSortStatus =
  | 'initial'
  | 'select-min'
  | 'compare'
  | 'new-min'
  | 'swap'
  | 'keep'
  | 'sorted'
  | 'done';

export interface SelectionSortState {
  array: number[];
  currentIndex: number | null;
  comparingIndex: number | null;
  minIndex: number | null;
  swappedIndices: [number, number] | null;
  sortedIndices: number[];
  status: SelectionSortStatus;
}

export function* selectionSortSteps(
  inputArray: number[]
): Generator<AlgorithmStep<SelectionSortState>> {
  const array = [...inputArray];
  const sortedIndices: number[] = [];

  yield {
    state: {
      array: [...array],
      currentIndex: null,
      comparingIndex: null,
      minIndex: null,
      swappedIndices: null,
      sortedIndices: [],
      status: 'initial'
    },
    explanation: 'Начинаем Selection Sort: на каждой позиции ищем минимальный элемент в неотсортированной части.'
  };

  for (let currentIndex = 0; currentIndex < array.length - 1; currentIndex += 1) {
    let minIndex = currentIndex;

    yield {
      state: {
        array: [...array],
        currentIndex,
        comparingIndex: null,
        minIndex,
        swappedIndices: null,
        sortedIndices: [...sortedIndices],
        status: 'select-min'
      },
      explanation: `Позиция ${currentIndex} станет следующей отсортированной. Пока минимум - array[${minIndex}] = ${array[minIndex]}.`
    };

    for (let comparingIndex = currentIndex + 1; comparingIndex < array.length; comparingIndex += 1) {
      yield {
        state: {
          array: [...array],
          currentIndex,
          comparingIndex,
          minIndex,
          swappedIndices: null,
          sortedIndices: [...sortedIndices],
          status: 'compare'
        },
        explanation: `Сравниваем текущий минимум ${array[minIndex]} с array[${comparingIndex}] = ${array[comparingIndex]}.`
      };

      if (array[comparingIndex] < array[minIndex]) {
        minIndex = comparingIndex;

        yield {
          state: {
            array: [...array],
            currentIndex,
            comparingIndex,
            minIndex,
            swappedIndices: null,
            sortedIndices: [...sortedIndices],
            status: 'new-min'
          },
          explanation: `Нашли новый минимум: array[${minIndex}] = ${array[minIndex]}.`
        };
      }
    }

    if (minIndex !== currentIndex) {
      [array[currentIndex], array[minIndex]] = [array[minIndex], array[currentIndex]];

      yield {
        state: {
          array: [...array],
          currentIndex,
          comparingIndex: null,
          minIndex,
          swappedIndices: [currentIndex, minIndex],
          sortedIndices: [...sortedIndices],
          status: 'swap'
        },
        explanation: `Меняем местами позиции ${currentIndex} и ${minIndex}. Минимум переехал в отсортированную часть.`
      };
    } else {
      yield {
        state: {
          array: [...array],
          currentIndex,
          comparingIndex: null,
          minIndex,
          swappedIndices: null,
          sortedIndices: [...sortedIndices],
          status: 'keep'
        },
        explanation: `Элемент на позиции ${currentIndex} уже минимальный для этой части массива. Swap не нужен.`
      };
    }

    sortedIndices.push(currentIndex);

    yield {
      state: {
        array: [...array],
        currentIndex,
        comparingIndex: null,
        minIndex,
        swappedIndices: null,
        sortedIndices: [...sortedIndices],
        status: 'sorted'
      },
      explanation: `Позиция ${currentIndex} зафиксирована. Сортируем оставшуюся часть массива.`
    };
  }

  if (array.length > 0) {
    sortedIndices.push(array.length - 1);
  }

  yield {
    state: {
      array: [...array],
      currentIndex: null,
      comparingIndex: null,
      minIndex: null,
      swappedIndices: null,
      sortedIndices: [...sortedIndices],
      status: 'done'
    },
    explanation: 'Массив полностью отсортирован.',
    done: true
  };
}

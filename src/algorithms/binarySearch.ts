import type { AlgorithmStep } from './types';

export type BinarySearchStatus =
  | 'initial'
  | 'compare'
  | 'move-left'
  | 'move-right'
  | 'found'
  | 'not-found';

export interface BinarySearchState {
  array: number[];
  target: number;
  left: number;
  right: number;
  mid: number | null;
  foundIndex: number | null;
  status: BinarySearchStatus;
}

export function* binarySearchSteps(
  inputArray: number[],
  target: number
): Generator<AlgorithmStep<BinarySearchState>> {
  const array = [...inputArray];
  let left = 0;
  let right = array.length - 1;

  yield {
    state: {
      array,
      target,
      left,
      right,
      mid: null,
      foundIndex: null,
      status: 'initial'
    },
    explanation: `Берем отсортированный массив и ищем target = ${target}. Границы поиска: left = ${left}, right = ${right}.`
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = array[mid];

    yield {
      state: {
        array,
        target,
        left,
        right,
        mid,
        foundIndex: null,
        status: 'compare'
      },
      explanation: `Считаем mid = ${mid}. Сравниваем array[${mid}] = ${midValue} с target = ${target}.`
    };

    if (midValue === target) {
      yield {
        state: {
          array,
          target,
          left,
          right,
          mid,
          foundIndex: mid,
          status: 'found'
        },
        explanation: `Значение найдено: array[${mid}] = ${target}. Поиск завершен.`,
        done: true
      };
      return;
    }

    if (midValue < target) {
      left = mid + 1;

      yield {
        state: {
          array,
          target,
          left,
          right,
          mid,
          foundIndex: null,
          status: 'move-right'
        },
        explanation: `${midValue} меньше ${target}, поэтому отбрасываем левую половину и двигаем left на ${left}.`
      };
    } else {
      right = mid - 1;

      yield {
        state: {
          array,
          target,
          left,
          right,
          mid,
          foundIndex: null,
          status: 'move-left'
        },
        explanation: `${midValue} больше ${target}, поэтому отбрасываем правую половину и двигаем right на ${right}.`
      };
    }
  }

  yield {
    state: {
      array,
      target,
      left,
      right,
      mid: null,
      foundIndex: null,
      status: 'not-found'
    },
    explanation: `Границы пересеклись: left = ${left}, right = ${right}. Значения ${target} в массиве нет.`,
    done: true
  };
}


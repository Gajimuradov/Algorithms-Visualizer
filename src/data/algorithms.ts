import type { Complexity } from '../algorithms/types';

export type AlgorithmId =
  | 'binary-search'
  | 'selection-sort'
  | 'stack'
  | 'queue'
  | 'bfs'
  | 'dfs';

export interface AlgorithmInfo {
  id: AlgorithmId;
  title: string;
  subtitle: string;
  description: string;
  complexity: Complexity;
  topics: string[];
}

export const algorithms: AlgorithmInfo[] = [
  {
    id: 'binary-search',
    title: 'Binary Search',
    subtitle: 'Поиск в отсортированном массиве через сужение диапазона',
    description:
      'На каждом шаге алгоритм смотрит на середину текущего диапазона и отбрасывает половину массива, где target точно не может находиться.',
    complexity: {
      time: 'O(log n)',
      space: 'O(1)'
    },
    topics: ['sorted array', 'left / mid / right', 'target']
  },
  {
    id: 'selection-sort',
    title: 'Selection Sort',
    subtitle: 'Сортировка через выбор минимума для каждой позиции',
    description:
      'Алгоритм проходит по неотсортированной части массива, находит минимум и ставит его на следующую фиксированную позицию.',
    complexity: {
      time: 'O(n²)',
      space: 'O(1)'
    },
    topics: ['compare', 'min index', 'swap']
  },
  {
    id: 'stack',
    title: 'Stack',
    subtitle: 'LIFO структура: последний добавленный уходит первым',
    description:
      'Стек добавляет и удаляет элементы только с вершины. Последний добавленный элемент будет обработан первым.',
    complexity: {
      time: 'O(1) push / pop',
      space: 'O(n)'
    },
    topics: ['push', 'pop', 'top']
  },
  {
    id: 'queue',
    title: 'Queue',
    subtitle: 'FIFO структура: первый добавленный уходит первым',
    description:
      'Очередь добавляет элементы в конец и удаляет из начала. Первый добавленный элемент будет обработан первым.',
    complexity: {
      time: 'O(1) enqueue / dequeue',
      space: 'O(n)'
    },
    topics: ['enqueue', 'dequeue', 'front / rear']
  },
  {
    id: 'bfs',
    title: 'BFS',
    subtitle: 'Обход графа слоями с помощью очереди',
    description:
      'BFS использует очередь и проходит граф слоями: сначала ближайшие соседи, затем вершины следующего уровня.',
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    topics: ['queue', 'visited', 'traversal order']
  },
  {
    id: 'dfs',
    title: 'DFS',
    subtitle: 'Обход графа в глубину с помощью стека',
    description:
      'DFS использует стек и углубляется по одному пути, пока может, затем возвращается к непосещенным соседям.',
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    topics: ['stack', 'visited', 'traversal order']
  }
];

export function getAlgorithmById(id: AlgorithmId): AlgorithmInfo {
  const algorithm = algorithms.find((item) => item.id === id);

  if (!algorithm) {
    throw new Error(`Unknown algorithm id: ${id}`);
  }

  return algorithm;
}

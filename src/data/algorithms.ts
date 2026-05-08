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
    subtitle: 'Пошаговый поиск в отсортированном массиве',
    description:
      'Алгоритм делит область поиска пополам и сравнивает target со средним элементом, пока значение не найдено или границы не пересекутся.',
    complexity: {
      time: 'O(log n)',
      space: 'O(1)'
    },
    topics: ['sorted array', 'left / mid / right', 'target']
  },
  {
    id: 'selection-sort',
    title: 'Selection Sort',
    subtitle: 'Сортировка через поиск минимума',
    description:
      'На каждой итерации выбирается минимальный элемент из неотсортированной части и переносится на текущую позицию.',
    complexity: {
      time: 'O(n²)',
      space: 'O(1)'
    },
    topics: ['compare', 'min index', 'swap']
  },
  {
    id: 'stack',
    title: 'Stack',
    subtitle: 'LIFO структура данных',
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
    subtitle: 'FIFO структура данных',
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
    subtitle: 'Обход графа в ширину',
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
    subtitle: 'Обход графа в глубину',
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


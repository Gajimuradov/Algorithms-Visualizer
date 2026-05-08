import type { AlgorithmStep } from './types';

export type Graph = Record<string, string[]>;

export interface GraphNodePosition {
  x: number;
  y: number;
}

export interface GraphTraversalState {
  graph: Graph;
  visited: string[];
  frontier: string[];
  order: string[];
  activeNode: string | null;
  activeEdge: [string, string] | null;
  done: boolean;
}

export const defaultGraph: Graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: [],
  F: []
};

export const defaultGraphPositions: Record<string, GraphNodePosition> = {
  A: { x: 240, y: 40 },
  B: { x: 130, y: 135 },
  C: { x: 350, y: 135 },
  D: { x: 70, y: 250 },
  E: { x: 190, y: 250 },
  F: { x: 350, y: 250 }
};

function buildInitialState(graph: Graph, startNode: string): GraphTraversalState {
  return {
    graph,
    visited: [startNode],
    frontier: [startNode],
    order: [],
    activeNode: null,
    activeEdge: null,
    done: false
  };
}

export function* bfsSteps(
  graph: Graph = defaultGraph,
  startNode = 'A'
): Generator<AlgorithmStep<GraphTraversalState>> {
  const queue = [startNode];
  const visited = new Set([startNode]);
  const order: string[] = [];

  yield {
    state: buildInitialState(graph, startNode),
    explanation: `BFS начинает со стартовой вершины ${startNode}. Вершина добавлена в queue и отмечена visited.`
  };

  while (queue.length > 0) {
    const node = queue.shift() as string;
    order.push(node);

    yield {
      state: {
        graph,
        visited: [...visited],
        frontier: [...queue],
        order: [...order],
        activeNode: node,
        activeEdge: null,
        done: false
      },
      explanation: `Достаем ${node} из queue и добавляем в traversal order. BFS обходит граф по слоям.`
    };

    for (const neighbor of graph[node] ?? []) {
      yield {
        state: {
          graph,
          visited: [...visited],
          frontier: [...queue],
          order: [...order],
          activeNode: node,
          activeEdge: [node, neighbor],
          done: false
        },
        explanation: `Проверяем ребро ${node} -> ${neighbor}. Если сосед еще не visited, добавим его в queue.`
      };

      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);

        yield {
          state: {
            graph,
            visited: [...visited],
            frontier: [...queue],
            order: [...order],
            activeNode: neighbor,
            activeEdge: [node, neighbor],
            done: false
          },
          explanation: `${neighbor} еще не посещалась. Добавляем ее в queue, чтобы обработать на следующем слое.`
        };
      }
    }
  }

  yield {
    state: {
      graph,
      visited: [...visited],
      frontier: [],
      order: [...order],
      activeNode: null,
      activeEdge: null,
      done: true
    },
    explanation: `Queue пуста. BFS завершен. Порядок обхода: ${order.join(' -> ')}.`,
    done: true
  };
}

export function* dfsSteps(
  graph: Graph = defaultGraph,
  startNode = 'A'
): Generator<AlgorithmStep<GraphTraversalState>> {
  const stack = [startNode];
  const visited = new Set<string>();
  const order: string[] = [];

  yield {
    state: {
      graph,
      visited: [],
      frontier: [...stack],
      order: [],
      activeNode: null,
      activeEdge: null,
      done: false
    },
    explanation: `DFS начинает со стартовой вершины ${startNode}. Вершина помещена в stack.`
  };

  while (stack.length > 0) {
    const node = stack.pop() as string;

    if (visited.has(node)) {
      yield {
        state: {
          graph,
          visited: [...visited],
          frontier: [...stack],
          order: [...order],
          activeNode: node,
          activeEdge: null,
          done: false
        },
        explanation: `${node} уже была visited, поэтому пропускаем повторную обработку.`
      };
      continue;
    }

    visited.add(node);
    order.push(node);

    yield {
      state: {
        graph,
        visited: [...visited],
        frontier: [...stack],
        order: [...order],
        activeNode: node,
        activeEdge: null,
        done: false
      },
      explanation: `Достаем ${node} из stack, отмечаем visited и добавляем в traversal order.`
    };

    const neighbors = graph[node] ?? [];
    for (const neighbor of [...neighbors].reverse()) {
      yield {
        state: {
          graph,
          visited: [...visited],
          frontier: [...stack],
          order: [...order],
          activeNode: node,
          activeEdge: [node, neighbor],
          done: false
        },
        explanation: `Проверяем ребро ${node} -> ${neighbor}. Для DFS сосед попадет в stack, если еще не visited.`
      };

      if (!visited.has(neighbor)) {
        stack.push(neighbor);

        yield {
          state: {
            graph,
            visited: [...visited],
            frontier: [...stack],
            order: [...order],
            activeNode: neighbor,
            activeEdge: [node, neighbor],
            done: false
          },
          explanation: `${neighbor} еще не visited. Кладем вершину в stack для углубления обхода.`
        };
      }
    }
  }

  yield {
    state: {
      graph,
      visited: [...visited],
      frontier: [],
      order: [...order],
      activeNode: null,
      activeEdge: null,
      done: true
    },
    explanation: `Stack пуст. DFS завершен. Порядок обхода: ${order.join(' -> ')}.`,
    done: true
  };
}


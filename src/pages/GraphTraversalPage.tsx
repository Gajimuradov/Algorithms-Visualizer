import { useMemo, useState } from 'react';
import { bfsSteps, defaultGraph, dfsSteps } from '../algorithms/graph';
import { AlgorithmControls } from '../components/AlgorithmControls';
import { AlgorithmShell } from '../components/AlgorithmShell';
import inputStyles from '../components/InputControls.module.css';
import { GraphVisual } from '../components/visualizations/GraphVisual';
import { getAlgorithmById } from '../data/algorithms';
import { useAlgorithmRunner } from '../hooks/useAlgorithmRunner';

interface GraphTraversalPageProps {
  mode: 'bfs' | 'dfs';
}

export function GraphTraversalPage({ mode }: GraphTraversalPageProps) {
  const [startNode, setStartNode] = useState('A');
  const steps = useMemo(
    () => [...(mode === 'bfs' ? bfsSteps(defaultGraph, startNode) : dfsSteps(defaultGraph, startNode))],
    [mode, startNode]
  );
  const runner = useAlgorithmRunner(steps, 800);
  const algorithm = getAlgorithmById(mode);
  const adjacencyList = Object.entries(defaultGraph)
    .map(([node, neighbors]) => `${node}: ${neighbors.length > 0 ? neighbors.join(', ') : '-'}`)
    .join('\n');

  return (
    <AlgorithmShell
      algorithm={algorithm}
      controls={
        <AlgorithmControls
          canStep={runner.canStep}
          isPlaying={runner.isPlaying}
          onPause={runner.pause}
          onReset={runner.reset}
          onStart={runner.start}
          onStep={runner.step}
        />
      }
      explanation={runner.currentStep.explanation}
      inputs={
        <>
          <div className={inputStyles.inputGroup}>
            <label htmlFor={`${mode}-start`}>Start node</label>
            <select id={`${mode}-start`} value={startNode} onChange={(event) => setStartNode(event.target.value)}>
              {Object.keys(defaultGraph).map((node) => (
                <option key={node} value={node}>
                  {node}
                </option>
              ))}
            </select>
          </div>
          <div className={inputStyles.inputGroup}>
            <label>Graph adjacency list</label>
            <pre className={inputStyles.codeBlock}>{adjacencyList}</pre>
          </div>
        </>
      }
      stepIndex={runner.currentIndex}
      totalSteps={runner.totalSteps}
      visualization={<GraphVisual frontierLabel={mode === 'bfs' ? 'queue' : 'stack'} state={runner.currentStep.state} />}
    />
  );
}


import { useMemo, useState } from 'react';
import { parseStackOperations, stackSteps } from '../algorithms/stack';
import { AlgorithmControls } from '../components/AlgorithmControls';
import { AlgorithmShell } from '../components/AlgorithmShell';
import inputStyles from '../components/InputControls.module.css';
import { StackVisual } from '../components/visualizations/StackVisual';
import { getAlgorithmById } from '../data/algorithms';
import { useAlgorithmRunner } from '../hooks/useAlgorithmRunner';
import { parseNumberList } from '../utils/numberInput';

const DEFAULT_ITEMS = [4, 9, 15];

export function StackPage() {
  const [itemsInput, setItemsInput] = useState(DEFAULT_ITEMS.join(', '));
  const [operationsInput, setOperationsInput] = useState('push 23, pop, push 42, push 7, pop');
  const items = useMemo(() => parseNumberList(itemsInput, DEFAULT_ITEMS), [itemsInput]);
  const operations = useMemo(() => parseStackOperations(operationsInput), [operationsInput]);
  const steps = useMemo(() => [...stackSteps(items, operations)], [items, operations]);
  const runner = useAlgorithmRunner(steps, 800);
  const algorithm = getAlgorithmById('stack');

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
            <label htmlFor="stack-items">Initial stack</label>
            <input id="stack-items" value={itemsInput} onChange={(event) => setItemsInput(event.target.value)} />
          </div>
          <div className={inputStyles.inputGroup}>
            <label htmlFor="stack-operations">Operations</label>
            <textarea id="stack-operations" value={operationsInput} onChange={(event) => setOperationsInput(event.target.value)} />
            <p className={inputStyles.hint}>Формат: push 10, pop, push 5.</p>
          </div>
        </>
      }
      stepIndex={runner.currentIndex}
      totalSteps={runner.totalSteps}
      visualization={<StackVisual state={runner.currentStep.state} />}
    />
  );
}


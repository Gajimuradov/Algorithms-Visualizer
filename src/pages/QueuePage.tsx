import { useMemo, useState } from 'react';
import { parseQueueOperations, queueSteps } from '../algorithms/queue';
import { AlgorithmControls } from '../components/AlgorithmControls';
import { AlgorithmShell } from '../components/AlgorithmShell';
import inputStyles from '../components/InputControls.module.css';
import { QueueVisual } from '../components/visualizations/QueueVisual';
import { getAlgorithmById } from '../data/algorithms';
import { useAlgorithmRunner } from '../hooks/useAlgorithmRunner';
import { parseNumberList } from '../utils/numberInput';

const DEFAULT_ITEMS = [11, 18, 27];

export function QueuePage() {
  const [itemsInput, setItemsInput] = useState(DEFAULT_ITEMS.join(', '));
  const [operationsInput, setOperationsInput] = useState('enqueue 34, dequeue, enqueue 55, dequeue, enqueue 89');
  const items = useMemo(() => parseNumberList(itemsInput, DEFAULT_ITEMS), [itemsInput]);
  const operations = useMemo(() => parseQueueOperations(operationsInput), [operationsInput]);
  const steps = useMemo(() => [...queueSteps(items, operations)], [items, operations]);
  const runner = useAlgorithmRunner(steps, 800);
  const algorithm = getAlgorithmById('queue');

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
            <label htmlFor="queue-items">Initial queue</label>
            <input id="queue-items" value={itemsInput} onChange={(event) => setItemsInput(event.target.value)} />
          </div>
          <div className={inputStyles.inputGroup}>
            <label htmlFor="queue-operations">Operations</label>
            <textarea id="queue-operations" value={operationsInput} onChange={(event) => setOperationsInput(event.target.value)} />
            <p className={inputStyles.hint}>Формат: enqueue 10, dequeue, enqueue 5.</p>
          </div>
        </>
      }
      stepIndex={runner.currentIndex}
      totalSteps={runner.totalSteps}
      visualization={<QueueVisual state={runner.currentStep.state} />}
    />
  );
}


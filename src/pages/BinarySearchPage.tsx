import { useMemo, useState } from 'react';
import { binarySearchSteps } from '../algorithms/binarySearch';
import { AlgorithmControls } from '../components/AlgorithmControls';
import { AlgorithmShell } from '../components/AlgorithmShell';
import inputStyles from '../components/InputControls.module.css';
import { BinarySearchVisual } from '../components/visualizations/BinarySearchVisual';
import { getAlgorithmById } from '../data/algorithms';
import { useAlgorithmRunner } from '../hooks/useAlgorithmRunner';
import { parseSortedNumberList } from '../utils/numberInput';

const DEFAULT_ARRAY = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

export function BinarySearchPage() {
  const [arrayInput, setArrayInput] = useState(DEFAULT_ARRAY.join(', '));
  const [targetInput, setTargetInput] = useState('23');
  const array = useMemo(() => parseSortedNumberList(arrayInput, DEFAULT_ARRAY), [arrayInput]);
  const target = Number.isFinite(Number(targetInput)) ? Number(targetInput) : DEFAULT_ARRAY[5];
  const steps = useMemo(() => [...binarySearchSteps(array, target)], [array, target]);
  const runner = useAlgorithmRunner(steps, 850);
  const algorithm = getAlgorithmById('binary-search');

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
            <label htmlFor="binary-array">Sorted array</label>
            <input id="binary-array" value={arrayInput} onChange={(event) => setArrayInput(event.target.value)} />
            <p className={inputStyles.hint}>Числа можно вводить через запятую или пробел. Для Binary Search массив сортируется автоматически.</p>
          </div>
          <div className={inputStyles.inputGroup}>
            <label htmlFor="binary-target">Target value</label>
            <input id="binary-target" type="number" value={targetInput} onChange={(event) => setTargetInput(event.target.value)} />
          </div>
        </>
      }
      stepIndex={runner.currentIndex}
      totalSteps={runner.totalSteps}
      visualization={<BinarySearchVisual state={runner.currentStep.state} />}
    />
  );
}


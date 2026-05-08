import { useMemo, useState } from 'react';
import { selectionSortSteps } from '../algorithms/selectionSort';
import { AlgorithmControls } from '../components/AlgorithmControls';
import { AlgorithmShell } from '../components/AlgorithmShell';
import inputStyles from '../components/InputControls.module.css';
import { SortVisual } from '../components/visualizations/SortVisual';
import { getAlgorithmById } from '../data/algorithms';
import { useAlgorithmRunner } from '../hooks/useAlgorithmRunner';
import { parseNumberList } from '../utils/numberInput';

const DEFAULT_ARRAY = [42, 18, 7, 64, 29, 12, 53];

export function SelectionSortPage() {
  const [arrayInput, setArrayInput] = useState(DEFAULT_ARRAY.join(', '));
  const array = useMemo(() => parseNumberList(arrayInput, DEFAULT_ARRAY), [arrayInput]);
  const steps = useMemo(() => [...selectionSortSteps(array)], [array]);
  const runner = useAlgorithmRunner(steps, 700);
  const algorithm = getAlgorithmById('selection-sort');

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
        <div className={inputStyles.inputGroup}>
          <label htmlFor="sort-array">Array</label>
          <input id="sort-array" value={arrayInput} onChange={(event) => setArrayInput(event.target.value)} />
          <p className={inputStyles.hint}>Selection Sort покажет сравнения, новый минимум и swap.</p>
        </div>
      }
      stepIndex={runner.currentIndex}
      totalSteps={runner.totalSteps}
      visualization={<SortVisual state={runner.currentStep.state} />}
    />
  );
}


import { useState } from 'react';
import styles from './App.module.css';
import type { AlgorithmId } from './data/algorithms';
import { HomePage } from './pages/HomePage';
import { BinarySearchPage } from './pages/BinarySearchPage';
import { GraphTraversalPage } from './pages/GraphTraversalPage';
import { QueuePage } from './pages/QueuePage';
import { SelectionSortPage } from './pages/SelectionSortPage';
import { StackPage } from './pages/StackPage';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmId | null>(null);

  return (
    <main className={styles.app}>
      {selectedAlgorithm === null ? (
        <HomePage onSelect={setSelectedAlgorithm} />
      ) : (
        <>
          <button className={styles.backButton} onClick={() => setSelectedAlgorithm(null)} type="button">
            Назад к списку
          </button>
          {selectedAlgorithm === 'binary-search' && <BinarySearchPage />}
          {selectedAlgorithm === 'selection-sort' && <SelectionSortPage />}
          {selectedAlgorithm === 'stack' && <StackPage />}
          {selectedAlgorithm === 'queue' && <QueuePage />}
          {selectedAlgorithm === 'bfs' && <GraphTraversalPage mode="bfs" />}
          {selectedAlgorithm === 'dfs' && <GraphTraversalPage mode="dfs" />}
        </>
      )}
    </main>
  );
}

export default App;


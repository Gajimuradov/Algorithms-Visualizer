export interface AlgorithmStep<TState> {
  state: TState;
  explanation: string;
  done?: boolean;
}

export type Complexity = {
  time: string;
  space: string;
};


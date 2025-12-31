export type SortStep = {
  array: number[];
  comparing: number[]; // Indices being compared
  swapping: number[]; // Indices being swapped
  sorted: number[]; // Indices that are fully sorted
  description: string; // Plain English explanation
};

export type DS_Step = {
    nodes: {id: string, value: number, highlight?: boolean, active?: boolean}[];
    description: string;
    pointer?: number; // index the pointer is currently at
    target?: number; // target index for search/insert
};

export type Step = SortStep | DS_Step;

// Type Guard
export function isSortStep(step: Step): step is SortStep {
  return (step as SortStep).array !== undefined;
}
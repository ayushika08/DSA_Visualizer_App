import { SortStep } from "@/types";

export function generateBubbleSortSteps(initialArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const array = [...initialArray];
  const n = array.length;
  let sortedIndices: number[] = [];

  steps.push({ array: [...array], comparing: [], swapping: [], sorted: [], description: "Starting Bubble Sort." });

  for (let i = 0; i < n - 1; i++) {
    let swappedInPass = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...array], comparing: [j, j + 1], swapping: [], sorted: [...sortedIndices], description: `Compare ${array[j]} and ${array[j + 1]}.` });
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swappedInPass = true;
        steps.push({ array: [...array], comparing: [], swapping: [j, j + 1], sorted: [...sortedIndices], description: `Swap.` });
      }
    }
    sortedIndices.push(n - 1 - i);
    steps.push({ array: [...array], comparing: [], swapping: [], sorted: [...sortedIndices], description: `Sorted ${array[n - 1 - i]}.` });
    if (!swappedInPass) break;
  }
  steps.push({ array: [...array], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i), description: "Bubble Sort complete!" });
  return steps;
}

export function generateSelectionSortSteps(initialArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const array = [...initialArray];
  const n = array.length;
  let sortedIndices: number[] = [];

  steps.push({ array: [...array], comparing: [], swapping: [], sorted: [], description: "Starting Selection Sort." });

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      steps.push({ array: [...array], comparing: [minIdx, j], swapping: [], sorted: [...sortedIndices], description: `Find min: ${array[minIdx]} vs ${array[j]}.` });
      if (array[j] < array[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      steps.push({ array: [...array], comparing: [], swapping: [i, minIdx], sorted: [...sortedIndices], description: `Swap ${array[i]} with min.` });
    }
    sortedIndices.push(i);
    steps.push({ array: [...array], comparing: [], swapping: [], sorted: [...sortedIndices], description: `${array[i]} is sorted.` });
  }
  return steps;
}

export function generateInsertionSortSteps(initialArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const array = [...initialArray];
  const n = array.length;

  steps.push({ array: [...array], comparing: [], swapping: [], sorted: [0], description: "Starting Insertion Sort." });

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    steps.push({ array: [...array], comparing: [i], swapping: [], sorted: Array.from({ length: i }, (_, k) => k), description: `Select ${key} to insert.` });
    
    while (j >= 0 && array[j] > key) {
      steps.push({ array: [...array], comparing: [j], swapping: [], sorted: Array.from({ length: i }, (_, k) => k), description: `Shift ${array[j]} right.` });
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
    steps.push({ array: [...array], comparing: [], swapping: [j + 1], sorted: Array.from({ length: i + 1 }, (_, k) => k), description: `Insert ${key}.` });
  }
  steps.push({ array: [...array], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i), description: "Insertion Sort complete!" });
  return steps;
}

export function generateMergeSortSteps(initialArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const array = [...initialArray];

  function merge(l: number, m: number, r: number) {
    const left = array.slice(l, m + 1);
    const right = array.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      steps.push({ array: [...array], comparing: [l + i, m + 1 + j], swapping: [], sorted: [], description: `Comparing ${left[i]} and ${right[j]}.` });
      if (left[i] <= right[j]) {
        array[k] = left[i];
        i++;
      } else {
        array[k] = right[j];
        j++;
      }
      steps.push({ array: [...array], comparing: [], swapping: [k], sorted: [], description: `Place ${array[k]}.` });
      k++;
    }
    while (i < left.length) {
      array[k] = left[i];
      steps.push({ array: [...array], comparing: [], swapping: [k], sorted: [], description: `Copy remaining from left.` });
      i++;
      k++;
    }
    while (j < right.length) {
      array[k] = right[j];
      steps.push({ array: [...array], comparing: [], swapping: [k], sorted: [], description: `Copy remaining from right.` });
      j++;
      k++;
    }
  }

  function mergeSortHelper(l: number, r: number) {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      mergeSortHelper(l, m);
      mergeSortHelper(m + 1, r);
      merge(l, m, r);
    }
  }

  mergeSortHelper(0, array.length - 1);
  steps.push({ array: [...array], comparing: [], swapping: [], sorted: Array.from({ length: array.length }, (_, i) => i), description: "Merge Sort complete!" });
  return steps;
}

export function generateQuickSortSteps(initialArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const array = [...initialArray];

  function partition(low: number, high: number) {
    const pivot = array[high];
    let i = low - 1;
    steps.push({ array: [...array], comparing: [high], swapping: [], sorted: [], description: `Pivot is ${pivot}.` });
    
    for (let j = low; j < high; j++) {
      steps.push({ array: [...array], comparing: [j, high], swapping: [], sorted: [], description: `Compare ${array[j]} with pivot.` });
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        steps.push({ array: [...array], comparing: [], swapping: [i, j], sorted: [], description: `Swap.` });
      }
    }
    
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    steps.push({ array: [...array], comparing: [], swapping: [i + 1, high], sorted: [], description: `Place pivot.` });
    return i + 1;
  }

  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }

  quickSortHelper(0, array.length - 1);
  steps.push({ array: [...array], comparing: [], swapping: [], sorted: Array.from({ length: array.length }, (_, i) => i), description: "Quick Sort complete!" });
  return steps;
}
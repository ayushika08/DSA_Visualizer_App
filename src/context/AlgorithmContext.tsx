"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AlgorithmType = 
  | 'bubble-sort' | 'selection-sort' | 'insertion-sort' | 'merge-sort' | 'quick-sort'
  | 'linked-list' | 'hash-map' | 'hash-set' 
  | 'bst' | 'tree-traversal' | 'graph-bfs' | 'graph-dfs' 
  | 'recursion-factorial';

interface AlgorithmContextType {
  selectedAlgorithm: AlgorithmType;
  setSelectedAlgorithm: (algo: AlgorithmType) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  array: number[];
  setArray: (array: number[]) => void;
  linkedList: {id: string, value: number}[];
  resetArray: () => void;
}

const AlgorithmContext = createContext<AlgorithmContextType | undefined>(undefined);

export function AlgorithmProvider({ children }: { children: ReactNode }) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('bubble-sort');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  // Initialize with some data immediately to avoid empty flash
  const [array, setArray] = useState<number[]>(
    Array.from({ length: 8 }, () => Math.floor(Math.random() * 50) + 10)
  );
  const [linkedList, setLinkedList] = useState<{id: string, value: number}[]>([]);

  // specialized reset function that generates a new random array
  const resetArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 50) + 10);
    setArray(newArray);
    setLinkedList(newArray.map((val, i) => ({ id: `node-${i}`, value: val })));
    setIsPlaying(false);
  };

  // Initialize array on first load
  React.useEffect(() => {
    resetArray();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AlgorithmContext.Provider
      value={{
        selectedAlgorithm,
        setSelectedAlgorithm,
        isPlaying,
        setIsPlaying,
        speed,
        setSpeed,
        array,
        setArray,
        linkedList,
        resetArray,
      }}
    >
      {children}
    </AlgorithmContext.Provider>
  );
}

export function useAlgorithm() {
  const context = useContext(AlgorithmContext);
  if (context === undefined) {
    throw new Error('useAlgorithm must be used within an AlgorithmProvider');
  }
  return context;
}
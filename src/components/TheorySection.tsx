"use client";

import React from 'react';
import { useAlgorithm } from '@/context/AlgorithmContext';

export default function TheorySection() {
  const { selectedAlgorithm } = useAlgorithm();

  // Content dictionary
  const content = {
    'bubble-sort': {
      title: "Bubble Sort",
      description: "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order.",
      timeComplexity: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)"
      },
      spaceComplexity: "O(1)",
      mechanism: "Iterates through the list, comparing adjacent elements and swapping them if the first is greater than the second. Larger elements 'bubble' to the top (end) of the list with each full pass."
    },
    'insertion-sort': {
      title: "Insertion Sort",
      description: "Builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
      timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
      spaceComplexity: "O(1)",
      mechanism: "Iterates from the second element to the last, placing the current element at its correct position in the sorted part of the array to its left."
    },
    'merge-sort': {
      title: "Merge Sort",
      description: "A Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.",
      timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
      spaceComplexity: "O(n)",
      mechanism: "Recursively splits the array into halves until single elements remain, then merges them back together in sorted order."
    },
    'quick-sort': {
      title: "Quick Sort",
      description: "A Divide and Conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot.",
      timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
      spaceComplexity: "O(log n)",
      mechanism: "Picks a 'pivot' element and partitions the array such that smaller elements are on the left and larger on the right, then recursively sorts the partitions."
    },
    // Defaults
    'default': {
      title: "Algorithm Theory",
      description: "Select an algorithm to learn more about how it works.",
      timeComplexity: { best: "-", average: "-", worst: "-" },
      spaceComplexity: "-",
      mechanism: "-"
    }
  };

  // @ts-ignore
  const data = content[selectedAlgorithm] || content['default'];

  return (
    <div className="border-t border-border pt-6 mt-2">
      <h2 className="text-lg font-semibold mb-4 text-primary">Theory & Complexity</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
            <p className="text-sm mt-1 leading-relaxed">{data.description}</p>
          </div>
          <div>
             <h3 className="text-sm font-medium text-muted-foreground">Mechanism</h3>
             <p className="text-sm mt-1 leading-relaxed">{data.mechanism}</p>
          </div>
        </div>

        <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Performance Analysis</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span>Time Complexity (Best)</span>
              <span className="font-mono text-green-500">{data.timeComplexity.best}</span>
            </div>
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span>Time Complexity (Average)</span>
              <span className="font-mono text-yellow-500">{data.timeComplexity.average}</span>
            </div>
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span>Time Complexity (Worst)</span>
              <span className="font-mono text-red-500">{data.timeComplexity.worst}</span>
            </div>
             <div className="flex justify-between pt-1">
              <span>Space Complexity</span>
              <span className="font-mono text-blue-400">{data.spaceComplexity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
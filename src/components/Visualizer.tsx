"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAlgorithm } from '@/context/AlgorithmContext';
import { SortStep, generateBubbleSortSteps, generateSelectionSortSteps, generateInsertionSortSteps, generateMergeSortSteps, generateQuickSortSteps } from '@/lib/sortingAlgorithms';
import { DS_Step, generateLinkedListTraversalSteps } from '@/lib/dataStructureAlgorithms';
import { Step, isSortStep } from '@/types';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export default function Visualizer() {
  const { array, linkedList, selectedAlgorithm, isPlaying, setIsPlaying, speed } = useAlgorithm();
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  useEffect(() => {
    let generatedSteps: Step[] = [];
    
    switch (selectedAlgorithm) {
        case 'bubble-sort':
            generatedSteps = generateBubbleSortSteps(array);
            break;
        case 'selection-sort':
            generatedSteps = generateSelectionSortSteps(array);
            break;
        case 'insertion-sort':
            generatedSteps = generateInsertionSortSteps(array);
            break;
        case 'merge-sort':
            generatedSteps = generateMergeSortSteps(array);
            break;
        case 'quick-sort':
            generatedSteps = generateQuickSortSteps(array);
            break;
        case 'linked-list':
            generatedSteps = generateLinkedListTraversalSteps(linkedList);
            break;
        default:
             generatedSteps = [];
            break;
    }
    
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [array, linkedList, selectedAlgorithm, setIsPlaying]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPlaying && currentStepIndex < steps.length - 1) {
      timeout = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, speed);
    } else if (currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStepIndex, steps.length, speed, setIsPlaying]);

  if (!steps || steps.length === 0) {
    return (
      <div className="flex-1 bg-card border rounded-xl p-8 flex items-center justify-center text-muted-foreground">
        {selectedAlgorithm === 'bubble-sort' ? "Generating visualization..." : "Select an algorithm or wait for generation..."}
      </div>
    );
  }

  const currentStep = steps[currentStepIndex];
  const isSorting = isSortStep(currentStep);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center gap-12 relative overflow-hidden shadow-inner min-h-[400px]">
         
         {isSorting ? (
            <div className="flex gap-4 items-center justify-center w-full flex-wrap">
                <AnimatePresence>
                    {(currentStep as SortStep).array.map((value: number, idx: number) => {
                        const step = currentStep as SortStep;
                        const isComparing = step.comparing?.includes(idx);
                        const isSwapping = step.swapping?.includes(idx);
                        const isSorted = step.sorted?.includes(idx);

                        let cardColor = "bg-zinc-800 border-zinc-700 text-white"; 
                        let scale = 1;

                        if (isSorted) cardColor = "bg-green-600 border-green-500 text-white";
                        else if (isSwapping) { cardColor = "bg-red-600 border-red-500 text-white"; scale = 1.1; }
                        else if (isComparing) { cardColor = "bg-yellow-500 border-yellow-400 text-black"; scale = 1.05; }

                        return (
                        <motion.div
                            key={idx}
                            layoutId={`card-${value}-${idx}`}
                            className={cn(
                            "flex items-center justify-center w-16 h-20 sm:w-20 sm:h-24 rounded-lg border-2 shadow-lg transition-colors duration-300",
                            cardColor
                            )}
                            animate={{ scale: scale, y: isSwapping ? -20 : 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <div className="text-2xl sm:text-3xl font-bold">{value}</div>
                            <div className="absolute -bottom-8 text-xs text-zinc-500 font-mono">{idx}</div>
                        </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
         ) : selectedAlgorithm === 'linked-list' && !isSorting ? (
            <div className="flex items-center justify-center w-full flex-wrap gap-y-16 px-4">
                {(currentStep as DS_Step).nodes.map((node: any, idx: number) => (
                    <div key={node.id} className="flex items-center">
                        <motion.div
                            animate={{
                                scale: node.active ? 1.2 : 1,
                                backgroundColor: node.highlight ? "#16a34a" : node.active ? "#eab308" : "#27272a",
                                borderColor: node.highlight ? "#22c55e" : node.active ? "#facc15" : "#3f3f46"
                            }}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 flex flex-col items-center justify-center text-white relative shadow-xl z-10"
                        >
                            <span className="text-xl font-bold">{node.value}</span>
                            {idx === 0 && <span className="absolute -top-8 text-[10px] uppercase font-bold text-blue-400 tracking-widest">Head</span>}
                            {currentStep.pointer === idx && (
                                <motion.div 
                                    layoutId="pointer"
                                    className="absolute -bottom-10 flex flex-col items-center"
                                >
                                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-yellow-500 mb-1"></div>
                                    <span className="text-[10px] font-bold text-yellow-500 uppercase">curr</span>
                                </motion.div>
                            )}
                        </motion.div>
                        
                        {idx < (currentStep as DS_Step).nodes.length - 1 && (
                            <div className="w-8 sm:w-12 flex items-center justify-center">
                                <motion.div className="h-1 bg-zinc-700 w-full flex items-center justify-end">
                                     <ArrowRight className="text-zinc-700 w-4 h-4 translate-x-2" />
                                </motion.div>
                            </div>
                        )}
                        
                        {idx === (currentStep as DS_Step).nodes.length - 1 && (
                             <div className="flex items-center">
                                <div className="w-8 sm:w-12 flex items-center justify-center">
                                    <div className="h-1 w-full bg-zinc-700 flex items-center justify-end">
                                        <ArrowRight className="text-zinc-700 w-4 h-4 translate-x-2" />
                                    </div>
                                </div>
                                <div className="text-zinc-500 font-mono text-xs italic ml-2">null</div>
                             </div>
                        )}
                    </div>
                ))}
            </div>
         ) : (
             <div className="text-center text-muted-foreground">
                 <p className="text-lg font-semibold mb-2">Coming Soon</p>
                 <p className="text-sm">Visualization for {selectedAlgorithm} is under development.</p>
             </div>
         )}

         <div className="flex gap-6 text-sm text-zinc-400 mt-8 bg-zinc-950/50 px-6 py-2 rounded-full border border-zinc-800">
             <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div> {selectedAlgorithm === 'linked-list' ? 'Active/Visiting' : 'Comparing'}
             </div>
             {isSorting && (
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded-sm"></div> Swapping
                </div>
             )}
             <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-green-600 rounded-sm"></div> {selectedAlgorithm === 'linked-list' ? 'Visited' : 'Sorted'}
             </div>
         </div>
      </div>

      <div className="bg-muted/30 border rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono text-muted-foreground uppercase">
                Step {currentStepIndex + 1} / {steps.length}
            </span>
        </div>
        <p className="text-lg font-medium text-foreground text-center">
            {currentStep.description}
        </p>
      </div>
    </div>
  );
}
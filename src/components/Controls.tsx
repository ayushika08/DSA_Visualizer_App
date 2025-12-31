"use client";

import React from 'react';
import { useAlgorithm } from '@/context/AlgorithmContext';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function Controls() {
  const { isPlaying, setIsPlaying, resetArray, speed, setSpeed } = useAlgorithm();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-card border rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>
        <button
          onClick={resetArray}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          title="Reset / Generate New Array"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Speed</span>
        <input
          type="range"
          min="50"
          max="1000"
          step="50"
          value={1050 - speed} // Invert so right is faster (smaller delay)
          onChange={(e) => setSpeed(1050 - Number(e.target.value))}
          className="w-full sm:w-48 h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>
    </div>
  );
}
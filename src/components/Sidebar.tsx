"use client";

import React, { useState } from 'react';
import { useAlgorithm, AlgorithmType } from '@/context/AlgorithmContext';
import { cn } from '@/lib/utils';
import { 
  BarChart3, ArrowRightLeft, GitMerge, List, Search, 
  Database, Share2, Network, FolderTree, Layers, ChevronDown, ChevronRight 
} from 'lucide-react';

type Category = {
  title: string;
  items: { id: AlgorithmType; label: string; icon: React.ReactNode }[];
};

export default function Sidebar() {
  const { selectedAlgorithm, setSelectedAlgorithm } = useAlgorithm();
  const [openCategories, setOpenCategories] = useState<string[]>(['Sorting', 'Data Structures', 'Graphs & Trees', 'Recursion']);

  const toggleCategory = (title: string) => {
    setOpenCategories(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const categories: Category[] = [
    {
      title: "Sorting",
      items: [
        { id: 'bubble-sort', label: 'Bubble Sort', icon: <BarChart3 className="w-4 h-4" /> },
        { id: 'selection-sort', label: 'Selection Sort', icon: <Search className="w-4 h-4" /> },
        { id: 'insertion-sort', label: 'Insertion Sort', icon: <ArrowRightLeft className="w-4 h-4" /> },
        { id: 'merge-sort', label: 'Merge Sort', icon: <GitMerge className="w-4 h-4" /> },
        { id: 'quick-sort', label: 'Quick Sort', icon: <BarChart3 className="w-4 h-4" /> },
      ]
    },
    {
      title: "Data Structures",
      items: [
        { id: 'linked-list', label: 'Linked List', icon: <List className="w-4 h-4" /> },
        { id: 'hash-map', label: 'HashMap', icon: <Database className="w-4 h-4" /> },
        { id: 'hash-set', label: 'HashSet', icon: <Database className="w-4 h-4" /> },
      ]
    },
    {
      title: "Graphs & Trees",
      items: [
        { id: 'bst', label: 'Binary Search Tree', icon: <FolderTree className="w-4 h-4" /> },
        { id: 'tree-traversal', label: 'Tree Traversal', icon: <FolderTree className="w-4 h-4" /> },
        { id: 'graph-bfs', label: 'Graph BFS', icon: <Share2 className="w-4 h-4" /> },
        { id: 'graph-dfs', label: 'Graph DFS', icon: <Network className="w-4 h-4" /> },
      ]
    },
    {
      title: "Recursion",
      items: [
        { id: 'recursion-factorial', label: 'Factorial Stack', icon: <Layers className="w-4 h-4" /> },
      ]
    }
  ];

  return (
    <aside className="w-64 border-r border-border bg-card text-card-foreground h-screen flex flex-col overflow-hidden">
      <div className="p-6 border-b border-border bg-card z-10">
        <h1 className="text-xl font-bold tracking-tight text-primary">DSA Visualizer</h1>
        <p className="text-sm text-muted-foreground mt-1">Java Concepts</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {categories.map((category) => (
          <div key={category.title} className="mb-2">
            <button 
              onClick={() => toggleCategory(category.title)}
              className="flex items-center justify-between w-full px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
            >
              {category.title}
              {openCategories.includes(category.title) ? 
                <ChevronDown className="w-3 h-3" /> : 
                <ChevronRight className="w-3 h-3" />
              }
            </button>
            
            {openCategories.includes(category.title) && (
              <div className="mt-1 space-y-1 pl-2 border-l border-border/50 ml-2">
                {category.items.map((algo) => (
                  <button
                    key={algo.id}
                    onClick={() => setSelectedAlgorithm(algo.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                      selectedAlgorithm === algo.id
                        ? "bg-primary text-primary-foreground shadow-sm translate-x-1"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground hover:translate-x-1"
                    )}
                  >
                    {algo.icon}
                    {algo.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      
      <div className="p-4 border-t border-border text-xs text-center text-muted-foreground bg-card z-10">
        <p>Interactive Learning v1.1</p>
      </div>
    </aside>
  );
}
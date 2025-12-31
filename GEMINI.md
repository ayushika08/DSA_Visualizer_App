# DSA Visualizer App

A modern, interactive web application built with Next.js 16 and TypeScript to visualize various Data Structures and Algorithms. The project uses a "Step Generation" pattern to decouple the algorithm logic from the visualization UI.

## 🏗️ Architecture & Core Concepts

### 1. Step Generation Pattern
The core architectural decision is to **pre-calculate all visualization steps** before animation begins.
*   **Algorithms:** Located in `src/lib/`. They do not modify state directly. Instead, they return an array of `Step` objects.
*   **Step Object:** A snapshot of the data structure's state at a specific moment (e.g., "comparing indices 0 and 1", "swapping indices 2 and 3").
*   **Visualizer:** Located in `src/components/Visualizer.tsx`. It takes the array of steps and replays them one by one using a timer.

### 2. State Management
Global state is managed via React Context in `src/context/AlgorithmContext.tsx`.
*   **Data:** `array` (for sorting), `linkedList` (for DS traversal).
*   **Controls:** `isPlaying`, `speed`, `selectedAlgorithm`.

### 3. Rendering & Animation
*   **Framer Motion:** Used for smooth transitions. Elements use `layoutId` to automatically animate position changes (e.g., swapping bars in a sort).
*   **Tailwind CSS v4:** Used for styling.

## 🛠️ Tech Stack

*   **Framework:** Next.js 16 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v4
*   **Icons:** Lucide React
*   **Animation:** Framer Motion

## 🚀 Building and Running

### Development
```bash
npm run dev
# or
yarn dev
```
Runs the app at `http://localhost:3000`.

### Production Build
```bash
npm run build
npm start
```

## 📂 Key Directory Structure

*   `src/app/` - Next.js App Router pages and layouts.
*   `src/components/` - React components (`Visualizer`, `Controls`, `Sidebar`, etc.).
*   `src/context/` - `AlgorithmContext` for global state.
*   `src/lib/` - Algorithm implementations (`sortingAlgorithms.ts`, `dataStructureAlgorithms.ts`).
*   `src/types.ts` - TypeScript definitions for `Step`, `SortStep`, `DS_Step`.

## 🤝 Contribution Guidelines

### How to Add a New Algorithm

1.  **Define the Logic:**
    *   Create a new generator function in `src/lib/sortingAlgorithms.ts` (or a new file).
    *   It must accept the initial data and return `SortStep[]` or `DS_Step[]`.
    *   *Tip:* Copy an existing function like `generateBubbleSortSteps` as a template.

2.  **Register the Algorithm:**
    *   Add the algorithm name to the `AlgorithmType` union in `src/context/AlgorithmContext.tsx`.
    *   Add the algorithm to the `algorithms` list in `src/components/Sidebar.tsx` (or wherever the selection UI is).

3.  **Connect to Visualizer:**
    *   Import your generator in `src/components/Visualizer.tsx`.
    *   Add a case to the `switch (selectedAlgorithm)` statement inside the `useEffect` to call your generator.

4.  **Update UI (If needed):**
    *   If your algorithm requires a unique visualization (like a Tree or Graph) that isn't covered by the existing Array or Linked List renderers, you will need to add a new rendering block in `Visualizer.tsx`.

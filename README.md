# DSA Visualizer App

A modern, interactive web application built with **Next.js** and **TypeScript** to visualize various Data Structures and Algorithms. This tool is designed to help students and developers understand how algorithms work under the hood through dynamic animations and detailed explanations.

![Project Preview](public/window.svg)

## 🚀 Features

### 🔢 Sorting Algorithms
Visualize step-by-step execution of popular sorting algorithms:
- **Bubble Sort**: Watch elements "bubble" up to their correct positions.
- **Selection Sort**: See how the minimum element is selected and placed.
- **Insertion Sort**: Visualize building the sorted array one item at a time.
- **Merge Sort**: Understand the "Divide and Conquer" strategy.
- **Quick Sort**: Visualize partitioning and recursive sorting.

### 🔗 Data Structures
- **Linked Lists**:
  - **Traversal**: Step through each node in the list.
  - **Search**: Visualize the linear search process to find a target value.

### 🎛️ Interactive Controls
- **Play/Pause**: Control the flow of the visualization.
- **Speed Control**: Adjust the animation speed to your preference.
- **Array Size**: Change the number of elements to sort.
- **Randomize**: Generate new random datasets instantly.

### 📚 Theory & Analysis
- **Real-time Descriptions**: See exactly what the algorithm is doing at each step (e.g., "Compare 5 and 3", "Swap elements").
- **Complexity Analysis**: View Big-O notation for Time (Best, Average, Worst) and Space complexity for each algorithm.
- **Mechanism Explanations**: Brief summaries of how the selected algorithm operates.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ayushika08/DSA_Visualizer_App.git
    cd DSA_Visualizer_App
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## 🤝 Contributing

Contributions are welcome! If you'd like to add more algorithms (e.g., Heap Sort, Dijkstra's, BFS/DFS) or improve the UI:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
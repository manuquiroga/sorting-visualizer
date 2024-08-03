import React, { useState } from "react";
import "./SortingVisualizer.css";
import { visualizeMergeSort, cancelMergeSort, resetCancelFlag as resetMergeSortFlag } from "../SortingAlgorithms/mergeSort";
import { visualizeBubbleSort, cancelBubbleSort, resetCancelFlag as resetBubbleSortFlag } from "../SortingAlgorithms/bubbleSort";
import { visualizeQuickSort, cancelQuickSort, resetCancelFlag as resetQuickSortFlag } from "../SortingAlgorithms/quickSort";
import { visualizeHeapSort, cancelHeapSort, resetCancelFlag as resetHeapSortFlag } from "../SortingAlgorithms/heapSort";
import { Play, RefreshCw } from "lucide-react";

export const PRIMARY_COLOR = "rgb(75 85 99)";
export const SECONDARY_COLOR = "rgb(234 179 8)";

const SortingVisualizer = () => {
  const [elements, setElements] = useState(generateRandomElements(50));
  const [selectedSort, setSelectedSort] = useState("mergeSort");
  const [isSorting, setIsSorting] = useState(false);
  const animationSpeed = 25;

  function generateRandomElements(count) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 100 + 1));
  }

  const barWidth = `calc(100% / ${elements.length}) `;

  const handleSort = async () => {
    if (isSorting) return;

    setIsSorting(true);
    resetMergeSortFlag();
    resetQuickSortFlag();
    resetBubbleSortFlag();
    resetHeapSortFlag();

    switch (selectedSort) {
      case "mergeSort":
        await visualizeMergeSort(elements, animationSpeed);
        break;
      case "bubbleSort":
        await visualizeBubbleSort(elements, animationSpeed);
        break;
      case "quickSort":
        await visualizeQuickSort(elements, animationSpeed);
        break;
      case "heapSort":
        await visualizeHeapSort(elements, animationSpeed);
        break;
      default:
        alert("Please select a sorting algorithm");
        setIsSorting(false);
        return;
    }

    setIsSorting(false);
  };

  const handleReset = () => {
    if (isSorting) {
      switch (selectedSort) {
        case "mergeSort":
          cancelMergeSort();
          break;
        case "quickSort":
          cancelQuickSort();
          break;
        case "bubbleSort":
          cancelBubbleSort();
          break;
        case "heapSort":
          cancelHeapSort();
          break;

        default:
          break;
      }
      setIsSorting(false);
    }
    setElements(generateRandomElements(elements.length));
  };

  return (
    <div className="min-h-screen pt-6 transition-colors duration-300 bg-stone-950 text-white">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center mb-6">
          <div className="flex items-center space-x-4">
            <button
              className="p-3 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
              onClick={handleSort}
              disabled={isSorting}
            >
              <Play size={24} />
            </button>

            <button className="p-3 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors" onClick={handleReset}>
              <RefreshCw size={24} />
            </button>

            <div className="flex flex-col">
              <span className="text-sm opacity-70">Number of elements: {elements.length}</span>
              <input
                type="range"
                min="10"
                max="250"
                value={elements.length}
                onChange={(e) => setElements(generateRandomElements(parseInt(e.target.value)))}
                className="w-48 accent-yellow-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm opacity-80">Algorithm:</span>
            <select
              value={selectedSort}
              disabled={isSorting}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="px-1 rounded bg-stone-900 border border-stone-800 focus:outline-none text-white"
            >
              <option value="mergeSort">Merge Sort</option>
              <option value="bubbleSort">Bubble Sort</option>
              <option value="quickSort">Quick Sort</option>
              <option value="heapSort">Heap Sort</option>
            </select>
          </div>
        </div>
        <div className="h-[80dvh] flex items-end bg-gradient-to-r rounded-lg pt-6 ">
          {elements.map((height, index) => (
            <div
              key={index}
              style={{ height: `${height}%`, width: barWidth, boxShadow: "inset 1px 0 10px rgba(0, 0, 0, 0.5)", backgroundColor: PRIMARY_COLOR }}
              className="bar"
            ></div>
          ))}
        </div>
      </div>

      <footer className="text-sm font-medium text-gray-500 pt-12 pb-1">
        Built by{" "}
        <a href="https://manuquiroga.vercel.app " className="underline">
          manuquiroga
        </a>
      </footer>
    </div>
  );
};

export default SortingVisualizer;

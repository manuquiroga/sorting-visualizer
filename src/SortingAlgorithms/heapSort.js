import { playSound } from "../SortingVisualizer/playSound.js";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../SortingVisualizer/SortingVisualizer.jsx";

let cancelSort = false;

export const visualizeHeapSort = async (array, ANIMATION_SPEED_MS) => {
  const arrayBars = document.getElementsByClassName("bar");
  const n = array.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (cancelSort) return;
    await heapify(array, n, i, arrayBars, ANIMATION_SPEED_MS);
  }

  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    if (cancelSort) return;
    await swap(array, 0, i, arrayBars, ANIMATION_SPEED_MS);
    arrayBars[i].style.backgroundColor = SECONDARY_COLOR;
    await sleep(ANIMATION_SPEED_MS);

    await heapify(array, i, 0, arrayBars, ANIMATION_SPEED_MS);

    // Reset color
    arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
  }
};

const heapify = async (array, n, i, arrayBars, ANIMATION_SPEED_MS) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // Compare with left child
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }

  // Compare with right child
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    if (cancelSort) return;
    await swap(array, i, largest, arrayBars, ANIMATION_SPEED_MS);
    arrayBars[largest].style.backgroundColor = SECONDARY_COLOR;
    await sleep(ANIMATION_SPEED_MS);

    await heapify(array, n, largest, arrayBars, ANIMATION_SPEED_MS);

    // Reset color
    arrayBars[largest].style.backgroundColor = PRIMARY_COLOR;
  }
};

const swap = async (array, i, j, arrayBars, ANIMATION_SPEED_MS) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;

  // Update height
  arrayBars[i].style.height = `${array[i]}%`;
  arrayBars[j].style.height = `${array[j]}%`;

  playSound(array[i] * 3 + 200);

  await sleep(ANIMATION_SPEED_MS);
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const cancelHeapSort = () => {
  cancelSort = true;
};

export const resetCancelFlag = () => {
  cancelSort = false;
};

import { playSound } from "../SortingVisualizer/playSound.js";
import { PRIMARY_COLOR, SECONDARY_COLOR, enableButtons } from "../SortingVisualizer/SortingVisualizer.jsx";

export const visualizeQuickSort = async (array, ANIMATION_SPEED_MS) => {
  const arrayBars = document.getElementsByClassName("bar");
  await quickSort(array, 0, array.length - 1, arrayBars, ANIMATION_SPEED_MS);
  enableButtons();
};

const quickSort = async (array, low, high, arrayBars, ANIMATION_SPEED_MS) => {
  if (low < high) {
    const partitionIndex = await partition(array, low, high, arrayBars, ANIMATION_SPEED_MS);

    await quickSort(array, low, partitionIndex - 1, arrayBars, ANIMATION_SPEED_MS);
    await quickSort(array, partitionIndex + 1, high, arrayBars, ANIMATION_SPEED_MS);
  }
};

const partition = async (array, low, high, arrayBars, ANIMATION_SPEED_MS) => {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    // Color of compared bars
    arrayBars[j].style.backgroundColor = SECONDARY_COLOR;
    arrayBars[high].style.backgroundColor = SECONDARY_COLOR;
    await sleep(ANIMATION_SPEED_MS);

    if (array[j] < pivot) {
      i++;
      await swap(array, i, j, arrayBars, ANIMATION_SPEED_MS);
    }

    // Reset color
    arrayBars[j].style.backgroundColor = PRIMARY_COLOR;
    arrayBars[high].style.backgroundColor = PRIMARY_COLOR;
  }

  await swap(array, i + 1, high, arrayBars, ANIMATION_SPEED_MS);

  return i + 1;
};

const swap = async (array, i, j, arrayBars, ANIMATION_SPEED_MS) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;

  // Update height
  arrayBars[i].style.height = `${array[i]}px`;
  arrayBars[j].style.height = `${array[j]}px`;

  playSound(array[i] + 90);

  await sleep(ANIMATION_SPEED_MS);
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

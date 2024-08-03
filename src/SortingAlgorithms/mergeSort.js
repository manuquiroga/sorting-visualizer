import { playSound } from "../SortingVisualizer/playSound.js";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../SortingVisualizer/SortingVisualizer.jsx";

let cancelSort = false;

export const visualizeMergeSort = async (array, ANIMATION_SPEED_MS) => {
  const arrayBars = document.getElementsByClassName("bar");
  await mergeSort(array, 0, array.length - 1, arrayBars, ANIMATION_SPEED_MS);
};

const mergeSort = async (array, start, end, arrayBars, ANIMATION_SPEED_MS) => {
  if (cancelSort) return;
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    await mergeSort(array, start, mid, arrayBars, ANIMATION_SPEED_MS);
    await mergeSort(array, mid + 1, end, arrayBars, ANIMATION_SPEED_MS);
    await merge(array, start, mid, end, arrayBars, ANIMATION_SPEED_MS);
  }
};

const merge = async (array, start, mid, end, arrayBars, ANIMATION_SPEED_MS) => {
  if (cancelSort) return;

  const tempArray = [];

  let i = start;
  let j = mid + 1;
  let k = 0;

  while (i <= mid && j <= end) {
    if (cancelSort) return;

    // Reset color
    for (let p = start; p <= end; p++) {
      arrayBars[p].style.backgroundColor = PRIMARY_COLOR;
    }

    // Red color
    arrayBars[i].style.backgroundColor = SECONDARY_COLOR;
    arrayBars[j].style.backgroundColor = SECONDARY_COLOR;
    await sleep(ANIMATION_SPEED_MS);

    if (array[i] <= array[j]) {
      tempArray[k++] = array[i++];
    } else {
      tempArray[k++] = array[j++];
    }
  }

  while (i <= mid) {
    tempArray[k++] = array[i++];
  }

  while (j <= end) {
    tempArray[k++] = array[j++];
  }

  for (let p = 0; p < k; p++) {
    if (cancelSort) return;

    array[start + p] = tempArray[p];

    // Update height
    arrayBars[start + p].style.height = `${array[start + p]}%`;
    playSound(array[start + p] * 5 + 150);

    // Color
    arrayBars[start + p].style.backgroundColor = PRIMARY_COLOR;
    await sleep(ANIMATION_SPEED_MS);
  }
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const cancelMergeSort = () => {
  cancelSort = true;
};

export const resetCancelFlag = () => {
  cancelSort = false;
};

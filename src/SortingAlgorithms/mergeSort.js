import { playSound } from '../SortingVisualizer/playSound.js';
import { PRIMARY_COLOR, SECONDARY_COLOR, enableButtons } from '../SortingVisualizer/SortingVisualizer.jsx';

export const visualizeMergeSort = async (array, ANIMATION_SPEED_MS) => {
  const arrayBars = document.getElementsByClassName('bar');
  await mergeSort(array, 0, array.length - 1, arrayBars, ANIMATION_SPEED_MS);
  enableButtons();
};

const mergeSort = async (array, start, end, arrayBars, ANIMATION_SPEED_MS) => {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    await mergeSort(array, start, mid, arrayBars, ANIMATION_SPEED_MS);
    await mergeSort(array, mid + 1, end, arrayBars, ANIMATION_SPEED_MS);
    await merge(array, start, mid, end, arrayBars, ANIMATION_SPEED_MS);
  }
};

const merge = async (array, start, mid, end, arrayBars, ANIMATION_SPEED_MS) => {
  const tempArray = [];

  let i = start;
  let j = mid + 1;
  let k = 0;

  while (i <= mid && j <= end) {
    // reset color
    for (let p = start; p <= end; p++) {
      arrayBars[p].style.backgroundColor = PRIMARY_COLOR;
    }

    //compare bars color
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
    array[start + p] = tempArray[p];

    // updt height
    arrayBars[start + p].style.height = `${array[start + p]}px`;
    playSound(array[start + p] + 90);

    arrayBars[start + p].style.backgroundColor = PRIMARY_COLOR;
    await sleep(ANIMATION_SPEED_MS);
  }
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};








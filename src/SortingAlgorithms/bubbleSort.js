import { PRIMARY_COLOR, SECONDARY_COLOR } from "../SortingVisualizer/SortingVisualizer";
import { playSound } from "../SortingVisualizer/playSound.js";

let cancelSort = false;

export const visualizeBubbleSort = async (array, ANIMATION_SPEED_MS) => {
  const arrayBars = document.getElementsByClassName("bar");
  console.log(array);

  for (let i = 0; i < array.length - 1; i++) {
    if (cancelSort) return;

    for (let j = 0; j < array.length - i - 1; j++) {
      if (cancelSort) return;

      arrayBars[j].style.backgroundColor = SECONDARY_COLOR;
      arrayBars[j + 1].style.backgroundColor = SECONDARY_COLOR;
      await sleep(ANIMATION_SPEED_MS);

      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        arrayBars[j].style.height = `${array[j]}%`;
        arrayBars[j + 1].style.height = `${array[j + 1]}%`;

        playSound(array[j] * 3 + 200);
      }

      arrayBars[j].style.backgroundColor = PRIMARY_COLOR;
      arrayBars[j + 1].style.backgroundColor = PRIMARY_COLOR;
    }
  }
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const cancelBubbleSort = () => {
  cancelSort = true;
};

export const resetCancelFlag = () => {
  cancelSort = false;
};

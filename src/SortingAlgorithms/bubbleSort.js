import { PRIMARY_COLOR, SECONDARY_COLOR } from "../SortingVisualizer/SortingVisualizer";
import { playSound } from "../SortingVisualizer/playSound.js";

export const visualizeBubbleSort = async (array, ANIMATION_SPEED_MS) => {
    const arrayBars = document.getElementsByClassName('bar');

    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        // color of compared bars
        arrayBars[j].style.backgroundColor = SECONDARY_COLOR;
        arrayBars[j + 1].style.backgroundColor = SECONDARY_COLOR;
        await sleep(ANIMATION_SPEED_MS);
        playSound(array[j]+ 20);

        if (array[j] > array[j + 1]) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;

          //updatin height
          arrayBars[j].style.height = `${array[j]}px`;
          arrayBars[j + 1].style.height = `${array[j + 1]}px`;
        }

        //reset color
        arrayBars[j].style.backgroundColor = PRIMARY_COLOR;
        arrayBars[j + 1].style.backgroundColor = PRIMARY_COLOR;
      }
    }
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  
  
  
  
  
  


import React, {useState, useEffect} from 'react';
import './SortingVisualizer.css';
import {visualizeMergeSort} from '../SortingAlgorithms/mergeSort';
import {visualizeBubbleSort} from '../SortingAlgorithms/bubbleSort';
import {visualizeQuickSort} from '../SortingAlgorithms/quickSort';
import {visualizeHeapSort} from '../SortingAlgorithms/heapSort';

const HEIGHT_OF_BARS = 650;

const NUMBER_OF_BARS = 250;

export const PRIMARY_COLOR = '#61ddffd8';

export const SECONDARY_COLOR = '#ff6b6b';

export const SORTED_COLOR = '#55c989';

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [animationSpeed , setAnimationSpeed] = useState(10);

    useEffect(() => {
        resetArray(NUMBER_OF_BARS);
    }, []);
    
    const resetArray = (bars) => {
        const newArray = [];    
        for(let i = 0; i < bars; i++){
            newArray.push(randomIntFromInterval(5, HEIGHT_OF_BARS));
        }
        setArray(newArray);
    };

    const mergeSort = () => {
        disableButtons();
        visualizeMergeSort(array, animationSpeed);
    };

    const bubbleSort = () => {
        disableButtons();
        visualizeBubbleSort(array, animationSpeed);      
    };

    const quickSort = () => {
        disableButtons();
        visualizeQuickSort(array, animationSpeed);
    };

    const heapSort = () => {
        disableButtons();
        visualizeHeapSort(array, animationSpeed);
    };

    return (
      <div>
        <nav>
          <div className="new-array-button">
            <button className="enable" onClick={() => resetArray(NUMBER_OF_BARS)}>
              New Array
            </button>
          </div>
          <div className="speed-box">
            <label>Animation ms</label>
            <input
              className="speed-input enable"
              type="range"
              min="0"
              max="100"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(e.target.value)}
            ></input>
          </div>
          <div className="sorting-buttons ">
            <button className="enable" onClick={() => mergeSort()}>
              Merge Sort
            </button>
            <button className="enable" onClick={() => bubbleSort()}>
              Bubble Sort
            </button>
            <button className="enable" onClick={() => quickSort()}>
              Quick Sort
            </button>
            <button className="enable" onClick={() => heapSort()}>
              Heap Sort
            </button>
          </div>
        </nav>
        <div className="box">
          {array.map((value, key) => (
            <div className="bar" key={key} style={{ height: `${value}px` }}></div>
          ))}
        </div>
      </div>
    );
}

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const disableButtons = () => {
    const buttons = document.getElementsByClassName('enable');
    for(let i = 0; i < buttons.length; i++){
        buttons[i].disabled = true;
    }
};

export const enableButtons = () => {
    const buttons = document.getElementsByClassName('enable');
    for(let i = 0; i < buttons.length; i++){
        buttons[i].disabled = false;
    }
};

export default SortingVisualizer;


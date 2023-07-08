import React, {useState, useEffect} from 'react';
import './SortingVisualizer.css';
import {visualizeMergeSort} from '../SortingAlgorithms/mergeSort';
import {visualizeBubbleSort} from '../SortingAlgorithms/bubbleSort';

const HEIGHT_OF_BARS = 750;

const NUMBER_OF_BARS = 80;

const ANIMATION_SPEED_MS = 10;

export const PRIMARY_COLOR = '#61ddffd8';

export const SECONDARY_COLOR = '#ff6b6b';

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);

    useEffect(() => {
        resetArray();
    }, []);
    
    const resetArray = () => {
        const newArray = [];    
        for(let i = 0; i < NUMBER_OF_BARS; i++){
            newArray.push(randomIntFromInterval(5, HEIGHT_OF_BARS));
        }
        setArray(newArray);
    };

    const mergeSort = () => {
        visualizeMergeSort(array, ANIMATION_SPEED_MS);
    };

    const bubbleSort = () => {
        visualizeBubbleSort(array, ANIMATION_SPEED_MS);
    };

    return(
        <div>
            <nav>
                <div className="new-array-button">
                    <button onClick={() => resetArray()}>New Array</button>
                </div>
                <div className="sorting-buttons">
                    <button onClick={() => mergeSort()}>Merge Sort</button>
                    <button onClick={() => bubbleSort()}>Bubble Sort</button>
                    <button >Quick Sort</button>
                    <button >Heap Sort</button>
                </div>
            </nav>
            <div className='box'>
                <div className='container'>
                    {array.map((value, key) => (
                        <div className="bar" key={key} style={{height: `${value}px`}}></div>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;


import React, {useState, useEffect} from 'react';
import './SortingVisualizer.css';
import {visualizeMergeSort} from '../SortingAlgorithms/mergeSort';
import {visualizeBubbleSort} from '../SortingAlgorithms/bubbleSort';

const HEIGHT_OF_BARS = 750;

const NUMBER_OF_BARS = 80;

export const PRIMARY_COLOR = '#61ddffd8';

export const SECONDARY_COLOR = '#ff6b6b';

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [animationSpeed , setAnimationSpeed] = useState(10);

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
        visualizeMergeSort(array, animationSpeed);
    };

    const bubbleSort = () => {
        visualizeBubbleSort(array, animationSpeed);
    };

    return(
        <div>
            <nav>
                <div className="new-array-button">
                    <button onClick={() => resetArray()}>New Array</button>
                </div>
                <div className='speed-box'>
                    <label>Animation ms</label>
                    <input className='speed-input' type="range" min="5" max="100" value={animationSpeed} onChange={(e) => setAnimationSpeed(e.target.value)}></input>
                </div>
                <div className="sorting-buttons">
                    <button onClick={() => mergeSort()}>Merge Sort</button>
                    <button onClick={() => bubbleSort()}>Bubble Sort</button>
                    <button >todo: Quick Sort</button>
                    <button >todo: Heap Sort</button>
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


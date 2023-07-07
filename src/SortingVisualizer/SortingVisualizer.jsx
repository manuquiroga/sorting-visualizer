import React, {useState, useEffect} from 'react';
import './SortingVisualizer.css';
import {mergeSort, quickSort, heapSort, bubbleSort} from './SortingAlgorithms.js';

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    
    useEffect(() => {
        resetArray();
    }, []);
    
    const resetArray = () => {
        const newArray = [];    
        for(let i = 0; i < 80; i++){
            newArray.push(randomIntFromInterval(5, 750));
        }
        setArray(newArray);
    }

    return(
        <div>
            <nav>
                <div className="new-array-button">
                    <button onClick={() => resetArray()}>New Array</button>
                </div>
                <div className="sorting-buttons">
                    <button onClick={() => mergeSort()}>Merge Sort</button>
                    <button onClick={() => quickSort()}>Quick Sort</button>
                    <button onClick={() => heapSort()}>Heap Sort</button>
                    <button onClick={() => bubbleSort()}>Bubble Sort</button>
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

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;


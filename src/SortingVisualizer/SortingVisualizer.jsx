import React, {useState, useEffect} from 'react';
import './SortingVisualizer.css';
import {visualizeMergeSort} from '../SortingAlgorithms/mergeSort';

const ANIMATION_SPEED_MS = 10;

const NUMBER_OF_ARRAY_BARS = 750;

const PRIMARY_COLOR = '#61ddffd8';

const SECONDARY_COLOR = '#ff6b6b';

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    
    useEffect(() => {
        resetArray();
    }, []);
    
    const resetArray = () => {
        const newArray = [];    
        for(let i = 0; i < 80; i++){
            newArray.push(randomIntFromInterval(5, NUMBER_OF_ARRAY_BARS));
        }
        setArray(newArray);
    }

    return(
        <div>
            <nav>
                <div className="new-array-button">
                    <button onClick={resetArray}>New Array</button>
                </div>
                <div className="sorting-buttons">
                    <button onClick={() => visualizeMergeSort(array, ANIMATION_SPEED_MS)}>Merge Sort</button> 
                    <button >Quick Sort</button>
                    <button >Heap Sort</button>
                    <button >Bubble Sort</button>
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


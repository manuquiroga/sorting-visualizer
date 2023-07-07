import React, {useState, useEffect} from 'react';
import './SortingVisualizer.css';
import {mergeSort} from '../SortingAlgorithms/mergeSort';

const ANIMATION_SPEED_MS = 10;

const NUMBER_OF_ARRAY_BARS = 750;

const PRIMARY_COLOR = '#61ddffd8';

const SECONDARY_COLOR = '#ff6b6b';

let audioCtx = null;

const playNote = (freq) => {
    if(audioCtx === null){
        audioCtx = new (AudioContext || window.webkitAudioContext)();
    }
    const duration = 0.1;
    const osc = audioCtx.createOscillator();
    
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime + duration);

    const node = audioCtx.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(
        0, audioCtx.currentTime + duration
    );
    osc.connect(node);
    node.connect(audioCtx.destination);
}

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

    const visualizeMergeSort = () => {
        const animations = mergeSort(array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('bar');

          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;

              playNote(newHeight + 100);
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }

    return(
        <div>
            <nav>
                <div className="new-array-button">
                    <button onClick={resetArray}>New Array</button>
                </div>
                <div className="sorting-buttons">
                    <button onClick={visualizeMergeSort}>Merge Sort</button> 
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


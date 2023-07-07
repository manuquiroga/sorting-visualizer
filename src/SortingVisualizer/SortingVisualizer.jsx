import React from 'react';
import './SortingVisualizer.css';

export class SortingVisualizer extends React.Component {
    constructor(){
        super();
        this.state = {
            array: [],
        };
    }

    mergeSort(){

    }

    quickSort(){

    }

    heapSort(){

    }

    bubbleSort(){

    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];    
        for(let i = 0; i < 100; i++){
            array.push(randomIntFromInterval(5, 800));
        }
        this.setState({array});
    }

    render(){
        const {array} = this.state;

        return (
            <div>
                <nav>
                    <button onClick={() => this.resetArray()}>New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                </nav>
            
                <div className='container'>
                    {array.map((value, key) => (
                        <div className="bar" key={key} style={{height: `${value}px`}}></div>
                    ))}
                    
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;


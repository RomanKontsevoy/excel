import React, {Component} from 'react';
import './App.css';
import Table from './Table';
import {Provider} from 'react-redux';
import Reduxles from './reduxles/reduxles';
import {createStore} from 'redux';
import allReducers from './reducers';
const store = createStore(allReducers);


const countOfSquares = 5;
const countOfRows = 2;



class ControlLine extends Component {
    render() {
        return (
            <input className="ControlLine"
                   placeholder={this.props.placeholder}
                   value={this.props.value}
                   onChange={(e) => this.props.onChange(e)}
                   // onFocus={(e) => this.props.onFocus(e)}
            />
        );
    };
}


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(countOfSquares * countOfRows).fill({
                value: '',
            }),
            focusedSquare: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);

    }

    handleChange(e) {
        e.stopPropagation();
        let squareId = e.target.getAttribute('data-square-key');
        const squares = this.state.squares.slice();
        // squares[squareId].value = e.target.value; // назначает value не одному, а всем элементам массива
        // Так назначает одному, но перезаписывает элемет польностью, а не одно его свойство:
        squares[squareId] = {
            value: e.target.value,
        };
        this.setState({squares: squares});
    }

    // handleControlChange(n) {
    //     e.stopPropagation();
    //     let squareId = e.target.getAttribute('data-square-key');
    //     const squares = this.state.squares.slice();
    //     // squares[squareId].value = e.target.value; // назначает value не одному, а всем элементам массива
    //     // Так назначает одному, но перезаписывает элемет польностью, а не одно его свойство:
    //     squares[squareId] = {
    //         value: e.target.value,
    //     };
    //     this.setState({squares: squares});
    // }

    handleFocus(e) {
        let squareId = e.target.getAttribute('data-square-key');
        const focusedSquare = this.state.focusedSquare.slice();
        focusedSquare.push(squareId);
        this.setState({focusedSquare: focusedSquare});
    }

    render() {
        console.log(this.state.focusedSquare);
        let focusedSquare = this.state.focusedSquare;

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to Excel on React</h1>
                </header>
                <div className="App-intro">
                    <ControlLine
                        value={this.state.focusedSquare}
                        placeholder="Control"
                        // onChange={this.handleControlChange(this.state.squares[focusedSquare[focusedSquare.length-1]])}
                    />
                    <Table
                        squares={this.state.squares}
                        onChange={(e) => this.handleChange(e)}
                        onFocus={(e) => this.handleFocus(e)}
                    />
                    <Provider store={store}>
                        <Reduxles/>
                    </Provider>
                </div>
            </div>
        );
    }
}

export default App;

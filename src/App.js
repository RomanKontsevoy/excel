import React, {Component} from 'react';
import './App.css';

const countOfSquares = 5;
const countOfRows = 2;

class Square extends Component {
    render() {
        return (
            <input className="Square"
                   data-square-key={this.props.squareKey}
                   value={this.props.value}
                   onChange={(e) => this.props.onChange(e)}
                   onRange={(e) => this.props.onFocus(e)}
            />
        );
    };
}


class Row extends Component {
    renderSquare(s, r, arr) {
        const arrOfSquares = [];
        for (let i = 0; i < s; i++) {
            let squareId = r * countOfSquares + i;
            let square = <Square key={squareId}
                                 squareKey={squareId}
                                 value={arr[squareId].value}
                                 onChange={(e) => this.props.onChange(e)}
                                 onFocus={(e) => this.props.onFocus(e)}
            />;
            squareId += 1;
            arrOfSquares.splice(arrOfSquares.length, 0, square);
        }
        return (
            arrOfSquares
        );
    }

    render() {
        return (
            <div className="Row">
                {this.renderSquare(countOfSquares, this.props.rowKey, this.props.squares)}
            </div>
        );
    };
}

class Table extends Component {
    renderRow(r) {
        const arrOfRows = [];

        for (let i = 0; i < r; i++) {
            let row = <Row key={i}
                           rowKey={i}
                           squares={this.props.squares}
                           onChange={(e) => this.props.onChange(e)}
                           onFocus={(e) => this.props.onFocus(e)}
            />;
            arrOfRows.splice(arrOfRows.length, 0, row);
        }
        return (
            arrOfRows
        );
    }

    render() {
        return (
            <div className="Table"
                 squares={this.props.squares}
                 onChange={(e) => this.props.onChange(e)}
                 onFocus={(e) => this.props.onFocus(e)}
            >
                {this.renderRow(countOfRows)}
            </div>
        );
    }
}

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

                </div>
            </div>
        );
    }
}

export default App;

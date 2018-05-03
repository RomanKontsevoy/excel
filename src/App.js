import React, {Component} from 'react';
import './App.css';

const countOfSquares = 10;
const countOfRows = 2;

class Square extends Component {
    //handleChange(e) {
    //	this.props.onChange(e.target.value);
    //}
    render() {
        return (
            <input className="Square"
				data-square-key={this.props.squareKey}
				value={this.props.value}
				onChange={(e) => this.props.onChange(e)}/>
        );
    };
}
;

class Row extends Component {
    renderSquare(s, r, arr) {
        const arrOfSquares = [];
        for (let i = 0; i < s; i++) {
            let squareId = r*countOfSquares+i;
            let square = <Square key={squareId}
								squareKey={squareId}
                                 value={arr[squareId]}
                                 onChange={(e) => this.props.onChange(e)}
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
            <div className="Row" >
                {this.renderSquare(countOfSquares, this.props.rowKey, this.props.squares)}
            </div>
        );
    };
}

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(countOfSquares*countOfRows).fill(''),
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
		let squareId = e.target.getAttribute('data-square-key');
		// function does not know squares number
        const squares = this.state.squares.slice();
        squares[squareId] = e.target.value;
        this.setState({squares: squares});
    }

    renderRow(r) {
        const arrOfRows = [];
		
        for (let i = 0; i < r; i++) {
            let row = <Row key={i}
                           rowKey={i}
                           squares={this.state.squares}
                           onChange={(e) => this.handleChange(e)}
            />;
            arrOfRows.splice(arrOfRows.length, 0, row);
        }
        return (
            arrOfRows
        );
    }

    render() {
        return (
            <div className="Table" >
                {this.renderRow(countOfRows)}
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to Excel on React</h1>
                </header>
                <div className="App-intro">
					
                    <Table />

                </div>
            </div>
        );
    }
}

export default App;

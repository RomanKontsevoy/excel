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

export default Table;
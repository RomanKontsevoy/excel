import React, { Component } from 'react';
import './App.css';

const countOfSquares = 5;

class Square extends Component {
	//handleChange(e) {
	//	this.props.onChange(e.target.value);
   //}
	render() {
		return (
		  <input className="Square" value={this.props.value} onChange={() => this.props.onChange()} />
		);
    };
};
  
class Row extends Component {
	
	
	constructor(props) {
    super(props);
    this.state = {
			squares: Array(countOfSquares).fill('')
		};
	this.handleChange = this.handleChange.bind(this);	
	}
	handleChange(i, e) {
		const squares = this.state.squares.slice();
		squares[i] = e.target.value;
		this.setState({squares: squares});
		console.log(this.state.squares);
	}
	
	renderSquare(s) {
		const arrOfSquares = [];
		for(let i = 0; i < s; i++) {
			let square = <Square key={"square " + i}
                value={this.state.squares[i]}
                onChange={(e) => this.handleChange(i, e)}
            />;
			arrOfSquares.splice(arrOfSquares.length === 0 ? 0 : arrOfSquares.length-1, 0, square);
		}
        return (
			arrOfSquares
        );
    }
	render() {
		return (
			  <div	className="Row">
				{this.renderSquare(countOfSquares)}
			  </div>
		);
	};
};

class Table extends Component {
	renderRow(r) {
		const arrOfRows = [];
		for(let i = 0; i < r; i++) {
			let row = <Row
                value={i}
                onClick={() => this.props.onClick(i)}
            />;
			arrOfRows.splice(arrOfRows.length-1, 0, row);
		}
        return (
			arrOfRows
        );
    }
	render() {
    return (
      <div	className="Table">
		{this.renderRow(1)}
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
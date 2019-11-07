import React, { Component } from 'react';
import Game from "./Game";
import Wage from "./Wage";
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRolling: false,
      gameOver: false,
      reset: false,
      hasWon: "null"
    }
    this.handleRoll = this.handleRoll.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState(st => ({
      reset: !st.reset,
      gameOver: false,
      hasWon: "null"
    }));
  }

  gameOver(hasWonResult) {
    this.setState(st => ({
      gameOver: !st.gameOver,
      hasWon: hasWonResult
    }));
  }

  handleRoll() {
    this.setState(st => ({
      isRolling: !st.isRolling
    }));
  }

  render() {
    return (
      <div className="Dashboard">
        <div className="Dashboard-display-container">
          <Game handleReset={this.reset} reset={this.state.reset} handlegameOver={this.gameOver} handleRoll={this.handleRoll} isRolling={this.state.isRolling} />
        </div>

        <div className="Dashboard-form-container">
          <Wage isRolling={this.state.isRolling} hasWon={this.state.hasWon} reset={this.reset} handlegameOver={this.state.gameOver} handleRoll={this.handleRoll} />
        </div>
      </div>
    )
  }
}

export default Dashboard;
import React, { Component } from 'react'
import Die from './Die';

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerLocked: [false, false, false, false, false],
      opponentScore: 0,
      rollLeft: 2,
      playerScore: 0,
      playerRoll: [0, 0, 0, 0, 0],
      oppRoll: [0,0,0,0,0],
      oppScore: 0,
      oppLocked: [false, false, false, false, false],
      gameOver: false,
      hasWon: "null"
    }
    this.Roll = this.Roll.bind(this);
    this.oppRoll = this.oppRoll.bind(this)
    this.lockDie = this.lockDie.bind(this)
    this.playAgain = this.playAgain.bind(this)
  }

  playAgain() {
    this.setState({
      playerLocked: [false, false, false, false, false],
      opponentScore: 0,
      rollLeft: 2,
      playerScore: 0,
      playerRoll: [0, 0, 0, 0, 0],
      oppRoll: [0,0,0,0,0],
      oppScore: 0,
      oppLocked: [false, false, false, false, false],
      gameOver: false,
      hasWon: "null"
    })
    this.props.handleReset();
  }

  lockDie(idx) {
    let newLocked = this.state.playerLocked;

    if(this.state.playerLocked[idx] === true)
      newLocked[idx] = false
    else
      newLocked[idx] = true

    this.setState({playerLocked: {...this.state.playerLocked, newLocked}})
  }

  Roll() {
    let sum = 0;
    let roll = [];
    for(let i = 0; i < 5; i++) {
      if(this.state.playerLocked[i] !== true) {
        let num = Math.floor(Math.random() * 6) + 1;
        roll.push(num);
        sum+= num;
      } else {
        roll.push(this.state.playerRoll[i])
        sum+= this.state.playerRoll[i]
      }
    }
    let currRoll = this.state.rollLeft;
    this.setState({playerScore: sum, playerRoll: roll, rollLeft: currRoll - 1 })
    this.oppRoll()
  }

  oppRoll() {
    let newLocked = this.state.oppLocked;

    for(let i =0; i < 5; i++) {
      if(this.state.oppRoll[i] === 5 || this.state.oppRoll[i] === 6)
        newLocked[i] = true
      else
        newLocked[i] = false
    }

    this.setState({oppLocked: {...this.state.oppLocked, newLocked}})

    let sum = 0;
    let roll = [];
    for(let i = 0; i < 5; i++) {
      if(this.state.oppLocked[i] !== true) {
        let num = Math.floor(Math.random() * 6) + 1;
        roll.push(num);
        sum+= num;
      } else {
        roll.push(this.state.oppRoll[i])
        sum+= this.state.oppRoll[i]
      }
    }
    this.setState({oppScore: sum, oppRoll: roll })
  }


  render() {
    let displayRoll = 
    this.state.playerRoll.map((die, i) => 
      <Die player face={die} key={i} idx={i} locked={this.state.playerLocked[i]} lockDie={this.lockDie} />
    )
    let displayRollOpp = 
    this.state.oppRoll.map((die, i) => 
      <Die face={die} key={i} idx={i} locked={this.state.oppLocked[i]} lockDie={this.lockDie} />
    )

    if(this.props.isRolling) {
      this.Roll()
      this.props.handleRoll()
    }

    if(this.state.rollLeft <= 0 && !this.state.gameOver) {
      let result;
      if(this.state.playerScore > this.state.oppScore) {
        result = "WIN";
      } else if (this.state.playerScore === this.state.oppScore) {
        result = "TIE"
      } else {
        result= "LOSE"
      }

      this.setState({gameOver: true, hasWon: result})
      this.props.handlegameOver(result)
    }

    if(this.props.reset && this.state.gameOver)
      this.playAgain()

    return (
      <div>
        <div className="Dashboard-display">
          {displayRollOpp}
        </div>
        
        <div className="Dashboard-score-container">
          <div className="Dashboard-score">
            <div className="Dashboard-center">
              <h3>{this.state.oppScore}</h3>
              <h3>{this.state.playerScore}</h3>
            </div>
          </div>
        </div>

        <div className="Dashboard-display">
          {displayRoll}
        </div>
      </div>
    )
  }
}
export default Game;
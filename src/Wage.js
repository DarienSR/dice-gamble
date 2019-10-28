import React, { Component } from 'react';
import "./Wage.css";

class Wage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wallet: 300,
      bid: 0,
      rollLeft: 2,
      doubleDown: false
    }
    this.handleRoll = this.handleRoll.bind(this)
    this.increaseBid = this.increaseBid.bind(this)
    this.decreaseBid = this.decreaseBid.bind(this)
    this.doubleDown = this.doubleDown.bind(this)
    this.handlegameOver = this.handlegameOver.bind(this)
  }
  
  doubleDown() {
    if(!this.state.doubleDown) {
      this.setState(st => ({
        bid: st.bid * 2,
        doubleDown: true
      }));
    } 
  }

  handleRoll() {
    let roll = this.state.rollLeft - 1;
    this.setState({rollLeft: roll})
    this.props.handleRoll()
  }

  handlegameOver() {
    let winnings;
    if(this.props.hasWon === "WIN") {
      winnings = this.state.bid + this.state.wallet;
    } else if(this.props.hasWon === "LOSE") {
      winnings = this.state.wallet - this.state.bid;
    } else {
      winnings = this.state.wallet
    }

    this.setState({wallet: winnings, rollLeft: 2, doubleDown: false});
    
    if(this.state.wallet <= 0){
      alert("We've noticed you're in debt. Let us help you out with that.")
      this.setState({wallet: 150, bid: 0})
    }
    this.props.reset();
  }

  increaseBid() {
    if(this.state.bid >= this.state.wallet) return
    let newBid = this.state.bid + 10
    this.setState({bid: newBid})
  }

  decreaseBid() {
    if(this.state.bid === 0) return
    let newBid = this.state.bid - 10
    this.setState({bid: newBid})
  }

  render() {
    let displayBtn;
    if(this.props.handlegameOver)
      displayBtn = <button onClick={this.handlegameOver}>Play Again</button>
    else
      displayBtn = <button onClick={this.handleRoll}>Roll</button>

     let gameStarted = false;
     if(this.state.rollLeft === 1) gameStarted = true;

    let doubleDownStyle = {
      color: '#889b73'
    }

    return (
      <div className="Wage">
        <h2 className="Wage-controls">Controls</h2>
        <div className="Wage-options">
          <p><strong>Wallet:</strong> {this.state.wallet}</p>
         <div className="Wage-bid">
          <p><strong>Current Bid:</strong> {this.state.bid}</p>
          <button disabled={gameStarted} onClick={this.increaseBid}>+</button>
          <button disabled={gameStarted} onClick={this.decreaseBid}>-</button>
          {gameStarted ? <button style={this.state.doubleDown ? doubleDownStyle : null} onClick={this.doubleDown} title="Double Down" className="Wage-double">2x</button> : null}
         </div>
         <h4>Rolls Left: {this.state.rollLeft}</h4>
        </div>

        {this.props.handlegameOver ? 
        <div className="Wage-gameover">
          <h4>
            YOU { this.props.hasWon }
          </h4>
        </div>
        : <div className="Wage-gameover"><h4></h4></div>}

        <div className="Wage-roll">
          <div>
            {displayBtn}
          </div>
        </div>
      </div>
    )
  }
}

export default Wage;
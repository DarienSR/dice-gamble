import React, { Component } from 'react';
import "./Wage.css";

class Wage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wallet: 300,
      bid: 0,
      bidAmt: 10,
      rollLeft: 2,
      doubleDown: false
    }
    this.handleRoll = this.handleRoll.bind(this)
    this.increaseBid = this.increaseBid.bind(this)
    this.decreaseBid = this.decreaseBid.bind(this)
    this.doubleDown = this.doubleDown.bind(this)
    this.handlegameOver = this.handlegameOver.bind(this)
    this.setBidAmt = this.setBidAmt.bind(this)
  }
  
  doubleDown() {
    if(this.state.wallet - this.state.bid * 2 < 0) {
      alert("You do not have enough money to cover bid if you lose.")
      return
    }
    if(!this.state.doubleDown) {
      this.setState(st => ({
        bid: st.bid * 2,
        doubleDown: true
      }));
    } 
  }

  handleRoll() {
    if(this.state.wallet - this.state.bid < 0) {
      alert("You do not have enough money to cover bid if you lose.")
      return
    }
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
    
    this.props.reset();
  }

  increaseBid(evt) {
    let newBid;
    if(this.state.bid >= this.state.wallet) return
    if(this.state.bid + this.state.bidAmt > this.state.wallet) 
      newBid = this.state.wallet;
    else
      newBid = this.state.bid + this.state.bidAmt;
    this.setState({bid: newBid})
  }

  decreaseBid() {
    if(this.state.bid === 0) return
    let newBid = this.state.bid - this.state.bidAmt;
    this.setState({bid: newBid})
  }

  setBidAmt(evt) {
    let amt = parseInt(evt.target.value);
    this.setState({ bidAmt: amt })
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

    let activeAmt = {
      backgroundColor: "#da3566",
      border: "none",
      cursor: "pointer"
    }

    let disabledAmt = {
      border: "none",
      cursor: "pointer"
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
         <div>
           <p>Increment Amount</p>
           <input className="incrementButton" style={this.state.bidAmt === 10 ? activeAmt : disabledAmt} type="button" name={"10"} value={10} onClick={this.setBidAmt} />
           <input className="incrementButton" style={this.state.bidAmt === 20 ? activeAmt : disabledAmt} type="button" name={"20"} value={20} onClick={this.setBidAmt} />
           <input className="incrementButton" style={this.state.bidAmt === 50 ? activeAmt : disabledAmt} type="button" name={"50"} value={50} onClick={this.setBidAmt} />
         </div>
         <h4>Rolls Left: {this.state.rollLeft}</h4>
        </div>

        {this.props.handlegameOver ? 
        <div className="Wage-gameover">
          <h3>
            YOU { this.props.hasWon }
          </h3>
        </div>
        : <div className="Wage-gameover"><h4><em>Game In Process</em></h4></div>}

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
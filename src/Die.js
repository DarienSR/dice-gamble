import React, { Component } from 'react';
import "./Die.css";

class Die extends Component {
constructor(props) {
  super(props)
  this.handleLock = this.handleLock.bind(this)
}

handleLock() {
  this.props.lockDie(this.props.idx);
}



 render() {
    let style;
    if(this.props.locked) {
      style = {
        backgroundColor: "rgb(199, 164, 164)",
        boxShadow: "1px 1px 8px 4px grey"
      }
    }

    let animate, animateOpp;
      if(this.props.animate) {
        animate = "Die Die-player shake"
        animateOpp = "Die shake"
      }
      
      if(!this.props.animate){
        animate = "Die Die-player"
        animateOpp = "Die"
      }

    let display;
    if(this.props.player) 
      display = 
      <div className="Die-container">
        <button className="Die-button" onClick={this.handleLock}>
          <div style={style} className={animate}>
            <p>{this.props.face}</p>
          </div>
        </button>
      </div>
    else
    display = 
    <div className="Die-container">
      <div className="Die-button">
        <div style={style} className={animateOpp}>
          <p>{this.props.face}</p>
        </div>
      </div>
    </div>

    return (
      <div>
        {display}
      </div>
    );
  }
}

export default Die;
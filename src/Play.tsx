import { Jogo } from "engine";
import React, { Component } from "react";
import "styles/Play.scss";
import { Display } from "./components/display";

class Play extends Component {
  state={
    iniciado: false
  }
  componentDidMount(){
    if (!this.state.iniciado) {
      Jogo.emitir("Game.play", undefined)
    }
  }
  render(){
    return (
      <div id="game">
        <Display />
      </div>
    );
  }
}


export default Play;

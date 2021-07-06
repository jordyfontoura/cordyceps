import { Jogo } from "engine";
import { Component } from "react";
import './gamebar.scss';


export class GameBar extends Component {
  render() {
    return <div className="gamebar">
      <button onClick={()=>Jogo.emitir("Game.stop", undefined)}>Stop</button>
      <button onClick={()=>Jogo.emitir("Game.play", undefined)}>Play</button>
      <button onClick={()=>Jogo.emitir("Game.pause", undefined)}>Pause</button>
    </div>
  }
}

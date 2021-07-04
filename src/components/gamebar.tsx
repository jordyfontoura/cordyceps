import { emitir } from "game/utils/observer";
import { Component } from "react";
import './gamebar.scss';


export class GameBar extends Component {
  render() {
    return <div className="gamebar">
      <button onClick={()=>emitir("Game.stop", undefined)}>Stop</button>
      <button onClick={()=>emitir("Game.play", undefined)}>Play</button>
      <button onClick={()=>emitir("Game.pause", undefined)}>Pause</button>
    </div>
  }
}

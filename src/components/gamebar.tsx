import { emit } from "game/utils/observer";
import { Component } from "react";
import './gamebar.scss';


export class GameBar extends Component {
  render() {
    return <div className="gamebar">
      <button onClick={()=>emit("Game.stop", undefined)}>Stop</button>
      <button onClick={()=>emit("Game.play", undefined)}>Play</button>
      <button onClick={()=>emit("Game.pause", undefined)}>Pause</button>
    </div>
  }
}

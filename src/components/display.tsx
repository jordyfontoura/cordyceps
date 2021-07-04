import { emit } from "game/utils/observer";
import Aleatorizar from "game/utils/random";
import { Vetor } from "game/utils/vetor";
import { Component } from "react";
import "./display.scss";

export class Display extends Component {
  state: { id: number };
  drag = {
    dragging: false,
    mayDrag: false,
    start: Vetor.Zero
  }
  constructor(props: any) {
    super(props);
    this.state = {
      id: Aleatorizar.Id('display'),
    };
  }
  componentDidMount() {
    emit("Game.criar.display", { id: this.state.id });
    const canvas = document.getElementById(this.state.id.toString());
    
    canvas?.addEventListener("mousedown", (ev)=>{
      this.drag.start = new Vetor(ev.clientX, ev.clientY);
      this.drag.mayDrag = true;
    })
    canvas?.addEventListener("mousemove", (ev)=>{
      const mousePosition = new Vetor(ev.movementX, ev.movementY);
      if (this.drag.mayDrag && this.drag.dragging) {
        emit("Game.display.move", { id: this.state.id, delta: mousePosition.mul(new Vetor(-1, 1)) });
      }
      if (this.drag.mayDrag && mousePosition.sub(this.drag.start).magnitude > 10) {
        this.drag.dragging = true;
      }
    })
    document.addEventListener("mouseup", (ev)=>{
      this.drag.dragging = false;
      this.drag.mayDrag = false;
    })
  }
  componentWillUnmount(){
    emit("Game.deletar.display", { id: this.state.id });
  }
  render() {
    return <canvas className='display' id={this.state.id.toString()} />;
  }
}

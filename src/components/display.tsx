// import { emitir } from "game/utils/observer";
import { Editor } from "game/editor";
import Aleatorizar from "game/utils/random";
import { Vetor } from "game/utils/vetor";
import { Component } from "react";
import "./display.scss";

export class Display extends Component {
  state: { id: number };
  drag = {
    dragging: false,
    mayDrag: false,
    start: Vetor.Zero,
  };
  constructor(props: any) {
    super(props);
    this.state = {
      id: Aleatorizar.Id("display"),
    };
  }
  componentDidMount() {
    const canvas = document.getElementById(
      this.state.id.toString()
    ) as HTMLCanvasElement | null;
    if (!canvas) {
      return;
    }
    Editor.emitir("Editor.display.adicionar", {
      id: this.state.id,
      elemento: canvas,
    });

    canvas.addEventListener("mousedown", (ev) => {
      ev.preventDefault();
      const mouse = new Vetor(ev.pageX, ev.pageY);
      this.drag.start = mouse;
      this.drag.mayDrag = true;
      Editor.emitir("Editor.display.mouse.down", {
        id: this.state.id,
        posição: Editor.ToWorldSpace(
          new Vetor(ev.pageX, ev.pageY),
          this.state.id,
          "client"
        ),
      });
    });

    canvas.addEventListener("mousemove", (ev) => {
      ev.preventDefault();
      const mouseMovement = new Vetor(ev.movementX, ev.movementY);
      Editor.emitir("Editor.display.mover", {
        id: this.state.id,
        delta: mouseMovement,
        posição: Editor.ToWorldSpace(
          new Vetor(ev.pageX, ev.pageY),
          this.state.id,
          "client"
        ),
      });
      if (this.drag.mayDrag && this.drag.dragging) {
        Editor.emitir("Editor.display.drag.mover", {
          id: this.state.id,
          delta: mouseMovement,
        });
      }
      if (
        this.drag.mayDrag &&
        mouseMovement.sub(this.drag.start).magnitude > 10
      ) {
        this.drag.dragging = true;
      }
    });
    canvas.addEventListener("wheel", (ev) => {
      ev.preventDefault();
      Editor.emitir("Editor.display.zoom", {
        id: this.state.id,
        delta: ev.deltaY,
      });
    });
    canvas.addEventListener("mouseup", (ev) => {
      ev.preventDefault();
      Editor.emitir("Editor.display.mouse.up", {
        id: this.state.id,
        posição: new Vetor(ev.pageX, ev.pageY)
          .sub(
            new Vetor(
              canvas.clientLeft + canvas.clientWidth / 2,
              canvas.clientTop + canvas.clientHeight / 2
            )
          )
          .mul(new Vetor(1, -1)),
      });
    });
    document.addEventListener("mouseup", (ev) => {
      this.drag.dragging = false;
      this.drag.mayDrag = false;
    });
    document.addEventListener("mouseleave", (ev)=>{
      this.drag.dragging = false;
      this.drag.mayDrag = false;
    })
  }
  componentWillUnmount() {
    Editor.emitir("Editor.display.remover", {
      id: this.state.id,
    });
  }
  render() {
    return <canvas className="display" id={this.state.id.toString()} />;
  }
}

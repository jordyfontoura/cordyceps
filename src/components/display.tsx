import { emit } from "engine/utils/observer";
import Aleatorizar from "engine/utils/random";
import { Component } from "react";
import "./display.scss";

export class Display extends Component {
  state: { id: string };
  constructor(props: any) {
    super(props);
    this.state = {
      id: Aleatorizar.Id().toString(),
    };
  }
  componentDidMount() {
    emit("Game.criar.display", { element: this.state.id });
  }
  componentWillUnmount(){
    emit("Game.deletar.display", { element: this.state.id });
  }
  render() {
    return <canvas className='display' id={this.state.id} />;
  }
}

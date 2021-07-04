import { emit } from "game/utils/observer";
import Aleatorizar from "game/utils/random";
import { Component } from "react";
import "./debug.scss";

export class Debug extends Component {
  state: { id: number; register: string[] };
  constructor(props: any) {
    super(props);
    this.state = {
      id: Aleatorizar.Id(),
      register: [],
    };
  }
  componentDidMount() {
    emit("Game.criar.debug", {
      id: this.state.id,
      debug: (mensagem: string) => {
        this.setState({ register: [mensagem, ...this.state.register] });
      },
    });
  }
  componentWillUnmount() {
    emit("Game.deletar.debug", { id: this.state.id });
  }
  render() {
    return (
      <div className="debug">
        <ul className="registers">
          {this.state.register.slice(0, 100).map((mensagem, index)=>(<li className="register" key={mensagem.length + '' + index}>{mensagem}</li>))}
          {this.state.register.length > 100 && <li>...</li>}
        </ul>
      </div>
    );
  }
}

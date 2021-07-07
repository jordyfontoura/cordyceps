import { Editor, IRegistro } from "game/editor";
import Aleatorizar from "game/utils/random";
import { Component } from "react";
import "./debug.scss";

export class Debug extends Component {
  state: { id: number; register: IRegistro[] };
  editorId: number;
  constructor(props: any) {
    super(props);
    this.state = {
      id: Aleatorizar.Id(),
      register: Editor.registros.reverse() || [],
    };
    this.editorId = this.state.id;
  }
  componentDidMount() {
    this.editorId = Editor.escutar("Editor.registro.mudar", (payload) => {
      this.setState({
        register: payload.registros.reverse(),
      });
    });
    // emitir("Game.criar.debug", {
    //   id: this.state.id,
    //   debug: (mensagem: string) => {
    //     this.setState({ register: [mensagem, ...this.state.register] });
    //   },
    // });
  }
  componentWillUnmount() {
    Editor.removerEscuta("Editor.registro.mudar", this.editorId);
    // emitir("Game.deletar.debug", { id: this.state.id });
  }
  render() {
    return (
      <div className="debug">
        <ul className="registers">
          {this.state.register.slice(0, 100).map((registro, index) => (
            <li
              className="register"
              key={index}
            >
              <p className="mensagem">{registro.mensagem}</p>
              {registro.trace && <p className="trace">{registro.trace}</p>}
            </li>
          ))}
          {this.state.register.length > 100 && <li>...</li>}
        </ul>
      </div>
    );
  }
}

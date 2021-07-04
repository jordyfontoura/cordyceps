import Aleatorizar from "game/utils/random";
import { Component } from "react";
import Editor from "src/editor";
import "./debug.scss";

export class Debug extends Component {
  state: { id: number; register: string[] };
  editorId: number;
  constructor(props: any) {
    super(props);
    this.state = {
      id: Aleatorizar.Id(),
      register: Editor.registros.map((r) => r.mensagem).reverse() || [],
    };
    this.editorId = this.state.id;
  }
  componentDidMount() {
    this.editorId = Editor.listen("registros", (editor) => {
      this.setState({
        register: editor.registros.map((r) => r.mensagem).reverse(),
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
    Editor.unlisten("registros", this.editorId);
    // emitir("Game.deletar.debug", { id: this.state.id });
  }
  render() {
    return (
      <div className="debug">
        <ul className="registers">
          {this.state.register.slice(0, 100).map((mensagem, index) => (
            <li className="register" key={mensagem.length + "" + index}>
              {mensagem}
            </li>
          ))}
          {this.state.register.length > 100 && <li>...</li>}
        </ul>
      </div>
    );
  }
}

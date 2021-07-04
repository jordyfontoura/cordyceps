import { GameObject } from "engine/gameobject";
import Aleatorizar from "game/utils/random";
import { Component } from "react";
import Editor from "src/editor";
import "./hierarchy.scss";

type HierarchyNode = GameObject;
type IRegistro = string[];
export class Hierarchy extends Component {
  static registro: IRegistro = [];
  state: { id: number; trees: HierarchyNode[] };
  editorId: number;
  constructor(props: any) {
    super(props);
    this.state = {
      id: Aleatorizar.Id(),
      trees: Editor.hierarquia||[],
    };
    this.editorId = this.state.id;
  }
  componentDidMount() {
    this.editorId = Editor.listen("hierarquia", (editor) => {
      this.setState({ trees: editor.hierarquia });
    });

    // emitir("Game.criar.hierarchy", {
    //   id: this.state.id,
    //   add: (go: GameObject) => {
    //     if (!go.pai) {
    //       this.state.trees.push(go);
    //       this.setState({ trees: [...this.state.trees, go] });
    //     }
    //   },
    //   remove: (go: GameObject) => {
    //     const index = this.state.trees.findIndex((item) => item.id === go.id);
    //     if (index < 0) {
    //       return;
    //     }
    //     this.state.trees.splice(index, 1);
    //     this.setState({ trees: [...this.state.trees] });
    //   },
    //   update: (go: GameObject) => {},
    // });
  }
  componentWillUnmount() {
    Editor.unlisten('hierarquia', this.editorId);
    // emitir("Game.deletar.hierarchy", { id: this.state.id });
  }
  render() {
    return (
      <div className="hierarchy">
        <ul className="nodes">
          {this.state.trees.map((node, index) => (
            <li className="node" key={node.nome + "-" + index}>
              <span className="identifier">
                [{node.nome !== node.id.toString() && <span>{node.id}:</span>}
                <span>{node.constructor.name}</span>]
              </span>
              <span>{<span className="name">{node.nome}</span>}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

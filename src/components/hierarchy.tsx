import { GameObject } from "game/core/gameobject";
import { Editor } from "game/editor";
import Aleatorizar from "game/utils/random";
import { Component } from "react";
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
    this.editorId = Editor.escutar("Editor.hierarquia.mudar", (editor) => {
      this.setState({ trees: editor.hierarquia });
    });
  }
  componentWillUnmount() {
    Editor.removerEscuta('Editor.hierarquia.mudar', this.editorId);
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

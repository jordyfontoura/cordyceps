import { GameObject } from "engine/gameobject";
import { emit } from "game/utils/observer";
import Aleatorizar from "game/utils/random";
import { Component } from "react";
import "./hierarchy.scss";

type HierarchyNode = GameObject

export class Hierarchy extends Component {
  state: { id: number; trees: HierarchyNode[] };
  constructor(props: any) {
    super(props);
    this.state = {
      id: Aleatorizar.Id(),
      trees: [],
    };
  }
  componentDidMount() {
    emit("Game.criar.hierarchy", {
      id: this.state.id,
      add: (go: GameObject) => {
        if (!go.pai) {
          this.state.trees.push(go);
          this.setState({ trees: [...this.state.trees, go] });
        }
      },
      remove: (go: GameObject) => {
        const index = this.state.trees.findIndex((item) => item.id === go.id);
        if (index < 0) {
          return;
        }
        this.state.trees.splice(index, 1);
        this.setState({ trees: [...this.state.trees] });
      },
      update: (go: GameObject) => {},
    });
  }
  componentWillUnmount() {
    emit("Game.deletar.hierarchy", { id: this.state.id });
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
              <span>
                {<span className="name">{node.nome}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

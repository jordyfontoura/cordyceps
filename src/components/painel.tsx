import React, { Component } from "react";
import "./painel.scss";
interface PainelSlotProps {
  horizontal?: boolean;
  ratio?: number;
  painels: {
    ratio?: number;
    render: (props: any) => JSX.Element;
  }[];
}
export class PainelSlot extends Component<PainelSlotProps> {
  render() {
    return (
      <div className={"slot" + (this.props.horizontal ? " horizontal" : "")} style={{flex: this.props.ratio || 1}}>
        {this.props.painels.map((painel, key) =>
          painel.render({ ratio: painel.ratio || 1, key })
        )}
      </div>
    );
  }
}

interface Props {
  pages: {
    name: string;
    element: (props?: any) => JSX.Element;
  }[];
  ratio?: number;
}

export class Painel extends Component<Props> {
  state = {
    page: 0,
  };
  get page() {
    return this.props.pages[this.state.page];
  }
  render() {
    return (
      <div className="painel" style={{ flex: this.props.ratio || 1 }}>
        <ul className="abas">
          {this.props.pages.map((page, id) => (
            <li
              key={page.name + id}
              className={"aba" + (page === this.page ? " selected" : "")}
              onClick={() => this.setState({ page: id })}
            >
              {page.name}
            </li>
          ))}
        </ul>
        <div className="conteudo">{this.page.element()}</div>
      </div>
    );
  }
}

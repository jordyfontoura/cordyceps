import React, { Component } from "react";
import "./painel.scss";

export class PainelSlot extends Component {
  render() {
    return <div className="slot">{this.props.children}</div>;
  }
}

interface Props {
  pages: {
    name: string;
    element: (props?: any) => JSX.Element;
  }[];
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
      <div className="painel">
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

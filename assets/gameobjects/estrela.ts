import RigidBody from "engine/gameobject/rigidbody";
import { Aleatorizar, mapearValor, Tela, Vetor } from "game/core";
import { Editor } from "game/editor";

function color() {
  return (
    "#" +
    Aleatorizar.Int(0, 200).toString(16).padStart(2, "00") +
    Aleatorizar.Int(0, 200).toString(16).padStart(2, "00") +
    Aleatorizar.Int(0, 200).toString(16).padStart(2, "00")
  );
}

export class Estrela extends RigidBody {
  cor: string = "black";
  trace: Vetor[] = [];
  constructor(posição: Vetor) {
    super(posição);
    this.massa = 100;
    this.cor = color();
  }
  tick() {
    this.gravidade();
    if (
      !this.trace.length ||
      this.posição.sub(this.trace[this.trace.length - 1]).sqrMagnitude > 2 ** 2
    ) {
      this.trace.push(this.posição);
      if (this.trace.length > 100) {
        this.trace = this.trace.slice(1);
      }
    }
  }
  render(tela: Tela) {
    tela.ctx.strokeStyle = this.cor;
    tela.ctx.fillStyle = this.cor;
    tela.ctx.beginPath();

    this.trace
      .map((t) => Editor.ToScreenSpace(t, tela, "world"))
      .forEach((t) => {
        tela.ctx.lineTo(t.x, t.y);
      });
    tela.ctx.lineTo(
      Editor.ToScreenSpace(this.posição, tela, "world").x,
      Editor.ToScreenSpace(this.posição, tela, "world").y
    );
    tela.ctx.stroke();
    tela.arc(
      this.posição,
      mapearValor(this.massa, 0, 100000, 10, 30, true),
      this.cor
    );
  }
}

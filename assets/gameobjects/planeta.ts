import { GameObject, Tela } from "game/core";

export class Estrela extends GameObject {
  render(tela: Tela) {
    tela.setPixel(this.posição, "red");
  }
}

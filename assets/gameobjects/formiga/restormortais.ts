import { GameObject } from "engine/core/gameobject";
import { Tela } from "engine/core/tela";

export class RestosMortais extends GameObject {
  render(tela: Tela) {
    tela.setPixel(this.posição, "red");
  }
}

import { GameObject } from "engine/core/gameobject";
import { Tela } from "engine/core/tela";
import { Vetor } from "engine/utils/vetor";

export class RestosMortais extends GameObject {
  constructor(posição: Vetor) {
    super(posição, { ignorarNaHierarquia: true });
  }
  render(tela: Tela) {
    tela.setPixel(this.posição, "red");
  }
}

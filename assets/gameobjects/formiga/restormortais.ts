import { GameObject, Tela, Vetor } from "engine";

export class RestosMortais extends GameObject {
  constructor(posição: Vetor) {
    super(posição, { ignorarNaHierarquia: true });
  }
  render(tela: Tela) {
    tela.setPixel(this.posição, "red");
  }
}

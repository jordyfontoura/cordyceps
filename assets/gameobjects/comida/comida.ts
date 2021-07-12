import { Aleatorizar, Cor, GameObject, interpolar, mapearValor, Tela, Vetor } from "game/core";
import { clamp } from "lodash";
import { Formiga } from "../formiga/formiga";

export class Comida extends GameObject {
  static comidasExistentes: Comida[] = [];
  zIndex = 2;
  caloria: number;
  caloriaMaxima: number;
  constructor(posição: Vetor) {
    super(posição);
    Comida.comidasExistentes.push(this);
    this.caloriaMaxima = Aleatorizar.Int(20000, 40000);
    this.caloria = this.caloriaMaxima;
  }
  tick() {
    if (this.caloria <= 0) {
      this.destruir();
    }
  }
  quandoDestruir() {
    const index = Comida.comidasExistentes.findIndex(
      (comida) => comida.id === this.id
    );
    if (index < 0) {
      return;
    }
    Comida.comidasExistentes.splice(index, 1);
    new Comida(
      this.posição.add(
        Aleatorizar.Direção().mul(Aleatorizar.Numero(50, 300)).Round
      )
    );
  }
  alimentar(formiga: Formiga) {
    if (this.caloria < 0) {
      return;
    }
    let incremento = clamp(formiga.caloriasMaxima - formiga.calorias, 0, this.caloria);
    formiga.calorias += incremento;
    this.caloria-= incremento;
  }
  render(tela: Tela) {
    const values = interpolar(
      mapearValor(this.caloria, 0, this.caloriaMaxima, 0, 1, true) || 0,
      [75, 54, 33],
      [0, 255, 0]
    );
    const cor = new Cor(values[0], values[1], values[2]).toHex();
    tela.setPixel(this.posição, cor);
    tela.setPixel(this.posição.add(Vetor.Direita), cor);
    tela.setPixel(this.posição.add(Vetor.Esquerda), cor);
    tela.setPixel(this.posição.add(Vetor.Cima), cor);
    tela.setPixel(this.posição.add(Vetor.Baixo), cor);
  }
}

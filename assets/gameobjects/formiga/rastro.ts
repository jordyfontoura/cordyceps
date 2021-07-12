import {
  Cor,
  GameObject,
  interpolar,
  Jogo,
  mapearValor,
  Tela,
  Vetor
} from "game/core";
// import { GameObject } from "engine/gameobject";
// import { Tela } from "engine/tela";
// import Aleatorizar from "game/utils/random";
// import Tempo from "game/utils/time";
// import { Vetor } from "game/utils/vetor";

const TempoDoRastro = 30 * 3;
export class Rastro extends GameObject {
  // static rastros: Rastro[] = [];
  static instancia: Rastro;
  static matriz: { posição: Vetor; nascimento: number }[] = [];
  private constructor(posição: Vetor) {
    super(posição, { ignorarNaHierarquia: true });
    // this.ticksDeVida = Tempo.converter(TempoDoRastro, "segundos", "ticks");
    // Rastro.rastros.push(this);
  }
  static criar(posição: Vetor) {
    let rastro = Rastro.matriz.find((item) => item.posição.igual(posição));
    if (rastro) {
      rastro.nascimento = Jogo.ticks;
    } else {
      Rastro.matriz.push({
        posição,
        nascimento: Jogo.ticks,
      });
    }
    if (!this.instancia) {
      this.instancia = new Rastro(Vetor.Zero);
    }
    return this.instancia;
  }
  quandoDestruir() {
    Rastro.matriz = [];
  }
  tick() {
    for (let i = 0; i < Rastro.matriz.length; i++) {
      const item = Rastro.matriz[i];
      if (Jogo.ticks - item.nascimento > TempoDoRastro) {
        Rastro.matriz.splice(i--, 1);
      }
    }
  }
  render(tela: Tela) {
    for (let i = 0; i < Rastro.matriz.length; i++) {
      const item = Rastro.matriz[i];
      const values = interpolar(
        mapearValor(
          Jogo.ticks - item.nascimento,
          0,
          TempoDoRastro,
          0,
          1,
          true
        ) || 0,
        [75, 54, 33],
        [255, 255, 255]
      );
      const cor = new Cor(values[0], values[1], values[2]).toHex();
      tela.setPixel(item.posição, cor);
    }
  }
}

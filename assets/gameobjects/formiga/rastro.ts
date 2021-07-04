import { GameObject } from "engine/core/gameobject";
import { Tela } from "engine/core/tela";
import Aleatorizar from "engine/utils/random";
import Tempo from "engine/utils/time";
import { Vetor } from "engine/utils/vetor";

const TempoDoRastro = 5;
export  class Rastro extends GameObject {
  ticksDeVida: number;
  static rastros: Rastro[] = [];
  private constructor(posição: Vetor) {
    super(posição, {ignorarNaHierarquia: true});
    this.ticksDeVida = Tempo.converter(TempoDoRastro, "segundos", "ticks");
    Rastro.rastros.push(this);
  }
  static criar(posição: Vetor) {
    let rastro = Rastro.rastros.find((item) => item.posição.igual(posição));
    if (rastro) {
      rastro.ticksDeVida = Tempo.converter(TempoDoRastro, "segundos", "ticks");
    } else {
      rastro = new Rastro(posição);
    }
    return rastro;
  }
  quandoDestruir() {
    const index = Rastro.rastros.findIndex((item) => item.id === this.id);
    Rastro.rastros.splice(index, 1);
  }
  tick() {
    this.ticksDeVida--;
    if (this.ticksDeVida <= 0 && Aleatorizar.Chance(5 / 100)) {
      this.destruir();
    }
  }
  render(tela: Tela) {
    const valor = Math.round((1 / (1 + Math.abs(this.ticksDeVida / 10))) * (255-200) + 200);
    tela.setPixel(this.posição, `rgb(${valor}, ${valor}, ${valor})`);
  }
}
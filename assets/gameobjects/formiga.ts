import { GameObject } from "engine/core/gameobject";
import { Tela } from "engine/core/tela";
import Aleatorizar from "engine/utils/random";
import Tempo from "engine/utils/time";
import { Vetor } from "engine/utils/vetor";

export class Formiga extends GameObject {
  energiaRemanescente: number;
  constructor(posição: Vetor) {
    super(posição);
    const tempoEstimado = Aleatorizar.Int(30, 60 * 2);
    console.log(`Formiga criada ${tempoEstimado}`);
    this.energiaRemanescente = Tempo.converter(
      tempoEstimado,
      "segundos",
      "ticks"
    );
  }
  quandoDestruir() {
    new RestosMortais(this.position);
  }

  degenerar(energia: number) {
    this.energiaRemanescente -= energia;
    if (this.energiaRemanescente <= 0 && Aleatorizar.Chance(0.2 / 100)) {
      this.destruir();
    }
  }
  mover(direção: Vetor) {
    this.position = this.position.add(direção);
    Rastro.criar(this.position);
    this.degenerar(1);
  }
  tick() {
    this.mover(Aleatorizar.Direção());
  }
  render(tela: Tela) {
    tela.setPixel(this.position, "black");
  }
}
const TempoDoRastro = 20;
class Rastro extends GameObject {
  ticksDeVida: number;
  static rastros: Rastro[] = [];
  private constructor(posição: Vetor) {
    super(posição);
    this.ticksDeVida = Tempo.converter(TempoDoRastro, "segundos", "ticks");
    Rastro.rastros.push(this);
  }
  static criar(posição: Vetor) {
    let rastro = Rastro.rastros.find((item) => item.position.igual(posição));
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
    const valor = Math.round((1 / (1 + Math.abs(this.ticksDeVida / 10))) * 255);
    tela.setPixel(this.position, `rgb(${valor}, ${valor}, ${valor})`);
  }
}
class RestosMortais extends GameObject {
  constructor(posição: Vetor) {
    super(posição);
  }

  render(tela: Tela) {
    tela.setPixel(this.position, "red");
  }
}

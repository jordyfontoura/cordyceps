import { Aleatorizar, debug, GameObject, Jogo, Tela, Tempo, Vetor } from "engine";
// import { Jogo } from "engine/game";
// import { GameObject } from "engine/gameobject";
// import { Tela } from "engine/tela";
// import Aleatorizar from "game/utils/random";
// import Tempo from "game/utils/time";
// import { Vetor } from "game/utils/vetor";
import { Comida } from "../comida/comida";
import { Rastro } from "./rastro";
import { RestosMortais } from "./restormortais";

export class Formiga extends GameObject {
  calorias: number;
  caloriasMaxima: number;
  zIndex = 10;
  constructor(posição: Vetor) {
    super(posição);
    const tempoEstimado = Aleatorizar.Int(0, 30);
    debug(`Formiga criada ${tempoEstimado}`);
    this.calorias = Tempo.converter(tempoEstimado, "segundos", "ticks");
    this.caloriasMaxima = this.calorias;
    Tempo.startCooldown(this.id, 10000);
  }
  quandoDestruir() {
    debug(`Formiga[${this.id}] destruida`);
    new RestosMortais(this.posição);
  }

  degenerar(energia: number) {
    this.calorias -= energia;
    if (this.calorias <= 0 && Aleatorizar.Chance(0.2 / 100)) {
      this.destruir();
    }
  }
  mover(direção: Vetor) {
    this.posição = this.posição.add(direção);
    Rastro.criar(this.posição);
    this.degenerar(1);
  }
  movimento() {
    if (Comida.comidasExistentes.length) {
      let probabilidades = [0, 0, 0, 0];
      Vetor.Direções.forEach((direção, index) => {
        const pos = this.posição.add(direção);
        const menorDistância = Math.min(
          ...Comida.comidasExistentes.map(
            (comida) => comida.posição.sub(pos).magnitude
          )
        );
        probabilidades[index] = menorDistância;
      });
      const menor = Math.min(...probabilidades);
      probabilidades = probabilidades.map(
        (probabilidade) => probabilidade - menor
      );
      const total = probabilidades.reduce((a, b) => a + b, 0);
      probabilidades = probabilidades.map(
        (probabilidade) => probabilidade / total
      );
      probabilidades = probabilidades.map((probabilidade) => 1 - probabilidade);

      this.mover(Vetor.Direções[Aleatorizar.Index(probabilidades)]);
    } else {
      this.mover(Aleatorizar.Direção());
    }
  }
  tick() {
    this.movimento();
    if (Comida.comidasExistentes.length && Tempo.cooldown(this.id)) {
      const comidaNoAlcance = Jogo.gameObjects.find(
        (comida) =>
          comida instanceof Comida &&
          comida.posição.sub(this.posição).magnitude < 4
      ) as Comida;
      if (comidaNoAlcance) {
        this.comer(comidaNoAlcance);
      }
    }
  }
  comer(comida: Comida) {
    Tempo.startCooldown(this.id, 10000);
    debug(
      `Eu ${this.nome} comi ${comida.nome} que tinha ${comida.caloria} calorias`
    );
    comida.alimentar(this);
  }
  render(tela: Tela) {
    tela.setPixel(this.posição, "black");
  }
}

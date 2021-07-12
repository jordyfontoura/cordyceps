import {
  Aleatorizar,
  Cor,
  Debug,
  GameObject,
  Jogo,
  Tela,
  Tempo,
  Vetor
} from "game/core";
import { interpolar, mapearValor } from "game/utils/math";
import { Comida } from "../comida/comida";
import { Rastro } from "./rastro";
import { RestosMortais } from "./restormortais";

export class Formiga extends GameObject {
  calorias: number;
  caloriasMaxima: number;
  zIndex = 10;
  get faminta() {
    return this.calorias < 0.6 * this.caloriasMaxima;
  }
  constructor(posição: Vetor) {
    super(posição);
    const tempoEstimado = Aleatorizar.Int(0, 30);
    Debug.log(`Formiga criada ${tempoEstimado}`);
    this.calorias = 4000;
    this.caloriasMaxima = this.calorias;
    Tempo.startCooldown(this.id, 10000);
  }
  quandoDestruir() {
    Debug.log(`Formiga[${this.id}] destruida`);
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
    // Caminho.criar(this.posição)s;
    this.degenerar(1);
  }
  movimento() {
    if (Comida.comidasExistentes.length && this.faminta) {
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
      if (!Aleatorizar.Chance(1 / 5))
        this.mover(
          Aleatorizar.Item([
            Vetor.Esquerda,
            Vetor.Direita,
            Vetor.Cima,
            Vetor.Baixo,
          ])
        );
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
    Debug.log(
      `Eu ${this.nome} comi ${comida.nome} que tinha ${comida.caloria} calorias`
    );
    comida.alimentar(this);
  }
  render(tela: Tela) {
    let values = interpolar(
      mapearValor(this.calorias, 0, this.caloriasMaxima, 0, 1) || 1,
      [200, 0, 0],
      [0, 0, 0]
    );
    tela.setPixel(
      this.posição,
      new Cor(values[0], values[1], values[2]).toHex()
    );
  }
}

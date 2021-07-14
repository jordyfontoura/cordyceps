import {
  Cor,
  GameObject,
  interpolar,
  mapearValor,
  Tela,
  Vetor
} from "game/core";
// import { GameObject } from "engine/gameobject";
// import { Tela } from "engine/tela";
// import Aleatorizar from "game/utils/random";
// import Tempo from "game/utils/time";
// import { Vetor } from "game/utils/vetor";

const TempoDoCaminho = 30 * 10;
export class Caminho extends GameObject {
  // static rastros: Caminho[] = [];
  static instancia: Caminho;
  static matriz: { posição: Vetor; passos: number }[] = [];
  static chunks: ImageData[] = [];
  private constructor(posição: Vetor) {
    super(posição, { ignorarNaHierarquia: true });
    // this.ticksDeVida = Tempo.converter(TempoDoCaminho, "segundos", "ticks");
    // Caminho.rastros.push(this);
  }
  static criar(posição: Vetor) {
    let rastro = Caminho.matriz.find((item) => item.posição.igual(posição));
    if (rastro) {
      rastro.passos++;
    } else {
      Caminho.matriz.push({
        posição,
        passos: 1,
      });
    }
    if (!this.instancia) {
      this.instancia = new Caminho(Vetor.Zero);
    }
    return this.instancia;
  }
  quandoDestruir() {
    Caminho.matriz = [];
  }
  render(tela: Tela) {
    // const image = tela.ctx.createImageData(1000, 1000);
    // const data = image.data;
    // for (let y = 0, ymax = image.height; y < ymax; y++) {
    //   for (let x = 0, xmax = image.width; x < xmax; x++) {
    //     const r = 0,
    //       g = 0,
    //       b = 0,
    //       a = 0;
    //     data[4 * x + y * xmax + 0] = r;
    //     data[4 * x + y * xmax + 1] = g;
    //     data[4 * x + y * xmax + 2] = b;
    //     data[4 * x + y * xmax + 3] = a;
    //   }
    // } TODO: Continuar

    for (let i = 0; i < Caminho.matriz.length; i++) {
      const item = Caminho.matriz[i];
      const values = interpolar(
        mapearValor(item.passos, 0, 10, 0, 1, true) || 0,
        [200, 200, 200],
        [75, 54, 33]
      );
      const cor = new Cor(values[0], values[1], values[2]).toHex();
      tela.setPixel(item.posição, cor);
    }
  }
}

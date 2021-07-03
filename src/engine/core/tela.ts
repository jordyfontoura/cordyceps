import { Vetor } from "../utils/vetor.js";

export class Tela {
  centro: Vetor;
  largura: number;
  altura: number;
  constructor(private tela: CanvasRenderingContext2D) {
    this.largura = tela.canvas.width;
    this.altura = tela.canvas.height;
    this.centro = new Vetor(this.largura, this.altura).div(2);

    tela.imageSmoothingEnabled = false;
    window.addEventListener(
      "resize",
      (e) => {
        this.tela.imageSmoothingEnabled = false;
      },
      false
    );
  }
  toLocalPosition(posição: Vetor){
    return new Vetor(posição.x, -posição.y).add(this.centro);
  }
  setPixel(posição: Vetor, cor: string) {
    let pos = this.toLocalPosition(posição);
    let tmp = this.tela.fillStyle;

    this.tela.fillStyle = cor;
    this.tela.fillRect(pos.x, pos.y, 1, 1);

    this.tela.fillStyle = tmp;
  }
  limparTela() {
    this.tela.clearRect(0, 0, this.largura, this.altura);
  }
}

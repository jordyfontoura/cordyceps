import { Vetor } from "../utils/vetor";
import { IGameConfig } from "./game";

export class Tela {
  id: string;
  centro: Vetor;
  largura: number;
  altura: number;
  configurações: IGameConfig;
  private tela: CanvasRenderingContext2D;
  constructor(private canvas: HTMLCanvasElement, config: IGameConfig) {
    this.id = canvas.id;
    this.tela = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.largura = this.tela.canvas.width;
    this.altura = this.tela.canvas.height;
    this.centro = new Vetor(this.largura, this.altura).div(2);
    this.configurações = config;

    this.ajustarTela();
    

    this.tela.imageSmoothingEnabled = false;
    window.addEventListener(
      "resize",
      (e) => {
        this.ajustarTela();
      },
      false
    );
  }
  ajustarTela() {
    this.tela.imageSmoothingEnabled = false;
    if (this.configurações.altura) {
      this.canvas.height = this.configurações.altura;
    }else{
      this.canvas.height = this.canvas.clientHeight;
    }
    if (this.configurações.largura) {
      this.canvas.width = this.configurações.largura;
    }else{
      this.canvas.width = this.canvas.clientWidth;
    }
    this.largura = this.tela.canvas.width;
    this.altura = this.tela.canvas.height;
    this.centro = new Vetor(this.largura, this.altura).div(2);
  }
  toLocalPosition(posição: Vetor) {
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

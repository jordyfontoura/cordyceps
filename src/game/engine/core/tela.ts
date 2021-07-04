import { Vetor } from "../utils/vetor";
import { IGameConfig } from "./game";

export class Tela {
  id: number;
  centro: Vetor;
  largura: number;
  altura: number;
  configurações: IGameConfig;
  posição: Vetor;
  private tela: CanvasRenderingContext2D;
  static telas: Tela[]=[];
  constructor(id: number, private canvas: HTMLCanvasElement, config: IGameConfig) {
    this.id = id;
    this.tela = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.largura = this.tela.canvas.width;
    this.altura = this.tela.canvas.height;
    this.centro = new Vetor(this.largura, this.altura).div(2);
    this.configurações = config;
    this.posição = Vetor.Zero;

    this.ajustarTela();
    

    this.tela.imageSmoothingEnabled = false;
    this.canvas.addEventListener(
      "resize",
      (e) => {
        if (this.canvas) {
          this.ajustarTela();
        }
      },
      false
    );
    Tela.telas.push(this);
  }
  ajustarTela() {
    this.tela.imageSmoothingEnabled = false;
    this.canvas.height = this.canvas.clientHeight;
    this.canvas.width = this.canvas.clientWidth;
    this.largura = this.tela.canvas.width;
    this.altura = this.tela.canvas.height;
    this.centro = new Vetor(this.largura, this.altura).div(2);
  }
  toLocalPosition(posição: Vetor) {
    return new Vetor(posição.x, -posição.y).add(this.centro).sub(this.posição.mul(new Vetor(1, -1)));
  }
  mover(posição: Vetor, deslocarApenas=false){
    if (deslocarApenas) {
      this.posição = this.posição.add(posição);
    }else{
      this.posição = posição;
    }
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

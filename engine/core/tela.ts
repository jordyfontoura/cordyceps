import { restringir } from "game/utils/math";
import { Vetor } from "game/utils/vetor";
import { IGameConfig } from "./game";

export class Tela {
  id: number;
  get centro() {
    return this.size.div(2);
  }
  get size() {
    return new Vetor(this.largura, this.altura);
  }
  get offsetClient() {
    return new Vetor(this.canvas.clientLeft, this.canvas.clientTop);
  }
  get clientSize() {
    return new Vetor(this.canvas.clientWidth, this.canvas.clientHeight);
  }
  largura: number;
  altura: number;
  configurações: IGameConfig;
  posição: Vetor;
  zoomValor: number = 0;
  ctx: CanvasRenderingContext2D;
  static telas: Tela[] = [];
  constructor(
    id: number,
    private canvas: HTMLCanvasElement,
    config: IGameConfig
  ) {
    this.id = id;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.largura = this.ctx.canvas.width;
    this.altura = this.ctx.canvas.height;
    this.configurações = config;
    this.posição = Vetor.Zero;

    this.ajustarTela();

    this.ctx.imageSmoothingEnabled = false;
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
    this.ctx.imageSmoothingEnabled = false;
    this.canvas.height = this.canvas.clientHeight;
    this.canvas.width = this.canvas.clientWidth;
    this.largura = this.ctx.canvas.width;
    this.altura = this.ctx.canvas.height;
  }

  toScreenSpace(posição: Vetor, from: "client" | "world") {
    switch (from) {
      case "client":
        return posição
          .sub(this.offsetClient)
          .div(this.clientSize)
          .mul(this.size);
      case "world":
        return posição
          .sub(this.posição)
          .mul(this.zoomValor + 1)
          .mul(new Vetor(1, -1))
          .add(this.centro);
    }
  }
  toWorldSpace(posição: Vetor, from: "client" | "screen"): Vetor {
    switch (from) {
      case "client":
        return this.toWorldSpace(
          this.toScreenSpace(posição, "client"),
          "screen"
        );
      case "screen":
        return posição
          .sub(this.centro)
          .div(this.zoomValor + 1)
          .mul(new Vetor(1, -1))
          .add(this.posição);
    }
  }
  mover(posição: Vetor, deslocarApenas = false) {
    if (deslocarApenas) {
      this.posição = this.posição.add(posição);
    } else {
      this.posição = posição;
    }
  }
  setPixel(
    posição: Vetor,
    cor: string,
    from: "world" | "client" | "screen" = "world"
  ) {
    let pos = from === "screen" ? posição : this.toScreenSpace(posição, from);
    let tmp = this.ctx.fillStyle;

    this.ctx.fillStyle = cor;
    this.ctx.fillRect(
      pos.x,
      pos.y,
      1 * (this.zoomValor + 1),
      1 * (this.zoomValor + 1)
    );

    this.ctx.fillStyle = tmp;
  }
  arc(
    posição: Vetor,
    radius: number,
    cor: string = "black",
    from: "world" | "client" | "screen" = "world"
  ) {
    let pos = from === "screen" ? posição : this.toScreenSpace(posição, from);
    let tmp = this.ctx.fillStyle;

    this.ctx.fillStyle = cor;
    // this.ctx.fillRect(
    //   pos.x,
    //   pos.y,
    //   1 * (this.zoomValor + 1),
    //   1 * (this.zoomValor + 1)
    //   );
    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, radius * (this.zoomValor + 1), 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = tmp;
  }
  limparTela() {
    this.ctx.clearRect(0, 0, this.largura, this.altura);
  }
  zoom(delta: number) {
    this.zoomValor = restringir(this.zoomValor - delta * 0.01, 0, 20);
  }
}

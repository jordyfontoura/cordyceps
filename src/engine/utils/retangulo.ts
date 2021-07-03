import { Vetor } from "./vetor.js";

export class Retangulo {
  posição: Vetor;
  tamanho: Vetor;
  constructor(x: number, y: number, largura: number, altura: number) {
    this.posição = new Vetor(x, y);
    this.tamanho = new Vetor(largura, altura);
  }
  estaDentro(posição: Vetor): boolean {
    const direitaBaixo = this.posição.add(this.tamanho);
    return !(
      posição.x < this.posição.x ||
      posição.y < this.posição.y ||
      posição.x > direitaBaixo.x ||
      posição.y > direitaBaixo.y
    );
  }
  sobrepõe(retangulo: this) {
    return (
      this.posição.x < retangulo.posição.x + retangulo.tamanho.x &&
      this.posição.x + this.tamanho.x > retangulo.posição.x &&
      this.posição.y > retangulo.posição.y + retangulo.tamanho.y &&
      this.posição.y + this.tamanho.y < retangulo.posição.y
    );
  }
}

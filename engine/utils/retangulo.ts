import { Vetor } from "./vetor";

export class Retangulo {
  get posição() {
    return new Vetor(this.x, this.y);
  }
  get tamanho() {
    return new Vetor(this.largura, this.altura);
  }
  constructor(
    public x: number,
    public y: number,
    public largura: number,
    public altura: number
  ) {}
  estaDentro(posição: Vetor): boolean {
    const direitaBaixo = this.posição.add(this.tamanho);
    return !(
      posição.x < this.x ||
      posição.y < this.y ||
      posição.x > direitaBaixo.x ||
      posição.y > direitaBaixo.y
    );
  }
  sobrepõe(outro: Retangulo) {
    return (
      !(this.x > outro.x + outro.largura || this.x + this.largura < outro.x) &&
      !(this.y > outro.y + outro.altura || this.y + this.altura < outro.y)
    );
  }
}
// ax+b-cx-d === 0

// const a = new Retangulo(0, 0, 100, 100)

// function overlap(
//   x1: number,
//   y1: number,
//   largura1: number,
//   altura1: number,
//   angulo: number,
//   x2: number,
//   y2: number,
//   largura2: number,
//   altura2: number,
//   angulo: number
// ) {

// }

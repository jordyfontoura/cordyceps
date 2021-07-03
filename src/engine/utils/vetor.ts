export class Vetor {
  static get Zero() {
    return new Vetor(0, 0);
  }
  static get Um() {
    return new Vetor(1, 1);
  }
  static get Esquerda() {
    return new Vetor(-1, 0);
  }
  static get Direita() {
    return new Vetor(1, 0);
  }
  static get Cima() {
    return new Vetor(0, 1);
  }
  static get Baixo() {
    return new Vetor(0, -1);
  }

  constructor(public x: number, public y: number) {}
  add(other: Vetor): Vetor {
    return new Vetor(this.x + other.x, this.y + other.y);
  }
  sub(other: Vetor): Vetor {
    return new Vetor(this.x - other.x, this.y - other.y);
  }
  mul(other: Vetor | number): Vetor {
    if (typeof other === "number")
      return new Vetor(this.x * other, this.y * other);

    return new Vetor(this.x * other.x, this.y * other.y);
  }
  div(other: Vetor | number): Vetor {
    if (typeof other === "number")
      return new Vetor(this.x / other, this.y / other);

    return new Vetor(this.x / other.x, this.y / other.y);
  }
  get magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  igual(other: Vetor){
    return this.x === other.x && this.y === other.y;
  }
}

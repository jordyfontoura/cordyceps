export class Vetor {
  static get Direções() {
    return [this.Esquerda, this.Direita, this.Cima, this.Baixo];
  }
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
  mul(other: Vetor): Vetor;
  mul(other: number, y?: number): Vetor;
  mul(other: Vetor | number, y?: number): Vetor {
    if (typeof other === "number") {
      if (y !== undefined) {
        return new Vetor(this.x * other, this.y * y);
      }
      return new Vetor(this.x * other, this.y * other);
    }

    return new Vetor(this.x * other.x, this.y * other.y);
  }
  div(other: Vetor | number): Vetor {
    if (typeof other === "number")
      return new Vetor(this.x / other, this.y / other);

    return new Vetor(this.x / other.x, this.y / other.y);
  }
  distância(other: Vetor): number {
    return this.sub(other).magnitude;
  }
  get magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  get negativo(){
    return new Vetor(-this.x, -this.y);
  }
  igual(other: Vetor) {
    return this.x === other.x && this.y === other.y;
  }
  toString() {
    return `Vetor(${this.x},${this.y})`;
  }
}

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
  get Floor() {
    return new Vetor(Math.floor(this.x), Math.floor(this.y));
  }
  get Round() {
    return new Vetor(Math.round(this.x), Math.round(this.y));
  }
  get Ceil() {
    return new Vetor(Math.ceil(this.x), Math.ceil(this.y));
  }
  get normalizado() {
    return this.div(this.magnitude);
  }

  constructor(public x: number, public y: number) {}

  add(n: number): Vetor;
  add(x: number, y: number): Vetor;
  add(other: Vetor): Vetor;
  add(other: Vetor | number, y?: number): Vetor {
    if (typeof other === "number") {
      if (y !== undefined) {
        return new Vetor(this.x + other, this.y + y);
      }
      return new Vetor(this.x + other, this.y + other);
    }

    return new Vetor(this.x + other.x, this.y + other.y);
  }

  sub(other: Vetor): Vetor;
  sub(n: number): Vetor;
  sub(x: number, y: number): Vetor;
  sub(other: Vetor | number, y?: number): Vetor {
    if (typeof other === "number") {
      if (y !== undefined) {
        return new Vetor(this.x - other, this.y - y);
      }
      return new Vetor(this.x - other, this.y - other);
    }

    return new Vetor(this.x - other.x, this.y - other.y);
  }

  isub(other: Vetor): Vetor;
  isub(n: number): Vetor;
  isub(x: number, y: number): Vetor;
  isub(other: Vetor | number, y?: number): Vetor {
    if (typeof other === "number") {
      if (y !== undefined) {
        return new Vetor(other - this.x, y - this.y);
      }
      return new Vetor(other - this.x, other - this.y);
    }

    return new Vetor(other.x - this.x, other.y - this.y);
  }

  mul(other: Vetor): Vetor;
  mul(n: number): Vetor;
  mul(x: number, y: number): Vetor;
  mul(other: Vetor | number, y?: number): Vetor {
    if (typeof other === "number") {
      if (y !== undefined) {
        return new Vetor(this.x * other, this.y * y);
      }
      return new Vetor(this.x * other, this.y * other);
    }

    return new Vetor(this.x * other.x, this.y * other.y);
  }

  div(other: Vetor): Vetor;
  div(n: number): Vetor;
  div(x: number, y: number): Vetor;
  div(other: Vetor | number, y?: number): Vetor {
    if (typeof other === "number") {
      if (y !== undefined) {
        return new Vetor(this.x / other, this.y / y);
      }
      return new Vetor(this.x / other, this.y / other);
    }

    return new Vetor(this.x / other.x, this.y / other.y);
  }

  idiv(other: Vetor): Vetor;
  idiv(n: number): Vetor;
  idiv(x: number, y: number): Vetor;
  idiv(other: Vetor | number, y?: number): Vetor {
    if (typeof other === "number") {
      if (y !== undefined) {
        return new Vetor(other / this.x, y / this.y);
      }
      return new Vetor(other / this.x, other / this.y);
    }

    return new Vetor(other.x / this.x, other.y / this.y);
  }

  escalar(other: Vetor): number;
  escalar(x: number, y: number): number;
  escalar(other: Vetor | number, y?: number): number {
    if (typeof other === "number") {
      if (y !== undefined) {
        return this.x * other + this.y * y;
      }
      return NaN;
    }

    return this.x * other.x + this.y * other.y;
  }

  ângulo(outro: Vetor) {
    return this.escalar(outro) / (this.magnitude * outro.magnitude);
  }

  /**
   * 
   * @param em 
   * @param ortogonal 
   * @copyright https://pt.wikipedia.org/wiki/Proje%C3%A7%C3%A3o_de_um_vetor
   * @returns 
   */
  projetar(em: Vetor, ortogonal=false) {
    if (ortogonal) {
      return this.sub(em.mul(this.escalar(em) / em.sqrMagnitude));
    }
    return em.mul(this.escalar(em) / em.sqrMagnitude);
  }

  distância(other: Vetor): number {
    return this.sub(other).magnitude;
  }

  get sqrMagnitude() {
    return this.x ** 2 + this.y ** 2;
  }

  get magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  get negativo() {
    return new Vetor(-this.x, -this.y);
  }

  igual(other: Vetor) {
    return this.x === other.x && this.y === other.y;
  }

  toString() {
    return `(x:${this.x}, y:${this.y})`;
  }

  /**
   * Rotaciona o vetor `theta` graus
   * @param theta Ângulo em radianos
   * @returns
   */
  rotacionado(theta: number) {
    const sen = Math.sin(theta);
    const cos = Math.cos(theta);
    return new Vetor(this.x * cos + this.y * sen, this.y * cos - this.x * sen);
  }
}

export class Vetor {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
    add(other) {
        return new Vetor(this.x + other.x, this.y + other.y);
    }
    sub(other) {
        return new Vetor(this.x - other.x, this.y - other.y);
    }
    mul(other) {
        if (typeof other === "number")
            return new Vetor(this.x * other, this.y * other);
        return new Vetor(this.x * other.x, this.y * other.y);
    }
    div(other) {
        if (typeof other === "number")
            return new Vetor(this.x / other, this.y / other);
        return new Vetor(this.x / other.x, this.y / other.y);
    }
    get magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
}

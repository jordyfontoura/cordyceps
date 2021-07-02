export class Vetor {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(other) {
        return new Vetor(this.x + other.x, this.y + other.y);
    }
    sub(other) {
        return new Vetor(this.x - other.x, this.y - other.y);
    }
    mul(other) {
        return new Vetor(this.x * other.x, this.y * other.y);
    }
    div(other) {
        return new Vetor(this.x / other.x, this.y / other.y);
    }
    get magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
}

import { GameObject } from "../core/gameobject.js";
import { Aleatorizar } from "../utils/random.js";
export class Formiga extends GameObject {
    constructor(posição) {
        super(posição);
    }
    mover(direção) {
        this.position = this.position.add(direção);
    }
    tick() {
        this.mover(Aleatorizar.Direção());
    }
    render(tela) {
        tela.setPixel(this.position, 'black');
    }
}

import { GameEngine, Jogo } from "./game.js";
import { Vetor } from "../utils/vetor.js";
import { Aleatorizar } from "../utils/random.js";
export class GameObject {
    constructor(position = Vetor.Zero) {
        if (!Jogo) {
            throw new Error("Você deve criar uma instância de GameEngine primeiro. Tente usar GameEngine.novo() antes de criar objetos do jogo.");
        }
        this.id = Aleatorizar.Id();
        this.position = position;
        GameEngine.instanciar(this);
    }
    destruir() {
        return GameEngine.destruir(this);
    }
}

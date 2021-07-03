import { GameEngine, Jogo } from "./game.js";
import { Tela } from "./tela.js";
import { Vetor } from "../utils/vetor.js";
import { Aleatorizar } from "../utils/random.js";

export abstract class GameObject {
  id: number;
  position: Vetor;
  name: string;

  constructor(position: Vetor = Vetor.Zero) {
    if (!Jogo) {
      throw new Error(
        "Você deve criar uma instância de GameEngine primeiro. Tente usar GameEngine.novo() antes de criar objetos do jogo."
      );
    }
    this.id = Aleatorizar.Id();
    this.name = this.id.toString();
    this.position = position;
    GameEngine.instanciar(this);
  }
  despertar?(): void;
  tick?(): void;
  render?(tela: Tela): void;
  quandoDestruir?(): void;
  destruir() {
    return GameEngine.destruir(this);
  }
}

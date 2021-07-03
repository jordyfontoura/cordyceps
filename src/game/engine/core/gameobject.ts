import Aleatorizar from "../utils/random";
import { Vetor } from "../utils/vetor";
import { GameEngine, Jogo } from "./game";
import { Tela } from "./tela";

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

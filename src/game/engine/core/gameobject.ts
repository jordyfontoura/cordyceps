import Aleatorizar from "../utils/random";
import { Vetor } from "../utils/vetor";
import { GameEngine, Jogo } from "./game";
import { Tela } from "./tela";

export abstract class GameObject {
  id: number;
  posição: Vetor;
  name: string;
  zIndex: number = 0;

  constructor(position: Vetor = Vetor.Zero) {
    if (!Jogo) {
      throw new Error(
        "Você deve criar uma instância de GameEngine primeiro. Tente usar GameEngine.novo() antes de criar objetos do jogo."
      );
    }
    this.id = Aleatorizar.Id();
    this.name = this.id.toString();
    this.posição = position;
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

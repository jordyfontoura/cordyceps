import Aleatorizar from "game/utils/random";
import { Vetor } from "game/utils/vetor";
import { GameEngine, Jogo } from "./game";
import { Tela } from "./tela";

export abstract class GameObject {
  id: number;
  posição: Vetor;
  nome: string;
  zIndex: number = 0;
  pai?: GameObject;
  filhos: GameObject[]=[];
  ignorarNaHierarquia: boolean = false;

  constructor(
    position: Vetor = Vetor.Zero,
    opções: {ignorarNaHierarquia?: boolean} = {}
  ) {
    if (!Jogo) {
      throw new Error(
        "Você deve criar uma instância de GameEngine primeiro. Tente usar GameEngine.novo() antes de criar objetos do jogo."
      );
    }
    this.id = Aleatorizar.Id();
    this.nome = this.id.toString();
    this.posição = position;
    if (opções.ignorarNaHierarquia) {
      this.ignorarNaHierarquia = true;
    }
    GameEngine.instanciar(this);
  }
  despertar?(): void;
  tick?(): void;
  render?(tela: Tela): void | ImageData;
  quandoDestruir?(): void;
  destruir(force=false) {
    return GameEngine.destruir(this, force);
  }
  get posiçãoGlobal(): Vetor{
    if (!this.pai) {
      return this.posição;
    }
    return this.pai.posiçãoGlobal.add(this.posição);
  }
}

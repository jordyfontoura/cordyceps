import { GameEngine } from "./game";

export class Cenário {
  static cenário: Record<string, Cenário> = {};
  carregar: (jogo: GameEngine)=>void;
  constructor(public nome: string, loader: (jogo: GameEngine)=>void){
    this.carregar = loader;
    console.log(`Cenário ${nome} criado!`);
    Cenário.cenário[nome] = this;
  }

  static criar(nome: string, scene: (jogo: GameEngine)=>void){
    return new Cenário(nome, scene);
  }
}
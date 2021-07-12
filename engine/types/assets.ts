import { Cenário, EditorEngine, GameEngine, IGameConfig } from "engine";

export interface IAssets {
  cenários: Cenário[];
  carregar(Jogo: GameEngine, Editor: EditorEngine): void | Promise<void>;
  configurações?: IGameConfig;
}
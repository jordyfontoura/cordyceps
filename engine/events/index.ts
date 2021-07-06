import { GameEngine } from "game/core/game";
import { EditorEngine } from "game/editor";


declare global {
  interface IGameEvents extends IObserversBase {
    "Game.stop": {};
    "Game.play": {};
    "Game.pause": {};
  }
}

export default function GameEvents(Jogo: GameEngine, Editor: EditorEngine) {
  Jogo.escutar("Game.play", () => {
    Jogo.iniciar();
  });
  Jogo.escutar("Game.pause", () => {
    Jogo.pausar();
  });
  Jogo.escutar("Game.stop", () => {
    Jogo.parar();
  });
}

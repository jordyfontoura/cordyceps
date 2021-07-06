import { GameEngine } from "engine";
import { EditorEngine } from "game/editor";

export function Evento(
  evento?: (Jogo: GameEngine, Editor: EditorEngine) => void
): { executar?: (Jogo: GameEngine, Editor: EditorEngine) => void } {
  return {
    executar: evento,
  };
}

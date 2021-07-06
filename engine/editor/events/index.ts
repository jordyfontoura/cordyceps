import { GameEngine } from "game/core/game";
import { EditorEngine } from "..";
import EDisplay from "./display";
import EHierarquia from "./hierarquia";
import ERegistro from "./registro";

export default function EditorEvents(Jogo: GameEngine, Editor: EditorEngine) {
  EHierarquia.executar?.(Jogo, Editor);
  EDisplay.executar?.(Jogo, Editor);
  ERegistro.executar?.(Jogo, Editor);
}

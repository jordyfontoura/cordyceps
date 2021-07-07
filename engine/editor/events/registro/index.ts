import { GameEngine } from "engine";
import { EditorEngine, IRegistro } from "game/editor";

declare global {
  interface IEditorEvents extends IObserversBase {
    "Editor.registro.adicionar": IRegistro;
    "Editor.registro.mudar": { registros: IRegistro[] };
  }
}

const ERegistro = {
  executar(Jogo: GameEngine, Editor: EditorEngine) {
    Editor.escutar("Editor.registro.adicionar", (registro) => {
      Editor.registros.push(registro);
      Editor.emitir("Editor.registro.mudar", { registros: Editor.registros });
    });
  },
};

export default ERegistro;

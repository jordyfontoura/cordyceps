import { GameEngine, GameObject } from "engine";
import { EditorEngine } from "game/editor";
declare global {
  interface IEditorEvents extends IObserversBase {
    "Editor.hierarquia.adicionar": {
      gameObject: GameObject;
    };
    "Editor.hierarquia.remover": {
      gameObject: GameObject;
    };
    "Editor.hierarquia.mudar": {
      hierarquia: GameObject[];
    };
  }
}
const hierarquia = {
  executar(Jogo: GameEngine, Editor: EditorEngine) {
    Editor.escutar("Editor.hierarquia.adiciona", ({ gameObject }) => {
      Editor.hierarquia.push(gameObject);
      Editor.emitir("Editor.hierarquia.mudar", {
        hierarquia: Editor.hierarquia,
      });
    });
    Editor.escutar("Editor.hierarquia.remover", ({ gameObject }) => {
      const index = Editor.hierarquia.findIndex(
        (go) => go.id === gameObject.id
      );
      if (index < 0) {
        return;
      }
      Editor.hierarquia.splice(index, 1);
      Editor.emitir("Editor.hierarquia.mudar", {
        hierarquia: Editor.hierarquia,
      });
    });
  },
};

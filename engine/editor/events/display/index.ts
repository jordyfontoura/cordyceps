import { GameEngine, Vetor } from "engine";
import { EditorEngine } from "game/editor";
declare global {
  interface IEditorEvents extends IObserversBase {
    "Editor.display.adicionar": {
      id: number;
      elemento: HTMLCanvasElement;
    };
    "Editor.display.remover": {
      id: number;
    };
    "Editor.display.zoom": {
      id: number;
      delta: number;
    };
    "Editor.display.mover": {
      id: number;
      delta: Vetor;
    };
    "Editor.display.mouse.down": {
      id: number;
      posição: Vetor
    };
    "Editor.display.mouse.up": {
      id: number;
      posição: Vetor
    }
    "Editor.display.drag.iniciado": {
      id: number;
      posição: Vetor
    };
    "Editor.display.drag.mover": {
      id: number;
      delta: Vetor
    }
    "Editor.display.mouse.encerrado": {
      id: number;
      posição: Vetor
    }
    "Editor.display.click": {
      id: number;
      posição: Vetor
    }
  }
}
const EHierarquia = {
  executar(Jogo: GameEngine, Editor: EditorEngine) {
    Editor.escutar("Editor.display.adicionar", (payload) => {
      Editor.novaTela(payload.id);
    });
    Editor.escutar("Editor.display.remover", (payload) => {
      Editor.deletarTela(payload.id);
    });
    Editor.escutar("Editor.display.mover", (payload) => {
      const tela = Editor.telas.find((item) => item.id === payload.id);
      if (!tela) {
        return;
      }
      tela.mover(payload.delta, true);
    });
    Editor.escutar("Editor.display.zoom", (payload) => {
      const tela = Editor.telas.find((item) => item.id === payload.id);
      if (!tela) {
        return;
      }
      tela.zoom(payload.delta);
    });
  },
};
export default EHierarquia;

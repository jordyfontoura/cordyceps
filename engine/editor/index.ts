import { GameObject, IGameConfig, Tela } from "game/core";
import { ObserverPattern } from "game/utils/observer";

export interface IRegistro {
  mensagem: string;
}
// type IUpdateTipo = "registros" | "hierarquia";

declare global {
  interface IEditorEvents extends IObserversBase {}
}
export let Editor: EditorEngine;
export class EditorEngine extends ObserverPattern<IEditorEvents> {
  telas: Tela[] = [];
  hierarquia: GameObject[] = [];
  registros: IRegistro[] = [];

  static criar(configurações: IGameConfig){
    if (!Editor) {
      Editor = new EditorEngine(configurações);
    }else{
      Editor.configurações = configurações;
    }
    return Editor;
  }

  private constructor(public configurações: IGameConfig) {
    super();
  }

  novaTela(id: number) {
    const canvas = document.getElementById(id.toString()) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
      throw new Error("canvas.getContext('2d') não encontrado");
    }
    this.telas.push(new Tela(id, canvas, this.configurações));
  }
  deletarTela(id: number) {
    const index = this.telas.findIndex((tela) => tela.id === id);
    if (index < 0) {
      return;
    }
    this.telas.splice(index, 1);
  }
  limparTelas(){
    this.telas.forEach((tela) => tela.limparTela());
  }
  render(fn: (tela: Tela)=>void){
    this.telas.forEach(fn);
  }
}

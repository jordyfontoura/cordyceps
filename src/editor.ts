import { Aleatorizar, GameObject } from "engine";

export interface IRegistro {
  mensagem: string;
}
type IUpdateTipo = "registros" | "hierarquia";
export class EditorEngine {
  hierarquia: GameObject[] = [];
  registros: IRegistro[] = [];

  private observers: {
    $id: number;
    tipo: IUpdateTipo;
    listen: (editor: EditorEngine) => void;
  }[] = [];

  update(objeto: IUpdateTipo) {
    this.observers.forEach((obs) => {
      if (obs.tipo === objeto) {
        obs.listen(this);
      }
    });
  }
  listen(tipo: IUpdateTipo, listen: (editor: EditorEngine) => void){
    const $id = Aleatorizar.Id('Editor.observer');
    const item = {
      $id,
      tipo,
      listen
    }
    this.observers.push(item);
    return $id;
  }
  unlisten(tipo: IUpdateTipo, id?: number){
    if(!id){
      this.observers = this.observers.filter(obs=>obs.tipo !== tipo);
      return;
    }
    const index = this.observers.findIndex(obs=>obs.$id === id);
    if (index < 0) {
      return;
    }
    this.observers.splice(index, 1);
  }
}

const Editor = new EditorEngine();

export default Editor;

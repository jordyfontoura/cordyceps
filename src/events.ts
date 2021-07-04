import { GameEngine } from "engine";
import Subject from "game/utils/observer";
import Editor from "./editor";

export function Events(jogo: GameEngine) {
  
  Subject.listen("Editor.hierarchy.add", ({ gameObject }) => {
    Editor.hierarquia.push(gameObject);
    Editor.update('hierarquia');
  });
  Subject.listen("Editor.hierarchy.remove", ({ gameObject }) => {
    const index = Editor.hierarquia.findIndex((go) => go.id === gameObject.id);
    if (index < 0) {
      return;
    }
    Editor.hierarquia.splice(index, 1);
    Editor.update('hierarquia');
  });
  Subject.listen("Editor.registro.add", (registro)=>{
    Editor.registros.push(registro);
    Editor.update('registros');
  })
  
}
export default Events;

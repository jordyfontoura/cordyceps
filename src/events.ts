import { GameEngine } from "engine";
import Subject from "game/utils/observer";
import Editor from "./editor";

export function Events(jogo: GameEngine) {
  Editor.listen('hierarquia', (editor)=>{
    
  })
  Subject.listen("Editor.hierarchy.add", ({ gameObject }) => {
    Editor.hierarquia.push(gameObject);
  });
  Subject.listen("Editor.hierarchy.remove", ({ gameObject }) => {
    const index = Editor.hierarquia.findIndex((go) => go.id === gameObject.id);
    if (index < 0) {
      return;
    }
    Editor.hierarquia.splice(index, 1);
  });
}
export default Events;

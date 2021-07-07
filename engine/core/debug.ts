import { Editor } from "game/editor";

export class Debug {
  private constructor() {}
  static log(mensagem: string, opções?: { grupos: string[] }) {
    let stack = new Error().stack;
    let trace = undefined;
    if (stack) {
      let arr = stack.split("\n");
      arr.shift();
      arr.shift();
      // arr.shift();
      trace = arr.shift()?.replace(/at\s?/gi, "");
    }
    Editor.emitir("Editor.registro.adicionar", { mensagem, trace, ...opções });
  }
}
export default Debug;


// const debuggers: {
//   id: number;
//   debug: typeof debug;
// }[] = [];
// export function debug(mensagem: string) {
//   debuggers.forEach(item=>item.debug(mensagem));
// }
// export function createDebug(fn: typeof debug) {
//   const id = Aleatorizar.Id(debug.name);
//   const item = {
//     id,
//     debug: fn
//   }
//   debuggers.push(item);
//   return id;
// }
// export function deleteDebug(id: number) {
//   const index = debuggers.findIndex(item => item.id === id);
//   if (index < 0) {
//     return;
//   }
//   debuggers.splice(index, 1)
// }

import { emitir } from "engine";

export function debug(mensagem: string) {
  emitir("Editor.registro.add", { mensagem });
}

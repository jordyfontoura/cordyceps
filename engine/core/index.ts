export { Cor } from "game/utils/color";
export {
  distribuir,
  interpolar,
  mapearValor,
  média, restringir, somatorio
} from "game/utils/math";
export { emitir, escutar } from "game/utils/observer";
export * as Posições from "game/utils/positions";
export { default as Aleatorizar } from "game/utils/random";
export { Retangulo } from "game/utils/retangulo";
export { default as Tempo } from "game/utils/time";
export { Vetor } from "game/utils/vetor";
export { Debug } from "./debug";
export { Evento } from "./events";
export { GameEngine, Jogo } from "./game";
export type { IGameConfig } from "./game";
export { GameObject } from "./gameobject";
export { Cenário } from "./scene";
export { Tela } from "./tela";



// const Commons = {
//   Vetor,
//   GameObject,
//   ...Game,
//   Tempo,
//   Retangulo,
//   Aleatorizar,
//   emit,
//   listen,
//   Math,
//   ...Positions,
//   Tela,
//   debug
// };

// export default Commons;

// import { Vetor } from "./utils/vetor.js";
// import { Formiga } from "./formiga.js";
// import { IGame } from "./core/game.js";

// console.log("oi");

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
// const config = {
//   size: new Vetor(600, 600),
//   ticksPorSegundo: 120,
// };
// function main() {
//   const Game: IGame = {
//     tela: (document.getElementById("screen") as HTMLCanvasElement).getContext(
//       "2d"
//     ) as CanvasRenderingContext2D & { centro: Vetor },
//     canvas: document.getElementById("screen") as HTMLCanvasElement,
//     formigas: [],
//     desenhar: desenhar,
//     podeMover(formiga, para) {
//       if (
//         !(para.x >= -config.size.x / 2 && para.x < config.size.x / 2) ||
//         !(para.y >= -config.size.y / 2 && para.y < config.size.y / 2)
//       ) {
//         return false;
//       }
//       return true;
//     },
//     tick,
//   };
//   Game.canvas.width = config.size.x;
//   Game.canvas.height = config.size.y;
//   Game.tela.centro = new Vetor(Game.canvas.width / 2, Game.canvas.height / 2);
//   window.addEventListener(
//     "resize",
//     function (e) {
//       Game.tela.imageSmoothingEnabled = false;
//     },
//     false
//   );
//   Game.tela.imageSmoothingEnabled = false;
//   for (let i = 0; i < 100; i++) {
//     criarFormiga();
//   }
//   tick();

//   // Game methods
//   async function tick() {
//     Game.formigas.forEach((formiga) => {
//       formiga.tick();
//       formiga.desenhar();
//     });
//     await sleep(1000 / config.ticksPorSegundo);
//     // if (Game.screen?.fillStyle) {
//     //   Game.screen.fillStyle = "white";
//     // }
//     // Game.screen?.fillRect(0, 0, 1000, 100);
//     // clearScreen();
//     tick();
//   }
//   function clearScreen() {
//     Game.tela.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
//   }
//   function criarFormiga() {
//     const formiga = new Formiga(new Vetor(0, 0), "black", Game);
//     Game.formigas.push(formiga);
//     return formiga;
//   }
//   function desenhar(pixel: Vetor, color: string = "black") {
//     const position = new Vetor(pixel.x, -pixel.y).add(Game.tela.centro);
//     Game.tela.fillStyle = color;
//     Game.tela.fillRect(position.x, position.y, 1, 1);
//     return true;
//   }
// }
// main();

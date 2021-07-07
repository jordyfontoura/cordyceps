import { Cenário, GameEngine, IGameConfig } from "game/core";
import seed from "seed-random";
import cenários from "./scenes";

interface IAssets {
  cenários: Cenário[];
  carregar(jogo: GameEngine): void;
  configurações?: IGameConfig;
}
const seedsAceitas =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";

function randomSeed() {
  let res = "";
  while (res.length < 5 + Math.random() * 25) {
    res += seedsAceitas[Math.floor(Math.random() * seedsAceitas.length)];
  }
  return res;
}
const url = new URL(window.location.href);
let useSeed = randomSeed();
let urlSeed = url.pathname.split("/").pop();
if (urlSeed) {
  if (!["play"].includes(urlSeed)) {
    useSeed = urlSeed;
  }
}
console.log("Seed:", useSeed);
seed(useSeed, { global: true });

const Assets: IAssets = {
  cenários,
  carregar() {},
  configurações: {
    fps: 240,
  },
};
export default Assets;

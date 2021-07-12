import { Aleatorizar, Cenário, GameEngine, IGameConfig } from "game/core";
import cenários from "./scenes";

interface IAssets {
  cenários: Cenário[];
  carregar(jogo: GameEngine): void;
  configurações?: IGameConfig;
}


const Assets: IAssets = {
  cenários,
  carregar() {
    const url = new URL(window.location.href);
    if (url.searchParams.has('seed')) {
      const seed =  url.searchParams.get('seed');
      if (seed)
        Aleatorizar.setSeed(seed);
    }
    console.log("Seed:", Aleatorizar.seed);
  },
  configurações: {
    fps: 60,
  },
};
export default Assets;

import { Cenário, GameEngine, IGameConfig } from "game/core";
import cenários from "./scenes";
interface IAssets{
  cenários: Cenário[];
  carregar(jogo: GameEngine): void;
  configurações?: IGameConfig
}
const Assets: IAssets = {
  cenários,
  carregar(){
    
  },
  configurações: {
    fps: 60
  }
};
export default Assets;

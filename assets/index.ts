import { Cenário, GameEngine, IGameConfig } from "engine";
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
    fps: 15
  }
};
export default Assets;

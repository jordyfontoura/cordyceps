import Assets from "assets";
import { GameEngine, IGameConfig } from "game/core/game";

function load(config: IGameConfig) {
  const configurações = Assets.configurações || config;
  const Jogo = GameEngine.criar(configurações);


  Assets.carregar?.(Jogo);
  return Jogo;
}
export default load;

import Assets from "assets";
import { GameEngine, IGameConfig } from "engine/game";
import Events from './events';
function load(config: IGameConfig) {
  const configurações = Assets.configurações || config;
  const Jogo = GameEngine.criar(configurações);

  Events();

  Assets.carregar?.(Jogo);
}
export default load;

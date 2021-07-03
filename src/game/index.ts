import Assets from "assets";
import { GameEngine, IGameConfig } from "engine/core/game";
import Subject from "engine/utils/observer";


function load(config: IGameConfig){
  const configurações  = Assets.configurações || config;
  const Jogo = GameEngine.criar(configurações);

  Subject.listen("Game.play", () => {
    Jogo.iniciar();
  });
  Subject.listen("Game.pause", () => {
    Jogo.pausar();
  });
  Subject.listen("Game.stop", () => {
    Jogo.parar();
  });
  Subject.listen("Game.criar.display", ({ params }) => {
    Jogo.novaTela(params.element);
  });
  Subject.listen("Game.deletar.display", ({ params }) => {
    Jogo.deletarTela(params.element);
  });

  Assets.carregar?.(Jogo);
}
export default load;
import { Comida } from "assets/gameobjects/comida/comida";
import { Formiga } from "assets/gameobjects/formiga/formiga";
import { GameEngine } from "engine/core/game";
import { Cenário } from "engine/core/scene";
import Aleatorizar from "engine/utils/random";
import { Vetor } from "engine/utils/vetor";

export default Cenário.criar("laboratorio", (jogo: GameEngine) => {
  for (let i = 0; i < 20; i++) {
    new Comida(
      new Vetor(
        Aleatorizar.Chance(0.5)
          ? Aleatorizar.Int(-200, -100)
          : Aleatorizar.Int(100, 200),
        Aleatorizar.Chance(0.5)
          ? Aleatorizar.Int(-200, -100)
          : Aleatorizar.Int(100, 200)
      )
    );
  }
  for (let i = 0; i < 200; i++) {
    new Formiga(Vetor.Zero);
  }
});

import { Comida } from "assets/gameobjects/comida/comida";
import { Formiga } from "assets/gameobjects/formiga/formiga";
import { debug } from "engine/core/debug";
import { GameEngine } from "engine/core/game";
import { Cenário } from "engine/core/scene";
import Aleatorizar from "engine/utils/random";
import { Vetor } from "engine/utils/vetor";

export default Cenário.criar("laboratorio", (jogo: GameEngine) => {
  debug('Jogo iniciado!');
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
  new Formiga(Vetor.Zero).nome = "Aroldo";
  for (let i = 0; i < 200; i++) {
    new Formiga(Vetor.Zero);
  }
});

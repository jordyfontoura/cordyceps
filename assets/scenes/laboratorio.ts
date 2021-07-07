import { Comida } from "assets/gameobjects/comida/comida";
import { Formiga } from "assets/gameobjects/formiga/formiga";
import { Aleatorizar, Cenário, Debug, GameEngine, Vetor } from "game/core";

export default Cenário.criar("laboratorio", (jogo: GameEngine) => {
  Debug.log('Jogo iniciado!');
  for (let i = 0; i < 1; i++) {
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
  for (let i = 0; i < 20; i++) {
    new Formiga(Vetor.Zero);
  }
});

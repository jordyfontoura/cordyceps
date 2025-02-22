import { Comida } from "assets/gameobjects/comida/comida";
import { Formiga } from "assets/gameobjects/formiga/formiga";
import { Aleatorizar, Cenário, Debug, GameEngine, Vetor } from "game/core";

export default Cenário.criar("laboratorio", (jogo: GameEngine) => {
  Debug.log("Jogo iniciado!");
  for (let i = 0; i < 3; i++) {
    new Comida(Aleatorizar.Direção().mul(Aleatorizar.Numero(100, 300)).Round);
  }
  new Formiga(Vetor.Zero).nome = "Aroldo";
  for (let i = 0; i < 200; i++) {
    new Formiga(Vetor.Zero);
  }
});

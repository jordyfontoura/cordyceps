import { Formiga } from "assets/gameobjects/formiga";
import { GameEngine } from "engine/core/game";
import { Cenário } from "engine/core/scene";
import { Vetor } from "engine/utils/vetor";

export default Cenário.criar('laboratorio', (jogo: GameEngine)=>{
  for (let i = 0; i < 400; i++) {
    new Formiga(Vetor.Zero);
  }
});
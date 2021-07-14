import { Estrela } from "assets/gameobjects/estrela";
import { Aleatorizar, Cenário, Debug, GameEngine, Vetor } from "game/core";

export default Cenário.criar("universo", (jogo: GameEngine) => {
  Debug.log("Jogo iniciado!");
  const sol = new Estrela(Vetor.Zero);
  sol.massa = 10000000;
  for (let i = 0; i < 10; i++) {
    const a = new Estrela(new Vetor(0, Aleatorizar.Numero(-100, -300)));
    a.massa = Aleatorizar.Numero(1,1000);
    a.velocidade = new Vetor(Aleatorizar.Numero(-300, -200), 0);
  }
});

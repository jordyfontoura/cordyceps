import { Estrela } from "assets/gameobjects/estrela";
import { Aleatorizar, Cenário, Debug, GameEngine, Vetor } from "game/core";

export default Cenário.criar("universo", (jogo: GameEngine) => {
  Debug.log("Jogo iniciado!");
  const sol = new Estrela(Vetor.Zero);
  sol.massa = 100000;
  for (let i = 0; i < 10; i++) {
    const a = new Estrela(
      Aleatorizar.Direção().mul(Aleatorizar.Numero(100, 400))
    );
    a.massa = Aleatorizar.Numero(1000, 10000);

    
    a.velocidade = a.posição
      .rotacionado(Math.PI / 2)
      .div(a.posição.magnitude / 200);
    if (i === 0) {
      // a.massa = sol.massa / 4;
      // a.velocidade = a.velocidade
    }
  }
});
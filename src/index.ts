import { GameEngine } from "./core/game.js";
import laboratorio from "./scenes/laboratorio.js";

const Jogo = GameEngine.criar("screen", { altura: 600, largura: 600 });

Jogo.carregar(laboratorio);

Jogo.iniciar();

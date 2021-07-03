import GameConfig from "./config/game.js";
import { GameEngine } from "./engine/core/game.js";
import laboratorio from "./scenes/laboratorio.js";
const Jogo = GameEngine.criar("screen", GameConfig);
Jogo.carregar(laboratorio);
Jogo.iniciar();

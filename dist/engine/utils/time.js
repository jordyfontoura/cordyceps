import { Jogo } from "../core/game.js";
export var Tempo;
(function (Tempo) {
    function esperar(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    Tempo.esperar = esperar;
    function converter(valor, de, para) {
        if (de === "ticks" && para === "segundos") {
            return valor / Jogo.fps;
        }
        else if (de === 'segundos' && para === 'ticks') {
            return Jogo.fps * valor;
        }
        return valor;
    }
    Tempo.converter = converter;
})(Tempo || (Tempo = {}));

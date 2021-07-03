import { Jogo } from "../core/game.js";

export namespace Tempo {
  export function esperar(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  export function converter(
    valor: number,
    de: "ticks" | "segundos",
    para: "ticks" | "segundos"
  ) {
    if (de === "ticks" && para === "segundos") {
      return valor / Jogo.fps;
    }else if (de === 'segundos' && para === 'ticks') {
      return Jogo.fps * valor;
    }
    return valor;
  }
}

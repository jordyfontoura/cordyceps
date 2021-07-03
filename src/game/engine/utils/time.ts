import { Jogo } from "../core/game";

const Tempo = {
  esperar(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
  converter(
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
export default Tempo;
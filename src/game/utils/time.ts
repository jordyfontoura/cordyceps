import { Jogo } from "../engine/game";

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
  },
  cooldowns: {} as Record<number, {tempo: number, started: number}>,
  startCooldown(id: number, tempo: number){
    this.cooldowns[id] = {
      tempo,
      started: Date.now()
    }
  },
  cooldown(id: number): boolean{
    return (Date.now() - this.cooldowns[id].started) > this.cooldowns[id].tempo;
  }
}
export default Tempo;
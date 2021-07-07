import { Jogo } from "../core/game";

class Relogio {
  private iniciadoEm: number;
  constructor() {
    this.iniciadoEm=performance.now();
  }
  cronometrar(){
    this.iniciadoEm=performance.now();
  }
  get decorrido(){
    return performance.now()-this.iniciadoEm;
  }
}

const Tempo = {
  esperar(ms: number) {
    if (ms <= 0) {
      return;
    }
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
  },
  Relogio
  // relogio(){
  //   return {
  //     iniciadoEm: 0,
  //     cronometrar(){
  //       this.iniciadoEm = performance.now();
  //     },
  //     get decorrido(){
  //       return performance.now()-this.iniciadoEm;
  //     }
  //   }
  // }
}

export default Tempo;
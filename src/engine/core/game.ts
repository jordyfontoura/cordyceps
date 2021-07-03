import { Vetor } from "../utils/vetor.js";
import { Tempo } from "../utils/time.js";
import { GameObject } from "./gameobject.js";
import { Tela } from "./tela.js";
import { Cenário } from "./scene.js";

type IRotina =
  | {
      tipo: "visual";
      executar: (tela: Tela) => void;
    }
  | {
      tipo: "rotina";
      executar: () => void;
    };

export interface IGameConfig {
  largura?: number;
  altura?: number;
}

export let Jogo: GameEngine;
export class GameEngine {
  status: "rodando" | "parado" = "parado";
  fps: number = 30;
  tela: Tela;
  gameObjects: GameObject[];
  private rotinas: IRotina[] = [];
  private ticks: number = 0;

  // Singleton
  static criar(canvas: HTMLCanvasElement | string, config?: IGameConfig) {
    if (!Jogo) {
      if (typeof canvas === "string") {
        Jogo = new GameEngine(
          document.getElementById(canvas) as HTMLCanvasElement,
          config
        );
      } else {
        Jogo = new GameEngine(canvas, config);
      }
    }
    return Jogo;
  }

  private constructor(private canvas: HTMLCanvasElement, config?: IGameConfig) {
    if (config?.altura) {
      canvas.height = config.altura;
    }
    if (config?.largura) {
      canvas.width = config.largura;
    }
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
      throw new Error("canvas.getContext('2d') não encontrado");
    }
    this.tela = new Tela(ctx);
    this.gameObjects = [];
  }

  iniciar() {
    this.status = "rodando";
    console.log(`Jogo iniciado!`);
    return this.loop();
  }
  carregar(cenário: Cenário) {
    console.log(`Carregando cenário: ${cenário.nome}`);
    cenário.carregar(this);
    console.log(`Cenário '${cenário.nome}' carregado com sucesso!`);
  }

  rotina(fn: IRotina | undefined) {
    if (fn) {
      this.rotinas.push(fn);
    }
  }

  private async loop() {
    while (Jogo.status === "rodando") {
      this.tick();
      this.render();

      await Tempo.esperar(1000 / Jogo.fps);
    }
  }

  private tick() {
    console.debug(
      `Tempo: ${Tempo.converter(this.ticks, "ticks", "segundos").toPrecision(
        2
      )} ` + `Tick: ${this.ticks}`
    );
    const rotinas = this.rotinas.filter((rotina) => rotina.tipo === "rotina");
    this.rotinas = this.rotinas.filter((rotina) => rotina.tipo !== "rotina");
    while (true) {
      const rotina = rotinas.pop();
      if (!rotina) {
        break;
      }
      if (rotina.tipo === "rotina") {
        rotina.executar();
      }
    }

    this.gameObjects.forEach((gameObject) => gameObject.tick?.());
    this.ticks++;
  }

  private render() {
    this.tela.limparTela();
    const rotinas = this.rotinas.filter((rotina) => rotina.tipo === "visual");
    this.rotinas = this.rotinas.filter((rotina) => rotina.tipo !== "visual");
    while (true) {
      const rotina = rotinas.pop();
      if (!rotina) {
        break;
      }
      if (rotina.tipo === "visual") {
        rotina.executar(this.tela);
      }
    }
    this.gameObjects.forEach((gameObject) => gameObject.render?.(this.tela));
  }

  static instanciar<T extends GameObject>(gameObject: T): T {
    Jogo.gameObjects.push(gameObject);
    if (gameObject.despertar) {
      Jogo.rotina({
        tipo: "rotina",
        executar: gameObject.despertar,
      });
    }
    return gameObject;
  }

  static async destruir<T extends GameObject>(gameObject: T): Promise<boolean> {
    return new Promise((resolve) => {
      Jogo.rotina({
        tipo: "rotina",
        executar: () => {
          const index = Jogo.gameObjects.findIndex(
            (o) => o.id === gameObject.id
          );
          if (index < 0) {
            console.warn(
              `Falha ao destruir GameObject[${gameObject.id}]${
                gameObject.name !== gameObject.id.toString()
                  ? " '" + gameObject.name + "'"
                  : ""
              }`
            );
            return resolve(false);
          }
          gameObject.quandoDestruir?.();
          Jogo.gameObjects.splice(index, 1);
          console.debug(
            `GameObject[${gameObject.id}]${
              gameObject.name !== gameObject.id.toString()
                ? " '" + gameObject.name + "'"
                : ""
            } destruido`
          );
          resolve(true);
        },
      });
    });
  }
}

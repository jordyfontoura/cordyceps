/* eslint-disable no-fallthrough */
import { EditorEngine } from "game/editor";
import EditorEvents from "game/editor/events";
import GameEvents from "game/events";
import { ObserverPattern } from "game/utils/observer";
import { depth } from "game/utils/positions";
import Tempo from "game/utils/time";
import { GameObject } from "./gameobject";
import { Cenário } from "./scene";
import { Tela } from "./tela";

type IRotina =
  | {
      tipo: "visual";
      executar: (tela: Tela) => void;
    }
  | {
      tipo: "rotina";
      executar: () => void;
    }
  | {
      tipo: "destruição";
      executar: () => void;
    };

export interface IGameConfig {
  largura?: number;
  altura?: number;
  fps: number;
}

declare global {
  interface IGameEvents extends IObserversBase {}
}

export let Jogo: GameEngine;
export class GameEngine extends ObserverPattern<IGameEvents> {
  editor: EditorEngine;
  status: "acordando" | "rodando" | "pausado" | "parado";
  get fps() {
    return this.configurações.fps;
  }
  gameObjects: GameObject[];
  configurações: IGameConfig;
  private rotinas: IRotina[] = [];
  private ticks: number = 0;

  // Singleton
  static criar(config: IGameConfig) {
    if (!Jogo) {
      const Editor = EditorEngine.criar(config);
      Jogo = new GameEngine(config, Editor);
      GameEvents(Jogo, Editor);
      EditorEvents(Jogo, Editor);
    } else {
      Jogo.configurações = config;
    }
    return Jogo;
  }

  private constructor(config: IGameConfig, editor: EditorEngine) {
    super();
    // if (config?.altura) {
    //   canvas.height = config.altura;
    // }
    // if (config?.largura) {
    //   canvas.width = config.largura;
    // }
    // if (ctx === null) {
    //   throw new Error("canvas.getContext('2d') não encontrado");
    // }
    this.editor = editor;
    this.status = "acordando";
    this.configurações = config;
    this.gameObjects = [];
  }

  async iniciar(cenário?: string) {
    switch (this.status) {
      case "parado":
      case "acordando":
        if (this.status === "parado") {
          console.log("Reiniciando jogo...");
        }
        this.status = "rodando";
        console.log(`Jogo iniciado!`);
        if (!Object.values(Cenário.cenário).length) {
          throw new Error("Nenhum cenário foi criado!");
        }
        Cenário.cenário[cenário || Object.keys(Cenário.cenário)[0]].carregar(
          this
        );
        return this.loop();

      case "pausado":
        console.log("Resumindo jogo");
        this.status = "rodando";
        break;

      default:
        break;
    }
  }
  pausar() {
    this.status = "pausado";
  }
  parar() {
    this.status = "parado";
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
    while (this.status !== "parado") {
      if (this.status === "rodando") {
        await this.tick();
      }
      this.render();
      await Tempo.esperar(1000 / this.fps);
    }
    await this.encerrar();
  }
  private async encerrar() {
    console.log("Encerrando jogo...");
    this.gameObjects.map((o) => o.destruir(true));

    this.gameObjects = [];
    this.editor.limparTelas();
    console.log("Jogo encerrado");
  }

  private async tick() {
    console.debug(
      `Tempo: ${Tempo.converter(this.ticks, "ticks", "segundos").toPrecision(
        2
      )} Tick: ${this.ticks}`
    );
    const rotinas = this.rotinas.filter((rotina) => rotina.tipo === "rotina");
    this.rotinas = this.rotinas.filter((rotina) => rotina.tipo !== "rotina");
    while (true) {
      const rotina: any = rotinas.pop();
      if (!rotina) {
        break;
      }
      rotina.executar();
    }
    const destrutores = this.rotinas.filter(
      (rotina) => rotina.tipo === "destruição"
    );
    this.rotinas = this.rotinas.filter(
      (rotina) => rotina.tipo !== "destruição"
    );
    while (true) {
      const rotina: any = destrutores.pop();
      if (!rotina) {
        break;
      }
      await rotina.executar();
    }

    this.gameObjects.forEach((gameObject) => {
      depth(
        gameObject,
        (obj) => obj.filhos,
        (obj) => obj.tick?.()
      );
    });
    this.ticks++;
  }

  private render() {
    this.editor.render((tela) => {
      tela.limparTela();
      const rotinas = this.rotinas.filter((rotina) => rotina.tipo === "visual");
      this.rotinas = this.rotinas.filter((rotina) => rotina.tipo !== "visual");
      while (true) {
        const rotina = rotinas.pop();
        if (!rotina) {
          break;
        }
        if (rotina.tipo === "visual") {
          rotina.executar(tela);
        }
      }
      this.gameObjects
        .sort((a, b) => a.zIndex - b.zIndex)
        .forEach((gameObject) => gameObject.render?.(tela));
    });
  }

  static instanciar<T extends GameObject>(gameObject: T): T {
    Jogo.gameObjects.push(gameObject);
    if (gameObject.despertar) {
      Jogo.rotina({
        tipo: "rotina",
        executar: gameObject.despertar,
      });
    }
    if (!gameObject.ignorarNaHierarquia) {
      Jogo.emitir("Game.hierarchy.add", { gameObject });
    }
    return gameObject;
  }

  static async destruir<T extends GameObject>(
    gameObject: T,
    force: boolean = false
  ): Promise<boolean> {
    if (force) {
      const index = Jogo.gameObjects.findIndex((o) => o.id === gameObject.id);
      if (index < 0) {
        console.warn(
          `Falha ao destruir GameObject[${gameObject.id}]${
            gameObject.nome !== gameObject.id.toString()
              ? " '" + gameObject.nome + "'"
              : ""
          }`
        );
        return false;
      }
      if (!gameObject.ignorarNaHierarquia) {
        Jogo.emitir("Game.hierarchy.remove", { gameObject });
      }
      await Promise.all(gameObject.filhos.map((filho) => filho.destruir(true)));
      Jogo.gameObjects.splice(index, 1);
      console.debug(
        `GameObject[${gameObject.id}]${
          gameObject.nome !== gameObject.id.toString()
            ? " '" + gameObject.nome + "'"
            : ""
        } destruido`
      );
      return true;
    }
    return new Promise((resolve) => {
      Jogo.rotina({
        tipo: "destruição",
        executar: async () => {
          const index = Jogo.gameObjects.findIndex(
            (o) => o.id === gameObject.id
          );
          if (index < 0) {
            console.warn(
              `Falha ao destruir GameObject[${gameObject.id}]${
                gameObject.nome !== gameObject.id.toString()
                  ? " '" + gameObject.nome + "'"
                  : ""
              }`
            );
            return resolve(false);
          }
          gameObject.quandoDestruir?.();
          await Promise.all(
            gameObject.filhos.map((filho) => filho.destruir(true))
          ).catch(() => resolve(false));
          if (!gameObject.ignorarNaHierarquia) {
            Jogo.emitir("Game.hierarchy.remove", { gameObject });
          }
          Jogo.gameObjects.splice(index, 1);
          console.debug(
            `GameObject[${gameObject.id}]${
              gameObject.nome !== gameObject.id.toString()
                ? " '" + gameObject.nome + "'"
                : ""
            } destruido`
          );
          resolve(true);
        },
      });
    });
  }
}

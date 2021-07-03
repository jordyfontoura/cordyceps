var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Tempo } from "../utils/time.js";
import { Tela } from "./tela.js";
export let Jogo;
export class GameEngine {
    constructor(canvas, config) {
        this.canvas = canvas;
        this.status = "parado";
        this.fps = 30;
        this.rotinas = [];
        this.ticks = 0;
        if (config === null || config === void 0 ? void 0 : config.altura) {
            canvas.height = config.altura;
        }
        if (config === null || config === void 0 ? void 0 : config.largura) {
            canvas.width = config.largura;
        }
        const ctx = canvas.getContext("2d");
        if (ctx === null) {
            throw new Error("canvas.getContext('2d') não encontrado");
        }
        this.tela = new Tela(ctx);
        this.gameObjects = [];
    }
    // Singleton
    static criar(canvas, config) {
        if (!Jogo) {
            if (typeof canvas === "string") {
                Jogo = new GameEngine(document.getElementById(canvas), config);
            }
            else {
                Jogo = new GameEngine(canvas, config);
            }
        }
        return Jogo;
    }
    iniciar() {
        this.status = "rodando";
        console.log(`Jogo iniciado!`);
        return this.loop();
    }
    carregar(cenário) {
        console.log(`Carregando cenário: ${cenário.nome}`);
        cenário.carregar(this);
        console.log(`Cenário '${cenário.nome}' carregado com sucesso!`);
    }
    rotina(fn) {
        if (fn) {
            this.rotinas.push(fn);
        }
    }
    loop() {
        return __awaiter(this, void 0, void 0, function* () {
            while (Jogo.status === "rodando") {
                this.tick();
                this.render();
                yield Tempo.esperar(1000 / Jogo.fps);
            }
        });
    }
    tick() {
        console.debug(`Tempo: ${Tempo.converter(this.ticks, "ticks", "segundos").toPrecision(2)} ` + `Tick: ${this.ticks}`);
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
        this.gameObjects.forEach((gameObject) => { var _a; return (_a = gameObject.tick) === null || _a === void 0 ? void 0 : _a.call(gameObject); });
        this.ticks++;
    }
    render() {
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
        this.gameObjects.forEach((gameObject) => { var _a; return (_a = gameObject.render) === null || _a === void 0 ? void 0 : _a.call(gameObject, this.tela); });
    }
    static instanciar(gameObject) {
        Jogo.gameObjects.push(gameObject);
        if (gameObject.despertar) {
            Jogo.rotina({
                tipo: "rotina",
                executar: gameObject.despertar,
            });
        }
        return gameObject;
    }
    static destruir(gameObject) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                Jogo.rotina({
                    tipo: "rotina",
                    executar: () => {
                        var _a;
                        const index = Jogo.gameObjects.findIndex((o) => o.id === gameObject.id);
                        if (index < 0) {
                            console.warn(`Falha ao destruir GameObject[${gameObject.id}]${gameObject.name !== gameObject.id.toString()
                                ? " '" + gameObject.name + "'"
                                : ""}`);
                            return resolve(false);
                        }
                        (_a = gameObject.quandoDestruir) === null || _a === void 0 ? void 0 : _a.call(gameObject);
                        Jogo.gameObjects.splice(index, 1);
                        console.debug(`GameObject[${gameObject.id}]${gameObject.name !== gameObject.id.toString()
                            ? " '" + gameObject.name + "'"
                            : ""} destruido`);
                        resolve(true);
                    },
                });
            });
        });
    }
}

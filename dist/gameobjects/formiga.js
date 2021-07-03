import { GameObject } from "../engine/core/gameobject.js";
import { Aleatorizar } from "../engine/utils/random.js";
import { Tempo } from "../engine/utils/time.js";
export class Formiga extends GameObject {
    constructor(posição) {
        super(posição);
        const tempoEstimado = Aleatorizar.Int(30, 60 * 2);
        console.log(`Formiga criada ${tempoEstimado}`);
        this.energiaRemanescente = Tempo.converter(tempoEstimado, "segundos", "ticks");
    }
    quandoDestruir() {
        new RestosMortais(this.position);
    }
    degenerar(energia) {
        this.energiaRemanescente -= energia;
        if (this.energiaRemanescente <= 0 && Aleatorizar.Chance(0.2 / 100)) {
            this.destruir();
        }
    }
    mover(direção) {
        this.position = this.position.add(direção);
        Rastro.criar(this.position);
        this.degenerar(1);
    }
    tick() {
        this.mover(Aleatorizar.Direção());
    }
    render(tela) {
        tela.setPixel(this.position, "black");
    }
}
const TempoDoRastro = 20;
class Rastro extends GameObject {
    constructor(posição) {
        super(posição);
        this.ticksDeVida = Tempo.converter(TempoDoRastro, "segundos", "ticks");
        Rastro.rastros.push(this);
    }
    static criar(posição) {
        let rastro = Rastro.rastros.find((item) => item.position.igual(posição));
        if (rastro) {
            rastro.ticksDeVida = Tempo.converter(TempoDoRastro, "segundos", "ticks");
        }
        else {
            rastro = new Rastro(posição);
        }
        return rastro;
    }
    quandoDestruir() {
        const index = Rastro.rastros.findIndex((item) => item.id === this.id);
        Rastro.rastros.splice(index, 1);
    }
    tick() {
        this.ticksDeVida--;
        if (this.ticksDeVida <= 0 && Aleatorizar.Chance(5 / 100)) {
            this.destruir();
        }
    }
    render(tela) {
        const valor = Math.round((1 / (1 + Math.abs(this.ticksDeVida / 10))) * 255);
        tela.setPixel(this.position, `rgb(${valor}, ${valor}, ${valor})`);
    }
}
Rastro.rastros = [];
class RestosMortais extends GameObject {
    constructor(posição) {
        super(posição);
    }
    render(tela) {
        tela.setPixel(this.position, "red");
    }
}

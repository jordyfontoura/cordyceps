import { GameObject } from "engine/core/gameobject";
import { Tela } from "engine/core/tela";
import Aleatorizar from "engine/utils/random";
import { Vetor } from "engine/utils/vetor";
import { Formiga } from "../formiga/formiga";

export class Comida extends GameObject {
  static comidasExistentes: Comida[] = [];
  zIndex=2;
  caloria: number;
  constructor(posição: Vetor){
    super(posição);
    Comida.comidasExistentes.push(this);
    this.caloria = Aleatorizar.Int(4, 20);
  }
  tick(){
    if (this.caloria <= 0) {
      this.destruir();
    }
  }
  quandoDestruir(){
    const index = Comida.comidasExistentes.findIndex(comida=>comida.id === this.id);
    if (index < 0) {
      return;
    }
    Comida.comidasExistentes.splice(index, 1);
  }
  alimentar(formiga: Formiga){
    if (this.caloria < 0) {
      return;
    }
    formiga.calorias = formiga.caloriasMaxima;
    this.caloria--;
  }
  render(tela: Tela){
    tela.setPixel(this.posição, 'green');
    tela.setPixel(this.posição.add(Vetor.Direita), 'green');
    tela.setPixel(this.posição.add(Vetor.Esquerda), 'green');
    tela.setPixel(this.posição.add(Vetor.Cima), 'green');
    tela.setPixel(this.posição.add(Vetor.Baixo), 'green');
  }
}
import { GameObject } from "../core/gameobject.js";
import { Tela } from "../core/tela.js";
import { Aleatorizar } from "../utils/random.js";
import { Vetor } from "../utils/vetor.js";

export class Formiga extends GameObject {
  constructor(posição: Vetor) {
    super(posição)
  }
  mover(direção: Vetor){
    this.position = this.position.add(direção);
  }
  tick(){
    this.mover(Aleatorizar.Direção());
  }
  render(tela: Tela){
    tela.setPixel(this.position, 'black');
  }
}
import { Vetor } from "./utils/vetor.js";
import { IGame } from "./core/game.js";

type IDireções = "esquerda" | "direita" | "cima" | "baixo";
export class Formiga {
  constructor(
    public posição: Vetor,
    public color: string,
    public game: IGame
  ) {}

  possoMeMover(direção: IDireções): boolean {
    let direçãoVetor = new Vetor(0, 0);
    switch (direção) {
      case "direita":
        direçãoVetor.x += 1;
        break;

      case "esquerda":
        direçãoVetor.x -= 1;
        break;

      case "cima":
        direçãoVetor.y += 1;
        break;

      case "baixo":
        direçãoVetor.y -= 1;
        break;

      default:
        break;
    }
    return this.game.podeMover(this, this.posição.add(direçãoVetor));
  }
  mover(direção: IDireções): boolean {
    if (!this.possoMeMover(direção)) {
      return false;
    }
    this.game.desenhar(this.posição, '#ccc')
    switch (direção) {
      case "direita":
          this.posição.x += 1;
          break;

      case "esquerda":
          this.posição.x -= 1;
          break;

      case "cima":
          this.posição.y += 1;
          break;

      case "baixo":
          this.posição.y -= 1;
          break;

      default:
        return false;
    }
    return true;
  }
  desenhar() {
    this.game.desenhar(this.posição, this.color);
  }
  tick() {
    this.mover(
      ["esquerda", "direita", "cima", "baixo"][
        Math.floor(Math.random() * 4)
      ] as IDireções
    );
  }
}

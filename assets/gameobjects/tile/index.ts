import RigidBody from "engine/gameobject/rigidbody";
import { Tela, Vetor } from "game/core";

export class Tile extends RigidBody {
  constructor(posição: Vetor) {
    super(posição, { ignorarNaHierarquia: true });
  }
  render(tela: Tela) {
    tela.setPixel(this.posição, "red");
  }
}

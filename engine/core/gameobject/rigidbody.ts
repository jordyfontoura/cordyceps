import { Jogo } from "engine";
import { GameObject } from "engine/gameobject";
import { Vetor } from "game/utils/vetor";

export default class RigidBody extends GameObject {
  velocidade: Vetor = Vetor.Zero;
  aceleração: Vetor = Vetor.Zero;
  massa: number = 1;

  physics() {
    this.posição = this.posição
      .add(this.velocidade.mul(1 / Jogo.fps))
      .add(this.aceleração.mul(1 / Jogo.fps ** 2).div(2));
    this.velocidade = this.velocidade.add(this.aceleração.mul(1 / Jogo.fps));
    this.aceleração = Vetor.Zero;
  }
  aplicarForça(força: Vetor) {
    this.aceleração = this.aceleração.add(força.div(this.massa));
  }
  arrasto() {
    this.aplicarForça(Physics.arrasto(1, this.velocidade, 1, 0.1));
  }
  gravidade() {
    let forçaResultante = Vetor.Zero;
    const objs = Jogo.gameObjects.filter(
      (o) => o instanceof RigidBody && o.id !== this.id
    ) as RigidBody[];
    objs.forEach((rb) => {
      forçaResultante = forçaResultante.add(
        Physics.gravidade(this.massa, rb.massa, this.posição, rb.posição)
      );
    });
    this.aceleração = this.aceleração.add(forçaResultante.div(this.massa));
  }
}

class Physics {
  static G = 100;
  /**
   *
   * @param rho densidade do líquido
   * @param v vetor velocidade
   * @param A área frontal do objeto
   * @param C coeficiente de arrasto
   * @returns força de arrasto
   */
  static arrasto(rho: number, v: Vetor, A: number, C: number) {
    return v.normalizado.mul(-(rho * v.magnitude * A * C)).div(2);
  }

  static gravidade(m1: number, m2: number, p1: Vetor, p2: Vetor) {
    return p2
      .sub(p1)
      .normalizado.mul((Physics.G * m1 * m2) / p2.sub(p1).magnitude ** 2);
  }
}

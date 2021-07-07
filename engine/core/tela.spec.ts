import { Vetor } from "../utils/vetor";
import { Tela } from "./tela";

describe("Tela", () => {
  const canvas = {
    getContext: (v: "2d")=> {
      return {
        fillStyle: "black",
        fillRect(x: number, y: number, w: number, h: number) {
          // console
        },
        canvas
      } as unknown as CanvasRenderingContext2D;
    },
    width: 1000,
    height: 1000,
    clientHeight: 1000,
    clientWidth: 1000,
    clientLeft: 10,
    clientTop: 10,
    addEventListener: ()=>{}
  } as unknown as HTMLCanvasElement
  const tela = new Tela(
    0,
    canvas,
    { fps: 1 }
  );
  test("Positions", () => {
    expect(tela.toScreenSpace(Vetor.Um.mul(10), "client")).toEqual(Vetor.Zero);
    expect(tela.toScreenSpace(Vetor.Um.mul(10+500), "client")).toEqual(Vetor.Um.mul(500));
    expect(tela.toScreenSpace(Vetor.Um.mul(10+1000), "client")).toEqual(Vetor.Um.mul(1000));

    expect(tela.toWorldSpace(Vetor.Um.mul(10), "client")).toEqual(Vetor.Um.mul(500).mul(-1, 1));
    expect(tela.toWorldSpace(Vetor.Um.mul(10+500), "client")).toEqual(Vetor.Zero);
    expect(tela.toWorldSpace(Vetor.Um.mul(10+1000), "client")).toEqual(Vetor.Um.mul(500).mul(1, -1));

    expect(tela.toWorldSpace(Vetor.Um.mul(0), "screen")).toEqual(Vetor.Um.mul(500).mul(-1, 1));
    expect(tela.toWorldSpace(Vetor.Um.mul(500), "screen")).toEqual(Vetor.Zero);
    expect(tela.toWorldSpace(Vetor.Um.mul(1000), "screen")).toEqual(Vetor.Um.mul(500).mul(1, -1));

    expect(tela.toScreenSpace(Vetor.Um.mul(0), "world")).toEqual(Vetor.Um.mul(500));
    expect(tela.toScreenSpace(Vetor.Um.mul(500), "world")).toEqual(new Vetor(1000, 0));
    expect(tela.toScreenSpace(new Vetor(-500, 500), "world")).toEqual(Vetor.Zero);
  });
});

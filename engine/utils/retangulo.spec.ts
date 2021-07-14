import { Retangulo } from "./retangulo";
import { Vetor } from "./vetor";

describe("Retângulo", () => {
  test("constructor", () => {
    for (let i = 0; i < 100; i++) {
      const [x, y, w, h] = [
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
      ];
      const rect = new Retangulo(x, y, w, h);
      expect(rect.x).toBe(x);
      expect(rect.y).toBe(y);
      expect(rect.largura).toBe(w);
      expect(rect.altura).toBe(h);
    }
  });
  test("estaDentro", () => {
    const [x, y, w, h] = [0, 0, 100, 100];
    const rect = new Retangulo(x, y, w, h);

    for (let y = -10; y < h + 10; y++) {
      for (let x = -10; x < w + 10; x++) {
        const ponto = new Vetor(x, y);
        expect(rect.estaDentro(ponto)).toBe(
          x >= 0 && x <= w && y >= 0 && y <= h
        );
      }
    }
  });
  test("Sobrepõe", ()=>{
    let a = new Retangulo(0, 0, 20, 100);
    let b = new Retangulo(-10, 60, 40, 20);
    expect(a.sobrepõe(b)).toBe(true)
    a = new Retangulo(0, 0, 20, 100);
    b = a
    expect(a.sobrepõe(b)).toBe(true);
    a = new Retangulo(0, 0, 20, 100);
    b = new Retangulo(-10, 60, 40, 20);
    expect(a.sobrepõe(b)).toBe(true)
  })
});

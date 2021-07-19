import { Matriz } from "./matrix";

describe("Matrix", () => {
  it("Deve somar duas matrizes", () => {
    const a = new Matriz(3, 3);
    a.forEachValue((_, i, j) => {
      a[i][j] = 1 + i * 3 + j;
    });
    const b = new Matriz(3, 3);
    b.forEachValue((_, i, j) => {
      b[i][j] = 1 + i * 3 + j;
    });
    const resultado = a.add(b);
    expect(resultado[0][1]).toBe(4)
  });
});

import { GPU, KernelOutput } from "gpu.js";
const gpu = new GPU();

export class Matriz extends Array {
  constructor(
    public linhas: number,
    public colunas: number,
    inicial: KernelOutput | number[][] | number = 0
  ) {
    super(linhas);
    if (typeof inicial === "number") {
      for (let linha = 0; linha < linhas; linha++) {
        this[linha] = Array.from({ length: colunas }, () => inicial);
      }
    } else {
      this.push(...(inicial as number[][]));
    }
  }

  add(matriz: Matriz): Matriz {
    const addMatrix = gpu
      .createKernel(function (a: number[][], b: number[][]) {
        let sum = 0;
        for (let i = 0; i < matriz.colunas; i++) {
          sum += a[this.thread.y][i] + b[i][this.thread.x];
        }
        return sum;
      })
      .setOutput([512, 512]);
    const out = addMatrix(this, matriz);
    return out as Matriz;
  }
  sub(matriz: Matriz): Matriz {
    const subMatrix = gpu
      .createKernel(function (a: number[][], b: number[][]) {
        let sum = 0;
        for (let i = 0; i < matriz.colunas; i++) {
          sum += a[this.thread.y][i] - b[i][this.thread.x];
        }
        return sum;
      })
      .setOutput([512, 512]);
    const out = subMatrix(this, matriz);
    return new Matriz(this.linhas, this.colunas, out);
  }
  forEachValue(fn: (value: number, i: number, j: number) => void) {
    for (let i = 0; i < this.linhas; i++) {
      for (let j = 0; j < this.colunas; j++) {
        fn(this[i][j], i, j);
      }
    }
  }
}

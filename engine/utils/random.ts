import setRandomSeed from "seed-random";
import { Vetor } from "./vetor";

const Aleatorizar = {
  /**
   * Retorna um inteiro entre o inicio e o (fim-1)
   * @param inicio Início
   * @param fim Fim exclusivo
   * @returns
   */
  Int(inicio: number, fim: number) {
    return inicio + Math.floor(Math.random() * (fim - inicio));
  },
  /**
   * Retorna um real entre o inicio e o fim
   * @param inicio Início
   * @param fim Fim
   * @returns
   */
  Numero(inicio: number, fim: number) {
    return inicio + Math.random() * (fim - inicio);
  },
  Item(lista: any[]) {
    return lista[Aleatorizar.Int(0, lista.length)];
  },
  ids: { default: [] } as Record<string, number[]>,
  Id(group: string = "default"): number {
    let id;
    if (!(group in this.ids)) {
      this.ids[group] = [];
    }
    do {
      id = Aleatorizar.Int(1000000, 1000000 * 10);
    } while (this.ids[group].includes(id));
    this.ids[group].push(id);
    return id;
  },
  /**
   * Retorna um Vetor com direção randomica e com comprimento 1
   * @returns 
   */
  Direção() {
    return new Vetor(0, 1).rotacionado(Aleatorizar.Numero(0, 2 * Math.PI));
  },
  Index(probabilidades: number[]) {
    let soma = 0;
    let resultado = 0;
    let total = probabilidades.reduce((a, b) => a + b, 0);
    const escolha = Math.random() * total;
    for (let i = 0; i < probabilidades.length; i++) {
      if (escolha <= soma) {
        return resultado;
      }
      resultado = i;
      soma += probabilidades[i];
    }
    return probabilidades.length - 1;
  },
  Chance(chance: number): boolean {
    return Math.random() < chance;
  },
  Sequencia<T>(partes: T[], critério: (atual: T[]) => boolean) {
    let res: T[] = [];
    while (critério(res)) {
      res.push(this.Item(partes));
    }
    return res;
  },
  seed: "",
  setSeed(value?: string) {
    const len = Aleatorizar.Int(5, 15);
    this.seed =
      value ||
      this.Sequencia(
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(
          ""
        ),
        (atual) => atual.length < len
      ).join("");
    setRandomSeed(this.seed, { global: true });
  },
};
Aleatorizar.setSeed();
export default Aleatorizar;

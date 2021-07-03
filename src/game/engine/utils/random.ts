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
  Item(lista: any[]) {
    return lista[Aleatorizar.Int(0, lista.length)];
  },
  ids: [] as number[],
  Id(): number {
    let id;
    do {
      id = Aleatorizar.Int(1000000, 1000000 * 10);
    } while (this.ids.includes(id));
    return id;
  },
  Direção() {
    return Aleatorizar.Item([
      Vetor.Esquerda,
      Vetor.Direita,
      Vetor.Cima,
      Vetor.Baixo,
    ]);
  },
  Chance(chance: number): boolean {
    return Math.random() < chance;
  },
};
export default Aleatorizar;
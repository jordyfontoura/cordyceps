import { Vetor } from "./vetor.js";

export namespace Aleatorizar {
  /**
   * Retorna um inteiro entre o inicio e o (fim-1)
   * @param inicio Início
   * @param fim Fim exclusivo
   * @returns
   */
  export function Int(inicio: number, fim: number) {
    return inicio+Math.floor(Math.random() * (fim - inicio));
  }
  export function Item(lista: any[]) {
    return lista[Aleatorizar.Int(0, lista.length)];
  }
  const ids: number[] = [];
  export function Id(): number {
    let id;
    do {
      id = Aleatorizar.Int(1000000, 1000000 * 10);
    } while (ids.includes(id));
    return id;
  }
  export function Direção() {
    return Aleatorizar.Item([
      Vetor.Esquerda,
      Vetor.Direita,
      Vetor.Cima,
      Vetor.Baixo,
    ]);
  }
  export function Chance(chance: number): boolean {
    return Math.random() < chance;
  }
}
